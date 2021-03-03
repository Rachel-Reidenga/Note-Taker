const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const uuidv1 = require("uuid/v1")
const PORT = process.env.PORT || 9001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//Get notes
app.get('/api/notes', function (req, res) {
  allNotes = fs.readFileSync(path.join(__dirname,"db/db.json"),"utf8")
  allNotes = JSON.parse(allNotes);
  res.json(allNotes);
  })

  app.post('/api/notes', function (req, res) {
    allNotes = fs.readFileSync(path.join(__dirname,"db/db.json"),"utf8")
    allNotes = JSON.parse(allNotes);
    req.body.id = uuidv1();
    allNotes.push(req.body);
    allNotes = JSON.stringify(allNotes);
    fs.writeFileSync(path.join(__dirname,"db/db.json"), allNotes,"utf8")
    allNotes = JSON.parse(allNotes);
    res.json(allNotes);
  })
  
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"))
})

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"))
// })

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"))
})

app.delete("/api/notes/:id", function (req, res){
  allNotes = fs.readFileSync(path.join(__dirname,"db/db.json"),"utf8")
    allNotes = JSON.parse(allNotes);
    allNotes = allNotes.filter(note => {
      return note.id != req.params.id
    });
    allNotes = JSON.stringify(allNotes);
    fs.writeFileSync(path.join(__dirname,"db/db.json"), allNotes,"utf8")
    allNotes = JSON.parse(allNotes);
    res.json(allNotes);
})

  app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
  });