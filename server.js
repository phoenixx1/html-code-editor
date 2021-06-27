import express, { json, urlencoded } from "express";
var app = express();
import cors from "cors";
import { writeFileSync } from "fs";

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(json());
app.use(urlencoded({ extended: false }));

const port = process.env.PORT || 8001;
let val =
  "<!DOCTYPE html><html>    <head>      <title>Nishant Saxena</title>      <style>        body {          background-color: black;          text-align: center;          color: white;          font-family: Arial, Helvetica, sans-serif;        }      </style>    </head>  <body>      <h1>This is a HTML Code Editor</h1>    <p>Made by Nishant Saxena</p>    <p>Check out my <a href='https://phoenixx1.github.io/' target='_blank'>Portfolio</a></p>    <img src='https://avatars.githubusercontent.com/u/44865935?v=4' alt='Nishant Saxena' style='width:200px;border-radius:50%'>      </body></html>  ";

app.get("/", function (req, res) {
  return res.send(val);
});

app.post("/code", (req, res) => {
  val = req.body.value;
  try {
    console.log(val);
    writeFileSync("./index.html", val);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send("DONE");
});

app.listen(port, function () {
  console.log(`App running on port ${port}`);
});
