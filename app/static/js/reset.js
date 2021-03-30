// Reset button js code

function reset_board() {
	// // All countries that are colored orange
	// var orangecountries = document.getElementsByClassName("selected-country")

	// // Make them blue again
	// while (orangecountries.length > 0) {
	//  orangecountries[0].classList.remove("selected-country");
	//  orangecountries = document.getElementsByClassName("selected-country")
	//  }

	recolorSelectedCountries(reset = true)

	// Reset all global variables
	selectedCountries = [];
	FirstSelectedCountry;
	selectedYear = 2019;
	selectedBudget = "SUSTAINABLE GROWTH: NATURAL RESOURCES";

	//Reset timeslider state
	document.getElementById("yeardisplay").innerHTML = selectedYear;
	var slider = document.getElementById("myRange");
	slider.value = selectedYear

	// Reset displayed country name and country dropdown, sunburst and barchart
	updateLeftColumn();

	updateSunburst(selectedYear, FirstSelectedCountry);

    updateBarchart(selectedCountries, selectedBudget);
}