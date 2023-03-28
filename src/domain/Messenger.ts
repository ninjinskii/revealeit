import { Constants } from "./Constants";
import {
  BoardUpdateMessage,
  LostMessage,
  NewTurnMessage,
  PlayersMessage,
  ReceiveableMessage,
  SendableMessage,
} from "./Message";

interface ReceiveableMessageObserver<T> {
  messageKey: string;
  onMessageReceived(message: T): void;
}

interface WebSocketMessengerOptions {
  serverWebSocketUrl: string;
  onWebSocketReady: () => void;
}

export abstract class Messenger {
  protected observers: ReceiveableMessageObserver<any>[] = [];
  public onMessengerReady?: (messenger: Messenger) => void;

  abstract sendMessage(message: SendableMessage<any>): void;

  abstract endCommunication(): void;

  receiveMessage(rawMessage: string): ReceiveableMessage<any> {
    const [key, content] = rawMessage.split(":");

    switch (key) {
      case Constants.MESSAGE_BOARD_UPDATE_KEY:
        return new BoardUpdateMessage(key, content);
      case Constants.MESSAGE_TURN_KEY:
        return new NewTurnMessage(key, content);
      case Constants.MESSAGE_PLAYERS_KEY:
        return new PlayersMessage(key, content);
      case Constants.MESSAGE_LOST_KEY:
        return new LostMessage(key, content);
      default:
        throw new Error(`Cannot parse message: key was '${key}'`);
    }
  }

  observe(observer: ReceiveableMessageObserver<any>) {
    this.observers.push(observer);
  }
}

export class WebSocketMessenger extends Messenger {
  websocket: WebSocket;

  constructor(options: WebSocketMessengerOptions) {
    super();
    this.websocket = new WebSocket(options.serverWebSocketUrl);
    super.onMessengerReady = options.onWebSocketReady

    this.websocket.addEventListener(
      "message",
      (event: MessageEvent<string>) => {
        const message = this.receiveMessage(event.data);
        console.log(message.getContent())

        this.observers
          .find((observer) => observer.messageKey === message.key)
          ?.onMessageReceived(message.getContent());
      },
    );

    this.websocket.addEventListener("open", () => {
      this.onMessengerReady?.call(this, this);
    });

    this.websocket.addEventListener("error", () => {
      console.log("socker error")
    });

    this.websocket.addEventListener("close", () => {
      // localStorage.removeItem(Constants.PLAYER_ID_KEY)
    });
  }

  sendMessage(message: SendableMessage<any>): void {
    this.websocket.send(message.build());
  }

  endCommunication(): void {
      this.websocket.close(Constants.WEBSOCKET_CODE_END_GAME)
  }
}
