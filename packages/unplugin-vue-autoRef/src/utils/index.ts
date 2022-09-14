import { parse } from '@vue/compiler-sfc'
import { parse as babelParse } from '@babel/parser'
import type { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc'
import type MagicString from 'magic-string'
import type { VariableDeclaration, VariableDeclarator } from '@babel/types'
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

export const parseMacros = (code: string, s: MagicString, offset = 0) => {
  const ast = babelParse(code, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx', 'classProperties'],
  })
  traverse(ast, {
    CallExpression(path) {
      const calleeName = path.get('callee').toString()
      if (DEFINE_REF_MACROS.includes(calleeName)) {
        const names = getArrayPatternName(path.parentPath.node as VariableDeclarator)
        const { kind, start, end } = (path.parentPath.parentPath!.node as VariableDeclaration)
        const argument = path.get('arguments').toString()
        const { callee } = path.node
        if (names?.length === 0) {
          s.overwrite(
            callee.start! + offset,
            callee.end! + offset,
            `\$${calleeName}`,
          )
        }
        else if (names?.length === 2) {
          s.overwrite(
            start! + offset,
            end! + offset,
            `${kind} ${names[0]} = \$${calleeName}(${argument})
${kind} ${names[1]} = \$\$(${names[0]})`,
          )
        }
        else {
          throw new Error(`${calleeName} macro can only be used with one or two arguments`)
        }
      }
    },
  })
}

function getArrayPatternName(node: VariableDeclarator) {
  const refIdentifier = node.id
  if (refIdentifier.type === 'ArrayPattern') {
    const refIdentifierNames: string[] = []
    refIdentifier.elements.forEach((element) => {
      if (element!.type === 'Identifier')
        refIdentifierNames.push(element.name)
    })
    return refIdentifierNames
  }
  else if (refIdentifier.type === 'Identifier') {
    return []
  }
}

export const parseCommentMacros = (code: string, s: MagicString, offset = 0) => {
  const ast = babelParse(code, {
    sourceType: 'unambiguous',
    plugins: ['typescript', 'jsx', 'classProperties'],
  })
  if (!ast?.comments)
    return s
  traverse(ast, {
    VariableDeclarator(path) {
      // 找到同级的注释
      const comments = path.parentPath?.node.leadingComments
      if (!comments)
        return
      // 过滤值为@DEFINE_REF_MACROS的注释
      const comment = comments.find(comment => DEFINE_REF_MACROS.map(macros => `@${macros}`).includes(comment.value.trim()))
      const refComment = comment?.value.trim().replace('@', '')
      const refLiteral = path.get('init').toString()
      const { init } = path.node
      s.overwrite(
        init!.start! + offset,
        init!.end! + offset,
        `\$${refComment}(${refLiteral})`,
      )
    },
  })
}
