// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {IVotes} from "@openzeppelin/contracts/governance/utils/IVotes.sol";

interface IVotesExtended is IVotes {
    function getPastTotalSupply(uint256 blockNumber) external view returns (uint256);
}

/// @title ComCeloGovernance
/// @notice Token-weighted governance with quorum, timelock, and EIP-712 voting.
contract ComCeloGovernance is Ownable, Pausable, EIP712, ReentrancyGuard {
    struct Proposal {
        uint256 id;
        string description;
        address proposer;
        address target;
        uint256 value;
        bytes data;
        uint256 snapshotBlock;
        uint256 deadline;
        uint256 eta;
        bool executed;
        bool cancelled;
        bool deadlineExtended;
        uint256 votesFor;
        uint256 votesAgainst;
        uint256 votesAbstain;
        uint256 totalVoters;
        uint256 quorumVotes;
    }

    IVotesExtended public votesToken;
    uint256 public votingPeriod = 3 days;
    uint256 public executionDelay = 1 days;
    uint256 public executionGracePeriod = 7 days;
    uint256 public deadlineExtension = 1 hours;
    uint256 public extensionThresholdBps = 500; // gap to quorum within 5%
    uint256 public quorumBps = 1000; // 10%
    uint256 public proposalThreshold;
    uint256 public maxExecutionValue = type(uint256).max;
    uint256 public nextProposalId;

    bytes32 public constant BALLOT_TYPEHASH =
        keccak256("Ballot(uint256 proposalId,uint8 support,uint256 nonce,uint256 deadline)");

    mapping(uint256 => Proposal) private proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => bool) public voters;
    mapping(address => uint256) public nonces;
    mapping(address => bool) public allowedTargets;

    event ProposalCreated(
        uint256 indexed id,
        address indexed proposer,
        string description,
        address target,
        uint256 quorumVotes,
        uint256 deadline,
        uint256 eta
    );
    event VoteCast(uint256 indexed id, address indexed voter, uint8 support, uint256 weight);
    event VoteCastBySig(uint256 indexed id, address indexed signer, uint8 support);
    event ProposalExecuted(uint256 indexed id, bool success, bytes returnData);
    event ProposalExecutionFailed(uint256 indexed id, bytes returnData);
    event ProposalCancelled(uint256 indexed id, address indexed caller);
    event DeadlineExtended(uint256 indexed id, uint256 newDeadline);
    event VoterUpdated(address indexed voter, bool allowed);
    event VotingPeriodUpdated(uint256 newPeriod);
    event QuorumUpdated(uint256 newQuorumBps);
    event ProposalThresholdUpdated(uint256 newThreshold);
    event ExecutionDelayUpdated(uint256 newDelay, uint256 newGracePeriod);
    event DeadlineExtensionUpdated(uint256 extension, uint256 thresholdBps);
    event GovernanceTokenUpdated(address token);
    event ExecutionValueCapUpdated(uint256 newCap);
    event TargetAllowlistUpdated(address indexed target, bool allowed);

    modifier onlyVoter() {
        require(voters[msg.sender] || msg.sender == owner(), "Not authorized voter");
        _;
    }

    constructor() EIP712("ComCeloGovernance", "1") {
        allowedTargets[address(this)] = true;
    }

    receive() external payable {}

    function setVoter(address voter, bool allowed) external onlyOwner {
        voters[voter] = allowed;
        emit VoterUpdated(voter, allowed);
    }

    function setGovernanceToken(address token) external onlyOwner {
        require(token != address(0), "Invalid token");
        votesToken = IVotesExtended(token);
        emit GovernanceTokenUpdated(token);
    }

    function setVotingPeriod(uint256 newPeriod) external onlyOwner {
        require(newPeriod >= 1 minutes && newPeriod <= 30 days, "Period out of range");
        votingPeriod = newPeriod;
        emit VotingPeriodUpdated(newPeriod);
    }

    function setExecutionDelay(uint256 newDelay, uint256 newGracePeriod) external onlyOwner {
        require(newGracePeriod >= 1 hours, "Grace too small");
        executionDelay = newDelay;
        executionGracePeriod = newGracePeriod;
        emit ExecutionDelayUpdated(newDelay, newGracePeriod);
    }

    function setDeadlineExtension(uint256 newExtension, uint256 newThresholdBps) external onlyOwner {
        require(newExtension >= 5 minutes && newExtension <= 7 days, "Extension out of range");
        require(newThresholdBps > 0 && newThresholdBps <= 10000, "Threshold bps out of range");
        deadlineExtension = newExtension;
        extensionThresholdBps = newThresholdBps;
        emit DeadlineExtensionUpdated(newExtension, newThresholdBps);
    }

    function setQuorumBps(uint256 newQuorumBps) external onlyOwner {
        require(newQuorumBps > 0 && newQuorumBps <= 10000, "Quorum out of range");
        quorumBps = newQuorumBps;
        emit QuorumUpdated(newQuorumBps);
    }

    function setProposalThreshold(uint256 newThreshold) external onlyOwner {
        proposalThreshold = newThreshold;
        emit ProposalThresholdUpdated(newThreshold);
    }

    function setMaxExecutionValue(uint256 newCap) external onlyOwner {
        maxExecutionValue = newCap;
        emit ExecutionValueCapUpdated(newCap);
    }

    function setTargetAllowed(address target, bool allowed) external onlyOwner {
        allowedTargets[target] = allowed;
        emit TargetAllowlistUpdated(target, allowed);
    }

    function propose(
        string calldata description,
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyVoter whenNotPaused returns (uint256 proposalId) {
        require(address(votesToken) != address(0), "Governance token not set");
        require(target != address(0), "Invalid target");
        require(value <= maxExecutionValue, "Execution value exceeds cap");

        uint256 snapshotBlock = block.number - 1;
        uint256 votingPower = votesToken.getPastVotes(msg.sender, snapshotBlock);
        require(votingPower >= proposalThreshold, "Below proposal threshold");

        uint256 quorumVotes = _quorum(snapshotBlock);
        require(quorumVotes > 0, "Quorum too low");
        proposalId = ++nextProposalId;
        Proposal storage p = proposals[proposalId];
        p.id = proposalId;
        p.description = description;
        p.proposer = msg.sender;
        p.target = target;
        p.value = value;
        p.data = data;
        p.snapshotBlock = snapshotBlock;
        p.deadline = block.timestamp + votingPeriod;
        p.eta = block.timestamp + votingPeriod + executionDelay;
        p.quorumVotes = quorumVotes;

        emit ProposalCreated(proposalId, msg.sender, description, target, quorumVotes, p.deadline, p.eta);
    }

    function vote(uint256 proposalId, uint8 support) external onlyVoter whenNotPaused {
        _vote(proposalId, support, msg.sender);
    }

    function voteBySig(
        uint256 proposalId,
        uint8 support,
        uint256 nonce,
        uint256 deadline,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external whenNotPaused {
        require(deadline >= block.timestamp, "Signature expired");
        _validateSupport(support);
        bytes32 digest = _hashTypedDataV4(keccak256(abi.encode(BALLOT_TYPEHASH, proposalId, support, nonce, deadline)));
        address signer = ECDSA.recover(digest, v, r, s);
        require(voters[signer] || signer == owner(), "Not authorized voter");
        require(nonce == nonces[signer], "Invalid nonce");

        nonces[signer]++;
        _vote(proposalId, support, signer);
        emit VoteCastBySig(proposalId, signer, support);
    }

    function cancel(uint256 proposalId) external whenNotPaused {
        Proposal storage p = proposals[proposalId];
        require(p.id == proposalId, "Proposal not found");
        require(!p.executed, "Already executed");
        require(!p.cancelled, "Already cancelled");
        require(msg.sender == p.proposer || msg.sender == owner(), "Only proposer or owner");

        p.cancelled = true;
        emit ProposalCancelled(proposalId, msg.sender);
    }

    function extendDeadline(uint256 proposalId) external onlyVoter whenNotPaused {
        Proposal storage p = proposals[proposalId];
        require(p.id == proposalId, "Proposal not found");
        require(block.timestamp < p.deadline, "Voting ended");
        require(!p.deadlineExtended, "Already extended");

        uint256 votesCast = p.votesFor + p.votesAgainst + p.votesAbstain;
        require(p.quorumVotes > votesCast, "Quorum met");
        uint256 gap = p.quorumVotes - votesCast;
        require(gap * 10000 <= p.quorumVotes * extensionThresholdBps, "Not near quorum");

        p.deadline += deadlineExtension;
        p.eta += deadlineExtension;
        p.deadlineExtended = true;
        emit DeadlineExtended(proposalId, p.deadline);
    }

    function execute(uint256 proposalId) external nonReentrant whenNotPaused {
        Proposal storage p = proposals[proposalId];
        require(p.id == proposalId, "Proposal not found");
        require(!p.cancelled, "Proposal cancelled");
        require(block.timestamp >= p.deadline, "Voting not finished");
        require(block.timestamp >= p.eta, "Timelock not elapsed");
        require(block.timestamp <= p.eta + executionGracePeriod, "Execution window passed");
        require(!p.executed, "Already executed");
        require(p.votesFor > p.votesAgainst, "Proposal not approved");
        require(_quorumReached(p), "Quorum not reached");
        require(allowedTargets[p.target], "Target not allowed");
        require(p.value <= maxExecutionValue, "Execution value exceeds cap");

        (bool success, bytes memory returnData) = p.target.call{value: p.value}(p.data);
        if (!success) {
            emit ProposalExecutionFailed(proposalId, returnData);
            return;
        }

        p.executed = true;
        emit ProposalExecuted(proposalId, success, returnData);
    }

    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }

    function getTally(uint256 proposalId)
        external
        view
        returns (uint256 forVotes, uint256 againstVotes, uint256 abstainVotes, uint256 quorumVotes, uint256 totalVoters)
    {
        Proposal storage p = proposals[proposalId];
        return (p.votesFor, p.votesAgainst, p.votesAbstain, p.quorumVotes, p.totalVoters);
    }

    function _vote(uint256 proposalId, uint8 support, address voter) internal {
        Proposal storage p = proposals[proposalId];
        require(p.id == proposalId, "Proposal not found");
        require(block.timestamp < p.deadline, "Voting ended");
        require(!hasVoted[proposalId][voter], "Already voted");
        _validateSupport(support);

        uint256 weight = votesToken.getPastVotes(voter, p.snapshotBlock);
        require(weight > 0, "No voting weight");

        hasVoted[proposalId][voter] = true;
        if (support == 0) {
            p.votesAgainst += weight;
        } else if (support == 1) {
            p.votesFor += weight;
        } else {
            p.votesAbstain += weight;
        }
        p.totalVoters += 1;

        emit VoteCast(proposalId, voter, support, weight);
    }

    function _validateSupport(uint8 support) internal pure {
        require(support <= 2, "Invalid support");
    }

    function _quorum(uint256 blockNumber) internal view returns (uint256) {
        require(address(votesToken) != address(0), "Governance token not set");
        uint256 totalSupply = votesToken.getPastTotalSupply(blockNumber);
        return (totalSupply * quorumBps) / 10000;
    }

    function _quorumReached(Proposal storage p) internal view returns (bool) {
        return p.votesFor + p.votesAgainst + p.votesAbstain >= p.quorumVotes;
    }
}
