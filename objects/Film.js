/**
 * @file Film class for containing the details of a given film
 * @copyright Harrison South 2016
 */

/**
 * Represents a film.
 * @constructor
 * @param {Object} [options] - An object of the film options
 */
var Film = function(options) {
    this.name = options.name || null;
    this.mood = options.mood || null;
    this.image = options.image || null;

    this.$ = {};
    this.$.id = options.id || null;
}

/**
 * Retrieves the differnce this film has in mood to the given mood
 * @param {Object} mood - The mood to compare the film to
 * @returns {Number} Returns the difference in mood
 */
Film.prototype.getMoodDifference = function(mood) {
    var difference = 0;

    if(mood && this.mood) {
      if(mood.calmLevel && this.mood.calmLevel) {
        difference += Math.abs(mood.calmLevel - this.mood.calmLevel);
      }
      if(mood.sadnessLevel && this.mood.sadnessLevel) {
        difference += Math.abs(mood.sadnessLevel - this.mood.sadnessLevel);
      }
      if(mood.awakeLevel && this.mood.awakeLevel) {
        difference += Math.abs(mood.awakeLevel - this.mood.awakeLevel);
      }
      if(mood.courageLevel && this.mood.courageLevel) {
        difference += Math.abs(mood.courageLevel - this.mood.courageLevel);
      }

      return difference;
    } else {
      throw new Error("No moods specified");
    }
}

module.exports = Film;
