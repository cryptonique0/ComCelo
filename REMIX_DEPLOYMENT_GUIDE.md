# Deploy ComCelo Contracts to Base Mainnet Using Remix

## Overview

This guide walks you through deploying all ComCelo smart contracts to **Base Mainnet (Chain ID: 8453)** using [Remix IDE](https://remix.ethereum.org/).

---

## Prerequisites

✅ **MetaMask** installed and connected to **Base Mainnet**  
✅ **ETH on Base Mainnet** for gas fees (minimum ~0.05 ETH recommended)  
✅ **Base Mainnet RPC** configured in MetaMask:
   - Network Name: `Base Mainnet`
   - RPC URL: `https://mainnet.base.org`
   - Chain ID: `8453`
   - Currency Symbol: `ETH`
   - Block Explorer: `https://basescan.org`

---

## Step 1: Open Remix IDE

1. Go to **https://remix.ethereum.org/**
2. Create a new workspace or use the default workspace

---

## Step 2: Upload Contract Files

### Option A: Upload Individual Files

1. In Remix, create a folder structure:
   ```
   contracts/
   ├── ComCeloCore.sol
   ├── ComCeloUnits.sol
   ├── ComCeloTreasury.sol
   ├── ComCeloMatchmaker.sol
   ├── ComCeloItems.sol
   ├── ComCeloSeasons.sol
   ├── ComCeloTournaments.sol
   ├── ComCeloAchievements.sol
   ├── ComCeloRanking.sol
   ├── ComCeloQuests.sol
   ├── ComCeloRewards.sol
   ├── ComCeloMetaTxRelay.sol
   ├── ComCeloSessionManager.sol
   ├── ComCeloPlayerStats.sol
   ├── ComCeloGovernance.sol
   ├── ComCeloAntiCheat.sol
   └── ComCeloCrossChainRewards.sol
   ```

2. Copy each `.sol` file from your local `contracts/` folder to Remix

### Option B: Clone from GitHub

1. In Remix, use the **File Explorer** plugin
2. Click "Clone" and paste your GitHub repo URL:
   ```
   https://github.com/cryptonique0/ComCelo.git
   ```

---

## Step 3: Compile Contracts

1. Click **Solidity Compiler** tab (left sidebar)
2. Select compiler version: **0.8.23**
3. Enable **Optimization**: `200` runs
4. Click **"Compile All"** or compile each contract individually

✅ Ensure all contracts compile without errors

---

## Step 4: Connect MetaMask to Base Mainnet

1. Click **Deploy & Run Transactions** tab
2. Set **Environment** to **"Injected Provider - MetaMask"**
3. MetaMask will pop up - select **Base Mainnet** network
4. Confirm your wallet is connected and shows your ETH balance

---

## Step 5: Deploy Contracts in Order

⚠️ **CRITICAL:** Deploy contracts in this exact order due to dependencies.

### 5.1 Deploy Core Contracts

#### 1. ComCeloUnits
- **File:** `contracts/ComCeloUnits.sol`
- **Constructor:** None
- **Action:** Click "Deploy"
- **📝 Save Address:** `UNITS_ADDRESS = 0x...`

#### 2. ComCeloTreasury
- **File:** `contracts/ComCeloTreasury.sol`
- **Constructor:** None
- **Action:** Click "Deploy"
- **📝 Save Address:** `TREASURY_ADDRESS = 0x...`

#### 3. ComCeloCore
- **File:** `contracts/ComCeloCore.sol`
- **Constructor Parameters:**
  ```
  _unitsContract: [UNITS_ADDRESS from step 1]
  _treasury: [TREASURY_ADDRESS from step 2]
  ```
- **Action:** Enter parameters, click "Deploy"
- **📝 Save Address:** `CORE_ADDRESS = 0x...`

#### 4. ComCeloMatchmaker
- **File:** `contracts/ComCeloMatchmaker.sol`
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS from step 3]
  ```
- **Action:** Enter parameter, click "Deploy"
- **📝 Save Address:** `MATCHMAKER_ADDRESS = 0x...`

---

### 5.2 Deploy Feature Contracts

#### 5. ComCeloItems
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `ITEMS_ADDRESS = 0x...`

#### 6. ComCeloSeasons
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `SEASONS_ADDRESS = 0x...`

#### 7. ComCeloTournaments
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `TOURNAMENTS_ADDRESS = 0x...`

#### 8. ComCeloAchievements
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `ACHIEVEMENTS_ADDRESS = 0x...`

#### 9. ComCeloRanking
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `RANKING_ADDRESS = 0x...`

#### 10. ComCeloQuests
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `QUESTS_ADDRESS = 0x...`

#### 11. ComCeloRewards
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `REWARDS_ADDRESS = 0x...`

#### 12. ComCeloMetaTxRelay
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `METATXRELAY_ADDRESS = 0x...`

---

### 5.3 Deploy Management Contracts

#### 13. ComCeloSessionManager
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `SESSION_MANAGER_ADDRESS = 0x...`

#### 14. ComCeloPlayerStats
- **Constructor Parameters:**
  ```
  _gameContract: [CORE_ADDRESS]
  ```
- **📝 Save Address:** `PLAYER_STATS_ADDRESS = 0x...`

#### 15. ComCeloGovernance
- **Constructor:** None
- **📝 Save Address:** `GOVERNANCE_ADDRESS = 0x...`

#### 16. ComCeloAntiCheat
- **Constructor Parameters:**
  ```
  _sessionManager: [SESSION_MANAGER_ADDRESS from step 13]
  ```
- **📝 Save Address:** `ANTICHEAT_ADDRESS = 0x...`

#### 17. ComCeloCrossChainRewards
- **Constructor:** None
- **📝 Save Address:** `CROSSCHAIN_REWARDS_ADDRESS = 0x...`

---

## Step 6: Configure Contract Relationships

After deployment, you need to set up contract integrations:

### 6.1 Set Units Contract as Minter

1. In Remix, load **ComCeloUnits** at `UNITS_ADDRESS`
2. Call `setGameContract(CORE_ADDRESS)`
3. Confirm transaction in MetaMask

### 6.2 Set Treasury Authorized Spender

1. Load **ComCeloTreasury** at `TREASURY_ADDRESS`
2. Call `setGameContract(CORE_ADDRESS)`
3. Confirm transaction

### 6.3 Register Feature Contracts (Optional)

If your contracts have registration functions:
1. Load **ComCeloCore** at `CORE_ADDRESS`
2. Call setter functions like:
   - `setItemsContract(ITEMS_ADDRESS)`
   - `setSeasonsContract(SEASONS_ADDRESS)`
   - etc.

---

## Step 7: Verify Contracts on BaseScan

1. Go to **https://basescan.org/**
2. For each deployed contract:
   - Navigate to contract address page
   - Click **"Contract"** tab
   - Click **"Verify and Publish"**
   - Select:
     - Compiler: `v0.8.23+commit.f704f362`
     - Optimization: **Yes** with **200** runs
     - License: MIT
   - Paste flattened source code (see below)
   - Submit verification

### Flatten Contracts for Verification

Use Remix's built-in flattener:
1. Right-click on contract file in Remix
2. Select **"Flatten"**
3. Copy the flattened code
4. Paste into BaseScan verification form

---

## Step 8: Save Deployment Info

Create a file `deployments/base-mainnet.json`:

```json
{
  "network": "base",
  "chainId": 8453,
  "deployer": "0xYourWalletAddress",
  "timestamp": "2025-12-25T...",
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
    "MetaTxRelay": "0x...",
    "SessionManager": "0x...",
    "PlayerStats": "0x...",
    "Governance": "0x...",
    "AntiCheat": "0x...",
    "CrossChainRewards": "0x..."
  }
}
```

---

## Step 9: Update Frontend Configuration

Create `.env.local`:

```bash
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_NETWORK=base

