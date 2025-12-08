# ComCelo Frames Documentation

## Overview

ComCelo uses Farcaster Frames to deliver in-feed gameplay. Frames are server-side rendered interactive elements displayed directly in the Farcaster feed.

## Frame Architecture

Frames follow the Farcaster Frame Spec and are implemented as Next.js API routes (`app/api/frames/*`).

### Key Concepts

- **Server-Rendered:** Images generated server-side (PNG/SVG)
- **Stateless:** Frame state passed via URL parameters or hidden inputs
- **Interactive:** Buttons trigger POST requests back to endpoints
- **Composable:** Frames chain together to form a game flow

## Endpoint Structure

```
GET  /api/frames/{action}      → Returns Frame JSON with image
POST /api/frames/{action}      → Processes user action
```

## Frame Response Format

```json
{
  "image": "https://example.com/game-grid.png",
  "post_url": "https://example.com/api/frames/action",
  "buttons": [
    { "label": "Attack", "action": "post" },
    { "label": "Defend", "action": "post" }
  ],
  "input": { "text": "Optional text input" },
  "metadata": { "title": "ComCelo - Your Turn" }
}
```

---

## Implemented Endpoints

### GET /api/frames/start

**Purpose:** Initial Frame - Welcome and start options

**Response:**
```json
{
  "image": "https://placehold.co/600x400/0f172a/67e8f9?text=ComCelo+Frame",
  "post_url": "https://yourdomain.com/api/frames/start",
  "buttons": [
    { "label": "Start Duel", "action": "post" },
    { "label": "Spectate", "action": "post" }
  ],
  "input": { "text": "Enter opponent address" }
}
```

**Buttons:**
- **Start Duel** → POST to same endpoint, validate opponent, create game
- **Spectate** → Navigate to spectator view (future)

### POST /api/frames/start

**Purpose:** Handle "Start Duel" action

**Request Body:**
```json
{
  "untrustedData": {
    "fid": 12345,
    "url": "https://yourapp.com/api/frames/start",
    "messageHash": "...",
    "timestamp": 1234567890,
    "network": 1,
    "buttonIndex": 1,
    "inputText": "0x742d35Cc6634C0532925a3b844Bc0e7b0b1C5cbE",
    "cast": { "hash": "..." }
  },
  "trustedData": { "messageBytes": "..." }
}
```

**Returns:**
- Success: Frame advancing to game lobby (next Frame)
- Error: Frame with error message and retry button

---

## Planned Frame Endpoints

### GET /api/frames/lobby

Display:
- Player 1 & 2 addresses
- Game status (waiting/ready/started)
- Button to start game

### GET /api/frames/grid

Display:
- 3x3 grid visual (SVG)
- Current turn indicator
- Unit positions and HP bars
- Buttons for each possible action

### POST /api/frames/move

Handle unit movement.

### POST /api/frames/attack

Handle unit attack.

### POST /api/frames/defend

Handle defense stance.

### POST /api/frames/endturn

End current player's turn.

### GET /api/frames/result

Display game result and stats.

---

## Image Generation

### Grid Rendering

```typescript
// Pseudocode for 3x3 grid SVG
function renderGrid(gameState: GameState): string {
  const svg = `
    <svg width="600" height="600">
      ${gameState.units.map((unit, i) => `
        <g transform="translate(${unit.x * 200}, ${unit.y * 200})">
          <rect width="200" height="200" stroke="#67e8f9" />
          <text x="100" y="100">${unit.name}</text>
          <rect width="100" height="20" fill="red" />
          <rect width="${(unit.hp / 100) * 100}" height="20" fill="green" />
        </g>
      `)}
    </svg>
  `;
  return svg;
}
```

### Server-Side Rendering

Use `satori` or similar to convert React to PNG:

```typescript
import satori from 'satori';

const svg = await satori(<GameGrid state={gameState} />);
const png = await convertSvgToPng(svg);
```

---

## State Management

### URL Parameters

Game state encoded in Frame URLs for statefulness:

```
/api/frames/grid?gameId=1&turn=1&playerId=0x...
```

### Input Fields

Player inputs (opponent address, move targets) passed via hidden inputs.

### Server Session

(Optional) Store game state server-side with session tokens.

---

## Security

### Signature Verification

Always verify Frame requests using Farcaster's `trustedData`:

```typescript
import { verifyMessage } from '@farcaster/hub-web';

const verified = await verifyMessage(
  Buffer.from(trustedData.messageBytes, 'hex')
);
```

### Rate Limiting

Implement rate limiting to prevent frame spam:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10 // limit each IP to 10 requests per windowMs
});
```

### CSRF Protection

Frames include `cast.hash` for deduplication. Validate it hasn't been seen before.

---

## Testing Frames

### Frame Viewer

Use Warpcast's Frame Validator or similar tools:
- https://warpcast.com/~/composer (post frames)
- Local Frame testing tools

### Mock Requests

```typescript
const mockRequest = {
  untrustedData: {
    fid: 12345,
    url: 'http://localhost:3000/api/frames/start',
    buttonIndex: 1,
    inputText: '0x...',
    timestamp: Date.now(),
    network: 1,
    messageHash: '0x...',
    cast: { hash: '0x...' }
  },
  trustedData: {
    messageBytes: '0x...'
  }
};
```

---

## Best Practices

1. **Keep Frame Cycle Short:** Return results quickly (< 2s)
2. **Clear Visual Feedback:** Show whose turn it is, what's possible
3. **One Action per Frame:** Simplify decision trees
4. **Fallback Images:** Pre-generate common states, cache aggressively
5. **Error Handling:** Always provide "back" or "retry" buttons
6. **Mobile-First:** Test on phone-sized viewports (375px)

---

## Example: Full Game Flow

```
1. GET /frames/start
   → "Start Duel" or "Spectate"

2. POST /frames/start (input: opponent)
   → Validate opponent, create game
   → GET /frames/lobby

3. GET /frames/lobby
   → "Ready?" button (both must confirm)
   → POST /frames/lobby

4. POST /frames/lobby
   → Initialize units, start game
   → GET /frames/grid?gameId=1&turn=1

5. GET /frames/grid
   → Show 3x3 grid
   → Show buttons: "Move", "Attack", "Defend", "End Turn"

6. POST /frames/move (input: target position)
   → Validate move, update state
   → GET /frames/grid (next turn or opponent's turn)

7. ... (repeat moves until game ends) ...

8. GET /frames/result
   → Show winner, stats
   → "Play Again?" button
```

---

## Future Enhancements

- [ ] Live spectator Frame (read-only view)
- [ ] Animated moves (Frame carousel)
- [ ] Leaderboard Frame
- [ ] Tournament bracket Frame
- [ ] Replay Frame (move-by-move)
- [ ] Profile Frame (match history)

---

## Debugging

### Enable Frame Debug Mode

```typescript
const DEBUG = process.env.NODE_ENV === 'development';

export async function GET(request: Request) {
  if (DEBUG) console.log('Frame request:', request.url);
  // ...
}
```

### Common Issues

| Issue | Solution |
|-------|----------|
| Image not loading | Check CORS headers, use absolute URLs |
| Button not working | Verify post_url is correct and POST handler exists |
| Frame validation error | Use Frame Validator tool, check message format |
| Slow rendering | Pre-generate images, use caching headers |

---

## Resources

- [Farcaster Frame Spec](https://docs.farcaster.xyz/reference/frames/spec)
- [Frame Tools & Validators](https://docs.farcaster.xyz/reference/frames/tools)
- [satori (React to SVG/PNG)](https://github.com/vercel/satori)
- [ethers.js](https://docs.ethers.org/)
