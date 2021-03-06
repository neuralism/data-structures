var pg = require('pg');

// connection string
var un = process.env.USERNAME; // aws db username
var pw = process.env.PASSWORD; // aws db password
var db = process.env.DB_NAME; // aws db database name
var ep = process.env.DB_END_POINT; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

var createTableQuery = "CREATE TABLE doorstatus (door_id smallint, status boolean, datetime timestamp);"
var insertIntoQuery = "INSERT INTO doorstatus VALUES (0, FALSE, DEFAULT);"
var query = "SELECT * FROM doorstatus;"
// var query = "DELETE FROM doorstatus;" // Clear all rows in the database.
// var complexQuery = "SELECT sum(amount) as total FROM wham GROUP BY whammy;"

pg.connect(conString, function(err, client, done) {

    if (err) {
        return console.error('error fetching client from pool', err);
    }

    // query can also mean putting things into something (instead of just taking things out)
    client.query(query, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result);
    });
});