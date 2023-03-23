import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const board = ref([])

  function loadBoard(serializedBoard: any) {

  }

  return { board, loadBoard }
})