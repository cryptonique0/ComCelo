# Base Mainnet Integration Guide

This guide covers the complete integration of ComCelo with the deployed Base Mainnet contracts.

## Table of Contents

1. [Contract Addresses](#contract-addresses)
2. [Frontend Integration](#frontend-integration)
3. [Creating Initial Items](#creating-initial-items)
4. [Setting Up the Relayer](#setting-up-the-relayer)
5. [Testing the Integration](#testing-the-integration)

## Contract Addresses

All contracts are deployed on **Base Mainnet (Chain ID: 8453)**.

### Core Contracts

| Contract | Address | Basescan |
|----------|---------|----------|
| ComCeloItems | `0xBf1D587fc5f00aBA65671ab575eD5225D3342e13` | [View](https://basescan.org/address/0xBf1D587fc5f00aBA65671ab575eD5225D3342e13) |
| ComCeloMetaTxRelay | `0x6E69f9c92070c3381D7Aebbb07842b682d500011` | [View](https://basescan.org/address/0x6E69f9c92070c3381D7Aebbb07842b682d500011) |
| ComCeloCrossChainRewards | `0x4C73a992c2f52a74E67A2424b800Cf97359ab694` | [View](https://basescan.org/address/0x4C73a992c2f52a74E67A2424b800Cf97359ab694) |
| ComCeloGovernance | `0x6736103c7a528E658895c541F89E47F250c98a4f` | [View](https://basescan.org/address/0x6736103c7a528E658895c541F89E47F250c98a4f) |

### Owner Address

**Deployer/Owner:** `0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf`

## Frontend Integration

### Step 1: Configure Environment

Update your `.env` file with the Base Mainnet addresses:

```bash
# Copy from example
cp .env.example .env

# Update these values in .env:
NEXT_PUBLIC_NETWORK_ID=base
NEXT_PUBLIC_ITEMS_CONTRACT_ADDRESS=0xBf1D587fc5f00aBA65671ab575eD5225D3342e13
NEXT_PUBLIC_META_TX_RELAY_CONTRACT_ADDRESS=0x6E69f9c92070c3381D7Aebbb07842b682d500011
NEXT_PUBLIC_CROSS_CHAIN_REWARDS_CONTRACT_ADDRESS=0x4C73a992c2f52a74E67A2424b800Cf97359ab694
NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS=0x6736103c7a528E658895c541F89E47F250c98a4f
```

### Step 2: Use Contract Hooks

The following React hooks are available for contract interactions:

#### Items Hook (`lib/hooks/useItems.ts`)

```typescript
import { useItems } from '@/lib/hooks/useItems';

function ItemsComponent() {
  const { 
    getItem, 
    getBalance, 
    purchaseItem, 
    listItem, 
    buyFromMarketplace,
    loading,
    error 
  } = useItems();

  // Get item details
  const item = await getItem(1);

  // Purchase item
  await purchaseItem(1, 1); // itemId: 1, amount: 1

  // List on marketplace
  await listItem(1, ethers.parseEther('0.01')); // itemId: 1, price: 0.01 ETH

  // Buy from marketplace
  await buyFromMarketplace(0); // listingId: 0
}
```

#### MetaTxRelay Hook (`lib/hooks/useMetaTxRelay.ts`)

```typescript
import { useMetaTxRelay } from '@/lib/hooks/useMetaTxRelay';

function GaslessComponent() {
  const { 
    executeMetaTx, 
    executeBatchMetaTx,
    getNonce,
    loading,
    error 
  } = useMetaTxRelay();

  // Execute gasless transaction
  const result = await executeMetaTx(
    contractAddress,
    encodedData,
    'http://localhost:3001/relay'
  );

  // Execute batch gasless transactions
  const batchResult = await executeBatchMetaTx(
    [contract1, contract2],
    [data1, data2],
    'http://localhost:3001/relay/batch'
  );
}
```

### Step 3: Update Wagmi Config

Ensure your Wagmi config includes Base Mainnet:

```typescript
// lib/wagmi.ts
import { base } from 'wagmi/chains';

export const config = createConfig({
  chains: [base],
  // ... rest of config
});
```

## Creating Initial Items

### Step 1: Review Item Definitions

The script creates 15 initial items across different categories:

- **Cosmetics**: 10 items (Common → Legendary)
  - Basic Helmet, Wooden Shield, Starter Sword (Common)
  - Iron Armor, Battle Cape (Uncommon)
  - Dragon Scale Armor, Enchanted Blade (Rare)
  - Phoenix Wings, Crown of Champions (Epic)
  - Celestial Armor Set (Legendary)

- **Consumables**: 2 items
  - Health Potion (Common)
  - Mana Elixir (Uncommon)

- **Power-ups**: 3 items
  - Attack Boost, Defense Shield (Rare)
  - Ultimate Power Crystal (Legendary)

### Step 2: Run Creation Script

```bash
npx hardhat run scripts/create-initial-items.ts --network base
```

**Expected Output:**
```
Creating initial items for ComCelo...

Items Contract: 0xBf1D587fc5f00aBA65671ab575eD5225D3342e13

Deployer: 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf
Balance: 1.5 ETH

[1/15] Creating: Basic Helmet
  Type: Cosmetic
  Rarity: Common
  Price: 0.001 ETH
  Supply: 1000
  ✅ Created! Tx: 0x...

...

✨ All items created successfully!
```

### Step 3: Verify Items

Check the Items contract on Basescan to verify all items were created:

```
https://basescan.org/address/0xBf1D587fc5f00aBA65671ab575eD5225D3342e13#readContract
```

## Setting Up the Relayer

### Step 1: Install Dependencies

```bash
cd relayer
npm install
```

### Step 2: Configure Relayer

Create `relayer/.env`:

```env
RELAYER_PRIVATE_KEY=your_private_key_here
BASE_RPC_MAINNET=https://mainnet.base.org
NEXT_PUBLIC_META_TX_RELAY_CONTRACT_ADDRESS=0x6E69f9c92070c3381D7Aebbb07842b682d500011
RELAYER_PORT=3001
RELAYER_MAX_GAS_PRICE=100
RELAYER_MIN_BALANCE=0.1
```

### Step 3: Fund Relayer Wallet

Send at least **1 ETH** to your relayer wallet address on Base Mainnet.

### Step 4: Approve Relayer

```bash
# From root directory
RELAYER_ADDRESS=<your_relayer_address> npx hardhat run scripts/approve-relayer.ts --network base
```

**Expected Output:**
```
Approving relayer address...

MetaTxRelay Contract: 0x6E69f9c92070c3381D7Aebbb07842b682d500011
Relayer Address: 0x...

Signer: 0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf
Balance: 1.5 ETH

Approving relayer...
Transaction submitted: 0x...
✅ Transaction confirmed in block 12345

✨ Relayer approved successfully!
```

### Step 5: Start Relayer Service

```bash
cd relayer
npm run dev
```

**Expected Output:**
```
🚀 ComCelo Meta-Transaction Relayer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📡 Server running on port 3001
🔗 Network: Base Mainnet
💼 Relayer: 0x...
💰 Balance: 1.5 ETH
✅ Approved: true
🎁 Rewards: 0.0 ETH

📝 Endpoints:
   GET  /health       - Health check
   POST /relay        - Execute meta-tx
   POST /relay/batch  - Execute batch meta-tx
   POST /withdraw     - Withdraw rewards
   GET  /stats        - Relayer stats
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Step 6: Test Relayer

```bash
# Health check
curl http://localhost:3001/health

# Check stats
curl http://localhost:3001/stats
```

## Testing the Integration

### Test 1: Purchase an Item (Frontend)

```typescript
// In your React component
import { useItems } from '@/lib/hooks/useItems';

const { purchaseItem } = useItems();

// Purchase Basic Helmet (itemId: 0, amount: 1)
const tx = await purchaseItem(0, 1);
console.log('Item purchased!', tx);
```

### Test 2: Gasless Transaction (MetaTx)

```typescript
import { useMetaTxRelay } from '@/lib/hooks/useMetaTxRelay';
import { encodeFunctionData } from 'viem';

const { executeMetaTx } = useMetaTxRelay();

// Encode function call (e.g., list item on marketplace)
const data = encodeFunctionData({
  abi: itemsABI,
  functionName: 'listItem',
  args: [0, ethers.parseEther('0.01')],
});

// Execute via relayer (no gas required!)
const result = await executeMetaTx(
  CONTRACTS.items,
  data,
  'http://localhost:3001/relay'
);

console.log('Gasless transaction executed!', result);
```

### Test 3: Marketplace Purchase

```typescript
const { buyFromMarketplace } = useItems();

// Buy listing #0
const tx = await buyFromMarketplace(0);
console.log('Item purchased from marketplace!', tx);
```

### Test 4: Batch Operations

```typescript
const { executeBatchMetaTx } = useMetaTxRelay();

// Prepare multiple function calls
const calls = [
  encodeFunctionData({ abi: itemsABI, functionName: 'purchaseItem', args: [0, 1] }),
  encodeFunctionData({ abi: itemsABI, functionName: 'purchaseItem', args: [1, 1] }),
  encodeFunctionData({ abi: itemsABI, functionName: 'purchaseItem', args: [2, 1] }),
];

// Execute all in one gasless transaction
const result = await executeBatchMetaTx(
  [CONTRACTS.items, CONTRACTS.items, CONTRACTS.items],
  calls,
  'http://localhost:3001/relay/batch'
);

console.log('Batch transaction executed!', result);
```

## Monitoring & Maintenance

### Frontend Monitoring

- Monitor contract events for item purchases
- Track marketplace activity
- Display user balances and inventories

### Relayer Monitoring

```bash
# Check relayer health
curl http://localhost:3001/health

# Check stats
curl http://localhost:3001/stats

# Withdraw rewards (when accumulated)
curl -X POST http://localhost:3001/withdraw
```

### Production Deployment

For production relayer deployment:

```bash
cd relayer
npm run build

# Use PM2 for process management
pm2 start dist/server.js --name comcelo-relayer
pm2 save
pm2 startup
```

### Set Up Alerts

Monitor:
- Relayer balance (< 0.1 ETH)
- Daily gas usage (approaching 5 ETH limit)
- Failed transactions
- Unapproved relayer status

## Troubleshooting

### Issue: "Relayer not approved"
**Solution:** Run the approve-relayer script with owner wallet.

### Issue: "Insufficient balance"
**Solution:** Fund the relayer wallet with more ETH.

### Issue: "Gas price too high"
**Solution:** Wait for lower gas prices or increase `RELAYER_MAX_GAS_PRICE`.

### Issue: "Invalid nonce"
**Solution:** User should fetch latest nonce from contract using `getNonce()`.

## Next Steps

1. ✅ Frontend integration complete
2. ✅ Initial items created
3. ✅ Relayer service running
4. 🔄 Deploy frontend to production
5. 🔄 Set up monitoring and alerts
6. 🔄 Create user documentation
7. 🔄 Launch marketing campaign

## Support

For issues or questions:
- Check Basescan for transaction details
- Review relayer logs for errors
- Verify contract addresses in `.env`
- Ensure sufficient ETH balance for transactions

## Resources

- [Base Mainnet Explorer](https://basescan.org)
- [Base Network Docs](https://docs.base.org)
- [Wagmi Documentation](https://wagmi.sh)
- [Viem Documentation](https://viem.sh)
