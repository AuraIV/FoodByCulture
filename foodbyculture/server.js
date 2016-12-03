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

//Array of food categories needed for the classfication of cultures of restaurants
var American = ['Burgers', 'Hot Dogs', 'Sandwiches', 'Soul Food', 'American']
var Mediterranean = ['Mediterranean', 'Falafel']
var Italian = ['Pasta', 'Italian', 'Calabrian', 'Sardinian', 'Tuscan']
var Asian = ['Korean', 'Japanese', 'Chinese', 'Sushi']
var Latin_America = ['Mexican', 'Tacos', 'Burritos', 'Salvadoran', 'Colombian','Venezuelan', 'Latin American']
var French = ['French','Mauritius', 'Reunion']
var Indian = ['Indian']
var African = ['African']


var cultures = new Map();

cultures.set('American', American)
cultures.set('Mediterranean', Mediterranean)
cultures.set('Italian', Italian)
cultures.set('Asian', Asian)
cultures.set('Latin_America', Latin_America)
cultures.set('French', French)
cultures.set('Indian', Indian)
cultures.set('African', African)

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
  yelp.search({ term: 'food', location: 'Newport, RI', limit: 1 })
  .then(function (data) {
    processData(data)
  })
  .catch(function (err) {
    console.error(err);
  });


}

/**
 * Helper function to make the nested array into a singular array of food
 *
 */
function gatherFood(listOfFood){
  var result = []
  for(i = 0; i < listOfFood.length; i++){
    for(j = 0; j < listOfFood[i].length; j++){
      result.push(listOfFood[i][j])
    }
  }
  console.log("Foods: " + result)
  return result;
}

/**
 * Attempt to match the categories of the restaurant to a culture
 *
 */
function matchCategory(restaurant){
  //Create regular expression based on the restaurants categories
  var categories = restaurant.categories
  var listOfFood = gatherFood(categories)
  var culture_type = '';
  var len = cultures.size;

  for(i = 0; i < listOfFood.length; i++){
    for (var [key, value] of cultures.entries()) {
      if(value.indexOf(listOfFood[i]) > -1){
        console.log('The culture is: ' + key)
      }
    } 
  }
  

}
/**
 * Function to process yelp data and manipulate further
 * Grabs specific pieces of information such as name, ratings, categories, etc.
 */
function processData(data){
  //Array of all of the businesses from the yelp response
  var yelp_data = data.businesses;

  //We could make this a list of the data we do want and then use that 
  var flitered_data;
  for(var i = 0; i < yelp_data.length; i++){
    var rating = yelp_data[i].rating
    var name = yelp_data[i].name
    console.log('Name of restaurant: ' + name)
    console.log('Rating: ' + rating)

    matchCategory(yelp_data[i])
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


