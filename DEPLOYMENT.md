# ComCelo - Deployment Guide

## Quick Deploy to Vercel

### Prerequisites
- Vercel account (free tier available)
- GitHub repository with ComCelo code
- Celo testnet (Alfajores) contract addresses deployed

### Step 1: Connect GitHub to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Select your ComCelo GitHub repository
4. Import the project

### Step 2: Configure Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXT_PUBLIC_BASE_URL=https://your-project.vercel.app
NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_MATCHMAKER_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_UNITS_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS=0x...
```

### Step 3: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-3 minutes)
3. Your Frame endpoints will be available at:
   - `https://your-project.vercel.app/api/frames/start`
   - `https://your-project.vercel.app/api/games`
   - `https://your-project.vercel.app/api/actions/*`

### Step 4: Update Frame Metadata

To make your Frame shareable on Farcaster, add Open Graph tags. Vercel automatically serves these.

## Local Deployment

### Deploy Smart Contracts to Celo Testnet

1. Create `.env` with your private key:
   ```
   DEPLOYER_KEY=0x...
   CELO_RPC_ALFAJORES=https://alfajores-forno.celo-testnet.org
   ```

2. Deploy:
   ```bash
   npx hardhat run scripts/deploy.ts --network celoAlfajores
   ```

3. Copy contract addresses and add to `.env.local`:
   ```
   NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x...
   NEXT_PUBLIC_RELAY_CONTRACT_ADDRESS=0x...
   ```

4. Start local server:
   ```bash
   npm run dev
   ```

5. Your app is at `http://localhost:3000`

## Deploy to Celo Mainnet

⚠️ **Important:** Only deploy after thorough testing on testnet.

1. Verify contracts are bug-free and tested
2. Get security audit (recommended for production)
3. Update `.env`:
   ```
   DEPLOYER_KEY=your_mainnet_key
   CELO_RPC_MAINNET=https://forno.celo.org
   ```

4. Deploy with mainnet flag:
   ```bash
   npx hardhat run scripts/deploy.ts --network celo
   ```

5. Verify contracts on Celoscan:
   ```bash
   npx hardhat verify --network celo 0x... "constructor args here"
   ```

## Docker Deployment

Build Docker image for containerized deployment:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run next:build

EXPOSE 3000

CMD ["npm", "run", "next:start"]
```

Build and run:
```bash
docker build -t comcelo .
docker run -p 3000:3000 -e NEXT_PUBLIC_GAME_CONTRACT_ADDRESS=0x... comcelo
```

## CI/CD Pipeline

GitHub Actions automatically:
- Runs tests on every PR
- Lints code
- Builds contracts and frontend
- Can auto-deploy on merge to main (set up in Vercel)

See `.github/workflows/ci.yml` for config.

## Monitoring & Debugging

### Check Deployment Logs

**Vercel:**
```bash
vercel logs
```

**Local:**
```bash
npm run dev
# Check console output
```

### Test Frame Endpoints

```bash
curl https://your-app.vercel.app/api/health

curl -X POST https://your-app.vercel.app/api/games/1/move \
  -H "Content-Type: application/json" \
  -d '{"unitId": 0, "x": 1, "y": 1}'
```

### Monitor Smart Contracts

Use Celoscan block explorer:
- https://alfajores.celoscan.io (testnet)
- https://celoscan.io (mainnet)

Search for your contract address to see:
- All transactions
- Event logs
- Contract interactions

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Frame not rendering | Check NEXT_PUBLIC_BASE_URL is correct |
| Contract call fails | Verify contract address in env vars |
| Deployment timeout | Increase Vercel timeout in settings |
| Gas errors | Fund deployer account with CELO |

## Security Checklist

Before production deployment:

- [ ] All contracts tested with 95%+ coverage
- [ ] No hardcoded private keys in code
- [ ] All secrets in environment variables
- [ ] HTTPS enabled (Vercel does this automatically)
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all API routes
- [ ] Contract verified on Celoscan
- [ ] Security audit completed
- [ ] Mainnet private key stored securely (hardware wallet or KMS)

## Support

- Issues: GitHub Issues
- Questions: GitHub Discussions
- Security: Contact maintainers privately
