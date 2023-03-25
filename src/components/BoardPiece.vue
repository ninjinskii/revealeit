<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { BoardPiece } from '../domain/BoardPiece';
import { useGlobalStore } from '../stores/store';

const store = useGlobalStore()
const { player } = storeToRefs(store)

const { piece } = defineProps<{ piece: BoardPiece }>()

const color = computed(() => piece.playerId === player.value?.id ? 'blue' : 'red')
</script>

<template>
  <div class="piece" :style="{ 'background-color': color }">
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