# Core Contracts
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=0x...

# Feature Contracts
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_METATXRELAY_CONTRACT_ADDRESS=0x...

# Management Contracts
NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_ANTICHEAT_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_CROSSCHAIN_REWARDS_CONTRACT_ADDRESS=0x...

# Deployer
DEPLOYER_ADDRESS=0xYourWalletAddress
```

---

## Deployment Checklist

Before deploying to mainnet, verify:

- [ ] All contracts compile in Remix without errors
- [ ] MetaMask connected to **Base Mainnet** (Chain ID 8453)
- [ ] You have sufficient ETH (~0.05+ ETH for gas)
- [ ] You understand constructor parameters for each contract
- [ ] You have a secure way to store deployed addresses
- [ ] You've tested on Base Sepolia testnet first (recommended)

---

## Troubleshooting

### Gas Estimation Failed
- **Solution:** Increase gas limit manually in MetaMask
- **Typical gas needed:** 2-5 million per contract

### Transaction Reverted
- **Cause:** Wrong constructor parameters
- **Solution:** Double-check addresses are correct and match previous deployments

### Contract Already Deployed
- **Cause:** Same bytecode deployed twice from same address
- **Solution:** Use a different wallet or wait for nonce to change

### "Out of Gas"
- **Solution:** Set gas limit to 10,000,000 in Remix deploy settings

---

## Cost Estimation

Approximate total cost (Base Mainnet, as of Dec 2025):

| Contract | Gas Used | Cost (@ 0.5 gwei) |
|----------|----------|-------------------|
| ComCeloCore | ~4,000,000 | ~$0.05 |
| ComCeloUnits | ~2,500,000 | ~$0.03 |
| ComCeloTreasury | ~1,000,000 | ~$0.01 |
| Others (14 contracts) | ~20,000,000 | ~$0.25 |
| **Total (17 contracts)** | **~30,000,000** | **~$0.40** |

Base Mainnet has very low gas fees. Total deployment cost typically under $1 USD.

---

## Security Recommendations

1. **Use a Fresh Wallet:** Deploy from a dedicated deployment wallet
2. **Transfer Ownership:** After deployment, transfer ownership to multisig
3. **Test First:** Deploy to Base Sepolia testnet before mainnet
4. **Verify All Contracts:** Ensure source code is verified on BaseScan
5. **Pause Functionality:** Use pause functions if contracts support it
6. **Audit:** Consider security audit before handling real funds

---

## Next Steps After Deployment

1. ✅ Verify all contracts on BaseScan
2. ✅ Test contract interactions via Remix
3. ✅ Set up admin roles and permissions
4. ✅ Update frontend with contract addresses
5. ✅ Monitor contracts on BaseScan
6. ✅ Consider multisig for critical functions

---

## Resources

- **Remix IDE:** https://remix.ethereum.org/
- **Base Mainnet RPC:** https://mainnet.base.org
- **BaseScan:** https://basescan.org
- **Base Docs:** https://docs.base.org
- **MetaMask Setup:** https://docs.base.org/using-base/

---

## Support

If you encounter issues:
1. Check BaseScan for failed transaction details
2. Review Remix console for error messages
3. Verify constructor parameters match deployment order
4. Test on Base Sepolia first

Good luck with your deployment! 🚀
