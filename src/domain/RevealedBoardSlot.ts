import { BoardPiece } from "./BoardPiece";

export interface RevealedBoardSlot {
  x: number;
  y: number;
  piece: BoardPiece | null;
}
