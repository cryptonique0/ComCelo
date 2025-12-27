/**
 * In-game analytics tracking
 * Track player actions, game metrics, and engagement
 */

export interface GameMetrics {
  gamesPlayed: number;
  gamesWon: number;
  totalPlayTime: number;
  charactersFavored: string[];
  lastPlayed: number;
  totalWinRate: number;
}

export interface AnalyticsEvent {
  eventType: string;
  timestamp: number;
  userId?: string;
  metadata?: Record<string, unknown>;
}

const events: AnalyticsEvent[] = [];
const metricsCache = new Map<string, GameMetrics>();

export function trackEvent(eventType: string, metadata?: Record<string, unknown>): void {
  const event: AnalyticsEvent = {
    eventType,
    timestamp: Date.now(),
    metadata,
  };
  events.push(event);
  
  // Keep only last 1000 events in memory
  if (events.length > 1000) {
    events.shift();
  }
}

export function trackGameStart(gameId: string): void {
  trackEvent('game_start', { gameId });
}

export function trackGameEnd(gameId: string, won: boolean): void {
  trackEvent('game_end', { gameId, won });
}

export function trackCharacterSelect(characterName: string): void {
  trackEvent('character_select', { characterName });
}

export function getAnalyticsEvents(): AnalyticsEvent[] {
  return [...events];
}

export function getEventsByType(eventType: string): AnalyticsEvent[] {
  return events.filter(e => e.eventType === eventType);
}

export function getGameMetrics(userId: string): GameMetrics | undefined {
  return metricsCache.get(userId);
}

export function updateGameMetrics(userId: string, metrics: Partial<GameMetrics>): void {
  const current = metricsCache.get(userId) || {
    gamesPlayed: 0,
    gamesWon: 0,
    totalPlayTime: 0,
    charactersFavored: [],
    lastPlayed: 0,
    totalWinRate: 0,
  };

  const updated = { ...current, ...metrics };
  updated.totalWinRate = updated.gamesPlayed > 0 
    ? (updated.gamesWon / updated.gamesPlayed) * 100
    : 0;

  metricsCache.set(userId, updated);
}

export function clearAnalytics(): void {
  events.length = 0;
  metricsCache.clear();
}
