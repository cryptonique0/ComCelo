// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/// @title ComCeloAntiCheat
/// @notice Allows players to report suspected cheating and lets authorized reviewers resolve reports.
contract ComCeloAntiCheat is Ownable, Pausable, ReentrancyGuard {
    // Base Mainnet Deployed Addresses
    address public constant UNITS_ADDRESS = 0x7230b1E0efAa8578a418B42ce92bE6c78ceBa59E;
    address public constant TREASURY_ADDRESS = 0xd32283CcD387A58FF14314f2A103b58c96Bb61F9;
    address public constant CORE_ADDRESS = 0xa70b1163dB94bfdB38C11B820cF2C7094372c134;
    address public constant MATCHMAKER_ADDRESS = 0x7F5ACfe82A31498e057ebE2fE11be6AB0135a293;
    address public constant ACHIEVEMENTS_ADDRESS = 0xB73cC20D1C7aFA00f3c8C0e896a521D2E5bAE846;
    address public constant ANTICHEAT_ADDRESS = 0x3B4b40e5AA58B926C330F2581C38d94bd0302633;
    enum ReportStatus {
        Pending,
        Valid,
        Invalid
    }

    struct Report {
        uint256 gameId;
        address reporter;
        address accused;
        string evidenceURI; // IPFS or off-chain evidence
        uint256 createdAt;
        ReportStatus status;
        string resolutionNote;
    }

    uint256 public nextReportId;
    mapping(uint256 => Report) public reports;
    mapping(address => bool) public reviewers;

    event ReportSubmitted(uint256 indexed reportId, uint256 indexed gameId, address indexed accused, address reporter);
    event ReportResolved(uint256 indexed reportId, ReportStatus status, string note);
    event ReviewerUpdated(address indexed reviewer, bool allowed);

    modifier onlyReviewer() {
        require(reviewers[msg.sender] || msg.sender == owner(), "Not reviewer");
        _;
    }

    constructor() {}

    function setReviewer(address reviewer, bool allowed) external onlyOwner {
        reviewers[reviewer] = allowed;
        emit ReviewerUpdated(reviewer, allowed);
    }

    function submitReport(uint256 gameId, address accused, string calldata evidenceURI) external whenNotPaused returns (uint256 reportId) {
        require(accused != address(0), "Invalid accused");
        require(accused != msg.sender, "Cannot self-report");

        reportId = ++nextReportId;
        reports[reportId] = Report({
            gameId: gameId,
            reporter: msg.sender,
            accused: accused,
            evidenceURI: evidenceURI,
            createdAt: block.timestamp,
            status: ReportStatus.Pending,
            resolutionNote: ""
        });

        emit ReportSubmitted(reportId, gameId, accused, msg.sender);
    }

    function resolveReport(uint256 reportId, bool valid, string calldata note) external onlyReviewer whenNotPaused {
        Report storage r = reports[reportId];
        require(r.status == ReportStatus.Pending, "Already resolved");

        r.status = valid ? ReportStatus.Valid : ReportStatus.Invalid;
        r.resolutionNote = note;

        emit ReportResolved(reportId, r.status, note);
    }

    function getReport(uint256 reportId) external view returns (Report memory) {
        return reports[reportId];
    }
}
