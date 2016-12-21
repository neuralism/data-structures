// QUERY MONGODB

var dbName = 'aa_db';
var collName = 'meetings';

var http = require("http");
var fs = require("fs");

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;

var index1 = fs.readFileSync("index1.txt");
var index3 = fs.readFileSync("index3.txt");

// Retrieve
var MongoClient = require('mongodb').MongoClient;

var server = http.createServer(function(req, res) {

    MongoClient.connect(url, function(err, db) {
       
        // error handling       
        if (err) { return console.dir(err); }
        
        var now = new Date();
        now.setHours(now.getHours() - 5);
        
        var today = now.getDay();
        var tomorrow;
        
        var curHours;
        var curMinutes;
        
        if (today == 6) { 
            tomorrow = 0; 
        } else { 
            tomorrow = today + 1 
        }
        
        // add 0 if hours is < 10;
        if (now.getHours() < 10) {
            curHours = '0' + now.getHours();
        } else {
            curHours = now.getHours();
        }
        
        // add 0 if minute is < 10
        if (now.getMinutes() < 10) {
            curMinutes = String('0' + now.getMinutes());
        } else {
            curMinutes = String(now.getMinutes());
        }

        var currentTime = Number(curHours + curMinutes);
        var collection = db.collection(collName);
        collection.aggregate
        ([ // start of aggregation pipeline
       
            // match by day and time
            { 
                $match : 
                { 
                    $or : 
                    [
                        { 
                            $and: 
                            [
                                { days : today } , { start: { $gte : currentTime } }
                            ]
                        },
                        { 
                            $and: 
                            [
                                { days : tomorrow } , { start : { $lte: 400 } }
                            ]
                        }
                        
                    ]
                }
            },
            
            // group by meeting group
            { 
                $group : 
                { 
                    _id : 
                    {
                        latLong : '$latLong',
                        address : '$address',
                    },
                    days : { $push : '$days' },
                    start : { $push : '$start' },
                    type : { $push : '$type' },
                    interest : { $push : '$interest' }
                }
            },
            
            // group meeting groups by latLong
            {
                $group : 
                { 
                    _id : 
                    { 
                        latLong : "$_id.latLong"
                    },
                    
                    groups : 
                    { 
                        $push : 
                        {
                            info : "$_id", days : "$days", start : "$start", type : "$type", interest: '$interest'
                        }
                    }
                }
            }            
        ])
        .toArray(function(err, docs) { // end of aggregation pipeline
            if (err) {console.log(err)}
            
            else {
                res.writeHead(200, {'content-type': 'text/html'});
                res.write(index1);
                res.write(JSON.stringify(docs));
                // res.end();
                res.end(index3);
            }
            db.close();
        });
    });
});

server.listen(process.env.PORT);