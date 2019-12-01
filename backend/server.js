const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const pg = require("pg");
const conString =
  "postgres://dsvweyaf:0zgyKRYk5l5p5a3HeiTM-R7ovYNrWz2r@salt.db.elephantsql.com:5432/dsvweyaf";

const con = new pg.Client(conString);

con.connect(err => {
  if (err) {
    return console.error("could not connect to db", err);
  } else {
    console.log("Sucessfully connected to db");
  }
});

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  con.query("SELECT * FROM type_user", (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
});
app.post("/Login", (req, res) => {
  console.log("Inside Login request");
  console.log("Email body: ", req.body);
  let email = req.body.email;
  let pwd = req.body.password;
  let user = {
    email: "kailash@gmail.com",
    password: "12345"
  };

  con.query(
    "SELECT * FROM users WHERE email = $1 AND password= $2",
    [email, pwd],
    (err, result) => {
      if (err) {
        res.status(404).send("Password does not match");
      }

      console.log("Login result", result.rows[0]);
      res.status(200).send(result.rows[0]);
    }
  );
});

app.post("/Register", (req, res) => {
  console.log("Inside Register request");
  let email = req.body.email;
  let password = req.body.password;
  let type = req.body.type;
  let first_name = req.body.firstName;
  let last_name = req.body.lastName;
  con.query("SELECT * FROM users WHERE email = $1", [email], (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    if (result.rows.length === 0) {
      let sql =
        "INSERT INTO users (email,password,firstname,lastname,type) VALUES ($1,$2,$3,$4,$5)";
      con.query(
        sql,
        [email, password, first_name, last_name, type],
        (err, results) => {
          if (err) {
            throw err;
          } else {
            console.log(results);
            res.status(201).send("User added");
          }
        }
      );
    } else {
      console.log("Email already exists!");
      res.status(400).send("Email already exists");
    }
  });
});

app.get("/PropertyList", (req, res) => {
  console.log("endpoint hit!");
  console.log("Params", req.query);
  let zip = req.query.zipcode;
  con.query(
    "SELECT * FROM property_details where zip_code = $1",
    [zip],
    (err, results) => {
      if (err) console.log("Error!", err);

      console.log("Search results:", results);
      res.status(200).json(results.rows);
    }
  );
  // // response.json({ info: "Node.js, Express, and Postgres API" });
  // con.query("SELECT address,zip_code FROM property", (error, results) => {
  //   if (error) {
  //     throw error;
  //   }
  //   // response.status(200).json(results.rows)
  //   console.log(results);
  //   // response.json({results})
  //   response.status(200).json(results.rows);
  // });
});

//start your server on port 3001
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});
