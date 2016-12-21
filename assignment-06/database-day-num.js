// Require file system module
var fs = require('fs');

// Import and parse output from previous assignment into JSON
var output = fs.readFileSync('/home/ubuntu/workspace/assignment-06/output.txt');
var meetings_data = JSON.parse(output);

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/aa_db';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

// MongoClient.connect
MongoClient.connect(url, function(err, db) {
    if (err) { return console.dir(err); }
    var collection = db.collection('meetings');
    // Loop to insert each meeting into the collection
    for (var i = 0; i < meetings_data.length; i++) {
        collection.insert({
            address: meetings_data[i].address,
            latLong: meetings_data[i].latLong,          
            days: dayToNumber(meetings_data[i].days),
            start: meetings_data[i].start,
            end: meetings_data[i].end,
            type: meetings_data[i].type,
            interest: meetings_data[i].interest
        });
    }
    db.close();
});

function dayToNumber(day) {
    switch (day) {
        case 'Sundays':
            return 0;
            break;
        case 'Mondays':
            return 1;
            break;
        case 'Tuesdays':
            return 2;
            break;
        case 'Wednesdays':
            return 3;
            break;
        case 'Thursdays':
            return 4;
            break;
        case 'Fridays':
            return 5;
            break;
        case 'Saturdays':
            return 6;
            break;
    }
}