import MagicString from 'magic-string'
import { parseMacros, parseSFC } from '../utils'
import { DEFINE_REF_MACROS } from './constants'

function transformMacros(code: string, id: string, refAlias?: string) {
  if (refAlias)
    DEFINE_REF_MACROS.push(refAlias)

  if (!DEFINE_REF_MACROS.map(macros => code.includes(macros)).some(Boolean))
    return { code }

  const s = new MagicString(code)

  if (id.endsWith('.vue')) {
    const sfc = parseSFC(code, id)
    if (!sfc.script && !sfc.scriptSetup)
      return { code }
    const loc = sfc.scriptSetup?.loc || sfc.script?.loc
    parseMacros(loc!.source, s, refAlias!, loc!.start.offset)
  }
  else if (id.endsWith('.ts') || id.endsWith('.js')) {
    parseMacros(code, s, refAlias!)
  }

  return {
    code: s.toString(),
    get map() {
      return s.generateMap({ hires: true })
    },
  }
}

export {
  transformMacros,
}
