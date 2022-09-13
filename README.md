# unplugin-vue-autoRef [![npm](https://img.shields.io/npm/v/unplugin-vue-autoref.svg)](https://npmjs.com/package/unplugin-vue-autoref)

English | [简体中文](./README-zh-CN.md)

## More radical reactive tansform macros in Vue powered by Vue Reactivity Transform！
<br/>

### The following examples are from [Vue Reactive Transform](https://vuejs.org/guide/extras/reactivity-transform.html)

<br/>

Ever since the introduction of the Composition API, one of the primary unresolved questions is the use of refs vs. reactive objects. It's easy to lose reactivity when destructuring reactive objects, while it can be cumbersome to use .value everywhere when using refs. Also, .value is easy to miss if not using a type system.

**unplugin-vue-autoref** is a compile-time transform that allows us to write code like this:
```html
<script setup>
let count = ref(0)

console.log(count)

function increment() {
  count++
}
function trackChange(x: Ref<number>) {
  watch(x, (x) => {
    console.log('x changed!')
  })
}

trackChange(count) // doesn't work!
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

While reactive variables relieve us from having to use .value everywhere, it creates an issue of "reactivity loss" when we pass reactive variables across function boundaries. 

Here count.value is passed as a number, whereas trackChange expects an actual ref. This can be fixed by wrapping count with $$()(powered by [Vue Reactive Transform](https://vuejs.org/guide/extras/reactivity-transform.html#retaining-reactivity-across-function-boundaries)) before passing it or use a [value, ref] (idea from [三咲智子](https://github.com/sxzz)) to accept the ref return value:

```ts
let count = ref(0)
- trackChange(count)
+ trackChange($$(count))
```
```ts
- let count = ref(0)
+ let [count, countRef] = ref(0)
- trackChange(count)
+ trackChange(countRef)
```
The above compiles to:
```ts
import { ref } from 'vue'

let count = ref(0)
trackChange(count)
```

## Includes
Every reactivity API that returns refs have a macro equivalent. These APIs include:

- `ref`
- `computed`
- `shallowRef`
- `customRef`
- `toRef`

These macros are globally available and do **not need to be imported** when Reactivity Transform is enabled.

## Features


- ✨ More radical reactive tansform macros in Vue.
- 💚 Supports both SFC and JSX out-of-the-box.
- 🦾 Full TypeScript support.
- ⚡️ Supports Vite, Webpack, Vue CLI, Rollup, esbuild and more, powered by [unplugin](https://github.com/unjs/unplugin).

## Installation

```bash
npm i unplugin-vue-autoref -D
```

<details>
<summary>Vite (first-class support)</summary><br>

```ts
// vite.config.ts
import AutoRef from 'unplugin-vue-autoref/vite'
import Vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [AutoRef(), Vue({ reactivityTransform: true })],
})
```

<br></details>

<details>
<summary>Rollup (first-class support)</summary><br>

```ts
// rollup.config.js
import Vue from 'unplugin-vue/rollup'
import AutoRef from 'unplugin-vue-autoref/rollup'

export default {
  plugins: [AutoRef(), Vue({ reactivityTransform: true })], // must be before Vue plugin!
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'

build({
  plugins: [
    require('unplugin-vue-autoref/esbuild')(), // must be before Vue plugin!
    require('unplugin-vue/esbuild')(),
  ],
})
```

<br></details>

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-vue-autoref/webpack')(), // must be before Vue plugin!
    require('unplugin-vue/webpack')(),
  ],
}
```

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [require('unplugin-vue-autoref/webpack')()],
  },
}
```

<br></details>

## TypeScript Support

```ts
// env.d.ts
/// <reference types="unplugin-vue-autoref/autoref-global" />
```

## Usage

```html
<script setup lang="ts">
let count = ref(0)
const updateCount = (num: number) => {
  count += num
}
</script>

<template>
  <button @click="updateCount(-1)">-</button>
  <h1>{{ count }}</h1>
  <button @click="updateCount(1)">+</button>
</template>

```

