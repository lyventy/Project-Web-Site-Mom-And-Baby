var mysql = require('mysql-model');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_mevabe'
});

module.exports = db;