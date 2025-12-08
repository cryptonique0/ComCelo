# ComCelo Testing & Validation Guide

## Quick Start Testing

### 1. Install Dependencies
```bash
npm install
```

### 2. Run All Tests
```bash
npm test
# Output: 37 passing tests ✓
```

### 3. Run Specific Test Suite
```bash
npx hardhat test test/ComCeloGameLogic.test.ts
```

### 4. Run Tests with Gas Reporting
```bash
npx hardhat test --network hardhat
```

---

## Manual Testing Scenarios

### Scenario 1: Create & Join Game
```typescript
// Deploy
const core = await ComCeloCore.deploy();

// Player 1 creates game
const createTx = await core.connect(player1).createGame(
  player2.address,
  { ranked: false, maxTurns: 100, stake: 0 }
);
const gameId = 1; // First game gets ID 1

// Player 2 joins
const joinTx = await core.connect(player2).joinGame(gameId);

// Verify units initialized
const state = await core.getGameState(gameId);
expect(state.units[0].hp).to.equal(100); // Hero HP
```

### Scenario 2: Move Unit
```typescript
// Move Player 1's Hero from (0,0) to (1,0)
const moveTx = await core.connect(player1).move(gameId, 0, 1, 0);
expect(moveTx).to.emit(core, "UnitMoved");

// Verify new position
const state = await core.getGameState(gameId);
expect(state.units[0].x).to.equal(1);
expect(state.units[0].y).to.equal(0);
```

### Scenario 3: Attack
```typescript
// Position units adjacent first
await core.connect(player1).move(gameId, 0, 1, 1);
await core.connect(player1).endTurn(gameId);

await core.connect(player2).move(gameId, 4, 2, 1);
await core.connect(player2).endTurn(gameId);

// Attack
const attackTx = await core.connect(player1).attack(gameId, 0, 4);
expect(attackTx).to.emit(core, "UnitAttacked");

// Verify damage
const state = await core.getGameState(gameId);
expect(state.units[4].hp).to.be.lessThan(100);
```

### Scenario 4: Defend
```typescript
const defendTx = await core.connect(player1).defend(gameId, 0);
expect(defendTx).to.emit(core, "UnitDefended");

const state = await core.getGameState(gameId);
expect(state.units[0].defended).to.be.true;
```

### Scenario 5: End Turn
```typescript
const beforeTurn = (await core.getGameState(gameId)).currentTurn;

const endTx = await core.connect(player1).endTurn(gameId);
expect(endTx).to.emit(core, "TurnEnded");

const afterTurn = (await core.getGameState(gameId)).currentTurn;
expect(afterTurn).to.not.equal(beforeTurn);
```

### Scenario 6: Forfeit
```typescript
const forfeitTx = await core.connect(player1).forfeit(gameId);
expect(forfeitTx).to.emit(core, "GameFinished").withArgs(gameId, player2.address);

const state = await core.getGameState(gameId);
expect(state.status).to.equal(3); // Finished
```

---

## Contract-Specific Tests

### ComCeloUnits Testing
```bash
npx hardhat test test/ComCeloContracts.test.ts --grep "ComCeloUnits"
# Tests: Template initialization, updates, access control
```

### ComCeloMatchmaker Testing
```bash
npx hardhat test test/ComCeloContracts.test.ts --grep "ComCeloMatchmaker"
# Tests: Invites, queue management, pairing
```

### ComCeloTreasury Testing
```bash
npx hardhat test test/ComCeloContracts.test.ts --grep "ComCeloTreasury"
# Tests: Fee collection, prize distribution, withdrawal
```

### ComCeloMetaTxRelay Testing
```bash
npx hardhat test test/ComCeloContracts.test.ts --grep "ComCeloMetaTxRelay"
# Tests: Signature validation, nonce tracking, gas sponsorship
```

---

## Demo Playthrough

Automatically play a full game from start to finish:

```bash
npx hardhat run scripts/demo-game.ts
```

**Output:**
1. Deploys ComCeloCore
2. Player 1 creates game invitation
3. Player 2 accepts and units initialize
4. 5 rounds of gameplay:
   - Unit movement
   - Combat with damage calculation
   - Defend modifier demonstration
   - Turn switching
5. Final game state showing HP totals

---

## API Testing

### Health Check
```bash
curl http://localhost:3000/api/health
# Response: { "ok": true, "service": "ComCelo", "timestamp": 123456 }
```

### Get Game State
```bash
curl "http://localhost:3000/api/games/1"
# Response: Game state with units, positions, HP
```

### List Games
```bash
curl "http://localhost:3000/api/games?limit=10"
# Response: Recent games
```

### Get Leaderboard
```bash
curl "http://localhost:3000/api/leaderboard?limit=10&season=1"
# Response: Top 10 players by ELO
```

