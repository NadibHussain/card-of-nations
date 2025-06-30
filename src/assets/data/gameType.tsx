export interface Nation {
  id: string;
  name: string;
  flag: string;
  color: string;
}

export interface Player {
  userId: string;
  playerName: string;
  nationId: string;
  isHost: boolean;
  ready: boolean;
  position?: {
    x: number;
    y: number;
  };
}

export interface Game {
  id: string;
  name: string;
  players: Player[];
  status: 'waiting' | 'active' | 'finished';
  config: {
    totalYears: number;
    maxPlayers: number;
    currentYear: number;
  };
  // ... other game fields
}