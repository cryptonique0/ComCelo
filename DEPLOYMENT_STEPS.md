# ComCelo Deployment Guide - Base Mainnet

## 🚀 Quick Start Deployment

### Prerequisites
1. **Private Key with ETH on Base Mainnet**
   - Get ETH on Base: Bridge from Ethereum mainnet via [Base Bridge](https://bridge.base.org)
   - Recommended: 0.05-0.1 ETH for deployment gas fees

2. **API Keys**
   - Basescan API key: [Get here](https://basescan.org/apis)
   - Base RPC (optional): [Alchemy](https://www.alchemy.com) or [Infura](https://www.infura.io)

3. **Node.js & Dependencies**
   ```bash
   npm install
   ```

---

## 📋 Step-by-Step Deployment

### Step 1: Configure Environment Variables

Edit `.env` file:

```bash
# CRITICAL: Replace with your actual private key
DEPLOYER_KEY=your_private_key_here

# Base Network (default public RPC is fine)
BASE_RPC_MAINNET=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_api_key_here
```

⚠️ **NEVER commit your private key to GitHub!**

---

### Step 2: Compile Contracts

```bash
npx hardhat clean
npx hardhat compile
```

Expected output:
```
Compiled 19 Solidity files successfully
```

---

### Step 3: Deploy to Base Mainnet

```bash
npx hardhat run scripts/deploy-base.ts --network base
```

This will deploy:
- ✅ ComCeloCore (game logic)
- ✅ ComCeloUnits (unit factory)
- ✅ ComCeloMatchmaker (matchmaking)
- ✅ ComCeloSessionManager (P2P session tracking)
- ✅ ComCeloTreasury (prize pools)
- ✅ ComCeloGovernance (DAO voting)
- ✅ ComCeloItems (ERC1155 marketplace)
- ✅ ComCeloPlayerStats (analytics)
- ✅ ComCeloAntiCheat (reporting)
- ✅ ComCeloSeasons (progression)
- ✅ ComCeloTournaments (brackets)
- ✅ ComCeloAchievements (milestones)
- ✅ ComCeloRanking (leaderboard)
- ✅ ComCeloQuests (daily quests)
- ✅ ComCeloRewards (tier rewards)
- ✅ ComCeloCrossChainRewards (Base rewards)
- ✅ ComCeloMetaTxRelay (gas sponsorship)
- ✅ ComCeloOptimisticOracle (verification)
- ✅ ComCeloBaseSpokePool (cross-chain bridge)

**Deployment Time:** ~5-10 minutes  
**Gas Cost:** ~0.03-0.05 ETH

---

### Step 4: Verify Contracts on Basescan

After deployment, verify each contract:

```bash
# Core contracts
npx hardhat verify --network base <CORE_ADDRESS>
npx hardhat verify --network base <UNITS_ADDRESS>
npx hardhat verify --network base <MATCHMAKER_ADDRESS>

# Feature contracts
npx hardhat verify --network base <ITEMS_ADDRESS>
npx hardhat verify --network base <TOURNAMENTS_ADDRESS>
npx hardhat verify --network base <REWARDS_ADDRESS>

# Meta-tx relay (requires constructor args)
npx hardhat verify --network base <METATX_RELAY_ADDRESS> <CORE_ADDRESS>

# Cross-chain rewards (requires constructor args)
npx hardhat verify --network base <CROSSCHAIN_REWARDS_ADDRESS> <REWARDS_ADDRESS> <DEPLOYER_ADDRESS>

# Spoke pool (requires constructor args)
npx hardhat verify --network base <SPOKE_POOL_ADDRESS> <TREASURY_ADDRESS>
```

---

### Step 5: Update Frontend Environment Variables

Copy deployed addresses from `deployments/base-mainnet.json` to `.env`:

```bash
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_META_TX_RELAY_ADDRESS=0x...
# ... etc
```

---

### Step 6: Initialize Contracts

Run initialization script:

```bash
npx hardhat run scripts/initialize-contracts.ts --network base
```

This will:
- Create default unit types (Hero, Soldier, Archer)
- Set up initial season
- Create starter cosmetic items
- Configure tournament prize pools
- Set relayer approvals for meta-transactions

---

### Step 7: Test Deployment

```bash
# Run a demo game
npx hardhat run scripts/demo-game.ts --network base

# Check contract states
npx hardhat run scripts/cli.ts --network base -- contracts list
```

---

## 🔧 Post-Deployment Configuration

### Meta-Transaction Relay Setup

1. **Approve relayer addresses:**
   ```typescript
   const relay = await ethers.getContractAt("ComCeloMetaTxRelay", RELAY_ADDRESS);
   await relay.approveRelayer("0xYourRelayerAddress");
   ```

2. **Fund relay contract:**
   ```bash
   # Send ETH for gas sponsorship
   cast send <RELAY_ADDRESS> --value 0.1ether --private-key <KEY>
   ```

### Treasury Setup

1. **Set platform fee:**
   ```typescript
   const treasury = await ethers.getContractAt("ComCeloTreasury", TREASURY_ADDRESS);
   await treasury.updatePlatformFee(5); // 5% fee
   ```

### Create First Tournament

```typescript
const tournaments = await ethers.getContractAt("ComCeloTournaments", TOURNAMENTS_ADDRESS);
await tournaments.createTournament(
  "Season 1 Championship",
  ethers.parseEther("0.01"), // 0.01 ETH entry
  32,                         // max 32 players
  ethers.parseEther("0.32")  // 0.32 ETH prize pool
);
```

---

## 📊 Monitoring & Analytics

### Check Deployment Status

```bash
# View deployed contracts
cat deployments/base-mainnet.json

# Check contract on Basescan
open https://basescan.org/address/<CONTRACT_ADDRESS>
```

### Monitor Transactions

```bash
# Watch for game events
npx hardhat run scripts/monitor-events.ts --network base
```

---

## ⚠️ Security Checklist

Before mainnet launch:

- [ ] Private keys secured (never committed to git)
- [ ] All contracts verified on Basescan
- [ ] Ownership transferred to multisig (if applicable)
- [ ] Platform fees configured correctly
- [ ] Meta-tx gas limits set appropriately
- [ ] Cross-chain bridge tested on testnet first
- [ ] Rate limiting configured for anti-spam
- [ ] Emergency pause functionality tested

---

## 🐛 Troubleshooting

### "Insufficient funds for gas"
**Solution:** Add more ETH to deployer address

### "Contract creation code storage out of gas"
**Solution:** Increase optimizer runs in `hardhat.config.ts`:
```typescript
optimizer: { enabled: true, runs: 200 }
```

### "Nonce too low"
**Solution:** Wait for pending txs to complete or reset nonce:
```bash
npx hardhat clean
```

### "Verification failed"
**Solution:** Wait 1-2 minutes after deployment, then retry verification

---

## 📞 Support

- GitHub Issues: https://github.com/cryptonique0/ComCelo/issues
- Documentation: See `README.md` and `CONTRACTS.md`

---

## 🎉 Success!

Once deployed, your ComCelo game is live on Base mainnet! 

Next steps:
1. Deploy frontend to Vercel/Netlify
2. Set up Farcaster Frames
3. Announce launch on socials
4. Start first tournament

Good luck! 🚀
