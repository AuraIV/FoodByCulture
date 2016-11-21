var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html')
      break
    case '/index.html':
      contentType = 'text/html'
      sendFile(res, 'index.html', contentType)
      break
    case '/styles.css':
      sendCSS(res, 'styles.css')
      break
    case '/img/SAPIC.gif':
      contentType = 'image/gif'
      sendFile(res, 'img/SAPIC.gif', contentType)
      break
    case '/img/GitHub-Mark-32px.gif':
      contentType = 'image/gif'
      sendFile(res, 'img/GitHub-Mark-32px.gif', contentType)
      break
    case '/img/Twitter_Logo_Blue.gif':
      contentType = 'image/gif'
      sendFile(res, 'img/Twitter_Logo_Blue.gif', contentType)
      break
    case '/img/In-2C-34px-R.gif':
      contentType = 'image/gif'
      sendFile(res, 'img/In-2C-34px-R.gif', contentType)
      break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

// subroutines

function sendFile(res, filename, contentType) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}

function sendCSS(res, filename) {

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': 'text/css'})
    res.end(content, 'utf-8')
  })

}