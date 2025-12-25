# ComCelo Deployment Code & Instructions

## 🚀 TL;DR - Deploy in One Command

```bash
# Choose your network:
npx hardhat run scripts/deploy-all.ts --network celoAlfajores    # Celo Testnet
npx hardhat run scripts/deploy-all.ts --network celo             # Celo Mainnet
npx hardhat run scripts/deploy-all.ts --network baseSepolia      # Base Testnet
npx hardhat run scripts/deploy-all.ts --network base             # Base Mainnet
```

**That's it!** ✅ All 19 contracts deployed, addresses saved to `deployments/{network}.json`

---

## 📦 What Gets Deployed (19 Contracts)

### **Core Game Contracts (4)**
| Contract | Purpose |
|----------|---------|
| `ComCeloCore` | Game logic: move, attack, defend |
| `ComCeloUnits` | Unit factory and definitions |
| `ComCeloTreasury` | Fee management and prize pools |
| `ComCeloMatchmaker` | Invites and matchmaking queue |

### **Game Features (8)**
| Contract | Purpose |
|----------|---------|
| `ComCeloItems` | ERC1155 cosmetics & items |
| `ComCeloSeasons` | Seasonal progression tracks |
| `ComCeloTournaments` | Multi-round tournaments with brackets |
| `ComCeloAchievements` | Achievement milestones |
| `ComCeloRanking` | Player leaderboards |
| `ComCeloQuests` | Daily challenges |
| `ComCeloRewards` | Reward tiers & staking |
| `ComCeloMetaTxRelay` | Gas-less transaction relay |

### **Management & Admin (5)**
| Contract | Purpose |
|----------|---------|
| `ComCeloSessionManager` | P2P session lifecycle |
| `ComCeloPlayerStats` | Win/loss/MMR tracking |
| `ComCeloGovernance` | DAO for protocol updates |
| `ComCeloAntiCheat` | Cheat report system |
| `ComCeloCrossChainRewards` | Cross-chain reward claims |

### **Base-Only (2)**
| Contract | Purpose | Networks |
|----------|---------|----------|
| `ComCeloOptimisticOracle` | Bonded result verification | Base Sepolia, Base Mainnet |
| `ComCeloBaseSpokePool` | Cross-chain transfer bridge | Base Sepolia, Base Mainnet |

---

## 📋 Deployment Script Details

### File: `scripts/deploy-all.ts`

**Key Features:**
- ✅ Deploys all 19 contracts in dependency order
- ✅ Auto-detects network (Celo or Base)
- ✅ Saves JSON to `deployments/{network}.json`
- ✅ Generates `.env.{network}` with all addresses
- ✅ Beautiful progress output with emojis
- ✅ Detailed next-steps guidance

**Output Example:**
```
═══════════════════════════════════════════════════════════════════
ComCelo Full Deployment
═══════════════════════════════════════════════════════════════════
Network:       celoAlfajores (Chain ID: 44787)
Deployer:      0x...
Block Number:  1234567
ETH Balance:   10 CELO
═══════════════════════════════════════════════════════════════════

📦 DEPLOYING CORE CONTRACTS
─────────────────────────────────────────────────────────────────

1️⃣  ComCeloCore (Game Logic)...
    ✓ 0x1234567...

2️⃣  ComCeloUnits (Unit Management)...
    ✓ 0x2345678...

... [all 19 contracts] ...

💾 SAVING DEPLOYMENT DATA
─────────────────────────────────────────────────────────────────

✓ Deployment saved to: deployments/celoAlfajores.json
✓ Environment file saved to: deployments/.env.celoAlfajores

✅ DEPLOYMENT COMPLETE!
```

---

## 📁 Deployment Output Files

### 1. **JSON Deployment Record**
**Location:** `deployments/{network}.json`

**Format:**
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
    "OptimisticOracle": "0x...",
    "BaseSpokePool": "0x..."
  }
}
```

**Use For:**
- Verifying all contracts deployed
- Recording contract addresses
- Tracking deployment history

### 2. **Environment Configuration**
**Location:** `deployments/.env.{network}`

**Format:**
```env
# Auto-generated from deployment on 2025-12-25T10:00:00Z
# Network: celoAlfajores (Chain ID: 44787)

