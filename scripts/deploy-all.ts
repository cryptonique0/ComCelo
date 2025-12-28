#!/usr/bin/env ts-node
/**
 * ComCelo Full Deployment Script - Deploy all contracts to any network
 * 
 * Usage:
 *   Celo Alfajores:  npx hardhat run scripts/deploy-all.ts --network celoAlfajores
 *   Celo Mainnet:    npx hardhat run scripts/deploy-all.ts --network celo
 *   Base Sepolia:    npx hardhat run scripts/deploy-all.ts --network baseSepolia
 *   Base Mainnet:    npx hardhat run scripts/deploy-all.ts --network base
 * 
 * Features:
 * - Deploys all 19 ComCelo contracts in correct dependency order
 * - Saves deployment addresses to deployments/{network}.json
 * - Generates ready-to-use .env configuration
 * - Supports both Celo and Base networks
 */

import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

interface Deployment {
  network: string;
  chainId: number;
  deployer: string;
  timestamp: string;
  blockNumber: number;
  contracts: Record<string, string>;
}

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = (await ethers.provider.getNetwork()).name;
  const chainId = (await ethers.provider.getNetwork()).chainId;
  const blockNumber = await ethers.provider.getBlockNumber();
  const balance = await ethers.provider.getBalance(deployer.address);

  console.log("\n═══════════════════════════════════════════════════════════════════");
  console.log("ComCelo Full Deployment");
  console.log("═══════════════════════════════════════════════════════════════════");
  console.log(`Network:       ${network} (Chain ID: ${chainId})`);
  console.log(`Deployer:      ${deployer.address}`);
  console.log(`Block Number:  ${blockNumber}`);
  console.log(`ETH Balance:   ${ethers.formatEther(balance)} ETH`);
  console.log("═══════════════════════════════════════════════════════════════════\n");

  const contracts: Record<string, string> = {};

  try {
    // ========== CORE CONTRACTS (1-4) ==========
    console.log("📦 DEPLOYING CORE CONTRACTS");
    console.log("─────────────────────────────────────────────────────────────────\n");

    console.log("1️⃣  ComCeloCore (Game Logic)...");
    const Core = await ethers.getContractFactory("ComCeloCore");
    const core = await Core.deploy();
    await core.waitForDeployment();
    contracts.Core = await core.getAddress();
    console.log(`    ✓ ${contracts.Core}\n`);

    console.log("2️⃣  ComCeloUnits (Unit Management)...");
    const Units = await ethers.getContractFactory("ComCeloUnits");
    const units = await Units.deploy();
    await units.waitForDeployment();
    contracts.Units = await units.getAddress();
    console.log(`    ✓ ${contracts.Units}\n`);

    console.log("3️⃣  ComCeloTreasury (Financial Management)...");
    const Treasury = await ethers.getContractFactory("ComCeloTreasury");
    const treasury = await Treasury.deploy();
    await treasury.waitForDeployment();
    contracts.Treasury = await treasury.getAddress();
    console.log(`    ✓ ${contracts.Treasury}\n`);

    console.log("4️⃣  ComCeloMatchmaker (Matchmaking & Invites)...");
    const Matchmaker = await ethers.getContractFactory("ComCeloMatchmaker");
    const matchmaker = await Matchmaker.deploy();
    await matchmaker.waitForDeployment();
    contracts.Matchmaker = await matchmaker.getAddress();
    console.log(`    ✓ ${contracts.Matchmaker}\n`);

    // ========== GAME FEATURE CONTRACTS (5-11) ==========
    console.log("🎮 DEPLOYING GAME FEATURE CONTRACTS");
    console.log("─────────────────────────────────────────────────────────────────\n");

    console.log("5️⃣  ComCeloItems (ERC1155 Items & Cosmetics)...");
    const Items = await ethers.getContractFactory("ComCeloItems");
    const items = await Items.deploy();
    await items.waitForDeployment();
    contracts.Items = await items.getAddress();
    console.log(`    ✓ ${contracts.Items}\n`);

    console.log("6️⃣  ComCeloSeasons (Seasonal Progression)...");
    const Seasons = await ethers.getContractFactory("ComCeloSeasons");
    const seasons = await Seasons.deploy();
    await seasons.waitForDeployment();
    contracts.Seasons = await seasons.getAddress();
    console.log(`    ✓ ${contracts.Seasons}\n`);

    console.log("7️⃣  ComCeloTournaments (Multi-Round Tournaments)...");
    const Tournaments = await ethers.getContractFactory("ComCeloTournaments");
    const tournaments = await Tournaments.deploy();
    await tournaments.waitForDeployment();
    contracts.Tournaments = await tournaments.getAddress();
    console.log(`    ✓ ${contracts.Tournaments}\n`);

    console.log("8️⃣  ComCeloAchievements (Achievement Tracking)...");
    const Achievements = await ethers.getContractFactory("ComCeloAchievements");
    const achievements = await Achievements.deploy();
    await achievements.waitForDeployment();
    contracts.Achievements = await achievements.getAddress();
    console.log(`    ✓ ${contracts.Achievements}\n`);

    console.log("9️⃣  ComCeloRanking (Player Rankings)...");
    const Ranking = await ethers.getContractFactory("ComCeloRanking");
    const ranking = await Ranking.deploy();
    await ranking.waitForDeployment();
    contracts.Ranking = await ranking.getAddress();
    console.log(`    ✓ ${contracts.Ranking}\n`);

    console.log("🔟 ComCeloQuests (Daily Quests & Challenges)...");
    const Quests = await ethers.getContractFactory("ComCeloQuests");
    const quests = await Quests.deploy();
    await quests.waitForDeployment();
    contracts.Quests = await quests.getAddress();
    console.log(`    ✓ ${contracts.Quests}\n`);

    console.log("1️⃣1️⃣ ComCeloRewards (Staking & Rewards)...");
    const Rewards = await ethers.getContractFactory("ComCeloRewards");
    const rewards = await Rewards.deploy();
    await rewards.waitForDeployment();
    contracts.Rewards = await rewards.getAddress();
    console.log(`    ✓ ${contracts.Rewards}\n`);

    // ========== MANAGEMENT CONTRACTS (12-17) ==========
    console.log("⚙️  DEPLOYING MANAGEMENT CONTRACTS");
    console.log("─────────────────────────────────────────────────────────────────\n");

    console.log("1️⃣2️⃣ ComCeloSessionManager (P2P Session Management)...");
    const SessionMgr = await ethers.getContractFactory("ComCeloSessionManager");
    const sessionMgr = await SessionMgr.deploy();
    await sessionMgr.waitForDeployment();
    contracts.SessionManager = await sessionMgr.getAddress();
    console.log(`    ✓ ${contracts.SessionManager}\n`);

    console.log("1️⃣3️⃣ ComCeloPlayerStats (Performance Analytics)...");
    const PlayerStats = await ethers.getContractFactory("ComCeloPlayerStats");
    const playerStats = await PlayerStats.deploy();
    await playerStats.waitForDeployment();
    contracts.PlayerStats = await playerStats.getAddress();
    console.log(`    ✓ ${contracts.PlayerStats}\n`);

    console.log("1️⃣4️⃣ ComCeloGovernance (DAO Governance)...");
    const Governance = await ethers.getContractFactory("ComCeloGovernance");
    const governance = await Governance.deploy();
    await governance.waitForDeployment();
    contracts.Governance = await governance.getAddress();
    console.log(`    ✓ ${contracts.Governance}\n`);

    // Deploy governance votes token (ERC20Votes) and configure governance
    console.log("🗳️  Deploying MockVotesToken (ERC20Votes) and configuring governance...");
    const Token = await ethers.getContractFactory("MockVotesToken");
    const token = await Token.deploy();
    await token.waitForDeployment();
    contracts.MockVotesToken = await token.getAddress();
    console.log(`    ✓ Token: ${contracts.MockVotesToken}`);

    // Mint and delegate some initial supply to deployer for bootstrap
    await (await token.mint(deployer.address, ethers.parseEther("1000"))).wait();
    await (await token.connect(deployer).delegate(deployer.address)).wait();
    await ethers.provider.send("evm_mine", []);

    // Configure governance parameters
    await (await governance.setGovernanceToken(contracts.MockVotesToken)).wait();
    await (await governance.setProposalThreshold(ethers.parseEther("10"))).wait();
    await (await governance.setQuorumBps(2000)).wait(); // 20%
    await (await governance.setVotingPeriod(3 * 24 * 60 * 60)).wait(); // 3 days
    await (await governance.setExecutionDelay(24 * 60 * 60, 7 * 24 * 60 * 60)).wait(); // 1 day timelock, 7 days grace
    await (await governance.setDeadlineExtension(60 * 60, 2000)).wait(); // +1h if within 20% of quorum
    await (await governance.setMaxExecutionValue(ethers.parseEther("0"))).wait(); // default to 0 value calls
    await (await governance.setVoter(deployer.address, true)).wait();

    // Allowlist execution targets (limited set)
    await (await governance.setTargetAllowed(contracts.Core, true)).wait();
    await (await governance.setTargetAllowed(contracts.Treasury, true)).wait();
    await (await governance.setTargetAllowed(contracts.Rewards, true)).wait();
    await (await governance.setTargetAllowed(contracts.CrossChainRewards, true)).wait();
    await (await governance.setTargetAllowed(contracts.PlayerStats, true)).wait();

    console.log("1️⃣5️⃣ ComCeloAntiCheat (Cheat Reporting & Review)...");
    const AntiCheat = await ethers.getContractFactory("ComCeloAntiCheat");
    const antiCheat = await AntiCheat.deploy();
    await antiCheat.waitForDeployment();
    contracts.AntiCheat = await antiCheat.getAddress();
    console.log(`    ✓ ${contracts.AntiCheat}\n`);

    console.log("1️⃣6️⃣ ComCeloCrossChainRewards (Cross-Chain Reward Claiming)...");
    const CrossChainRewards = await ethers.getContractFactory("ComCeloCrossChainRewards");
    const crossChainRewards = await CrossChainRewards.deploy(contracts.Rewards, deployer.address);
    await crossChainRewards.waitForDeployment();
    contracts.CrossChainRewards = await crossChainRewards.getAddress();
    console.log(`    ✓ ${contracts.CrossChainRewards}\n`);

    console.log("1️⃣7️⃣ ComCeloMetaTxRelay (Meta-Transaction Relay)...");
    const Relay = await ethers.getContractFactory("ComCeloMetaTxRelay");
    const relay = await Relay.deploy(contracts.Core);
    await relay.waitForDeployment();
    contracts.MetaTxRelay = await relay.getAddress();
    console.log(`    ✓ ${contracts.MetaTxRelay}\n`);

    // ========== ORACLE (Base-specific) ==========
    let oracleAddr = "";
    let spokePoolAddr = "";

    if (chainId === 8453 || chainId === 84532) {
      console.log("🔗 DEPLOYING BASE-SPECIFIC CONTRACTS");
      console.log("─────────────────────────────────────────────────────────────────\n");

      console.log("1️⃣8️⃣ ComCeloOptimisticOracle (Result Verification)...");
      const Oracle = await ethers.getContractFactory("ComCeloOptimisticOracle");
      const oracle = await Oracle.deploy();
      await oracle.waitForDeployment();
      contracts.OptimisticOracle = await oracle.getAddress();
      oracleAddr = contracts.OptimisticOracle;
      console.log(`    ✓ ${contracts.OptimisticOracle}\n`);

      console.log("1️⃣9️⃣ ComCeloBaseSpokePool (Cross-Chain Bridge)...");
      const SpokePool = await ethers.getContractFactory("ComCeloBaseSpokePool");
      const spokePool = await SpokePool.deploy(contracts.Treasury);
      await spokePool.waitForDeployment();
      contracts.BaseSpokePool = await spokePool.getAddress();
      spokePoolAddr = contracts.BaseSpokePool;
      console.log(`    ✓ ${contracts.BaseSpokePool}\n`);
    }

    // ========== SAVE DEPLOYMENT DATA ==========
    console.log("💾 SAVING DEPLOYMENT DATA");
    console.log("─────────────────────────────────────────────────────────────────\n");

    const deploymentDir = path.join(__dirname, "../deployments");
    if (!fs.existsSync(deploymentDir)) {
      fs.mkdirSync(deploymentDir, { recursive: true });
    }

    const deployment: Deployment = {
      network: network,
      chainId: Number(chainId),
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      blockNumber: Number(blockNumber),
      contracts: contracts,
    };

    const deploymentFile = path.join(deploymentDir, `${network}.json`);
    fs.writeFileSync(deploymentFile, JSON.stringify(deployment, null, 2));
    console.log(`✓ Deployment saved to: deployments/${network}.json\n`);

    // ========== GENERATE ENV FILE ==========
    console.log("🔧 GENERATING ENV CONFIGURATION");
    console.log("─────────────────────────────────────────────────────────────────\n");

    const envContent = `# Auto-generated from deployment on ${new Date().toISOString()}
# Network: ${network} (Chain ID: ${chainId})

# Deployer
DEPLOYER_ADDRESS=${deployer.address}

# Core Game Contracts
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=${contracts.Core}
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=${contracts.Matchmaker}
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=${contracts.Treasury}
NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=${contracts.Units}

# Game Features
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=${contracts.Items}
NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS=${contracts.Seasons}
NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS=${contracts.Tournaments}
NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS=${contracts.Achievements}
NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS=${contracts.Ranking}
NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS=${contracts.Quests}
NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=${contracts.Rewards}

# Management & Admin
NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS=${contracts.SessionManager}
NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS=${contracts.PlayerStats}
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=${contracts.Governance}
NEXT_PUBLIC_ANTI_CHEAT_CONTRACT_ADDRESS=${contracts.AntiCheat}
NEXT_PUBLIC_CROSS_CHAIN_REWARDS_CONTRACT_ADDRESS=${contracts.CrossChainRewards}

# Infrastructure
NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS=${contracts.MetaTxRelay}
${oracleAddr ? `NEXT_PUBLIC_ORACLE_CONTRACT_ADDRESS=${oracleAddr}` : ""}
${spokePoolAddr ? `NEXT_PUBLIC_SPOKE_POOL_CONTRACT_ADDRESS=${spokePoolAddr}` : ""}
`;

    const envFile = path.join(deploymentDir, `.env.${network}`);
    fs.writeFileSync(envFile, envContent.trim());
    console.log(`✓ Environment file saved to: deployments/.env.${network}\n`);

    // ========== DEPLOYMENT SUMMARY ==========
    console.log("═══════════════════════════════════════════════════════════════════");
    console.log("✅ DEPLOYMENT COMPLETE!");
    console.log("═══════════════════════════════════════════════════════════════════\n");

    console.log("📊 SUMMARY:");
    console.log(`   Total Contracts:  ${Object.keys(contracts).length}`);
    console.log(`   Network:          ${network}`);
    console.log(`   Chain ID:         ${chainId}`);
    console.log(`   Deployer:         ${deployer.address}\n`);

    console.log("📋 CONTRACT ADDRESSES:");
    console.log("─────────────────────────────────────────────────────────────────");
    const maxLen = Math.max(...Object.keys(contracts).map((k) => k.length));
    Object.entries(contracts).forEach(([name, addr]) => {
      console.log(`   ${name.padEnd(maxLen)}  ${addr}`);
    });
    console.log("");

    console.log("📝 NEXT STEPS:");
    console.log("─────────────────────────────────────────────────────────────────");
    console.log(`1. Copy contract addresses from: deployments/${network}.json`);
    console.log(`2. Update .env with: deployments/.env.${network}`);
    console.log(`3. Verify contracts on block explorer:`);
    console.log(`   - Celo: https://celoscan.io or https://alfajores.celoscan.io`);
    console.log(`   - Base: https://basescan.org or https://sepolia.basescan.org`);
    console.log(`4. Set admin roles via CLI:`);
    console.log(`   npx ts-node scripts/cli.ts set-reporter <SessionManager> <Address> true`);
    console.log(`   npx ts-node scripts/cli.ts set-voter <Governance> <Address> true`);
    console.log(`5. Update frontend contracts.ts with new addresses`);
    console.log(`6. Test cross-chain communication if on Base\n`);

    console.log("📚 DEPLOYMENT FILES:");
    console.log("─────────────────────────────────────────────────────────────────");
    console.log(`   JSON: deployments/${network}.json`);
    console.log(`   ENV:  deployments/.env.${network}\n`);

  } catch (error) {
    console.error("\n❌ DEPLOYMENT FAILED!");
    console.error(error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
