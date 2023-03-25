import { Constants } from "./Constants";
import { Messenger } from "./Messenger";

export class Player {
  public id: string;

  constructor(public name: string, public messenger: Messenger) {
    const playerId = localStorage.getItem(Constants.PLAYER_ID_KEY);
    this.id = playerId || crypto.randomUUID();
    localStorage.setItem(Constants.PLAYER_ID_KEY, this.id);
    console.log(`Player id ${this.id}`);
  }

  isSelf(): boolean {
    return this.id === localStorage.getItem(Constants.PLAYER_ID_KEY);
  }
}

export interface OtherPlayer {
  id: string;
  name: string;
  color: string;
}
