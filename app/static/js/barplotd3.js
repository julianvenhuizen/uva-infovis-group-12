// // set the dimensions and margins of the graph
// var margin = {top: 30, right: 30, bottom: 70, left: 60},
//     width = 460 - margin.left - margin.right,
//     height = 400 - margin.top - margin.bottom;

// // append the svg object to the body of the page
// var svg = d3.select("#barplot")
//   .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//   .append("g")
//     .attr("transform",
//           "translate(" + margin.left + "," + margin.top + ")");

// // Parse the Data
// d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/7_OneCatOneNum_header.csv", function(data) {

// console.log(data)

// var testdata = [{"Year": "2014", "Value": "1"}, {"Year": "2015", "Value": "2"}, {"Year": "2016", "Value": "3"}, {"Year": "2017", "Value": "4"}, {"Year": "2018", "Value": "5"}, {"Year": "2019", "Value": "6"}]
// console.log(testdata)


// // X axis
// var x = d3.scaleBand()
//   .range([ 0, width ])
//   .domain(testdata.map(function(d) { return d.Year; }))
//   .padding(0.2);
// svg.append("g")
//   .attr("transform", "translate(0," + height + ")")
//   .call(d3.axisBottom(x))
//   .selectAll("text")
//     .attr("transform", "translate(-10,0)rotate(-45)")
//     .style("text-anchor", "end");

// // Add Y axis
// var y = d3.scaleLinear()
//   .domain([0, 10])
//   .range([ height, 0]);
// svg.append("g")
//   .call(d3.axisLeft(y));

// // Bars
// svg.selectAll("mybar")
//   .data(testdata)
//   .enter()
//   .append("rect")
//     .attr("x", function(d) { return x(d.Year); })
//     .attr("y", function(d) { return y(d.Value); })
//     .attr("width", x.bandwidth())
//     .attr("height", function(d) { return height - y(d.Value); })
//     .attr("fill", "#69b3a2")

// })



// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 10, left: 30},
    width = 420 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#barplot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Parse the Data
function updateBarchart() {

  var testdata = [
  {"Year": "2014", "The Netherlands": "1", "Belgium": "5", "France": "6"}, 
  {"Year": "2015", "The Netherlands": "2", "Belgium": "5", "France": "5"}, 
  {"Year": "2016", "The Netherlands": "3", "Belgium": "5", "France": "4"}, 
  {"Year": "2017", "The Netherlands": "4", "Belgium": "5", "France": "3"}, 
  {"Year": "2018", "The Netherlands": "5", "Belgium": "5", "France": "2"}, 
  {"Year": "2019", "The Netherlands": "6", "Belgium": "5", "France": "1"}]

  //console.log(testdata)

  // List of subgroups
  var subgroups = ["The Netherlands", "Belgium", "France"]

  //console.log(subgroups)

  // List of groups -> I show them on the X axis
  var groups = d3.map(testdata, function(d){return(d.Year)}).keys()

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
    .domain([0, 10]) // !!! this needs to be changed for higher values to be shown !!!
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
    .data(testdata)
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