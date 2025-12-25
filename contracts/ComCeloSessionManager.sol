// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title ComCeloSessionManager
/// @notice Manages peer-to-peer game sessions, lifecycle, and result reporting.
contract ComCeloSessionManager is Ownable, Pausable, ReentrancyGuard {
    enum SessionStatus {
        Created,
        Active,
        Completed,
        Disputed,
        Cancelled
    }

    struct Session {
        uint256 gameId;
        address player1;
        address player2;
        uint256 stake;
        bool ranked;
        SessionStatus status;
        uint256 createdAt;
        uint256 startedAt;
        uint256 finishedAt;
        address winner;
        string resultURI; // IPFS or off-chain reference to game log / oracle claim
    }

    mapping(uint256 => Session) public sessions;
    uint256 public nextSessionId;

    mapping(address => bool) public reporters;

    event SessionCreated(uint256 indexed sessionId, uint256 indexed gameId, address indexed player1, address player2, bool ranked, uint256 stake);
    event SessionStarted(uint256 indexed sessionId, uint256 startedAt);
    event SessionCompleted(uint256 indexed sessionId, address indexed winner, string resultURI);
    event SessionDisputed(uint256 indexed sessionId, address indexed challenger, string reason);
    event SessionCancelled(uint256 indexed sessionId, string reason);
    event ReporterUpdated(address indexed reporter, bool allowed);

    modifier onlyReporter() {
        require(reporters[msg.sender] || owner() == msg.sender, "Not authorized reporter");
        _;
    }

    constructor() {}

    function setReporter(address reporter, bool allowed) external onlyOwner {
        reporters[reporter] = allowed;
        emit ReporterUpdated(reporter, allowed);
    }

    function createSession(
        uint256 gameId,
        address player1,
        address player2,
        bool ranked,
        uint256 stake
    ) external whenNotPaused returns (uint256 sessionId) {
        require(player1 != address(0) && player2 != address(0), "Invalid players");
        require(player1 != player2, "Players must differ");

        sessionId = ++nextSessionId;
        sessions[sessionId] = Session({
            gameId: gameId,
            player1: player1,
            player2: player2,
            stake: stake,
            ranked: ranked,
            status: SessionStatus.Created,
            createdAt: block.timestamp,
            startedAt: 0,
            finishedAt: 0,
            winner: address(0),
            resultURI: ""
        });

        emit SessionCreated(sessionId, gameId, player1, player2, ranked, stake);
    }

    function startSession(uint256 sessionId) external whenNotPaused {
        Session storage session = sessions[sessionId];
        require(session.status == SessionStatus.Created, "Invalid status");
        require(msg.sender == session.player1 || msg.sender == session.player2 || reporters[msg.sender] || msg.sender == owner(), "Not allowed");

        session.status = SessionStatus.Active;
        session.startedAt = block.timestamp;

        emit SessionStarted(sessionId, session.startedAt);
    }

    function completeSession(
        uint256 sessionId,
        address winner,
        string calldata resultURI
    ) external whenNotPaused onlyReporter nonReentrant {
        Session storage session = sessions[sessionId];
        require(session.status == SessionStatus.Active, "Session not active");
        require(winner == session.player1 || winner == session.player2, "Invalid winner");

        session.status = SessionStatus.Completed;
        session.finishedAt = block.timestamp;
        session.winner = winner;
        session.resultURI = resultURI;

        emit SessionCompleted(sessionId, winner, resultURI);
    }

    function disputeSession(uint256 sessionId, string calldata reason) external whenNotPaused {
        Session storage session = sessions[sessionId];
        require(session.status == SessionStatus.Completed, "Not completed");
        require(msg.sender == session.player1 || msg.sender == session.player2, "Only players");

        session.status = SessionStatus.Disputed;
        emit SessionDisputed(sessionId, msg.sender, reason);
    }

    function resolveDispute(
        uint256 sessionId,
        address winner,
        string calldata resultURI
    ) external whenNotPaused onlyReporter {
        Session storage session = sessions[sessionId];
        require(session.status == SessionStatus.Disputed, "Not disputed");
        require(winner == session.player1 || winner == session.player2, "Invalid winner");

        session.status = SessionStatus.Completed;
        session.finishedAt = block.timestamp;
        session.winner = winner;
        session.resultURI = resultURI;

        emit SessionCompleted(sessionId, winner, resultURI);
    }

    function cancelSession(uint256 sessionId, string calldata reason) external whenNotPaused {
        Session storage session = sessions[sessionId];
        require(session.status == SessionStatus.Created || session.status == SessionStatus.Active, "Cannot cancel");
        require(msg.sender == session.player1 || msg.sender == session.player2 || msg.sender == owner(), "Not allowed");

        session.status = SessionStatus.Cancelled;
        session.finishedAt = block.timestamp;

        emit SessionCancelled(sessionId, reason);
    }

    function getSession(uint256 sessionId) external view returns (Session memory) {
        return sessions[sessionId];
    }
}
