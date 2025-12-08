// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";

/// @title ComCeloTournaments
/// @notice Manages tournaments, brackets, and tournament prizes
contract ComCeloTournaments is Ownable, Pausable {
    enum TournamentStatus {
        Registration,
        InProgress,
        Completed,
        Cancelled
    }

    struct Tournament {
        uint256 id;
        string name;
        uint256 entryFee;
        uint256 maxPlayers;
        uint256 prizePool;
        uint256 createdAt;
        TournamentStatus status;
        address winner;
    }

    struct TournamentBracket {
        uint256 tournamentId;
        address player1;
        address player2;
        address winner;
        bool completed;
    }

    mapping(uint256 => Tournament) public tournaments;
    mapping(uint256 => address[]) public participants;
    mapping(uint256 => TournamentBracket[]) public brackets;

    uint256 public nextTournamentId;
    mapping(address => mapping(uint256 => bool)) public playerRegistered;

    event TournamentCreated(uint256 indexed tournamentId, string name, uint256 entryFee);
    event PlayerRegistered(uint256 indexed tournamentId, address indexed player);
    event BracketCreated(uint256 indexed tournamentId, uint256 bracketId, address player1, address player2);
    event TournamentCompleted(uint256 indexed tournamentId, address indexed winner);

    constructor() {
        nextTournamentId = 0;
    }

    function createTournament(
        string memory name,
        uint256 entryFee,
        uint256 maxPlayers,
        uint256 prizePool
    ) external onlyOwner returns (uint256 tournamentId) {
        require(maxPlayers > 0, "Invalid max players");
        tournamentId = nextTournamentId++;

        tournaments[tournamentId] = Tournament({
            id: tournamentId,
            name: name,
            entryFee: entryFee,
            maxPlayers: maxPlayers,
            prizePool: prizePool,
            createdAt: block.timestamp,
            status: TournamentStatus.Registration,
            winner: address(0)
        });

        emit TournamentCreated(tournamentId, name, entryFee);
    }

    function registerForTournament(uint256 tournamentId) external payable {
        Tournament storage tournament = tournaments[tournamentId];
        require(tournament.status == TournamentStatus.Registration, "Registration closed");
        require(msg.value >= tournament.entryFee, "Insufficient entry fee");
        require(participants[tournamentId].length < tournament.maxPlayers, "Tournament full");
        require(!playerRegistered[msg.sender][tournamentId], "Already registered");

        participants[tournamentId].push(msg.sender);
        playerRegistered[msg.sender][tournamentId] = true;

        tournament.prizePool += msg.value;

        emit PlayerRegistered(tournamentId, msg.sender);
    }

    function startTournament(uint256 tournamentId) external onlyOwner {
        Tournament storage tournament = tournaments[tournamentId];
        require(tournament.status == TournamentStatus.Registration, "Already started");
        tournament.status = TournamentStatus.InProgress;

        address[] storage tournamentParticipants = participants[tournamentId];
        require(tournamentParticipants.length > 0, "No participants");

        // Create initial brackets (simplified single elimination)
        for (uint256 i = 0; i < tournamentParticipants.length - 1; i += 2) {
            TournamentBracket memory bracket = TournamentBracket({
                tournamentId: tournamentId,
                player1: tournamentParticipants[i],
                player2: tournamentParticipants[i + 1],
                winner: address(0),
                completed: false
            });

            brackets[tournamentId].push(bracket);
            emit BracketCreated(tournamentId, brackets[tournamentId].length - 1, bracket.player1, bracket.player2);
        }
    }

    function completeBracket(uint256 tournamentId, uint256 bracketId, address winner) external onlyOwner {
        require(bracketId < brackets[tournamentId].length, "Invalid bracket");
        require(
            winner == brackets[tournamentId][bracketId].player1 || winner == brackets[tournamentId][bracketId].player2,
            "Invalid winner"
        );

        brackets[tournamentId][bracketId].winner = winner;
        brackets[tournamentId][bracketId].completed = true;
    }

    function completeTournament(uint256 tournamentId, address winner) external onlyOwner {
        Tournament storage tournament = tournaments[tournamentId];
        require(tournament.status == TournamentStatus.InProgress, "Tournament not in progress");

        tournament.status = TournamentStatus.Completed;
        tournament.winner = winner;

        emit TournamentCompleted(tournamentId, winner);
    }

    function getTournament(uint256 tournamentId) external view returns (Tournament memory) {
        return tournaments[tournamentId];
    }

    function getParticipants(uint256 tournamentId) external view returns (address[] memory) {
        return participants[tournamentId];
    }

    function getBrackets(uint256 tournamentId) external view returns (TournamentBracket[] memory) {
        return brackets[tournamentId];
    }
}
