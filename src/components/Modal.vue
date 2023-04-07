<script setup lang="ts">
import { ref } from 'vue';
import useDetectOutsideClick from '../composables/useDetectClickOutside';

const { open } = defineProps<{ open: boolean }>()

const emit = defineEmits(["close"])

const modal = ref(null)

useDetectOutsideClick(modal, "opener", () => {
  emit("close")
})
</script>

<template>
  <div v-if="open" ref="modal" class="modal">
    <slot></slot>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 10%;
  left: 50%;
  max-height: 70vh;
  width: 600px;
  margin-left: -316px;
  padding: 16px;
  background-color: #363636;
  box-shadow: 0px 0px 20px 6px 0;
  border-radius: 16px;
  overflow-y: scroll;
  z-index: 999;
}
</style>