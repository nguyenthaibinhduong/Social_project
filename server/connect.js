var mysql = require('mysql');
require('dotenv').config();
var db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
});
db.connect(function(err) {
    if (err) {
        console.error('Kết nối đến cơ sở dữ liệu thất bại: ' + err.stack);
        return;
    }
    console.log('Kết nối đến cơ sở dữ liệu thành công với id ' + db.threadId);
});
module.exports = db;