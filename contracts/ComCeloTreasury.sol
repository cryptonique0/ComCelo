// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloTreasury
/// @notice Manages fees, prize pools, and tournament rewards.
contract ComCeloTreasury is Ownable, Pausable {
    uint256 public platformFeePercentage = 5; // 5%
    uint256 public totalCollected;

    mapping(address => uint256) public playerBalances;
    mapping(bytes32 => uint256) public tournamentPrizePool;

    event FeeCollected(uint256 amount);
    event PrizeAwarded(address indexed winner, uint256 amount, bytes32 tournamentId);
    event Withdrawal(address indexed player, uint256 amount);
    event PlatformFeeUpdated(uint256 newPercentage);

    constructor() {}

    function collectFee(uint256 amount) external whenNotPaused returns (uint256 fee) {
        require(amount > 0, "Amount must be positive");
        fee = (amount * platformFeePercentage) / 100;
        totalCollected += fee;
        emit FeeCollected(fee);
    }

    function addTournamentPrize(bytes32 tournamentId, uint256 amount) external payable {
        require(msg.value >= amount, "Insufficient funds");
        tournamentPrizePool[tournamentId] += amount;
    }

    function awardPrize(address winner, uint256 amount, bytes32 tournamentId) external onlyOwner {
        require(winner != address(0), "Invalid winner");
        require(tournamentPrizePool[tournamentId] >= amount, "Insufficient prize pool");

        tournamentPrizePool[tournamentId] -= amount;
        playerBalances[winner] += amount;

        emit PrizeAwarded(winner, amount, tournamentId);
    }

    function withdrawBalance() external {
        uint256 balance = playerBalances[msg.sender];
        require(balance > 0, "No balance to withdraw");

        playerBalances[msg.sender] = 0;
        (bool success,) = msg.sender.call{value: balance}("");
        require(success, "Withdrawal failed");

        emit Withdrawal(msg.sender, balance);
    }

    function updatePlatformFee(uint256 newPercentage) external onlyOwner {
        require(newPercentage <= 100, "Fee cannot exceed 100%");
        platformFeePercentage = newPercentage;
        emit PlatformFeeUpdated(newPercentage);
    }

    function getPlayerBalance(address player) external view returns (uint256) {
        return playerBalances[player];
    }

    function getTournamentPrizePool(bytes32 tournamentId) external view returns (uint256) {
        return tournamentPrizePool[tournamentId];
    }
}
