// const add = (x, y) => x + y;
// const square = (z) => z * z;
// const componse = (...[first, ...other]) => (...args) => other.reduce((a, b) => {
//   console.log(a, b)
//   return b(a)
// }, first(...args))
// const fn = componse(add, square, square, square)
// console.log(fn(1, 2));


// function compose(middlewares) {
//   return dispatch(0);

//   function dispatch(i) {
//     const fn = middlewares[i]
//     if (!fn) {
//       // return Promise.resolve()
//     } else {
//       return Promise.resolve(fn(function next() {
//         return dispatch(i + 1)
//       }))
//     }

//   }
// }
const compose = (middlewares = []) => () => {
  // 保证 middlewares 为数组
  if (!Array.isArray(middlewares)) {
    middlewares = Array.from(arguments);
  }
  // 保证 middlewares 内的每一项为函数
  if (middlewares.some(fn => typeof fn !== 'function')) {
    throw new TypeError('Middleware must be composed of functions!');
  }

  if (middlewares.length === 0) {
    return Promise.resolve();
  } else if (middlewares.length === 1) {
    return Promise.resolve(middlewares[0].call(null, () => Promise.resolve()));
  } else {
    // compose reduce实现
    return middlewares
      .map(item => item)
      .reverse()
      .reduce((pre, cur) => () => cur(() => pre(() => {})))();
  }
};

compose([fn1, fn2, fn3])()
async function fn1(next) {
  console.log("fn1");
  await next();
  console.log("end fn1")
}
async function fn2(next) {
  console.log("fn2");
  await delay()
  await next();
  console.log("end fn2")
}
async function fn3(next) {
  console.log("fn3");
  await next();
  console.log("end fn3")
}

function delay() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
}