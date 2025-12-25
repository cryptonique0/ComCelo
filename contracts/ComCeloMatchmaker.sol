// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloMatchmaker
/// @notice Handles game invites, matchmaking queue, and ranked/unranked games.
contract ComCeloMatchmaker is Ownable, Pausable {
    // Base Mainnet Deployed Addresses
    address public constant UNITS_ADDRESS = 0x7230b1E0efAa8578a418B42ce92bE6c78ceBa59E;
    address public constant TREASURY_ADDRESS = 0xd32283CcD387A58FF14314f2A103b58c96Bb61F9;
    address public constant CORE_ADDRESS = 0xa70b1163dB94bfdB38C11B820cF2C7094372c134;
    address public constant MATCHMAKER_ADDRESS = 0x7F5ACfe82A31498e057ebE2fE11be6AB0135a293;
    enum GameMode {
        Unranked,
        Ranked
    }

    struct Invite {
        uint256 gameId;
        address creator;
        address opponent;
        GameMode mode;
        uint256 stake;
        uint256 createdAt;
        bool accepted;
    }

    mapping(uint256 => Invite) public invites;
    uint256 public nextInviteId;

    address[] public quickMatchQueue;
    mapping(address => uint256) public playerQueueIndex;

    event InviteCreated(
        uint256 indexed inviteId,
        address indexed creator,
        address indexed opponent,
        GameMode mode,
        uint256 stake
    );
    event InviteAccepted(uint256 indexed inviteId, uint256 gameId);
    event InviteCancelled(uint256 indexed inviteId);
    event PlayerQueueJoined(address indexed player);
    event PlayerQueueLeft(address indexed player);

    constructor() {}

    function createInvite(address opponent, GameMode mode, uint256 stake) external whenNotPaused returns (uint256 inviteId) {
        require(opponent != msg.sender, "Cannot invite yourself");
        require(opponent != address(0), "Invalid opponent");

        inviteId = ++nextInviteId;
        invites[inviteId] = Invite({
            gameId: 0,
            creator: msg.sender,
            opponent: opponent,
            mode: mode,
            stake: stake,
            createdAt: block.timestamp,
            accepted: false
        });

        emit InviteCreated(inviteId, msg.sender, opponent, mode, stake);
    }

    function acceptInvite(uint256 inviteId, uint256 gameId) external {
        Invite storage invite = invites[inviteId];
        require(invite.opponent == msg.sender, "Only opponent can accept");
        require(!invite.accepted, "Invite already accepted");

        invite.accepted = true;
        invite.gameId = gameId;
        emit InviteAccepted(inviteId, gameId);
    }

    function cancelInvite(uint256 inviteId) external {
        Invite storage invite = invites[inviteId];
        require(invite.creator == msg.sender, "Only creator can cancel");
        require(!invite.accepted, "Cannot cancel accepted invite");

        delete invites[inviteId];
        emit InviteCancelled(inviteId);
    }

    function joinQuickMatchQueue() external whenNotPaused {
        require(playerQueueIndex[msg.sender] == 0, "Already in queue");
        quickMatchQueue.push(msg.sender);
        playerQueueIndex[msg.sender] = quickMatchQueue.length;
        emit PlayerQueueJoined(msg.sender);
    }

    function leaveQuickMatchQueue() external {
        uint256 index = playerQueueIndex[msg.sender];
        require(index > 0, "Not in queue");

        uint256 lastIndex = quickMatchQueue.length - 1;
        address lastPlayer = quickMatchQueue[lastIndex];

        quickMatchQueue[index - 1] = lastPlayer;
        playerQueueIndex[lastPlayer] = index;

        quickMatchQueue.pop();
        delete playerQueueIndex[msg.sender];

        emit PlayerQueueLeft(msg.sender);
    }

    function getQueueLength() external view returns (uint256) {
        return quickMatchQueue.length;
    }

    function getInvite(uint256 inviteId) external view returns (Invite memory) {
        return invites[inviteId];
    }
}
