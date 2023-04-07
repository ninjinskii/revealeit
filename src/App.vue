<script setup lang="ts">
import Board from './components/Board.vue'
import { useGlobalStore } from './stores/store';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import Rules from './components/Rules.vue';
import { useI18n } from 'vue-i18n';
import { Player } from './domain/Player';
import { Constants } from './domain/Constants';
import Modal from './components/Modal.vue';
import Alert from './components/Alert.vue';
import Controller from './components/Controller.vue';

const { t } = useI18n();

const store = useGlobalStore()
const { player, isServerReady } = storeToRefs(store)

const vFocus = {
  mounted: (el: HTMLElement) => el.focus()
}

const name = ref(localStorage.getItem(Constants.PLAYER_NAME_KEY) || "")
const showRules = ref(false)

function createPlayer() {
  if (!validateName(name.value)) {
    store.alert("enter_name__error")
    return
  }

  const messenger = store.notifyServer()
  player.value = new Player(name.value, messenger)
}

function validateName(name: string): boolean {
  if (name.length === 0 || name.length > 16) {
    return false
  }

  const charDigitsOnly = /[^A-Z0-9]/i
  return !name.match(charDigitsOnly)
}

if (name.value !== "") {
  createPlayer()
}

watch(isServerReady, (isReady) => {
  if (isReady) {
    store.connect()
  }
})
</script>

<template>
  <div>
    <Transition>
      <Modal :open="showRules" @close="showRules = false">
        <Rules />
      </Modal>
    </Transition>
    <Transition>
      <Alert />
    </Transition>
    <div v-if="player" class="container">
      <Controller @show-rules="showRules = true" />
      <Board />
    </div>
    <div v-else>
      <Rules />
      <input 
        v-focus
        v-model="name"
        :placeholder="t('enter_name')"
        @keyup.enter="createPlayer()"
      >
      <button :disabled="name.length === 0" @click="createPlayer()">{{ t("go") }}</button>
    </div>
  </div>
</template>

<style scoped>
p,
input {
  text-align: center;
}

button {
  margin: 0 8px 0 8px;
}

.v-enter-active {
  animation: grow-in 0.3s;
}

.v-leave-active {
  animation: grow-in 0.3s reverse;
}

@keyframes grow-in {
  0% {
    opacity: 0;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
