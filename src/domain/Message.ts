import { Constants } from "./Constants";
import { OtherPlayer } from "./Player";
import { RevealedBoardSlot } from "./RevealedBoardSlot";

abstract class Message {
  constructor(public readonly key: string, protected content: string) {}
}

export abstract class SendableMessage<T> extends Message {
  abstract setContent(data: T): Message;

  build(): string {
    return `${this.key}:${this.content}`;
  }
}

export abstract class ReceiveableMessage<T> extends Message {
  abstract getContent(): T;
}

interface HandshakeMessageOptions {
  playerId: string;
  playerName: string;
}

interface MoveMessageOptions {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
}

export class HandshakeMessage extends SendableMessage<HandshakeMessageOptions> {
  constructor() {
    super(Constants.MESSAGE_HANDSHAKE_KEY, "");
  }

  setContent(data: HandshakeMessageOptions): HandshakeMessage {
    super.content = `${data.playerId},${data.playerName}`;
    return this;
  }
}

export class MoveMessage extends SendableMessage<MoveMessageOptions> {
  constructor() {
    super(Constants.MESSAGE_MOVE_KEY, "");
  }

  setContent(data: MoveMessageOptions): MoveMessage {
    super.content = Object.values(data).join(",");
    return this;
  }
}

export class BoardUpdateMessage
  extends ReceiveableMessage<RevealedBoardSlot[]> {
  getContent(): RevealedBoardSlot[] {
    return JSON.parse(this.content.replaceAll("@", ":"));
  }
}

export class NewTurnMessage extends ReceiveableMessage<string> {
  getContent(): string {
    return this.content;
  }
}

export class PlayersMessage extends ReceiveableMessage<OtherPlayer[]> {
  getContent(): OtherPlayer[] {
    let index = 0;
    console.log(this.content)
    return this.content.split(",").map((playerString) => {
      const [id, name] = playerString.split("|");
      return { id, name, color: Constants.PLAYER_COLORS[index++] };
    });
  }
}
