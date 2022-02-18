 const Koa = require('./kkb')
 const Router = require('./router')
 const app = new Koa()
 const router = new Router();
 router.get('/index', async ctx => {
   console.log('index,xx')
   ctx.body = 'index page';
 });
 router.get('/post', async ctx => {
   ctx.body = 'post page';
 });
 router.get('/list', async ctx => {
   ctx.body = 'list page';
 });
 router.post('/index', async ctx => {
   ctx.body = 'post page';
 }); // 路由实例输出父中间件 router.routes()
 app.use(router.routes());
 app.listen(3000, () => {
   console.log('server runing on port 3000')
 })