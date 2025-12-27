// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

/**
 * @title ComCeloBaseSimple
 * @notice Simplified ComCelo contract for Base deployment via Remix
 * @dev Ready-to-deploy contract with common game functions
 */
contract ComCeloBaseSimple {
    // Events
    event Ping(address indexed sender, uint256 timestamp);
    event PlayerRegistered(address indexed player, string username);
    event GameCreated(uint256 indexed gameId, address indexed creator);
    event GameJoined(uint256 indexed gameId, address indexed player);
    event DataStored(address indexed user, string data);

    // State variables
    address public owner;
    uint256 public gameCounter;
    uint256 public playerCount;
    
    struct Player {
        string username;
        uint256 gamesPlayed;
        uint256 registeredAt;
        bool isRegistered;
    }
    
    struct Game {
        uint256 id;
        address creator;
        address opponent;
        uint256 createdAt;
        bool isActive;
    }
    
    mapping(address => Player) public players;
    mapping(address => string) public userData;
    mapping(uint256 => Game) public games;
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyRegistered() {
        require(players[msg.sender].isRegistered, "Not registered");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        gameCounter = 0;
        playerCount = 0;
    }
    
    /**
     * @notice Simple ping function for testing
     * @return success Always returns true
     */
    function ping() external returns (bool success) {
        emit Ping(msg.sender, block.timestamp);
        return true;
    }
    
    /**
     * @notice Register a new player
     * @param _username Player's username
     */
    function registerPlayer(string memory _username) external {
        require(!players[msg.sender].isRegistered, "Already registered");
        require(bytes(_username).length > 0, "Username required");
        
        players[msg.sender] = Player({
            username: _username,
            gamesPlayed: 0,
            registeredAt: block.timestamp,
            isRegistered: true
        });
        
        playerCount++;
        emit PlayerRegistered(msg.sender, _username);
    }
    
    /**
     * @notice Create a new game
     * @return gameId The ID of the created game
     */
    function createGame() external onlyRegistered returns (uint256 gameId) {
        gameCounter++;
        gameId = gameCounter;
        
        games[gameId] = Game({
            id: gameId,
            creator: msg.sender,
            opponent: address(0),
            createdAt: block.timestamp,
            isActive: true
        });
        
        emit GameCreated(gameId, msg.sender);
        return gameId;
    }
    
    /**
     * @notice Join an existing game
     * @param _gameId The game ID to join
     */
    function joinGame(uint256 _gameId) external onlyRegistered {
        Game storage game = games[_gameId];
        require(game.isActive, "Game not active");
        require(game.opponent == address(0), "Game full");
        require(game.creator != msg.sender, "Cannot join own game");
        
        game.opponent = msg.sender;
        players[msg.sender].gamesPlayed++;
        players[game.creator].gamesPlayed++;
        
        emit GameJoined(_gameId, msg.sender);
    }
    
    /**
     * @notice Store arbitrary data for a user
     * @param _data String data to store
     */
    function storeData(string memory _data) external {
        userData[msg.sender] = _data;
        emit DataStored(msg.sender, _data);
    }
    
    /**
     * @notice Get stored data for a user
     * @param _user Address to query
     * @return data The stored data
     */
    function getData(address _user) external view returns (string memory data) {
        return userData[_user];
    }
    
    /**
     * @notice Get player info
     * @param _player Address to query
     * @return username Player's username
     * @return gamesPlayed Number of games played
     * @return registeredAt Registration timestamp
     * @return isRegistered Registration status
     */
    function getPlayer(address _player) external view returns (
        string memory username,
        uint256 gamesPlayed,
        uint256 registeredAt,
        bool isRegistered
    ) {
        Player memory p = players[_player];
        return (p.username, p.gamesPlayed, p.registeredAt, p.isRegistered);
    }
    
    /**
     * @notice Get game info
     * @param _gameId Game ID to query
     * @return id Game ID
     * @return creator Creator address
     * @return opponent Opponent address
     * @return createdAt Creation timestamp
     * @return isActive Active status
     */
    function getGame(uint256 _gameId) external view returns (
        uint256 id,
        address creator,
        address opponent,
        uint256 createdAt,
        bool isActive
    ) {
        Game memory g = games[_gameId];
        return (g.id, g.creator, g.opponent, g.createdAt, g.isActive);
    }
    
    /**
     * @notice Transfer ownership
     * @param newOwner New owner address
     */
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
    
    /**
     * @notice Get contract stats
     * @return totalGames Total games created
     * @return totalPlayers Total registered players
     * @return contractOwner Owner address
     */
    function getStats() external view returns (
        uint256 totalGames,
        uint256 totalPlayers,
        address contractOwner
    ) {
        return (gameCounter, playerCount, owner);
    }
}
