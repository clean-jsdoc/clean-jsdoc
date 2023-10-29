/**
 * Donec imperdiet dignissim semper. Sed vehicula purus dui, eget porta
 * lectus convallis sagittis. Suspendisse ac lectus dignissim, tincidunt
 * nisi quis, gravida metus.
 * @class
 * @augments Alive
 */
class Tree extends Alive {
    constructor() {
        super();

        /**
         * Donec imperdiet dignissim
         * @type {Array<Alive>}
         */
        this.branches = null;
    }


    /**
     * @param {Environment} environment - The environment when this
     *  {@link Tree} is surviving
     * @returns {Energy} The energy wasted in this surviving instance
     * @function
     * @fires Tree.crop
     * @throws Err
     */
    crop(environment) {
        return null
    }
}
