import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { Constants } from "../domain/Constants";
import { HandshakeMessage, Message, ReceiveableMessage } from "../domain/Message";
import { WebSocketMessenger } from "../domain/Messenger";
import { Player } from "../domain/Player";
import { RevealedBoardSlot } from "../domain/RevealedBoardSlot";

const fakeBoardData = [
  { x: 1, y: 0, piece: null },
  { x: 1, y: 1, piece: null },
  { x: 1, y: 2, piece: { name: "explorer", playerId: "1" } },
  { x: 1, y: 3, piece: null },
  { x: 1, y: 4, piece: null },
];

export const useGlobalStore = defineStore("global", () => {
  const _player = new Player("Louis", new WebSocketMessenger(Constants.SERVER_WEBSOCKET_URL))
  // const message = 
  _player.setPlayerMessageListener((message: ReceiveableMessage<any>) => message.getContent())

  const revealedSlots: Ref<RevealedBoardSlot[]> = ref(fakeBoardData);
  const player: Ref<Player | null> = ref(_player);

  function connect() {
    if (!player.value) {
      throw new Error("Cannot connect to server: no Player instantiated");
    }

    const message = new HandshakeMessage()
      .setContent({ playerId: player.value.id })
      .build()

    player.value.messenger.sendMessage(message);
  }

  function onServerBoardUpdateReceived(revealedSlots: any) {
    
  }

  return { revealedSlots, onServerBoardUpdateReceived };
});
