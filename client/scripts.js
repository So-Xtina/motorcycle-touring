/*****************Tabs for the different searches****************/

//Default tab that will show automatically when page is loaded;
window.addEventListener("load", function() {
	document.getElementById("routes").style.display = "block";
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
	initMap(findData);

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
		newDiv.appendChild(resultDivs);
	}

	emptyOutResults();
}

//Weather
function addWeather() {
	for (var i = 1; i <= 5; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome-weather";

		var resultContent = document.createTextNode("Search " + i);
		resultDivs.appendChild(resultContent);

		var newDiv = document.querySelector("div.findWeather");
		newDiv.appendChild(resultDivs);
	}
}

//Routes
function addRoutes() {
	for (var i = 1; i <= 5; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome-routes";

		var resultContent = document.createTextNode("Search " + i);
		resultDivs.appendChild(resultContent);

		var newDiv = document.querySelector("div.findRoutes");
		newDiv.appendChild(resultDivs);
	}
}

/****************Empty out Container*******************/
//empty out search results for new search;

function emptyOutResults() {
	document.getElementById("go").addEventListener("click", function() {
		document.querySelector("div.findPitStops").innerHTML = "";
		addPitStops();
	});
	// findWeather.innerHTML = "";
	// findRoutes.innerHTML = "";
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

/********************* Map Markers! **********************/
//creating a marker for the map
var map;
function initMap(data) {
	debugger;
	console.log("initMap data: ", data);
	var unitedStatesCenterPoint = { lat: 37.09024, lng: -95.712891 };
	map = new google.maps.Map(document.getElementById("map"), {
		zoom: 3.9,
		center: unitedStatesCenterPoint,
		mapTypeId: google.maps.MapTypeId.TERRAIN
	});

	for (var i = 0; i < data.length; i++) {
		var coords = data[i]["coordinates"];
		var latLng = new google.maps.LatLng(coords["latitude"], coords["longitude"]);
		var marker = new google.maps.Marker({
			position: latLng,
			map: map
		});
	}
}

/*********************YELP API*********************/

function getBusiness() {
	var searchValue = $("#search-p").val();
	var searchLocation = $("#location-p").val();

	var options = {
		url: "/yelp-search",
		method: "POST",
		dataType: "JSON",
		data: {
			term: searchValue,
			location: searchLocation
		},
		success: function(data) {
			console.log("The response: ", data);

			addPitStops(data);
		},
		failure: function(err) {
			console.log("The error: ", data);
		}
	};

	$.ajax(options);
}
