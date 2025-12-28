import { expect } from "chai";
import { ethers } from "hardhat";
import {
  ComCeloSessionManager,
  ComCeloPlayerStats,
  ComCeloGovernance,
  ComCeloAntiCheat,
  ComCeloCrossChainRewards,
  MockVotesToken,
} from "../typechain-types";

describe("New Feature Contracts", () => {
  let session: ComCeloSessionManager;
  let stats: ComCeloPlayerStats;
  let gov: ComCeloGovernance;
  let antiCheat: ComCeloAntiCheat;
  let xRewards: ComCeloCrossChainRewards;
  let token: MockVotesToken;
  let owner: any;
  let p1: any;
  let p2: any;
  let voter: any;

  beforeEach(async () => {
    [owner, p1, p2, voter] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockVotesToken");
    token = (await Token.deploy()) as MockVotesToken;
    await token.waitForDeployment();
    await token.mint(voter.address, ethers.parseEther("100"));
    await token.mint(owner.address, ethers.parseEther("50"));
    await token.connect(voter).delegate(voter.address);
    await token.connect(owner).delegate(owner.address);
    await ethers.provider.send("evm_mine", []);

    session = await (await ethers.getContractFactory("ComCeloSessionManager")).deploy();
    await session.waitForDeployment();

    stats = await (await ethers.getContractFactory("ComCeloPlayerStats")).deploy();
    await stats.waitForDeployment();

    gov = await (await ethers.getContractFactory("ComCeloGovernance")).deploy();
    await gov.waitForDeployment();
    await gov.setGovernanceToken(await token.getAddress());
    await gov.setProposalThreshold(ethers.parseEther("1"));
    await gov.setQuorumBps(2000); // 20%
    await gov.setVotingPeriod(60);
    await gov.setExecutionDelay(0, 7 * 24 * 60 * 60);
    await gov.setTargetAllowed(owner.address, true);
    await gov.setVoter(voter.address, true);

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
    const tx = await gov.connect(voter).propose("test", owner.address, 0, "0x");
    const receipt = await tx.wait();
    const proposalId = receipt?.logs[0]?.args?.id ?? 1;

    await gov.connect(voter).vote(proposalId, 1);
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
