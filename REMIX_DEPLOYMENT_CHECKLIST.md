# ComCelo Remix Deployment Checklist - Base Mainnet

## Quick Reference: Deployment Order & Constructor Params

Copy this checklist and fill in addresses as you deploy.

---

## 🔴 STEP 1: Deploy Core Contracts

### 1️⃣ ComCeloUnits
```
File: contracts/ComCeloUnits.sol
Constructor: NONE
Gas Limit: 2,500,000
```
**📝 ADDRESS:** `_______________________________________________`

---

### 2️⃣ ComCeloTreasury
```
File: contracts/ComCeloTreasury.sol
Constructor: NONE
Gas Limit: 1,000,000
```
**📝 ADDRESS:** `_______________________________________________`

---

### 3️⃣ ComCeloCore
```
File: contracts/ComCeloCore.sol
Constructor:
  _unitsContract: [Units address from step 1]
  _treasury: [Treasury address from step 2]
Gas Limit: 4,000,000
```
**📝 ADDRESS:** `_______________________________________________`

---

### 4️⃣ ComCeloMatchmaker
```
File: contracts/ComCeloMatchmaker.sol
Constructor:
  _gameContract: [Core address from step 3]
Gas Limit: 2,000,000
```
**📝 ADDRESS:** `_______________________________________________`

---

## 🟡 STEP 2: Deploy Feature Contracts

### 5️⃣ ComCeloItems
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 6️⃣ ComCeloSeasons
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 7️⃣ ComCeloTournaments
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 8️⃣ ComCeloAchievements
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 9️⃣ ComCeloRanking
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 🔟 ComCeloQuests
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 1️⃣1️⃣ ComCeloRewards
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 1️⃣2️⃣ ComCeloMetaTxRelay
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

---

## 🟢 STEP 3: Deploy Management Contracts

### 1️⃣3️⃣ ComCeloSessionManager
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 1️⃣4️⃣ ComCeloPlayerStats
```
Constructor: _gameContract = [Core address]
```
**📝 ADDRESS:** `_______________________________________________`

### 1️⃣5️⃣ ComCeloGovernance
```
Constructor: NONE
```
**📝 ADDRESS:** `_______________________________________________`

### 1️⃣6️⃣ ComCeloAntiCheat
```
Constructor: _sessionManager = [SessionManager address from step 13]
```
**📝 ADDRESS:** `_______________________________________________`

### 1️⃣7️⃣ ComCeloCrossChainRewards
```
Constructor: NONE
```
**📝 ADDRESS:** `_______________________________________________`

---

## ⚙️ STEP 4: Post-Deployment Configuration

### Set Contract Relationships

#### On ComCeloUnits:
```solidity
setGameContract([Core address])
```
✅ Transaction: `_____________________________________________`

#### On ComCeloTreasury:
```solidity
setGameContract([Core address])
```
✅ Transaction: `_____________________________________________`

---

## 🔍 STEP 5: Verify Contracts on BaseScan

Use this command for each contract (or use Remix flattener + web UI):

```bash
Compiler: v0.8.23+commit.f704f362
Optimization: Yes (200 runs)
License: MIT
```

| Contract | Verified ✅ | BaseScan Link |
|----------|------------|---------------|
| ComCeloUnits | ☐ | https://basescan.org/address/0x... |
| ComCeloTreasury | ☐ | https://basescan.org/address/0x... |
| ComCeloCore | ☐ | https://basescan.org/address/0x... |
| ComCeloMatchmaker | ☐ | https://basescan.org/address/0x... |
| ComCeloItems | ☐ | https://basescan.org/address/0x... |
| ComCeloSeasons | ☐ | https://basescan.org/address/0x... |
| ComCeloTournaments | ☐ | https://basescan.org/address/0x... |
| ComCeloAchievements | ☐ | https://basescan.org/address/0x... |
| ComCeloRanking | ☐ | https://basescan.org/address/0x... |
| ComCeloQuests | ☐ | https://basescan.org/address/0x... |
| ComCeloRewards | ☐ | https://basescan.org/address/0x... |
| ComCeloMetaTxRelay | ☐ | https://basescan.org/address/0x... |
| ComCeloSessionManager | ☐ | https://basescan.org/address/0x... |
| ComCeloPlayerStats | ☐ | https://basescan.org/address/0x... |
| ComCeloGovernance | ☐ | https://basescan.org/address/0x... |
| ComCeloAntiCheat | ☐ | https://basescan.org/address/0x... |
| ComCeloCrossChainRewards | ☐ | https://basescan.org/address/0x... |

