const http = require('http');
const content = require('./content')
const response = require('./response')
const request = require('./request')
class KKB {
  constructor() {
    this.middlewares = []
  }
  listen(...args) {
    const server = http.createServer(async (req, res) => {
      const ctx = this.createContent(req, res)
      const fn = this.compose(this.middlewares);
      // 执行合成函数并传入上下文
      await fn(ctx);
      res.end(ctx.body)
    })
    server.listen(...args)
  }
  use(middleware) {
    console.log(999, middleware)
    this.middlewares.push(middleware)
  }
  compose(middlewares) {
    return function (ctx) {
      return dispatch(0);

      function dispatch(i) {
        const fn = middlewares[i]
        if (!fn) {
          return Promise.resolve()
        } else {
          return Promise.resolve(fn(ctx, function next() {
            return dispatch(i + 1)
          }))
        }
      }
    }

  }
  createContent(req, res) {
    const ctx = Object.create(content)
    ctx.request = Object.create(request);
    ctx.response = Object.create(response)
    ctx.req = ctx.request.req = req;
    ctx.res = ctx.response.res = res
    return ctx
  }
}
module.exports = KKB;