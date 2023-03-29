<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useGlobalStore } from '../stores/store';
import BoardPiece from './BoardPiece.vue';

const store = useGlobalStore()
const {
  revealedSlots,
  killableSlots,
  killableRangeSlots,
  player,
  selectedPiece,
  playingPlayer,
} = storeToRefs(store)

const { colored, x, y } = defineProps<{ colored: boolean, x: number, y: number }>()

const isPlayerTurn = computed(() => playingPlayer.value === player.value?.id)
const slot = computed(() => revealedSlots.value.find(slot => slot.x === x && slot.y === y) || null)
const highlighted = computed(() => slot.value !== null)
const selectable = computed(() => highlighted && slot.value?.piece === null && selectedPiece.value && isPlayerTurn)
const isOwnPiece = computed(() => slot.value?.piece !== null && slot.value?.piece.playerId === player.value?.id)
const toggled = computed(() => selectedPiece.value && selectedPiece.value === slot.value?.piece)
const marked = computed(() => killableSlots.value.find(slot => slot.x === x && slot.y === y) && isPlayerTurn)
const isKillableRange = computed(() => {
  return killableRangeSlots.value.find(slot => slot.x === x && slot.y === y) || false
})

function onClick() {
  if (!isOwnPiece.value || !slot.value) {
    if (selectedPiece.value) {
      store.moveSelectedPiece(x, y)
    }

    return
  }

  if (!isPlayerTurn.value) {
    return
  }

  selectedPiece.value = slot.value?.piece
}

function killPiece(clickEvent: Event) {
  clickEvent.preventDefault()
  store.killPieceAt(x, y)
}
</script>

<template>
  <div 
    class="slot"
    :class="{
      'slot--colored': colored,
      'slot--selectable': selectable,
      'slot--highlighted': highlighted,
      'slot--toggled': toggled,
      'slot--killable-range': isKillableRange,
    }"
    @click="onClick()"
  >
    <div v-if="marked && isPlayerTurn" class="slot__mark"></div>
    <button 
      v-if="marked && isPlayerTurn"
      class="slot__mark__btn"
      @click="killPiece($event)"
    >
      {{ $t("piece__action_kill") }}
    </button>
    <BoardPiece v-if="slot?.piece" :piece="slot.piece" />
  </div>
</template>

<style scoped>
.slot {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 20px;
  background-color: var(--slot-color);
  border-radius: var(--small-radius);
  z-index: 1;
  transition: all 0.2s ease-out;
  box-sizing: border-box;
}

.slot--selectable:hover {
  transform: rotate(-12deg) scale(1.2) skew(1deg, 2deg);
  box-shadow: 0px 0px 20px 2px var(--primary-color);
  z-index: 10;
}

.slot--highlighted {
  box-shadow: 0px 0px 20px 0.5px var(--primary-color);
}

.slot--colored {
  background-color: var(--colored-slot-color);
}

.slot--toggled {
  border: solid 2px var(--primary-color) !important;
}

.slot--killable-range {
  border: dashed var(--secondary-color) 1px;
}

.slot__mark__btn {
  position: absolute;
  z-index: 20;
  right: 5px;
  bottom: 5px;
}

.slot__mark {
  position: absolute;
  border-radius: 50%;
  width: 90%;
  height: 90%;
  left: 4%;
  top: 4%;
  transform: translate(-50%, -50%);
  animation: rotate 4s linear infinite;
  border: dashed var(--secondary-color) 1px;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
}
</style>
