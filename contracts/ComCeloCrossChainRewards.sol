// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title ComCeloCrossChainRewards
/// @notice Coordinates cross-chain reward claims with a spoke pool or relayer system.
/// @dev This contract is chain-agnostic; deploy on both ends and let relayers mirror events.
interface IComCeloRewards {
    function awardAchievementReward(address player, uint256 rewardAmount) external;
    function spendRewards(address player, uint256 amount, string memory reason) external;
}

contract ComCeloCrossChainRewards is Ownable, Pausable, ReentrancyGuard {
    struct ClaimRequest {
        uint256 id;
        address claimer;
        uint256 amount;
        uint256 destinationChainId;
        string proofURI; // IPFS hash or evidence pointing to source-chain result
        bool processed;
    }

    struct ClaimReceipt {
        uint256 sourceChainId;
        uint256 sourceClaimId;
        address claimer;
        uint256 amount;
        string proofURI;
        uint256 processedAt;
    }

    uint256 public nextClaimId;
    mapping(uint256 => ClaimRequest) public claims;
    mapping(bytes32 => bool) public processedReceipts; // key: keccak(sourceChainId, sourceClaimId, claimer)

    address public rewardsContract;
    address public relayer;

    event ClaimRequested(uint256 indexed claimId, address indexed claimer, uint256 amount, uint256 destinationChainId, string proofURI);
    event ClaimProcessed(uint256 indexed claimId, address indexed claimer, uint256 amount, uint256 sourceChainId, uint256 sourceClaimId);
    event RelayerUpdated(address indexed newRelayer);
    event RewardsContractUpdated(address indexed newRewards);

    modifier onlyRelayer() {
        require(msg.sender == relayer || msg.sender == owner(), "Not relayer");
        _;
    }

    constructor(address _rewardsContract, address _relayer) {
        rewardsContract = _rewardsContract;
        relayer = _relayer;
    }

    function setRelayer(address newRelayer) external onlyOwner {
        relayer = newRelayer;
        emit RelayerUpdated(newRelayer);
    }

    function setRewardsContract(address newRewards) external onlyOwner {
        rewardsContract = newRewards;
        emit RewardsContractUpdated(newRewards);
    }

    /// @notice Player requests a reward claim to another chain. Off-chain relayer should fill on destination.
    function requestClaim(uint256 amount, uint256 destinationChainId, string calldata proofURI) external whenNotPaused returns (uint256 claimId) {
        require(amount > 0, "Amount must be > 0");
        require(destinationChainId != block.chainid, "Destination must differ");

        claimId = ++nextClaimId;
        claims[claimId] = ClaimRequest({
            id: claimId,
            claimer: msg.sender,
            amount: amount,
            destinationChainId: destinationChainId,
            proofURI: proofURI,
            processed: false
        });

        emit ClaimRequested(claimId, msg.sender, amount, destinationChainId, proofURI);
    }

    /// @notice Called on destination chain by relayer after validating proof off-chain.
    function processClaim(
        ClaimReceipt calldata receipt
    ) external onlyRelayer whenNotPaused nonReentrant {
        bytes32 key = keccak256(abi.encode(receipt.sourceChainId, receipt.sourceClaimId, receipt.claimer));
        require(!processedReceipts[key], "Already processed");

        processedReceipts[key] = true;

        if (rewardsContract != address(0)) {
            IComCeloRewards(rewardsContract).awardAchievementReward(receipt.claimer, receipt.amount);
        }

        emit ClaimProcessed(receipt.sourceClaimId, receipt.claimer, receipt.amount, receipt.sourceChainId, receipt.sourceClaimId);
    }
}
