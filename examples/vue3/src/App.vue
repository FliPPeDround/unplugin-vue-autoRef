<script setup lang="ts">
import { watch } from 'vue'
import type { Ref } from 'vue'
import { state } from './state'
let [count, countRef] = ref(0)
const updateCount = (num: number) => {
  count += num
}
const doubleCount = computed(() => {
  return count * 2
})

function trackChange(x: Ref<number>) {
  watch(x, (x) => {
    console.log('x 改变了！', x)
  })
}
trackChange(countRef)
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
