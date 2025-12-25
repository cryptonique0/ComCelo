// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

/// @title ComCeloMetaTxRelay
/// @notice Advanced meta-transaction relay with gas sponsorship, batch processing, and relayer management.
contract ComCeloMetaTxRelay is Ownable, Pausable {
    using ECDSA for bytes32;

    // Contract Addresses
    address public gameContractAddress;
    address public itemsContractAddress = 0xBf1D587fc5f00aBA65671ab575eD5225D3342e13;
    address public crossChainRewardsAddress = 0x4C73a992c2f52a74E67A2424b800Cf97359ab694;
    address public governanceContractAddress = 0x6736103c7a528E658895c541F89E47F250c98a4f;

    // Sponsorship & Relay Management
    mapping(address => uint256) public nonces;
    mapping(address => bool) public approvedRelayers;
    mapping(address => uint256) public gasSpent; // Track gas spent per user
    mapping(address => uint256) public dailySpentLimit; // Daily limit per user
    
    uint256 public maxGasSponsorPerTx = 1 ether;
    uint256 public maxDailyGasPerUser = 5 ether;
    uint256 public totalGasSponsored;
    uint256 public relayerRewardPercent = 10; // Relayer gets 10% of sponsored gas

    // Batch transaction tracking
    struct BatchTransaction {
        address[] targets;
        bytes[] callData;
        uint256[] values;
        uint256 timestamp;
        bool executed;
    }

    mapping(uint256 => BatchTransaction) public batches;
    uint256 public nextBatchId;

    event MetaTxExecuted(
        address indexed relayer,
        address indexed signer,
        uint256 nonce,
        uint256 gasSponsored,
        address target
    );
    event BatchTxExecuted(
        uint256 indexed batchId,
        address indexed relayer,
        address indexed signer,
        uint256 txCount,
        uint256 totalGasSponsored
    );
    event GameContractUpdated(address indexed newAddress);
    event MaxGasSponsorUpdated(uint256 newMax);
    event RelayerApproved(address indexed relayer);
    event RelayerRevoked(address indexed relayer);
    event DailyLimitExceeded(address indexed user, uint256 amount, uint256 limit);
    event ContractAddressUpdated(string contractType, address indexed newAddress);

    constructor(address _gameContractAddress) {
        gameContractAddress = _gameContractAddress;
        approvedRelayers[msg.sender] = true;
    }

    /// @notice Execute a single meta-transaction with gas sponsorship
    function executeMetaTx(
        address signer,
        address target,
        bytes calldata functionData,
        uint256 nonce,
        uint256 gasLimit,
        bytes calldata signature
    ) external payable onlyApprovedRelayer whenNotPaused returns (bytes memory) {
        require(nonce == nonces[signer], "Invalid nonce");
        require(gasLimit <= maxGasSponsorPerTx, "Gas limit exceeds max");
        require(msg.value >= gasLimit, "Insufficient gas sponsorship");

        // Check daily limit
        require(gasSpent[signer] + gasLimit <= maxDailyGasPerUser, "Daily limit exceeded");

        // Verify signature
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encode(signer, target, functionData, nonce, gasLimit, address(this)))
            )
        );

        address recovered = digest.recover(signature);
        require(recovered == signer, "Invalid signature");

        nonces[signer]++;
        gasSpent[signer] += gasLimit;
        totalGasSponsored += gasLimit;

        // Execute transaction
        uint256 startGas = gasleft();
        (bool success, bytes memory result) = target.call{value: 0}(functionData);
        require(success, "Meta-tx execution failed");
        uint256 gasUsed = startGas - gasleft();

        // Reward relayer (10% of sponsored gas)
        uint256 relayerReward = (gasLimit * relayerRewardPercent) / 100;
        (bool rewardSuccess,) = msg.sender.call{value: relayerReward}("");
        require(rewardSuccess, "Relayer reward transfer failed");

        emit MetaTxExecuted(msg.sender, signer, nonce, gasLimit, target);
        return result;
    }

    /// @notice Execute multiple meta-transactions in a batch (gas efficient)
    function executeBatchMetaTx(
        address signer,
        address[] calldata targets,
        bytes[] calldata callDatas,
        uint256[] calldata gasLimits,
        uint256 nonce,
        bytes calldata signature
    ) external payable onlyApprovedRelayer whenNotPaused returns (uint256 batchId) {
        require(targets.length == callDatas.length && callDatas.length == gasLimits.length, "Array length mismatch");
        require(nonce == nonces[signer], "Invalid nonce");

        // Verify signature
        bytes32 digest = keccak256(
            abi.encodePacked(
                "\x19Ethereum Signed Message:\n32",
                keccak256(abi.encode(signer, targets, callDatas, gasLimits, nonce, address(this)))
            )
        );

        address recovered = digest.recover(signature);
        require(recovered == signer, "Invalid signature");

        uint256 totalGasLimit = 0;
        for (uint i = 0; i < gasLimits.length; i++) {
            totalGasLimit += gasLimits[i];
        }

        require(gasSpent[signer] + totalGasLimit <= maxDailyGasPerUser, "Daily limit exceeded");
        require(msg.value >= totalGasLimit, "Insufficient gas sponsorship");

        nonces[signer]++;
        gasSpent[signer] += totalGasLimit;
        totalGasSponsored += totalGasLimit;

        // Execute all transactions in batch
        batchId = nextBatchId++;
        batches[batchId] = BatchTransaction({
            targets: targets,
            callData: callDatas,
            values: new uint256[](targets.length),
            timestamp: block.timestamp,
            executed: true
        });

        for (uint i = 0; i < targets.length; i++) {
            (bool success,) = targets[i].call(callDatas[i]);
            require(success, "Batch tx failed");
        }

        // Reward relayer
        uint256 relayerReward = (totalGasLimit * relayerRewardPercent) / 100;
        (bool rewardSuccess,) = msg.sender.call{value: relayerReward}("");
        require(rewardSuccess, "Relayer reward transfer failed");

        emit BatchTxExecuted(batchId, msg.sender, signer, targets.length, totalGasLimit);
    }

    /// @notice Approve a relayer address
    function approveRelayer(address relayer) external onlyOwner {
        require(relayer != address(0), "Invalid relayer");
        approvedRelayers[relayer] = true;
        emit RelayerApproved(relayer);
    }

    /// @notice Revoke relayer privileges
    function revokeRelayer(address relayer) external onlyOwner {
        approvedRelayers[relayer] = false;
        emit RelayerRevoked(relayer);
    }

    /// @notice Update game contract address
    function setGameContractAddress(address _gameContractAddress) external onlyOwner {
        require(_gameContractAddress != address(0), "Invalid address");
        gameContractAddress = _gameContractAddress;
        emit GameContractUpdated(_gameContractAddress);
    }

    /// @notice Update items contract address
    function setItemsContractAddress(address _itemsContractAddress) external onlyOwner {
        require(_itemsContractAddress != address(0), "Invalid address");
        itemsContractAddress = _itemsContractAddress;
        emit ContractAddressUpdated("Items", _itemsContractAddress);
    }

    /// @notice Update cross-chain rewards address
    function setCrossChainRewardsAddress(address _crossChainRewardsAddress) external onlyOwner {
        require(_crossChainRewardsAddress != address(0), "Invalid address");
        crossChainRewardsAddress = _crossChainRewardsAddress;
        emit ContractAddressUpdated("CrossChainRewards", _crossChainRewardsAddress);
    }

    /// @notice Update governance contract address
    function setGovernanceContractAddress(address _governanceContractAddress) external onlyOwner {
        require(_governanceContractAddress != address(0), "Invalid address");
        governanceContractAddress = _governanceContractAddress;
        emit ContractAddressUpdated("Governance", _governanceContractAddress);
    }

    /// @notice Set max gas per transaction
    function setMaxGasSponsor(uint256 _maxGasSponsorPerTx) external onlyOwner {
        maxGasSponsorPerTx = _maxGasSponsorPerTx;
        emit MaxGasSponsorUpdated(_maxGasSponsorPerTx);
    }

    /// @notice Set daily gas limit per user
    function setMaxDailyGasPerUser(uint256 _maxDailyGasPerUser) external onlyOwner {
        maxDailyGasPerUser = _maxDailyGasPerUser;
    }

    /// @notice Set relayer reward percentage
    function setRelayerRewardPercent(uint256 _percent) external onlyOwner {
        require(_percent <= 50, "Reward percent too high");
        relayerRewardPercent = _percent;
    }

    /// @notice Get user's nonce
    function getNonce(address signer) external view returns (uint256) {
        return nonces[signer];
    }

    /// @notice Get user's gas spent today
    function getGasSpent(address user) external view returns (uint256) {
        return gasSpent[user];
    }

    /// @notice Get remaining daily gas allowance for user
    function getRemainingDailyGas(address user) external view returns (uint256) {
        uint256 remaining = gasSpent[user] >= maxDailyGasPerUser ? 0 : maxDailyGasPerUser - gasSpent[user];
        return remaining;
    }

    /// @notice Check if address is approved relayer
    function isApprovedRelayer(address relayer) external view returns (bool) {
        return approvedRelayers[relayer];
    }

    /// @notice Get batch transaction details
    function getBatch(uint256 batchId) external view returns (BatchTransaction memory) {
        require(batchId < nextBatchId, "Batch does not exist");
        return batches[batchId];
    }

    /// @notice Withdraw accumulated fees
    function withdrawFees(uint256 amount) external onlyOwner {
        (bool success,) = owner().call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    /// @notice Emergency pause
    function pause() external onlyOwner {
        _pause();
    }

    /// @notice Resume operations
    function unpause() external onlyOwner {
        _unpause();
    }

    receive() external payable {}

    // Modifier to check relayer approval
    modifier onlyApprovedRelayer() {
        require(approvedRelayers[msg.sender], "Not approved relayer");
        _;
    }
}
