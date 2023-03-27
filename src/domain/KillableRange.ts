import { BoardPiece } from "./BoardPiece";
import { RevealedBoardSlot } from "./BoardUpdate";
import { Constants } from "./Constants";

export enum Direction {
  ORTHOGONAL,
  DIAGONAL,
  ALL,
}

export class KillableRange {
  getRangeLimitSlots(slot: RevealedBoardSlot): { x: number; y: number }[] {
    if (!slot.piece) {
      return [];
    }

    const slots: { x: number; y: number }[] = [];
    const boardSize = Constants.BOARD_SIZE;
    const range = slot.piece.killRange;

    // if (this.direction === Direction.ORTHOGONAL) {
      const left = Math.max(0, slot.x - range);
      const right = Math.min(slot.x + range, boardSize);

      slots.push({ x: left, y: slot.y }, { x: right, y: slot.y });

      const top = Math.max(0, slot.y - range);
      const bottom = Math.min(slot.y + range, boardSize);

      slots.push({ x: slot.x, y: top }, { x: slot.x, y: bottom });

      return slots.filter((slot) => slot.x !== slot.x && slot.y !== slot.y);
    // }

    return slots;
  }
}
