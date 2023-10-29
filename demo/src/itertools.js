/**
 * @module itertools
 * @description Functional transformers for object collections using ES6
 *    features (e.g. computed property names)
 * @see [Computed Property Names]{@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#Computed_property_names}
 * @see [Functional JavaScript, by Michael Fogus]{@link https://www.oreilly.com/library/view/functional-javascript/9781449360757/}
 */

/**
 * Sorts the given `list` of objects according to the given `key`
 * @param {Array<object>} list - An object collection
 * @param {string} key - The property to sort by
 * @param {boolean} [desc] - Option to sort in reverse order
 * @returns {Array<object>} A sorted copy of `list`
 */
const sortBy = (list, key, desc = false) => {
    const sorted = list
        .map((obj, idx) => {
            return { [key]: obj[`${key}`], idx }
        })
        .sort((a, b) => {
            let first = a[`${key}`]
            let second = b[`${key}`]

            if (typeof a[`${key}`] === 'string' &&
                typeof b[`${key}`] === 'string') {
                first = a[`${key}`].toLowerCase()
                second = b[`${key}`].toLowerCase()
            }
            if (first < second) {
                return -1
            }
            if (first > second) {
                return 1
            }

            return 0
        })
        .map(s => list[s.idx])

    return desc ? sorted.reverse() : sorted
}

/**
 * Collects all the values at the given `key` and totals them by applying the
 *  given aggregate function (`xform`); returns an ordered summary of totals
 *  for each `group`
 * @param {Array<{string: number}>} list - An object collection
 * @param {string} group - A common property to group the results under
 * @param {string} key - A common property whose (numeric) value will be totalled
 * @param {module:itertools~Aggregate} [xform] - An aggregating function
 * @returns {Array<{string: number}>} A mapping of each item in `list`
 *   to its respective frequency
 */
const frequencyOf = (list, group, key, xform = (x, _, k) => x[`${k}`] += 1) => {
    return sortBy(list, group).reduce((freqs, item) => {
        const included =
            freqs.find(it => it[`${group}`] === item[`${group}`])

        if (included) {
            xform(included, item, `${key}`)
        } else {
            freqs = freqs.concat({
                [group]: item[`${group}`],
                [key]: item[`${key}`] || 1
            })
        }

        return freqs
    }, [{ [group]: '', [key]: 0 }]).slice(1)
}

/**
 * Takes two objects and the name of a common property, returning the sum of
 *  their respective values
 * @typedef Aggregate
 * @type {function({string: number},
                   {string: number},
                   string): number}
 * @param {{string: number}} obj1 - The first object
 * @param {{string: number}} obj2 - The second object
 * @param {string} prop - The name of a property common to both
 * @returns {number} The sum of the values of each object's common property
 * @example <caption>Using an aggregating function</caption>
 * const fn = (x, y, k) => x[`${k}`] + y[`${k}`]
 * const h1 = {'height': 7}
 * const h2 = {'height': 3}
 * const totalHeight = fn(h1, h2, 'height')
 * // returns 10
 */

module.exports = { sortBy, frequencyOf }
