/**
 * @module color/mixer
 *  @name colors
 */
module.exports = {

    /**
     * Blend two `colours` together.
     * @param {number} color1
     * @param {number} color2
     */
    'blend'(color1, color2) { },

    /**
     * Generator example
     * @yields {string} A `string` object, which *may* be empty
     */
    'gen': function *gen() { }
}

/** Class that represents a colour */
class Colour {

    /**
     * Create colour from rgb
     * @param {number} red
     * @param {number} green
     * @param {number} blue
     */
    constructor(red, green, blue) {
        const hex = n => n.toString(16).padStart(2, '0')
        this.hex = `#${[red, green, blue].map(hex).join('')}`
    }
}

/**
 * Darkens a color.
 * @param {number} color
 * @param {number} shade
 */
exports.darken = function (color, shade) { }

/** @module bookshelf */
 /**
  * @param {string} title
  * @class
  */
this.Book = function (title) {

    /** The title. */
    this.title = title
}
