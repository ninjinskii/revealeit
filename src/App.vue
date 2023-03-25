<script setup lang="ts">
import Board from './components/Board.vue'
import { useGlobalStore } from './stores/store';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const store = useGlobalStore()
const { playingPlayer, player } = storeToRefs(store)

const info = computed(() => {
  if (playingPlayer.value === "") {
    return "En attente d'autres joueurs"
  }

  if (playingPlayer.value !== player.value?.id) {
    return "En attente de votre tour"
  }

  if (playingPlayer.value === player.value?.id) {
    return "A vous de jouer"
  }
})
</script>

<template>
  <p>{{ info }}</p>
  <Board :board-size="5" />
</template>

<style scoped></style>
