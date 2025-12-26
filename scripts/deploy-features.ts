import { ethers } from "hardhat";

/**
 * Deploy Feature Contracts
 * - ComCeloSeasons
 * - ComCeloTournaments
 * - ComCeloAchievements
 * - ComCeloRanking
 * - ComCeloQuests
 * - ComCeloRewards
 * 
 * Note: Items and MetaTxRelay are already deployed
 */
async function main() {
  console.log("🚀 Deploying Feature Contracts...\n");

  const [deployer] = await ethers.getSigners();
  console.log("Deployer address:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // Get core contract address (should be set from previous deployment)
  const coreAddress = process.env.NEXT_PUBLIC_GAME_CONTRACT_ADDRESS || ethers.ZeroAddress;
  if (coreAddress === ethers.ZeroAddress) {
    console.warn("⚠️  Warning: NEXT_PUBLIC_GAME_CONTRACT_ADDRESS not set. Using zero address.");
  }

  // Deploy ComCeloSeasons
  console.log("📜 Deploying ComCeloSeasons...");
  const ComCeloSeasons = await ethers.getContractFactory("ComCeloSeasons");
  const seasons = await ComCeloSeasons.deploy();
  await seasons.waitForDeployment();
  const seasonsAddress = await seasons.getAddress();
  console.log("✅ ComCeloSeasons deployed to:", seasonsAddress);

  // Deploy ComCeloTournaments
  console.log("\n📜 Deploying ComCeloTournaments...");
  const ComCeloTournaments = await ethers.getContractFactory("ComCeloTournaments");
  const tournaments = await ComCeloTournaments.deploy(coreAddress);
  await tournaments.waitForDeployment();
  const tournamentsAddress = await tournaments.getAddress();
  console.log("✅ ComCeloTournaments deployed to:", tournamentsAddress);

  // Deploy ComCeloAchievements
  console.log("\n📜 Deploying ComCeloAchievements...");
  const ComCeloAchievements = await ethers.getContractFactory("ComCeloAchievements");
  const achievements = await ComCeloAchievements.deploy();
  await achievements.waitForDeployment();
  const achievementsAddress = await achievements.getAddress();
  console.log("✅ ComCeloAchievements deployed to:", achievementsAddress);

  // Deploy ComCeloRanking
  console.log("\n📜 Deploying ComCeloRanking...");
  const ComCeloRanking = await ethers.getContractFactory("ComCeloRanking");
  const ranking = await ComCeloRanking.deploy();
  await ranking.waitForDeployment();
  const rankingAddress = await ranking.getAddress();
  console.log("✅ ComCeloRanking deployed to:", rankingAddress);

  // Deploy ComCeloQuests
  console.log("\n📜 Deploying ComCeloQuests...");
  const ComCeloQuests = await ethers.getContractFactory("ComCeloQuests");
  const quests = await ComCeloQuests.deploy();
  await quests.waitForDeployment();
  const questsAddress = await quests.getAddress();
  console.log("✅ ComCeloQuests deployed to:", questsAddress);

  // Deploy ComCeloRewards
  console.log("\n📜 Deploying ComCeloRewards...");
  const ComCeloRewards = await ethers.getContractFactory("ComCeloRewards");
  const rewards = await ComCeloRewards.deploy();
  await rewards.waitForDeployment();
  const rewardsAddress = await rewards.getAddress();
  console.log("✅ ComCeloRewards deployed to:", rewardsAddress);

  // Summary
  console.log("\n" + "=".repeat(60));
  console.log("🎉 Feature Contracts Deployment Summary");
  console.log("=".repeat(60));
  console.log("ComCeloSeasons:      ", seasonsAddress);
  console.log("ComCeloTournaments:  ", tournamentsAddress);
  console.log("ComCeloAchievements: ", achievementsAddress);
  console.log("ComCeloRanking:      ", rankingAddress);
  console.log("ComCeloQuests:       ", questsAddress);
  console.log("ComCeloRewards:      ", rewardsAddress);
  console.log("=".repeat(60));

  // Already deployed (from user info)
  console.log("\n✅ Already Deployed:");
  console.log("ComCeloItems:        0xBf1D587fc5f00aBA65671ab575eD5225D3342e13");
  console.log("ComCeloMetaTxRelay:  0x6E69f9c92070c3381D7Aebbb07842b682d500011");

  // Save addresses to .env format
  console.log("\n📝 Add these to your .env file:");
  console.log(`NEXT_PUBLIC_SEASONS_CONTRACT_ADDRESS=${seasonsAddress}`);
  console.log(`NEXT_PUBLIC_TOURNAMENTS_CONTRACT_ADDRESS=${tournamentsAddress}`);
  console.log(`NEXT_PUBLIC_ACHIEVEMENTS_CONTRACT_ADDRESS=${achievementsAddress}`);
  console.log(`NEXT_PUBLIC_RANKING_CONTRACT_ADDRESS=${rankingAddress}`);
  console.log(`NEXT_PUBLIC_QUESTS_CONTRACT_ADDRESS=${questsAddress}`);
  console.log(`NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS=${rewardsAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
