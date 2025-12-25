import { expect } from "chai";
import { ethers } from "hardhat";
import {
  ComCeloSessionManager,
  ComCeloPlayerStats,
  ComCeloGovernance,
  ComCeloAntiCheat,
  ComCeloCrossChainRewards,
} from "../typechain-types";

describe("New Feature Contracts", () => {
  let session: ComCeloSessionManager;
  let stats: ComCeloPlayerStats;
  let gov: ComCeloGovernance;
  let antiCheat: ComCeloAntiCheat;
  let xRewards: ComCeloCrossChainRewards;
  let owner: any;
  let p1: any;
  let p2: any;
  let voter: any;

  beforeEach(async () => {
    [owner, p1, p2, voter] = await ethers.getSigners();

    session = await (await ethers.getContractFactory("ComCeloSessionManager")).deploy();
    await session.waitForDeployment();

    stats = await (await ethers.getContractFactory("ComCeloPlayerStats")).deploy();
    await stats.waitForDeployment();

    gov = await (await ethers.getContractFactory("ComCeloGovernance")).deploy();
    await gov.waitForDeployment();

    antiCheat = await (await ethers.getContractFactory("ComCeloAntiCheat")).deploy();
    await antiCheat.waitForDeployment();

    xRewards = await (await ethers.getContractFactory("ComCeloCrossChainRewards")).deploy(
      ethers.ZeroAddress,
      owner.address
    );
    await xRewards.waitForDeployment();
  });

  it("creates and completes a session", async () => {
    const sessionIdTx = await session.createSession(1, p1.address, p2.address, true, 0);
    const receipt = await sessionIdTx.wait();
    const sessionId = receipt?.logs[0]?.args?.sessionId ?? 1;

    await session.setReporter(owner.address, true);
    await session.startSession(sessionId);
    await session.completeSession(sessionId, p1.address, "ipfs://result");

    const stored = await session.getSession(sessionId);
    expect(stored.winner).to.equal(p1.address);
    expect(stored.status).to.equal(2); // Completed
  });

  it("records player stats", async () => {
    await stats.recordMatch(p1.address, true, false, 10);
    const s = await stats.getStats(p1.address);
    expect(s.wins).to.equal(1);
    expect(s.mmr).to.equal(10);
  });

  it("runs a governance proposal", async () => {
    await gov.setVoter(voter.address, true);
    await gov.setVotingPeriod(60);
    const tx = await gov.connect(voter).propose("test", owner.address, 0, "0x");
    const receipt = await tx.wait();
    const proposalId = receipt?.logs[0]?.args?.id ?? 1;

    await gov.connect(voter).vote(proposalId, true);
    await ethers.provider.send("evm_increaseTime", [120]);
    await ethers.provider.send("evm_mine", []);
    await gov.execute(proposalId);
    const executed = await gov.getProposal(proposalId);
    expect(executed.executed).to.equal(true);
  });

  it("submits and resolves an anti-cheat report", async () => {
    const tx = await antiCheat.connect(p1).submitReport(1, p2.address, "ipfs://evidence");
    await tx.wait();
    await antiCheat.setReviewer(owner.address, true);
    await antiCheat.resolveReport(1, true, "confirmed");
    const report = await antiCheat.getReport(1);
    expect(report.status).to.equal(1); // Valid
  });

  it("processes cross-chain reward receipt", async () => {
    await xRewards.setRelayer(owner.address);
    const receipt = {
      sourceChainId: 1,
      sourceClaimId: 5,
      claimer: p1.address,
      amount: 100,
      proofURI: "proof",
      processedAt: 0,
    };
    await xRewards.processClaim(receipt);
    const key = ethers.keccak256(
      ethers.AbiCoder.defaultAbiCoder().encode(["uint256", "uint256", "address"], [1, 5, p1.address])
    );
    const processed = await xRewards.processedReceipts(key);
    expect(processed).to.equal(true);
  });
});
