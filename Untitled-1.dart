diff --git a/package.json b/package.json
--- a/package.json
+++ b/package.json
@@
-  "dependencies": {},
+  "dependencies": {
+    "@openzeppelin/contracts": "^4.9.5"
+  },
diff --git a/contracts/ComCeloCore.sol b/contracts/ComCeloCore.sol
new file mode 100644
--- /dev/null
+++ b/contracts/ComCeloCore.sol
+// SPDX-License-Identifier: MIT
+pragma solidity ^0.8.23;
+
+import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
+import {Pausable} from "@openzeppelin/contracts/security/Pausable.sol";
+import {ReentrancyGuard} from "@openzeppelin/contracts/security/ReentrancyGuard.sol";
+
+/// @title ComCeloCore
+/// @notice Core game logic and storage for ComCelo tactical duels on Celo.
+contract ComCeloCore is Ownable, Pausable, ReentrancyGuard {
+    error NotImplemented();
+
+    enum GameStatus {
+        None,
+        WaitingForOpponent,
+        Active,
+        Finished,
+        Cancelled
+    }
+
+    struct GameOptions {
+        bool ranked;
+        uint8 maxTurns;
+        uint256 stake;
+    }
+
+    struct UnitState {
+        uint8 hp;
+        uint8 attack;
+        uint8 defense;
+        uint8 range;
+        uint8 x;
+        uint8 y;
+        bool defended;
+    }
+
+    struct GameState {
+        GameStatus status;
+        address player1;
+        address player2;
+        uint8 currentTurn;
+        uint256 turnCount;
+        UnitState[9] units;
+    }
+
+    mapping(uint256 => GameState) internal games;
+    uint256 internal nextGameId;
+
+    event GameCreated(uint256 indexed gameId, address indexed creator, address indexed opponent, GameOptions options);
+    event GameStarted(uint256 indexed gameId, address player1, address player2);
+    event UnitMoved(uint256 indexed gameId, uint8 unitId, uint8 newX, uint8 newY);
+    event UnitAttacked(uint256 indexed gameId, uint8 attackerId, uint8 targetId, uint8 damage);
+    event UnitDefended(uint256 indexed gameId, uint8 unitId);
+    event SkillUsed(uint256 indexed gameId, uint8 unitId, uint8 skillId, bytes params);
+    event TurnEnded(uint256 indexed gameId, uint8 turn);
+    event GameFinished(uint256 indexed gameId, address winner);
+
+    constructor() {}
+
+    function createGame(address opponent, GameOptions calldata options) external whenNotPaused returns (uint256 gameId) {
+        opponent;
+        options;
+        gameId = ++nextGameId;
+        emit GameCreated(gameId, msg.sender, opponent, options);
+        revert NotImplemented();
+    }
+
+    function joinGame(uint256 gameId) external whenNotPaused {
+        gameId;
+        revert NotImplemented();
+    }
+
+    function startGame(uint256 gameId) external whenNotPaused {
+        gameId;
+        revert NotImplemented();
+    }
+
+    function move(uint256 gameId, uint8 unitId, uint8 newX, uint8 newY) external whenNotPaused nonReentrant {
+        gameId;
+        unitId;
+        newX;
+        newY;
+        revert NotImplemented();
+    }
+
+    function attack(uint256 gameId, uint8 attackerId, uint8 targetId) external whenNotPaused nonReentrant {
+        gameId;
+        attackerId;
+        targetId;
+        revert NotImplemented();
+    }
+
+    function defend(uint256 gameId, uint8 unitId) external whenNotPaused nonReentrant {
+        gameId;
+        unitId;
+        revert NotImplemented();
+    }
+
+    function useSkill(uint256 gameId, uint8 unitId, uint8 skillId, bytes calldata params) external whenNotPaused nonReentrant {
+        gameId;
+        unitId;
+        skillId;
+        params;
+        revert NotImplemented();
+    }
+
+    function endTurn(uint256 gameId) external whenNotPaused {
+        gameId;
+        revert NotImplemented();
+    }
+
+    function forfeit(uint256 gameId) external whenNotPaused {
+        gameId;
+        revert NotImplemented();
+    }
+
+    function getGameState(uint256 gameId) external view returns (GameState memory) {
+        gameId;
+        revert NotImplemented();
+    }
+}