var slider = document.getElementById("myRange");

// Update variable year with current slider value and display (each time you drag the slider handle)
slider.oninput = function() {
	var year = slider.value
  	document.getElementById("yeardisplay").innerHTML = year;
}