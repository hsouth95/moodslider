/**
 * @file FilmList class for containing and manipulating the films
 * @copyright Harrison South 2016
 */

var xml2js = require("xml2js"),
    Film = require("../objects/Film.js");
    builder = new xml2js.Builder();

/**
 * Represents a list of films.
 * @constructor
 * @param {Object[]} [films] - A collection of films
 */
var FilmList = function (films) {
    this.films = films || [];
    this.latestId = parseInt(this.getLatestId());
}

/**
 * Retrieves a list of films based on a given mood
 * @param {Object} mood - The mood to base the selection on
 * @param {Number} limit - The number of films to return
 * @returns {Object} A list of the films
 */
FilmList.prototype.getFilmsByMood = function(mood, limit) {
    // Sort array descendingly
    var sortedFilms = Array.prototype.slice.call(this.films).sort(function(a, b) {
        return b.getMoodDifference(mood) > a.getMoodDifference(mood);
    });

    return new FilmList(sortedFilms.slice(0, limit));
}

/**
 * Retrieves the latest ID of the collection of films
 * @returns {Number} Latest ID in the collection of films
 */
FilmList.prototype.getLatestId = function(){
    if(this.latestId) {
        return this.latestId;
    }

    if(this.films && this.films.length > 0) {
        return this.films.reduce(function(highestId, film) {
            return highestId > film.$.id ? highestId : film.$.id;
        }, 0);
    }

    return 0;
}

/**
 * Retrieves the list of films
 * @returns {Object[]} Collection of films
 */
FilmList.prototype.getFilms = function(){
    return this.films;
}

/**
 * Adds a film into the collection of films
 * @param {Object} film - The film to be added into the collection
 */
FilmList.prototype.addFilm = function(film){
    if(film) {
        if(!this.films) {
            this.films = [];
        }

        film.$.id = parseInt(this.getLatestId()) + 1;
        this.latestId = parseInt(this.latestId) + 1;

        this.films.push(film);
    }
}

/**
 * Retrieves the collection of films in a XML friendly format
 * @returns {Object} Returns the collections of films in a XML format
 */
FilmList.prototype.toXml = function(){
    if(this.films && this.films.length > 0){
        // Build object to simulate how XML would be structured
        var xmlObj = {};
        xmlObj.programmeList = {};
        xmlObj.programmeList.programme = this.films;

        return builder.buildObject(xmlObj);
    }

    return null;
}

module.exports = FilmList;
