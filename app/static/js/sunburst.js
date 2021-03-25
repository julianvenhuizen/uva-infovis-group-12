function updateSunburst(year, country) {
    var sunburst_year_data_country = sunburst_data[year][country];
    var sunburst_year_data_country = {"rootnode":sunburst_year_data_country};
    console.log(sunburst_year_data_country)
    
    // Hardcode fake data for EU Country
    var nodeData = {
        "name": "Belgium", "children": [{
            "name": "Smart and inclusive growth",
            "children": [{"name": "Competitiveness for growth and jobs", "children": [{"name": "Large infrastructure projects", "size":1830}, 
                                                                                    {"name":"Nuclear decommissioning assistance programmes", "size":165},
                                                                                    {"name":"Common Strategic Framework (CSF) Research and Innovation", "children":[
                                                                                        {"name":"Framework Programme for Research and Innovation", "size":7414},
                                                                                        {"name":"Euratom Research and Training Programme", "size":228.4}]}],
                                                                                    }, 
                                                                                    {"name": "Programme for the Competitiveness of Enterprises and small and medium-sized enterprises", "size": 237},
                                                                                    {"name": "The Union Programme for Education, Training, Youth and Sport", "size":1510},
                                                                                    {"name":"European Union Programme for Employment and Social Innovation", "size":83.7},
                                                                                    {"name":"Action Programmes for customs, for taxation and for anti-fraud in the European Union", "size":95},
                                                                                    {"name": "Connecting Europe Facility (CEF)", "children":[
                                                                                        {"name":"Energy", "size":11.4},
                                                                                        {"name":"Transport", "size":813.8},
                                                                                        {"name": "ICT", "size":5.9}]},
                                                                                    {"name": "Energy projects to aid economic recovery (EERP)", "size":239.1},
                                                                                    {"name": "Decentralised agencies", "size":249.3},
                                                                                    {"name":"Other actions and programmes", "size":315.6},
                                                                                    {"name":"Pilot projects and preparatory actions", "size":18.4},
                                                                                    {"name":"Actions financed under the prerogatives of the Commission and specific competences conferred to the Commission", "size":115.9}]
        }, {
            "name": "SUSTAINABLE GROWTH: NATURAL RESOURCES", "children":[
                {"name": "European Agricultural Guarantee Fund (EAGF)", "size": 44288.10},
                {"name": "European Agricultural Fund for Rural Development (EAFRD)", "size":11190},
                {"name": "European Maritime and Fisheries Fund (EMFF)", "children":[
                    {"name": "European Maritime and Fisheries Fund (EMFF)", "size":683.6},
                    {"name": "Regional Fisheries Management Organisations (RFMOs) and Sustainable Fisheries Agreements (SFAs)", "size":73.5}]},
                {"name": "Programme for the Environment and Climate Action (LIFE+)", "size": 270.4},
                {"name": "Decentralised agencies", "size":58.7},
                {"name": "Pilot projects and preparatory actions", "size": 17.1},
                {"name": "Actions financed under the prerogatives of the Commission and specific competences conferred to the Commission", "size":3}]
        }, {
            "name": "SECURITY AND CITIZENSHIP",
            "children": [
                {"name": "Asylum, Migration and Integration Fund", "size": 186},
                {"name": "Internal Security Fund", "size":241.4},
                {"name": "IT Systems", "size": 31.7},
                {"name": "Justice Programme", "size": 40.1},
                {"name": "Rights, Equality and Citizenship programme", "size": 46.8},
                {"name": "Union Civil Protection Mechanism", "size": 28.4},
                {"name": "Europe for Citizens", "size": 26.4},
                {"name": "Food and feed", "size": 219},
                {"name": "Union action in the field of health (Health Programme)", "size": 48.1},
                {"name": "Other Programmes", "children":[
                    {"name": "Consumer Programme", "size": 19.7},
                    {"name": "Creative Europe Programme", "size":192}]},
                {"name":"Decentralised agencies", "size": 476.2},
                {"name": "Other actions and programmes", "size": 0.6},
                {"name": "Pilot projects and preparatory actions", "size":11.4},
                {"name": "Actions financed under the prerogatives of the Commission and specific competences conferred to the Commission", "size":170.2}]
        }, {
            "name": "GLOBAL EUROPE", 
            "children": [
                {"name": "Instrument for Pre-accession Assistance (IPA)", "size": 1314.60},
                {"name": "Other", "size": 5891.20}
            ]
        }, {
            "name": "ADMINISTRATION", "size": 8891.30
        }, {
            "name": "COMPENSATIONS", "size": 28.6
        }, {
            "name": "NEGATIVE RESERVE", "size": 0
        }, {
            "name": "SPECIAL INSTRUMENTS", "size": 464.9
        }]
    };
    
    
    
    // Variables
    var width = 350;
    var height = 350;
    var radius = Math.min(width, height) / 2;
    var color = d3.scaleOrdinal(d3.schemeCategory20b);

    // Create primary <g> element
    var g = d3.select('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // Data strucure
    var partition = d3.partition()
        .size([2 * Math.PI, radius]);

    // Find data root
    var root = d3.hierarchy(nodeData)
        .sum(function (d) { return d.size});

    // Size arcs
    partition(root);
    var arc = d3.arc()
        .startAngle(function (d) { return d.x0 })
        .endAngle(function (d) { return d.x1 })
        .innerRadius(function (d) { return d.y0 })
        .outerRadius(function (d) { return d.y1 });

    // Put it all together
    g.selectAll('path')
        .data(root.descendants())
        .enter().append('path')
        .attr("display", function (d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style('stroke', '#fff')
        .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });
    
}
