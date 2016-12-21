var five = require('johnny-five'), bumper, led;
var pg = require('pg');
var door_id = 0;
var openStatus = false;

// connection string
var un = process.env.USERNAME; // aws db username
var pw = process.env.PASSWORD; // aws db password
var db = process.env.DB_NAME; // aws db database name
var ep = process.env.DB_END_POINT; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;

five.Board().on('ready', function() {

  sensor = new five.Sensor.Digital(2);
  led = new five.Led(13);

  sensor.on('change', function() {
    // set door open to true
    openStatus = !openStatus;

    // setup insert
    var insertIntoQuery = 'INSERT INTO doorstatus VALUES (' + door_id + ', ' + openStatus + ', CURRENT_TIMESTAMP);'

    // insert query
    pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query(insertIntoQuery, function(err, result) {
            done();
            if (err) {
                return console.error('error running query', err);
            }
            // console.log(result);
        });
    });

    // log
    if (openStatus) {
        console.log('door is open');
        led.on();
    } else {
        console.log('door is closed');
        led.off();
    }
  })
});
