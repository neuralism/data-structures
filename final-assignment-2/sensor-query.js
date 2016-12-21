// npm packages
var pg = require('pg');
var http = require('http');
var fs = require('fs');

// connection string
// var un = process.env.USERNAME; // aws db username
// var pw = process.env.PASSWORD; // aws db password
// var db = process.env.DB_NAME; // aws db database name
// var ep = process.env.DB_END_POINT; // aws db endpoint

var un = 'joshua'; // aws db username
var pw = 'huehuehue'; // aws db password
var db = 'doordetector'; // aws db database name
var ep = 'doordetector.chrzpg7yznp6.us-west-2.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

// query strings
// var createTableQuery = 'CREATE TABLE doorstate (id SERIAL, door SMALLINT, status BOOLEAN, timestamp TIMESTAMP WITH TIME ZONE);';
// var query = 'INSERT INTO doorstate VALUES (DEFAULT, 0, true, CURRENT_TIMESTAMP);'
var query = 'SELECT * FROM doorstate;';
// var del = 'DROP TABLE doorstate;'

// app variables
var timesOpened = 0;
var timesClosed = 0;

// start the server
var server = http.createServer(function(req, res) {
    console.log('server started');

    // establish pg connection
    pg.connect(conString, function(err, client, done) {

        // pg error handling
        if (err) { return console.error('error fetching client from pool', err); }
        
        // client query
        client.query(query, function(err, result) {

            //call done() to release the client back to the pool
            done();
            
            // error handling
            if (err) { return console.error('error running query', err); }

                res.writeHead(200, {'content-type': 'application/json'});
                res.end(JSON.stringify(result.rows));
                
                // var curDate = new Date(result.rows[0]['timestamp']);
                // var curDate2 = new Date(result.rows[1]['timestamp']);
                
                // curDate.setHours(curDate.getHours() - 5);
                // curDate2.setHours(curDate2.getHours() - 5); 
    
                // var difference = curDate2.getTime() - curDate.getTime();    
                
                // .getTime() A number representing the milliseconds elapsed between 1 January 1970 00:00:00 UTC and the given date.
                // console.log('hours: ' + (difference / (1000 * 60 * 60)) % 24);
                // console.log('minutes: ' + (difference / (1000 * 60)) % 60); 
                // console.log('seconds: ' + (difference / 1000) % 60);
                
                // Number of times opened
                // for (var i = 0; i < result.rows.length; i++) {
                //     if (result.rows[i]['status'] == true) {
                //         timesOpened++;
                //     }
                // }
                
                // console.log(timesOpened);
        });

    }); // pg.connect

}); // server

server.listen(process.env.PORT);