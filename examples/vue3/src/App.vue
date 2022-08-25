<script setup lang="ts">
import { state } from './state'
let count = ref(0)
const updatedecrement = () => {
  count = count + 1
}
const updatedeincrement = () => {
  count--
}
const doubleCount = computed(() => {
  return count * 2
})
</script>

<template>
  <button @click="updatedeincrement()">
    -
  </button>
  {{ count }}
  <button @click="updatedecrement()">
    +
  </button>
  {{ doubleCount }}
  {{ state }}
</template>
