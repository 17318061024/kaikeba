const space = (str) => str.split(' ')
const len = (arr) => arr.length


// 普通写法
console.log(len(space('i am linsanxin'))) // 3
console.log(len(space('i am 23 year old'))) // 5
console.log(len(space('i am a author in juejin'))) 

function compose(...fn){
  return (string)=>{
   return fn.reduce((result,currentFn)=>{
     return  currentFn(result)
    },string)
  
  }
}
const computedWord=compose(space,len);
console.log(computedWord('I am Jom !'));