---

## 📋 Export Deployment JSON

Create `deployments/base-mainnet.json`:

```json
{
  "network": "base",
  "chainId": 8453,
  "deployer": "YOUR_WALLET_ADDRESS",
  "timestamp": "2025-12-25T...",
  "contracts": {
    "Core": "FILL_IN",
    "Units": "FILL_IN",
    "Treasury": "FILL_IN",
    "Matchmaker": "FILL_IN",
    "Items": "FILL_IN",
    "Seasons": "FILL_IN",
    "Tournaments": "FILL_IN",
    "Achievements": "FILL_IN",
    "Ranking": "FILL_IN",
    "Quests": "FILL_IN",
    "Rewards": "FILL_IN",
    "MetaTxRelay": "FILL_IN",
    "SessionManager": "FILL_IN",
    "PlayerStats": "FILL_IN",
    "Governance": "FILL_IN",
    "AntiCheat": "FILL_IN",
    "CrossChainRewards": "FILL_IN"
  }
}
```

---

## 📱 Frontend Environment Variables

Create `.env.local`:

```bash
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_NETWORK=base

# Core
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=
NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=

# Features
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=
NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS=
NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS=
NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS=
NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS=
NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS=
NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=
NEXT_PUBLIC_METATXRELAY_CONTRACT_ADDRESS=

# Management
NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS=
NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS=
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=
NEXT_PUBLIC_ANTICHEAT_CONTRACT_ADDRESS=
NEXT_PUBLIC_CROSSCHAIN_REWARDS_CONTRACT_ADDRESS=

DEPLOYER_ADDRESS=
```

---

## ✅ Pre-Deployment Checklist

- [ ] MetaMask connected to **Base Mainnet** (Chain ID: 8453)
- [ ] Wallet has **0.05+ ETH** for gas fees
- [ ] All contracts **compile successfully** in Remix
- [ ] Remix compiler set to **v0.8.23**
- [ ] Optimization **enabled** (200 runs)
- [ ] You have this checklist ready to fill out
- [ ] You've tested on **Base Sepolia** testnet first (recommended)

---

## 🚨 Important Notes

1. **Deploy in exact order** - dependencies matter!
2. **Save addresses immediately** after each deployment
3. **Don't refresh Remix** until you've saved addresses
4. **Double-check constructor params** before deploying
5. **Keep MetaMask unlocked** during deployment
6. **Set higher gas limits** if transactions fail

---

## 💡 Tips

- **Copy addresses to clipboard** after each deployment
- **Use Remix's "At Address"** to load already-deployed contracts
- **Take screenshots** of successful deployments
- **Test contract calls** in Remix before verifying
- **Flatten contracts** using Remix's right-click menu

---

## ⏱️ Estimated Time

- Deployment: **30-45 minutes** (careful, methodical)
- Configuration: **10 minutes**
- Verification: **30-60 minutes** (17 contracts)
- **Total: ~1.5-2 hours**

---

## 📞 Troubleshooting

### "Gas estimation failed"
→ Increase gas limit manually in Remix (try 10,000,000)

### "Transaction reverted"
→ Check constructor parameters are correct addresses

### "Nonce too low"
→ Wait 30 seconds and retry, or reset MetaMask account

### "Insufficient funds"
→ Add more ETH to your wallet

---

Good luck! 🚀

**Remember:** Deploy to Base Sepolia testnet first to practice!
