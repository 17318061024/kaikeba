const fs = require('fs');
const path = require('path');
const parse = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const babel = require("@babel/core")

function getModuleInfo(file) {
  const body = fs.readFileSync(file, 'utf-8')
  const ast = parse.parse(body, {
    sourceType: 'module'
  })
  const deps = {};
  traverse(ast, {
    ImportDeclaration({
      node
    }) {
      const dirname = path.dirname(file);
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
     
    }
  })
  const {code}=babel.transformFromAst(ast,null,{
    presets:['@babel/preset-env']
  })
  const moduleInfo={
    file,
    deps,
    code
  }
  return moduleInfo

}

// const info = getModuleInfo("./src/index.js")


function parseModule(file){
  const entry=getModuleInfo(file);
  const temp=[entry]
  const depsGraph={}
  getDeps(temp,entry);
  temp.forEach(info=>{
    depsGraph[info.file]={
      deps:info.deps,
      code:info.code
    }
  })
  return depsGraph

}
function getDeps(temp,{deps}){
  Object.keys(deps).forEach(file=>{
    const child=getModuleInfo(deps[file])
    temp.push(child)
    getDeps(temp,child)
  })
}
// const arr=parseModule('./src/index.js');
// console.log(arr)
function bundle(file){
  const depsGraph=JSON.stringify(parseModule(file));
  return`(function(graph){ 
    function require(file){
      function absRequire(relPath){
        return require(graph[file].deps[relPath])
      }
      var exports={};
      (function(require,exports,code){
        eval(code)
      })(absRequire,exports,graph[file].code)
      return exports
    }
    require('${file}')

  })(${depsGraph})`
  
}
const content=bundle('./src/index.js')
!fs.existsSync('./dist') && fs.mkdirSync('./dist')
fs.writeFileSync('./dist/bundle.js',content)