import { ethers } from "hardhat";

/**
 * Script to create initial cosmetic items for ComCelo
 * Run: npx hardhat run scripts/create-initial-items.ts --network base
 */

// Rarity enum from contract
enum Rarity {
  Common = 0,
  Uncommon = 1,
  Rare = 2,
  Epic = 3,
  Legendary = 4
}

// ItemType enum from contract
enum ItemType {
  Cosmetic = 0,
  Consumable = 1,
  PowerUp = 2
}

interface ItemData {
  name: string;
  description: string;
  itemType: ItemType;
  rarity: Rarity;
  price: string; // in ETH
  maxSupply: number;
  seasonId: number;
  attackBonus: number;
  defenseBonus: number;
  effectId: number;
}

const INITIAL_ITEMS: ItemData[] = [
  // Common Cosmetics
  {
    name: "Basic Helmet",
    description: "A simple helmet for beginners",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Common,
    price: "0.001",
    maxSupply: 1000,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 0,
    effectId: 0,
  },
  {
    name: "Wooden Shield",
    description: "A basic wooden shield for protection",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Common,
    price: "0.001",
    maxSupply: 1000,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 0,
    effectId: 0,
  },
  {
    name: "Starter Sword",
    description: "Your first weapon in ComCelo",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Common,
    price: "0.001",
    maxSupply: 1000,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 0,
    effectId: 0,
  },

  // Uncommon Cosmetics
  {
    name: "Iron Armor",
    description: "Durable armor forged from iron",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Uncommon,
    price: "0.005",
    maxSupply: 500,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 5,
    effectId: 0,
  },
  {
    name: "Battle Cape",
    description: "A cape worn by experienced warriors",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Uncommon,
    price: "0.005",
    maxSupply: 500,
    seasonId: 1,
    attackBonus: 3,
    defenseBonus: 0,
    effectId: 0,
  },

  // Rare Cosmetics
  {
    name: "Dragon Scale Armor",
    description: "Armor crafted from dragon scales",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Rare,
    price: "0.01",
    maxSupply: 250,
    seasonId: 1,
    attackBonus: 5,
    defenseBonus: 10,
    effectId: 0,
  },
  {
    name: "Enchanted Blade",
    description: "A sword imbued with magical energy",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Rare,
    price: "0.01",
    maxSupply: 250,
    seasonId: 1,
    attackBonus: 15,
    defenseBonus: 0,
    effectId: 1,
  },

  // Epic Cosmetics
  {
    name: "Phoenix Wings",
    description: "Majestic wings that grant swift movement",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Epic,
    price: "0.02",
    maxSupply: 100,
    seasonId: 1,
    attackBonus: 10,
    defenseBonus: 10,
    effectId: 2,
  },
  {
    name: "Crown of Champions",
    description: "Worn only by the greatest warriors",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Epic,
    price: "0.02",
    maxSupply: 100,
    seasonId: 1,
    attackBonus: 20,
    defenseBonus: 15,
    effectId: 0,
  },

  // Legendary Cosmetics
  {
    name: "Celestial Armor Set",
    description: "Legendary armor blessed by the gods",
    itemType: ItemType.Cosmetic,
    rarity: Rarity.Legendary,
    price: "0.05",
    maxSupply: 50,
    seasonId: 1,
    attackBonus: 25,
    defenseBonus: 30,
    effectId: 3,
  },

  // Consumables
  {
    name: "Health Potion",
    description: "Restores health in battle",
    itemType: ItemType.Consumable,
    rarity: Rarity.Common,
    price: "0.0005",
    maxSupply: 10000,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 0,
    effectId: 10,
  },
  {
    name: "Mana Elixir",
    description: "Restores mana for special abilities",
    itemType: ItemType.Consumable,
    rarity: Rarity.Uncommon,
    price: "0.001",
    maxSupply: 5000,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 0,
    effectId: 11,
  },

  // Power-ups
  {
    name: "Attack Boost",
    description: "Temporarily increases attack power",
    itemType: ItemType.PowerUp,
    rarity: Rarity.Rare,
    price: "0.003",
    maxSupply: 2000,
    seasonId: 1,
    attackBonus: 50,
    defenseBonus: 0,
    effectId: 20,
  },
  {
    name: "Defense Shield",
    description: "Temporarily boosts defense",
    itemType: ItemType.PowerUp,
    rarity: Rarity.Rare,
    price: "0.003",
    maxSupply: 2000,
    seasonId: 1,
    attackBonus: 0,
    defenseBonus: 50,
    effectId: 21,
  },
  {
    name: "Ultimate Power Crystal",
    description: "Grants immense power for a short time",
    itemType: ItemType.PowerUp,
    rarity: Rarity.Legendary,
    price: "0.01",
    maxSupply: 500,
    seasonId: 1,
    attackBonus: 100,
    defenseBonus: 100,
    effectId: 22,
  },
];

async function main() {
  console.log("Creating initial items for ComCelo...\n");

  // Get the Items contract address from environment or use mainnet address
  const ITEMS_ADDRESS = process.env.NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS || "0xBf1D587fc5f00aBA65671ab575eD5225D3342e13";

  console.log(`Items Contract: ${ITEMS_ADDRESS}\n`);

  // Get contract instance
  const Items = await ethers.getContractFactory("ComCeloItems");
  const items = Items.attach(ITEMS_ADDRESS);

  // Get signer
  const [signer] = await ethers.getSigners();
  console.log(`Deployer: ${signer.address}`);
  console.log(`Balance: ${ethers.formatEther(await ethers.provider.getBalance(signer.address))} ETH\n`);

  // Create each item
  for (let i = 0; i < INITIAL_ITEMS.length; i++) {
    const item = INITIAL_ITEMS[i];
    
    console.log(`[${i + 1}/${INITIAL_ITEMS.length}] Creating: ${item.name}`);
    console.log(`  Type: ${ItemType[item.itemType]}`);
    console.log(`  Rarity: ${Rarity[item.rarity]}`);
    console.log(`  Price: ${item.price} ETH`);
    console.log(`  Supply: ${item.maxSupply}`);

    try {
      const tx = await items.createItem(
        item.name,
        item.description,
        item.itemType,
        item.rarity,
        ethers.parseEther(item.price),
        item.maxSupply,
        item.seasonId,
        item.attackBonus,
        item.defenseBonus,
        item.effectId
      );

      const receipt = await tx.wait();
      console.log(`  ✅ Created! Tx: ${receipt?.hash}\n`);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error: any) {
      console.error(`  ❌ Error: ${error.message}\n`);
    }
  }

  console.log("\n✨ All items created successfully!");
  console.log(`\nView on Basescan: https://basescan.org/address/${ITEMS_ADDRESS}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
