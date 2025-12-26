import { ethers } from "hardhat";

/**
 * Deploy Core Game Contracts
 * - ComCeloCore
 * - ComCeloMatchmaker
 * - ComCeloTreasury
 * - ComCeloUnits
 * - ComCeloSessionManager
 * - ComCeloPlayerStats
 * - ComCeloAntiCheat
 */
async function main() {
  console.log("🚀 Deploying Core Game Contracts...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Deploy ComCeloCore
  console.log("📜 Deploying ComCeloCore...");
  const ComCeloCore = await ethers.getContractFactory("ComCeloCore");
  const core = await ComCeloCore.deploy();
  await core.waitForDeployment();
  const coreAddress = await core.getAddress();
  console.log("✅ ComCeloCore deployed to:", coreAddress);

  // Deploy ComCeloMatchmaker
  console.log("\n📜 Deploying ComCeloMatchmaker...");
  const ComCeloMatchmaker = await ethers.getContractFactory("ComCeloMatchmaker");
  const matchmaker = await ComCeloMatchmaker.deploy(coreAddress);
  await matchmaker.waitForDeployment();
  const matchmakerAddress = await matchmaker.getAddress();
  console.log("✅ ComCeloMatchmaker deployed to:", matchmakerAddress);

  // Deploy ComCeloTreasury
  console.log("\n📜 Deploying ComCeloTreasury...");
  const ComCeloTreasury = await ethers.getContractFactory("ComCeloTreasury");
  const treasury = await ComCeloTreasury.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("✅ ComCeloTreasury deployed to:", treasuryAddress);

  // Deploy ComCeloUnits
  console.log("\n📜 Deploying ComCeloUnits...");
  const ComCeloUnits = await ethers.getContractFactory("ComCeloUnits");
  const units = await ComCeloUnits.deploy();
  await units.waitForDeployment();
  const unitsAddress = await units.getAddress();
  console.log("✅ ComCeloUnits deployed to:", unitsAddress);

  // Deploy ComCeloSessionManager
  console.log("\n📜 Deploying ComCeloSessionManager...");
  const ComCeloSessionManager = await ethers.getContractFactory("ComCeloSessionManager");
  const sessionManager = await ComCeloSessionManager.deploy(coreAddress);
  await sessionManager.waitForDeployment();
  const sessionManagerAddress = await sessionManager.getAddress();
  console.log("✅ ComCeloSessionManager deployed to:", sessionManagerAddress);

  // Deploy ComCeloPlayerStats
  console.log("\n📜 Deploying ComCeloPlayerStats...");
  const ComCeloPlayerStats = await ethers.getContractFactory("ComCeloPlayerStats");
  const playerStats = await ComCeloPlayerStats.deploy(coreAddress);
  await playerStats.waitForDeployment();
  const playerStatsAddress = await playerStats.getAddress();
  console.log("✅ ComCeloPlayerStats deployed to:", playerStatsAddress);

  // Deploy ComCeloAntiCheat
  console.log("\n📜 Deploying ComCeloAntiCheat...");
  const ComCeloAntiCheat = await ethers.getContractFactory("ComCeloAntiCheat");
  const antiCheat = await ComCeloAntiCheat.deploy(coreAddress);
  await antiCheat.waitForDeployment();
  const antiCheatAddress = await antiCheat.getAddress();
  console.log("✅ ComCeloAntiCheat deployed to:", antiCheatAddress);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 Core Contracts Deployment Summary");
  console.log("=".repeat(60));
  console.log("ComCeloCore:          ", coreAddress);
  console.log("ComCeloMatchmaker:    ", matchmakerAddress);
  console.log("ComCeloTreasury:      ", treasuryAddress);
  console.log("ComCeloUnits:         ", unitsAddress);
  console.log("ComCeloSessionManager:", sessionManagerAddress);
  console.log("ComCeloPlayerStats:   ", playerStatsAddress);
  console.log("ComCeloAntiCheat:     ", antiCheatAddress);
  console.log("=".repeat(60));

  // Save addresses to .env format
  console.log("\n📝 Add these to your .env file:");
  console.log(`NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=${coreAddress}`);
  console.log(`NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=${matchmakerAddress}`);
  console.log(`NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=${treasuryAddress}`);
  console.log(`NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=${unitsAddress}`);
  console.log(`NEXT_PUBLIC_SESSION_MANAGER_CONTRACT_ADDRESS=${sessionManagerAddress}`);
  console.log(`NEXT_PUBLIC_PLAYER_STATS_CONTRACT_ADDRESS=${playerStatsAddress}`);
  console.log(`NEXT_PUBLIC_ANTI_CHEAT_CONTRACT_ADDRESS=${antiCheatAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
