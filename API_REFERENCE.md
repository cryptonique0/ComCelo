# ComCelo API Reference

## Overview

ComCelo provides a complete REST API for managing games, players, tournaments, and shop interactions. All endpoints return JSON responses with standardized success/error formats.

## Base URL

```
Production: https://comcelo.vercel.app/api
Development: http://localhost:3000/api
```

## Response Format

All API responses follow this standard format:

```json
{
  "success": true,
  "data": {},
  "message": "Optional success message",
  "error": "Optional error message"
}
```

---

## Authentication

Currently, endpoints use address-based authentication. In production, implement:

- Farcaster Frame signature verification
- Wallet signature validation (EIP-191)
- JWT tokens for session management

Example header:
```
Authorization: Bearer <signature>
X-User-Address: 0x...
```

---

## Games

### GET /api/games

List games with optional filters.

**Query Parameters:**
- `player` (string, optional) - Filter by player address
- `status` (string, optional) - Filter by status: `pending`, `active`, `finished`
- `limit` (number, default: 10) - Results per page
- `offset` (number, default: 0) - Pagination offset

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/games?player=0x123...&status=active&limit=20"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "player1": "0x1234...",
      "player2": "0x5678...",
      "status": "active",
      "mode": "ranked",
      "roundNumber": 3,
      "currentTurn": "player2",
      "createdAt": "2024-12-08T10:00:00Z",
      "updatedAt": "2024-12-08T10:15:00Z"
    }
  ],
  "total": 42,
  "count": 10,
  "page": 1,
  "hasMore": true
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid parameters
- `500 Internal Server Error` - Server error

---

### POST /api/games

Create a new game.

**Request Body:**
```json
{
  "player1": "0x1234567890...",
  "opponent": "0x0987654321...",
  "mode": "ranked",
  "stake": 0
}
```

**Parameters:**
- `player1` (string, required) - Creator address
- `opponent` (string, required) - Opponent address
- `mode` (string, optional) - `ranked` or `casual` (default: `casual`)
- `stake` (number, optional) - Game stake in CELO (default: 0)

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/games" \
  -H "Content-Type: application/json" \
  -d '{
    "player1": "0x123...",
    "opponent": "0x456...",
    "mode": "ranked"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "42",
    "player1": "0x123...",
    "player2": "0x456...",
    "status": "pending",
    "mode": "ranked",
    "stake": 0,
    "roundNumber": 0,
    "currentTurn": "player1",
    "createdAt": "2024-12-08T10:20:00Z",
    "updatedAt": "2024-12-08T10:20:00Z"
  },
  "message": "Game created successfully. Waiting for opponent acceptance."
}
```

**Status Codes:**
- `201 Created` - Game created
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

---

### GET /api/games/[id]

Fetch detailed game state.

**URL Parameters:**
- `id` (string, required) - Game ID

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/games/1"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "gameId": "0x123abc...",
    "status": "active",
    "player1": {
      "address": "0x1234...",
      "hero": {
        "hp": 100,
        "maxHp": 100,
        "x": 0,
        "y": 0,
        "type": "hero",
        "defended": false
      },
      "soldiers": [
        {
          "hp": 40,
          "maxHp": 40,
          "x": 1,
          "y": 0,
          "type": "soldier",
          "defended": false
        }
      ],
      "archer": {
        "hp": 30,
        "maxHp": 30,
        "x": 0,
        "y": 1,
        "type": "archer",
        "defended": false
      }
    },
    "player2": { /* similar structure */ },
    "currentTurn": "player2",
    "roundNumber": 1,
    "turnCount": 5,
    "moveHistory": [
      {
        "round": 1,
        "player": "player1",
        "action": "move",
        "unit": "hero",
        "from": { "x": 0, "y": 0 },
        "to": { "x": 1, "y": 0 }
      }
    ]
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid game ID
- `404 Not Found` - Game not found
- `500 Internal Server Error` - Server error

---

### PATCH /api/games/[id]

Update game state (accept, forfeit, pause).

**URL Parameters:**
- `id` (string, required) - Game ID

**Request Body:**
```json
{
  "action": "accept",
  "player": "player1"
}
```

**Actions:**
- `accept` - Accept game invitation
- `forfeit` - Forfeit the game
- `pause` - Pause active game

**Example Request:**
```bash
curl -X PATCH "http://localhost:3000/api/games/1" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "accept",
    "player": "player2"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "status": "active",
    "updatedAt": "2024-12-08T10:25:00Z"
  },
  "message": "Game accept successful"
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid action or parameters
- `404 Not Found` - Game not found
- `500 Internal Server Error` - Server error

