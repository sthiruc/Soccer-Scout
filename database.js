const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'soccerdb',
    user: 'root',
    password: "D'cunha6771",
    port: "3306"
});

module.exports = connection;