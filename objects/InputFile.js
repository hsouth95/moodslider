/**
 * @file InputFile class for the reading and writing to the data file
 * @copyright Harrison South 2016
 */

var fs = require("fs"),
    xml2js = require("xml2js"),
    FilmList = require("../objects/FilmList.js");

/**
 * Represents the input file
 * @constructor
 * @param {String} filePath - The relative path to the input file
 */
var InputFile = function(filePath) {
    this.filePath = filePath;
}

/**
 * Reads the contents of the input file
 * @param {Function} [successCallback] - The function to call on a successful operation
 * @param {Function} [errorCallback] - The function to call on a error in the operation
 */
InputFile.prototype.readInput = function(successCallback, errorCallback){
    var parser = new xml2js.Parser({
        explicitArray: false
    });

	fs.readFile(this.filePath, "utf8", function(err, data){
	   if(err) {
		   if(errorCallback && typeof errorCallback === "function"){
               errorCallback(err);
           }
	   } else {
           parser.parseString(data, function(err, result) {
               if(err){
                   if(errorCallback && typeof errorCallback === "function") {
                       errorCallback(err)
                   }
		           } else {
    			          if(successCallback && typeof successCallback === "function") {
                       successCallback(result.programmeList.programme);
                   }
    		   }
          });
        }
	});
}

/**
 * Overwrites the contents of the input file
 * @param {Object} films - The data objects to be written to the file
 * @param {Function} [successCallback] - The function to be called on a successful operation
 * @param {Function} [errorCallback] - The function to be called on a error in the operation
 *
 */
InputFile.prototype.updateInputFile = function(films, successCallback, errorCallback){
    if(films) {
        // We're going through different scopes and therefore need a reference to the object
        var that = this;
        fs.unlink(that.filePath, function(err){
            // Ignore error if no file already exists
            if(err && err.code !== "ENOENT") {
                if(errorCallback && typeof errorCallback === "function") {
                    errorCallback(err);
                }
            }

            fs.writeFile(that.filePath, films.toXml(), function(err){
                if(err){
                    if(errorCallback && typeof errorCallback === "function") {
                        errorCallback(err);
                    }
                } else {
                    if(successCallback && typeof successCallback === "function") {
                        successCallback();
                    }
                }
            });
        });
    }
}

module.exports = InputFile;
