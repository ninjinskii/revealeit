<script setup lang="ts">
import { useGlobalStore } from '../stores/store'
import Slot from './Slot.vue'

const store = useGlobalStore()
const { board } = store

</script>

<template>
  <Slot v-for="(slot, index) in board.values" :colored="index % 2 === 0" />
</template>