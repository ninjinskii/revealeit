import { Constants } from "./Constants";
import {
  BoardUpdateMessage,
  Message,
  ReceiveableMessage,
  SendableMessage,
} from "./Message";

export abstract class Messenger {
  protected onMessageReceivedListener?: (message: ReceiveableMessage<any>) => void

  abstract sendMessage(message: SendableMessage<any>): void;

  receiveMessage(rawMessage: string): ReceiveableMessage<any> {
    const [key, content] = rawMessage.split(":");

    switch (key) {
      case Constants.MESSAGE_BOARD_UPDATE_KEY:
        return new BoardUpdateMessage(key, content);
      default:
        throw new Error(`Cannot parse message: key was ${key}`);
    }
  }

  setOnMessageReceivedListener(listener: (message: ReceiveableMessage<any>) => void) {
    this.onMessageReceivedListener = listener
  }
}

// export interface Messenger {
//   sendMessage(message: string): void;
//   onMessageReceived(message: string): void;
//   setMessageReceivedListener(listener: (message: string) => void): void;
// }

export class WebSocketMessenger extends Messenger {
  websocket: WebSocket;

  constructor(serverWebSocketAdress: string) {
    super();
    this.websocket = new WebSocket(serverWebSocketAdress);

    this.websocket.addEventListener(
      "message",
      (event: MessageEvent<string>) => {
        const message = this.receiveMessage(event.data).getContent();
        super.onMessageReceivedListener?.call(this, message)
      },
    );
  }

  setMessageReceivedListener(listener: (message: Message) => void) {
    super.onMessageReceivedListener = listener;
  }

  onMessageReceived(message: ReceiveableMessage<any>): void {
    this.onMessageReceivedListener?.call(this, message);
  }

  sendMessage(message: SendableMessage<any>): void {
    this.websocket.send(message.build());
  }
}
