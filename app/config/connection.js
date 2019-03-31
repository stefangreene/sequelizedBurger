//..........mysql variable connection.......................
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "smgpassword",
    database: "hamburgers_db"
});

//...................Make connection.........................
connection.connect(function(err){
    if (err){
        console.log("error connecting: " + err.stack);
        return;
    }
    console.log("connected as ID: " + connection.threadId);
});

//........Export connection for our ORM to use...............
module.exports = connection;
