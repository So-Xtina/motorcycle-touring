/*****************Tabs for the different searches****************/

//Default tab that will show automatically when page is loaded;
window.addEventListener("load", function() {
	document.getElementById("routes").style.display = "block";
	addRoutes();
	addWeather();
	addPitStops();
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
function addRoutes() {
	for (var i = 1; i <= 5; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome";

		var resultContent = document.createTextNode("Search " + i);
		resultDivs.appendChild(resultContent);

		var newDiv = document.querySelector("div.findRoutes");
		newDiv.appendChild(resultDivs);
	}
}

//Weather
function addWeather() {
	for (var i = 1; i <= 5; i++) {
		var resultDivs = document.createElement("div");
		resultDivs.className = "outcome";

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
		resultDivs.className = "outcome";

		var resultContent = document.createTextNode("Search " + i);
		resultDivs.appendChild(resultContent);

		var newDiv = document.querySelector("div.findPitStops");
		newDiv.appendChild(resultDivs);
	}
}
