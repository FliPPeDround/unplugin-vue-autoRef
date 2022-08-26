<script setup lang="ts">
import { state } from './state'

let count = ref(0)
const updateCount = (num: number) => {
  count += num
}
const doubleCount = computed(() => {
  return count * 2
})
</script>

<template>
  <button @click="updateCount(-1)">
    -
  </button>
  {{ count }}
  <button @click="updateCount(1)">
    +
  </button>
  {{ doubleCount }}
  {{ state }}
</template>
