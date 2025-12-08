import { ethers } from "hardhat";

/**
 * Demo script: Automatically plays a complete game between two test wallets
 * Usage: npx hardhat run scripts/demo-game.ts --network <network>
 */
async function runDemo() {
  const [deployer, player1, player2] = await ethers.getSigners();

  console.log("\n═══════════════════════════════════════════");
  console.log("ComCelo Demo: Full Game Playthrough");
  console.log("═══════════════════════════════════════════\n");

  // Deploy contract
  console.log("1. Deploying ComCeloCore...");
  const CoreFactory = await ethers.getContractFactory("ComCeloCore");
  const core = await CoreFactory.deploy();
  await core.waitForDeployment();
  const coreAddress = await core.getAddress();
  console.log(`   ✓ Deployed to: ${coreAddress}\n`);

  // Create game
  console.log("2. Player 1 creates game invite for Player 2...");
  const gameOptions = {
    ranked: false,
    maxTurns: 100,
    stake: ethers.parseEther("0"),
  };
  const createTx = await core.connect(player1).createGame(player2.address, gameOptions);
  await createTx.wait();
  console.log(`   ✓ Game 1 created by ${player1.address.slice(0, 6)}...\n`);

  // Join game
  console.log("3. Player 2 accepts game invitation...");
  const joinTx = await core.connect(player2).joinGame(1);
  await joinTx.wait();
  console.log(`   ✓ Game started! Units initialized.\n`);

  // Helper to display game state
  const displayGameState = async (turn: number) => {
    const state = await core.getGameState(1);
    const currentPlayer = state.currentTurn === 0 ? "Player 1" : "Player 2";

    console.log(`   Turn ${Number(state.turnCount) + 1} (${currentPlayer}'s turn):`);
    console.log(`   ├─ Player 1 Hero HP: ${Number(state.units[0].hp)}`);
    console.log(`   ├─ Player 1 Soldiers: ${Number(state.units[1].hp)}, ${Number(state.units[2].hp)}`);
    console.log(`   ├─ Player 1 Archer: ${Number(state.units[3].hp)}`);
    console.log(`   ├─ Player 2 Hero HP: ${Number(state.units[4].hp)}`);
    console.log(`   ├─ Player 2 Soldiers: ${Number(state.units[5].hp)}, ${Number(state.units[6].hp)}`);
    console.log(`   └─ Player 2 Archer: ${Number(state.units[7].hp)}\n`);
  };

  // Play several turns
  console.log("4. Playing game...\n");

  // Round 1 - Player 1
  console.log("   --- Round 1 ---");
  await displayGameState(0);
  console.log("   Player 1 moves Hero to (1,0)");
  await core.connect(player1).move(1, 0, 1, 0);
  console.log("   Player 1 ends turn\n");
  await core.connect(player1).endTurn(1);

  // Round 1 - Player 2
  console.log("   Player 2 moves Hero closer");
  await displayGameState(1);
  await core.connect(player2).move(1, 4, 2, 0);
  console.log("   Player 2 ends turn\n");
  await core.connect(player2).endTurn(1);

  // Round 2 - Player 1 attacks
  console.log("   --- Round 2 ---");
  await displayGameState(0);
  console.log("   Player 1 attacks Player 2's Hero!");
  const attackTx = await core.connect(player1).attack(1, 0, 4);
  await attackTx.wait();
  const stateAfterAttack = await core.getGameState(1);
  const damageDealt = 100 - Number(stateAfterAttack.units[4].hp);
  console.log(`   Damage dealt: ${damageDealt}`);
  console.log("   Player 1 ends turn\n");
  await core.connect(player1).endTurn(1);

  // Round 2 - Player 2 counter-attacks
  console.log("   Player 2 defends!");
  await displayGameState(1);
  await core.connect(player2).defend(1, 4);
  console.log("   Player 2 ends turn\n");
  await core.connect(player2).endTurn(1);

  // Round 3 - Player 1 attacks again
  console.log("   --- Round 3 ---");
  await displayGameState(0);
  console.log("   Player 1 attacks again!");
  await core.connect(player1).attack(1, 0, 4);
  await displayGameState(0);
  console.log("   Player 1 ends turn\n");
  await core.connect(player1).endTurn(1);

  // Final state
  console.log("   --- Final State ---");
  await displayGameState(1);

  const finalState = await core.getGameState(1);
  console.log("═══════════════════════════════════════════");
  console.log("Game Summary:");
  console.log(`├─ Total Turns: ${Number(finalState.turnCount)}`);
  console.log(`├─ Player 1 Hero HP: ${Number(finalState.units[0].hp)}/100`);
  console.log(`├─ Player 2 Hero HP: ${Number(finalState.units[4].hp)}/100`);
  console.log(`└─ Status: Active (can continue playing)`);
  console.log("═══════════════════════════════════════════\n");

  console.log("✅ Demo completed successfully!");
  console.log(`\nTo continue the game, you can call:`);
  console.log(`- core.move(1, unitId, x, y)`);
  console.log(`- core.attack(1, attackerId, targetId)`);
  console.log(`- core.defend(1, unitId)`);
  console.log(`- core.endTurn(1)`);
  console.log(`- core.forfeit(1)`);
}

runDemo()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
