import { expect } from "chai";
import { ethers } from "hardhat";
import { ComCeloItems } from "../typechain-types";

describe("ComCeloItems", () => {
  let items: ComCeloItems;
  let owner: any, buyer: any;

  beforeEach(async () => {
    [owner, buyer] = await ethers.getSigners();

    const ItemsFactory = await ethers.getContractFactory("ComCeloItems");
    items = await ItemsFactory.deploy();
    await items.waitForDeployment();
  });

  describe("Item Creation", () => {
    it("should create an item", async () => {
      const tx = await items.createItem("Sword Skin", "Gold sword cosmetic", 0, ethers.parseEther("0.1"), 1000);
      await expect(tx).to.emit(items, "ItemCreated");
    });

    it("should only allow owner to create items", async () => {
      await expect(
        items.connect(buyer).createItem("Sword Skin", "Gold sword cosmetic", 0, ethers.parseEther("0.1"), 1000)
      ).to.be.reverted;
    });

    it("should return correct item data", async () => {
      await items.createItem("Sword Skin", "Gold sword cosmetic", 0, ethers.parseEther("0.1"), 1000);
      const item = await items.getItem(0);

      expect(item.name).to.equal("Sword Skin");
      expect(item.description).to.equal("Gold sword cosmetic");
      expect(item.price).to.equal(ethers.parseEther("0.1"));
      expect(item.maxSupply).to.equal(1000);
      expect(item.currentSupply).to.equal(0);
    });
  });

  describe("Item Purchasing", () => {
    beforeEach(async () => {
      await items.createItem("Sword Skin", "Gold sword cosmetic", 0, ethers.parseEther("0.1"), 1000);
    });

    it("should allow purchase of item", async () => {
      const tx = await items.connect(buyer).purchaseItem(0, 1, {
        value: ethers.parseEther("0.1"),
      });

      await expect(tx).to.emit(items, "ItemPurchased").withArgs(buyer.address, 0, 1, ethers.parseEther("0.1"));
    });

    it("should reject purchase with insufficient funds", async () => {
      await expect(
        items.connect(buyer).purchaseItem(0, 1, {
          value: ethers.parseEther("0.05"),
        })
      ).to.be.revertedWith("Insufficient payment");
    });

    it("should reject purchase exceeding max supply", async () => {
      await expect(
        items.connect(buyer).purchaseItem(0, 1001, {
          value: ethers.parseEther("100.1"),
        })
      ).to.be.revertedWith("Insufficient supply");
    });

    it("should mint token to buyer", async () => {
      await items.connect(buyer).purchaseItem(0, 5, {
        value: ethers.parseEther("0.5"),
      });

      const balance = await items.balanceOf(buyer.address, 0);
      expect(balance).to.equal(5);
    });

    it("should refund excess payment", async () => {
      const balanceBefore = await ethers.provider.getBalance(buyer.address);

      const tx = await items.connect(buyer).purchaseItem(0, 1, {
        value: ethers.parseEther("1"),
      });

      const receipt = await tx.wait();
      const gasCost = (receipt?.gasUsed || BigInt(0)) * (receipt?.gasPrice || BigInt(0));
      const balanceAfter = await ethers.provider.getBalance(buyer.address);

      // Balance should be reduced by price + gas, not full 1 ETH
      const spent = balanceBefore - balanceAfter;
      expect(spent).to.be.lessThan(ethers.parseEther("0.2")); // Price + gas
    });

    it("should track supply correctly", async () => {
      await items.connect(buyer).purchaseItem(0, 10, {
        value: ethers.parseEther("1"),
      });

      const item = await items.getItem(0);
      expect(item.currentSupply).to.equal(10);
    });
  });

  describe("Access Control", () => {
    it("should allow owner to create items", async () => {
      const tx = await items.createItem("Item", "Description", 1, ethers.parseEther("0.1"), 100);
      await expect(tx).not.to.be.reverted;
    });

    it("should prevent non-owner from creating items", async () => {
      await expect(items.connect(buyer).createItem("Item", "Description", 1, ethers.parseEther("0.1"), 100)).to.be
        .reverted;
    });
  });
});
