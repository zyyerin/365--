var mymap = L.map('mapid').setView([51.505, -0.09], 13);


L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoieXVueWluZ3poYW5nIiwiYSI6ImNqN2U4eWZtbzBrY2YycXF1eHc2eGdjMWYifQ.1ITKmkS9Bv4jDb3URPgfmA'
}).addTo(mymap);

var marker = L.marker([51.5, -0.09]).addTo(mymap);
var circle = L.circle([51.508, -0.11], {
    color: 'blue',
    fillColor: '#fff',
    fillOpacity: 0.5,
    radius: 100
}).addTo(mymap);
