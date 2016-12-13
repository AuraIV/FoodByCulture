console.log("Here?")

var mymap = L.map('mapBos').setView([42.36, -71], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'auraiv.2an1ei7o',
    accessToken: 'pk.eyJ1IjoiYXVyYWl2IiwiYSI6ImNpd2dsbHhpNTAxN2EydWtpbTZxaXlkc3oifQ.nRvu3pgGsCFaa3_rvd537g'
}).addTo(mymap);

var mymap2 = L.map('mapHou').setView([29.7, -95.4], 13);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'auraiv.2anbb5a9',
    accessToken: 'pk.eyJ1IjoiYXVyYWl2IiwiYSI6ImNpd2dsbHhpNTAxN2EydWtpbTZxaXlkc3oifQ.nRvu3pgGsCFaa3_rvd537g'
}).addTo(mymap2);


makeGet('heatMapBos', 'Bos')
makeGet('heatMapHou', 'Hou')

function makeGet(url, city) {
  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    handleRes(req, city);
  }

  req.open('GET', url);
  req.send();
}

function handleRes(req, city) {

  if( req.readyState !== XMLHttpRequest.DONE )
    return;

  if(req.status === 200){
    buildMap( JSON.parse(req.responseText), city);
  }
}
var Arr;
var i = 1;

function buildMap( A, city) {
if(city == 'Bos'){
for(var i of A){
var marker = L.marker([i.lat, i.long]).addTo(mymap).bindPopup(i.name);
}
}
if( city == 'Hou'){
  
  for(var i of A){
var marker = L.marker([i.lat, i.long]).addTo(mymap2) .bindPopup(i.name);
}
}


}

