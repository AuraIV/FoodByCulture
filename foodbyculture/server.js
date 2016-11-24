var http = require('http')
  , fs   = require('fs')
  , url  = require('url')
  , port = 8080;

var Yelp = require('yelp');
var OAuth = require('oauth');

//Yelp authentication
var yelp = new Yelp({
  consumer_key: 'feTHK0-ZF4oOlpdtgv_crw',
  consumer_secret: 'gv_KEZ8JQy1Q7N7whLqvePocFAk',
  token: 'dkCJ5iwv6AQesY8AdzlXRdVIxX7R2sUp',
  token_secret: 'frNGbchbX9T7QylpGVOrc7hew4s',
});


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
      sendFile(res, 'styles.css', 'text/css')
      break

      /**
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
      */

    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

function testAPI(){
  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: 'food', location: 'Newport, RI' })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });

  /**
  // See http://www.yelp.com/developers/documentation/v2/business
  yelp.business('yelp-san-francisco')
    .then(console.log)
    .catch(console.error);

  yelp.phoneSearch({ phone: '+15555555555' })
    .then(console.log)
    .catch(console.error);

  // A callback based API is also available:
  yelp.business('yelp-san-francisco', function(err, data) {
    if (err) return console.log(error);
    console.log(data);
  });
*/
}

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

  testAPI()
}


