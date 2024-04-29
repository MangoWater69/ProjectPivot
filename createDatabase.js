const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  connection.query(
    "CREATE DATABASE IF NOT EXISTS project_pivot_db",
    (err, result) => {
      if (err) throw err;
      console.log("Database created");
    }
  );

  connection.end();
});
