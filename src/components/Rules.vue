<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import RulePiece from './RulePiece.vue';

const { t } = useI18n();
</script>

<template>
  <h1>{{ t("app_name") }}</h1>
  <h2>{{ t("rules__title") }}</h2>
  <p>{{ t("rules__body") }}</p>
  <ul>
    <li>{{ t("rules__reveal") }}</li>
    <li>{{ t("rules__use_pieces") }}</li>
    <li>{{ t("rules__how_to_win") }}</li>
    <li>{{ t("rules__move_pieces") }}</li>
  </ul>
  <p>{{ t("piece__details") }}</p>
  <div class="container">
    <RulePiece 
      pieceId="explorer"
      :pieceName="t('piece__explorer')" 
      :pieceDescription="t('rules__explorer')"
    />
    <RulePiece 
      pieceId="shooter"
      :pieceName="t('piece__assassin')" 
      :pieceDescription="t('rules__assassin')"
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

li:first-child {
  font-weight: 900;
}
</style>