var http = require('http');
var fs = require('fs');

var url = 'mongodb://' + process.env.IP + ':27017/aa_database';
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

var server = http.createServer(function(request, response) {

    var dateTimeNow = new Date(); 
    
    var dayQuery;
    if (dateTimeNow.getDay() == 0) {
        dayQuery = 'Sundays';
    }
    else if (dateTimeNow.getDay() == 1) {
        dayQuery = 'Mondays';
    }
    else if (dateTimeNow.getDay() == 2) {
        dayQuery = 'Tuesdays';
    }

    // MongoClient.connect
    MongoClient.connect(url, function(err, db) {
    
        if (err) { return console.dir(err); }
        
        var collection = db.collection('meetings');
        // objective is to show all the meetings that's happening after you access the site? e.g if u access in the afternoon, morning meetins should not be visible.. only evenings till tmr.
        // 
        collection.aggregate([ 
            // this is aggregation pipeline
            { $match: { days: dayQuery }} ,
            //add another match step on Time
            { $group : {
                _id : { address:  "$address", latLong : "$latLong" },
                meetings: { $push:  { day: "$days", start: "$start", interest: "$interest" } }
            }
            // add a sort step, by Day/Time
            }
        ]) 
        .toArray(function(err, docs) {
            if (err) { 
                console.log(err);
            } else {
                var meetings = docs; 
                // write file to JSON
                // fs.writeFileSync('aa_output.json', JSON.stringify(meetings));
                response.writeHead(200, {"Content-Type": "application/json"});
                response.end(JSON.stringify(meetings));
            }
            db.close();
        });
    });

    // response.writeHead(200, {"Content-Type": "text/html"});
    // response.end("Hello, world!");

});

server.listen(process.env.PORT);