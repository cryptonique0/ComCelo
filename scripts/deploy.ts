import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy ComCeloUnits
  console.log("\n1. Deploying ComCeloUnits...");
  const UnitsFactory = await ethers.getContractFactory("ComCeloUnits");
  const units = await UnitsFactory.deploy();
  await units.waitForDeployment();
  const unitsAddress = await units.getAddress();
  console.log("ComCeloUnits deployed to:", unitsAddress);

  // Deploy ComCeloCore
  console.log("\n2. Deploying ComCeloCore...");
  const CoreFactory = await ethers.getContractFactory("ComCeloCore");
  const core = await CoreFactory.deploy();
  await core.waitForDeployment();
  const coreAddress = await core.getAddress();
  console.log("ComCeloCore deployed to:", coreAddress);

  // Deploy ComCeloMatchmaker
  console.log("\n3. Deploying ComCeloMatchmaker...");
  const MatchmakerFactory = await ethers.getContractFactory("ComCeloMatchmaker");
  const matchmaker = await MatchmakerFactory.deploy();
  await matchmaker.waitForDeployment();
  const matchmakerAddress = await matchmaker.getAddress();
  console.log("ComCeloMatchmaker deployed to:", matchmakerAddress);

  // Deploy ComCeloSessionManager

  // Deploy ComCeloSessionManager
  console.log("\n3b. Deploying ComCeloSessionManager...");
  const SessionFactory = await ethers.getContractFactory("ComCeloSessionManager");
  const sessionManager = await SessionFactory.deploy();
  await sessionManager.waitForDeployment();
  const sessionManagerAddress = await sessionManager.getAddress();
  console.log("ComCeloSessionManager deployed to:", sessionManagerAddress);

  // Deploy ComCeloTreasury
  console.log("\n4. Deploying ComCeloTreasury...");
  const TreasuryFactory = await ethers.getContractFactory("ComCeloTreasury");
  const treasury = await TreasuryFactory.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("ComCeloTreasury deployed to:", treasuryAddress);

  // Deploy ComCeloGovernance
  console.log("\n4b. Deploying ComCeloGovernance...");
  const GovernanceFactory = await ethers.getContractFactory("ComCeloGovernance");
  const governance = await GovernanceFactory.deploy();
  await governance.waitForDeployment();
  const governanceAddress = await governance.getAddress();
  console.log("ComCeloGovernance deployed to:", governanceAddress);

  // Deploy ComCeloMetaTxRelay
  console.log("\n5. Deploying ComCeloMetaTxRelay...");
  const RelayFactory = await ethers.getContractFactory("ComCeloMetaTxRelay");
  const relay = await RelayFactory.deploy(coreAddress);
  await relay.waitForDeployment();
  const relayAddress = await relay.getAddress();
  console.log("ComCeloMetaTxRelay deployed to:", relayAddress);

  // Deploy ComCeloCrossChainRewards (set rewards contract later via governance)
  console.log("\n8. Deploying ComCeloCrossChainRewards...");
  const CrossRewardsFactory = await ethers.getContractFactory("ComCeloCrossChainRewards");
  const crossRewards = await CrossRewardsFactory.deploy("0x0000000000000000000000000000000000000000", deployer.address);
  await crossRewards.waitForDeployment();
  const crossRewardsAddress = await crossRewards.getAddress();
  console.log("ComCeloCrossChainRewards deployed to:", crossRewardsAddress);

  // Deploy ComCeloPlayerStats

  // Deploy ComCeloPlayerStats
  console.log("\n6. Deploying ComCeloPlayerStats...");
  const StatsFactory = await ethers.getContractFactory("ComCeloPlayerStats");
  const stats = await StatsFactory.deploy();
  await stats.waitForDeployment();
  const statsAddress = await stats.getAddress();
  console.log("ComCeloPlayerStats deployed to:", statsAddress);

  // Deploy ComCeloAntiCheat
  console.log("\n7. Deploying ComCeloAntiCheat...");
  const AntiCheatFactory = await ethers.getContractFactory("ComCeloAntiCheat");
  const antiCheat = await AntiCheatFactory.deploy();
  await antiCheat.waitForDeployment();
  const antiCheatAddress = await antiCheat.getAddress();
  console.log("ComCeloAntiCheat deployed to:", antiCheatAddress);

  console.log("\n✅ All contracts deployed successfully!");
  console.log("\nDeployment Summary:");
  console.log("====================");
  console.log("ComCeloUnits:       ", unitsAddress);
  console.log("ComCeloCore:        ", coreAddress);
  console.log("ComCeloMatchmaker:  ", matchmakerAddress);
  console.log("ComCeloSessionMgr:  ", sessionManagerAddress);
  console.log("ComCeloTreasury:    ", treasuryAddress);
  console.log("ComCeloGovernance:  ", governanceAddress);
  console.log("ComCeloMetaTxRelay: ", relayAddress);
  console.log("ComCeloPlayerStats: ", statsAddress);
  console.log("ComCeloAntiCheat:   ", antiCheatAddress);
  console.log("ComCeloXChainRwds:  ", crossRewardsAddress);

  // Save deployment info
  const deployment = {
    network: (await ethers.provider.getNetwork()).name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      units: unitsAddress,
      core: coreAddress,
      matchmaker: matchmakerAddress,
      sessionManager: sessionManagerAddress,
      treasury: treasuryAddress,
      governance: governanceAddress,
      relay: relayAddress,
      stats: statsAddress,
      antiCheat: antiCheatAddress,
      crossChainRewards: crossRewardsAddress,
    },
  };

  console.log("\nSave this deployment info:");
  console.log(JSON.stringify(deployment, null, 2));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
