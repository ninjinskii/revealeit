import { Direction } from "./KillableRange";

export interface BoardPiece {
  name: string;
  playerId: string;
  killRange: number;
  direction: Direction;
}
