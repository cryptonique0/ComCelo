# BaseScan Contract Verification Guide

## Overview

After deploying contracts to Base Mainnet via Remix, verify them on BaseScan so users can interact directly through the block explorer.

---

## Method 1: Verify via Remix Flattener (Recommended)

### Step 1: Flatten Contract

1. In Remix, right-click on contract file (e.g., `ComCeloCore.sol`)
2. Select **"Flatten"**
3. Remix will create a new file: `ComCeloCore_flattened.sol`
4. Copy all contents of flattened file

### Step 2: Submit to BaseScan

1. Go to **https://basescan.org/address/[YOUR_CONTRACT_ADDRESS]**
2. Click **"Contract"** tab
3. Click **"Verify and Publish"**
4. Fill in the form:

```
Compiler Type: Solidity (Single file)
Compiler Version: v0.8.23+commit.f704f362
Open Source License Type: MIT License (MIT)
```

5. Click **"Continue"**

### Step 3: Paste Flattened Code

1. In **"Contract Code"** box, paste flattened source
2. **Optimization:** Select **"Yes"**
3. **Runs:** Enter **200**
4. **Constructor Arguments (if any):** See below
5. Click **"Verify and Publish"**

### Step 4: Check Verification Status

✅ Success: "Contract source code verified"  
❌ Failure: Check error message and retry

---

## Constructor Arguments (ABI-Encoded)

For contracts with constructor parameters, you need ABI-encoded values.

### How to Get Constructor Arguments

#### Option A: From BaseScan

1. Go to contract address on BaseScan
2. Click **"Contract Creation"** transaction
3. Scroll to **"Input Data"**
4. Copy everything **after** the contract bytecode (last part)

#### Option B: Encode Manually

Use Remix's **"DEPLOY & RUN TRANSACTIONS"** panel:

1. Load contract at deployed address
2. Remix shows constructor args in deployment panel
3. Or use web3.js/ethers.js to encode:

```javascript
const ethers = require('ethers');

// Example: ComCeloCore(address _unitsContract, address _treasury)
const types = ['address', 'address'];
const values = ['0x...', '0x...'];

const encoded = ethers.utils.defaultAbiCoder.encode(types, values);
console.log(encoded.slice(2)); // Remove '0x' prefix
```

---

## Constructor Args for Each Contract

### ComCeloCore
```
Parameters: (address _unitsContract, address _treasury)
Example:
  0x000000000000000000000000[UNITS_ADDRESS]
  0x000000000000000000000000[TREASURY_ADDRESS]
```

### ComCeloMatchmaker
```
Parameters: (address _gameContract)
Example:
  0x000000000000000000000000[CORE_ADDRESS]
```

### ComCeloItems, Seasons, Tournaments, etc.
```
Parameters: (address _gameContract)
Example:
  0x000000000000000000000000[CORE_ADDRESS]
```

### ComCeloAntiCheat
```
Parameters: (address _sessionManager)
Example:
  0x000000000000000000000000[SESSION_MANAGER_ADDRESS]
```

### ComCeloUnits, Treasury, Governance, CrossChainRewards
```
Parameters: NONE (no constructor args needed)
```

---

## Method 2: Verify via Hardhat (If Using Scripts)

If you have a Hardhat project:

### Step 1: Install Hardhat Etherscan Plugin

```bash
npm install --save-dev @nomicfoundation/hardhat-verify
```

### Step 2: Configure hardhat.config.ts

```typescript
import "@nomicfoundation/hardhat-verify";

export default {
  etherscan: {
    apiKey: {
      base: "YOUR_BASESCAN_API_KEY", // Get from https://basescan.org/myapikey
    },
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
  networks: {
    base: {
      url: "https://mainnet.base.org",
      accounts: [process.env.DEPLOYER_KEY]
    }
  }
};
```

### Step 3: Verify Contract

```bash
npx hardhat verify --network base \
  0xYOUR_CONTRACT_ADDRESS \
  "constructor_arg1" \
  "constructor_arg2"
```

**Example:**
```bash
# ComCeloCore
npx hardhat verify --network base \
  0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" \
  "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

# ComCeloMatchmaker
npx hardhat verify --network base \
  0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9 \
  "0x5FbDB2315678afecb367f032d93F642f64180aa3"
```

---

## Method 3: Verify via Foundry (forge verify-contract)

If using Foundry:

```bash
forge verify-contract \
  --chain-id 8453 \
  --compiler-version v0.8.23+commit.f704f362 \
  --num-of-optimizations 200 \
  --constructor-args $(cast abi-encode "constructor(address,address)" 0x... 0x...) \
  --etherscan-api-key YOUR_BASESCAN_API_KEY \
  0xYOUR_CONTRACT_ADDRESS \
  contracts/ComCeloCore.sol:ComCeloCore
```

---

## Troubleshooting Verification

