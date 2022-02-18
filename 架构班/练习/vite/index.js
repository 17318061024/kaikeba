const koa=require("koa");
const app=new koa();
const fs=require("fs")
const path=require("path")
app.use(async ctx=>{
  const {request:{url,query}}=ctx;
  if(url==='/'){
    ctx.type="text/html";
    const content=fs.readFileSync('./index.html','utf-8')
    ctx.body=content
  }else if(url.endsWith('.js')){
    const p=path.resolve(__dirname,url.slice(1))
    console.log(p,'p')
    ctx.type="application/javascript";
    const content=fs.readFileSync(p,'utf-8')
    ctx.body=content
  }
})
app.listen(3000,(err)=>{
  console.log('Vite',err);
  
})