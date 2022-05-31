var mysql      = require('mysql2');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Azura_266',
  database : 'algorithm'
});



connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to mysql server !");
});

module.exports = connection;
