// require modules
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var asyncEachObject = require('async-each-object')

// address variables
var content = fs.readFileSync('/home/ubuntu/workspace/week5/data/m01.txt');
var $ = cheerio.load(content);

// SETTING ENVIRONMENT VARIABLES (in Linux):
// export NEW_VAR="Content of NEW_VAR variable"
// printenv | grep NEW_VAR
var apiKey = process.env.GMAKEY;
var meetings = [];

// select 'hours' column and run the script through each row
$('tbody tr').each(function(i, elem) {
    // split every individual meeting into an array and remove initial trailing whitespace
    var data = $(elem).find('td').eq(1).html().replace('\r\n                    \t\t\r\n\t\t\t\t\t', '').split('<br>\r\n                    \t<br>');
    // loop through each item in an array
    for (var i = 0; i < data.length; i++) {
        // ignore items which are blank
        if (data[i] !== '') {
            // further cleaning up - remove new line, carriage return, tab characters, forward slahes, <br>s, and <b>s
            var text = data[i].replace(/[\r\n\t\/]/g, '').replace(/(<br>)/g, '').replace(/(<b>)/g, '');
            
            // meeting object to hold meeting info
            var meeting = new Object;
            meeting.address = $(elem).find('td').eq(0).html().split('\n')[3].split(',')[0].split('- ')[0].split('(')[0].trim() + ', New York, NY';
            meeting.days = text.split('From')[0].trim();
            meeting.start = convertTo24Hour(text.split('From')[1].split('to')[0].trim());
            meeting.end = convertTo24Hour(text.split('From')[1].split('to')[1].split('Meeting Type')[0].trim());
            meeting.type = text.split('Meeting Type')[1].split('=')[0].trim();
            
            // assign special interest info - if special interest doesn't exist then set 'interest' to null 
            if (text.indexOf('Special Interest') !== -1) {
                meeting.interest = text.split('Special Interest')[1].trim();
            } else {
                meeting.interest = null;
            }
            
            // push meeting object into meetings array
            meetings.push(meeting);
        }
    }
});

// convert 12-hour time to 24-hour time
function convertTo24Hour(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1].split(' ')[0];
    var period = time.split(' ')[1];
    if (period === 'PM' && hours <= 11) {
        hours = String(Number(hours) + 12);
    }
    return Number(hours + minutes);
}

// console.log(meetings);

// cycle through the object and request for its latLong using GMAPS API
// used async.eachObject instead of async.eachSeries
async.eachObject(meetings, function(value, key, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        // assign latlong data to current meeting object
        value.latLong = JSON.parse(body).results[0].geometry.location;
    });
    // not sure but I think the the callback delay isn't working because the data came out immediately
    setTimeout(callback, 2000);
}, function() {
    console.log(meetings);
    // write the meetings data to output.txt
    fs.writeFileSync('/home/ubuntu/workspace/week5/output.txt', JSON.stringify(meetings));
});
