// Barchart d3 code


// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 10, left: 30},
    width = 420 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;



function updateBarchart(selectedCountries, selectedBudget) {

  removeOldChart();
  createNewChart(selectedCountries, selectedBudget);
}

function removeOldChart() {
    d3.select("#barplot")
        .remove();
}

// Parse the Data interactively (called in europamap.js)
function createNewChart(selectedCountries, selectedBudget) {

  d3.select("#barplot_container")
    .append("barplot")
      .attr("id", "barplot")

  // append the svg object to the body of the page
  var svg = d3.select("#barplot")
    .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");


  var alldata = 
  
  {"Total": [{"Year": "2014", "NL": "1", "DE": "0", "BE": "5", "FR": "6"}, 
  {"Year": "2015", "NL": "2", "DE": "0", "BE": "5", "FR": "5"}, 
  {"Year": "2016", "NL": "3", "DE": "0", "BE": "5", "FR": "4"}, 
  {"Year": "2017", "NL": "4", "DE": "0", "BE": "5", "FR": "3"}, 
  {"Year": "2018", "NL": "5", "DE": "0", "BE": "5", "FR": "2"}, 
  {"Year": "2019", "NL": "6", "DE": "0", "BE": "5", "FR": "1"}],
  "Coffee money": [{"Year": "2014", "The Netherlands": "2", "DE": "0", "BE": "4", "FR": "9"}, 
  {"Year": "2015", "NL": "2", "DE": "0", "BE": "4", "FR": "4"}, 
  {"Year": "2016", "NL": "2", "DE": "0", "BE": "4", "FR": "6"}, 
  {"Year": "2017", "NL": "2", "DE": "0", "BE": "4", "FR": "3"}, 
  {"Year": "2018", "NL": "2", "DE": "0", "BE": "5", "FR": "2"}, 
  {"Year": "2019", "NL": "2", "DE": "0", "BE": "5", "FR": "5"}]
  };

  // The selected (part of the) budget
  var barchartdata = alldata[selectedBudget];

  // List of subgroups
  var subgroups = selectedCountries
  //var subgroups = ["The Netherlands", "Belgium", "France"];

  // List of groups -> I show them on the X axis
  var groups = d3.map(barchartdata, function(d){return(d.Year)}).keys()

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, width])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 100]) // !!! this needs to be changed for higher values to be shown !!!
    .range([ height, 0 ]);
  svg.append("g")
    .call(d3.axisLeft(y));

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#e41a1c','#377eb8','#4daf4a'])

  // Show the bars
  svg.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(barchartdata)
    .enter()
    .append("g")
      .attr("transform", function(d) { return "translate(" + x(d.Year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
      .attr("x", function(d) { return xSubgroup(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return height - y(d.value); })
      .attr("fill", function(d) { return color(d.key); });


    // Add legend

    var legendX = width * .75
    
    // Add one dot in the legend for each name.
    svg.selectAll("mydots")
      .data(subgroups)
      .enter()
      .append("circle")
        .attr("cx", legendX)
        .attr("cy", function(d,i){ return 10 + i*20}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("r", 7)
        .style("fill", function(d){ return color(d)})

    // Add one dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(subgroups)
      .enter()
      .append("text")
        .attr("x", legendX + 20)
        .attr("y", function(d,i){ return 10 + i*20}) // 100 is where the first dot appears. 25 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size", "13px")

};