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
var createTableQuery = 'CREATE TABLE doorstatus (door_id smallint, status boolean, datetime timestamp DEFAULT current_timestamp);';
var insertIntoQuery = 'INSERT INTO doorstatus VALUES (0, FALSE, DEFAULT);'
var query = 'SELECT * FROM doorstate;'
var del = 'DROP TABLE doorstatus;'

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

            // comment
            res.writeHead(200, {'content-type': 'application/json'});
            res.end(JSON.stringify(result.rows));
            
            console.log(result.rows);
            
            
            // write JSON file
            fs.writeFileSync('sensor_output.json', JSON.stringify(result.rows));

        });

    }); // pg.connect

}); // server

server.listen(process.env.PORT);