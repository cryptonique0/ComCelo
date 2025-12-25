# ComCelo Meta-Transaction Relayer

A gas-sponsorship service that enables gasless transactions for ComCelo users on Base Mainnet.

## Overview

The relayer service allows users to submit transactions without paying gas fees. The relayer:
- Validates and executes meta-transactions on behalf of users
- Pays gas fees for user transactions
- Earns 10% rewards from the MetaTxRelay contract
- Enforces daily gas limits (5 ETH per day)
- Supports batch transactions

## Setup

### Prerequisites

- Node.js 18+
- A funded wallet for the relayer (recommended: 1+ ETH on Base Mainnet)
- Access to the deployed ComCeloMetaTxRelay contract

### Installation

```bash
cd relayer
npm install
```

### Configuration

Create a `.env` file in the `relayer` directory:

```env
# Relayer wallet private key (KEEP SECURE!)
RELAYER_PRIVATE_KEY=your_private_key_here

# Network configuration
BASE_RPC_MAINNET=https://mainnet.base.org

# Contract addresses
NEXT_PUBLIC_META_TX_RELAY_CONTRACT_ADDRESS=0x6E69f9c92070c3381D7Aebbb07842b682d500011

# Relayer service settings
RELAYER_PORT=3001
RELAYER_MAX_GAS_PRICE=100  # Max gas price in gwei
RELAYER_MIN_BALANCE=0.1    # Minimum ETH balance threshold
```

### Approve Relayer

Before the relayer can execute transactions, it must be approved by the contract owner:

```bash
# From the root directory
RELAYER_ADDRESS=<your_relayer_wallet_address> npx hardhat run scripts/approve-relayer.ts --network base
```

## Running the Service

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm start
```

### Using PM2 (Recommended for production)

```bash
npm install -g pm2
pm2 start dist/server.js --name comcelo-relayer
pm2 save
pm2 startup
```

## API Endpoints

### Health Check
```
GET /health
```

Returns relayer status, balance, and approval status.

**Response:**
```json
{
  "status": "ok",
  "relayer": "0x...",
  "balance": "1.5",
  "isApproved": true,
  "rewards": "0.05",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Execute Meta-Transaction
```
POST /relay
```

Executes a single meta-transaction for a user.

**Request Body:**
```json
{
  "from": "0x...",
  "to": "0x...",
  "data": "0x...",
  "nonce": 0,
  "signature": "0x..."
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "blockNumber": 12345,
  "gasUsed": "150000"
}
```

### Execute Batch Meta-Transactions
```
POST /relay/batch
```

Executes multiple meta-transactions in a single transaction.

**Request Body:**
```json
{
  "from": "0x...",
  "targets": ["0x...", "0x..."],
  "dataArray": ["0x...", "0x..."],
  "startNonce": 0,
  "signatures": ["0x...", "0x..."]
}
```

**Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "blockNumber": 12345,
  "gasUsed": "300000",
  "count": 2
}
```

### Withdraw Rewards
```
POST /withdraw
```

Withdraws accumulated relayer rewards.

**Response:**
```json
{
  "success": true,
  "txHash": "0x...",
  "amount": "0.05"
}
```

### Relayer Statistics
```
GET /stats
```

Returns relayer statistics including balance, rewards, and daily gas usage.

**Response:**
```json
{
  "relayer": "0x...",
  "balance": "1.5",
  "rewards": "0.05",
  "dailyGasUsed": "2.5",
  "maxDailyGas": "5.0"
}
```

## Security

### Best Practices

1. **Private Key Security**: Never commit your `RELAYER_PRIVATE_KEY` to version control
2. **Rate Limiting**: Consider adding rate limiting to prevent abuse
3. **Monitoring**: Monitor relayer balance and set up alerts for low balances
4. **Gas Price Limits**: Adjust `RELAYER_MAX_GAS_PRICE` based on network conditions
5. **Daily Limits**: The contract enforces a 5 ETH daily gas limit per relayer

### Monitoring Alerts

Set up alerts for:
- Low balance (< 0.1 ETH)
- High gas usage (approaching daily limit)
- Failed transactions
- Unapproved relayer status

## Troubleshooting

### Relayer Not Approved
```
Error: Relayer not approved
```

**Solution:** Run the approve-relayer script with the contract owner's wallet.

### Insufficient Balance
```
Error: Relayer balance too low
```

**Solution:** Fund the relayer wallet with more ETH.

### Gas Price Too High
```
Error: Gas price too high
```

**Solution:** Wait for gas prices to decrease or increase `RELAYER_MAX_GAS_PRICE`.

### Invalid Nonce
```
Error: Invalid nonce
```

**Solution:** The user's nonce is incorrect. They should fetch the latest nonce from the contract.

## Maintenance

### Regular Tasks

1. **Monitor Balance**: Check relayer balance daily
2. **Withdraw Rewards**: Withdraw accumulated rewards weekly
3. **Check Logs**: Review logs for errors or unusual activity
4. **Update Dependencies**: Keep packages up to date for security

### Funding the Relayer

To fund the relayer wallet:

```bash
# Send ETH to the relayer address
# Recommended: Maintain at least 1 ETH balance
```

### Withdrawing Rewards

```bash
curl -X POST http://localhost:3001/withdraw
```

Or check the frontend dashboard for accumulated rewards.

## Cost Estimation

### Gas Costs

- Single meta-tx: ~150,000 gas (~$0.50 at 50 gwei, 2000 ETH/USD)
- Batch meta-tx (5 txs): ~400,000 gas (~$1.30)

### Revenue Model

- Relayer earns 10% of gas costs as rewards
- Example: $1000 in sponsored gas = $100 in rewards

### Break-Even Analysis

To break even, you need sufficient transaction volume:
- 1000 transactions/month at $0.50 each = $500 in gas costs
- Revenue: $50/month from 10% rewards

## License

MIT
