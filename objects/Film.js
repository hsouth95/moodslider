/**
 * @file Film class for containing the details of a given film
 * @copyright Harrison South 2016
 */

/**
 * Represents a film.
 * @constructor
 * @param {Object} options - An object of the film options
 */
var Film = function(options) {
    this.name = options.name || null;
    this.mood = options.mood || null;
    this.image = options.image || null;

    this.$ = {};
    this.$.id = options.id || null;
}

module.exports = Film;
