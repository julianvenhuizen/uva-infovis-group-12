var selectedCountries = [];

// Displays instructions when no country is selected and otherwise the graphs
function updateLeftColumn() {
    var instructions = document.getElementById("instructions-panel");
    var graphs = document.getElementById("graphs-panel");

    if (selectedCountries.length === 0) {
        console.log("Array is empty!")

        instructions.style.display = 'block';
        graphs.style.display = 'none';
    } else {
        console.log(selectedCountries);

        instructions.style.display = 'none';
        graphs.style.display = 'block';
    }
}

// adapted from https://getbutterfly.com/generate-html-list-from-javascript-array/
// Prints the country list inside the barplot div NOT WORKING YET
function printCountryList() {

    listContainer = document.createElement('div'),
    listElement = document.createElement('ul'),
    numberOfListItems = selectedCountries.length, listItem, i;

    // Add it to the page
    document.getElementById('barplot').appendChild(listContainer);
    listContainer.appendChild(listElement);

    for (i = 0; i < numberOfListItems; ++i) {
        // create an item for each one
        listItem = document.createElement('li');

        // Add the item text
        listItem.innerHTML = selectedCountries[i];

        // Add listItem to the listElement
        listElement.appendChild(listItem);
    }
}