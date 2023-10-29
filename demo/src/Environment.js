/**
 * Lorem ipsum dolor sit amet, {@link Energy} consectetur adipiscing
 * elit. Vestibulum condimentum tempus diam. Ut eget ultricies metus,
 * vitae ornare turpis. Vivamus lectus metus, euismod quis tortor quis,
 * pretium semper massa. Nulla mauris sapien, faucibus vitae metus et,
 * ultrices fringilla sem. Sed laoreet tempor odio, elementum
 * scelerisque nunc aliquet quis.
 * @class
 * @hideconstructor
 */
class Environment {
    constructor() {

      /**
       * All the living things in this {@link Environment}
       * @type {Array<Alive>}
       */
        this.livingThings = null;

      /**
       * The name of this {@link Environment}
       * @type {string}
       */
        this.name = null;
    }

    /**
     * Vestibulum condimentum tempus {@link Alive} diam.
     * @param {EnvironmentConfiguration} config - Configuration options
     */
    start(config) {

    }
}

/**
 * @typedef {object} EnvironmentConfiguration
 * @property {string} name - Name of a living thing
 * @property {Map<string, number>} attributes - A mapping of attributes
 */

/**
 * Lorem ipsum dolor sit amet, {@link Energy} consectetur adipiscing el
 * @event Environment#beforeDestroy
 * @type {Energy}
 * @property {boolean} isLiving - Pulvis et umbra sumus
 */
