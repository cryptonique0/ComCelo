import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloOptimisticOracle, ComCeloBaseSpokePool } from "../typechain-types";

describe("Base Chain Contracts", () => {
  let oracle: ComCeloOptimisticOracle;
  let spokePool: ComCeloBaseSpokePool;
  let owner: any;
  let player1: any;
  let player2: any;
  let relayer: any;

  beforeEach(async () => {
    [owner, player1, player2, relayer] = await ethers.getSigners();

    // Deploy OptimisticOracle
    const OracleFactory = await ethers.getContractFactory("ComCeloOptimisticOracle");
    oracle = await OracleFactory.deploy();
    await oracle.waitForDeployment();

    // Deploy BaseSpokePool
    const SpokePoolFactory = await ethers.getContractFactory("ComCeloBaseSpokePool");
    spokePool = await SpokePoolFactory.deploy(owner.address);
    await spokePool.waitForDeployment();
  });

  describe("ComCeloOptimisticOracle", () => {
    describe("Assertion Creation", () => {
      it("should create an assertion with sufficient bond", async () => {
        const tx = await oracle.connect(player1).createAssertion(
          0, // GAME_RESULT
          "QmXxxx...", // IPFS hash
          "Player 1 won game 123",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );

        expect(tx).to.emit(oracle, "AssertionCreated");
      });

      it("should reject assertion with insufficient bond", async () => {
        await expect(
          oracle.connect(player1).createAssertion(
            0,
            "QmXxxx...",
            "Player 1 won",
            ethers.parseEther("0.1"),
            { value: ethers.parseEther("0.05") } // Too low
          )
        ).to.be.revertedWith("Bond below minimum");
      });

      it("should track player's total bond", async () => {
        await oracle.connect(player1).createAssertion(
          0,
          "QmXxxx...",
          "Player 1 won",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );

        const bond = await oracle.getPlayerBond(player1.address);
        expect(bond).to.equal(ethers.parseEther("0.1"));
      });
    });

    describe("Challenges", () => {
      beforeEach(async () => {
        await oracle.connect(player1).createAssertion(
          0,
          "QmXxxx...",
          "Player 1 won",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );
      });

      it("should allow challenging an assertion", async () => {
        const tx = await oracle.connect(player2).challengeAssertion(
          0,
          "QmEvidence...",
          { value: ethers.parseEther("0.1") }
        );

        expect(tx).to.emit(oracle, "ChallengeSubmitted");
      });

      it("should prevent self-challenges", async () => {
        await expect(
          oracle.connect(player1).challengeAssertion(
            0,
            "QmEvidence...",
            { value: ethers.parseEther("0.1") }
          )
        ).to.be.revertedWith("Cannot challenge own assertion");
      });

      it("should prevent challenges after period expires", async () => {
        // Set short period for testing
        await oracle.setChallengePeriod(1); // 1 second

        // Wait for period to expire
        await new Promise((resolve) => setTimeout(resolve, 2000));

        await expect(
          oracle.connect(player2).challengeAssertion(
            0,
            "QmEvidence...",
            { value: ethers.parseEther("0.1") }
          )
        ).to.be.revertedWith("Challenge period expired");
      });
    });

    describe("Resolution", () => {
      beforeEach(async () => {
        await oracle.connect(player1).createAssertion(
          0,
          "QmXxxx...",
          "Player 1 won",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );
      });

      it("should resolve assertion as true", async () => {
        const tx = await oracle.resolveAssertion(0, true, ethers.ZeroAddress);
        expect(tx).to.emit(oracle, "AssertionResolved");

        const assertion = await oracle.getAssertion(0);
        expect(assertion.result).to.be.true;
      });

      it("should resolve assertion as false and slash bond", async () => {
        const bondBefore = await oracle.getPlayerBond(player1.address);
        expect(bondBefore).to.equal(ethers.parseEther("0.1"));

        await oracle.resolveAssertion(0, false, player1.address);

        const bondAfter = await oracle.getPlayerBond(player1.address);
        expect(bondAfter).to.equal(0);
      });

      it("should prevent resolving already resolved assertion", async () => {
        await oracle.resolveAssertion(0, true, ethers.ZeroAddress);

        await expect(
          oracle.resolveAssertion(0, false, player1.address)
        ).to.be.revertedWith("Already resolved");
      });
    });

    describe("Queries", () => {
      it("should get assertion details", async () => {
        await oracle.connect(player1).createAssertion(
          0,
          "QmXxxx...",
          "Player 1 won",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );

        const assertion = await oracle.getAssertion(0);
        expect(assertion.asserter).to.equal(player1.address);
        expect(assertion.claimData).to.equal("Player 1 won");
      });

      it("should check if assertion can be challenged", async () => {
        await oracle.connect(player1).createAssertion(
          0,
          "QmXxxx...",
          "Player 1 won",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );

        const canChallenge = await oracle.canChallenge(0);
        expect(canChallenge).to.be.true;
      });

      it("should get time until resolution", async () => {
        await oracle.connect(player1).createAssertion(
          0,
          "QmXxxx...",
          "Player 1 won",
          ethers.parseEther("0.1"),
          { value: ethers.parseEther("0.1") }
        );

        const timeLeft = await oracle.getTimeUntilResolution(0);
        expect(timeLeft).to.be.greaterThan(0);
        expect(timeLeft).to.be.lessThanOrEqual(24 * 60 * 60); // Less than 24 hours
      });
    });
  });

  describe("ComCeloBaseSpokePool", () => {
    describe("Cross-Chain Transfers", () => {
      it("should initiate a transfer", async () => {
        const tx = await spokePool.connect(player1).initiateTransfer(
          player2.address,
          8453, // BASE_MAINNET
          42220, // CELO_MAINNET
          ethers.parseEther("1"),
          { value: ethers.parseEther("1") }
        );

        expect(tx).to.emit(spokePool, "TransferInitiated");
      });

      it("should calculate transfer fees", async () => {
        // Create transfer with known amount
        const amount = ethers.parseEther("1");
        await spokePool.connect(player1).initiateTransfer(
          player2.address,
          8453,
          42220,
          amount,
          { value: amount }
        );

        const transfer = await spokePool.getTransfer(0);
        // Should be slightly less than sent amount due to fee
        expect(transfer.amount).to.be.lessThan(amount);
      });

      it("should reject invalid recipient", async () => {
        await expect(
          spokePool.connect(player1).initiateTransfer(
            ethers.ZeroAddress,
            8453,
            42220,
            ethers.parseEther("1"),
            { value: ethers.parseEther("1") }
          )
        ).to.be.revertedWith("Invalid recipient");
      });

      it("should reject invalid chain pair", async () => {
        await expect(
          spokePool.connect(player1).initiateTransfer(
            player2.address,
            8453, // BASE_MAINNET
            8453, // Same chain
            ethers.parseEther("1"),
            { value: ethers.parseEther("1") }
          )
        ).to.be.revertedWith("Invalid chain pair");
      });
    });

    describe("Relayer Management", () => {
      it("should register relayer", async () => {
        const tx = await spokePool.registerRelayer(relayer.address);
        expect(tx).to.emit(spokePool, "RelayerRegistered");

        const isRelayer = await spokePool.relayers(relayer.address);
        expect(isRelayer).to.be.true;
      });

      it("should unregister relayer", async () => {
        await spokePool.registerRelayer(relayer.address);
        await spokePool.unregisterRelayer(relayer.address);

        const isRelayer = await spokePool.relayers(relayer.address);
        expect(isRelayer).to.be.false;
      });

      it("should only allow relayers to relay transfers", async () => {
        await spokePool.connect(player1).initiateTransfer(
          player2.address,
          8453,
          42220,
          ethers.parseEther("1"),
          { value: ethers.parseEther("1") }
        );

        // Not registered relayer
        await expect(
          spokePool.relayTransfer(0, ethers.id("hash"))
        ).to.be.revertedWith("Not relayer");
      });
    });

    describe("Settlement", () => {
      beforeEach(async () => {
        await spokePool.connect(player1).initiateTransfer(
          player2.address,
          8453,
          42220,
          ethers.parseEther("1"),
          { value: ethers.parseEther("1") }
        );

        // Register and relay
        await spokePool.registerRelayer(relayer.address);
        await spokePool
          .connect(relayer)
          .relayTransfer(0, ethers.id("source_hash"));
        
        // Set short settlement period for testing
        await spokePool.setSettlementPeriod(1); // 1 second
        
        // Wait for settlement period
        await new Promise((resolve) => setTimeout(resolve, 1500));
      });

      it("should settle transfer", async () => {
        const tx = await spokePool.settleTransfer(0, ethers.id("dest_hash"));
        expect(tx).to.emit(spokePool, "TransferSettled");
      });

      it("should track total transferred amount", async () => {
        const totalBefore = await spokePool.totalTransferred();
        expect(totalBefore).to.be.greaterThan(0);
      });
    });

    describe("Fee Management", () => {
      it("should update relayer fee", async () => {
        await spokePool.updateRelayerFee(100, ethers.parseEther("0.01"), ethers.parseEther("2"));

        const fee = await spokePool.relayerFee();
        expect(fee.feePercentage).to.equal(100); // 1%
      });

      it("should reject fees exceeding limits", async () => {
        await expect(
          spokePool.updateRelayerFee(10001, ethers.parseEther("0.01"), ethers.parseEther("2"))
        ).to.be.revertedWith("Fee too high");
      });
    });

    describe("Emergency Functions", () => {
      it("should allow owner to pause pool", async () => {
        await spokePool.pause();
        const paused = await spokePool.paused();
        expect(paused).to.be.true;
      });

      it("should allow owner to withdraw stuck funds", async () => {
        // Send some funds
        await owner.sendTransaction({
          to: await spokePool.getAddress(),
          value: ethers.parseEther("1"),
        });

        const balanceBefore = await ethers.provider.getBalance(owner.address);
        const tx = await spokePool.emergencyWithdraw(ethers.parseEther("1"));
        const receipt = await tx.wait();
        const gasCost = receipt?.gasUsed! * receipt?.gasPrice!;

        const balanceAfter = await ethers.provider.getBalance(owner.address);
        expect(balanceAfter).to.be.greaterThan(balanceBefore - gasCost - ethers.parseEther("1"));
      });
    });
  });
});
