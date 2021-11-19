// const http = require("http");
// const fs = require("fs");
// const serve = http.createServer((request, response) => {
//   const {
//     url,
//     method,
//     headers
//   } = request;
//   if (url === '/' && method === 'GET') {
//     fs.readFile('./index.html', (err, data) => {
//       if (err) {
//         response.writeHead(500, {
//           'Content-Type': "text/html"
//         })
//         response.end("500 出错了")
//         return
//       }
//       response.statusCode = 200;
//       response.setHeader('Content-Type', "text/html")
//       response.end(data)
//     })
//   } else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
//     // 图片文件服务
//     fs.createReadStream('./'+url).pipe(response)
// } else {
//     response.statusCode = 404;
//     response.setHeader('Content-Type', "text/pain;charset=utf-8")
//     response.end('404 没有此中文')
//   }
// })
// serve.listen(3000)

const http = require('http')
const fs = require('fs')
const server = http.createServer((request, response) => {
    // response.end('hello ...')
    const { url, method ,headers} = request
    if (url === '/' && method === 'GET'){
        // 静态页面服务
        fs.readFile('index.html',(err,data) => {
            response.statusCode = 200
            response.setHeader('Content-Type','text/html')
            response.end(data)
        })
    }else if(url === '/users' && method === 'GET'){
        // Ajax服务
        response.writeHead(200,{
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify({
            name : 'laowang'
        }))
    }else if(method === 'GET' && headers.accept.indexOf('image/*') !== -1){
        // 图片文件服务
        response.setHeader('Content-Type', "image/png")
        response.setHeader("Transfer-Encoding","chunked")
        fs.createReadStream('./'+url).pipe(response)
    }

})
server.listen(3000)