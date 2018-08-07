/*****************Tabs for the different searches****************/

//Default tab that will show automatically when page is loaded;
window.addEventListener("load", function() {
	document.getElementById("pitStops").style.display = "block";
	loader();
});

//tab search;
function openSearch(event, searchName) {
	var i;
	var tabContent;
	var tabLinks;

	//Hiding all the elements with the class of "tabContent";
	tabContent = document.getElementsByClassName("tabContent");
	for (i = 0; i < tabContent.length; i++) {
		tabContent[i].style.display = "none";
	}

	//Removing the class of "active" from all the elements with the class of "tabLinks";
	tabLinks = document.getElementsByClassName("tabLinks");
	for (i = 0; i < tabLinks.length; i++) {
		tabLinks[i].className = tabLinks[i].className.replace(" active", "");
	}

	//Show the information that is in the current tab and add an "active" class to the button that opened the tab;
	document.getElementById(searchName).style.display = "block";
	event.currentTarget.className += " active";
}

/********************Dynamically create finds********************/
//dynamically populate the search find results onto the page;

//Pit-Stops
function addPitStops(data) {
	var findData = data.data;

	console.log("PitStops Data: ", findData);

	for (var i = 0; i < findData.length; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome-pitStops";

		var imgContainer = document.createElement("div");
		imgContainer.className = "outcome-pitStops-img";

		var findsImg = document.createElement("IMG");
		findsImg.setAttribute("src", findData[i]["image_url"]);

		imgContainer.append(findsImg);

		var findsInfo = document.createElement("div");
		findsInfo.className = "outcome-pitStops-info";

		var findsTitle = document.createElement("H1");
		var titleContent = document.createTextNode(findData[i]["name"]);
		findsTitle.appendChild(titleContent);

		var findsReviewCount = document.createElement("P");
		var reviewCountContent = document.createTextNode("Based on " + findData[i]["review_count"] + " Reviews");
		findsReviewCount.appendChild(reviewCountContent);

		var findsReadMore = document.createElement("a");
		var readMoreContent = document.createTextNode("More Info");
		findsReadMore.className = "yelpLink";
		findsReadMore.setAttribute("href", findData[i]["url"]);
		findsReadMore.setAttribute("target", "blank");
		findsReadMore.appendChild(readMoreContent);

		findsInfo.append(findsTitle);

		var ratingImg = document.createElement("IMG");
		ratingImg.setAttribute("src", `${stars(findData[i]["rating"])}`);
		findsInfo.append(ratingImg);

		findsInfo.append(findsReviewCount);
		findsInfo.append(findsReadMore);

		resultDivs.append(imgContainer);
		resultDivs.append(findsInfo);

		var newDiv = document.querySelector("div.findPitStops");
		newDiv.append(resultDivs);
	}

	var pagination = document.createElement("div");
	pagination.className = "pagination";

	debugger;
	for (var j = 1; j < 6; j++) {
		var pageNum = document.createElement("button");
		pageNum.className = "pages";
		pageNum.setAttribute("id", "pageNum");
		var pageNumContent = document.createTextNode(j);
		pageNum.appendChild(pageNumContent);

		pagination.append(pageNum);

		pageNum.addEventListener("click", function() {
			document.querySelector("div.findPitStops").innerHTML = "";
			yelpPagination();
		});
	}

	newDiv.append(pagination);

	initMap(findData);
	emptyOutResults();
}

