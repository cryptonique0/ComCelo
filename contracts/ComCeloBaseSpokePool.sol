// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title ComCeloBaseSpokePool
 * @dev Base chain spoke pool for cross-chain game transfers
 * Connects Base chain to Celo mainnet via Across Protocol pattern
 * 
 * Enables:
 * - Cross-chain token transfers (CELO <-> ETH on Base)
 * - Cross-chain reward bridging
 * - Multi-chain player profiles
 */
contract ComCeloBaseSpokePool is Ownable, Pausable, ReentrancyGuard {
    // Base Mainnet Deployed Addresses
    address public constant UNITS_ADDRESS = 0x7230b1E0efAa8578a418B42ce92bE6c78ceBa59E;
    address public constant TREASURY_ADDRESS = 0xd32283CcD387A58FF14314f2A103b58c96Bb61F9;
    address public constant CORE_ADDRESS = 0xa70b1163dB94bfdB38C11B820cF2C7094372c134;
    address public constant MATCHMAKER_ADDRESS = 0x7F5ACfe82A31498e057ebE2fE11be6AB0135a293;
    address public constant ACHIEVEMENTS_ADDRESS = 0xB73cC20D1C7aFA00f3c8C0e896a521D2E5bAE846;
    address public constant ANTICHEAT_ADDRESS = 0x3B4b40e5AA58B926C330F2581C38d94bd0302633;
    // Chain IDs
    uint256 public constant CELO_MAINNET = 42220;
    uint256 public constant BASE_MAINNET = 8453;
    uint256 public constant BASE_SEPOLIA = 84532;

    // Transfer states
    enum TransferState {
        INITIATED,
        RELAYED,
        FILLED,
        SETTLED,
        EXPIRED
    }

    struct CrossChainTransfer {
        uint256 id;
        address originSender;
        address destinationRecipient;
        uint256 sourceChainId;
        uint256 destinationChainId;
        uint256 amount;
        TransferState state;
        uint256 createdAt;
        uint256 settledAt;
        bytes32 sourceHash; // Hash of source transaction
        bytes32 destinationHash; // Hash of destination transaction
    }

    struct RelayerFee {
        uint256 feePercentage; // 0-10000 (0-100%)
        uint256 minFee;
        uint256 maxFee;
    }

    // State variables
    mapping(uint256 => CrossChainTransfer) public transfers;
    mapping(address => uint256[]) public playerTransfers;
    mapping(address => bool) public relayers;
    
    uint256 public transferCounter;
    uint256 public totalTransferred;
    uint256 public settlementPeriod; // Time to settle cross-chain transfer

    RelayerFee public relayerFee;
    address public treasuryAddress;

    // Events
    event TransferInitiated(
        uint256 indexed transferId,
        address indexed sender,
        address indexed recipient,
        uint256 sourceChain,
        uint256 destChain,
        uint256 amount
    );

    event TransferRelayed(
        uint256 indexed transferId,
        address indexed relayer,
        uint256 amount
    );

    event TransferSettled(
        uint256 indexed transferId,
        bytes32 sourceHash,
        bytes32 destHash
    );

    event RelayerRegistered(address indexed relayer);
    event RelayerUnregistered(address indexed relayer);
    event FeeUpdated(uint256 newFeePercentage, uint256 minFee, uint256 maxFee);

    constructor(address _treasuryAddress) {
        treasuryAddress = _treasuryAddress;
        settlementPeriod = 1 hours;
        relayerFee = RelayerFee({
            feePercentage: 50, // 0.5%
            minFee: 0.001 ether,
            maxFee: 1 ether
        });
    }

    /**
     * @dev Initiate a cross-chain transfer
     */
    function initiateTransfer(
        address recipient,
        uint256 sourceChain,
        uint256 destinationChain,
        uint256 amount
    ) external payable nonReentrant whenNotPaused returns (uint256) {
        require(recipient != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be > 0");
        require(msg.value >= amount, "Insufficient ETH sent");
        require(
            (sourceChain == BASE_MAINNET && destinationChain == CELO_MAINNET) ||
            (sourceChain == BASE_SEPOLIA && destinationChain == BASE_SEPOLIA),
            "Invalid chain pair"
        );

        uint256 transferId = transferCounter++;
        
        // Calculate fee
        uint256 fee = _calculateFee(amount);

        transfers[transferId] = CrossChainTransfer({
            id: transferId,
            originSender: msg.sender,
            destinationRecipient: recipient,
            sourceChainId: sourceChain,
            destinationChainId: destinationChain,
            amount: amount - fee,
            state: TransferState.INITIATED,
            createdAt: block.timestamp,
            settledAt: 0,
            sourceHash: bytes32(0),
            destinationHash: bytes32(0)
        });

        playerTransfers[msg.sender].push(transferId);
        totalTransferred += amount - fee;

        // Send fee to treasury
        if (fee > 0) {
            (bool success, ) = payable(treasuryAddress).call{value: fee}("");
            require(success, "Fee transfer failed");
        }

        emit TransferInitiated(
            transferId,
            msg.sender,
            recipient,
            sourceChain,
            destinationChain,
            amount - fee
        );

        return transferId;
    }

    /**
     * @dev Relay a transfer (by relayer network)
     */
    function relayTransfer(
        uint256 transferId,
        bytes32 sourceHash
    ) external onlyRelayer whenNotPaused {
        require(transferId < transferCounter, "Invalid transfer ID");
        
        CrossChainTransfer storage transfer = transfers[transferId];
        require(transfer.state == TransferState.INITIATED, "Not initiated");

        transfer.state = TransferState.RELAYED;
        transfer.sourceHash = sourceHash;

        emit TransferRelayed(transferId, msg.sender, transfer.amount);
    }

    /**
     * @dev Settle a cross-chain transfer
     */
    function settleTransfer(
        uint256 transferId,
        bytes32 destinationHash
    ) external onlyOwner {
        require(transferId < transferCounter, "Invalid transfer ID");
        
        CrossChainTransfer storage transfer = transfers[transferId];
        require(transfer.state == TransferState.RELAYED, "Not relayed");
        require(
            block.timestamp >= transfer.createdAt + settlementPeriod,
            "Settlement period not elapsed"
        );

        transfer.state = TransferState.SETTLED;
        transfer.destinationHash = destinationHash;
        transfer.settledAt = block.timestamp;

        emit TransferSettled(transferId, transfer.sourceHash, destinationHash);
    }

    /**
     * @dev Mark transfer as expired (refundable)
     */
    function expireTransfer(uint256 transferId) external onlyOwner {
        require(transferId < transferCounter, "Invalid transfer ID");
        
        CrossChainTransfer storage transfer = transfers[transferId];
        require(transfer.state != TransferState.SETTLED, "Already settled");
        require(
            block.timestamp >= transfer.createdAt + (settlementPeriod * 2),
            "Not expired yet"
        );

        transfer.state = TransferState.EXPIRED;
    }

    /**
     * @dev Calculate transfer fee
     */
    function _calculateFee(uint256 amount) internal view returns (uint256) {
        uint256 percentageFee = (amount * relayerFee.feePercentage) / 10000;
        uint256 fee = percentageFee < relayerFee.minFee
            ? relayerFee.minFee
            : percentageFee > relayerFee.maxFee
            ? relayerFee.maxFee
            : percentageFee;
        return fee;
    }

    /**
     * @dev Register relayer
     */
    function registerRelayer(address relayer) external onlyOwner {
        require(relayer != address(0), "Invalid relayer");
        relayers[relayer] = true;
        emit RelayerRegistered(relayer);
    }

    /**
     * @dev Unregister relayer
     */
    function unregisterRelayer(address relayer) external onlyOwner {
        relayers[relayer] = false;
        emit RelayerUnregistered(relayer);
    }

    /**
     * @dev Get transfer details
     */
    function getTransfer(uint256 transferId)
        external
        view
        returns (CrossChainTransfer memory)
    {
        require(transferId < transferCounter, "Invalid transfer ID");
        return transfers[transferId];
    }

    /**
     * @dev Get player's transfers
     */
    function getPlayerTransfers(address player)
        external
        view
        returns (uint256[] memory)
    {
        return playerTransfers[player];
    }

    /**
     * @dev Update relayer fee
     */
    function updateRelayerFee(
        uint256 feePercentage,
        uint256 minFee,
        uint256 maxFee
    ) external onlyOwner {
        require(feePercentage <= 10000, "Fee too high");
        require(minFee <= maxFee, "Min > Max");

        relayerFee = RelayerFee({
            feePercentage: feePercentage,
            minFee: minFee,
            maxFee: maxFee
        });

        emit FeeUpdated(feePercentage, minFee, maxFee);
    }

    /**
     * @dev Set settlement period
     */
    function setSettlementPeriod(uint256 newPeriod) external onlyOwner {
        require(newPeriod > 0 && newPeriod <= 7 days, "Invalid period");
        settlementPeriod = newPeriod;
    }

    /**
     * @dev Pause pool (emergency)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause pool
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Modifier: only relayers
     */
    modifier onlyRelayer() {
        require(relayers[msg.sender], "Not relayer");
        _;
    }

    /**
     * @dev Emergency: Withdraw stuck funds
     */
    function emergencyWithdraw(uint256 amount) external onlyOwner {
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");
    }

    // Receive function to accept ETH
    receive() external payable {}
}
