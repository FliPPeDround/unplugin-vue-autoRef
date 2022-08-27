import MagicString from 'magic-string'
import { parseMacros, parseSFC } from '../utils'
import { DEFINE_REF_MACROS } from './constants'

function transformMacros(code: string, id: string) {
  if (!DEFINE_REF_MACROS.map(macros => code.includes(macros)).some(Boolean))
    return { code }

  const s = new MagicString(code)

  if (id.endsWith('.vue')) {
    const sfc = parseSFC(code, id)
    if (!sfc.script && !sfc.scriptSetup)
      return { code }
    const loc = sfc.scriptSetup?.loc || sfc.script?.loc
    parseMacros(loc!.source, s, loc!.start.offset)
  }
  else {
    parseMacros(code, s)
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
