import { ethers } from 'hardhat';
import fs from 'fs';
import path from 'path';
import {
  StacksMainnet,
  StacksTestnet,
} from '@stacks/network';
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  standardPrincipalCV,
  stringAsciiCV,
  uintCV,
  trueCV,
  falseCV,
} from '@stacks/transactions';

function getStacksNetwork(network: string) {
  return network === 'mainnet' ? new StacksMainnet() : new StacksTestnet();
}

function parseStacksArgs(argsJson: string) {
  if (!argsJson) return [];
  const items = JSON.parse(argsJson);
  return items.map((item: any) => {
    switch (item.type) {
      case 'string':
        return stringAsciiCV(item.value);
      case 'uint':
        return uintCV(BigInt(item.value));
      case 'bool':
        return item.value ? trueCV() : falseCV();
      case 'principal':
        return standardPrincipalCV(item.value);
      default:
        throw new Error(`Unsupported Clarity arg type: ${item.type}`);
    }
  });
}

async function interactEvm() {
  const contractName = process.env.CONTRACT_NAME;
  const contractAddress = process.env.CONTRACT_ADDRESS;
  const functionName = process.env.FUNCTION_NAME;
  const argsJson = process.env.FUNCTION_ARGS || '[]';

  if (!contractName || !contractAddress || !functionName) {
    throw new Error('Set CONTRACT_NAME, CONTRACT_ADDRESS, FUNCTION_NAME. Optional: FUNCTION_ARGS as JSON array.');
  }

  const [signer] = await ethers.getSigners();
  const factory = await ethers.getContractFactory(contractName);
  const iface = factory.interface;
  const contract = new ethers.Contract(contractAddress, iface, signer);
  const args = JSON.parse(argsJson);

  console.log(`Calling ${functionName} on ${contractName} at ${contractAddress} with args`, args);
  const tx = await (contract as any)[functionName](...args);
  const receipt = await tx.wait();
  console.log('Tx hash:', receipt?.hash);
}

async function interactStacks() {
  const privKey = process.env.STACKS_PRIVATE_KEY;
  const stacksNet = (process.env.STACKS_NETWORK || 'mainnet').toLowerCase();
  const contractAddress = process.env.STACKS_CONTRACT_ADDRESS;
  const contractName = process.env.STACKS_CONTRACT_NAME || 'comcelo';
  const functionName = process.env.FUNCTION_NAME || 'ping';
  const argsJson = process.env.FUNCTION_ARGS || '[]';

  if (!privKey || !contractAddress || !functionName) {
    throw new Error('Set STACKS_PRIVATE_KEY, STACKS_CONTRACT_ADDRESS, FUNCTION_NAME. Optional: STACKS_CONTRACT_NAME, FUNCTION_ARGS.');
  }

  const network = getStacksNetwork(stacksNet);
  const functionArgs = parseStacksArgs(argsJson);

  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName,
    functionArgs,
    senderKey: privKey,
    network,
    fee: 10000n,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
  });

  const result = await broadcastTransaction(tx, network);
  if ('error' in result) {
    console.error('Broadcast error:', result);
    process.exit(1);
  }
  console.log('Stacks contract call txid:', result.txid);
}

async function main() {
  const target = (process.env.TARGET || 'evm').toLowerCase();
  if (target === 'stacks') {
    await interactStacks();
  } else {
    await interactEvm();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
