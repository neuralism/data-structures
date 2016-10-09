// IN THE MONGO SHELL: 
//   CREATE DATABASE citibike AND SWITCH TO IT WITH: 
//      use citibike
//   CREATE COLLECTION stations WITH: 
//      db.createCollection('stations')
//   QUERY THE ENTIRE stations COLLECTION WITH:
//      db.stations.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE stations COLLECTION WITH:
//      db.stations.find().count()

var request = require('request');

request('https://www.citibikenyc.com/stations/json', function(error, response, body) {
    var stationData = JSON.parse(body);

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/citibike';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {return console.dir(err);}

        var collection = db.collection('stations');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i=0; i < stationData.stationBeanList.length; i++) {
            collection.insert(stationData.stationBeanList[i]);
            }
        db.close();

    }); //MongoClient.connect

}); //request

/* 
find using compound expressions
db.stations.find({ availableDocks: 0, statusValue: "In Service" }).count()
$match operator is what we typically think of as filter
operators start with a $ sign in mongo
{ operator: field }
{ operator: {} }
https://docs.mongodb.com/manual/meta/aggregation-quick-reference/
https://docs.mongodb.com/manual/aggregation/
{[ { $group: { _id: null, avgBikes: { $avg: "$availableBikes" } } } ]}

db.meetings.aggregate([ { $match: { days: "Tuesdays" } } ])

db.meetings.aggregate([ { $match: { days: "Tuesdays" } }, { $match: { start: { $gte: 1900 } } } ])

db.meetings.aggregate([ { $group: { _id: "Meetings on Tuesdays after 7pm" },  } ])

db.stations.aggregate([{ $match: { statusValue: "In Service" } }, { $group: { _id: null, avgBikes: { $avg: "$availableBikes" } }  } ]}
db.stations.aggregate([{ $group: { _id: "$statusValue", stationName: { $push: "$stationName" } }])
*/