var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DATABASE
});



connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to mysql server !");
});

module.exports = connection;
