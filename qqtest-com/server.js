var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url
  var queryString = ''
  if (pathWithQuery.indexOf('?') >= 0) {
    queryString = pathWithQuery.substring(pathWithQuery.indexOf('?'))
  }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)
  if (path === '/') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    let string = fs.readFileSync('./public/index.html')
    response.write(string)
    response.end()
  } else if (path === '/qq.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    let string = fs.readFileSync('./public/qq.js')
    response.write(string)
    response.end()
  } else if (path === '/friends.json') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    let string = fs.readFileSync('./public/friends.json')
    response.write(string)
    response.end()
  } else if (path === '/friends.js') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    let string = fs.readFileSync('./public/friends.js').toString()
    let data = fs.readFileSync('./public/friends.json').toString()
    let string2 = string.replace('{{data}}', data)
    string2 = string2.replace('{{xxx}}', query.callback)
    response.write(string2)
    response.end()
  } else if (path === '/allow-all.json') {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/json;charset=utf-8')
    response.setHeader('Access-Control-Allow-Origin', '*')
    let string = fs.readFileSync('./public/allow-all.json')
    response.write(string)
    response.end()
  } else {
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    try {
      const string = fs.readFileSync('src' + path)
      response.write(string)
      response.end()
    } catch (err) {
      response.statusCode = 404
      const string = '文件不存在'
      response.write(string)
      response.end()
    }
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功')
