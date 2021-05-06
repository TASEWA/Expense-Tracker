var mysql = require('mysql')
//allows to incent this pool and configure it like where and how we are gonna connect to db

var pool = mysql.createConnection({
    user: "root",
    password:"secret",
    database: "expense_tracker",
    host: "localhost",
    port: 3306
})

//configuring where db is located

module.exports = pool;
//setting this up and to run queries
