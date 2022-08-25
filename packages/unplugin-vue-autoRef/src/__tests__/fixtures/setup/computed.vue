<script setup lang="ts">
const count = ref(1)
const dobleCount = computed(() => count * 2)
</script>

<template>
  <h1>{{ count }}</h1>
  <h1>{{ dobleCount }}</h1>
</template>
