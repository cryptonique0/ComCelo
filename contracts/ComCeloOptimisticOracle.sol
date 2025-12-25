// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

/**
 * @title ComCeloOptimisticOracle
 * @dev Optimistic oracle for verifying game results and cross-chain data
 * Inspired by UMA's optimistic oracle pattern for Base/OP chains
 * 
 * This oracle enables:
 * - Off-chain computation with on-chain verification
 * - Game result assertion with challenge period
 * - Cross-chain result propagation
 * - Bonded assertions for security
 */
contract ComCeloOptimisticOracle is Ownable, Pausable {
    // Request types
    enum RequestType {
        GAME_RESULT,           // Verify game result
        PLAYER_STATS,          // Verify player statistics
        TOURNAMENT_BRACKET,    // Verify tournament bracket
        CROSS_CHAIN_DATA,      // Cross-chain data verification
        PRICE_FEED             // Price feed data
    }

    // Assertion states
    enum AssertionState {
        PENDING,      // Awaiting challenge period
        CHALLENGED,   // Under dispute
        RESOLVED,     // Settled
        DISPUTED      // Permanently disputed
    }

    struct Assertion {
        uint256 id;
        RequestType requestType;
        address asserter;
        string dataHash; // IPFS hash or data identifier
        string claimData; // The actual claim being made
        uint256 bond; // Bond amount (wei)
        AssertionState state;
        uint256 createdAt;
        uint256 resolvedAt;
        bool result; // true = assertion upheld, false = assertion false
    }

    struct Challenge {
        uint256 assertionId;
        address challenger;
        string evidence; // IPFS hash of challenge evidence
        uint256 timestamp;
        bool resolved;
        bool challengeSucceeded;
    }

    // State variables
    mapping(uint256 => Assertion) public assertions;
    mapping(uint256 => Challenge[]) public challenges;
    mapping(address => uint256) public playerBonds;
    
    uint256 public assertionCounter;
    uint256 public challengePeriod; // Time to challenge (default 24 hours)
    uint256 public minimumBond; // Minimum bond required
    
    uint256 public totalDisputed;
    uint256 public totalResolved;

    // Events
    event AssertionCreated(
        uint256 indexed assertionId,
        address indexed asserter,
        RequestType requestType,
        string dataHash,
        uint256 bond
    );
    
    event ChallengePeriodStarted(uint256 indexed assertionId, uint256 expiresAt);
    
    event ChallengeSubmitted(
        uint256 indexed assertionId,
        address indexed challenger,
        string evidence
    );
    
    event AssertionResolved(
        uint256 indexed assertionId,
        bool result,
        uint256 resolvedAt
    );
    
    event BondReturned(address indexed asserter, uint256 amount);
    event BondSlashed(address indexed asserter, uint256 amount);

    constructor() {
        challengePeriod = 24 hours; // 24-hour challenge window
        minimumBond = 0.1 ether;    // 0.1 ETH minimum bond
    }

    /**
     * @dev Create a new assertion (requires bond)
     */
    function createAssertion(
        RequestType requestType,
        string memory dataHash,
        string memory claimData,
        uint256 bond
    ) external payable whenNotPaused returns (uint256) {
        require(msg.value >= minimumBond, "Bond below minimum");
        require(msg.value >= bond, "Insufficient bond sent");
        require(bytes(dataHash).length > 0, "Data hash required");
        require(bytes(claimData).length > 0, "Claim data required");

        uint256 assertionId = assertionCounter++;

        assertions[assertionId] = Assertion({
            id: assertionId,
            requestType: requestType,
            asserter: msg.sender,
            dataHash: dataHash,
            claimData: claimData,
            bond: bond,
            state: AssertionState.PENDING,
            createdAt: block.timestamp,
            resolvedAt: 0,
            result: false
        });

        playerBonds[msg.sender] += bond;

        emit AssertionCreated(assertionId, msg.sender, requestType, dataHash, bond);
        emit ChallengePeriodStarted(assertionId, block.timestamp + challengePeriod);

        return assertionId;
    }

    /**
     * @dev Challenge an assertion with evidence
     */
    function challengeAssertion(
        uint256 assertionId,
        string memory evidence
    ) external payable whenNotPaused {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        
        Assertion storage assertion = assertions[assertionId];
        require(assertion.state == AssertionState.PENDING, "Assertion not pending");
        require(
            block.timestamp <= assertion.createdAt + challengePeriod,
            "Challenge period expired"
        );
        require(msg.sender != assertion.asserter, "Cannot challenge own assertion");
        require(msg.value >= assertion.bond, "Challenge bond insufficient");

        assertion.state = AssertionState.CHALLENGED;

        challenges[assertionId].push(Challenge({
            assertionId: assertionId,
            challenger: msg.sender,
            evidence: evidence,
            timestamp: block.timestamp,
            resolved: false,
            challengeSucceeded: false
        }));

        emit ChallengeSubmitted(assertionId, msg.sender, evidence);
    }

    /**
     * @dev Resolve assertion (by owner/oracle)
     * In production, this would be called by oracle network
     */
    function resolveAssertion(
        uint256 assertionId,
        bool result,
        address slashAddress
    ) external onlyOwner {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        
        Assertion storage assertion = assertions[assertionId];
        require(assertion.state != AssertionState.RESOLVED, "Already resolved");

        assertion.state = AssertionState.RESOLVED;
        assertion.result = result;
        assertion.resolvedAt = block.timestamp;

        totalResolved++;

        if (!result && slashAddress != address(0)) {
            // Assertion was false - slash bond
            playerBonds[slashAddress] = playerBonds[slashAddress] > assertion.bond
                ? playerBonds[slashAddress] - assertion.bond
                : 0;
            emit BondSlashed(slashAddress, assertion.bond);
        } else if (result) {
            // Assertion was true - return bond
            emit BondReturned(assertion.asserter, assertion.bond);
        }

        emit AssertionResolved(assertionId, result, block.timestamp);
    }

    /**
     * @dev Mark assertion as disputed (cannot be resolved)
     */
    function markDisputed(uint256 assertionId) external onlyOwner {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        
        Assertion storage assertion = assertions[assertionId];
        assertion.state = AssertionState.DISPUTED;
        totalDisputed++;

        emit AssertionResolved(assertionId, false, block.timestamp);
    }

    /**
     * @dev Get assertion details
     */
    function getAssertion(uint256 assertionId)
        external
        view
        returns (Assertion memory)
    {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        return assertions[assertionId];
    }

    /**
     * @dev Get challenges for an assertion
     */
    function getChallenges(uint256 assertionId)
        external
        view
        returns (Challenge[] memory)
    {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        return challenges[assertionId];
    }

    /**
     * @dev Check if assertion can still be challenged
     */
    function canChallenge(uint256 assertionId) external view returns (bool) {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        
        Assertion memory assertion = assertions[assertionId];
        return (
            assertion.state == AssertionState.PENDING &&
            block.timestamp <= assertion.createdAt + challengePeriod
        );
    }

    /**
     * @dev Get time remaining for challenge period
     */
    function getTimeUntilResolution(uint256 assertionId) external view returns (uint256) {
        require(assertionId < assertionCounter, "Invalid assertion ID");
        
        Assertion memory assertion = assertions[assertionId];
        uint256 deadline = assertion.createdAt + challengePeriod;
        
        if (block.timestamp >= deadline) return 0;
        return deadline - block.timestamp;
    }

    /**
     * @dev Get player's total bond amount
     */
    function getPlayerBond(address player) external view returns (uint256) {
        return playerBonds[player];
    }

    /**
     * @dev Set challenge period (owner only)
     */
    function setChallengePeriod(uint256 newPeriod) external onlyOwner {
        require(newPeriod > 0, "Period must be > 0");
        require(newPeriod <= 7 days, "Period too long");
        challengePeriod = newPeriod;
    }

    /**
     * @dev Set minimum bond (owner only)
     */
    function setMinimumBond(uint256 newBond) external onlyOwner {
        minimumBond = newBond;
    }

    /**
     * @dev Pause oracle (emergency)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause oracle
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Withdraw resolved bonds (owner only)
     */
    function withdrawResolvedBonds(address recipient, uint256 amount) 
        external 
        onlyOwner 
    {
        require(recipient != address(0), "Invalid recipient");
        (bool success, ) = payable(recipient).call{value: amount}("");
        require(success, "Withdrawal failed");
    }
}
