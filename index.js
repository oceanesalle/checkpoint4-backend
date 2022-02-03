const express = require("express");
const mysql = require("mysql"); 

const app = express();

const db = mysql.createConnection({
  user: "root",
  host:,"localhost"
  password: "password",
  database:"checkpoint", 
}); 

app.post("/register", (req, res) => {
  db.query(
    "INSERT INTO users (unsername, password) VALUES (?,?)", 
    [username, password], 
    (err, result) => {
    console.log(err); 
  }
  ); 
});


app.listen(5000,() => console.log("Server listening at port 5000"));