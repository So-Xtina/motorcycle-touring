const DarkSky = require("dark-sky");
const { YELP_API_KEY, DARK_SKY_API_KEY } = require("./config/credentials.js");
const darkSky = new DarkSky(DARK_SKY_API_KEY);

async function getForecast() {
	const forecast = await darkSky
		.options({
			latitude: 33.6348834,
			longitude: -117.74045429999998
		})
		.get();
	// return forecast;
	await console.log("This is our forecast", forecast);
}

// console.log("This is our forecast", getForecast());
getForecast();
