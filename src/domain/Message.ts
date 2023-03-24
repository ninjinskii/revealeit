import { Constants } from "./Constants";
import { RevealedBoardSlot } from "./RevealedBoardSlot";

export abstract class Message {
  constructor(public readonly key: string, protected content: string) {}

  build(): string {
    return `${this.key}:${this.content}`;
  }
}

export abstract class SendableMessage<T> extends Message {
  abstract setContent(data: T): Message;
}

export abstract class ReceiveableMessage<T> extends Message {
  abstract getContent(): T;
}

export interface HandshakeMessageOptions {
  playerId: string;
}

export interface MoveMessageOptions {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export class HandshakeMessage extends SendableMessage<HandshakeMessageOptions> {
  constructor() {
    super(Constants.MESSAGE_HANDSHAKE_KEY, "");
  }

  setContent(data: HandshakeMessageOptions): Message {
    super.content = data.playerId;
    return this;
  }
}

export class MoveMessage extends SendableMessage<MoveMessageOptions> {
  constructor() {
    super(Constants.MESSAGE_MOVE_KEY, "");
  }

  setContent(data: MoveMessageOptions): Message {
    super.content = Object.values(data).join(",");
    return this;
  }
}

export class BoardUpdateMessage extends ReceiveableMessage<RevealedBoardSlot[]> {
  getContent(): RevealedBoardSlot[] {
      return []
  }
}
