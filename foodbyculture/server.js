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
var Mediterranean = ['Mediterranean', 'Falafel', 'greek', 'mideastern', 'egyptian', 'lebanese']
var Italian = ['Pasta', 'Italian', 'Calabrian', 'Sardinian', 'Tuscan', 'Pizza']
var Asian = ['Korean', 'Japanese', 'Chinese', 'Sushi', 'asianfusion', 'panasian', 'Vietnamese', 'Thai', 'cantonese', 'dimsum', 'hainan', 'shanghainese', 'szechuan']
var Latin_America = ['Mexican', 'Tacos', 'Burritos', 'Salvadoran', 'Colombian','Venezuelan', 'Latin American', 'nicaraguan']
var French = ['French','Mauritius', 'Reunion']
var Indian = ['Indian']
var African = ['African', 'moroccan']
var TexMex = ['tex-mex']
 

var cultures = new Map();
var graph = [];
var count = 0;

cultures.set('American', American)
cultures.set('Mediterranean', Mediterranean)
cultures.set('Italian', Italian)
cultures.set('Asian', Asian)
cultures.set('Latin_America', Latin_America)
cultures.set('French', French)
cultures.set('Indian', Indian)
cultures.set('African', African)
cultures.set('Tex-Mex', TexMex)

var server = http.createServer (function (req, res) {
  var uri = url.parse(req.url)

  switch( uri.pathname ) {
    case '/':
      sendFile(res, 'index.html')
      break
    case '/index.html':
      contentType = 'text/html'
      sendFile(res, 'index.html', contentType)
      break;
    case '/styles.css':
      sendFile(res, 'styles.css', 'text/css')
      break
    case '/graph':
      if (count == 0){
      testAPI('Boston, MA')
      testAPI('Houston, TX')
    }
      count += count + 1;
      var funct = function(){res.end(JSON.stringify(graph));}
      setTimeout(funct, 2500)
      
      break
    default:
      res.end('404 not found')
  }
})

server.listen(process.env.PORT || port);
console.log('listening on 8080')

/**Function that gathers the data from the Yelp API. Takes the city name as a parameter */
function testAPI(city){

  yelp.search({ term: 'food', location: city, limit: 40 })
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
      //Only add if we haven't seen this culture yet
      if(result.indexOf(listOfFood[i][j].toLowerCase()) < 0){
        result.push(listOfFood[i][j].toLowerCase())
      }
    }
  }
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
  var found_cultures = []

  //Look at each food
  for(i = 0; i < listOfFood.length; i++){
    //Try to match them with our cultures
    for (var [key, value] of cultures.entries()) {
      var re = new RegExp(".*" + listOfFood[i] + ".*", "i");
      //Have we seen this culture yet?
      for(j = 0; j < value.length; j++){
        if(re.test(value[j])){ 
          if(found_cultures.indexOf(value[j]) < 0){
            found_cultures.push(key)  
          }
        }
      }
    } 
  }
 // console.log('The cultures are: ' + found_cultures)
  return found_cultures
}
/**
 * Function to process yelp data and manipulate further
 * Grabs specific pieces of information such as name, ratings, categories, etc.
 */
function processData(data){
  //Array of all of the businesses from the yelp response
  var yelp_data = data.businesses;

  var flitered_data;
  var results = []
  var final = new Map();
  for(var i = 0; i < yelp_data.length; i++){
    var rating = yelp_data[i].rating
    var name = yelp_data[i].name
    results.push(matchCategory(yelp_data[i]));  
  }  

/**
Goes through the list of results to map it to it's corresponding */
 for(i = 0; i < results.length; i++){

      var rest = results[i]; //Particular restaurant's culture
      // console.log(rest);

      for(j = 0; j < rest.length; j++){
       // Have we seen this culture before? If so, add one to it as we encountered again
       //Otherwise, set it to one.
        if(final.has(rest[j])){
          final.set(rest[j], final.get(rest[j]) + 1);
        }
        else{
          final.set(rest[j], 1);
        } 
    }
}

//For each element in the key, map it to an object, then to an array of that object
  final.forEach(function(value,key,final) {
    var currentObject = {};
    currentObject.key = key;
    currentObject.value = value;
    graph.push(currentObject);
  });

}
  

function sendFile(res, filename, contentType) {
  contentType = contentType || 'text/html'

  fs.readFile(filename, function(error, content) {
    res.writeHead(200, {'Content-type': contentType})
    res.end(content, 'utf-8')
  })

}


