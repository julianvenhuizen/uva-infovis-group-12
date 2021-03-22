// Function that changes the color and adds country ID to the array
// Also displays the first country in the array
function changeColor(country) {
    if (!selectedCountries.includes(country.id)) {
        country.classList.add("selected-country");
        selectedCountries = selectedCountries.concat(country.id);
        console.log(selectedCountries)

        // Display last country in array
        nItems = selectedCountries.length
        document.getElementById("title_or_countryname").innerHTML = selectedCountries[nItems-1];
    }
    // If country is in array ("selected"): deselect and return to blue color
    else {
        country.classList.remove("selected-country");

        selectedCountries = arrayRemove(selectedCountries, country.id);
        
        // Display last country in array if any, else display some string
        if (selectedCountries.length < 1) {
            document.getElementById("title_or_countryname").innerHTML = "No country is selected";
        }
        else {
            nItems = selectedCountries.length
            document.getElementById("title_or_countryname").innerHTML = selectedCountries[nItems-1];
        }
    }
    updateLeftColumn();
    printCountryList();
}

// Function needed to deselect country, don't touch this please 
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    })
};