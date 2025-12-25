import express from 'express';
import { ethers } from 'ethers';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Configuration
const PORT = process.env.RELAYER_PORT || 3001;
const PRIVATE_KEY = process.env.RELAYER_PRIVATE_KEY;
const RPC_URL = process.env.BASE_RPC_MAINNET || 'https://mainnet.base.org';
const META_TX_RELAY_ADDRESS = process.env.NEXT_PUBLIC_META_TX_RELAY_CONTRACT_ADDRESS || '0x6E69f9c92070c3381D7Aebbb07842b682d500011';
const MAX_GAS_PRICE = ethers.parseUnits(process.env.RELAYER_MAX_GAS_PRICE || '100', 'gwei');
const MIN_BALANCE = ethers.parseEther(process.env.RELAYER_MIN_BALANCE || '0.1');

// Initialize provider and wallet
const provider = new ethers.JsonRpcProvider(RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY!, provider);

// MetaTxRelay contract ABI (minimal)
const META_TX_RELAY_ABI = [
  'function executeMetaTx(address from, address to, bytes calldata data, uint256 nonce, bytes calldata signature) external returns (bool)',
  'function executeBatchMetaTx(address[] calldata froms, address[] calldata targets, bytes[] calldata dataArray, uint256[] calldata nonces, bytes[] calldata signatures) external returns (bool)',
  'function nonces(address user) external view returns (uint256)',
  'function approvedRelayers(address relayer) external view returns (bool)',
  'function dailyGasUsed(address relayer, uint256 day) external view returns (uint256)',
  'function relayerRewards(address relayer) external view returns (uint256)',
  'function withdrawRelayerRewards() external',
];

const metaTxRelay = new ethers.Contract(META_TX_RELAY_ADDRESS, META_TX_RELAY_ABI, wallet);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const balance = await provider.getBalance(wallet.address);
    const isApproved = await metaTxRelay.approvedRelayers(wallet.address);
    const rewards = await metaTxRelay.relayerRewards(wallet.address);

    res.json({
      status: 'ok',
      relayer: wallet.address,
      balance: ethers.formatEther(balance),
      isApproved,
      rewards: ethers.formatEther(rewards),
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
    });
  }
});

// Single meta-transaction endpoint
app.post('/relay', async (req, res) => {
  try {
    const { from, to, data, nonce, signature } = req.body;

    // Validate inputs
    if (!from || !to || !data || nonce === undefined || !signature) {
      return res.status(400).json({
        error: 'Missing required parameters: from, to, data, nonce, signature',
      });
    }

    // Check relayer balance
    const balance = await provider.getBalance(wallet.address);
    if (balance < MIN_BALANCE) {
      return res.status(503).json({
        error: 'Relayer balance too low',
        balance: ethers.formatEther(balance),
        minBalance: ethers.formatEther(MIN_BALANCE),
      });
    }

    // Check if relayer is approved
    const isApproved = await metaTxRelay.approvedRelayers(wallet.address);
    if (!isApproved) {
      return res.status(403).json({
        error: 'Relayer not approved',
      });
    }

    // Check gas price
    const feeData = await provider.getFeeData();
    if (feeData.gasPrice && feeData.gasPrice > MAX_GAS_PRICE) {
      return res.status(503).json({
        error: 'Gas price too high',
        currentGasPrice: ethers.formatUnits(feeData.gasPrice, 'gwei'),
        maxGasPrice: ethers.formatUnits(MAX_GAS_PRICE, 'gwei'),
      });
    }

    // Verify nonce
    const expectedNonce = await metaTxRelay.nonces(from);
    if (BigInt(nonce) !== expectedNonce) {
      return res.status(400).json({
        error: 'Invalid nonce',
        expected: expectedNonce.toString(),
        provided: nonce.toString(),
      });
    }

    console.log(`[RELAY] Executing meta-tx for ${from}`);
    console.log(`  To: ${to}`);
    console.log(`  Nonce: ${nonce}`);

    // Execute meta-transaction
    const tx = await metaTxRelay.executeMetaTx(from, to, data, nonce, signature);
    
    console.log(`  Tx submitted: ${tx.hash}`);

    // Wait for confirmation
    const receipt = await tx.wait();

    console.log(`  ✅ Confirmed in block ${receipt?.blockNumber}`);

    res.json({
      success: true,
      txHash: tx.hash,
      blockNumber: receipt?.blockNumber,
      gasUsed: receipt?.gasUsed.toString(),
    });
  } catch (error: any) {
    console.error('[RELAY ERROR]', error.message);
    res.status(500).json({
      error: error.message,
      code: error.code,
    });
  }
});

