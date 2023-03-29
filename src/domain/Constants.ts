export class Constants {
  public static readonly PLAYER_COLORS = [
    "#FF0000",
    "#00FF00",
    "#FF00FF",
    "#0F000F",
    "#FFFF00",
  ];
  public static readonly PLAYER_ID_KEY = "revealeit.player.id";
  public static readonly PLAYER_NAME_KEY = "revealeit.player.name";
  public static readonly BOARD_SIZE = 5;
  public static readonly SERVER_WEBSOCKET_URL =
    import.meta.env.VITE_SERVER_WEBSOCKET_URL;
  public static readonly MESSAGE_HANDSHAKE_KEY = "handshake";
  public static readonly MESSAGE_MOVE_KEY = "move";
  public static readonly MESSAGE_KILL_KEY = "kill";
  public static readonly MESSAGE_BOARD_UPDATE_KEY = "board";
  public static readonly MESSAGE_TURN_KEY = "turn";
  public static readonly MESSAGE_PLAYERS_KEY = "players";
  public static readonly MESSAGE_LOST_KEY = "lost";
  public static readonly MESSAGE_ERROR_KEY = "error";
  public static readonly WEBSOCKET_CODE_END_GAME = 4000;
  public static readonly ALERT_TIMEOUT_MILLIS = 5000;
}
