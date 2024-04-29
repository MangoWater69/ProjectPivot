const http = require("http");
const fs = require("fs");
const mysql = require("mysql");
const qs = require("querystring");

// Connect to MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "project_pivot_db",
});

connection.connect();

// Create HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/registration.html" && req.method === "GET") {
    fs.readFile("./registration.html", "utf8", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/loginpage.html" && req.method === "GET") {
    fs.readFile("./loginpage.html", "utf8", (err, data) => {
      if (err) throw err;
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(data);
    });
  } else if (req.url === "/register" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const post = qs.parse(body);
      const { name, email, country, phone, password } = post;

      // Insert into database
      const sql =
        "INSERT INTO finalProj (name, email, country, phone, password) VALUES ?";
      const values = [[name, email, country, phone, password]];
      connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log("Data inserted into the database");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("User registered successfully");
      });
    });
  } else if (req.url === "/login" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      const post = qs.parse(body);
      const { username, password } = post;

      // Check database for matching user
      const sql = "SELECT * FROM finalProj WHERE email = ? AND password = ?";
      connection.query(sql, [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
          const user = results[0];
          console.log("Login successful");
          fs.readFile("./profile.html", "utf8", (err, data) => {
            if (err) throw err;

            // Replace placeholders with actual data
            data = data.replace("{{name}}", user.name);
            data = data.replace("{{email}}", user.email);
            data = data.replace("{{phone}}", user.phone);
            data = data.replace("{{country}}", user.country);

            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          });
        } else {
          console.log("Login details not matched");
          res.writeHead(401, { "Content-Type": "text/plain" });
          res.end("Login details not matched");
        }
      });
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(8080, () => {
  console.log("Server running at http://localhost:8080/");
});
