/**
 * @file FilmList class for containing and manipulating the films
 * @copyright Harrison South 2016
 */
 
/**
 * Represents a list of films.
 * @constructor
 * @param {Object[]} films - A collection of films
 */
var FilmList = function (films) {
    this._films = films || null;
    this._highestId = parseInt(this.getLatestId());
}

/**
 * Retrieves the latest ID of the collection of films
 * @returns {Number} Latest ID in the collection of films
 */
FilmList.prototype.getLatestId = function(){
    if(this._highestId) {
        return this._highestId;
    }

    if(this._films && this._films.length > 0) {
        return this._films.reduce(function(highestId, film) {
            return highestId > film.$.id ? highestId : film.$.id;
        }, 0);
    }

    return null;
}

/**
 * Retrieves the list of films
 * @returns {Object[]} Collection of films
 */
FilmList.prototype.getFilms = function(){
    return this._films;
}

/**
 * Adds a film into the collection of films
 * @param {Object} film - The film to be added into the collection
 */
FilmList.prototype.addFilm = function(film){
    if(film) {
        if(!this._films) {
            this._films = [];
        }

        film.$.id = parseInt(this.getHighestId()) + 1;
        this._highestId = parseInt(this._highestId) + 1;

        this._films.push(film);
    }
}

/**
 * Retrieves the collection of films in a XML friendly format
 * @param {Object} builder - The builder used to convert the XML
 * @returns {Object} Returns the collections of films in a XML format
 */
FilmList.prototype.toXml = function(builder){
    if(this._films && builder){
        // Build object to simulate how XML would be structured
        var xmlObj = {};
        xmlObj.programmeList = {};
        xmlObj.programmeList.programme = this._films;

        var filmXml = builder.buildObject(xmlObj);
        return filmXml;
    }

    return null;
}

module.exports = FilmList;
