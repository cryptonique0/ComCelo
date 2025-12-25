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

    struct Match {
        address player1;
        address player2;
        address winner;
        uint256 round;
        bool completed;
    }

    mapping(uint256 => Tournament) public tournaments;
    mapping(uint256 => address[]) public participants;
    mapping(uint256 => Match[]) public matches;
    mapping(uint256 => uint256) public currentRound;

    uint256 public nextTournamentId;
    mapping(address => mapping(uint256 => bool)) public playerRegistered;

    event TournamentCreated(uint256 indexed tournamentId, string name, uint256 entryFee);
    event PlayerRegistered(uint256 indexed tournamentId, address indexed player);
    event MatchCreated(uint256 indexed tournamentId, uint256 matchId, uint256 round, address player1, address player2);
    event MatchCompleted(uint256 indexed tournamentId, uint256 matchId, address winner);
    event RoundAdvanced(uint256 indexed tournamentId, uint256 newRound);
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
        address[] storage tournamentParticipants = participants[tournamentId];
        require(tournamentParticipants.length > 1, "Need at least 2 players");

        tournament.status = TournamentStatus.InProgress;
        currentRound[tournamentId] = 1;

        _createRoundMatches(tournamentId, tournamentParticipants, 1);
        emit RoundAdvanced(tournamentId, 1);
    }

    function recordMatchResult(uint256 tournamentId, uint256 matchId, address winner) external onlyOwner {
        require(matchId < matches[tournamentId].length, "Invalid match");
        Match storage m = matches[tournamentId][matchId];
        require(!m.completed, "Match completed");
        require(winner == m.player1 || winner == m.player2, "Invalid winner");

        m.winner = winner;
        m.completed = true;
        emit MatchCompleted(tournamentId, matchId, winner);

        // Check if all matches in current round are done
        uint256 round = m.round;
        if (_roundCompleted(tournamentId, round)) {
            _advanceRound(tournamentId, round);
        }
    }

    function _roundCompleted(uint256 tournamentId, uint256 round) internal view returns (bool) {
        uint256 total;
        uint256 done;
        for (uint256 i = 0; i < matches[tournamentId].length; i++) {
            if (matches[tournamentId][i].round == round) {
                total++;
                if (matches[tournamentId][i].completed) {
                    done++;
                }
            }
        }
        return total > 0 && done == total;
    }

    function _advanceRound(uint256 tournamentId, uint256 round) internal {
        Tournament storage tournament = tournaments[tournamentId];
        address[] memory winners = _collectRoundWinners(tournamentId, round);

        if (winners.length == 1) {
            tournament.status = TournamentStatus.Completed;
            tournament.winner = winners[0];
            emit TournamentCompleted(tournamentId, winners[0]);
            return;
        }

        uint256 nextRound = round + 1;
        _createRoundMatches(tournamentId, winners, nextRound);
        currentRound[tournamentId] = nextRound;
        emit RoundAdvanced(tournamentId, nextRound);
    }

    function _collectRoundWinners(uint256 tournamentId, uint256 round) internal view returns (address[] memory) {
        // Count winners first
        uint256 count;
        for (uint256 i = 0; i < matches[tournamentId].length; i++) {
            if (matches[tournamentId][i].round == round) {
                count++;
            }
        }

        address[] memory winners = new address[](count);
        uint256 idx;
        for (uint256 i = 0; i < matches[tournamentId].length; i++) {
            Match memory m = matches[tournamentId][i];
            if (m.round == round) {
                // If unmatched bye, winner may be preset to player1
                address w = m.winner == address(0) && m.player2 == address(0) ? m.player1 : m.winner;
                winners[idx++] = w;
            }
        }
        return winners;
    }

    function _createRoundMatches(uint256 tournamentId, address[] memory entrants, uint256 round) internal {
        for (uint256 i = 0; i < entrants.length; i += 2) {
            address p1 = entrants[i];
            address p2 = i + 1 < entrants.length ? entrants[i + 1] : address(0);

            Match memory m = Match({
                player1: p1,
                player2: p2,
                winner: p2 == address(0) ? p1 : address(0), // auto-advance on bye
                round: round,
                completed: p2 == address(0)
            });

            matches[tournamentId].push(m);
            emit MatchCreated(tournamentId, matches[tournamentId].length - 1, round, p1, p2);
        }
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

    function getMatches(uint256 tournamentId) external view returns (Match[] memory) {
        return matches[tournamentId];
    }

    // Backwards compatibility alias
    function getBrackets(uint256 tournamentId) external view returns (Match[] memory) {
        return matches[tournamentId];
    }
}
