// Barchart d3 code


// set the dimensions and margins of the graph
var margin = {top: 55, right: 20, bottom: 28, left: 60},
    bpwidth = document.getElementById('barplot-box').clientWidth - margin.left - margin.right,
    bpheight = document.getElementById('barplot-box').clientHeight - margin.top - margin.bottom;

var prevhighestnumber = 0;


function updateBarchart(selectedCountries, selectedBudget) {
  //console.log(prevhighestnumber);
  // if (typeof prevhighestnumber === 'undefined') {
  //   var prevhighestnumber = 0; // the variable is defined
  // }

  removeOldChart();
  createNewChart(selectedCountries, selectedBudget);
}

function removeOldChart() {
    d3.select("#barplot")
        .remove();
}

// Parse the Data interactively (called in europamap.js)
function createNewChart(selectedCountries, selectedBudget) {

  d3.select("#barplot-box")
    .append("barplot")
      .attr("id", "barplot")

  // append the svg object to the body of the page
  var svg = d3.select("#barplot")
    .append("svg")
      .attr("width", bpwidth + margin.left + margin.right)
      .attr("height", bpheight + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // The selected (part of the) budget
  var barchartdata = barplot_data[selectedBudget];

  // List of subgroups
  var subgroups = selectedCountries;

  // List of groups -> I show them on the X axis
  var groups = d3.map(barchartdata, function(d){return(d.Year)}).keys()

  // text label for the x axis
  svg.append("text")             
      .attr("transform",
            "translate(" + (bpwidth/2) + " ," + 
                           (bpheight + 28) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Year");

  // text label for the y axis
  svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left)
      .attr("x",0 - (bpheight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .style("font-size", "13px")
      .text("Budget (in millions of euros)");

  svg.append("text")             
      .attr("transform",
            "translate(" + (bpwidth/2 - margin.left / 2) + " ," + 
                           (-35) + ")")
      .style("text-anchor", "middle")
      .style("font-size", "14px")
      .text(selectedBudget);

  // Add X axis
  var x = d3.scaleBand()
      .domain(groups)
      .range([0, bpwidth])
      .padding([0.2])
  svg.append("g")
    .attr("transform", "translate(0," + bpheight + ")")
    .call(d3.axisBottom(x).tickSize(0));

  // Calculate highest value for y-axis
  highestnums = []
  for (i = 0; i < subgroups.length; i++) {
    var thiscountry = subgroups[i];
    highestnums.push(d3.max(barchartdata, function(d){return(d[thiscountry])}));
  };
  var highestnumber = d3.max(highestnums) * 1.1;

  // Initiate y-axis with highest number from previous barchart
  var y = d3.scaleLinear()
    .range([ bpheight, 0])
    .domain([0, prevhighestnumber]);
  var yAxis = svg.append("g")
    .attr("class", "myYaxis")
    .call(d3.axisLeft(y));

  // Update the Y axis with animation
  y.domain([0, highestnumber]);
  yAxis.transition().duration(500).call(d3.axisLeft(y));
  
  // Update prevhighestnumber for animating y-axis in next barchart
  prevhighestnumber = highestnumber;

  // Another scale for subgroup position?
  var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

  // color palette = one color per subgroup
  var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#fc8d62', '#66c2a5', '#e78ac3'])

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    console.log(d)
    return "<strong>Budget: </strong>" + selectedBudget + "<br><strong>Country: </strong>" + countryNames[d.key] + "<br><strong>Budget: </strong>" + d.value + " million euro";
  });
  
  svg.call(tip);

  // Show the bars (start at 0 height for animation)
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
      .attr("y", function(d) { return y(0); })
      .attr("width", xSubgroup.bandwidth())
      .attr("height", function(d) { return bpheight - y(0); })
      .attr("fill", function(d) { return color(d.key); })
      .on("mouseover", tip.show)
      .on("mouseout", tip.hide)
      .transition()
      .duration(200)
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return bpheight - y(d.value); })
      ;


    // Add legend

    var legendX = bpwidth * .925
    
    // Add one dot in the legend for each name.
    svg.selectAll("mydots")
      .data(subgroups)
      .enter()
      .append("circle")
        .attr("cx", legendX)
        .attr("cy", function(d,i){ return 35 - margin.top + i*17}) // 35 is where the first dot appears. 17 is the distance between dots
        .attr("r", 6)
        .style("fill", function(d){ return color(d)})

    // Add one label next to the dot in the legend for each name.
    svg.selectAll("mylabels")
      .data(subgroups)
      .enter()
      .append("text")
        .attr("x", legendX + 10)
        .attr("y", function(d,i){ return 35 - margin.top + i*17}) // 35 is where the first dot appears. 17 is the distance between dots
        .style("fill", function(d){ return color(d)})
        .text(function(d){ return d})
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .style("font-size", "12px")

};