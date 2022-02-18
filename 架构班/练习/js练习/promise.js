class MyPromise {
  constructor(execute) {
    this.initBind();
    this.initData();
    try {
      execute(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }
  initBind() {
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
  }
  initData() {
    this.PromiseResult = null;
    this.PromiseState = "pending";
    this.onFulfilledCallbanks = [];
    this.onRejectedCallbanks = [];
  }
  resolve(value) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "fulfilled";
    this.PromiseResult = value;
    while (this.onFulfilledCallbanks.length > 0) {
      this.onFulfilledCallbanks.shift()(this.PromiseResult);
    }
  }
  reject(reason) {
    if (this.PromiseState !== "pending") return;
    this.PromiseState = "rejected";
    this.PromiseResult = reason;
    while (this.onRejectedCallbanks.length) {
      this.onRejectedCallbanks.shift()(this.PromiseResult);
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function" ? onRejected : (reason) => {
        throw Error(reason)
      };

    return new MyPromise((resolve, reject) => {
      const reslovePromise = cb => {
        console.log(cb, this.PromiseResult)
        try {
          const x = cb(this.PromiseResult);
          console.log(x)
          if (x === reslovePromise) {
            throw new Error('不能返回自己')
          }
          if (x instanceof MyPromise) {
            console.log(resolve)
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      }
      // console.log()
      if (this.PromiseState === "fulfilled") {

        reslovePromise(onFulfilled);
      } else if (this.PromiseState === "rejected") {
        reslovePromise(onRejected);
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbanks.push(onFulfilled.bind(this));
        this.onRejectedCallbanks.push(onRejected.bind(this))
      }
    })


  }
}
const myPromise1 = new MyPromise((resolve, reject) => {

  // setTimeout(() => {
  //   resolve(100)
  //   // reject("失败了");
  // }, 2000)

  resolve(100)

  // throw ('error')
});
myPromise1
  .then(res => {
    console.log('haha', res);
    console.log(myPromise1.PromiseState)
    return 2 * res

  }, err => 3 * err)
  .then(res => console.log(res * 2), err => console.log(err))
// myPromise1.then(
//   (result) => console.log(result),
//   (reason) => console.log(reason, "err2")
// );
// console.log('myPromise1', myPromise1);