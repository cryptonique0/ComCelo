# ComCelo Deployment Guide

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Hardhat installed: `npm install -D hardhat`
- Environment variables configured in `.env`

### Deploy to Celo Alfajores (Testnet)

```bash
npx hardhat run scripts/deploy-all.ts --network celoAlfajores
```

**Output:**
- Deployment JSON: `deployments/celoAlfajores.json`
- Environment file: `deployments/.env.celoAlfajores`

### Deploy to Celo Mainnet

```bash
npx hardhat run scripts/deploy-all.ts --network celo
```

### Deploy to Base Sepolia (Testnet)

```bash
npx hardhat run scripts/deploy-all.ts --network baseSepolia
```

**Includes Oracle & Spoke Pool for cross-chain operations**

### Deploy to Base Mainnet

```bash
npx hardhat run scripts/deploy-all.ts --network base
```

---

## What Gets Deployed (19 Contracts)

### Core Game Contracts (4)
1. **ComCeloCore** - Game logic, move/attack/defend system
2. **ComCeloUnits** - Unit definitions and factory
3. **ComCeloTreasury** - Fee collection and prize management
4. **ComCeloMatchmaker** - Player invites and matchmaking queue

### Game Features (8)
5. **ComCeloItems** - ERC1155 cosmetics and items
6. **ComCeloSeasons** - Seasonal progression tracks
7. **ComCeloTournaments** - Multi-round single-elimination brackets
8. **ComCeloAchievements** - Achievement milestone tracking
9. **ComCeloRanking** - Player leaderboard system
10. **ComCeloQuests** - Daily quests and challenges
11. **ComCeloRewards** - Reward tiers and staking
12. **ComCeloMetaTxRelay** - Gas-less transaction relay

### Management & Admin (5)
13. **ComCeloSessionManager** - P2P game session lifecycle
14. **ComCeloPlayerStats** - Performance analytics and MMR
15. **ComCeloGovernance** - Lightweight DAO for protocol updates
16. **ComCeloAntiCheat** - Cheat reporting and review system
17. **ComCeloCrossChainRewards** - Cross-chain reward claims

### Base-Specific (2) - Only on Base chains
18. **ComCeloOptimisticOracle** - Bonded assertions for result verification
19. **ComCeloBaseSpokePool** - Cross-chain transfer bridge

---

## After Deployment

### 1. Update Environment Variables

Copy from generated file:
```bash
cp deployments/.env.celoAlfajores .env
```

Or manually update `.env` with addresses from `deployments/{network}.json`

### 2. Configure Admin Roles

#### Set Session Manager Reporters
```bash
npx ts-node scripts/cli.ts set-reporter <SessionManagerAddress> <ReporterAddress> true
```

#### Set Governance Voters
```bash
npx ts-node scripts/cli.ts set-voter <GovernanceAddress> <VoterAddress> true
```

#### Set Anti-Cheat Reviewers
```bash
npx ts-node scripts/cli.ts set-reviewer <AntiCheatAddress> <ReviewerAddress> true
```

#### Set Player Stats Admins
Already set to deployer; can update via CLI as needed

### 3. Initialize Tournament Settings

```typescript
const tournaments = await ethers.getContractAt("ComCeloTournaments", TOURNAMENTS_ADDRESS);
await tournaments.createTournament(
  "Season 1 Championship",
  ethers.parseEther("0.1"),  // entry fee
  32,                         // max players
  ethers.parseEther("3.2")   // prize pool
);
```

### 4. Set Reward Multipliers

```typescript
const rewards = await ethers.getContractAt("ComCeloRewards", REWARDS_ADDRESS);
await rewards.setTierMultiplier(0, 100);   // BRONZE: 1.0x
await rewards.setTierMultiplier(1, 110);   // SILVER: 1.1x
await rewards.setTierMultiplier(2, 125);   // GOLD: 1.25x
await rewards.setTierMultiplier(3, 150);   // PLATINUM: 1.5x
await rewards.setTierMultiplier(4, 200);   // DIAMOND: 2.0x
```

### 5. Configure Cross-Chain (if on Base)

**Set Relayer for Cross-Chain Rewards:**
```typescript
const xRewards = await ethers.getContractAt("ComCeloCrossChainRewards", X_CHAIN_REWARDS_ADDRESS);
await xRewards.setRelayer(RELAYER_ADDRESS);
```

**Register Relayers for Spoke Pool:**
```typescript
const spokePool = await ethers.getContractAt("ComCeloBaseSpokePool", SPOKE_POOL_ADDRESS);
await spokePool.registerRelayer(RELAYER_ADDRESS);
```

**Set Settlement Period (default 1 hour):**
```typescript
await spokePool.setSettlementPeriod(3600); // 1 hour in seconds
```

---

## Network Configuration

