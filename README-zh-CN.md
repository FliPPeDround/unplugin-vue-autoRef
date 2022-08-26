# unplugin-vue-autoRef 

更激进的vue响应式系统转换语法糖

## 特性


- ✨ 更激进的vue响应式系统转换语法糖。
- 💚 开箱即用支持SFC和JSX。
- 🦾 完美支持TypeScript。
- ⚡️ 支持 Vite、Webpack、Vue CLI、Rollup、esbuild 等, 由 [unplugin](https://github.com/unjs/unplugin) 提供支持。

## 安装

```bash
npm i unplugin-vue-autoref -D
```

<details>
<summary>Vite (一流支持)</summary><br>

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
<summary>Rollup (一流支持)</summary><br>

```ts
// rollup.config.js
import Vue from 'unplugin-vue/rollup'
import AutoRef from 'unplugin-vue-autoref/rollup'

export default {
  plugins: [AutoRef(), Vue({ reactivityTransform: true })], // 必须在vue插件之前!
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
    require('unplugin-vue-autoref/esbuild')(), // 必须在vue插件之前!
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
    require('unplugin-vue-autoref/webpack')(), // 必须在vue插件之前!
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

### TypeScript 支持

```ts
// env.d.ts
/// <reference types="unplugin-vue-autoref/autoref-global" />
```

## 使用

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

