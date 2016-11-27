// Require modules
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
var async = require('async');
var asyncEachObject = require('async-each-object')

// Variables
var content = fs.readFileSync('/home/ubuntu/workspace/week5/data/m01.txt');
var $ = cheerio.load(content);
var apiKey = process.env.GMAKEY;
var meetings = [];

// Select the table and run the script through every row
$('tbody tr').each(function(i, elem) {
    // Split every individual meeting into an array (as they are seperated by 2 <br>s) and remove initial 'trailing whitespace'
    var data = $(elem).find('td').eq(1).html().replace('\r\n                    \t\t\r\n\t\t\t\t\t', '').split('<br>\r\n                    \t<br>');
    // Loop through each item in the array
    for (var i = 0; i < data.length; i++) {
        // Ignore items which are blank (because the split function also ropes the whitespace that comes after the split into the array)
        if (data[i] !== '') {
            // Further cleaning up - remove new line, carriage return, tab characters, forward slashes, <br>s, and <b>s
            var text = data[i].replace(/[\r\n\t\/]/g, '').replace(/(<br>)/g, '').replace(/(<b>)/g, '');
            // Declare meeting object to hold meeting info
            var meeting = new Object;
            // Assign the info to the object
            meeting.address = $(elem).find('td').eq(0).html().split('\n')[3].split(',')[0].split('- ')[0].split('(')[0].trim() + ', New York, NY';
            meeting.days = text.split('From')[0].trim();
            meeting.start = convertTo24Hour(text.split('From')[1].split('to')[0].trim());
            meeting.end = convertTo24Hour(text.split('From')[1].split('to')[1].split('Meeting Type')[0].trim());
            meeting.type = text.split('Meeting Type')[1].split('=')[0].trim();
            // Assign special interest info - if special interest doesn't exist then set 'interest' to null 
            if (text.indexOf('Special Interest') !== -1)
                meeting.interest = text.split('Special Interest')[1].trim();
            else
                meeting.interest = null;
            // Push meeting object into meetings array
            meetings.push(meeting);
        }
    }
});

// Convert 12-hour clock to 24-hour clock
function convertTo24Hour(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1].split(' ')[0];
    var period = time.split(' ')[1];
    if (period === 'PM' && hours <= 11) {
        hours = String(Number(hours) + 12);
    }
    return Number(hours + minutes);
}

// Cycle through the object (using async.echObject instead of async.eachSeries) and request for each meeting's latLong using GMAPS API
async.eachObject(meetings, function(value, key, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        // Assign latLong data to current meeting object
        value.latLong = JSON.parse(body).results[0].geometry.location;
    });
    // Not sure but I think the the callback delay isn't working because the data came out immediately
    setTimeout(callback, 2000);
}, function() {
    console.log(meetings);
    // Write the meetings data to output.txt
    fs.writeFileSync('/home/ubuntu/workspace/week5/output.txt', JSON.stringify(meetings));
});