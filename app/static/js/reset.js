// Reset button js code

function reset_board() {
	var orangecountries = document.getElementsByClassName("selected-country")

	//console.log(orangecountries)

	//orangecountries.classList.remove("selected-country");

	while (orangecountries.length > 0) {
	 orangecountries[0].classList.remove("selected-country");
	 orangecountries = document.getElementsByClassName("selected-country")
	 }

	selectedCountries = [];
	FirstSelectedCountry;
	selectedYear = 2019;
	selectedBudget = "SUSTAINABLE GROWTH: NATURAL RESOURCES";

	document.getElementById("yeardisplay").innerHTML = selectedYear;
	var slider = document.getElementById("myRange");

	slider.value = selectedYear

	updateLeftColumn();

	updateSunburst(selectedYear, FirstSelectedCountry);

    updateBarchart(selectedCountries, selectedBudget);
}