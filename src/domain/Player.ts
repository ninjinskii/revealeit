import { Constants } from "./Constants";
import { Messenger } from "./Messenger";

export class Player {
  public id: string;

  constructor(public name: string, public messenger: Messenger) {
    const playerId = localStorage.getItem(Constants.PLAYER_ID_KEY);
    this.id = playerId || crypto.randomUUID();
    localStorage.setItem(Constants.PLAYER_ID_KEY, this.id);
    console.log("Player id")
    console.log(this.id)
  }

  isSelf(): boolean {
    return this.id === localStorage.getItem(Constants.PLAYER_ID_KEY);
  }

  // static fromDto({ id, name }: { id: string; name: string }): Player {
  //   const player = new Player(
  //     name,
  //     new WebSocketMessenger(Constants?.SERVER_WEBSOCKET_URL),
  //   );
  //   player.id = id;
  //   return player;
  // }
}
