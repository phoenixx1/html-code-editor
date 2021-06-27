var express = require("express");
var app = express();
var multer = require("multer");
var cors = require("cors");
const fs = require("fs");
var http = require("http");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  return res.send(val);
});

const PORT = 8080;
let val =
  "<!DOCTYPE html><html>    <head>      <title>Nishant Saxena</title>      <style>        body {          background-color: black;          text-align: center;          color: white;          font-family: Arial, Helvetica, sans-serif;        }      </style>    </head>  <body>      <h1>This is a HTML Code Editor</h1>    <p>Made by Nishant Saxena</p>    <p>Check out my <a href='https://phoenixx1.github.io/' target='_blank'>Portfolio</a></p>    <img src='https://avatars.githubusercontent.com/u/44865935?v=4' alt='Nishant Saxena' style='width:200px;border-radius:50%'>      </body></html>  ";

app.post("/code", (req, res) => {
  val = req.body.value;
  try {
    console.log(val);
    fs.writeFileSync("./index.html", val);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send("DONE");
  // fs.readFile("./index.html", function (err, html) {
  //   // if (err) throw err;

  //   http
  //     .createServer(function (request, response) {
  //       response.writeHeader(200, { "Content-Type": "text/html" });
  //       response.write(html);
  //       response.end();
  //     })
  //     .listen(PORT);
  // });
});

app.listen(8000, function () {
  console.log("App running on port 8000");
});
