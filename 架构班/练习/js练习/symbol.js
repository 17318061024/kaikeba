const gender = Symbol('gender')
const obj = {
  name: 'Sunshine_Lin',
  age: 23,
  [gender]: '男',
  get sex(){
    return '公主哦'
  }
}
console.log(obj['name']) // 'Sunshine_Lin'
console.log(obj['age']) // 23
console.log(obj[gender]) // 男
console.log('getSex',obj.sex);


