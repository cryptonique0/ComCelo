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

  // Deploy ComCeloTreasury
  console.log("\n4. Deploying ComCeloTreasury...");
  const TreasuryFactory = await ethers.getContractFactory("ComCeloTreasury");
  const treasury = await TreasuryFactory.deploy();
  await treasury.waitForDeployment();
  const treasuryAddress = await treasury.getAddress();
  console.log("ComCeloTreasury deployed to:", treasuryAddress);

  // Deploy ComCeloMetaTxRelay
  console.log("\n5. Deploying ComCeloMetaTxRelay...");
  const RelayFactory = await ethers.getContractFactory("ComCeloMetaTxRelay");
  const relay = await RelayFactory.deploy(coreAddress);
  await relay.waitForDeployment();
  const relayAddress = await relay.getAddress();
  console.log("ComCeloMetaTxRelay deployed to:", relayAddress);

  console.log("\n✅ All contracts deployed successfully!");
  console.log("\nDeployment Summary:");
  console.log("====================");
  console.log("ComCeloUnits:       ", unitsAddress);
  console.log("ComCeloCore:        ", coreAddress);
  console.log("ComCeloMatchmaker:  ", matchmakerAddress);
  console.log("ComCeloTreasury:    ", treasuryAddress);
  console.log("ComCeloMetaTxRelay: ", relayAddress);

  // Save deployment info
  const deployment = {
    network: (await ethers.provider.getNetwork()).name,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      units: unitsAddress,
      core: coreAddress,
      matchmaker: matchmakerAddress,
      treasury: treasuryAddress,
      relay: relayAddress,
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