DEPLOYER_ADDRESS=0x...

# Core Game Contracts
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=0x...

# Game Features
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=0x...

# Management & Admin
NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ANTI_CHEAT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CROSS_CHAIN_REWARDS_CONTRACT_ADDRESS=0x...

# Infrastructure
NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ORACLE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SPOKE_POOL_CONTRACT_ADDRESS=0x...
```

**Use For:**
- Copying to `.env.local` for frontend
- Updating `lib/contracts.ts`
- CI/CD pipeline configuration

---

## 🔧 Post-Deployment Setup

### 1. **Copy Environment Variables**
```bash
# Copy generated env to your .env
cat deployments/.env.celoAlfajores >> .env.local
```

### 2. **Set Admin Roles** (using CLI tool)

```bash
# Set Session Manager Reporter
npx ts-node scripts/cli.ts set-reporter <SESSION_MGR_ADDR> <YOUR_ADDR> true

# Set Governance Voter
npx ts-node scripts/cli.ts set-voter <GOVERNANCE_ADDR> <YOUR_ADDR> true

# Toggle contract pause (emergency)
npx ts-node scripts/cli.ts pause <ANY_CONTRACT_ADDR>
npx ts-node scripts/cli.ts unpause <ANY_CONTRACT_ADDR>
```

### 3. **Initialize Game Settings**

**Create a Tournament:**
```typescript
const tournaments = await ethers.getContractAt("ComCeloTournaments", TOURNAMENTS_ADDR);
await tournaments.createTournament(
  "Season 1 Championship",
  ethers.parseEther("0.1"),    // entry fee
  32,                          // max players
  ethers.parseEther("3.2")     // prize pool
);
```

**Set Reward Tiers:**
```typescript
const rewards = await ethers.getContractAt("ComCeloRewards", REWARDS_ADDR);
await rewards.setTierMultiplier(0, 100);   // BRONZE: 1.0x
await rewards.setTierMultiplier(1, 110);   // SILVER: 1.1x
await rewards.setTierMultiplier(2, 125);   // GOLD: 1.25x
await rewards.setTierMultiplier(3, 150);   // PLATINUM: 1.5x
await rewards.setTierMultiplier(4, 200);   // DIAMOND: 2.0x
```

### 4. **Configure Cross-Chain (Base Only)**

**Set Relayer:**
```typescript
const xRewards = await ethers.getContractAt("ComCeloCrossChainRewards", X_CHAIN_REWARDS_ADDR);
await xRewards.setRelayer(RELAYER_ADDRESS);
```

**Register Relayers for Spoke Pool:**
```typescript
const spokePool = await ethers.getContractAt("ComCeloBaseSpokePool", SPOKE_POOL_ADDR);
await spokePool.registerRelayer(RELAYER_ADDRESS);
await spokePool.setSettlementPeriod(3600); // 1 hour
```

---

## 🌐 Network Configuration

### Required Environment Variables

```env
# Private key for deployer
DEPLOYER_KEY=your_private_key_here

# For Celo networks
CELO_RPC_ALFAJORES=https://alfajores-forno.celo-testnet.org
CELO_RPC_MAINNET=https://forno.celo.org
CELOSCAN_API_KEY=your_celoscan_key

