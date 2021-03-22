var selectedCountries = [];

// Function that changes the color and adds country ID to the array
// Also displays the first country in the array
function changeColor(country) {
    if (!selectedCountries.includes(country.id)) {
        country.classList.add("selected-country");
        selectedCountries = selectedCountries.concat(country.id);

        // Display first country in array
        document.getElementById("title_or_countryname").innerHTML = selectedCountries[0];
    }
    // If country is in array ("selected"): deselect and return to blue color
    else {
        country.classList.remove("selected-country");

        selectedCountries = arrayRemove(selectedCountries, country.id);
        
        // Display first country in array if any, else display some string
        if (selectedCountries.length < 1) {
            document.getElementById("title_or_countryname").innerHTML = "No country is selected";
        }
        else {
            document.getElementById("title_or_countryname").innerHTML = selectedCountries[0];
        }
    }
}

// Function needed to deselect country, don't touch this please 
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    })
};