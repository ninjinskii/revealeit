<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useGlobalStore } from '../stores/store';
import Slot from './Slot.vue'

const store = useGlobalStore()
const { boardSize } = storeToRefs(store)
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