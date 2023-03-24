<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { RevealedBoardSlot } from '../domain/RevealedBoardSlot';
import { useGlobalStore } from '../stores/store'
import Slot from './Slot.vue'

const { boardSize } = defineProps<{ boardSize: number }>()

</script>

<template>
  <table>
    <tr v-for="(_, x) in boardSize" :key="x">
      <td v-for="(_, y) in boardSize" :key="x + y">
        <Slot :colored="(x + y) % 2 === 0" :x="x" :y="y"></Slot>
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