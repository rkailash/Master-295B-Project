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