### Celo Alfajores
- Chain ID: 44787
- RPC: https://alfajores-forno.celo-testnet.org
- Explorer: https://alfajores.celoscan.io
- Symbol: CELO
- Faucet: https://celo.org/developers/faucet

### Celo Mainnet
- Chain ID: 42220
- RPC: https://forno.celo.org
- Explorer: https://celoscan.io
- Symbol: CELO

### Base Sepolia
- Chain ID: 84532
- RPC: https://sepolia.base.org
- Explorer: https://sepolia.basescan.org
- Symbol: ETH
- Faucet: https://sepolia.etherscan.io/faucet

### Base Mainnet
- Chain ID: 8453
- RPC: https://mainnet.base.org
- Explorer: https://basescan.org
- Symbol: ETH

---

## Verify Contracts on Block Explorer

### Celo (Celoscan)
```bash
npx hardhat verify --network celoAlfajores <CONTRACT_ADDRESS>
```

### Base (Basescan)
```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
```

---

## Frontend Integration

Update `lib/contracts.ts`:

```typescript
export const CONTRACTS = {
  // Core
  core: "0x...",
  matchmaker: "0x...",
  treasury: "0x...",
  units: "0x...",
  
  // Features
  items: "0x...",
  seasons: "0x...",
  tournaments: "0x...",
  achievements: "0x...",
  ranking: "0x...",
  quests: "0x...",
  rewards: "0x...",
  
  // Management
  sessionManager: "0x...",
  playerStats: "0x...",
  governance: "0x...",
  antiCheat: "0x...",
  crossChainRewards: "0x...",
  
  // Infrastructure
  relay: "0x...",
  optimisticOracle: "0x...",  // Base only
  baseSpokePool: "0x...",     // Base only
};
```

---

## Common Operations

### Create a Tournament Session

```typescript
const sessionManager = await ethers.getContractAt("ComCeloSessionManager", SESSION_MANAGER_ADDRESS);

// Create session
const tx1 = await sessionManager.createSession(
  gameId,      // uint256
  player1,     // address
  player2,     // address
  true,        // ranked
  0            // stake
);

// Start session
await sessionManager.startSession(sessionId);

// Complete (as reporter)
await sessionManager.completeSession(
  sessionId,
  winner,
  "ipfs://result-hash"
);
```

### Record Player Stats

```typescript
const stats = await ethers.getContractAt("ComCeloPlayerStats", STATS_ADDRESS);

// Single match
await stats.recordMatch(
  playerAddress,
  true,   // won
  false,  // not draw
  100     // mmr delta
);

// Bulk update
await stats.bulkRecord(
  [player1, player2, player3],
  [true, false, true],  // wins
  [false, false, false],  // draws
  [100, -50, 100]         // mmr deltas
);
```

### Submit a Proposal (Governance)

```typescript
const gov = await ethers.getContractAt("ComCeloGovernance", GOVERNANCE_ADDRESS);

// Create proposal
const tx = await gov.propose(
  "Update reward multipliers",
  treasuryAddress,
  0,
  treasury.interface.encodeFunctionData("updatePlatformFee", [10])
);

// Vote
await gov.vote(proposalId, true);

// Execute after voting period
await gov.execute(proposalId);
```

### Report Suspected Cheating

```typescript
const antiCheat = await ethers.getContractAt("ComCeloAntiCheat", ANTI_CHEAT_ADDRESS);

await antiCheat.submitReport(
  gameId,
  accusedPlayer,
  "ipfs://evidence-hash"
);

// As reviewer:
await antiCheat.resolveReport(
  reportId,
  true,  // valid
  "Confirmed: Script detected"
);
```

---

## Troubleshooting

### Insufficient Gas
Increase gas limit:
```bash
HARDHAT_NETWORK_TIMEOUT=300000 npx hardhat run scripts/deploy-all.ts --network celoAlfajores
```

### Contract Already Deployed
Check `deployments/{network}.json` for existing addresses

### RPC Connection Issues
- Verify RPC URL in `hardhat.config.ts`
- Check network status at explorer
- Ensure deployer has sufficient balance

### Oracle/Spoke Pool Not Found
These are Base-network only. Check you're deploying to Base Sepolia or Base Mainnet

---

## Security Notes

1. **Never commit private keys** - use environment variables
2. **Test on Alfajores/Sepolia first** before mainnet deployment
3. **Verify contracts** on block explorer for transparency
4. **Set admin roles carefully** - only trusted addresses
5. **Monitor governance proposals** - any voter can propose
6. **Validate relayers** - add only trusted relayer addresses

---

## Support

For issues or questions:
1. Check test files: `test/ComCeloBase.test.ts`, `test/ComCeloNewFeatures.test.ts`
2. Review contract comments and events
3. Check deployment logs in `deployments/{network}.json`
4. Refer to individual contract docs

---

Generated: 2025-12-25