//Weather
function addWeather(data) {
	var weather = data.daily.data;
	for (var i = 0; i < weather.length; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome-weather";

		var imgContainer = document.createElement("div");
		imgContainer.className = "forecast-img-time";

		var weatherImg = document.createElement("IMG");
		weatherImg.setAttribute("src", `${forecastImg(weather[i]["icon"])}`);
		var weatherDate = new Date(weather[i]["time"] * 1000);
		var dateString = weatherDate.toGMTString();
		var time = document.createElement("P");
		var timeContent = document.createTextNode(dateString);
		time.className = "weather-time";
		time.appendChild(timeContent);

		imgContainer.append(weatherImg);
		imgContainer.append(time);

		var infoContainer = document.createElement("div");
		infoContainer.className = "weather-info";

		var highTemp = document.createElement("P");
		highTemp.className = "highTemp";
		var highInfo = document.createTextNode("Temp High: " + weather[i]["temperatureHigh"] + "˚F");
		highTemp.appendChild(highInfo);
		var lowTemp = document.createElement("P");
		lowTemp.className = "lowTemp";
		var lowInfo = document.createTextNode("Temp Low: " + weather[i]["temperatureLow"] + "˚F");
		lowTemp.appendChild(lowInfo);
		var precipProb = document.createElement("P");
		precipProb.className = "precipProb";
		var precipInfo = document.createTextNode(
			"Precipitation Probability: " + (weather[i]["precipProbability"] * 100).toFixed(2) + "%"
		);
		precipProb.appendChild(precipInfo);
		var windSpeed = document.createElement("P");
		windSpeed.className = "windSpeed";
		var windInfo = document.createTextNode("Wind Speed: " + weather[i]["windSpeed"] + " miles per hour");
		windSpeed.appendChild(windInfo);
		var weatherSummary = document.createElement("P");
		weatherSummary.className = "weatherSum";
		var summaryInfo = document.createTextNode("Weather Summary: " + weather[i]["summary"]);
		weatherSummary.appendChild(summaryInfo);

		infoContainer.append(highTemp);
		infoContainer.append(lowTemp);
		infoContainer.append(precipProb);
		infoContainer.append(windSpeed);
		infoContainer.append(weatherSummary);

		resultDivs.append(imgContainer);
		resultDivs.append(infoContainer);

		var newDiv = document.querySelector("div.findWeather");
		newDiv.appendChild(resultDivs);
	}

	emptyOutResults();
}

/****************Empty out Container*******************/
//empty out search results for new search;

function emptyOutResults() {
	document.getElementById("go-pit").addEventListener("click", function() {
		document.querySelector("div.findPitStops").innerHTML = "";
		searchValue = "";
		searchLocation = "";
		addPitStops();
	});

	document.getElementById("go-weather").addEventListener("click", function() {
		document.querySelector("div.findWeather").innerHTML = "";
		addWeather();
	});
}

/******************** Weather Forecast Icons **********************/
//switching out the weather icons according to the weather summary

function forecastImg(summary) {
	var img;
	switch (summary) {
		case "clear-day":
			return (img = "../climacons-master/SVG/Sun.svg");
		case "clear-night":
			return (img = "../climacons-master/SVG/Moon.svg");
		case "rain":
			return (img = "../climacons-master/SVG/Cloud-Rain.svg");
		case "snow":
			return (img = "../climacons-master/SVG/Cloud-Snow.svg");
		case "wind":
			return (img = "../climacons-master/SVG/Cloud-Wind.svg");
		case "fog":
			return (img = "../climacons-master/SVG/Cloud-Fog.svg");
		case "cloudy":
			return (img = "../climacons-master/SVG/Cloud.svg");
		case "partly-cloudy-day":
			return (img = "../climacons-master/SVG/Cloud-Sun.svg");
		case "partly-cloudy-night":
			return (img = "../climacons-master/SVG/Cloud-Moon.svg");
		case "sleet":
		case "hail":
			return (img = "../climacons-master/SVG/Cloud-Hail.svg");
		case "thunderstorm":
			return (img = "../climacons-master/SVG/Cloud-Lightning.svg");
		case "tornado":
			return (img = "../climacons-master/SVG/Tornado.svg");
		default:
			return (img = "");
	}
}

/******************* Weather API *********************/
function getWeather(locationWeather) {
	document.getElementById("loader").style.display = "block";

	var lat = locationWeather["lat"];
	var long = locationWeather["lng"];

	var options = {
		url: "/forecast",
		method: "POST",
		dataType: "JSON",
		data: {
			latitude: lat,
			longitude: long
		},
		success: function(data) {
			document.getElementById("loader").style.display = "none";
			console.log("Dark Sky Response: ", data);

			addWeather(data);
		},
		failure: function(err) {
			document.getElementById("loader").style.display = "none";
			console.log("Dark Sky Error: ", err);
		}
	};

	$.ajax(options);
}

/******************* Yelp Results Pagination *******************/
function yelpPagination() {
	var num = event.target.textContent;

	var offset = parseInt(10 * num + 1);

	getBusiness(offset);
}

/********************Yelp Star Reviews**********************/
//switching out the star images according to the ratings for the yelp reviews
//of the businesses

function stars(reviews) {
	var img;
	switch (reviews) {
		case 0:
			return (img = "../yelp_stars/web_and_ios/small/small_0.png");
		case 1:
			return (img = "../yelp_stars/web_and_ios/small/small_1.png");
		case 1.5:
			return (img = "../yelp_stars/web_and_ios/small/small_1_half.png");
		case 2:
			return (img = "../yelp_stars/web_and_ios/small/small_2.png");
		case 2.5:
			return (img = "../yelp_stars/web_and_ios/small/small_2_half.png");
		case 3:
			return (img = "../yelp_stars/web_and_ios/small/small_3.png");
		case 3.5:
			return (img = "../yelp_stars/web_and_ios/small/small_3_half.png");
		case 4:
			return (img = "../yelp_stars/web_and_ios/small/small_4.png");
		case 4.5:
			return (img = "../yelp_stars/web_and_ios/small/small_4_half.png");
		case 5:
			return (img = "../yelp_stars/web_and_ios/small/small_5.png");
		default:
			return (img = "");
	}
}

