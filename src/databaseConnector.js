const mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "mna_games"
  });
  con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });

module.exports = {
    dbConnector : con
};