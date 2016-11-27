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

// cycle through the array and request for its latLong using GMAPS API
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
    fs.writeFileSync('/home/ubuntu/workspace/week3/output.txt', JSON.stringify(meetingsData));
});