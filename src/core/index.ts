import traverse from '@babel/traverse'
import parser from '@babel/parser'
import { MagicString } from '@vue/compiler-sfc'
import { parseSFC } from './../utils'
import { DEFINE_REF_MACROS } from './constants'

function transform(code: string, id: string) {
  if (!DEFINE_REF_MACROS.map(macros => code.includes(macros)).some(Boolean))
    return { code }

  const sfc = parseSFC(code, id)
  if (!sfc.script && !sfc.scriptSetup)
    return { code }

  const loc = sfc.scriptSetup?.loc || sfc.script?.loc

  const s = new MagicString(code)

  const ast = parser.parse(loc!.source, {
    sourceType: 'unambiguous',
  })

  traverse(ast, {
    CallExpression(path) {
      const calleeName = path.get('callee').toString()
      if (DEFINE_REF_MACROS.includes(calleeName)) {
        const { callee } = path.node
        s.overwrite(callee.start! + loc!.start.offset, callee.end! + loc!.start.offset, `\$${calleeName}`)
      }
    },
  })

  return {
    code: s.toString(),
    get map() {
      return s.generateMap({ hires: true })
    },
  }
}

export {
  transform,
}
