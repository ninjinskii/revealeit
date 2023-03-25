export class Constants {
  public static PLAYER_COLORS = ["#FF0000", "#00FF00", "#FF00FF", "#0F000F", "#FFFF00"]
  public static PLAYER_ID_KEY = "revealeit.player.id"
  public static PLAYER_ID_NAME = "revealeit.player.name"
  public static SERVER_WEBSOCKET_URL = "wss://revealeit-backend.deno.dev" // "ws://revealeit-backend.njk.localhost:5000/" 
  public static MESSAGE_HANDSHAKE_KEY = "handshake"
  public static MESSAGE_MOVE_KEY = "move"
  public static MESSAGE_KILL_KEY = "kill"
  public static MESSAGE_BOARD_UPDATE_KEY = "board"
  public static MESSAGE_TURN_KEY = "turn"
  public static MESSAGE_PLAYERS_KEY = "players"
}