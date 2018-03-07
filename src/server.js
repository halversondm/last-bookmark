/*
 Main server configuration using NodeJS and ExpressJS
 */
"use strict";

const path = require("path");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("common"));
app.use(express.static(__dirname));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/api/saveBookmarks", (req, res) => {
  // Assume that a save is full file save
  let bookmarks = req.body;
  let date = new Date().getTime();
  fs.renameSync("./assets/api/bookmarks/bookmarks.json", `./assets/api/bookmarks/bookmarks-${date}.json`);
  fs.writeFileSync("./assets/api/bookmarks/bookmarks.json", JSON.stringify(bookmarks));
  res.send();
});

app.listen(port, "0.0.0.0", (err) => {
  if (err) {
    console.log(err);
  }
  console.info("==> Listening on port %s.", port);
});
