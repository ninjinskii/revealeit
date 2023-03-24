import { Constants } from "./Constants";
import { Message, ReceiveableMessage } from "./Message";
import { Messenger, WebSocketMessenger } from "./Messenger";

export class Player {
  public id: string;

  constructor(public name: string, public messenger: Messenger) {
    const playerId = localStorage.getItem(Constants.PLAYER_ID_KEY);
    this.id = playerId || crypto.randomUUID();
    localStorage.setItem(Constants.PLAYER_ID_KEY, this.id);

    // initMessageListeners()
  }

  setPlayerMessageListener(listener: (message: ReceiveableMessage<any>) => void) {
    this.messenger.setOnMessageReceivedListener(listener);
  }

  isSelf(): boolean {
    return this.id === localStorage.getItem(Constants.PLAYER_ID_KEY);
  }

  static fromDto({ id, name }: { id: string; name: string }): Player {
    const player = new Player(
      name,
      new WebSocketMessenger(Constants?.SERVER_WEBSOCKET_URL),
    );
    player.id = id;
    return player;
  }
}
