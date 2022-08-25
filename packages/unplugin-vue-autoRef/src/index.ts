import { createUnplugin } from 'unplugin'
import { createFilter } from '@rollup/pluginutils'
import type { FilterPattern } from '@rollup/pluginutils'
import { transformMacros } from './core'

export interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  /**
   * $ref alias
   * @default ref
   */
  refAlias?: string
}

export type OptionsResolved = Omit<Required<Options>, 'exclude'> & {
  exclude?: FilterPattern
}

function resolveOption(options: Options): OptionsResolved {
  return {
    include: [/\.vue$/, /\.setup\.[cm]?[jt]sx?/],
    refAlias: '',
    ...options,
  }
}

const name = 'unplugin-vue-autoRef'

export const unplugin = createUnplugin((userOptions: Options = {}) => {
  const options = resolveOption(userOptions)
  const filter = createFilter(options.include, options.exclude)

  return {
    name,
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    transform(code, id) {
      return transformMacros(code, id, options.refAlias)
      // try {
      //   return transformMacros(code, id, options.refAlias).code
      // }
      // catch (err: unknown) {
      //   this.error(`${name} ${err}`)
      // }
    },
  }
})

export const vitePlugin = unplugin.vite
export const rollupPlugin = unplugin.rollup
export const webpackPlugin = unplugin.webpack
export const esbuildPlugin = unplugin.esbuild
