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
//Routes
function addRoutes(data) {
	for (var i = 1; i <= data.length; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome-routes";

		var findsContainer = document.createElement("P");
		var resultContent = document.createTextNode(data);
		findsContainer.appendChild(resultContent);
		resultDivs.appendChild(findsContainer);

		var newDiv = document.querySelector("div.findRoutes");
		newDiv.appendChild(resultDivs);
	}
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

//Pit-Stops
function addPitStops() {
	for (var i = 1; i <= 5; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome-pitStops";

		var resultContent = document.createTextNode("Search " + i);
		resultDivs.appendChild(resultContent);

		var newDiv = document.querySelector("div.findPitStops");
		newDiv.appendChild(resultDivs);
	}
}

// /*********************YELP API*********************/

function getBusiness() {
	debugger;

	let searchValue = $("#search-r").val();
	let searchLocation = $("#location-r").val();

	var options = {
		url: "/yelp-search",
		method: "POST",
		dataType: "JSON",
		data: {
			search: searchValue,
			location: searchLocation
		},
		success: function(data) {
			console.log("The response: ", data);

			addRoutes(data);
		},
		failure: function(err) {
			console.log("The error: ", data);
		}
	};

	$.ajax(options);
}
