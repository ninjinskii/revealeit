<script setup lang="ts">
import { BoardPiece } from '../domain/BoardPiece';

const { piece } = defineProps<{ piece: BoardPiece }>()
</script>

<template>
  <div class="piece">
  </div>
</template>

<style scoped>
.piece {
  z-index: 20;
}
</style>