<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RevealedBoardSlot } from '../domain/RevealedBoardSlot';
import { useGlobalStore } from '../stores/store'
import Slot from './Slot.vue'

const store = useGlobalStore()
const { revealedSlots } = storeToRefs(store)
const { boardSize } = defineProps<{ boardSize: number }>()

function getRevealedSlotAt(x: number, y: number): RevealedBoardSlot | null {
  return revealedSlots.value.find(slot => slot.x === x && slot.y === y) || null
}

</script>

<template>
  <table>
    <tr v-for="(_, x) in boardSize" :key="x">
      <td v-for="(_, y) in boardSize" :key="x + y">
        <Slot :slot="getRevealedSlotAt(x, y)" :colored="(x + y) % 2 === 0"></Slot>
      </td>
    </tr>
  </table>
</template>

<style scoped>
table {
  border-collapse: separate;
  padding: 0;
  margin: 0;
}

tr {
  padding: 0;
  margin: 0;
}

td {
  padding: 0;
  margin: 0;
}
</style>