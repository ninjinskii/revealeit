<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineEmits(['close'])
</script>

<template>
  <div class="modal">
    <div class="end">
      <button @click="$emit('close')">{{ t("close") }}</button>
    </div>
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

.end {
  text-align: end;
}
</style>