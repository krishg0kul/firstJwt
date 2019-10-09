var express = require("express");
var jwt = require("jsonwebtoken");
var bodyparser = require("body-parser");
var secrt = "myJwt";
const cors = require("cors");
const app = express();
app.listen(8080);
app.use(express.json());
app.use(bodyparser.json());
app.use(cors());

var users = [
  { name: "gokul", pass: "gokul" },
  { name: "nandhini", pass: "nandhini" },
  { name: "admin", pass: "admin" }
];

app.post("/", (req, res) => {
  var user = {
    name: req.body.name,
    pass: req.body.pass
  };

  jwt.sign({ user }, secrt, { expiresIn: "1m" }, (err, token) => {
    if (token) {
      users.push(user);
      console.log(users);
      res.send(token);
    } else if (err) res.sendStatus(404);
  });
});
app.post("/login", (req, res) => {
  var user = {
    name: req.body.name,
    pass: req.body.pass,
    encode: req.body.tok
  };
  jwt.verify(user.encode, secrt, (err, decode) => {
    if (err) {
      res.sendStatus(404);
    } else if (typeof decode !== "undefined") {
      console.log(decode);
      users.forEach(x => {
        if (decode.user.name === x.name && decode.user.password === x.pass) {
          res.send("successfully Login");
        } else res.send("False");
      });
    } else {
      res.sendStatus(403);
    }
  });
});
