# ComCelo Smart Contracts Documentation

## Overview

ComCelo is a suite of modular Solidity contracts that enable 1v1 tactical duels on the Celo blockchain. All contracts follow OpenZeppelin best practices and include security guards against reentrancy, overflow/underflow, and unauthorized access.

---

## ComCeloCore.sol

**Location:** `contracts/ComCeloCore.sol`

Core game engine storing game state and enforcing game rules.

### Enums

```solidity
enum GameStatus {
    None,
    WaitingForOpponent,
    Active,
    Finished,
    Cancelled
}
```

### Structs

#### GameOptions
```solidity
struct GameOptions {
    bool ranked;
    uint8 maxTurns;
    uint256 stake;
}
```
Configuration for a new game.

#### UnitState
```solidity
struct UnitState {
    uint8 hp;
    uint8 attack;
    uint8 defense;
    uint8 range;
    uint8 x;
    uint8 y;
    bool defended;
}
```
Tracks a single unit's current stats and position on the 3x3 grid.

#### GameState
```solidity
struct GameState {
    GameStatus status;
    address player1;
    address player2;
    uint8 currentTurn;
    uint256 turnCount;
    UnitState[9] units;  // Max 9 units per game
}
```
Complete game snapshot.

### Functions

#### createGame
```solidity
function createGame(address opponent, GameOptions calldata options) 
  external 
  whenNotPaused 
  returns (uint256 gameId)
```
Creates a new game invitation with the specified opponent and options. Emits `GameCreated`.

**Parameters:**
- `opponent` - Address of the opponent
- `options` - Game configuration (ranked, maxTurns, stake)

**Returns:** `gameId` - Unique game identifier

#### joinGame
```solidity
function joinGame(uint256 gameId) 
  external 
  whenNotPaused
```
Opponent accepts the game invitation. Emits `GameStarted`.

#### startGame
```solidity
function startGame(uint256 gameId) 
  external 
  whenNotPaused
```
Initializes game state and unit positions.

#### move
```solidity
function move(uint256 gameId, uint8 unitId, uint8 newX, uint8 newY) 
  external 
  whenNotPaused 
  nonReentrant
```
Moves a unit to a new position on the grid. Validates bounds and movement range.

**Parameters:**
- `gameId` - Game ID
- `unitId` - Unit to move (0-8)
- `newX` - New X coordinate (0-2)
- `newY` - New Y coordinate (0-2)

#### attack
```solidity
function attack(uint256 gameId, uint8 attackerId, uint8 targetId) 
  external 
  whenNotPaused 
  nonReentrant
```
One unit attacks another. Calculates damage based on attack, defense, and range.

**Parameters:**
- `gameId` - Game ID
- `attackerId` - Attacking unit
- `targetId` - Target unit

#### defend
```solidity
function defend(uint256 gameId, uint8 unitId) 
  external 
  whenNotPaused 
  nonReentrant
```
Unit takes a defensive stance, reducing damage taken this turn.

#### useSkill
```solidity
function useSkill(uint256 gameId, uint8 unitId, uint8 skillId, bytes calldata params) 
  external 
  whenNotPaused 
  nonReentrant
```
Activates a unit's special skill. Skill availability and effects depend on unit type and level.

#### endTurn
```solidity
function endTurn(uint256 gameId) 
  external 
  whenNotPaused
```
Ends current player's turn and advances turn counter. Validates all actions are complete.

#### forfeit
```solidity
function forfeit(uint256 gameId) 
  external 
  whenNotPaused
```
Player surrenders the game. Opponent wins immediately.

#### getGameState
```solidity
function getGameState(uint256 gameId) 
  external 
  view 
  returns (GameState memory)
```
Fetches complete game state for display or validation.

### Events

```solidity
event GameCreated(uint256 indexed gameId, address indexed creator, address indexed opponent, GameOptions options);
event GameStarted(uint256 indexed gameId, address player1, address player2);
event UnitMoved(uint256 indexed gameId, uint8 unitId, uint8 newX, uint8 newY);
event UnitAttacked(uint256 indexed gameId, uint8 attackerId, uint8 targetId, uint8 damage);
event UnitDefended(uint256 indexed gameId, uint8 unitId);
event SkillUsed(uint256 indexed gameId, uint8 unitId, uint8 skillId, bytes params);
event TurnEnded(uint256 indexed gameId, uint8 turn);
event GameFinished(uint256 indexed gameId, address winner);
```

---

## ComCeloUnits.sol

**Location:** `contracts/ComCeloUnits.sol`

Defines unit archetypes and templates.

### Enums

```solidity
enum UnitType {
    Hero,
    Soldier,
    Archer
}
```

### Structs

#### UnitTemplate
```solidity
struct UnitTemplate {
    uint8 baseHp;
    uint8 baseAttack;
    uint8 baseDefense;
    uint8 baseRange;
    string name;
}
```

### Functions

#### getTemplate
```solidity
function getTemplate(UnitType unitType) 
  external 
  view 
  returns (UnitTemplate memory)
```
Returns the base stats for a unit type.

#### updateTemplate
```solidity
function updateTemplate(UnitType unitType, UnitTemplate memory template) 
  external 
  onlyOwner
```
Owner updates unit base stats (for balance tweaks).

### Events

```solidity
event UnitTemplateUpdated(UnitType indexed unitType, string name);
```

---

## ComCeloMatchmaker.sol

**Location:** `contracts/ComCeloMatchmaker.sol`

Manages game invitations and matchmaking queue.

### Enums

```solidity
enum GameMode {
    Unranked,
    Ranked
}
```

### Structs

#### Invite
```solidity
struct Invite {
    uint256 gameId;
    address creator;
    address opponent;
    GameMode mode;
    uint256 stake;
    uint256 createdAt;
    bool accepted;
}
```

