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
            
            //console.log(meetings[0]);
            console.log(meetings[0].deets[0].days);
        }
        db.close();
    });

});

/*

var meetings = [{
            "_id": {
                "loca": [40.7355145, -74.0031001]
            },
            "meets": [{
                "meetingName": "PERRY STREET WORKSHOP",
                "meetingHouse": "",
                "meetingAddress1": "50 Perry Street, Ground Floor,",
                "meetingAddress2": "(Betw. 7th Avenue South &amp; West 4th Street) NY 10014",
                "borough": "Manhattan",
                "meetingDetails": "No 8:30 or 10:15 1st Wed of month due to Bus. meeting Wed.10:15pm=No BB 1st Wed.",
                "meetingWheelchair": ""
            }],
            "deets": [{
                "days": ["Tuesdays", "Tuesdays", "Tuesdays", "Tuesdays", "Tuesdays", "Tuesdays", "Tuesdays", "Tuesdays"],
                "startTimes": ["7:30 AM", "9:00 AM", "12:15 PM", "2:30 PM", "4:00 PM", "6:00 PM", "8:30 PM", "10:15 PM"],
                "meetingType": ["C", "C", "S", "C", "C", "C", "C", "C"],
                "specialInterest": ["", "", "", "", "", "", "", ""]
            }]
        }];

*/