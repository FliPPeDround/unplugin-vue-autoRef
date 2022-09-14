<script setup lang="ts">
import { watch } from 'vue'
import type { Ref } from 'vue'
import { state } from './state'

// @ref
let count = 0

// @computed
const doubleCount = () => {
  return count * 2
}

const updateCount = (num: number) => {
  count += num
}

function trackChange(x: Ref<number>) {
  watch(x, (x) => {
    console.log('x 改变了！', x)
  })
}
trackChange($$(count))
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

