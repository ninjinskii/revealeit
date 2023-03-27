<script setup lang="ts">
import Board from './components/Board.vue'
import { useGlobalStore } from './stores/store';
import { storeToRefs } from 'pinia';
import { computed, ref, watch } from 'vue';
import Rules from './components/Rules.vue';
import { useI18n } from 'vue-i18n';
import { Player } from './domain/Player';
import { Constants } from './domain/Constants';
import Modal from './components/Modal.vue';

const { t } = useI18n();

const store = useGlobalStore()
const { playingPlayer, player, otherPlayers, isServerReady } = storeToRefs(store)

const name = ref(localStorage.getItem(Constants.PLAYER_NAME_KEY) || "")
const showRules = ref(false)

const isPlayerTurn = computed(() => playingPlayer.value === player.value?.id)
const waitingForPlayers = computed(() => playingPlayer.value === "")
const hasWon = computed(() => otherPlayers.value.length === 0)
const info = computed(() => {
  if (!isServerReady.value) {
    return t("info__waiting_for_server")
  }

  if (playingPlayer.value === "") {
    return t("info__waiting_for_player")
  }

  if (player.value && playingPlayer.value !== player.value.id) {
    const otherPlayer = otherPlayers.value.find(
      player => player.id === playingPlayer.value
    )

    return t("info__waiting_for_turn", { playerName: otherPlayer?.name })
  }

  if (hasWon.value) {
    return t("info__you_win")
  }

  if (isPlayerTurn) {
    return t("info__your_turn")
  }
})

function createPlayer() {
  const messenger = store.notifyServer()
  player.value = new Player(name.value, messenger)
}

if (name.value !== "") {
  createPlayer()
}

watch(isServerReady, (isReady) => {
  if (isReady) {
    store.connect()
  }
})
</script>

<template>
  <div>
    <Transition>
      <Modal v-if="showRules" @close="showRules = false">
        <Rules />
      </Modal>
    </Transition>
    <div v-if="player" class="container">
      <p 
        :class="{
          'anim__eye_catcher': isPlayerTurn && !hasWon,
          'anim__loader': !isServerReady || waitingForPlayers,
        }"
      >
        {{ info }}
      </p>
      <Board :board-size="Constants.BOARD_SIZE" />
      <button class="button__rule" @click="showRules = true">{{ t("rules__title") }}</button>
    </div>
    <div v-else>
      <Rules />
      <input v-model="name" :placeholder="t('enter_name')" @keyup.enter="createPlayer()">
      <button :disabled="name.length === 0" @click="createPlayer()">{{ t("go") }}</button>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.button__rule {
  position: absolute;
  top: 0;
  right: 15px;
}

p,
input {
  text-align: center;
}

button {
  margin: 0 8px 0 8px;
}

.anim__loader {
  animation: grow-in 2s infinite;
}

.anim__eye_catcher {
  animation: jump 1.8s infinite;
}

.v-enter-active {
  animation: grow-in 0.3s;
}

.v-leave-active {
  animation: grow-in 0.3s reverse;
}

@keyframes grow-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes jump {
  0% {
    transform: scale(1, 1) translateY(0);
  }

  10% {
    transform: scale(1.1, .9) translateY(0);
  }

  30% {
    transform: scale(.9, 1.1) translateY(-50px);
  }

  50% {
    transform: scale(1, 1) translateY(0);
  }

  57% {
    transform: scale(1, 1) translateY(-7px);
  }

  64% {
    transform: scale(1, 1) translateY(0);
  }

  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
