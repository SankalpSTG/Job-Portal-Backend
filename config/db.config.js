var mysql = require("mysql2")

var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jobnotifier"
}).promise()

module.exports = conn