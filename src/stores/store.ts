import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Constants } from "../domain/Constants";
import {
  BoardUpdateMessage,
  HandshakeMessage,
  SendableMessage,
} from "../domain/Message";
import { WebSocketMessenger } from "../domain/Messenger";
import { OtherPlayer, Player } from "../domain/Player";
import { RevealedBoardSlot } from "../domain/RevealedBoardSlot";

// const fakeBoardData = [
//   { x: 1, y: 0, piece: null },
//   { x: 1, y: 1, piece: null },
//   { x: 1, y: 2, piece: { name: "explorer", playerId: "1" } },
//   { x: 1, y: 3, piece: null },
//   { x: 1, y: 4, piece: null },
// ];

export const useGlobalStore = defineStore("global", () => {
  const messenger = new WebSocketMessenger({
    serverWebSocketUrl: Constants.SERVER_WEBSOCKET_URL,
    onWebSocketReady: connect,
  });

  messenger.observe({
    messageKey: Constants.MESSAGE_BOARD_UPDATE_KEY,
    onMessageReceived: (message: RevealedBoardSlot[]) => {
      revealedSlots.value = message;
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
  const player: Ref<Player | null> = ref(null);
  const otherPlayers: Ref<OtherPlayer[]> = ref([]);

  function connect() {
    player.value = new Player("Louis", messenger);

    if (!player.value) {
      throw new Error("Cannot connect to server: no Player instantiated");
    }

    const message = new HandshakeMessage()
      .setContent({ playerId: player.value.id, playerName: player.value.name });

    player.value.messenger.sendMessage(message);
  }

  return { revealedSlots, player, otherPlayers };
});
