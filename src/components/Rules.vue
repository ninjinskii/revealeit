<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import RulePiece from './RulePiece.vue';
import translations from '../lang/fr.js'

const { t } = useI18n();

</script>

<template>
  <h1>{{ t("app_name") }}</h1>
  <h2>{{ t("rules__title") }}</h2>
  <p>{{ t("rules__body") }}</p>
  <ul>
    <li v-for="rule in Object.keys(translations.rules__list)">{{ t(`rules__list.${rule}`) }}</li>
  </ul>
  <p>{{ t("piece__details") }}</p>
  <div class="container">
    <RulePiece
      v-for="piece of Object.keys(translations.rules_pieces__list)"
      :pieceId="t(`rules_pieces__list.${piece}.id`)"
      :pieceName="t(`rules_pieces__list.${piece}.name`)"
      :pieceDescription="t(`rules_pieces__list.${piece}.description`)"
     />
  </div>
</template>

<style scoped>
h1, h2 {
  text-align: center;
  padding: 0;
  margin-top: 0;
  margin-bottom: 12px;
}
.container {
  text-align: center;
  display: flex;
  align-items: start;
  max-width: 700px;
}

.container > * {
  margin: 8px;
}
</style>