/**
 * This object represents one size of a photo or a [file](https://core.telegram.org/bots/api/#document)
 * / [sticker](https://core.telegram.org/bots/api/#sticker)
 * thumbnail.
 * @typedef {object} PhotoSize
 * @property {string} file_id Identifier for this file, which can be used to download or reuse the file
 * @property {string} file_unique_id Unique identifier for this file, which is supposed to be the same over time and
 *   for different bots. Can't be used to download or reuse the file.
 * @property {number} width Photo width
 * @property {number} height Photo height
 * @property {number} [file_size] *Optional*. File size in bytes
 * @see https://core.telegram.org/bots/api/#photosize
 */

/**
 * @summary
 * This is a short summary of the `Alive` class. These texts are just acting
 * as filler texts for summary.
 * @class
 */
class Alive {

    constructor() {

        /**
         * @summary
         * amount of energy
         * @property {Energy} energy - The energy wasted in this surviving instance.
         * @default null
         * @example
         * world = this.world
         * function test() {
         *  return world
         * }
         * @alias AliveEnergy
         */
        this.energy = null;

        /**
         * This is a number array.
         * @constant
         * @type {{google:string,games:string}}
         * @default
         */
        this.NUMBER_ARRAY = {
            'google': 'Google',
            'games': 'Games'
        }
    }


    /**
     * A constant.
     * @readonly
     * @returns {number} The constant value of {@link Alive.FOO}.
     * @deprecated This is no longer used
     */
    static get FOO() {
        return 1;
    }


    /**
     * @param {Array<object | Function | Array | number | string | undefined | null | symbol | boolean | Energy>} life This is an array of many things.
     * @returns {Energy} the energy wasted in this surviving instance
     * {@link https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event context-menu}
     * @function
     * @deprecated
     */
    survive(life) {
        return null;
    }


    /**
     * Text
     * > Text
     *
     *
     *```js
     * code
     *```
     *
     *
     * > Note that commands are not matched in captions or in the middle of the text.
     * @returns {null} Null.
     */
    gameQuery() {
        return null;
    }
}

/**
 * Options for ordering a delicious slice of pie.
 * @namespace
 */
const pieOptions = {

    /**
     * Plain.
     */
    'plain': 'pie',

    /**
     * A la mode.
     * @readonly
     * @returns {string} A pie option.
     */
    get 'aLaMode'() {
        return `${this.plain} with ice cream`;
    },

    /**
     * This is just a namespace functions.
     * @param {number} args
     */
    aNamespaceFunction(args) {

    }
};
