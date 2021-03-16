var slider = document.getElementById("myRange");
var output = document.getElementById("year");


// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  	output.value = slider.value;
}

output.oninput = function() {
  	slider.value = output.value;
}