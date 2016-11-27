// Require file system module
var fs = require('fs');

// Import and parse output from previous assignment into JSON
var output = fs.readFileSync('/home/ubuntu/workspace/week4/output.txt');
var meetings_data = JSON.parse(output);

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/aa_database';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

// MongoClient.connect
MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }
    
    var collection = db.collection('meetings');
    
    // Loop to insert each meeting into the collection
    for (var i = 0; i < meetings_data.length; i++) {
        collection.insert({
            name: "",
            address: meetings_data[i].address,
            location: meetings_data[i].latLong,
            meeting: ""
        });
    }
    
    db.close();
});