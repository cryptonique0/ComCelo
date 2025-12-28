# ComCelo - 1v1 Tactical Duels on Celo

A Farcaster Frame-first, blockchain-backed 1v1 turn-based tactical strategy game deployed on Celo.

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- A Celo wallet (Valora or WalletConnect)

### Installation

```bash
git clone https://github.com/cryptonique0/ComCelo.git
cd ComCelo
npm install
```

### Local Development

**Run tests:**
```bash
npm test
```

**Compile contracts:**
```bash
npm run build
```

**Lint code:**
```bash
npm run lint
```

**Format code:**
```bash
npm run format
```

**Start the Next.js development server (frontend):**
```bash
npm run dev
```
The app will be available at `http://localhost:3000` (if 3000 is busy, Next.js falls back to the next open port, e.g. 3001).

### Frontend Landing Experience

- The home route renders the new "Unit Customization" landing layout from the provided Stitch design drop.
- Global styles import Google Material Symbols and include scrollbar/stat-bar helpers used by the landing page.
- To preview locally, run `npm run dev` and open the reported localhost port.

### Deploy Smart Contracts

1. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

2. Add your private key and RPC URLs to `.env`.

3. Deploy to Celo Alfajores testnet:
   ```bash
   npx hardhat run scripts/deploy.ts --network celoAlfajores
   ```

4. Deploy to Celo mainnet:
   ```bash
   npx hardhat run scripts/deploy.ts --network celo
   ```

## Architecture

### Contracts (in `contracts/`)

- **ComCeloCore.sol** - Main game logic, turn management, unit actions
- **ComCeloUnits.sol** - Unit archetypes (Hero, Soldier, Archer)
- **ComCeloMatchmaker.sol** - Game invites and quick-match queue
- **ComCeloTreasury.sol** - Fee collection and prize distribution
- **ComCeloMetaTxRelay.sol** - Gas-sponsored meta-transactions

### Frontend (in `app/`)

- **Layout & Home** - Landing page and root layout
- **API Routes** - Frame endpoints and game state endpoints
- **Frames** - Farcaster Frame integration

### Tests (in `test/`)

- **ComCeloContracts.test.ts** - Comprehensive unit and integration tests

## Key Features

✅ **On-Chain Game Logic** - All game state stored on Celo blockchain  
✅ **Farcaster Frames** - Play directly in the feed (server-rendered)  
✅ **Gas Sponsorship** - Meta-tx relay for frictionless onboarding  
✅ **Matchmaking** - Invite friends or join quick-match queue  
✅ **Tournament Prize Pool** - Collect fees and distribute rewards  
✅ **Ranked/Unranked** - Support for both casual and competitive play  

## Game Rules

**Board:** 3x3 grid  
**Units per Player:** 1 Hero, 2 Soldiers, 1 Archer  

**Unit Stats:**
- Hero: 100 HP, 15 ATK, 10 DEF, Range 1
- Soldier: 40 HP, 12 ATK, 8 DEF, Range 1
- Archer: 30 HP, 10 ATK, 5 DEF, Range 3

**Actions per Turn:**
- Move (within movement range)
- Attack (if in range)
- Defend (reduce incoming damage)
- Use Skill (special ability)
- End Turn

**Win Condition:** Reduce opponent's Hero HP to 0

## Development Workflow

1. **Feature Branch:** Create a feature branch from `develop`
2. **Write Tests:** Add tests in `test/`
3. **Implement Feature:** Update contracts and/or frontend
4. **Run Tests:** `npm test` must pass
5. **Lint:** `npm run lint` must pass
6. **Commit:** Small, atomic commits with clear messages
7. **PR:** Create pull request to `develop`, then `main`

## Testing

Run the full test suite:
```bash
npm test
```

Run specific test file:
```bash
npx hardhat test test/ComCeloContracts.test.ts
```

Coverage:
```bash
npx hardhat coverage
```

## Environment Variables

See `.env.example` for all required variables:

- `DEPLOYER_KEY` - Your private key for deployments
- `CELO_RPC_ALFAJORES` - Celo Alfajores RPC endpoint
- `CELO_RPC_MAINNET` - Celo mainnet RPC endpoint
- `CELOSCAN_API_KEY` - For contract verification
- `NEXT_PUBLIC_BASE_URL` - Base URL of the frontend
- `NEXT_PUBLIC_GAME_CONTRACT_ADDRESS` - Deployed ComCeloCore address
- `NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS` - Deployed MetaTxRelay address

## CI/CD

GitHub Actions automatically runs:
- ✅ Linting (ESLint)
- ✅ Compilation (Hardhat)
- ✅ Tests (Mocha/Chai)
- ✅ Security checks (npm audit)

See `.github/workflows/ci.yml` for details.

## Deployment

### Deploy to Vercel (Frontend)

```bash
npm install -g vercel
vercel
```

Set environment variables in Vercel dashboard.

### Deploy Contracts (Manual)

```bash
npx hardhat run scripts/deploy.ts --network celoAlfajores
# or
npx hardhat run scripts/deploy.ts --network celo
```

Save deployment addresses and update `.env` and `app/lib/contracts.ts`.

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/state?gameId={id}` - Fetch game state
- `GET /api/frames/start` - Farcaster Frame: Start game
- `POST /api/frames/start` - Frame interaction handler

## Frame Spec

ComCelo uses Farcaster Frames for in-feed gameplay. Frame endpoints are server-side rendered and return JSON with image URLs and button actions.

See `FRAMES.md` for detailed Frame endpoint documentation.

## Security

- ✅ Uses OpenZeppelin audited contracts
- ✅ Reentrancy protection (ReentrancyGuard)
- ✅ Pausable emergency stop mechanism
- ✅ Owner-gated sensitive functions
- ✅ Integer overflow/underflow safe (Solidity 0.8.23+)

## Gas Optimization

- Packed structs to minimize storage
- Efficient array indexing for 3x3 grid (uint8)
- Cached template lookups

## Troubleshooting

**Compilation Error:** Make sure you're on Node 18+
```bash
node --version
```

**Test Failures:** Clear cache and rebuild
```bash
npm run build
npm test
```

**Frame not rendering:** Check that `NEXT_PUBLIC_BASE_URL` is set correctly

## Support

- **Issues:** Create an issue on GitHub
- **Discussions:** Use GitHub Discussions
- **Security:** Report vulnerabilities privately to maintainers

## License

MIT - See LICENSE file

## Contributors

- Lead Developer: [Your Name]
- See CONTRIBUTORS.md for all contributors

---

**Built with ❤️ on Celo**
