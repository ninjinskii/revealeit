<script setup lang="ts">
import { CONNREFUSED } from 'dns';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { BoardPiece } from '../domain/BoardPiece';
import { Constants } from '../domain/Constants';
import { useGlobalStore } from '../stores/store';

const store = useGlobalStore()
const { player, otherPlayers } = storeToRefs(store)

const { piece } = defineProps<{ piece: BoardPiece }>()

const color = computed(() => piece.playerId === player.value?.id ? 'blue' : getPlayerColor(piece.playerId))

function getPlayerColor(playerId: string) {
  const ids = otherPlayers.value.map(player => player.id)
  const index = ids.indexOf(playerId)
  return Constants.PLAYER_COLORS[index]
}
</script>

<template>
  <div class="piece" :style="{ 'filter': `drop-shadow(0.3em 0.3em 0.5em ${color})` }">
    <img :src="`/${piece.name}.svg`" />
  </div>
</template>

<style scoped>
.piece {
  width: 60px;
  height: 60px;
  z-index: 20;
  border-radius: 50%;
  margin: auto;
}

img {
  width: 50px;
  height: 50px;
}
</style>