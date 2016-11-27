// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/aa_database';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

// MongoClient.connect
MongoClient.connect(url, function(err, db) {
    if (err) { return console.dir(err); }
    var collection = db.collection('meetings');

    collection.aggregate([ { $match: { address: "50 Perry Street, New York, NY" } } ]).toArray(function(err, docs) {
        if (err) { 
            console.log(err) 
        } else {
            var days = [];
            var start = [];
            var type = [];
            var interest = [];
            var meetings = [];
            
            for (var i = 0; i < docs.length; i++) {
                days.push(docs[i].days);
                start.push(docs[i].start);
                type.push(docs[i].type);
                interest.push(docs[i].interest);                
            }
            
            meetings = [{
                "_id": {
                    "location": docs[0].latLong
                },
                "meets": [{
                    "address": docs[0].address
                }],
                "deets": [{
                    "days": days,
                    "start": start,
                    "type": type,
                    "interest": interest
                }]
            }];
            
            console.log(meetings[0]);
            console.log(meetings[0].deets[0].days);
        }
        db.close();
    });

});