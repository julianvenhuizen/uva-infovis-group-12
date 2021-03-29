var slider = document.getElementById("myRange");

// Update variable year with current slider value and display (each time you drag the slider handle)
slider.oninput = function() {
	selectedYear = slider.value
  	document.getElementsByClassName("yeardisplay").innerHTML = selectedYear;
  	updateSunburst(selectedYear, lastSelectedCountry);
}