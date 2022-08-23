<script>
export default {
  setup() {
    const state = ref(0)
    const count = ref('1')
    return {
      state,
      count,
    }
  },
}
</script>

<template>
  {{ state }}
</template>
