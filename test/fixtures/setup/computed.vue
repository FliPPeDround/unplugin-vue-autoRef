<script setup lang="ts">
import { computed, ref } from 'vue'
const count = ref(1)
const dobleCount = computed(() => count.value * 2)
</script>

<template>
  <h1>{{ count }}</h1>
  <h1>{{ dobleCount }}</h1>
</template>
