var selectedCountries = [];
var FirstSelectedCountry;
var selectedYear = 2019;
var selectedBudget = "Total expenditures";
var countryNames = {
        "AL": "Albania",
        "AT": "Austria",
        "BE": "Belgium",
        "BG": "Bulgaria",
        "BA": "Bosnia and Herz.",
        "BY": "Belarus",
        "CH": "Switzerland",
        "CZ": "Czech Rep.",
        "DE": "Germany",
        "DK": "Denmark",
        "EE": "Estonia",
        "FI": "Finland",
        "UK": "United Kingdom",
        "EL": "Greece",
        "HR": "Croatia",
        "HU": "Hungary",
        "IE": "Ireland",
        "IS": "Iceland",
        "IT": "Italy",
        "LT": "Lithuania",
        "LU": "Luxembourg",
        "LV": "Latvia",
        "MD": "Moldova",
        "MK": "Macedonia",
        "ME": "Montenegro",
        "NL": "Netherlands",
        "NO": "Norway",
        "PL": "Poland",
        "PT": "Portugal",
        "RO": "Romania",
        "RS": "Serbia",
        "SK": "Slovakia",
        "SI": "Slovenia",
        "SE": "Sweden",
        "UA": "Ukraine",
        "FR": "France",
        "ES": "Spain",
        "CY": "Cyprus",
        "MT": "Malta"
    };

// Displays instructions when no country is selected and otherwise the graphs
function updateLeftColumn() {
    var instructions = document.getElementById("instructions-panel");
    var graphs = document.getElementById("sunburst-panel");

    // Prints the home screen if there are no countries selected
    if (selectedCountries.length === 0) {

        document.getElementById("title_or_countryname").innerHTML = "";

        graphs.style.display = 'none'
        instructions.style.display = 'block';
        removeoldSunburst()

        //graphs.style.display = 'none';

    // Prints the graphs corresponding to the selected countries
    } else {
        document.getElementById("title_or_countryname").innerHTML = countryNames[FirstSelectedCountry];

        // instructions.style.display = 'none';
        graphs.style.display = 'block';
        instructions.style.display = 'none';

        //printCountryList();
        selectfromcountrylist = document.getElementById("selectfromcountrylist");

        selectfromcountrylist.innerHTML = ""; 

        if (selectedCountries.length !== 0) {
            for(var i = 0; i < selectedCountries.length; i++) {
                var opt = selectedCountries[i];

                var el = document.createElement("option");
                el.text = countryNames[opt];
                el.value = opt;

                selectfromcountrylist.add(el)
            }
        }

        // $('#selectfromcountrylist').empty();
        // $.each(selectedCountries, function(i, p) {
        // $('#selectfromcountrylist').append($('<option></option>').val(p).html(p));
        // });
    }
}

// adapted from https://getbutterfly.com/generate-html-list-from-javascript-array/
// Prints the country list inside the barplot div NOT WORKING YET
function printCountryList() {

    // Start with a clean list element
    var listElement = document.getElementById('selected-countries-list');
    listElement.innerHTML = '';

    // Add selected countries to the list
    var numberOfListItems = selectedCountries.length, listItem, i;
    for (i = 0; i < numberOfListItems; ++i) {
        listItem = document.createElement('li');
        listItem.innerHTML = selectedCountries[i];
        listElement.appendChild(listItem);
    }
}

function updateFirstSelectedCountry() {
    nItems = selectedCountries.length;
    FirstSelectedCountry = selectedCountries[0];
}

function selectCountryforSunburst() {
    var e = document.getElementById("selectfromcountrylist");
    FirstSelectedCountry = e.value;

    document.getElementById("title_or_countryname").innerHTML = countryNames[FirstSelectedCountry];

    updateSunburst(selectedYear, FirstSelectedCountry);

    selectedBudget = "Total expenditures"
    updateBarchart(selectedCountries, selectedBudget);
}