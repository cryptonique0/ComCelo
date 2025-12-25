#!/usr/bin/env ts-node
import { ethers } from "hardhat";

/**
 * Lightweight CLI for contract management.
 * Usage examples:
 *   npx ts-node scripts/cli.ts set-reporter <sessionManager> <reporter> <allowed>
 *   npx ts-node scripts/cli.ts set-voter <governance> <voter> <allowed>
 *   npx ts-node scripts/cli.ts pause <address>
 *   npx ts-node scripts/cli.ts unpause <address>
 */

async function main() {
  const [signer] = await ethers.getSigners();
  const [command, ...args] = process.argv.slice(2);

  if (!command) {
    console.log("No command provided");
    process.exit(1);
  }

  console.log(`Using signer: ${signer.address}`);

  switch (command) {
    case "set-reporter": {
      const [sessionManagerAddr, reporter, allowedStr] = args;
      const allowed = allowedStr === "true";
      const sessionManager = await ethers.getContractAt("ComCeloSessionManager", sessionManagerAddr);
      const tx = await sessionManager.setReporter(reporter, allowed);
      await tx.wait();
      console.log(`Reporter ${reporter} set to ${allowed}`);
      break;
    }
    case "set-voter": {
      const [govAddr, voter, allowedStr] = args;
      const allowed = allowedStr === "true";
      const gov = await ethers.getContractAt("ComCeloGovernance", govAddr);
      const tx = await gov.setVoter(voter, allowed);
      await tx.wait();
      console.log(`Voter ${voter} set to ${allowed}`);
      break;
    }
    case "pause": {
      const [addr] = args;
      const pausable = await ethers.getContractAt("Pausable", addr);
      const tx = await pausable.pause();
      await tx.wait();
      console.log(`Paused ${addr}`);
      break;
    }
    case "unpause": {
      const [addr] = args;
      const pausable = await ethers.getContractAt("Pausable", addr);
      const tx = await pausable.unpause();
      await tx.wait();
      console.log(`Unpaused ${addr}`);
      break;
    }
    default:
      console.log(`Unknown command: ${command}`);
      process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
