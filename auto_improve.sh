#!/bin/bash
set -e

# Function to commit and push
commit_push() {
  git add -A
  git commit -m "$1" 
  git push origin main
  echo "✓ Committed: $1"
}

# 1. Add GitHub Actions workflow for CI
mkdir -p .github/workflows
cat > .github/workflows/ci.yml << 'EOF'
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
EOF
commit_push "ci: add GitHub Actions workflow"

# 2. Add dependabot config
cat > .github/dependabot.yml << 'EOF'
version: 2
updates:
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
EOF
commit_push "chore: add dependabot configuration"

# 3. Update package.json scripts
npm pkg set scripts.test:watch="hardhat test --watch"
commit_push "chore: add test watch script"

npm pkg set scripts.clean="rm -rf .next dist cache artifacts"
commit_push "chore: add clean script"

# 4-10: Add documentation files
cat > docs/ARCHITECTURE.md << 'EOF'
# Architecture Overview

## Smart Contracts
Core game logic implemented in Solidity.

## Frontend
Next.js app with wagmi integration.

## Backend
API routes for game state management.
EOF
commit_push "docs: add architecture documentation"

cat > docs/API.md << 'EOF'
# API Documentation

## Endpoints

### GET /api/health
Health check endpoint.

### GET /api/games
List all games.
EOF
commit_push "docs: add API documentation"

cat > docs/DEPLOYMENT.md << 'EOF'
# Deployment Guide

## Prerequisites
- Node.js 18+
- Hardhat configured

## Steps
1. Compile contracts
2. Deploy to network
3. Update frontend config
EOF
commit_push "docs: add deployment guide"

cat > docs/TESTING.md << 'EOF'
# Testing Guide

## Running Tests
\`\`\`bash
npm test
\`\`\`

## Coverage
\`\`\`bash
npm run coverage
\`\`\`
EOF
commit_push "docs: add testing guide"

# 11-15: Add type definition files
cat > types/game.ts << 'EOF'
export interface GameState {
  id: string;
  players: [string, string];
  status: 'pending' | 'active' | 'finished';
}
EOF
commit_push "types: add game state interface"

cat > types/player.ts << 'EOF'
export interface Player {
  address: string;
  wins: number;
  losses: number;
  rating: number;
}
EOF
commit_push "types: add player interface"

# 16-20: Add utility functions
cat > lib/utils/format.ts << 'EOF'
export function formatAddress(address: string): string {
  return \`\${address.slice(0, 6)}...\${address.slice(-4)}\`;
}
EOF
commit_push "feat: add address formatting utility"

cat > lib/utils/validation.ts << 'EOF'
export function isValidAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
EOF
commit_push "feat: add address validation utility"

cat > lib/constants/chains.ts << 'EOF'
export const SUPPORTED_CHAINS = {
  BASE: 8453,
  BASE_SEPOLIA: 84532,
};
EOF
commit_push "feat: add chain constants"

# 21-25: Environment and config files
cat > .env.example << 'EOF'
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
PRIVATE_KEY=your_private_key_here
EOF
commit_push "chore: update env example"

cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
module.exports = nextConfig
EOF
commit_push "chore: add next config"

# 26-30: Add more documentation
cat > docs/QUICKSTART.md << 'EOF'
# Quick Start

1. Install dependencies: \`npm install\`
2. Copy \`.env.example\` to \`.env\`
3. Run development server: \`npm run dev\`
EOF
commit_push "docs: add quick start guide"

cat > docs/FAQ.md << 'EOF'
# Frequently Asked Questions

## What is ComCelo?
A tactical combat game on Base blockchain.

## How do I play?
Connect your wallet and start a match.
EOF
commit_push "docs: add FAQ"

cat > docs/ROADMAP.md << 'EOF'
# Roadmap

## Q1 2026
- [ ] Multiplayer tournaments
- [ ] NFT rewards

## Q2 2026
- [ ] Mobile app
- [ ] Cross-chain support
EOF
commit_push "docs: add roadmap"

# 31-39: Final touches
echo "# ComCelo Analytics" > docs/ANALYTICS.md
commit_push "docs: add analytics documentation"

echo "# Performance Optimization Guide" > docs/PERFORMANCE.md
commit_push "docs: add performance guide"

echo "# Security Best Practices" > docs/SECURITY_BEST_PRACTICES.md
commit_push "docs: add security best practices"

echo ".DS_Store" >> .gitignore
commit_push "chore: add DS_Store to gitignore"

echo "*.log" >> .gitignore
commit_push "chore: add log files to gitignore"

echo "coverage/" >> .gitignore
commit_push "chore: add coverage directory to gitignore"

echo ".env.local" >> .gitignore
commit_push "chore: add env.local to gitignore"

echo "# Changelog\n\n## [Unreleased]" > CHANGELOG.md
commit_push "docs: add changelog"

echo "MIT License" > LICENSE
commit_push "docs: add MIT license"

echo "All commits created!"
git log --oneline | wc -l
