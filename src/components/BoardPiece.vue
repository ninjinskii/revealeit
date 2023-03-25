<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { BoardPiece } from '../domain/BoardPiece';
import { Constants } from '../domain/Constants';
import { useGlobalStore } from '../stores/store';

const store = useGlobalStore()
const { player, otherPlayers } = storeToRefs(store)

const { piece } = defineProps<{ piece: BoardPiece }>()

const color = computed(() =>
  piece.playerId === player.value?.id
    ? 'blue'
    : Constants.PLAYER_COLORS[otherPlayers.value.map(player => player.id).indexOf(piece.playerId)]
)
</script>

<template>
  <div class="piece" :style="{ 'filter': `drop-shadow(0.3em 0.3em 0.5em ${color})` }">
    <img :src="`/${piece.name}.svg`" />
  </div>
</template>

<style scoped>
.piece {
  position: relative;
  width: 60px;
  height: 60px;
  z-index: 20;
  border-radius: 50%;
  margin: auto;
}

img {
  position: absolute;
  width: 90%;
  height: 90%;
  left: 5%;
  top: 35%;
}
</style>