/*********************YELP API*********************/
var searchValue = "";
var searchLocation = "";

function getBusiness(offset) {
	document.getElementById("loader").style.display = "block";

	if (searchValue === "" && searchLocation === "") {
		searchValue = $("#search-p").val();
		searchLocation = $("#location-p").val();
	}

	var options = {
		url: "/yelp-search",
		method: "POST",
		dataType: "JSON",
		data: {
			term: searchValue,
			location: searchLocation,
			limit: 10,
			offset: offset
		},
		success: function(data) {
			document.getElementById("loader").style.display = "none";
			console.log("Yelp Response: ", data);

			addPitStops(data);
		},
		failure: function(err) {
			document.getElementById("loader").style.display = "none";
			console.log("Yelp Error: ", err);
		}
	};

	$.ajax(options);
}

/********************* Google Maps API **********************/
//creating markers for the map and grabbing geolocation of user/directions for each yelp location
var map, infoWindow, userLocation, popup, Popup;
function initMap(data) {
	// debugger;
	console.log("initMap data: ", data);

	// var unitedStatesCenterPoint = { lat: 37.09024, lng: -95.712891 };
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 11,
		center: userLocation,
		// mapTypeId: google.maps.MapTypeId.TERRAIN
		styles: mapStyle
	});

	// //Geocode, grabbing lat and lng
	var geocoder = new google.maps.Geocoder();

	document.getElementById("go-weather").addEventListener("click", function() {
		geocodeAddress(geocoder, map);
	});

	// creating the markers for the map from yelp api
	if (data) {
		var image = {
			url: "../images/motorbike.png",
			size: new google.maps.Size(32, 32),
			origin: new google.maps.Point(0, 0),
			anchor: new google.maps.Point(0, 32)
		};

		for (var i = 0; i < data.length; i++) {
			var coords = data[i]["coordinates"];
			var latLng = new google.maps.LatLng(coords["latitude"], coords["longitude"]);
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: image
			});

			var infoWindow = new google.maps.InfoWindow();

			var content = data[i]["name"];
			var currentInfoWindow = null;
			google.maps.event.addListener(
				marker,
				"click",
				(function(marker, content, infowindow) {
					return function(event) {
						if (currentInfoWindow !== null) {
							currentInfoWindow.close();
						}
						infowindow.setContent(content);
						infowindow.open(map, marker);
						currentInfoWindow = infowindow;
						displayRoute(userLocation, event.latLng, directionsService, directionsDisplay);
					};
				})(marker, content, infoWindow)
			);
		}
	}

	// directions to the yelp destination from the current location of the user
	var directionsService = new google.maps.DirectionsService();
	var directionsDisplay = new google.maps.DirectionsRenderer({
		draggable: true,
		map: map,
		panel: document.getElementById("right-panel")
	});

	//grabbing the users geolocation
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			function(position) {
				var pos = { lat: position.coords.latitude, lng: position.coords.longitude };
				var infoWindow = new google.maps.InfoWindow();
				userLocation = pos;
				infoWindow.setPosition(pos);
				infoWindow.setContent(" Location found. ");
				infoWindow.open(map);
				map.setCenter(pos);
			},
			function() {
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	} else {
		handleLocationError(false, infoWindow, map.getCenter());
	}

	directionsDisplay.addListener("directions_changed", function() {
		computeTotalDistance(directionsDisplay.getDirections());
	});
}

//Geocoding the address for lat and lng for the weather
function geocodeAddress(geocoder, resultsMap) {
	var address = document.getElementById("address").value;
	geocoder.geocode({ address: address }, function(results, status) {
		if (status === "OK") {
			var locationWeather = {
				lat: results[0].geometry.location.lat(),
				lng: results[0].geometry.location.lng()
			};
			getWeather(locationWeather);
		} else {
			alert("Geocode was not successful for the following reason: " + status);
		}
	});
}

//Error handling for the geolocation
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? " Error: The Geolocation service failed. "
			: " Error: Your browser doesn't support geolocation. "
	);
	infoWindow.open(map);
}

