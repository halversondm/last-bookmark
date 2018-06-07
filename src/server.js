#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const location = path.join(__dirname, '/assets');
const git = require('simple-git')(location);

const port = process.env.PORT || 9999;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('common'));
app.use(express.static(__dirname));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/getBookmarks', (req, res) => {
  const bookmarks = fs.readFileSync(path.join(__dirname, './assets/api/bookmarks/bookmarks.json'), 'utf8');
  res.json(JSON.parse(bookmarks));
});

app.put('/api/saveBookmarks', (req, res) => {
  // Assume that a save is full file save
  let bookmarks = req.body;
  fs.writeFileSync('./assets/api/bookmarks/bookmarks.json', JSON.stringify(bookmarks));
  git.add('./*').commit('update to bookmarks.json file');
  git.listRemote([], (err, data) => {
    if (!err) {
      git.push(['-u', 'origin', 'master']);
    } else {
      console.log(`REMINDER: You are not setup to store your bookmarks in another location.  Please add a remote location to ${location}`);
    }

  });
  res.send();
});

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> Listening on port %s.', port);
});
