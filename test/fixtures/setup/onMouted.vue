<script setup lang="ts">
import { onMounted, ref } from 'vue'
onMounted(() => {
  const count = ref(1)
})
</script>

<template>
  <h1>{{ count }}</h1>
  <h1>{{ dobleCount }}</h1>
</template>
