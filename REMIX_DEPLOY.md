# ComCeloBaseSimple - Remix Deployment Guide

## Quick Deploy on Remix

1. **Open Remix IDE**: https://remix.ethereum.org
2. **Create New File**: `ComCeloBaseSimple.sol`
3. **Copy Contract**: Paste the contract from `contracts/ComCeloBaseSimple.sol`
4. **Compile**:
   - Select Solidity compiler `0.8.23` or higher
   - Click "Compile ComCeloBaseSimple.sol"
5. **Deploy**:
   - Select "Injected Provider - MetaMask"
   - Switch MetaMask to **Base Mainnet** (Chain ID: 8453)
   - Click "Deploy"
   - Confirm transaction in MetaMask

## Network Details

### Base Mainnet
- **RPC URL**: https://mainnet.base.org
- **Chain ID**: 8453
- **Currency**: ETH
- **Explorer**: https://basescan.org

### Base Sepolia (Testnet)
- **RPC URL**: https://sepolia.base.org
- **Chain ID**: 84532
- **Currency**: ETH
- **Explorer**: https://sepolia.basescan.org
- **Faucet**: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

## Contract Functions

### Read Functions (No Gas)
- `ping()` - Test function, returns true
- `getPlayer(address)` - Get player info
- `getGame(uint256)` - Get game details
- `getData(address)` - Get stored user data
- `getStats()` - Get contract statistics
- `owner()` - Get contract owner
- `gameCounter()` - Total games created
- `playerCount()` - Total players registered

### Write Functions (Requires Gas)
- `registerPlayer(string username)` - Register as a player
- `createGame()` - Create a new game, returns gameId
- `joinGame(uint256 gameId)` - Join an existing game
- `storeData(string data)` - Store arbitrary data
- `transferOwnership(address)` - Transfer contract ownership (owner only)

## Auto Interaction Examples

After deploying, save your contract address and use these commands:

### 1. Ping the Contract
```bash
export CONTRACT_NAME=ComCeloBaseSimple
export CONTRACT_ADDRESS=0xYourDeployedAddress
export FUNCTION_NAME=ping
export FUNCTION_ARGS='[]'
npm run interact:auto:evm -- --network base
```

### 2. Register a Player
```bash
export CONTRACT_NAME=ComCeloBaseSimple
export CONTRACT_ADDRESS=0xYourDeployedAddress
export FUNCTION_NAME=registerPlayer
export FUNCTION_ARGS='["PlayerName123"]'
npm run interact:auto:evm -- --network base
```

### 3. Create a Game
```bash
export CONTRACT_NAME=ComCeloBaseSimple
export CONTRACT_ADDRESS=0xYourDeployedAddress
export FUNCTION_NAME=createGame
export FUNCTION_ARGS='[]'
npm run interact:auto:evm -- --network base
```

### 4. Join a Game
```bash
export CONTRACT_NAME=ComCeloBaseSimple
export CONTRACT_ADDRESS=0xYourDeployedAddress
export FUNCTION_NAME=joinGame
export FUNCTION_ARGS='[1]'  # gameId = 1
npm run interact:auto:evm -- --network base
```

### 5. Store Custom Data
```bash
export CONTRACT_NAME=ComCeloBaseSimple
export CONTRACT_ADDRESS=0xYourDeployedAddress
export FUNCTION_NAME=storeData
export FUNCTION_ARGS='["My custom game data"]'
npm run interact:auto:evm -- --network base
```

## Important Notes

1. **Gas Costs**: Ensure you have ETH on Base for transaction fees
2. **Contract Address**: Save your deployed address after deployment
3. **Network**: Always verify you're on Base Mainnet (8453) or Base Sepolia (84532)
4. **Private Key**: For scripted interactions, set `DEPLOYER_KEY` in your `.env`
5. **Verification**: After deployment, verify on Basescan for better UX

## Verify on Basescan

After deployment via Remix, verify manually:

1. Go to https://basescan.org/address/YOUR_CONTRACT_ADDRESS
2. Click "Contract" → "Verify and Publish"
3. Select compiler version `0.8.23`
4. Paste contract source code
5. Submit verification

Or use Hardhat:
```bash
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS
```

## Example Flow

1. Deploy contract on Remix → Get address `0xABC...`
2. Register player: `registerPlayer("Alice")`
3. Create game: `createGame()` → Returns gameId `1`
4. Another player joins: `joinGame(1)`
5. Check stats: `getStats()` → See total games and players

## Integration with Auto Script

The `scripts/interact-auto.ts` script will:
- Connect to Base mainnet via Hardhat config
- Load the `ComCeloBaseSimple` ABI
- Call your specified function with arguments
- Return transaction hash and receipt

Make sure you have:
- ✅ Contract deployed on Base
- ✅ Contract address saved
- ✅ `DEPLOYER_KEY` in `.env` for gas payments
- ✅ Correct network flag: `--network base`