### Functions

#### createInvite
```solidity
function createInvite(address opponent, GameMode mode, uint256 stake) 
  external 
  whenNotPaused 
  returns (uint256 inviteId)
```
Creates a game invitation.

#### acceptInvite
```solidity
function acceptInvite(uint256 inviteId, uint256 gameId) 
  external
```
Opponent accepts invite, linking it to the game.

#### cancelInvite
```solidity
function cancelInvite(uint256 inviteId) 
  external
```
Creator cancels invite before acceptance.

#### joinQuickMatchQueue
```solidity
function joinQuickMatchQueue() 
  external 
  whenNotPaused
```
Adds caller to quick-match pool for auto-pairing.

#### leaveQuickMatchQueue
```solidity
function leaveQuickMatchQueue() 
  external
```
Removes caller from quick-match pool.

#### getQueueLength
```solidity
function getQueueLength() 
  external 
  view 
  returns (uint256)
```
Returns current number of players in queue.

### Events

```solidity
event InviteCreated(uint256 indexed inviteId, address indexed creator, address indexed opponent, GameMode mode, uint256 stake);
event InviteAccepted(uint256 indexed inviteId, uint256 gameId);
event InviteCancelled(uint256 indexed inviteId);
event PlayerQueueJoined(address indexed player);
event PlayerQueueLeft(address indexed player);
```

---

## ComCeloTreasury.sol

**Location:** `contracts/ComCeloTreasury.sol`

Handles fees, escrow, and prize distribution.

### Functions

#### collectFee
```solidity
function collectFee(uint256 amount) 
  external 
  whenNotPaused 
  returns (uint256 fee)
```
Calculates and collects platform fee from game stakes. Default 5%.

#### addTournamentPrize
```solidity
function addTournamentPrize(bytes32 tournamentId, uint256 amount) 
  external 
  payable
```
Deposits funds into a tournament prize pool.

#### awardPrize
```solidity
function awardPrize(address winner, uint256 amount, bytes32 tournamentId) 
  external 
  onlyOwner
```
Distributes prize to winner (credited to balance, must withdraw).

#### withdrawBalance
```solidity
function withdrawBalance() 
  external
```
Player withdraws their credited balance (fees or prizes).

#### updatePlatformFee
```solidity
function updatePlatformFee(uint256 newPercentage) 
  external 
  onlyOwner
```
Updates fee percentage (0-100).

#### getPlayerBalance
```solidity
function getPlayerBalance(address player) 
  external 
  view 
  returns (uint256)
```
Checks player's credited balance.

#### getTournamentPrizePool
```solidity
function getTournamentPrizePool(bytes32 tournamentId) 
  external 
  view 
  returns (uint256)
```
Checks total prize pool for a tournament.

### Events

```solidity
event FeeCollected(uint256 amount);
event PrizeAwarded(address indexed winner, uint256 amount, bytes32 tournamentId);
event Withdrawal(address indexed player, uint256 amount);
event PlatformFeeUpdated(uint256 newPercentage);
```

---

## ComCeloMetaTxRelay.sol

**Location:** `contracts/ComCeloMetaTxRelay.sol`

Relays and sponsors transactions for new players (gas abstraction).

### Functions

#### executeMetaTx
```solidity
function executeMetaTx(
    address signer,
    bytes calldata functionData,
    uint256 nonce,
    bytes calldata signature
) 
  external 
  payable 
  onlyOwner 
  whenNotPaused 
  returns (bytes memory)
```
Relayer executes signed action on behalf of signer. Validates nonce and signature (ECDSA).

**Parameters:**
- `signer` - User account
- `functionData` - Encoded function call
- `nonce` - Replay protection
- `signature` - User's signature

#### setGameContractAddress
```solidity
function setGameContractAddress(address _gameContractAddress) 
  external 
  onlyOwner
```
Updates the target game contract address.

#### setMaxGasSponsor
```solidity
function setMaxGasSponsor(uint256 _maxGasSponsorPerTx) 
  external 
  onlyOwner
```
Sets maximum gas reimbursement per transaction.

#### getNonce
```solidity
function getNonce(address signer) 
  external 
  view 
  returns (uint256)
```
Checks next valid nonce for a user.

### Events

```solidity
event MetaTxExecuted(address indexed relayer, address indexed signer, uint256 nonce);
event GameContractUpdated(address indexed newAddress);
event MaxGasSponsorUpdated(uint256 newMax);
```

---

## Security Considerations

### Reentrancy
All state-changing functions use `nonReentrant` guard where applicable.

### Access Control
- Owner functions use `onlyOwner` (Ownable)
- Turn logic validates `msg.sender` against current player

### Pausable
All critical functions respect `whenNotPaused` to allow emergency stops.

### Input Validation
- Grid bounds checked (0-2 for x,y)
- Address validation (non-zero checks)
- Sufficient balance/funds checks

### Integer Safety
Solidity 0.8.23+ provides automatic overflow/underflow protection.

---

## Deployment Checklist

- [ ] Deploy ComCeloUnits first (no dependencies)
- [ ] Deploy ComCeloCore second
- [ ] Deploy ComCeloMatchmaker
- [ ] Deploy ComCeloTreasury
- [ ] Deploy ComCeloMetaTxRelay, passing ComCeloCore address
- [ ] Update environment variables with contract addresses
- [ ] Verify contracts on Celoscan
- [ ] Run integration tests against deployed addresses
- [ ] Initialize game templates if needed

---

## Future Enhancements

- ERC-721 unit NFTs
- ERC-1155 cosmetics and items
- Ranked rating system (ELO)
- Replay system (store move logs)
- Anti-cheat (commit-reveal for simultaneous moves)
- Staking for ranked rewards
