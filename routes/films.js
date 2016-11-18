var INPUT_FILE_PATH = "data/input.xml",
    express = require('express'),
    xml = require('xml'),
    fs = require('fs'),
    xml2js = require("xml2js"),
    Film = require("../objects/Film.js"),
    FilmList = require("../objects/FilmList.js"),
    router = express.Router(),
    films = null;

/** Read the input data and caches the result */
readInput = function(){
    var parser = new xml2js.Parser();
	fs.readFile(INPUT_FILE_PATH, "utf8", function(err, data){
	   if(err) {
		   films = null;
	   } else {
    	   parser.parseString(data, function(err, result) {
               if(err){
    			   films = null;
    		   } else {
    			   films = new FilmList(result.programmeList.programme);
    		   }
    	   });
        }
	});
}

router.post('/', function(req, res){
    if(req.busboy) {
        var film = {};

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
                case "mood":
                    film[fieldName] = [value.toString()];
                    break;
            }
        });
        req.busboy.on("finish", function(){
            films.addFilm(new Film(film));

            res.status(200);
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

  var builder = new xml2js.Builder();
  res.send(xml(films.toXml(builder)));
});

readInput();
module.exports = router;
