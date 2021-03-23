// Function that changes the color and adds country ID to the selected countries array
// Also updates the left column's information
function selectCountry(country) {
    if (!selectedCountries.includes(country.id)) {

        // Sets the selected country limit to three
        if (selectedCountries.length > 2) {
        } else {
            country.classList.add("selected-country");
            selectedCountries = selectedCountries.concat(country.id);
        }
    }
    // If country is in array ("selected"): deselect and return to blue color
    else {
        country.classList.remove("selected-country");
        selectedCountries = arrayRemove(selectedCountries, country.id);
    }

    // Updates variables, text and graphs according to the select
    updateLastSelectedCountry();
    updateLeftColumn();
}

// Function needed to deselect country, don't touch this please 
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    })
};