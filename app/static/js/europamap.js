var selectedCountry = [];

function changeColor(country) {
    if (!selectedCountry.includes(country)) {
        country.style.fill = "#E9860F";
        selectedCountry = selectedCountry.concat(country);
        console.log(selectedCountry);
    }
    else {
        country.style.fill = "blue";
        selectedCountry = arrayRemove(selectedCountry, country);
    }

}

function arrayRemove(arr, value) {
    return arr.filter(function(ele) {
        return ele != value;
    })
};


// console.log({{data|tojson}});