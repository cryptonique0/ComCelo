import { ethers } from "hardhat";

/**
 * Script to approve a relayer address in the MetaTxRelay contract
 * Run: npx hardhat run scripts/approve-relayer.ts --network base
 */

async function main() {
  console.log("Approving relayer address...\n");

  // Get the MetaTxRelay contract address
  const META_TX_RELAY_ADDRESS = process.env.NEXT_PUBLIC_META_TX_RELAY_CONTRACT_ADDRESS || "0x6E69f9c92070c3381D7Aebbb07842b682d500011";

  // Get relayer address from environment or prompt
  const RELAYER_ADDRESS = process.env.RELAYER_ADDRESS || process.env.RELAYER_WALLET_ADDRESS;

  if (!RELAYER_ADDRESS) {
    console.error("❌ Error: RELAYER_ADDRESS not set in environment");
    console.log("\nPlease set RELAYER_ADDRESS in .env or provide it as argument:");
    console.log("  RELAYER_ADDRESS=0x... npx hardhat run scripts/approve-relayer.ts --network base");
    process.exit(1);
  }

  console.log(`MetaTxRelay Contract: ${META_TX_RELAY_ADDRESS}`);
  console.log(`Relayer Address: ${RELAYER_ADDRESS}\n`);

  // Get contract instance
  const MetaTxRelay = await ethers.getContractFactory("ComCeloMetaTxRelay");
  const metaTxRelay = MetaTxRelay.attach(META_TX_RELAY_ADDRESS);

  // Get signer (must be contract owner)
  const [signer] = await ethers.getSigners();
  console.log(`Signer: ${signer.address}`);
  console.log(`Balance: ${ethers.formatEther(await ethers.provider.getBalance(signer.address))} ETH\n`);

  // Check if already approved
  const isApproved = await metaTxRelay.approvedRelayers(RELAYER_ADDRESS);
  
  if (isApproved) {
    console.log("✅ Relayer is already approved!");
    return;
  }

  console.log("Approving relayer...");

  try {
    const tx = await metaTxRelay.approveRelayer(RELAYER_ADDRESS, true);
    console.log(`Transaction submitted: ${tx.hash}`);
    
    const receipt = await tx.wait();
    console.log(`✅ Transaction confirmed in block ${receipt?.blockNumber}`);
    
    // Verify approval
    const verified = await metaTxRelay.approvedRelayers(RELAYER_ADDRESS);
    
    if (verified) {
      console.log("\n✨ Relayer approved successfully!");
      console.log(`\nView on Basescan: https://basescan.org/tx/${tx.hash}`);
    } else {
      console.error("\n❌ Approval verification failed");
    }
  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}`);
    
    if (error.message.includes("Ownable: caller is not the owner")) {
      console.log("\n⚠️  You must be the contract owner to approve relayers");
      console.log(`   Current signer: ${signer.address}`);
    }
    
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
