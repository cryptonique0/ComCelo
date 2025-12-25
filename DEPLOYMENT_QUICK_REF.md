# ComCelo Deployment Quick Reference

## One-Command Deployment

```bash
# Testnet (Celo Alfajores)
npx hardhat run scripts/deploy-all.ts --network celoAlfajores

# Mainnet (Celo)
npx hardhat run scripts/deploy-all.ts --network celo

# Testnet (Base Sepolia)
npx hardhat run scripts/deploy-all.ts --network baseSepolia

# Mainnet (Base)
npx hardhat run scripts/deploy-all.ts --network base
```

**Output:** 
- JSON with all addresses: `deployments/{network}.json`
- Ready-to-use env file: `deployments/.env.{network}`

---

## Contract Addresses Output Format

After running deployment, you'll get JSON like:

```json
{
  "network": "celoAlfajores",
  "chainId": 44787,
  "deployer": "0x...",
  "timestamp": "2025-12-25T10:00:00.000Z",
  "blockNumber": 123456,
  "contracts": {
    "Core": "0x...",
    "Units": "0x...",
    "Treasury": "0x...",
    "Matchmaker": "0x...",
    "Items": "0x...",
    "Seasons": "0x...",
    "Tournaments": "0x...",
    "Achievements": "0x...",
    "Ranking": "0x...",
    "Quests": "0x...",
    "Rewards": "0x...",
    "SessionManager": "0x...",
    "PlayerStats": "0x...",
    "Governance": "0x...",
    "AntiCheat": "0x...",
    "CrossChainRewards": "0x...",
    "MetaTxRelay": "0x...",
    "OptimisticOracle": "0x...",  // Base only
    "BaseSpokePool": "0x..."      // Base only
  }
}
```

---

## Setup After Deployment

### 1. Copy Environment Variables
```bash
cat deployments/.env.celoAlfajores >> .env.local
```

### 2. Set Admin Roles (Session Manager)
```bash
npx ts-node scripts/cli.ts set-reporter <SESSION_MANAGER_ADDR> <YOUR_ADDR> true
```

### 3. Set Governance Voters
```bash
npx ts-node scripts/cli.ts set-voter <GOVERNANCE_ADDR> <YOUR_ADDR> true
```

### 4. Set Anti-Cheat Reviewers
```bash
npx ts-node scripts/cli.ts set-reviewer <ANTI_CHEAT_ADDR> <YOUR_ADDR> true
```

---

## Core Contract Interactions

### Game Core
```typescript
const core = await ethers.getContractAt("ComCeloCore", CORE_ADDR);
await core.createGame(opponent, options);
await core.joinGame(gameId);
await core.move(gameId, unitId, newX, newY);
await core.attack(gameId, attackerId, targetId);
await core.endTurn(gameId);
```

### Tournaments
```typescript
const tournaments = await ethers.getContractAt("ComCeloTournaments", TOURNAMENTS_ADDR);
await tournaments.createTournament("Name", entryFee, maxPlayers, prizePool);
await tournaments.registerForTournament(tournamentId);
await tournaments.startTournament(tournamentId);
await tournaments.recordMatchResult(tournamentId, matchId, winner);
```

### Player Stats
```typescript
const stats = await ethers.getContractAt("ComCeloPlayerStats", STATS_ADDR);
await stats.recordMatch(player, won, draw, mmrDelta);
await stats.bulkRecord(players, wins, draws, deltas);
const playerStats = await stats.getStats(player);
```

### Governance
```typescript
const gov = await ethers.getContractAt("ComCeloGovernance", GOV_ADDR);
await gov.setVoter(voter, true);
await gov.propose("description", target, value, data);
await gov.vote(proposalId, support);
await gov.execute(proposalId);
```

### Anti-Cheat
```typescript
const antiCheat = await ethers.getContractAt("ComCeloAntiCheat", ANTI_CHEAT_ADDR);
await antiCheat.submitReport(gameId, accused, "ipfs://evidence");
await antiCheat.resolveReport(reportId, valid, "note");
```

---

## Network Settings

| Network | Chain ID | RPC | Explorer |
|---------|----------|-----|----------|
| Celo Alfajores | 44787 | https://alfajores-forno.celo-testnet.org | https://alfajores.celoscan.io |
| Celo Mainnet | 42220 | https://forno.celo.org | https://celoscan.io |
| Base Sepolia | 84532 | https://sepolia.base.org | https://sepolia.basescan.org |
| Base Mainnet | 8453 | https://mainnet.base.org | https://basescan.org |

---

## Verify on Explorer

```bash
# Celo
npx hardhat verify --network celoAlfajores <ADDRESS>

# Base
npx hardhat verify --network baseSepolia <ADDRESS>
```

---

## Environment Variables Needed

```env
DEPLOYER_KEY=your_private_key

# Celo RPC (if deploying to Celo)
CELO_RPC_ALFAJORES=https://alfajores-forno.celo-testnet.org
CELO_RPC_MAINNET=https://forno.celo.org
CELOSCAN_API_KEY=your_celoscan_key

# Base RPC (if deploying to Base)
BASE_RPC_SEPOLIA=https://sepolia.base.org
BASE_RPC_MAINNET=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_key
```

---

## Contract Summary (19 Total)

**Core (4)**
- Core, Units, Treasury, Matchmaker

**Features (8)**
- Items, Seasons, Tournaments, Achievements, Ranking, Quests, Rewards, MetaTxRelay

**Management (5)**
- SessionManager, PlayerStats, Governance, AntiCheat, CrossChainRewards

**Base-Specific (2)**
- OptimisticOracle, BaseSpokePool

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Contract already deployed" | Check `deployments/{network}.json` |
| RPC timeout | Increase: `HARDHAT_NETWORK_TIMEOUT=600000` |
| Insufficient gas | Deployer needs ETH/CELO balance |
| Oracle/SpokePool missing | Only deployed on Base chains |
| Cannot set roles | Use correct contract address + CLI command |

---

## Files Generated After Deployment

```
deployments/
├── {network}.json          # All contract addresses
└── .env.{network}          # Environment variable template
```

Copy addresses to your frontend config:

```typescript
// lib/contracts.ts
export const CONTRACTS = {
  core: "0x...",           // from JSON
  matchmaker: "0x...",
  // ... etc
};
```

---

## Common Errors & Fixes

**"Period out of range"**
- Governance voting period must be 1 minute - 30 days
- Fix: `gov.setVotingPeriod(86400)` for 1 day

**"Cannot challenge own assertion"**
- Oracle assertions can't be challenged by creator
- Fix: Different player must challenge

**"Settlement period not elapsed"**
- Spoke pool transfers have 1-hour default settlement
- Fix: Wait or use `setSettlementPeriod()` with shorter time

---

For full details, see **DEPLOYMENT_GUIDE.md**
