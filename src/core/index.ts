import type { CallExpression, Node, VariableDeclarator } from '@babel/types'
import { MagicString } from '@vue/compiler-sfc'
import { parseSFC } from './../utils'
import type { SFCCompiled } from './../utils'

function transform(code: string, id: string) {
  const sfc = parseSFC(code, id)
  const { isSetup } = sfc
  const decls = filterMarcos(sfc)
  let scriptCode = sfc.scriptSetup?.loc.source || sfc.script?.loc.source

  const s = new MagicString(code)

  // 将ref替换成$ref
  decls?.forEach((decl, index) => {
    const { init } = decl
    const { callee } = init as CallExpression
    if (callee.type === 'Identifier' && callee.name === 'ref')
      scriptCode = `${scriptCode!.slice(0, callee.start! + index)}$ref${scriptCode!.slice(callee.end! + index)}`
  })

  // 拼接重新生成代码
  if (isSetup)
    s.overwrite(sfc.scriptSetup!.loc.start.offset!, sfc.scriptSetup!.loc.end.offset!, scriptCode!)
  else
    s.overwrite(sfc.script!.loc.start.offset!, sfc.script!.loc.end.offset!, scriptCode!)

  return {
    code: s.toString(),
    get map() {
      return s.generateMap({ hires: true })
    },
  }
}

// 过滤出所有的ref
function filterMarcos(sfc: SFCCompiled) {
  const { scriptCompiled, isSetup } = sfc
  const scriptAst = scriptCompiled?.scriptSetupAst || scriptCompiled?.scriptAst
  if (isSetup) {
    return findRef(scriptAst as Node[])
  }
  else {
    return scriptAst?.flatMap((node: Node): VariableDeclarator[] => {
      if (node.type !== 'ExportDefaultDeclaration')
        return []
      if (node.declaration.type !== 'ObjectExpression')
        return []
      if (node.declaration.properties[0].type !== 'ObjectMethod')
        return []
      const setupNode = node.declaration.properties[0].body.body
      return findRef(setupNode)
    })
  }
}

// 查找ref
function findRef(nodes: Node[]): VariableDeclarator[] {
  return nodes?.flatMap((node: Node): VariableDeclarator[] => {
    if (node.type !== 'VariableDeclaration')
      return []
    const decls = node.declarations.filter((decl) => {
      return (
        decl.init?.type === 'CallExpression'
      && decl.init.callee.type === 'Identifier'
      && decl.init.callee.name === 'ref'
      )
    })
    return decls
  })
}

export {
  transform,
}
