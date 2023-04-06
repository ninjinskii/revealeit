import { RevealedBoardSlot } from "./BoardUpdate";
import { Player } from "./Player";

export enum Direction {
  ORTHOGONAL,
  DIAGONAL,
  ALL,
}

export abstract class KillableRange {
  abstract getRangeLimitSlotsForPlayer(
    boardSize: number,
    slots: RevealedBoardSlot[],
    player: Player,
  ): { x: number; y: number }[];

  getPlayerKillers(slots: RevealedBoardSlot[], player: Player) {
    return slots.filter((slot) =>
      slot.piece && slot.piece.playerId === player.id &&
      slot.piece.killRange > 0
    );
  }

  coerceIn(options: { target: number; min: number; max: number }) {
    const coercedUp = Math.min(options.max, options.target);
    const coerced = Math.max(options.min, coercedUp);
    return coerced;
  }
}

export class OrthogonalKillableRange extends KillableRange {
  getRangeLimitSlotsForPlayer(
    boardSize: number,
    slots: RevealedBoardSlot[],
    player: Player,
  ): { x: number; y: number }[] {
    const killers = super.getPlayerKillers(slots, player);
    const result: { x: number; y: number }[] = [];

    for (const killer of killers) {
      const { x, y } = killer;
      const range = killer.piece!.killRange;
      const bounds = { min: 0, max: boardSize - 1 };

      result.push(...[
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
      ].filter((slot) => slot.x != killer.x || slot.y != killer.y));
    }

    return result;
  }
}
