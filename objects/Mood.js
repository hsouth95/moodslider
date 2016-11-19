/**
 * @file Mood class for containing the details of a given Mood
 * @copyright Harrison South 2016
 */

var MAX_MOOD_VALUE = 10;

/**
 * Represents a mood.
 * @constructor
 * @param {Number} calmLevel - How calm a person is, 0 = agitated, 10 = calm
 * @param {Number} sadnessLevel - How sad a person is, 0 = happy, 10 = sad
 * @param {Number} awakeLevel - How awake a person is, 0 = tired, 10 = wide awake
 * @param {Number} courageLevel - How fearless a person is, 0 = scared, 10 = fearless
 */
var Mood = function(calmLevel, sadnessLevel, awakeLevel, courageLevel) {
    this.calmLevel = this.getMoodValue(calmLevel);
    this.sadnessLevel = this.getMoodValue(sadnessLevel);
    this.awakeLevel = this.getMoodValue(awakeLevel);
    this.courageLevel = this.getMoodValue(courageLevel);
}

/**
 * Converts a value into a Mood-safe integer to ensure safe code
 * @param {Number} value - The value to be converted
 * @returns {Number} The converted mood value
 */
Mood.prototype.getMoodValue = function(value) {
    if(typeof value === "undefined" || Number.isNaN(value)) {
        // Error with value, therefore set to default value
        return 5;
    }

    value = Math.round(value);
    if(value <= 0) {
        return 1;
    } else if (value > MAX_MOOD_VALUE) {
        return MAX_MOOD_VALUE;
    } else {
        return value;
    }
}

module.exports = Mood;
