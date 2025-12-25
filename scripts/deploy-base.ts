import { ethers } from "hardhat";
import * as fs from "fs";
import * as path from "path";

/**
 * Deployment script for ComCelo on Base chain (mainnet & Sepolia testnet)
 * 
 * Usage:
 *   Testnet:  npx hardhat run scripts/deploy-base.ts --network baseSepolia
 *   Mainnet:  npx hardhat run scripts/deploy-base.ts --network base
 */

async function main() {
  const [deployer] = await ethers.getSigners();
  const network = (await ethers.provider.getNetwork()).name;
  const chainId = (await ethers.provider.getNetwork()).chainId;

  console.log("═══════════════════════════════════════════════════════════");
  console.log("ComCelo Deployment - Base Chain");
  console.log("═══════════════════════════════════════════════════════════");
  console.log(`\nNetwork: ${network} (Chain ID: ${chainId})`);
  console.log(`Deployer: ${deployer.address}`);
  console.log(`Block Number: ${await ethers.provider.getBlockNumber()}`);

  // Get deployer balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH\n`);

  const deploymentAddresses: Record<string, string> = {};
  let txCount = 0;

  try {
    // 1. Deploy ComCeloCore
    console.log("1. Deploying ComCeloCore...");
    const CoreFactory = await ethers.getContractFactory("ComCeloCore");
    const core = await CoreFactory.deploy();
    await core.waitForDeployment();
    const coreAddress = await core.getAddress();
    deploymentAddresses["ComCeloCore"] = coreAddress;
    console.log(`   ✓ ComCeloCore: ${coreAddress}\n`);
    txCount++;

    // 2. Deploy ComCeloUnits
    console.log("2. Deploying ComCeloUnits...");
    const UnitsFactory = await ethers.getContractFactory("ComCeloUnits");
    const units = await UnitsFactory.deploy();
    await units.waitForDeployment();
    const unitsAddress = await units.getAddress();
    deploymentAddresses["ComCeloUnits"] = unitsAddress;
    console.log(`   ✓ ComCeloUnits: ${unitsAddress}\n`);
    txCount++;

    // 3. Deploy ComCeloMatchmaker
    console.log("3. Deploying ComCeloMatchmaker...");
    const MatchmakerFactory = await ethers.getContractFactory("ComCeloMatchmaker");
    const matchmaker = await MatchmakerFactory.deploy();
    await matchmaker.waitForDeployment();
    const matchmakerAddress = await matchmaker.getAddress();
    deploymentAddresses["ComCeloMatchmaker"] = matchmakerAddress;
    console.log(`   ✓ ComCeloMatchmaker: ${matchmakerAddress}\n`);
    txCount++;
    
      // 3b. Deploy ComCeloSessionManager
      console.log("3b. Deploying ComCeloSessionManager...");
      const SessionFactory = await ethers.getContractFactory("ComCeloSessionManager");
      const sessionManager = await SessionFactory.deploy();
      await sessionManager.waitForDeployment();
      const sessionManagerAddress = await sessionManager.getAddress();
      deploymentAddresses["ComCeloSessionManager"] = sessionManagerAddress;
      console.log(`   ✓ ComCeloSessionManager: ${sessionManagerAddress}\n`);
      txCount++;

    // 4. Deploy ComCeloTreasury
    console.log("4. Deploying ComCeloTreasury...");
    const TreasuryFactory = await ethers.getContractFactory("ComCeloTreasury");
    const treasury = await TreasuryFactory.deploy();
    await treasury.waitForDeployment();
    const treasuryAddress = await treasury.getAddress();
    deploymentAddresses["ComCeloTreasury"] = treasuryAddress;
    console.log(`   ✓ ComCeloTreasury: ${treasuryAddress}\n`);
    txCount++;
    
      // 4b. Deploy ComCeloGovernance
      console.log("4b. Deploying ComCeloGovernance...");
      const GovernanceFactory = await ethers.getContractFactory("ComCeloGovernance");
      const governance = await GovernanceFactory.deploy();
      await governance.waitForDeployment();
      const governanceAddress = await governance.getAddress();
      deploymentAddresses["ComCeloGovernance"] = governanceAddress;
      console.log(`   ✓ ComCeloGovernance: ${governanceAddress}\n`);
      txCount++;

    // 5. Deploy ComCeloItems (ERC1155)
    console.log("5. Deploying ComCeloItems (ERC1155)...");
    const ItemsFactory = await ethers.getContractFactory("ComCeloItems");
    const items = await ItemsFactory.deploy();
    await items.waitForDeployment();
    const itemsAddress = await items.getAddress();
    deploymentAddresses["ComCeloItems"] = itemsAddress;
    console.log(`   ✓ ComCeloItems: ${itemsAddress}\n`);
    txCount++;
    
      // 5b. Deploy ComCeloPlayerStats
      console.log("5b. Deploying ComCeloPlayerStats...");
      const StatsFactory = await ethers.getContractFactory("ComCeloPlayerStats");
      const stats = await StatsFactory.deploy();
      await stats.waitForDeployment();
      const statsAddress = await stats.getAddress();
      deploymentAddresses["ComCeloPlayerStats"] = statsAddress;
      console.log(`   ✓ ComCeloPlayerStats: ${statsAddress}\n`);
      txCount++;
    
      // 5c. Deploy ComCeloAntiCheat
      console.log("5c. Deploying ComCeloAntiCheat...");
      const AntiCheatFactory = await ethers.getContractFactory("ComCeloAntiCheat");
      const antiCheat = await AntiCheatFactory.deploy();
      await antiCheat.waitForDeployment();
      const antiCheatAddress = await antiCheat.getAddress();
      deploymentAddresses["ComCeloAntiCheat"] = antiCheatAddress;
      console.log(`   ✓ ComCeloAntiCheat: ${antiCheatAddress}\n`);
      txCount++;

    // 6. Deploy ComCeloSeasons
    console.log("6. Deploying ComCeloSeasons...");
    const SeasonsFactory = await ethers.getContractFactory("ComCeloSeasons");
    const seasons = await SeasonsFactory.deploy();
    await seasons.waitForDeployment();
    const seasonsAddress = await seasons.getAddress();
    deploymentAddresses["ComCeloSeasons"] = seasonsAddress;
    console.log(`   ✓ ComCeloSeasons: ${seasonsAddress}\n`);
    txCount++;

    // 7. Deploy ComCeloTournaments
    console.log("7. Deploying ComCeloTournaments...");
    const TournamentsFactory = await ethers.getContractFactory("ComCeloTournaments");
    const tournaments = await TournamentsFactory.deploy();
    await tournaments.waitForDeployment();
    const tournamentsAddress = await tournaments.getAddress();
    deploymentAddresses["ComCeloTournaments"] = tournamentsAddress;
    console.log(`   ✓ ComCeloTournaments: ${tournamentsAddress}\n`);
    txCount++;

    // 8. Deploy ComCeloAchievements
    console.log("8. Deploying ComCeloAchievements...");
    const AchievementsFactory = await ethers.getContractFactory("ComCeloAchievements");
    const achievements = await AchievementsFactory.deploy();
    await achievements.waitForDeployment();
    const achievementsAddress = await achievements.getAddress();
    deploymentAddresses["ComCeloAchievements"] = achievementsAddress;
    console.log(`   ✓ ComCeloAchievements: ${achievementsAddress}\n`);
    txCount++;

    // 9. Deploy ComCeloRanking
    console.log("9. Deploying ComCeloRanking...");
    const RankingFactory = await ethers.getContractFactory("ComCeloRanking");
    const ranking = await RankingFactory.deploy();
    await ranking.waitForDeployment();
    const rankingAddress = await ranking.getAddress();
    deploymentAddresses["ComCeloRanking"] = rankingAddress;
    console.log(`   ✓ ComCeloRanking: ${rankingAddress}\n`);
    txCount++;

    // 10. Deploy ComCeloQuests
    console.log("10. Deploying ComCeloQuests...");
    const QuestsFactory = await ethers.getContractFactory("ComCeloQuests");
    const quests = await QuestsFactory.deploy();
    await quests.waitForDeployment();
    const questsAddress = await quests.getAddress();
    deploymentAddresses["ComCeloQuests"] = questsAddress;
    console.log(`    ✓ ComCeloQuests: ${questsAddress}\n`);
    txCount++;

    // 11. Deploy ComCeloRewards
    console.log("11. Deploying ComCeloRewards...");
    const RewardsFactory = await ethers.getContractFactory("ComCeloRewards");
    const rewards = await RewardsFactory.deploy();
    await rewards.waitForDeployment();
    const rewardsAddress = await rewards.getAddress();
    deploymentAddresses["ComCeloRewards"] = rewardsAddress;
    console.log(`    ✓ ComCeloRewards: ${rewardsAddress}\n`);
    txCount++;

    // 11b. Deploy ComCeloCrossChainRewards (Base-side)
    console.log("11b. Deploying ComCeloCrossChainRewards...");
    const CrossRewardsFactory = await ethers.getContractFactory("ComCeloCrossChainRewards");
    const crossRewards = await CrossRewardsFactory.deploy(rewardsAddress, deployer.address);
    await crossRewards.waitForDeployment();
    const crossRewardsAddress = await crossRewards.getAddress();
    deploymentAddresses["ComCeloCrossChainRewards"] = crossRewardsAddress;
    console.log(`    ✓ ComCeloCrossChainRewards: ${crossRewardsAddress}\n`);
    txCount++;

    // 11c. Deploy ComCeloMetaTxRelay
    console.log("11c. Deploying ComCeloMetaTxRelay...");
    const MetaTxRelayFactory = await ethers.getContractFactory("ComCeloMetaTxRelay");
    const metaTxRelay = await MetaTxRelayFactory.deploy(coreAddress);
    await metaTxRelay.waitForDeployment();
    const metaTxRelayAddress = await metaTxRelay.getAddress();
    deploymentAddresses["ComCeloMetaTxRelay"] = metaTxRelayAddress;
    console.log(`    ✓ ComCeloMetaTxRelay: ${metaTxRelayAddress}\n`);
    txCount++;

    // Update MetaTxRelay with contract addresses
    console.log("11d. Configuring ComCeloMetaTxRelay...");
    await metaTxRelay.setItemsContractAddress(itemsAddress);
    await metaTxRelay.setCrossChainRewardsAddress(crossRewardsAddress);
    await metaTxRelay.setGovernanceContractAddress(governanceAddress);
    console.log(`    ✓ MetaTxRelay configured with contract addresses\n`);
    txCount += 3;

    // 12. Deploy ComCeloOptimisticOracle (Base-specific)
    console.log("12. Deploying ComCeloOptimisticOracle...");
    const OracleFactory = await ethers.getContractFactory("ComCeloOptimisticOracle");
    const oracle = await OracleFactory.deploy();
    await oracle.waitForDeployment();
    const oracleAddress = await oracle.getAddress();
    deploymentAddresses["ComCeloOptimisticOracle"] = oracleAddress;
    console.log(`    ✓ ComCeloOptimisticOracle: ${oracleAddress}\n`);
    txCount++;

    // 13. Deploy ComCeloBaseSpokePool (Base-specific)
    console.log("13. Deploying ComCeloBaseSpokePool...");
    const SpokePoolFactory = await ethers.getContractFactory("ComCeloBaseSpokePool");
    const spokePool = await SpokePoolFactory.deploy(treasuryAddress);
    await spokePool.waitForDeployment();
    const spokePoolAddress = await spokePool.getAddress();
    deploymentAddresses["ComCeloBaseSpokePool"] = spokePoolAddress;
    console.log(`    ✓ ComCeloBaseSpokePool: ${spokePoolAddress}\n`);
    txCount++;

    // Save deployment addresses
    const deploymentFile = path.join(
      __dirname,
      `../deployments/base-${network === "base" ? "mainnet" : "sepolia"}.json`
    );

    const deploymentDir = path.dirname(deploymentFile);
    if (!fs.existsSync(deploymentDir)) {
      fs.mkdirSync(deploymentDir, { recursive: true });
    }

    const deploymentData = {
      network: network,
      chainId: chainId,
      deployer: deployer.address,
      timestamp: new Date().toISOString(),
      contracts: deploymentAddresses,
    };

    fs.writeFileSync(deploymentFile, JSON.stringify(deploymentData, null, 2));

    console.log("═══════════════════════════════════════════════════════════");
    console.log("✅ Deployment Complete!");
    console.log("═══════════════════════════════════════════════════════════");
    console.log(`\nDeployment Summary:`);
    console.log(`- Total Contracts: ${Object.keys(deploymentAddresses).length}`);
    console.log(`- Total Transactions: ${txCount}`);
    console.log(`- Network: ${network}`);
    console.log(`- Deployer: ${deployer.address}`);
    console.log(`\nAddresses saved to: ${deploymentFile}\n`);

    // Print addresses
    console.log("Contract Addresses:");
    console.log("─────────────────────────────────────────────────────────");
    Object.entries(deploymentAddresses).forEach(([name, address]) => {
      console.log(`${name.padEnd(30)}: ${address}`);
    });
    console.log("─────────────────────────────────────────────────────────\n");

    // Instructions
    console.log("📋 Next Steps:");
    console.log("─────────────────────────────────────────────────────────");
    console.log("1. Update .env.base with contract addresses:");
    Object.entries(deploymentAddresses).forEach(([name, address]) => {
      console.log(`   ${name}=${address}`);
    });
    console.log("\n2. Verify contracts on Basescan:");
    console.log(`   Network: ${network}`);
    console.log("   Use: npx hardhat verify --network baseSepolia <ADDRESS> <ARGS>");
    console.log("\n3. Update frontend config (lib/contracts.ts)");
    console.log("\n4. Test cross-chain communication");
    console.log("─────────────────────────────────────────────────────────\n");

  } catch (error) {
    console.error("\n❌ Deployment failed!");
    console.error(error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
