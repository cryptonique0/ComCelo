// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloGovernance
/// @notice Lightweight on-chain governance for protocol updates and admin actions.
contract ComCeloGovernance is Ownable, Pausable {
    struct Proposal {
        uint256 id;
        string description;
        address target;
        uint256 value;
        bytes data;
        uint256 deadline;
        bool executed;
        uint256 votesFor;
        uint256 votesAgainst;
    }

    uint256 public votingPeriod = 3 days;
    uint256 public nextProposalId;

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => bool) public voters;

    event ProposalCreated(uint256 indexed id, address indexed proposer, string description, address target);
    event VoteCast(uint256 indexed id, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed id, bool success, bytes returnData);
    event VoterUpdated(address indexed voter, bool allowed);
    event VotingPeriodUpdated(uint256 newPeriod);

    modifier onlyVoter() {
        require(voters[msg.sender] || msg.sender == owner(), "Not authorized voter");
        _;
    }

    constructor() {}

    function setVoter(address voter, bool allowed) external onlyOwner {
        voters[voter] = allowed;
        emit VoterUpdated(voter, allowed);
    }

    function setVotingPeriod(uint256 newPeriod) external onlyOwner {
        require(newPeriod >= 1 minutes && newPeriod <= 30 days, "Period out of range");
        votingPeriod = newPeriod;
        emit VotingPeriodUpdated(newPeriod);
    }

    function propose(
        string calldata description,
        address target,
        uint256 value,
        bytes calldata data
    ) external onlyVoter whenNotPaused returns (uint256 proposalId) {
        require(target != address(0), "Invalid target");

        proposalId = ++nextProposalId;
        proposals[proposalId] = Proposal({
            id: proposalId,
            description: description,
            target: target,
            value: value,
            data: data,
            deadline: block.timestamp + votingPeriod,
            executed: false,
            votesFor: 0,
            votesAgainst: 0
        });

        emit ProposalCreated(proposalId, msg.sender, description, target);
    }

    function vote(uint256 proposalId, bool support) external onlyVoter whenNotPaused {
        Proposal storage p = proposals[proposalId];
        require(p.id == proposalId, "Proposal not found");
        require(block.timestamp < p.deadline, "Voting ended");
        require(!hasVoted[proposalId][msg.sender], "Already voted");

        hasVoted[proposalId][msg.sender] = true;
        if (support) {
            p.votesFor += 1;
        } else {
            p.votesAgainst += 1;
        }

        emit VoteCast(proposalId, msg.sender, support, 1);
    }

    function execute(uint256 proposalId) external whenNotPaused {
        Proposal storage p = proposals[proposalId];
        require(p.id == proposalId, "Proposal not found");
        require(block.timestamp >= p.deadline, "Voting not finished");
        require(!p.executed, "Already executed");
        require(p.votesFor > p.votesAgainst, "Proposal not approved");

        p.executed = true;

        (bool success, bytes memory returnData) = p.target.call{value: p.value}(p.data);
        emit ProposalExecuted(proposalId, success, returnData);
    }

    function getProposal(uint256 proposalId) external view returns (Proposal memory) {
        return proposals[proposalId];
    }
}
