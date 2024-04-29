const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "project_pivot_db",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS finalProj (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        country VARCHAR(255) NOT NULL,
        phone VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
    );`;

  connection.query(createTableQuery, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });

  connection.end();
});