// Batch meta-transactions endpoint
app.post('/relay/batch', async (req, res) => {
  try {
    const { from, targets, dataArray, startNonce, signatures } = req.body;

    // Validate inputs
    if (!from || !targets || !dataArray || startNonce === undefined || !signatures) {
      return res.status(400).json({
        error: 'Missing required parameters: from, targets, dataArray, startNonce, signatures',
      });
    }

    if (targets.length !== dataArray.length || targets.length !== signatures.length) {
      return res.status(400).json({
        error: 'Arrays must have same length',
      });
    }

    // Check relayer balance
    const balance = await provider.getBalance(wallet.address);
    if (balance < MIN_BALANCE) {
      return res.status(503).json({
        error: 'Relayer balance too low',
        balance: ethers.formatEther(balance),
      });
    }

    // Check if relayer is approved
    const isApproved = await metaTxRelay.approvedRelayers(wallet.address);
    if (!isApproved) {
      return res.status(403).json({
        error: 'Relayer not approved',
      });
    }

    // Check gas price
    const feeData = await provider.getFeeData();
    if (feeData.gasPrice && feeData.gasPrice > MAX_GAS_PRICE) {
      return res.status(503).json({
        error: 'Gas price too high',
        currentGasPrice: ethers.formatUnits(feeData.gasPrice, 'gwei'),
      });
    }

    // Prepare arrays
    const froms = Array(targets.length).fill(from);
    const nonces = Array(targets.length).fill(0).map((_, i) => startNonce + i);

    console.log(`[BATCH RELAY] Executing ${targets.length} meta-txs for ${from}`);

    // Execute batch meta-transaction
    const tx = await metaTxRelay.executeBatchMetaTx(froms, targets, dataArray, nonces, signatures);
    
    console.log(`  Tx submitted: ${tx.hash}`);

    // Wait for confirmation
    const receipt = await tx.wait();

    console.log(`  ✅ Confirmed in block ${receipt?.blockNumber}`);

    res.json({
      success: true,
      txHash: tx.hash,
      blockNumber: receipt?.blockNumber,
      gasUsed: receipt?.gasUsed.toString(),
      count: targets.length,
    });
  } catch (error: any) {
    console.error('[BATCH RELAY ERROR]', error.message);
    res.status(500).json({
      error: error.message,
      code: error.code,
    });
  }
});

// Withdraw rewards endpoint
app.post('/withdraw', async (req, res) => {
  try {
    const rewards = await metaTxRelay.relayerRewards(wallet.address);

    if (rewards === 0n) {
      return res.status(400).json({
        error: 'No rewards to withdraw',
      });
    }

    console.log(`[WITHDRAW] Withdrawing ${ethers.formatEther(rewards)} ETH rewards`);

    const tx = await metaTxRelay.withdrawRelayerRewards();
    const receipt = await tx.wait();

    console.log(`  ✅ Withdrawn in tx ${tx.hash}`);

    res.json({
      success: true,
      txHash: tx.hash,
      amount: ethers.formatEther(rewards),
    });
  } catch (error: any) {
    console.error('[WITHDRAW ERROR]', error.message);
    res.status(500).json({
      error: error.message,
    });
  }
});

// Stats endpoint
app.get('/stats', async (req, res) => {
  try {
    const balance = await provider.getBalance(wallet.address);
    const rewards = await metaTxRelay.relayerRewards(wallet.address);
    const today = Math.floor(Date.now() / 86400000);
    const dailyGas = await metaTxRelay.dailyGasUsed(wallet.address, today);

    res.json({
      relayer: wallet.address,
      balance: ethers.formatEther(balance),
      rewards: ethers.formatEther(rewards),
      dailyGasUsed: ethers.formatEther(dailyGas),
      maxDailyGas: '5.0', // 5 ETH daily limit
    });
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`\n🚀 ComCelo Meta-Transaction Relayer`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📡 Server running on port ${PORT}`);
  console.log(`🔗 Network: Base Mainnet`);
  console.log(`💼 Relayer: ${wallet.address}`);
  
  try {
    const balance = await provider.getBalance(wallet.address);
    const isApproved = await metaTxRelay.approvedRelayers(wallet.address);
    const rewards = await metaTxRelay.relayerRewards(wallet.address);

    console.log(`💰 Balance: ${ethers.formatEther(balance)} ETH`);
    console.log(`✅ Approved: ${isApproved}`);
    console.log(`🎁 Rewards: ${ethers.formatEther(rewards)} ETH`);
    
    if (!isApproved) {
      console.log(`\n⚠️  WARNING: Relayer not approved!`);
      console.log(`   Run: npx hardhat run scripts/approve-relayer.ts --network base`);
    }

    if (balance < MIN_BALANCE) {
      console.log(`\n⚠️  WARNING: Balance below minimum threshold!`);
      console.log(`   Current: ${ethers.formatEther(balance)} ETH`);
      console.log(`   Minimum: ${ethers.formatEther(MIN_BALANCE)} ETH`);
    }
  } catch (error: any) {
    console.error(`\n❌ Initialization error: ${error.message}`);
  }

  console.log(`\n📝 Endpoints:`);
  console.log(`   GET  /health       - Health check`);
  console.log(`   POST /relay        - Execute meta-tx`);
  console.log(`   POST /relay/batch  - Execute batch meta-tx`);
  console.log(`   POST /withdraw     - Withdraw rewards`);
  console.log(`   GET  /stats        - Relayer stats`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
});
