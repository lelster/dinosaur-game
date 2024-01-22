const mysql = require('mysql2');


const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "maozedong123!!!",
    database: "INITIALD",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});


pool.getConnection(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

//Now we gotta make a server with express
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});




