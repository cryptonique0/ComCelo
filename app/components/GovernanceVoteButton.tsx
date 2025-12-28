"use client";
import React, { useMemo, useState } from "react";
import { useAccount, useSignTypedData, useChainId } from "wagmi";
import { Address, createPublicClient, http } from "viem";

type Props = {
  governanceAddress: Address;
  proposalId: bigint;
};

// EIP-712 domain for ComCeloGovernance
function useDomain(governanceAddress: Address) {
  const chainId = useChainId();
  return useMemo(
    () => ({ name: "ComCeloGovernance", version: "1", chainId, verifyingContract: governanceAddress }),
    [chainId, governanceAddress]
  );
}

export default function GovernanceVoteButton({ governanceAddress, proposalId }: Props) {
  const { address } = useAccount();
  const domain = useDomain(governanceAddress);
  const [support, setSupport] = useState<0 | 1 | 2>(1);
  const [signature, setSignature] = useState<string | null>(null);
  const [deadline, setDeadline] = useState<number>(() => Math.floor(Date.now() / 1000) + 600);
  const [nonce, setNonce] = useState<bigint>(0n);

  const { signTypedDataAsync, isLoading } = useSignTypedData();

  const types = {
    Ballot: [
      { name: "proposalId", type: "uint256" },
      { name: "support", type: "uint8" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  } as const;

  async function refreshNonce() {
    const client = createPublicClient({ transport: http() });
    const data = await client.readContract({
      address: governanceAddress,
      abi: [
        {
          type: "function",
          name: "nonces",
          stateMutability: "view",
          inputs: [{ name: "", type: "address" }],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "nonces",
      args: [address as Address],
    });
    setNonce(BigInt(data as any));
  }

  async function handleSign() {
    if (!address) return;
    await refreshNonce();
    const signature = await signTypedDataAsync({ domain, types, primaryType: "Ballot", message: { proposalId, support, nonce, deadline } });
    setSignature(signature);
  }

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <select value={support} onChange={(e) => setSupport(Number(e.target.value) as 0 | 1 | 2)}>
        <option value={1}>For</option>
        <option value={0}>Against</option>
        <option value={2}>Abstain</option>
      </select>
      <button onClick={handleSign} disabled={isLoading || !address}>
        {isLoading ? "Signing…" : "Sign Vote (EIP-712)"}
      </button>
      {signature && <code style={{ fontSize: 12, wordBreak: "break-all" }}>{signature}</code>}
    </div>
  );
}
