/**
 * Donec imperdiet dignissim semper. Sed vehicula purus dui, eget porta
 * lectus convallis sagittis. Suspendisse ac lectus dignissim, tincidunt
 * nisi quis, gravida metus.
 * @class
 */
class Alive {
    
    constructor() {
        /**
         * amount of energy
         * @property {Energy}
         * @defaultvalue null
         */
        this.energy = null;
        /**
        * This is a number array.
        * @constant
        * @type Object
        * @default
        */
       this.NUMBER_ARRAY = {
        google: "Google",
        games: "Games"
       }
    }
    /**
     * @param {Environment} environment The environment when this
     *  instance of {@link Alive} is surviving
     * @return {Energy} The energy wasted in this surviving instance
     * @method
     * @deprecated
     */
    survive() {
        return null;
    }
}
