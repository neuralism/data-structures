// npm packages
var pg = require('pg');
var http = require('http');
var fs = require('fs');

// connection string
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

// start the server
var server = http.createServer(function(req, res) {

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
        });

    }); // pg.connect

}); // server

server.listen(process.env.PORT);