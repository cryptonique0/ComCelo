# ComCelo Architecture

## Overview
- **Frontend:** Next.js 14 (app router), Tailwind CSS, wagmi for wallet/network, viem/ethers for contract calls.
- **Smart Contracts:** Base Mainnet deployed (Items, MetaTxRelay, CrossChainRewards, Governance) with ERC1155 items + marketplace, meta-tx relay, rewards, governance.
- **Backend Relayer:** Express + ethers (relayer/server.ts) for gas-sponsoring meta-transactions.
- **Scripts:** Hardhat scripts for deployment, relayer approval, and seeding initial cosmetic items.
- **Typechain:** Generated bindings in `typechain-types/` for typed contract interactions.

## Frontend Structure
- `app/page.tsx`: Cinematic landing, HUD showcase wired to live wallet/network data, splash intro.
- `app/components/TutorialModal.tsx`: Onboarding walkthrough.
- `app/profile`, `app/invites`, `app/shop`, etc.: Feature pages (profile stats, invites, shop shell).
- `lib/hooks/useItems.ts`: Items contract interactions (purchase, marketplace, balances).
- `lib/hooks/useMetaTxRelay.ts`: Gasless meta-transaction helper (sign + send to relayer).
- `lib/contracts.ts`: Address registry + network config.
- `app/globals.css`: Global theme, animations (float, pulse, HUD cooldown, splash).

### Data Flow (Frontend)
- Wallet/network from `wagmi` (`useAccount`, `useNetwork`, `useBalance`).
- Contract calls via typechain factories and viem/ethers through `useItems` / `useMetaTxRelay` hooks.
- Relayer flow: UI signs payload → POST to relayer `/relay` → MetaTxRelay executes on-chain.

## Smart Contracts (Base Mainnet)
- **ComCeloItems** (`0xBf1D587fc5f00aBA65671ab575eD5225D3342e13`): ERC1155 with rarity, effects, marketplace, seasonal rotation.
- **ComCeloMetaTxRelay** (`0x6E69f9c92070c3381D7Aebbb07842b682d500011`): Gas sponsorship, batch meta-tx, daily gas limits, relayer rewards.
- **ComCeloCrossChainRewards** (`0x4C73a992c2f52a74E67A2424b800Cf97359ab694`): Rewards distribution.
- **ComCeloGovernance** (`0x6736103c7a528E658895c541F89E47F250c98a4f`): Governance control and ownership.

## Relayer Service
- Location: `relayer/` (Express + ethers v6).
- Endpoints: `/health`, `/relay`, `/relay/batch`, `/withdraw`, `/stats`.
- Reads MetaTxRelay for approvals, nonces, gas usage; submits transactions as sponsor.
- Config via `.env` (private key, RPC, gas limits, port).

## Scripts
- `scripts/create-initial-items.ts`: Seed 15 cosmetic/consumable/power-up items.
- `scripts/approve-relayer.ts`: Approve relayer address in MetaTxRelay.
- `scripts/deploy-base.ts`: Deployment/configuration to Base (meta-tx aware).

## Testing & Tooling
- Hardhat for compilation/tests (Solidity 0.8.23, OZ libs).
- TypeScript strict configs for app and relayer.

## Deployment Notes
- Frontend expects Base Mainnet addresses in `.env` (`NEXT_PUBLIC_*`).
- Relayer must be funded and approved; enforces 5 ETH/day limit and rewards 10%.
- Meta-transactions depend on correct nonces and signature forwarding through relayer endpoints.
