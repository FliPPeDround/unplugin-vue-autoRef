# unplugin-vue-autoRef [![npm](https://img.shields.io/npm/v/unplugin-vue-autoref.svg)](https://npmjs.com/package/unplugin-vue-autoref)

English | [简体中文](./README-zh-CN.md)

More radical reactive tansform macros in Vue.

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

### TypeScript Support

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

