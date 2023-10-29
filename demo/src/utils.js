/**
 * Maps a weather forecast description to an appropriate icon
 * @see https://erikflowers.github.io/weather-icons/api-list.html
 * @param {WeatherReading} reading - A weather forecast object
 * @returns {string} A keyword matching a CSS class name in the icon set
 */
const fetchWeatherIcon = function (reading) {
    const desc = reading.brief || '';
    const hour = reading.currency;
    const extended = reading.longRange || false;

    if ((/(.*clear.*)/iu).test(desc) ||
        (/(sun\w*)/iu).test(desc)) {
        return hour > 6 && hour < 18 || extended ? 'sunny' : 'clear';
    } else if ((/(.*cloud.*)/iu).test(desc) || (/(.*overcast.*)/iu).test(desc)) {
        return (/(.*partly.*)/iu).test(desc) ||
                (/(.*light.*)/iu).test(desc) ?
            'partly-cloudy' :
            'cloudy';
    } else if ((/(.*rain.*)/iu).test(desc) || (/(.*shower.*)/iu).test(desc)) {
        return (/.*light.*/iu).test(desc) ? 'sprinkle' : 'showers';
    } else if ((/(.*snow.*)/iu).test(desc)) {
        return 'snow';
    } else if ((/.*sleet.*/iu).test(desc)) {
        return 'rain-mix';
    } else if ((/.*thunder.*/iu).test(desc)) {
        return 'thunderstorm';
    } else if ((/(fog)/iu).test(desc) || (/(mist)/iu).test(desc)) {
        return 'fog';
    }

    return 'clear';
}

/**
 * Prepares weather data for display
 * @param {WeatherReading} reading
 * @returns {WeatherReading} A formatted {@link WeatherReading}.
 * @private
 */
const formatData = function (reading) {
    const truncate = val => {
        const parsedTemp = parseFloat(val).toFixed(0);

        return Math.abs(parsedTemp) === 0 ? 0 : parsedTemp;
    }

    const celsiusToFahrenheit = val => {
        const tempInFahrenheit = parseFloat(val) * 9 / 5 + 32;

        return `${truncate(parseFloat(val) * 9 / 5 + 32)} \u00B0F`;
    }

    const millimetersToInches = val => {
        return `${(parseFloat(val) * 0.039370).toFixed(2)} inches`;
    }

    const metersPerSecondToMilesPerHour = val => {
        return `${truncate(parseFloat(val) * 3600 / 1609.344)} miles/hr`;
    }

    reading.brief = reading.brief.replace('_', ' ').toUpperCase();
    reading.temp = `${truncate(reading.temp)} \u00B0C`;
    reading.high = `${truncate(reading.high)} \u00B0C`;
    reading.low = `${truncate(reading.low)} \u00B0C`;
    reading.windSpeed = `${truncate(reading.windSpeed)} meters/sec`;

    if (reading.rainAmount) {
        reading.rainAmount = `${truncate(reading.rainAmount)} mm`;
    }

    if (reading.snowAmount) {
        reading.snowAmount = `${truncate(reading.snowAmount)} mm`;
    }

    return reading;
}

/**
 * Encapsulates weather forecast information
 */
class WeatherReading {

    /**
     * Initializes a new {@link WeatherReading}
     * @param {object} init - The initial values of a new {@link WeatherReading}
     * @param {string} init.city - The name of a city
     * @param {number} init.latitude - GPS latitude of a city
     * @param {number} init.longitude - GPS longitude of a city
     * @param {number} init.currency - The hour portion of the forecast timestamp (24-hr format)
     * @param {string} init.brief - A short weather description
     * @param {number} init.temp - The current recorded temperature
     * @param {number} init.low - The forecast high temperature
     * @param {number} init.high - The forecast low temperature
     * @param {number} init.windSpeed - The current recorded wind speed
     * @param {number} init.windDir - The current recorded wind direction
     * @param {number} [init.rainAmount] - The forecast rain accumulation
     * @param {number} [init.snowAmount] - The forecast snow accumulation
     * @param {boolean} init.longRange - Whether or not this {@link WeatherReading} is a long range forecast
     */
    constructor(init = {}) {

        /** @type {string} */
        this.city = init.city;

        /** @type {number} */
        this.latitude = init.latitude;

        /** @type {number} */
        this.longitude = init.longitude;

        /** @type {number} */
        this.currency = init.currency;

        /** @type {string} */
        this.brief = init.brief;

        /** @type {number} */
        this.temp = init.temp;

        /** @type {number} */
        this.low = init.low;

        /** @type {number} */
        this.high = init.high;

        /** @type {number} */
        this.windSpeed = init.windSpeed;

        /** @type {number} */
        this.windDir = init.windDir;

        /** @type {number} */
        this.rainAmount = init.rainAmount;

        /** @type {number} */
        this.snowAmount = init.snowAmount;

        /** @type {boolean} */
        this.longRange = init.longRange;
    }
}