---

## Players

### GET /api/players/[address]

Fetch player profile and statistics.

**URL Parameters:**
- `address` (string, required) - Player's Ethereum address

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/players/0x1234567890123456789012345678901234567890"
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x1234567890123456789012345678901234567890",
    "username": "Champion_Alpha",
    "totalMatches": 127,
    "wins": 89,
    "losses": 38,
    "eloRating": 1847,
    "currentStreak": 8,
    "bestStreak": 12,
    "achievements": 6,
    "joinedAt": "2024-11-15T00:00:00Z",
    "lastActiveAt": "2024-12-08T10:30:00Z",
    "bio": "🎮 Tactical Master | 🏆 Season 3 Top 100"
  }
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Invalid address
- `500 Internal Server Error` - Server error

---

### PATCH /api/players/[address]

Update player profile.

**URL Parameters:**
- `address` (string, required) - Player's Ethereum address

**Request Body:**
```json
{
  "username": "NewUsername",
  "bio": "Updated bio",
  "profileImageUrl": "https://example.com/avatar.png"
}
```

**Validation:**
- Username: 3-32 characters
- Bio: Up to 256 characters
- Image URL: Valid HTTPS URL

**Example Request:**
```bash
curl -X PATCH "http://localhost:3000/api/players/0x1234..." \
  -H "Content-Type: application/json" \
  -d '{
    "username": "NewName",
    "bio": "Strategic player, love tactical games"
  }'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "address": "0x1234...",
    "username": "NewName",
    "bio": "Strategic player, love tactical games"
  },
  "message": "Profile updated successfully"
}
```

**Status Codes:**
- `200 OK` - Success
- `400 Bad Request` - Validation error
- `500 Internal Server Error` - Server error

---

## Leaderboard

### GET /api/leaderboard

Fetch ranked leaderboard.

**Query Parameters:**
- `timeframe` (string, optional) - `all`, `season`, `month` (default: `season`)
- `limit` (number, optional) - Results per page (default: 100)
- `offset` (number, optional) - Pagination offset (default: 0)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/leaderboard?timeframe=season&limit=50"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "address": "0x7c89...a3f2",
      "username": "TopPlayer",
      "wins": 127,
      "losses": 23,
      "eloRating": 1847,
      "streak": 8,
      "achievements": 7
    }
  ],
  "total": 4127,
  "timeframe": "season",
  "seasonEnd": "2024-12-31T23:59:59Z"
}
```

---

## Tournaments

### GET /api/tournaments

List active and upcoming tournaments.

**Query Parameters:**
- `status` (string, optional) - `active`, `upcoming`, `finished`
- `limit` (number, optional) - Results per page (default: 10)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/tournaments?status=active"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Summer Championship 2024",
      "status": "active",
      "maxPlayers": 64,
      "enteredPlayers": 32,
      "prizePool": "1000 CELO",
      "entryFee": "10 CELO",
      "startDate": "2024-12-01T00:00:00Z",
      "endDate": "2024-12-31T23:59:59Z",
      "format": "single-elimination"
    }
  ],
  "total": 3
}
```

---

### POST /api/tournaments/[id]/register

Register for a tournament.

**URL Parameters:**
- `id` (string, required) - Tournament ID

**Request Body:**
```json
{
  "player": "0x1234567890..."
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/tournaments/1/register" \
  -H "Content-Type: application/json" \
  -d '{
    "player": "0x1234..."
  }'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "tournamentId": "1",
    "player": "0x1234...",
    "registeredAt": "2024-12-08T10:35:00Z"
  },
  "message": "Successfully registered for tournament"
}
```

---

## Shop

### GET /api/shop

List available shop items.

**Query Parameters:**
- `category` (string, optional) - `skin`, `icon`, `emote`, `consumable`
- `limit` (number, optional) - Results per page (default: 20)
- `offset` (number, optional) - Pagination offset (default: 0)

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/shop?category=skin"
```

**Example Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "Cosmic Aura Skin",
      "category": "skin",
      "description": "Shine like a star",
      "price": "10 CELO",
      "image": "https://...",
      "supply": 100,
      "sold": 23,
      "available": true
    }
  ],
  "total": 15,
  "count": 5
}
```

