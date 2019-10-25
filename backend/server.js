const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "",
  host: "localhost",
  database: "mastertnf",
  password: "",
  port: 5432
});

const mongoose = require("mongoose");
const mongoDB = "mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway";
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
//Bind connection to error event to get notified for connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const UserModel = require("./User");

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

app.post("/Login", (req, res) => {
  console.log("Inside Login request");
  console.log("Email body: ", req.body);

  UserModel.findOne({ email: req.body.email })

    .catch(err => {
      res.code = "400";
      res.value =
        "The email and password you entered did not match our records. Please double-check and try again.";
      console.log(res.value);
      res.sendStatus(400).end();
    })

    .then(user => {
      if (user && user.password == req.body.password) {
        res.code = "200";
        res.value = user;
        res.cookie("user_cookie", "admin", {
          maxAge: 900000,
          httpOnly: false,
          path: "/"
        });
        res.sendStatus(200).end();
        console.log("Login succesful");
      } else {
        console.log("Passwords don't match");
      }
    });
});
// Query

app.get("/PropertyList", (request, response) => {
  console.log("endpoint hit!");
  // response.json({ info: "Node.js, Express, and Postgres API" });
pool.query('SELECT address,zip_code FROM property', (error, results) => {
    if (error) {
      throw error
    }
    // response.status(200).json(results.rows)
    console.log(results)
    // response.json({results})
    response.status(200).json(results.rows)
  })
});


//
// app.get("/PropertyList", (req, res) => {
//   property = [
//     { Name: "Property A", Street: "3rd Street" },
//     { Name: "Property B", Street: "South Street" },
//     { Name: "Property C", Street: "3rd Street" },
//     { Name: "Property D", Street: "South Street" },
//     { Name: "Property E", Street: "3rd Street" },
//     { Name: "Property F", Street: "South Street" },
//     { Name: "Property G", Street: "3rd Street" },
//     { Name: "Property H", Street: "South Street" }
//   ];
//   console.log(req.query);
//   res.json(property);
// });
app.post("/Register", (request, response) => {
  console.log("Inside Register request");
  let User = new UserModel({
    email: request.body.email,
    password: request.body.password
  });

  User.save()
    .then(user => {
      console.log("User created : ", user);
      response.sendStatus(200).end();
    })
    .catch(err => {
      console.log("Error Creating User", err);
      response.sendStatus(400).end();
    });
});

//start your server on port 3001
app.listen(3001, () => {
  console.log("Server Listening on port 3001");
});
