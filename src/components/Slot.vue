<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useGlobalStore } from '../stores/store';
import BoardPiece from './BoardPiece.vue';

const store = useGlobalStore()
const { revealedSlots } = storeToRefs(store)

const { colored, x, y } = defineProps<{ colored: boolean, x: number, y: number }>()

const slot = computed(() => revealedSlots.value.find(slot => slot.x === x && slot.y === y) || null)
const highlighted = computed(() => slot.value !== null)
const selectable = computed(() => highlighted && slot.value?.piece === null)

</script>

<template>
  <div 
    class="slot"
    :class="{ 'slot--colored': colored, 'slot--selectable': selectable, 'slot--highlighted': highlighted }"
  >
    <BoardPiece v-if="slot?.piece" :piece="slot.piece"></BoardPiece>
  </div>
</template>

<style scoped>
.slot {
  width: 100px;
  height: 100px;
  margin: 20px;
  background-color: var(--slot-color);
  border-radius: var(--small-radius);
  z-index: 1;
  transition: all 0.2s ease-out;
}

.slot--selectable:hover {
  transform: rotate(-12deg) scale(1.2) skew(1deg, 2deg);
  box-shadow: 0px 0px 20px 2px var(--primary-color);
  z-index: 10;
}

.slot--highlighted {
  /* filter: drop-shadow(0 0 1em var(--primary-color)); */
  box-shadow: 0px 0px 20px 0.5px var(--primary-color);
}

.slot--colored {
  background-color: var(--colored-slot-color);
}

.slot__overlay {
  width: 100%;
  height: 100%;
  border-radius: var(--small-radius);
  background-color: var(--overlay-color);
}
</style>