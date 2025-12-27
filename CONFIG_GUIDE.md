# ComCelo Development Configuration Guide

## Environment Setup

### Required Variables

```env
# Deployment
DEPLOYER_KEY=your_private_key_here

# Networks
BASE_RPC_MAINNET=https://mainnet.base.org
BASE_RPC_SEPOLIA=https://sepolia.base.org
BASESCAN_API_KEY=your_basescan_api_key

# Stacks
STACKS_PRIVATE_KEY=your_stacks_private_key
STACKS_NETWORK=mainnet
STACKS_CONTRACT_NAME=comcelo

# Frontend
NEXT_PUBLIC_BASE_SIMPLE_CONTRACT_ADDRESS=0x3D071744510628a1afB3052Ca1492aD25A92afd8
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_NETWORK_ID=base
```

## Running Locally

```bash
# Install dependencies
npm install

# Build contracts
npm run build

# Start dev server
npm run dev
# Visit http://localhost:3000
```

## Available Scripts

- `npm run dev` - Start Next.js dev server
- `npm run build` - Compile Solidity contracts
- `npm run ci:build` - Build Next.js without linting
- `npm run deploy:core` - Deploy core contracts
- `npm run deploy:features` - Deploy feature contracts
- `npm run deploy:stacks` - Deploy to Stacks
- `npm run interact:auto:evm` - Call EVM contracts
- `npm run interact:auto:stacks` - Call Stacks contracts

## Utilities

### Transaction Tracking
```typescript
import { trackTransaction, getTransaction } from '@/lib/transaction-tracker';

trackTransaction({
  hash: '0x...',
  network: 'base',
  timestamp: Date.now(),
  status: 'pending',
  type: 'game',
});
```

### Network Monitoring
```typescript
import { checkBaseHealth, isNetworkHealthy } from '@/lib/network-health';

const health = await checkBaseHealth();
if (health.isOnline) console.log(`Latency: ${health.latency}ms`);
```

### Analytics
```typescript
import { trackGameStart, trackGameEnd } from '@/lib/analytics';

trackGameStart('game123');
// ... play game ...
trackGameEnd('game123', won);
```

## Deployed Contracts

- **ComCeloBaseSimple** (Base): `0x3D071744510628a1afB3052Ca1492aD25A92afd8`
- **ComCeloGovernance** (Base): `0x6736103c7a528E658895c541F89E47F250c98a4f`
- **ComCeloCrossChainRewards** (Base): `0x4C73a992c2f52a74E67A2424b800Cf97359ab694`
- **ComCeloItems** (Base): `0xBf1D587fc5f00aBA65671ab575eD5225D3342e13`
- **ComCeloMetaTxRelay** (Base): `0x6E69f9c92070c3381D7Aebbb07842b682d500011`

## Troubleshooting

### Build fails with ESLint errors
Use `npm run ci:build` to skip linting during development.

### Can't connect to wallet
Ensure MetaMask or compatible wallet is connected to the correct Base network:
- **Base Mainnet**: Chain ID 8453
- **Base Sepolia**: Chain ID 84532

### Gas prices too high
Monitor gas on BaseScan: https://basescan.org/gastracker

## Resources

- [Base Documentation](https://docs.base.org)
- [Stacks Documentation](https://docs.stacks.co)
- [Wagmi Hooks](https://wagmi.sh)
- [Next.js Docs](https://nextjs.org/docs)
