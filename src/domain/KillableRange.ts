import { RevealedBoardSlot } from "./BoardUpdate";
import { Player } from "./Player";

export enum Direction {
  ORTHOGONAL = "orthogonal",
  DIAGONAL = "diagonal",
  ALL = "all",
}

interface GetDiagonalSlotOptions {
  x: number;
  y: number;
  killRange: number;
  coefficientX: number;
  coefficientY: number;
  boardSize: number;
}

export class KillableRangeComputer {
  getRangeLimitSlotsForPlayer(
    boardSize: number,
    slots: RevealedBoardSlot[],
    player: Player,
  ) {
    const killers = this.getPlayerKillers(slots, player);
    const result: { x: number; y: number }[] = [];

    for (const killer of killers) {
      const resolver = killer.piece!.direction === Direction.ORTHOGONAL
        ? new OrthogonalKillableRange()
        : new DiagonalKillableRange();

      const slots = resolver.getRangeLimitSlotsForKiller(boardSize, killer);
      result.push(...slots);
    }

    return result;
  }

  getPlayerKillers(slots: RevealedBoardSlot[], player: Player) {
    return slots.filter((slot) =>
      slot.piece && slot.piece.playerId === player.id &&
      slot.piece.killRange > 0
    );
  }
}

export abstract class KillableRange {
  abstract getRangeLimitSlotsForKiller(
    boardSize: number,
    killer: RevealedBoardSlot,
  ): { x: number; y: number }[];

  coerceIn(options: { target: number; min: number; max: number }) {
    const coercedUp = Math.min(options.max, options.target);
    const coerced = Math.max(options.min, coercedUp);
    return coerced;
  }
}

export class OrthogonalKillableRange extends KillableRange {
  getRangeLimitSlotsForKiller(
    boardSize: number,
    killer: RevealedBoardSlot,
  ): { x: number; y: number }[] {
    const { x, y } = killer;
    const range = killer.piece!.killRange;
    const bounds = { min: 0, max: boardSize - 1 };

    return [
      {
        x: super.coerceIn({ target: x + range, ...bounds }),
        y,
      },
      {
        x,
        y: super.coerceIn({ target: y + range, ...bounds }),
      },
      {
        x: super.coerceIn({ target: x - range, ...bounds }),
        y,
      },
      {
        x,
        y: super.coerceIn({ target: y - range, ...bounds }),
      },
    ].filter((slot) => slot.x != killer.x || slot.y != killer.y);
  }
}

export class DiagonalKillableRange extends KillableRange {
  getRangeLimitSlotsForKiller(
    boardSize: number,
    killer: RevealedBoardSlot,
  ): { x: number; y: number }[] {
    const { x, y } = killer;
    const killRange = killer.piece!.killRange;

    return [
      this.getDiagonalSlot({
        x,
        y,
        killRange,
        coefficientX: 1,
        coefficientY: 1,
        boardSize,
      }),
      this.getDiagonalSlot({
        x,
        y,
        killRange,
        coefficientX: 1,
        coefficientY: -1,
        boardSize,
      }),
      this.getDiagonalSlot({
        x,
        y,
        killRange,
        coefficientX: -1,
        coefficientY: 1,
        boardSize,
      }),
      this.getDiagonalSlot({
        x,
        y,
        killRange,
        coefficientX: -1,
        coefficientY: -1,
        boardSize,
      }),
    ].filter((it) => it !== null) as RevealedBoardSlot[];
  }

  getDiagonalSlot(
    options: GetDiagonalSlotOptions,
    initialX = options.x,
    initialY = options.y,
  ): { x: number; y: number } | null {
    const { x, y, boardSize, killRange, coefficientX, coefficientY } = options;
    const min = 0;
    const max = boardSize - 1;

    const slotX = x + (killRange * coefficientX);
    const slotY = y + (killRange * coefficientY);
    const isSelf = slotX === initialX && slotY === initialY;

    if (isSelf) {
      return null;
    }

    const isOutOfBoard = slotX > max || slotX < min || slotY > max ||
      slotY < min;

    if (isOutOfBoard) {
      return this.getDiagonalSlot(
        {
          x: x - (1 * coefficientX),
          y: y - (1 * coefficientY),
          killRange,
          coefficientX,
          coefficientY,
          boardSize,
        },
        initialX,
        initialY,
      );
    }

    return { x: slotX, y: slotY };
  }
}
