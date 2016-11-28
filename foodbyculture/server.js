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
    */

    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

function testAPI(){

  var url = 'http://api.yelp.com/v2/search'
  var parameters = 'term=cream+puffs&location=San+Francisco'

  //Full API url
  var apiURL = url + '?' + parameters

  // See http://www.yelp.com/developers/documentation/v2/search_api
  yelp.search({ term: 'food', location: 'Newport, RI', limit: 2 })
  .then(function (data) {
    processData(data)
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

function processData(data){
  //Array of all of the businesses from the yelp response
  var yelp_data = data.businesses;

  //We could make this a list of the data we do want and then use that 
  var filtered_data;

  for(var i in yelp_data){
    var rating = yelp_data[i].rating
    var name = yelp_data[i].name
    var categories = yelp_data[i].categories

    console.log('Name of restaurant: ' + name)
    console.log('Rating: ' + rating)
    console.log('Categories ' + categories)

  }
}

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

  testAPI()
}