# For Base networks
BASE_RPC_SEPOLIA=https://sepolia.base.org
BASE_RPC_MAINNET=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_key
```

### Network Details

| Network | Chain ID | RPC Endpoint | Block Explorer | Symbol |
|---------|----------|--------------|-----------------|--------|
| Celo Alfajores (Testnet) | 44787 | https://alfajores-forno.celo-testnet.org | https://alfajores.celoscan.io | CELO |
| Celo Mainnet | 42220 | https://forno.celo.org | https://celoscan.io | CELO |
| Base Sepolia (Testnet) | 84532 | https://sepolia.base.org | https://sepolia.basescan.org | ETH |
| Base Mainnet | 8453 | https://mainnet.base.org | https://basescan.org | ETH |

---

## ✅ Verification

### Verify on Block Explorer

**Celo:**
```bash
npx hardhat verify --network celoAlfajores <CONTRACT_ADDRESS>
npx hardhat verify --network celoAlfajores <CONTRACT_ADDRESS> arg1 arg2
```

**Base:**
```bash
npx hardhat verify --network baseSepolia <CONTRACT_ADDRESS>
```

### Manual Verification Steps

1. **Open Block Explorer**
   - Celo: https://celoscan.io or https://alfajores.celoscan.io
   - Base: https://basescan.org or https://sepolia.basescan.org

2. **Search Contract Address**
   - Paste address in explorer search

3. **Check Contract**
   - Read/Write functions should be visible
   - Constructor args should match deployment

4. **Verify Source Code** (Optional)
   - Click "Verify & Publish"
   - Select Solidity version: 0.8.23
   - Copy/paste contract source
   - Include constructor arguments if any

---

## 📝 Integration with Frontend

Update `lib/contracts.ts`:

```typescript
export const CONTRACTS = {
  // Core
  core: process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS,
  matchmaker: process.env.NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS,
  treasury: process.env.NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS,
  units: process.env.NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS,
  
  // Features
  items: process.env.NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS,
  seasons: process.env.NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS,
  tournaments: process.env.NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS,
  achievements: process.env.NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS,
  ranking: process.env.NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS,
  quests: process.env.NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS,
  rewards: process.env.NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS,
  
  // Management
  sessionManager: process.env.NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS,
  playerStats: process.env.NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS,
  governance: process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS,
  antiCheat: process.env.NEXT_PUBLIC_ANTI_CHEAT_CONTRACT_ADDRESS,
  crossChainRewards: process.env.NEXT_PUBLIC_CROSS_CHAIN_REWARDS_CONTRACT_ADDRESS,
  
  // Infrastructure
  relay: process.env.NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS,
  optimisticOracle: process.env.NEXT_PUBLIC_ORACLE_CONTRACT_ADDRESS,
  baseSpokePool: process.env.NEXT_PUBLIC_SPOKE_POOL_CONTRACT_ADDRESS,
};
```

---

## 🐛 Troubleshooting

| Error | Cause | Solution |
|-------|-------|----------|
| "Not enough balance" | Deployer insufficient funds | Get testnet faucet funds or add balance |
| "RPC connection refused" | Bad RPC URL | Verify RPC URL in hardhat.config.ts |
| "Contract already deployed" | Trying to deploy twice | Use existing address from deployments/*.json |
| "Oracle/SpokePool not found" | Deploying to non-Base chain | Only Base Sepolia/Mainnet support these |
| "Period out of range" | Governance voting period invalid | Use 60-2592000 seconds (1 min - 30 days) |

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| `DEPLOYMENT_GUIDE.md` | Complete deployment & setup guide |
| `DEPLOYMENT_QUICK_REF.md` | Quick reference card |
| `DEPLOYMENT_CODE.md` | This file - deployment code reference |
| `scripts/deploy-all.ts` | Main deployment script (all networks) |
| `scripts/deploy.ts` | Celo-only deployment script |
| `scripts/deploy-base.ts` | Base-only deployment script |
| `scripts/cli.ts` | Admin CLI tool |

---

## ✨ Project Status

**Total Commits:** 26  
**Last Deployment Script:** Commit 20  
**Test Coverage:** 160 tests passing  
**Contracts:** 19 total (including network-specific)  

---

## 🎯 Next Steps After Deployment

1. ✅ Run deployment script
2. ✅ Save deployment JSON & env file
3. ✅ Update `.env.local` with addresses
4. ✅ Set admin roles using CLI
5. ✅ Initialize game settings
6. ✅ Configure cross-chain (if Base)
7. ✅ Verify contracts on explorer
8. ✅ Update frontend config
9. ✅ Test contract interactions
10. ✅ Monitor governance proposals

---

## 📞 Support

For issues:
1. Check test files: `test/ComCeloBase.test.ts`, `test/ComCeloNewFeatures.test.ts`
2. Review contract events and emit statements
3. Check `deployments/{network}.json` for correct addresses
4. Verify network configuration in `hardhat.config.ts`
5. Read individual contract comments and docs

---

**Generated:** 2025-12-25  
**Version:** 1.0  
**Last Updated:** Deployment Code Release
