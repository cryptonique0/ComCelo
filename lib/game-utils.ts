/**
 * Utility functions for game state and rendering
 */

export interface GameUnit {
  hp: number;
  attack: number;
  defense: number;
  range: number;
  x: number;
  y: number;
  defended: boolean;
}

export interface GameStateData {
  status: number;
  player1: string;
  player2: string;
  currentTurn: number;
  turnCount: number;
  units: GameUnit[];
}

export const UNIT_TYPES = {
  HERO: 0,
  SOLDIER_1: 1,
  SOLDIER_2: 2,
  ARCHER: 3,
};

export const OPPONENT_UNITS = {
  HERO: 4,
  SOLDIER_1: 5,
  SOLDIER_2: 6,
  ARCHER: 7,
};

export const UNIT_NAMES: Record<number, string> = {
  0: "Hero",
  1: "Soldier",
  2: "Soldier",
  3: "Archer",
  4: "Hero",
  5: "Soldier",
  6: "Soldier",
  7: "Archer",
};

export const UNIT_ICONS: Record<number, string> = {
  0: "🦸",
  1: "🛡️",
  2: "🛡️",
  3: "🏹",
  4: "🦸",
  5: "🛡️",
  6: "🛡️",
  7: "🏹",
};

export function manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export function isUnitInRange(attacker: GameUnit, target: GameUnit): boolean {
  return manhattanDistance(attacker.x, attacker.y, target.x, target.y) <= attacker.range;
}

export function canMoveToPosition(current: GameUnit, newX: number, newY: number): boolean {
  if (newX < 0 || newX > 2 || newY < 0 || newY > 2) return false;
  const distance = manhattanDistance(current.x, current.y, newX, newY);
  return distance > 0 && distance <= 2;
}

export function calculateDamage(attacker: GameUnit, defender: GameUnit): number {
  let baseDamage = Math.max(1, attacker.attack - defender.defense);
  if (defender.defended) {
    baseDamage = Math.floor(baseDamage / 2);
  }
  return baseDamage;
}

export function getGridCell(x: number, y: number): string {
  return `${x},${y}`;
}

export function renderGridToSVG(units: GameUnit[]): string {
  const cellSize = 100;
  const grid = Array(3)
    .fill(null)
    .map((_, y) =>
      Array(3)
        .fill(null)
        .map((_, x) => {
          const unit = units.find((u) => u.x === x && u.y === y);
          const bgColor = (x + y) % 2 === 0 ? "#1e293b" : "#0f172a";

          return `
        <g transform="translate(${x * cellSize}, ${y * cellSize})">
          <rect width="${cellSize}" height="${cellSize}" fill="${bgColor}" stroke="#64748b" stroke-width="2"/>
          ${
            unit
              ? `
            <text x="${cellSize / 2}" y="${cellSize / 2 - 10}" font-size="32" text-anchor="middle" dominant-baseline="middle">
              ${UNIT_ICONS[units.indexOf(unit)]}
            </text>
            <text x="${cellSize / 2}" y="${cellSize - 20}" font-size="16" fill="#67e8f9" text-anchor="middle">
              HP: ${unit.hp}
            </text>
          `
              : ""
          }
        </g>
      `;
        })
        .join("")
    )
    .join("");

  return `
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          text { font-family: monospace; }
        </style>
      </defs>
      <rect width="300" height="300" fill="#0a0d14"/>
      ${grid}
    </svg>
  `;
}
