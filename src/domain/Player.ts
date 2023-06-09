import { Constants } from "./Constants";
import { Messenger } from "./Messenger";

export class Player {
  public id: string;

  constructor(public name: string, public messenger: Messenger) {
    const playerId = localStorage.getItem(Constants.PLAYER_ID_KEY);
    this.id = playerId || crypto.randomUUID();

    localStorage.setItem(Constants.PLAYER_ID_KEY, this.id);
    localStorage.setItem(Constants.PLAYER_NAME_KEY, this.name);
  }
}

export interface OtherPlayer {
  id: string;
  name: string;
  color: string;
}
