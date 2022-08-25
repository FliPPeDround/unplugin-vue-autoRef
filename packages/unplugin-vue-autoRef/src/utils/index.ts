import { parse } from '@vue/compiler-sfc'
import { parse as babelParse } from '@babel/parser'
import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import type MagicString from 'magic-string'
import traverse from '@babel/traverse'
import { DEFINE_REF_MACROS } from '../core/constants'

export type _SFCScriptBlock = Omit<
  SFCScriptBlock,
  'scriptAst' | 'scriptSetupAst'
>

export type SFCCompiled = Omit<SFCDescriptor, 'script' | 'scriptSetup'> & {
  script?: _SFCScriptBlock | null
  scriptSetup?: _SFCScriptBlock | null
  lang: string | undefined
  isSetup: boolean
}

export const parseSFC = (code: string, id: string): SFCCompiled => {
  const { descriptor } = parse(code, {
    filename: id,
  })
  const isSetup = !!descriptor.scriptSetup
  const lang = (descriptor.script || descriptor.scriptSetup)?.lang

  return {
    ...descriptor,
    lang,
    isSetup,
  }
}

export const parseMacros = (code: string, s: MagicString, refAlias: string, offset = 0) => {
  const ast = babelParse(code, {
    sourceType: 'unambiguous',
  })
  traverse(ast, {
    CallExpression(path) {
      const calleeName = path.get('callee').toString()
      if (DEFINE_REF_MACROS.includes(calleeName)) {
        const { callee } = path.node
        s.overwrite(
          callee.start! + offset,
          callee.end! + offset,
          calleeName === refAlias ? '$ref' : `\$${calleeName}`,
        )
      }
    },
  })
}