---

## Actions

### POST /api/actions/move

Execute a move action in an active game.

**Request Body:**
```json
{
  "gameId": "1",
  "player": "player1",
  "unitIndex": 0,
  "toX": 1,
  "toY": 1
}
```

**Example Request:**
```bash
curl -X POST "http://localhost:3000/api/actions/move" \
  -H "Content-Type: application/json" \
  -d '{
    "gameId": "1",
    "player": "player1",
    "unitIndex": 0,
    "toX": 1,
    "toY": 1
  }'
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "gameId": "1",
    "action": "move",
    "unitIndex": 0,
    "from": { "x": 0, "y": 0 },
    "to": { "x": 1, "y": 1 },
    "txHash": "0x123abc..."
  },
  "message": "Unit moved successfully"
}
```

---

### POST /api/actions/attack

Execute an attack action.

**Request Body:**
```json
{
  "gameId": "1",
  "player": "player1",
  "attackerIndex": 0,
  "targetIndex": 4,
  "targetPlayer": "player2"
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "gameId": "1",
    "action": "attack",
    "attacker": {
      "index": 0,
      "attack": 25
    },
    "target": {
      "index": 4,
      "defense": 10,
      "hpBefore": 100,
      "hpAfter": 85
    },
    "damage": 15,
    "txHash": "0x456def..."
  }
}
```

---

### POST /api/actions/endturn

End current turn and switch to opponent.

**Request Body:**
```json
{
  "gameId": "1",
  "player": "player1"
}
```

**Example Response:**
```json
{
  "success": true,
  "data": {
    "gameId": "1",
    "action": "endTurn",
    "previousTurn": "player1",
    "currentTurn": "player2",
    "roundNumber": 2,
    "txHash": "0x789ghi..."
  },
  "message": "Turn ended. Now player2's turn."
}
```

---

## Health & Status

### GET /api/health

Check API and contract health.

**Example Request:**
```bash
curl -X GET "http://localhost:3000/api/health"
```

**Example Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-12-08T10:40:00Z",
  "network": {
    "name": "Celo Alfajores",
    "chainId": 44787,
    "blockNumber": 25641823,
    "rpc": "https://alfajores-forno.celo-testnet.org"
  },
  "contracts": {
    "ComCeloCore": "0x123...",
    "ComCeloUnits": "0x456...",
    "ComCeloMatchmaker": "0x789..."
  }
}
```

---

## Error Handling

### Common Error Codes

| Code | Message | Solution |
|------|---------|----------|
| 400 | Invalid parameters | Check request body/query parameters |
| 401 | Unauthorized | Verify signature or token |
| 404 | Not found | Verify resource ID |
| 429 | Too many requests | Implement rate limiting client-side |
| 500 | Server error | Retry or contact support |

### Example Error Response

```json
{
  "success": false,
  "error": "Invalid game ID",
  "code": "INVALID_GAME_ID"
}
```

---

## Rate Limiting

Current limits (subject to change):
- **Public endpoints:** 100 requests per minute per IP
- **Authenticated endpoints:** 1000 requests per minute per user

---

## Pagination

Paginated endpoints support:
- `limit` - Results per page (max: 100)
- `offset` - Number of results to skip
- `page` - Computed page number (read-only)
- `hasMore` - Boolean indicating more results exist

---

## Timestamps

All timestamps are in ISO 8601 format (UTC):
```
2024-12-08T10:40:00Z
```

---

## Code Examples

### JavaScript/TypeScript with fetch

```typescript
// Create a game
const response = await fetch('/api/games', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    player1: '0x123...',
    opponent: '0x456...',
    mode: 'ranked'
  })
});

const { success, data, error } = await response.json();
if (success) {
  console.log('Game created:', data);
} else {
  console.error('Error:', error);
}
```

### Fetch Player Profile

```typescript
const playerAddress = '0x1234567890123456789012345678901234567890';
const response = await fetch(`/api/players/${playerAddress}`);
const { data: profile } = await response.json();

console.log(`${profile.username}: ${profile.eloRating} ELO`);
```

---

## Support

For API issues:
- GitHub Issues: https://github.com/cryptonique0/ComCelo/issues
- Email: abdulganiyu838@gmail.com

