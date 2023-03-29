<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useGlobalStore } from '../stores/store';

const { t } = useI18n();

const store = useGlobalStore()
const { alertMessage } = storeToRefs(store)

const { open } = defineProps<{ open: boolean }>()
</script>

<template>
  <div v-if="alertMessage.length > 0" class="alert">
    {{ alertMessage }}
  </div>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 10%;
  left: 50%;
  width: 600px;
  margin-left: -316px;
  padding: 16px;
  background-color: #363636;
  border: solid 1px var(--primary-color);
  border-radius: 16px;
  overflow: hidden;
  z-index: 999;
}
</style>