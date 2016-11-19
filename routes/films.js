var INPUT_FILE_PATH = "data/input.xml",
    express = require('express'),
    xml = require('xml'),
    fs = require('fs'),
    xml2js = require("xml2js"),
    Film = require("../objects/Film.js"),
    FilmList = require("../objects/FilmList.js"),
    Mood = require("../objects/Mood.js"),
    InputFile = require("../objects/InputFile.js"),
    router = express.Router(),
    inputFile = new InputFile(INPUT_FILE_PATH),
    films = null;

inputFile.readInput(function(data){
    films = new FilmList(data);
},
function(){
    films = new FilmList();
});

/* POST films */
router.post('/', function(req, res){
    if(req.busboy) {
        var film = {},
            mood = {};

        req.busboy.on("file", function(fieldName, file, fileName, encoding, mimeType){
            var newPath = "data/images/" + fileName,
                fStream = fs.createWriteStream(newPath);
            film.image = [newPath];
            file.pipe(fStream);
        });
        req.busboy.on("field", function(fieldName, value, keyTruncated, valueTruncated) {
            switch (fieldName) {
                // Allowed fields
                case "name":
                    film[fieldName] = [value.toString()];
                    break;
                case "calm":
                case "sad":
                case "awake":
                case "courage":
                    mood[fieldName] = parseInt(value);
                    break;
            }
        });
        req.busboy.on("finish", function(){
            if(!films) {
                films = new FilmList();
            }
            film.mood = new Mood(mood.calm, mood.sad, mood.awake, mood.courage);
            films.addFilm(new Film(film));

            inputFile.updateInputFile(films);
            
            res.status(200).end();
        });
    } else {
        res.status(404).send("Busboy not loaded");
    }
});

/* GET films */
router.get('/', function(req, res, next) {
  if(!films){
	  // No films have been input yet
	  return res.status(404).send("Input not found");
  }

  res.send(xml(films.toXml()));
});

module.exports = router;
