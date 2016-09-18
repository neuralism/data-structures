// require modules
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async'); 

// address variables
var content = fs.readFileSync('/home/ubuntu/workspace/week3/data/m01.txt');
var $ = cheerio.load(content);
var addresses = [];

// array that will hold meeting addresses and lat/long coords
var meetingsData = [];

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;

// push extracted addresses into an array
$('tbody tr').each(function(i, elem) {
    addresses.push($(elem).find('td').first().html().split('\n')[3].split(',')[0].split('- ')[0].split('(')[0].trim() + ', New York, NY');
});

// cycle through the array and request for its latLong using Gmaps API
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetingsData);
});

/*
Output:
[ { address: '20 Cardinal Hayes Place, New York, NY',
    latLong: { lat: 40.7133468, lng: -74.0025814 } },
  { address: '20 Cardinal Hayes Place, New York, NY',
    latLong: { lat: 40.7133468, lng: -74.0025814 } },
  { address: '29 Mott Street, New York, NY',
    latLong: { lat: 40.7148115, lng: -73.99911709999999 } },
  { address: '49 Fulton Street, New York, NY',
    latLong: { lat: 40.7081354, lng: -74.00394519999999 } },
  { address: '44 John Street, New York, NY',
    latLong: { lat: 40.7091344, lng: -74.0081019 } },
  { address: '49 Fulton Street, New York, NY',
    latLong: { lat: 40.7081354, lng: -74.00394519999999 } },
  { address: '20 Cardinal Hayes Place, New York, NY',
    latLong: { lat: 40.7133468, lng: -74.0025814 } },
  { address: '22 Barclay Street, New York, NY',
    latLong: { lat: 40.7123651, lng: -74.00956409999999 } },
  { address: '20 Cardinal Hayes Place, New York, NY',
    latLong: { lat: 40.7133468, lng: -74.0025814 } },
  { address: '22 Barclay Street, New York, NY',
    latLong: { lat: 40.7123651, lng: -74.00956409999999 } },
  { address: '283 West Broadway, New York, NY',
    latLong: { lat: 40.7208017, lng: -74.0048389 } },
  { address: '125 Barclay Street, New York, NY',
    latLong: { lat: 40.7145883, lng: -74.01295809999999 } },
  { address: '49 Fulton Street, New York, NY',
    latLong: { lat: 40.7081354, lng: -74.00394519999999 } },
  { address: '49 Fulton Street, New York, NY',
    latLong: { lat: 40.7081354, lng: -74.00394519999999 } },
  { address: '20 Cardinal Hayes Place, New York, NY',
    latLong: { lat: 40.7133468, lng: -74.0025814 } },
  { address: '283 West Broadway, New York, NY',
    latLong: { lat: 40.7208017, lng: -74.0048389 } },
  { address: '49 Fulton Street, New York, NY',
    latLong: { lat: 40.7081354, lng: -74.00394519999999 } },
  { address: '22 Barclay Street, New York, NY',
    latLong: { lat: 40.7123651, lng: -74.00956409999999 } },
  { address: '20 Cardinal Hayes Place, New York, NY',
    latLong: { lat: 40.7133468, lng: -74.0025814 } },
  { address: '283 West Broadway, New York, NY',
    latLong: { lat: 40.7208017, lng: -74.0048389 } },
  { address: '283 West Broadway, New York, NY',
    latLong: { lat: 40.7208017, lng: -74.0048389 } },
  { address: '283 W. Broadway, New York, NY',
    latLong: { lat: 40.7208017, lng: -74.0048389 } } ]
*/