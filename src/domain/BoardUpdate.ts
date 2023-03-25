import { BoardPiece } from "./BoardPiece";

export interface BoardUpdate {
  revealed: RevealedBoardSlot[];
  killable: RevealedBoardSlot[];
}

export interface RevealedBoardSlot {
  x: number;
  y: number;
  piece: BoardPiece | null;
}
