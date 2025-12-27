import fs from 'fs';
import path from 'path';
import {
  makeContractDeploy,
  broadcastTransaction,
  getAddressFromPrivateKey,
  TransactionVersion,
  AnchorMode,
  PostConditionMode,
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';

function getStacksNetwork(network: string) {
  return network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
}

async function fetchNonce(address: string, network: string): Promise<bigint> {
  const apiBase = network === 'mainnet' ? 'https://api.mainnet.hiro.so' : 'https://api.testnet.hiro.so';
  const res = await fetch(`${apiBase}/v2/accounts/${address}?proof=0`);
  if (!res.ok) throw new Error(`Failed to get nonce: ${res.status}`);
  const json = await res.json();
  const n = json['nonce'] ?? json['possible_next_nonce'] ?? 0;
  return BigInt(n);
}

async function main() {
  const privKey = process.env.STACKS_PRIVATE_KEY;
  const stacksNet = (process.env.STACKS_NETWORK || 'mainnet').toLowerCase();
  const contractName = process.env.STACKS_CONTRACT_NAME || 'comcelo';
  const contractPath = path.join(process.cwd(), 'stacks', 'contracts', `${contractName}.clar`);

  if (!privKey) throw new Error('STACKS_PRIVATE_KEY is required');
  if (!fs.existsSync(contractPath)) throw new Error(`Contract file not found: ${contractPath}`);

  const clarityCode = fs.readFileSync(contractPath, 'utf8');
  const txVersion = stacksNet === 'mainnet' ? TransactionVersion.Mainnet : TransactionVersion.Testnet;
  const senderAddress = getAddressFromPrivateKey(privKey, txVersion);
  const nonce = await fetchNonce(senderAddress, stacksNet);

  const network = getStacksNetwork(stacksNet);

  const tx = await makeContractDeploy({
    contractName,
    codeBody: clarityCode,
    senderKey: privKey,
    network,
    nonce,
    fee: 10000n,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  });

  const result = await broadcastTransaction(tx, network);
  if ('error' in result) {
    console.error('Broadcast error:', result);
    process.exit(1);
  }

  console.log('Stacks contract deploy txid:', result.txid);
  const explorer = stacksNet === 'mainnet' ? 'https://explorer.stacks.co' : 'https://explorer.stacks.co/?chain=testnet';
  console.log(`View: ${explorer}&tx=${result.txid}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
