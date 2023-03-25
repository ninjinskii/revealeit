import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { BoardPiece } from "../domain/BoardPiece";
import { Constants } from "../domain/Constants";
import {
  BoardUpdateMessage,
  HandshakeMessage,
  MoveMessage,
  SendableMessage,
} from "../domain/Message";
import { WebSocketMessenger } from "../domain/Messenger";
import { OtherPlayer, Player } from "../domain/Player";
import { BoardUpdate, RevealedBoardSlot } from "../domain/BoardUpdate";

export const useGlobalStore = defineStore("global", () => {
  const messenger = new WebSocketMessenger({
    serverWebSocketUrl: Constants.SERVER_WEBSOCKET_URL,
    onWebSocketReady: connect,
  });

  messenger.observe({
    messageKey: Constants.MESSAGE_BOARD_UPDATE_KEY,
    onMessageReceived: (message: BoardUpdate) => {
      revealedSlots.value = message.revealed;
      killableSlots.value = message.killable;
    },
  });

  messenger.observe({
    messageKey: Constants.MESSAGE_PLAYERS_KEY,
    onMessageReceived: (message: OtherPlayer[]) => {
      otherPlayers.value = message.filter((tplayer) =>
        tplayer.id !== player.value?.id
      );
    },
  });

  const revealedSlots: Ref<RevealedBoardSlot[]> = ref([]);
  const killableSlots: Ref<RevealedBoardSlot[]> = ref([]);
  const player: Ref<Player | null> = ref(null);
  const otherPlayers: Ref<OtherPlayer[]> = ref([]);
  const selectedPiece: Ref<BoardPiece | null> = ref(null);

  function connect() {
    player.value = new Player("Louis", messenger);

    if (!player.value) {
      throw new Error("Cannot connect to server: no Player instantiated");
    }

    const message = new HandshakeMessage()
      .setContent({ playerId: player.value.id, playerName: player.value.name });

    player.value.messenger.sendMessage(message);
  }

  function moveSelectedPiece(toX: number, toY: number) {
    const slot = revealedSlots.value.find(slot =>
      slot.piece === selectedPiece.value
    );

    if (!slot) {
      throw new Error("Cannot move piece: source slot not found");
    }

    const fromX = slot.x;
    const fromY = slot.y;

    selectedPiece.value = null

    const message = new MoveMessage()
      .setContent({ fromX, fromY, toX, toY });

    player.value?.messenger.sendMessage(message);
  }

  return {
    revealedSlots,
    killableSlots,
    player,
    otherPlayers,
    selectedPiece,
    moveSelectedPiece,
  };
});
