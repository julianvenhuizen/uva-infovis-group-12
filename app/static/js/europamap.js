// Function that changes the color and adds country ID to the selected countries array
// Also updates the left column's information
function selectCountry(country) {
    if (!selectedCountries.includes(country.id)) {

        // Sets the selected country limit to three
        if (selectedCountries.length > 2) {
            // TODO: add some kind of tooltip warning about max number of selected countries


        } 
        else {
            //country.classList.add("selected-country");
            selectedCountries = selectedCountries.concat(country.id);

            recolorSelectedCountries(reset = false);

        }
    }
    // If country is in array ("selected"): deselect and return to blue color
    else {
        //country.classList.remove("selected-country");
        country.classList.remove("selected-country1");
        country.classList.remove("selected-country2");
        country.classList.remove("selected-country3");
        selectedCountries = arrayRemove(selectedCountries, country.id);

        recolorSelectedCountries(reset = false);

    }

    // Updates variables, text and graphs according to the select
    if (selectedCountries.length !== 0) {
        updateFirstSelectedCountry();
    }
    else {
        // If no countries are selected, reset selectedBudget as well
        selectedBudget = "Total expenditures"
    }
    updateLeftColumn();
    
    updateSunburst(selectedYear, FirstSelectedCountry);

    updateBarchart(selectedCountries, selectedBudget);
}

// Function needed to deselect country, don't touch this please 
function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    })
};

function recolorSelectedCountries(reset) {
    for (var i = 0; i < selectedCountries.length; i++) {
        var country = document.getElementById(selectedCountries[i]);
        country.classList.remove("selected-country1");
        country.classList.remove("selected-country2");
        country.classList.remove("selected-country3");

        if (reset === false) {
            country.classList.add("selected-country" + (i+1).toString());
        }
    }
}