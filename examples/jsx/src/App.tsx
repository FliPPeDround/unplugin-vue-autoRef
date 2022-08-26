import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    let count = ref(1)
    const doubleCount = computed(() => count * 2)
    return () => (
      <div>
        <button onClick={() => count--}>-</button>
        <button onClick={() => count++}>+</button>
        <h1>count:{count}</h1>
        <h1>doubleCount: {doubleCount}</h1>
      </div>
    )
  },
})
