import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { BoardPiece } from "../domain/BoardPiece";
import { Constants } from "../domain/Constants";
import { HandshakeMessage, KillMessage, MoveMessage } from "../domain/Message";
import { Messenger, WebSocketMessenger } from "../domain/Messenger";
import { OtherPlayer, Player } from "../domain/Player";
import { BoardUpdate, RevealedBoardSlot } from "../domain/BoardUpdate";
import { OrthogonalKillableRange } from "../domain/KillableRange";
import { useI18n } from "vue-i18n";

export const useGlobalStore = defineStore("global", () => {
  const { t } = useI18n();

  let alertTimeout = -1;

  const killableRange = new OrthogonalKillableRange();

  const alertMessage = ref("");

  const revealedSlots: Ref<RevealedBoardSlot[]> = ref([]);
  const killableSlots: Ref<RevealedBoardSlot[]> = ref([]);
  const killableRangeSlots: Ref<{ x: number; y: number }[]> = ref([]);

  const player: Ref<Player | null> = ref(null);
  const otherPlayers: Ref<OtherPlayer[]> = ref([]);
  const playingPlayer: Ref<string> = ref("");
  const selectedPiece: Ref<BoardPiece | null> = ref(null);
  const hasWon = ref(otherPlayers.value.length === 0);
  const hasLost = ref(false);
  const isServerReady = ref(false);

  function notifyServer(): Messenger {
    const messenger = new WebSocketMessenger({
      serverWebSocketUrl: Constants.SERVER_WEBSOCKET_URL,
      onWebSocketReady: onMessengerReady,
    });

    messenger.observe({
      messageKey: Constants.MESSAGE_BOARD_UPDATE_KEY,
      onMessageReceived: (message: BoardUpdate) => {
        revealedSlots.value = message.revealed;
        killableSlots.value = message.killable;
        killableRangeSlots.value = killableRange.getRangeLimitSlotsForPlayer(
          message.revealed,
          player.value!,
        );
      },
    });

    messenger.observe({
      messageKey: Constants.MESSAGE_PLAYERS_KEY,
      onMessageReceived(message: OtherPlayer[]) {
        const _otherPlayers = message.filter((tplayer) =>
          tplayer.id !== player.value?.id
        );
        otherPlayers.value = _otherPlayers;

        const gameEnded = _otherPlayers.length === 0;

        if (gameEnded) {
          messenger.endCommunication();
        }
      },
    });

    messenger.observe({
      messageKey: Constants.MESSAGE_TURN_KEY,
      onMessageReceived(message: string) {
        playingPlayer.value = message;
      },
    });

    messenger.observe({
      messageKey: Constants.MESSAGE_LOST_KEY,
      onMessageReceived() {
        hasLost.value = true;
      },
    });

    messenger.observe({
      messageKey: Constants.MESSAGE_ERROR_KEY,
      onMessageReceived(message: string) {
        alert(message);
      },
    });

    return messenger;
  }

  function onMessengerReady() {
    isServerReady.value = true;
  }

  function connect() {
    if (!player.value) {
      throw new Error("Cannot connect to server: no Player instantiated");
    }

    const message = new HandshakeMessage()
      .setContent({ playerId: player.value.id, playerName: player.value.name });

    player.value.messenger.sendMessage(message);
  }

  function moveSelectedPiece(toX: number, toY: number) {
    const slot = revealedSlots.value.find((slot) =>
      slot.piece === selectedPiece.value
    );

    if (!slot) {
      throw new Error("Cannot move piece: source slot not found");
    }

    const fromX = slot.x;
    const fromY = slot.y;

    selectedPiece.value = null;

    const message = new MoveMessage()
      .setContent({ fromX, fromY, toX, toY });

    player.value?.messenger.sendMessage(message);
  }

  function killPieceAt(x: number, y: number) {
    if (!player.value) {
      throw new Error("Cannot kill piece: current player does not exists");
    }

    const message = new KillMessage()
      .setContent({ playerId: player.value.id, toX: x, toY: y });

    player.value?.messenger.sendMessage(message);
  }

  function alert(messsageKey: string) {
    if (alertTimeout) {
      clearTimeout(alertTimeout);
      alertTimeout = -1;
    }

    alertMessage.value = t(messsageKey);
    alertTimeout = setTimeout(
      () => alertMessage.value = "",
      Constants.ALERT_TIMEOUT_MILLIS,
    );
  }

  return {
    alertMessage,
    revealedSlots,
    killableSlots,
    killableRangeSlots,
    player,
    otherPlayers,
    playingPlayer,
    selectedPiece,
    hasWon,
    hasLost,
    isServerReady,
    notifyServer,
    connect,
    moveSelectedPiece,
    killPieceAt,
    alert,
  };
});