//displaying the route
function displayRoute(origin, destination, service, display) {
	document.getElementById("routes").style.display = "block";
	service.route(
		{
			origin: origin,
			destination: destination,
			// waypoints: [{ location: "" }, { location: "" }],
			travelMode: "DRIVING",
			avoidTolls: true
		},
		function(response, status) {
			if (status === "OK") {
				display.setDirections(response);
			} else {
				alert("Could not display directions due to: " + status);
			}
		}
	);
}

//the total distance from user location to the destination
function computeTotalDistance(result) {
	var total = 0;
	var myRoute = result.routes[0];

	for (var i = 0; i < myRoute.legs.length; i++) {
		total += myRoute.legs[i].distance.value;
	}

	total = total / 1000;

	document.getElementById("total").innerHTML = total + " km";
}

/*******************Page Loader ********************/
function loader() {
	var loader = document.createElement("div");
	loader.className = "ldr-roller";
	loader.setAttribute("id", "loader");

	for (var i = 0; i < 8; i++) {
		var div = document.createElement("div");
		loader.append(div);
	}

	var page = document.querySelector("div.container");
	page.appendChild(loader);
}

/******************* Map Style ********************/

var mapStyle = [
	{
		featureType: "administrative",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#d6e2e6"
			}
		]
	},
	{
		featureType: "administrative",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#cfd4d5"
			}
		]
	},
	{
		featureType: "administrative",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#7492a8"
			}
		]
	},
	{
		featureType: "administrative.country",
		elementType: "geometry.fill",
		stylers: [
			{
				visibility: "simplified"
			},
			{
				color: "#952f2f"
			}
		]
	},
	{
		featureType: "administrative.neighborhood",
		elementType: "labels.text.fill",
		stylers: [
			{
				lightness: 25
			}
		]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#e6e6e6"
			},
			{
				saturation: "0"
			}
		]
	},
	{
		featureType: "landscape.man_made",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#d5d4cf"
			}
		]
	},
	{
		featureType: "landscape.natural",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#7492a8"
			}
		]
	},
	{
		featureType: "landscape.natural.terrain",
		elementType: "all",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "geometry",
		stylers: [
			{
				visibility: "simplified"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#e3e1dd"
			},
			{
				visibility: "simplified"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#6e6362"
			},
			{
				weight: "2"
			}
		]
	},
	{
		featureType: "poi",
		elementType: "labels.icon",
		stylers: [
			{
				saturation: -100
			},
			{
				visibility: "simplified"
			}
		]
	},
	{
		featureType: "poi.business",
		elementType: "all",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "poi.park",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#a9de83"
			}
		]
	},
	{
		featureType: "poi.park",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#bae6a1"
			}
		]
	},
	{
		featureType: "poi.sports_complex",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#c6e8b3"
			}
		]
	},
	{
		featureType: "poi.sports_complex",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#bae6a1"
			}
		]
	},
	{
		featureType: "road",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#41626b"
			}
		]
	},
	{
		featureType: "road",
		elementType: "labels.icon",
		stylers: [
			{
				saturation: -45
			},
			{
				lightness: 10
			},
			{
				visibility: "on"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#c1d1d6"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "geometry.stroke",
		stylers: [
			{
				color: "#a6b5bb"
			}
		]
	},
	{
		featureType: "road.highway",
		elementType: "labels.icon",
		stylers: [
			{
				visibility: "on"
			}
		]
	},
	{
		featureType: "road.highway.controlled_access",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#9fb6bd"
			}
		]
	},
	{
		featureType: "road.arterial",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#ffffff"
			}
		]
	},
	{
		featureType: "road.local",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#ffffff"
			}
		]
	},
	{
		featureType: "transit",
		elementType: "labels.icon",
		stylers: [
			{
				saturation: -70
			}
		]
	},
	{
		featureType: "transit.line",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#b4cbd4"
			}
		]
	},
	{
		featureType: "transit.line",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#588ca4"
			}
		]
	},
	{
		featureType: "transit.station",
		elementType: "all",
		stylers: [
			{
				visibility: "off"
			}
		]
	},
	{
		featureType: "transit.station",
		elementType: "labels.text.fill",
		stylers: [
			{
				color: "#008cb5"
			},
			{
				visibility: "on"
			}
		]
	},
	{
		featureType: "transit.station.airport",
		elementType: "geometry.fill",
		stylers: [
			{
				saturation: -100
			},
			{
				lightness: -5
			}
		]
	},
	{
		featureType: "water",
		elementType: "geometry.fill",
		stylers: [
			{
				color: "#a6cbe3"
			}
		]
	}
];
