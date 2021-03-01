const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();


//Attatch/get files "public"-?


//Get notes.html...
app.get('/', function (req, res) {
    res.send('hello world')
  })
  




  app.listen(3000)