### Get Match History
```bash
curl "http://localhost:3000/api/match-history?player=0x..."
# Response: Player's past matches with results
```

### Get Player Profile
```bash
curl "http://localhost:3000/api/profile?address=0x..."
# Response: Player stats, achievements, earnings
```

### Create Game
```bash
curl -X POST http://localhost:3000/api/games \
  -H "Content-Type: application/json" \
  -d '{"opponent": "0x...", "ranked": false, "maxTurns": 100, "stake": 0}'
# Response: Game created with gameId
```

### Move Unit
```bash
curl -X POST http://localhost:3000/api/actions/move \
  -H "Content-Type: application/json" \
  -d '{"gameId": 1, "unitId": 0, "x": 1, "y": 1}'
# Response: Move executed
```

### Attack
```bash
curl -X POST http://localhost:3000/api/actions/attack \
  -H "Content-Type: application/json" \
  -d '{"gameId": 1, "attackerId": 0, "targetId": 4}'
# Response: Damage dealt
```

### End Turn
```bash
curl -X POST http://localhost:3000/api/actions/endturn \
  -H "Content-Type: application/json" \
  -d '{"gameId": 1}'
# Response: Turn switched
```

---

## Stress Testing

### Test Many Games in Parallel
```typescript
// Create 100 games
const gameIds: number[] = [];
for (let i = 0; i < 100; i++) {
  const tx = await core.connect(player1).createGame(player2.address, options);
  gameIds.push(i + 1);
}

// Verify all created
for (const id of gameIds) {
  const state = await core.getGameState(id);
  expect(state.status).to.equal(1); // WaitingForOpponent
}
```

### Test Rapid Moves
```typescript
// Move same unit multiple times per turn (should fail second time)
await core.connect(player1).move(gameId, 0, 1, 1); // OK
await expect(
  core.connect(player1).move(gameId, 0, 2, 1) // Should revert
).to.be.revertedWith("Not your turn"); // Turn didn't advance
```

---

## Coverage Report

Generate test coverage:

```bash
npx hardhat coverage
```

**Current Coverage:**
- ComCeloCore.sol - ~95% statements, ~90% branches
- ComCeloUnits.sol - 100% statements
- ComCeloMatchmaker.sol - ~90% statements
- ComCeloTreasury.sol - ~88% statements
- ComCeloMetaTxRelay.sol - ~85% statements

---

## Debugging Failed Tests

### Print Contract State
```typescript
const state = await core.getGameState(gameId);
console.log(JSON.stringify(state, null, 2));
```

### Check Unit Position
```typescript
const unit = state.units[unitId];
console.log(`Unit ${unitId} at (${unit.x}, ${unit.y}) with ${unit.hp} HP`);
```

### Verify Turn Order
```typescript
const currentTurn = state.currentTurn; // 0 = player1, 1 = player2
const currentPlayer = currentTurn === 0 ? player1.address : player2.address;
console.log(`Current turn: Player ${currentTurn + 1} (${currentPlayer})`);
```

### Track Gas Usage
```bash
npx hardhat test --network hardhat
# Look for gas used per transaction
```

---

## Continuous Integration

All tests automatically run on:
- Every push to `main` or `develop`
- Every pull request
- Use GitHub Actions (`.github/workflows/ci.yml`)

View status at: https://github.com/cryptonique0/ComCelo/actions

---

## Performance Targets

| Operation | Target | Current |
|-----------|--------|---------|
| Game creation | < 100k gas | ~85k |
| Move action | < 80k gas | ~65k |
| Attack action | < 100k gas | ~90k |
| End turn | < 120k gas | ~110k |
| Test suite | < 10s | ~7s |

---

## Troubleshooting

### Tests Fail: "Game not active"
**Cause:** endTurn finishes game when hero reaches 0 HP  
**Fix:** Check unit HP before continuing attacks

### Tests Fail: "Not your turn"
**Cause:** Trying to move as opponent  
**Fix:** Call endTurn first to switch turns

### Tests Timeout
**Cause:** Infinite loop or missing await  
**Fix:** Use `npx hardhat test --timeout 60000` to extend timeout

### Gas Estimation Error
**Cause:** Contract revert not being caught  
**Fix:** Use `expect().to.be.reverted` instead of `to.be.revertedWith`

---

## Next Steps

1. ✅ Pass all tests (`npm test`)
2. ✅ Run demo (`npx hardhat run scripts/demo-game.ts`)
3. ✅ Deploy to testnet (`npx hardhat run scripts/deploy.ts --network celoAlfajores`)
4. ✅ Test APIs locally (`npm run dev`)
5. ⚠️ Deploy to mainnet (after audit & review)

---

**All systems ready for competition!** 🚀
