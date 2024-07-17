var mysql = require('mysql');
var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"social_db"
});
module.exports = db;