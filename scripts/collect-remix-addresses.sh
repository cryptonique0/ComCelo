#!/bin/bash

# Base Mainnet Deployment Address Collector
# Use this after deploying via Remix to generate deployment files

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║     ComCelo Base Mainnet Deployment Address Collector          ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Create deployments directory if it doesn't exist
mkdir -p deployments

# Prompt for deployer address
echo "Enter your deployer wallet address:"
read DEPLOYER_ADDRESS

# Get current timestamp
TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%S.000Z")

# Collect all contract addresses
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "Enter deployed contract addresses (paste from your checklist):"
echo "═══════════════════════════════════════════════════════════════"
echo ""

echo "Core Contracts:"
echo "---------------"
echo -n "ComCeloUnits: "
read UNITS_ADDRESS

echo -n "ComCeloTreasury: "
read TREASURY_ADDRESS

echo -n "ComCeloCore: "
read CORE_ADDRESS

echo -n "ComCeloMatchmaker: "
read MATCHMAKER_ADDRESS

echo ""
echo "Feature Contracts:"
echo "------------------"
echo -n "ComCeloItems: "
read ITEMS_ADDRESS

echo -n "ComCeloSeasons: "
read SEASONS_ADDRESS

echo -n "ComCeloTournaments: "
read TOURNAMENTS_ADDRESS

echo -n "ComCeloAchievements: "
read ACHIEVEMENTS_ADDRESS

echo -n "ComCeloRanking: "
read RANKING_ADDRESS

echo -n "ComCeloQuests: "
read QUESTS_ADDRESS

echo -n "ComCeloRewards: "
read REWARDS_ADDRESS

echo -n "ComCeloMetaTxRelay: "
read METATXRELAY_ADDRESS

echo ""
echo "Management Contracts:"
echo "---------------------"
echo -n "ComCeloSessionManager: "
read SESSION_MANAGER_ADDRESS

echo -n "ComCeloPlayerStats: "
read PLAYER_STATS_ADDRESS

echo -n "ComCeloGovernance: "
read GOVERNANCE_ADDRESS

echo -n "ComCeloAntiCheat: "
read ANTICHEAT_ADDRESS

echo -n "ComCeloCrossChainRewards: "
read CROSSCHAIN_REWARDS_ADDRESS

# Generate JSON file
cat > deployments/base-mainnet.json << EOF
{
  "network": "base",
  "chainId": 8453,
  "deployer": "$DEPLOYER_ADDRESS",
  "timestamp": "$TIMESTAMP",
  "blockNumber": 0,
  "contracts": {
    "Core": "$CORE_ADDRESS",
    "Units": "$UNITS_ADDRESS",
    "Treasury": "$TREASURY_ADDRESS",
    "Matchmaker": "$MATCHMAKER_ADDRESS",
    "Items": "$ITEMS_ADDRESS",
    "Seasons": "$SEASONS_ADDRESS",
    "Tournaments": "$TOURNAMENTS_ADDRESS",
    "Achievements": "$ACHIEVEMENTS_ADDRESS",
    "Ranking": "$RANKING_ADDRESS",
    "Quests": "$QUESTS_ADDRESS",
    "Rewards": "$REWARDS_ADDRESS",
    "MetaTxRelay": "$METATXRELAY_ADDRESS",
    "SessionManager": "$SESSION_MANAGER_ADDRESS",
    "PlayerStats": "$PLAYER_STATS_ADDRESS",
    "Governance": "$GOVERNANCE_ADDRESS",
    "AntiCheat": "$ANTICHEAT_ADDRESS",
    "CrossChainRewards": "$CROSSCHAIN_REWARDS_ADDRESS"
  }
}
EOF

# Generate .env file
cat > deployments/.env.base-mainnet << EOF
# Base Mainnet Deployment - Generated $(date)
DEPLOYER_ADDRESS=$DEPLOYER_ADDRESS

# Core Contracts
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=$CORE_ADDRESS
NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=$UNITS_ADDRESS
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=$TREASURY_ADDRESS
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=$MATCHMAKER_ADDRESS

# Feature Contracts
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=$ITEMS_ADDRESS
NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS=$SEASONS_ADDRESS
NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS=$TOURNAMENTS_ADDRESS
NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS=$ACHIEVEMENTS_ADDRESS
NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS=$RANKING_ADDRESS
NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS=$QUESTS_ADDRESS
NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=$REWARDS_ADDRESS
NEXT_PUBLIC_METATXRELAY_CONTRACT_ADDRESS=$METATXRELAY_ADDRESS

# Management Contracts
NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS=$SESSION_MANAGER_ADDRESS
NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS=$PLAYER_STATS_ADDRESS
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=$GOVERNANCE_ADDRESS
NEXT_PUBLIC_ANTICHEAT_CONTRACT_ADDRESS=$ANTICHEAT_ADDRESS
NEXT_PUBLIC_CROSSCHAIN_REWARDS_CONTRACT_ADDRESS=$CROSSCHAIN_REWARDS_ADDRESS

# Network
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_NETWORK=base
EOF

echo ""
echo "✅ Files generated successfully!"
echo ""
echo "📁 Created files:"
echo "   - deployments/base-mainnet.json"
echo "   - deployments/.env.base-mainnet"
echo ""
echo "📋 Deployment Summary:"
echo "═══════════════════════════════════════════════════════════════"
cat deployments/base-mainnet.json
echo ""
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "🚀 Next Steps:"
echo "   1. Copy deployments/.env.base-mainnet to your frontend:"
echo "      cat deployments/.env.base-mainnet >> .env.local"
echo ""
echo "   2. Verify contracts on BaseScan (see BASESCAN_VERIFICATION_GUIDE.md)"
echo ""
echo "   3. Configure contract relationships:"
echo "      - Units.setGameContract($CORE_ADDRESS)"
echo "      - Treasury.setGameContract($CORE_ADDRESS)"
echo ""
echo "   4. Test contract interactions on BaseScan"
echo ""
echo "   5. Update frontend lib/contracts.ts with addresses"
echo ""
echo "All done! 🎉"
