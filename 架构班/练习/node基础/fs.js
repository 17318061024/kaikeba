// const fs=require("fs").promises
// const data=fs.readFileSync("./config.json");
// console.log('data',data.toString())
// const data=fs.readFile("./config.json").then((data)=>{
//   console.log('data',data.toString())
// })
// console.log('end')
function promisify(fn){
  return (...args)=>{
   
    return new Promise((resolve,reject)=>{
      args.push((err,...args)=>{
        if(err){
          reject(err)
        }else{
          resolve(args)
        }
      })
      fn.apply(null,args)

    })
    
  }
}
const fs =require('fs');
const readFile=promisify(fs.readFile);
readFile('./config.json').then(data=>console.log("data",data.toString()))