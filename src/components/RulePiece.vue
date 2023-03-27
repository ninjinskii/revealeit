<script setup lang="ts">
const {
  pieceId,
  pieceName,
  pieceDescription
} = defineProps<{ pieceId: string, pieceName: string, pieceDescription: string }>()
</script>

<template>
  <div class="container">
    <img :src="`/${pieceId}.svg`" height="110" width="110" />
    <h3>{{ pieceName }}</h3>
    <p>{{ pieceDescription }}</p>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: justify;
  text-justify: inter-word;
}

p {
  max-width: 300px;
}

h3 {
  margin: 12px auto 12px auto;
}

img {
  margin: auto;
}
</style>