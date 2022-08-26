# unplugin-vue-autoRef [![npm](https://img.shields.io/npm/v/unplugin-vue-autoref.svg)](https://npmjs.com/package/unplugin-vue-autoref)

更激进的vue响应式系统转换语法糖底层来自vue的响应式转换！
<br/>
### 以下示例与响应式转换说明均来自[Vue Reactive Transform](https://cn.vuejs.org/guide/extras/reactivity-transform.html)
<br/>
自从引入组合式 API 的概念以来，一个主要的未解决的问题就是 ref 和响应式对象到底用哪个。响应式对象存在解构丢失响应性的问题，而 ref 需要到处使用 .value 则感觉很繁琐，并且在没有类型系统的帮助时很容易漏掉 .value。

**unplugin-vue-autoref**是一个编译时的转换步骤，让我们可以像这样书写代码：
```html
<script setup>
let count = ref(0)

console.log(count)

function increment() {
  count++
}
</script>

<template>
  <button @click="increment">{{ count }}</button>
</template>
```

虽然响应式变量使我们可以不再受 .value 的困扰，但它也使得我们在函数间传递响应式变量时可能造成“响应性丢失”的问题。

假设有一个期望接收一个 ref 对象为参数的函数：
```ts
function trackChange(x: Ref<number>) {
  watch(x, (x) => {
    console.log('x 改变了！')
  })
}

let count = ref(0)
trackChange(count) // 无效！
```
上面的例子不会正常工作，因为代码被编译成了这样：
```ts
let count = ref(0)
trackChange(count.value)
```
这里的 count.value 是以一个 number 类型值的形式传入，然而 trackChange 期望接收的是一个真正的 ref。要解决这个问题，可以在将 count 作为参数传入之前，用 $$() 包装或使用一个[value, ref]来接受ref返回值：

```ts
let count = ref(0)
- trackChange(count)
+ trackChange($$(count))
```
```ts
let [count, countRef] = ref(0)
- trackChange(count)
+ trackChange(countRef)
```
上面的代码都将被编译成：
```ts
import { ref } from 'vue'

let count = ref(0)
trackChange(count)
```

## 包括

每一个会返回 ref 的响应式 API 都变成相对应的宏函数。包括以下这些

- `ref`
- `computed`
- `shallowRef`
- `customRef`
- `toRef`

当启用响应性语法糖时，这些宏函数都是全局可用的、**无需手动导入**。

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

