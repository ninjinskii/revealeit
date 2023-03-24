import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Constants } from "../domain/Constants";
import { BoardUpdateMessage, HandshakeMessage, SendableMessage } from "../domain/Message";
import { WebSocketMessenger } from "../domain/Messenger";
import { Player } from "../domain/Player";
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

  messenger.addOnMessageReceivedListener({
    messageKey: Constants.MESSAGE_BOARD_UPDATE_KEY,
    onMessageReceived: (message: RevealedBoardSlot[]) => {
      console.log("received board update: ")
      console.log(message)
      revealedSlots.value = message;
    },
  });

  const revealedSlots: Ref<RevealedBoardSlot[]> = ref([]);
  const player: Ref<Player | null> = ref(null);

  function connect() {
    player.value = new Player("Louis", messenger);

    if (!player.value) {
      throw new Error("Cannot connect to server: no Player instantiated");
    }

    const message = new HandshakeMessage()
      .setContent({ playerId: player.value.id });

    console.log("send message")
    player.value.messenger.sendMessage(message);
  }

  return { revealedSlots, connect };
});
