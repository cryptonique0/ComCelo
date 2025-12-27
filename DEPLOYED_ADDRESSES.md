# Deployed Contract Addresses

## Base Mainnet (Chain ID: 8453)

### Core Contracts
- **ComCeloGovernance**: `0x6736103c7a528E658895c541F89E47F250c98a4f`
- **ComCeloCrossChainRewards**: `0x4C73a992c2f52a74E67A2424b800Cf97359ab694`

### Feature Contracts
- **ComCeloItems**: `0xBf1D587fc5f00aBA65671ab575eD5225D3342e13`
- **ComCeloMetaTxRelay**: `0x6E69f9c92070c3381D7Aebbb07842b682d500011`

### Simplified Contracts
- **ComCeloBaseSimple**: `0x3D071744510628a1afB3052Ca1492aD25A92afd8`
  - Deployed via Remix
  - Includes: ping, registerPlayer, createGame, joinGame, storeData
  - [View on BaseScan](https://basescan.org/address/0x3D071744510628a1afB3052Ca1492aD25A92afd8)

## Pending Deployment

### Core Contracts (7 remaining)
- ComCeloCore
- ComCeloMatchmaker
- ComCeloTreasury
- ComCeloUnits
- ComCeloSessionManager
- ComCeloPlayerStats
- ComCeloAntiCheat

### Feature Contracts (6 remaining)
- ComCeloSeasons
- ComCeloTournaments
- ComCeloAchievements
- ComCeloRanking
- ComCeloQuests
- ComCeloRewards

### Base Governance (5 remaining)
- MarketplaceEscrow
- FeeManager
- EmergencyPause
- UpgradeManager
- AccessControl

## Auto-Interaction Examples

### ComCeloBaseSimple

```bash
# Ping
export CONTRACT_NAME=ComCeloBaseSimple
export CONTRACT_ADDRESS=0x3D071744510628a1afB3052Ca1492aD25A92afd8
export FUNCTION_NAME=ping
export FUNCTION_ARGS='[]'
npm run interact:auto:evm -- --network base

# Register Player
export FUNCTION_NAME=registerPlayer
export FUNCTION_ARGS='["YourUsername"]'
npm run interact:auto:evm -- --network base

# Create Game
export FUNCTION_NAME=createGame
export FUNCTION_ARGS='[]'
npm run interact:auto:evm -- --network base

# Join Game (gameId = 1)
export FUNCTION_NAME=joinGame
export FUNCTION_ARGS='[1]'
npm run interact:auto:evm -- --network base

# Store Data
export FUNCTION_NAME=storeData
export FUNCTION_ARGS='["My game data"]'
npm run interact:auto:evm -- --network base
```

## Verification

Verify contracts on BaseScan:
```bash
npx hardhat verify --network base 0x3D071744510628a1afB3052Ca1492aD25A92afd8
```

## Environment Variables

Add to `.env`:
```
NEXT_PUBLIC_BASE_SIMPLE_CONTRACT_ADDRESS=0x3D071744510628a1afB3052Ca1492aD25A92afd8
```
