<script setup lang="ts">
import { computed } from 'vue';
import { RevealedBoardSlot } from '../domain/RevealedBoardSlot';

const { slot, colored } = defineProps<{
  slot: RevealedBoardSlot | null,
  colored: boolean,
}>()

const highlighted = computed(() => slot !== null)
const selectable = computed(() => highlighted && slot?.piece === null)

</script>

<template>
  <div 
    class="slot"
    :class="{ 'slot--colored': colored, 'slot--selectable': selectable, 'slot--highlighted': highlighted }"
  >
    <!-- <div v-if="!highlighted" class="slot__overlay">
    </div> -->
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
  transition: all 0.3s ease-out;
}

.slot--selectable:hover {
  transform: rotate(-15deg) scale(1.2) skew(1deg, 2deg);
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