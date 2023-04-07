<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '../stores/store';

const { t } = useI18n();

const store = useGlobalStore()
const { playingPlayer, player, otherPlayers, isServerReady, hasLost } = storeToRefs(store)

const emit = defineEmits(["showRules"])

const isPlayerTurn = computed(() => playingPlayer.value === player.value?.id)
const waitingForPlayers = computed(() => playingPlayer.value === "")
const hasWon = computed(() => otherPlayers.value.length === 0)

const info = computed(() => {
  if (!isServerReady.value) {
    return t("info__waiting_for_server")
  }

  if (hasLost.value) {
    return t("info__you_loose")
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

const infoClass = computed(() => ({
  'anim__eye_catcher': isPlayerTurn.value && !hasWon.value && !hasLost.value,
  'anim__loader': !isServerReady.value || waitingForPlayers.value,
}))
</script>

<template>
  <div class="controller">
    <p :class="infoClass">
      {{ info }}
    </p>
    <button id="opener" class="button__rule" @click="emit('showRules')">
      {{ t("rules__title") }}
    </button>
  </div>
</template>

<style scoped>
p {
  text-align: center;
  flex-grow: 1;
}

.controller {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
}

.button__rule {
 flex-grow: 0;
}

.anim__loader {
  animation: grow-in 2s infinite;
}

.anim__eye_catcher {
  animation: jump 1.8s infinite;
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