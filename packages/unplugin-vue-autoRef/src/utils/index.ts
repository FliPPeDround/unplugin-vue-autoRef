import { parse } from '@vue/compiler-sfc'
import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'

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
