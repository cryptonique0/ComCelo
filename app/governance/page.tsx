"use client";
import React, { useEffect, useState } from "react";
import { useAccount, usePublicClient } from "wagmi";
import { Address, createPublicClient, http } from "viem";
import GovernanceVoteButton from "../components/GovernanceVoteButton";

type Proposal = {
  id: bigint;
  description: string;
  proposer: Address;
  target: Address;
  deadline: bigint;
  eta: bigint;
  executed: boolean;
  cancelled: boolean;
  votesFor: bigint;
  votesAgainst: bigint;
  votesAbstain: bigint;
  quorumVotes: bigint;
};

const GOVERNANCE_ADDRESS = (process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT_ADDRESS as Address) || "0x0000000000000000000000000000000000000000";

export default function GovernancePage() {
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [nextProposalId, setNextProposalId] = useState<bigint>(0n);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProposals() {
      if (!publicClient) return;
      try {
        const nextId = (await publicClient.readContract({
          address: GOVERNANCE_ADDRESS,
          abi: [{ type: "function", name: "nextProposalId", stateMutability: "view", inputs: [], outputs: [{ type: "uint256" }] }],
          functionName: "nextProposalId",
        })) as bigint;

        setNextProposalId(nextId);

        const all: Proposal[] = [];
        for (let i = 1n; i < nextId; i++) {
          const p = (await publicClient.readContract({
            address: GOVERNANCE_ADDRESS,
            abi: [
              {
                type: "function",
                name: "getProposal",
                stateMutability: "view",
                inputs: [{ type: "uint256" }],
                outputs: [
                  {
                    type: "tuple",
                    components: [
                      { name: "id", type: "uint256" },
                      { name: "description", type: "string" },
                      { name: "proposer", type: "address" },
                      { name: "target", type: "address" },
                      { name: "value", type: "uint256" },
                      { name: "data", type: "bytes" },
                      { name: "snapshotBlock", type: "uint256" },
                      { name: "deadline", type: "uint256" },
                      { name: "eta", type: "uint256" },
                      { name: "executed", type: "bool" },
                      { name: "cancelled", type: "bool" },
                      { name: "deadlineExtended", type: "bool" },
                      { name: "votesFor", type: "uint256" },
                      { name: "votesAgainst", type: "uint256" },
                      { name: "votesAbstain", type: "uint256" },
                      { name: "totalVoters", type: "uint256" },
                      { name: "quorumVotes", type: "uint256" },
                    ],
                  },
                ],
              },
            ],
            functionName: "getProposal",
            args: [i],
          })) as any;

          all.push({
            id: p.id,
            description: p.description,
            proposer: p.proposer,
            target: p.target,
            deadline: p.deadline,
            eta: p.eta,
            executed: p.executed,
            cancelled: p.cancelled,
            votesFor: p.votesFor,
            votesAgainst: p.votesAgainst,
            votesAbstain: p.votesAbstain,
            quorumVotes: p.quorumVotes,
          });
        }

        setProposals(all.reverse());
      } catch (e) {
        console.error("Failed to load proposals:", e);
      } finally {
        setLoading(false);
      }
    }

    loadProposals();
  }, [publicClient]);

  const now = BigInt(Math.floor(Date.now() / 1000));

  return (
    <div style={{ padding: "2rem", maxWidth: 1200, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" }}>ComCelo Governance</h1>
      <p style={{ marginBottom: "2rem", color: "#666" }}>
        Token-weighted voting with quorum, timelock, and EIP-712 off-chain signatures. Proposals require 20% quorum and a 1-day execution delay.
      </p>

      {loading && <p>Loading proposals...</p>}

      {!loading && proposals.length === 0 && <p style={{ color: "#999" }}>No proposals yet. Be the first to propose a change!</p>}

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {proposals.map((p) => {
          const isActive = now < p.deadline && !p.executed && !p.cancelled;
          const isPending = now >= p.deadline && now < p.eta && !p.executed && !p.cancelled;
          const isExecutable = now >= p.eta && !p.executed && !p.cancelled;
          const total = p.votesFor + p.votesAgainst + p.votesAbstain;
          const quorumMet = total >= p.quorumVotes;

          let status = "Unknown";
          let statusColor = "#999";
          if (p.cancelled) {
            status = "Cancelled";
            statusColor = "#aaa";
          } else if (p.executed) {
            status = "Executed";
            statusColor = "#0a0";
          } else if (isExecutable) {
            status = quorumMet && p.votesFor > p.votesAgainst ? "Ready to Execute" : "Failed";
            statusColor = quorumMet && p.votesFor > p.votesAgainst ? "#0a0" : "#c00";
          } else if (isPending) {
            status = "Timelock";
            statusColor = "#fa0";
          } else if (isActive) {
            status = "Active";
            statusColor = "#08f";
          } else {
            status = "Ended";
            statusColor = "#666";
          }

          return (
            <div
              key={p.id.toString()}
              style={{
                border: "1px solid #333",
                borderRadius: 8,
                padding: "1rem",
                background: "#1a1a1a",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                  #{p.id.toString()} {p.description}
                </h3>
                <span style={{ padding: "0.25rem 0.75rem", borderRadius: 4, fontSize: "0.875rem", fontWeight: "600", color: statusColor, border: `1px solid ${statusColor}` }}>
                  {status}
                </span>
              </div>

              <div style={{ fontSize: "0.875rem", color: "#999", marginBottom: "0.75rem" }}>
                <div>Proposer: {p.proposer}</div>
                <div>Target: {p.target}</div>
                <div>
                  Deadline: {new Date(Number(p.deadline) * 1000).toLocaleString()} | ETA: {new Date(Number(p.eta) * 1000).toLocaleString()}
                </div>
              </div>

              <div style={{ display: "flex", gap: "1rem", marginBottom: "0.75rem", fontSize: "0.875rem" }}>
                <div>
                  <strong style={{ color: "#0a0" }}>For:</strong> {p.votesFor.toString()}
                </div>
                <div>
                  <strong style={{ color: "#c00" }}>Against:</strong> {p.votesAgainst.toString()}
                </div>
                <div>
                  <strong style={{ color: "#fa0" }}>Abstain:</strong> {p.votesAbstain.toString()}
                </div>
                <div>
                  <strong>Quorum:</strong> {p.quorumVotes.toString()} {quorumMet ? "✓" : "✗"}
                </div>
              </div>

              {isActive && address && <GovernanceVoteButton governanceAddress={GOVERNANCE_ADDRESS} proposalId={p.id} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
