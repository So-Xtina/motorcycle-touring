const express = require("express");
const yelp = require("yelp-fusion");
const path = require("path");
const bodyParser = require("body-parser");
const DarkSky = require("dark-sky");
const { YELP_API_KEY, DARK_SKY_API_KEY } = require("./config/credentials.js");
const darkSky = new DarkSky(DARK_SKY_API_KEY);

const app = express();
const PORT = 9000;
const client = yelp.client(YELP_API_KEY);

// app.use(express.json());
// app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "..", "client")));

//****************Endpoints start here****************/

// app.get("/", (req, res) => {
// 	// res.sendFile(__dirname + "/client/index.html");
// });

//YELP ENDPOINT
app.post("/yelp-search", async (req, res) => {
	const { term, location } = req.body;
	console.log("this is the term: ", term);
	let output = {};

	await client
		.search({ term, location })
		.then(response => {
			output.success = true;
			output.data = response.jsonBody.businesses;
		})
		.catch(err => {
			output.success = false;
			output.errors = JSON.parse(err.response.body);
		});

	res.json(output);
});

//DARK SKY ENDPOINT
app.post("/forecast", async (req, res) => {
	const { latitude, longitude } = req.body;
	const forecast = await darkSky
		.options({
			latitude,
			longitude
		})
		.get();
	res.status(200).json(forecast);
});

app.listen(PORT, () => {
	console.log("Server started on PORT: ", PORT);
});
