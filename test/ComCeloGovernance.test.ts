import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloGovernance, MockVotesToken, MockFailingTarget } from "../typechain-types";

const DAY = 24 * 60 * 60;

async function advanceTime(seconds: number) {
  await ethers.provider.send("evm_increaseTime", [seconds]);
  await ethers.provider.send("evm_mine", []);
}

describe("ComCeloGovernance", () => {
  let gov: ComCeloGovernance;
  let token: MockVotesToken;
  let failing: MockFailingTarget;
  let owner: any;
  let alice: any;
  let bob: any;
  let relayer: any;

  beforeEach(async () => {
    [owner, alice, bob, relayer] = await ethers.getSigners();

    const Token = await ethers.getContractFactory("MockVotesToken");
    token = (await Token.deploy()) as MockVotesToken;
    await token.waitForDeployment();
    await token.mint(alice.address, ethers.parseEther("100"));
    await token.mint(bob.address, ethers.parseEther("80"));
    await token.mint(owner.address, ethers.parseEther("20"));
    await token.connect(alice).delegate(alice.address);
    await token.connect(bob).delegate(bob.address);
    await token.connect(owner).delegate(owner.address);
    await ethers.provider.send("evm_mine", []);

    failing = (await (await ethers.getContractFactory("MockFailingTarget")).deploy()) as MockFailingTarget;
    await failing.waitForDeployment();

    gov = (await (await ethers.getContractFactory("ComCeloGovernance")).deploy()) as ComCeloGovernance;
    await gov.waitForDeployment();
    await gov.setGovernanceToken(await token.getAddress());
    await gov.setProposalThreshold(ethers.parseEther("5"));
    await gov.setQuorumBps(2000); // 20%
    await gov.setVotingPeriod(60);
    await gov.setExecutionDelay(60, 7 * DAY);
    await gov.setDeadlineExtension(600, 2000); // extend if within 20% of quorum
    await gov.setTargetAllowed(owner.address, true);
    await gov.setTargetAllowed(await failing.getAddress(), true);
    await gov.setVoter(alice.address, true);
    await gov.setVoter(bob.address, true);
  });

  async function createProposal(target: string, data: string = "0x", value = 0n) {
    const tx = await gov.connect(alice).propose("upgrade", target, value, data);
    const receipt = await tx.wait();
    const id = receipt?.logs[0]?.args?.id ?? 1;
    return Number(id);
  }

  it("counts token-weighted votes and enforces quorum and threshold", async () => {
    const proposalId = await createProposal(owner.address);

    await gov.connect(alice).vote(proposalId, 1); // for with 100
    await gov.connect(bob).vote(proposalId, 0); // against with 80

    const tally = await gov.getTally(proposalId);
    expect(tally.forVotes).to.equal(ethers.parseEther("100"));
    expect(tally.againstVotes).to.equal(ethers.parseEther("80"));
    expect(tally.quorumVotes).to.be.gt(0);

    await advanceTime(70); // voting period over
    await expect(gov.execute(proposalId)).to.be.revertedWith("Timelock not elapsed");
    await advanceTime(60); // timelock
    await gov.execute(proposalId);
    const executed = await gov.getProposal(proposalId);
    expect(executed.executed).to.equal(true);
  });

  it("supports gasless EIP-712 vote signatures", async () => {
    const proposalId = await createProposal(owner.address);
    const nonce = await gov.nonces(bob.address);
    const latestBlock = await ethers.provider.getBlock("latest");
    const deadline = (latestBlock?.timestamp ?? 0) + 600;
    const domain = {
      name: "ComCeloGovernance",
      version: "1",
      chainId: (await ethers.provider.getNetwork()).chainId,
      verifyingContract: await gov.getAddress(),
    };
    const types = {
      Ballot: [
        { name: "proposalId", type: "uint256" },
        { name: "support", type: "uint8" },
        { name: "nonce", type: "uint256" },
        { name: "deadline", type: "uint256" },
      ],
    };
    const value = { proposalId, support: 1, nonce, deadline };
    const signature = await bob.signTypedData(domain, types, value);
    const sig = ethers.Signature.from(signature);

    await gov.voteBySig(proposalId, 1, nonce, deadline, sig.v, sig.r, sig.s);
    const hasVoted = await gov.hasVoted(proposalId, bob.address);
    expect(hasVoted).to.equal(true);
  });

  it("extends deadlines when quorum is nearly met", async () => {
    await gov.setQuorumBps(6000); // raise quorum to keep gap
    const proposalId = await createProposal(owner.address);

    await gov.connect(alice).vote(proposalId, 1); // 100 votes
    // no quorum yet because quorum now 60% of 200 = 120
    const before = (await gov.getProposal(proposalId)).deadline;
    await gov.extendDeadline(proposalId);
    const after = (await gov.getProposal(proposalId)).deadline;
    expect(after).to.be.greaterThan(before);
  });

  it("allows proposer to cancel before execution", async () => {
    const proposalId = await createProposal(owner.address);
    await gov.connect(alice).vote(proposalId, 1);
    await advanceTime(200);
    await gov.cancel(proposalId);
    await expect(gov.execute(proposalId)).to.be.revertedWith("Proposal cancelled");
  });

  it("emits execution failure without locking the proposal", async () => {
    const data = failing.interface.encodeFunctionData("willRevert");
    const proposalId = await createProposal(await failing.getAddress(), data);

    await gov.connect(alice).vote(proposalId, 1);
    await gov.connect(bob).vote(proposalId, 1);
    await advanceTime(200);
    const exec = await gov.execute(proposalId);
    const receipt = await exec.wait();
    const failed = receipt?.logs.find((log: any) => log.fragment?.name === "ProposalExecutionFailed");
    expect(failed).to.not.equal(undefined);
    const proposal = await gov.getProposal(proposalId);
    expect(proposal.executed).to.equal(false);
  });
});
