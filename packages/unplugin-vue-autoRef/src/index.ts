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

export default createUnplugin((userOptions: Options = {}) => {
  const options = resolveOption(userOptions)
  const filter = createFilter(options.include, options.exclude)

  return {
    name,
    enforce: 'pre',
    transformInclude(id) {
      return filter(id)
    },
    transform(code, id) {
      try {
        // eslint-disable-next-line no-octal-escape, no-console
        console.log('\033[33m \n ✈️  [unplugin-vue-autoRef] Reactivity transform \033[39m\n')
        return transformMacros(code, id, options.refAlias).code
      }
      catch (err: unknown) {
        this.error(`${name} ${err}`)
      }
    },
  }
})