### Error: "Compiler version mismatch"
**Solution:** Ensure you select **v0.8.23+commit.f704f362** exactly

### Error: "Bytecode does not match"
**Causes:**
1. Optimization settings wrong (must be 200 runs)
2. Flattened code includes extra comments/whitespace
3. Wrong Solidity version

**Solution:** 
- Use exact compiler version from compilation
- Remove any extra comments from flattened code
- Ensure optimization is enabled with 200 runs

### Error: "Invalid constructor arguments"
**Solution:** 
- Check constructor args are ABI-encoded correctly
- Use BaseScan's "Input Data" to copy exact constructor args
- Remove `0x` prefix when pasting

### Error: "Already verified"
**Solution:** Contract is already verified! Check BaseScan.

### Error: "Invalid API key"
**Solution:** Get API key from https://basescan.org/myapikey

---

## Verification Checklist (Per Contract)

For each of the 17 contracts:

- [ ] Contract deployed successfully
- [ ] Address saved and confirmed on BaseScan
- [ ] Flattened source code copied
- [ ] Constructor arguments identified (if any)
- [ ] Constructor arguments ABI-encoded (if needed)
- [ ] Verification submitted to BaseScan
- [ ] Verification status: ✅ SUCCESS
- [ ] Contract page shows **"Contract Source Code Verified"** checkmark
- [ ] Can interact with contract via BaseScan "Read/Write Contract" tabs

---

## Bulk Verification Script

Create `scripts/verify-all.ts`:

```typescript
import { run } from "hardhat";

const addresses = {
  Core: "0x...",
  Units: "0x...",
  Treasury: "0x...",
  // ... add all addresses
};

async function main() {
  // Verify contracts with no constructor args
  for (const name of ["Units", "Treasury", "Governance", "CrossChainRewards"]) {
    console.log(`Verifying ${name}...`);
    try {
      await run("verify:verify", {
        address: addresses[name],
        constructorArguments: []
      });
      console.log(`✅ ${name} verified`);
    } catch (err) {
      console.error(`❌ ${name} failed:`, err.message);
    }
  }

  // Verify Core
  console.log("Verifying Core...");
  await run("verify:verify", {
    address: addresses.Core,
    constructorArguments: [addresses.Units, addresses.Treasury]
  });

  // Verify Matchmaker
  console.log("Verifying Matchmaker...");
  await run("verify:verify", {
    address: addresses.Matchmaker,
    constructorArguments: [addresses.Core]
  });

  // Verify feature contracts (all use Core as constructor arg)
  for (const name of ["Items", "Seasons", "Tournaments", "Achievements", 
                       "Ranking", "Quests", "Rewards", "MetaTxRelay",
                       "SessionManager", "PlayerStats"]) {
    console.log(`Verifying ${name}...`);
    await run("verify:verify", {
      address: addresses[name],
      constructorArguments: [addresses.Core]
    });
  }

  // Verify AntiCheat
  console.log("Verifying AntiCheat...");
  await run("verify:verify", {
    address: addresses.AntiCheat,
    constructorArguments: [addresses.SessionManager]
  });

  console.log("✅ All contracts verified!");
}

main().catch(console.error);
```

Run:
```bash
npx ts-node scripts/verify-all.ts
```

---

## Post-Verification Actions

### 1. Test Contract Interactions

On BaseScan:
1. Go to verified contract
2. Click **"Read Contract"** tab
3. Test read-only functions (e.g., `owner()`, `paused()`)
4. Click **"Write Contract"** tab
5. Connect MetaMask
6. Test write functions (e.g., `setGameContract()`)

### 2. Add Contract to MetaMask

Users can add your contracts to MetaMask:
1. Go to BaseScan contract page
2. Click **"Add to MetaMask"** (appears for verified contracts)

### 3. Share Verified Links

Share verified contract links:
```
https://basescan.org/address/0xYOUR_CORE_ADDRESS#code
```

---

## Benefits of Verification

✅ **Transparency:** Users can read source code  
✅ **Trust:** Proves deployed bytecode matches source  
✅ **Interaction:** Users can call functions directly on BaseScan  
✅ **Integration:** Wallets/dApps can fetch ABIs automatically  
✅ **Debugging:** Easier to debug transactions with source  

---

## Resources

- **BaseScan Verification:** https://basescan.org/verifyContract
- **BaseScan API Docs:** https://docs.basescan.org/
- **Hardhat Verify Plugin:** https://hardhat.org/hardhat-runner/plugins/nomicfoundation-hardhat-verify
- **Get BaseScan API Key:** https://basescan.org/myapikey

---

## Summary

1. **Flatten** contracts in Remix
2. **Submit** to BaseScan with correct compiler settings
3. **Provide** ABI-encoded constructor arguments
4. **Verify** all 17 contracts
5. **Test** interactions on BaseScan
6. **Share** verified contract links

Total time: ~30-60 minutes for 17 contracts

Good luck! 🚀
