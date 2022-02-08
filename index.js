const express = require("express");
const mysql = require("mysql"); 
const app = express();

const app = mysql.createConnection({
  user: "root",
  host:"localhost",
  password: "password",
  database:"checkpoint", 
}); 

mysqlConnection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());


//GET
app.get("/checkpoint4", (req, res) => {
  mysqlConnection.query("SELECT * FROM checkpoint4", (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    } else {
      res.json(result);
    }
  });
});


//GET by ID
app.get("/checkpoint4/:id", (req, res) => {
  const clientId = req.params.id;
  mysqlConnection.query(
    "SELECT * FROM client WHERE id = ?",
    [clientId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving client from database");
      } else if (result.length === 0) {
        res.status(404).send("Client not found");
      } else {
        res.json(result[0]);
      }
    }
  );
});

//DELETE
app.delete("/checkpoint4", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM client WHERE id = ?",
    [clientId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error deleting a client");
      } else {
        res.sendStatus(204);
      }
    }
  );
});

//POST
app.post("/checkpoint4", (req, res) => {
  const { name, clientcode, email } = req.body;
  mysqlConnection.query(
    "INSERT INTO client (name, clientcode, email) VALUES (?, ?, ?)",
    [name, clientcode, email],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error saving the client");
      } else {
        res.status(200).send("Client successfully saved");
      }
    }
  );
});

//PUT
app.put("checkpoint4", (req, res) => {
  mysqlConnection.query(
    "UPDATE client SET ? WHERE id = ?",
    [clientPropsToUpdate, clientId],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error updating a client");
      } else {
        res.status(200).send("Client updated successfully");
      }
    }
  );
});



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log("Server listening at port 5000");
  }
});
