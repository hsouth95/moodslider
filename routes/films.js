var INPUT_FILE_PATH = "data/input.xml",
    express = require('express'),
    xml = require('xml'),
    fs = require('fs'),
    xml2js = require("xml2js"),
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
    			   films = result;
    		   }
    	   });
        }
	});
}

router.post('/', function(req, res){
    if(req.busboy) {
        req.pipe(req.busboy);
        req.busboy.on("file", function(fieldName, file, fileName, encoding, mimeType){
            var newPath = "data/images/" + fileName;

            fStream = fs.createWriteStream(newPath);

            file.pipe(fStream);

            fStream.on("close", function(){
                var film = {};
                // Think about ID.
                // Wrapping attributes in arrays for better XML conversion
                film.$ = {};
                film.$.id = '99';
                film.name = [req.name];
                film.image = [newPath];
                film.mood = [req.mood];

                if(!films){
                    films = {};
                    films.programmeList = {};
                    films.programmeList.programme = [];
                }

                films.programmeList.programme.push(film);
                console.log(JSON.stringify(films));
                res.status(200).send("OK!");
            });
        });
    } else {
        console.log("No busboy!");
        res.status(404).send("Busboy not loaded");
    }
});

/* GET films */
router.get('/', function(req, res, next) {
  if(!films){
	  // No films have been input yet
	  return res.status(404).send("Input not found");
  }

  var builder = new xml2js.Builder(),
	  filmsXml = builder.buildObject(films);

  res.send(xml(filmsXml));
});

readInput();
module.exports = router;
