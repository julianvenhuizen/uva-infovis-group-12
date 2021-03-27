function updateSunburst(year, country) {
    var sunburst_year_data_country = sunburst_data[year][country];
    console.log(sunburst_year_data_country);

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
    console.log("IM HERE");
    console.log(nodeData);

    // // Variables
    // var width = 350;
    // var height = 350;
    // var radius = Math.min(width, height) / 2;
    // var color = d3.scaleOrdinal(d3.schemeCategory20b);

    // // Create primary <g> element
    // var g = d3.select('svg')
    //     .attr('width', width)
    //     .attr('height', height)
    //     .append('g')
    //     .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    // // Data strucure
    // var partition = d3.partition()
    //     .size([2 * Math.PI, radius]);

    // // Find data root
    // var root = d3.hierarchy(sunburst_year_data_country)
    //     .sum(function (d) { return d.size});

    // // Size arcs
    // partition(root);
    // var arc = d3.arc()
    //     .startAngle(function (d) { return d.x0 })
    //     .endAngle(function (d) { return d.x1 })
    //     .innerRadius(function (d) { return d.y0 })
    //     .outerRadius(function (d) { return d.y1 });

    // // Put it all together
    // g.selectAll('path')
    //     .data(root.descendants())
    //     .enter().append('path')
    //     .attr("display", function (d) { return d.depth ? null : "none"; })
    //     .attr("d", arc)
    //     .style('stroke', '#fff')
    //     .style("fill", function (d) { return color((d.children ? d : d.parent).data.name); });

    const width = 350,
            height = 350,
            maxRadius = (Math.min(width, height) / 2) - 5;

    const formatNumber = d3.format(',d');

    const x = d3.scaleLinear()
        .range([0, 2 * Math.PI])
        .clamp(true);

    const y = d3.scaleSqrt()
        .range([maxRadius*.1, maxRadius]);

    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const partition = d3.partition();

    const arc = d3.arc()
        .startAngle(d => x(d.x0))
        .endAngle(d => x(d.x1))
        .innerRadius(d => Math.max(0, y(d.y0)))
        .outerRadius(d => Math.max(0, y(d.y1)));

    const middleArcLine = d => {
        const halfPi = Math.PI/2;
        const angles = [x(d.x0) - halfPi, x(d.x1) - halfPi];
        const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);

        const middleAngle = (angles[1] + angles[0]) / 2;
        const invertDirection = middleAngle > 0 && middleAngle < Math.PI; // On lower quadrants write text ccw
        if (invertDirection) { angles.reverse(); }

        const path = d3.path();
        path.arc(0, 0, r, angles[0], angles[1], invertDirection);
        return path.toString();
    };

    const textFits = d => {
        const CHAR_SPACE = 5;

        const deltaAngle = x(d.x1) - x(d.x0);
        const r = Math.max(0, (y(d.y0) + y(d.y1)) / 2);
        const perimeter = r * deltaAngle;

        return d.data.name.length * CHAR_SPACE < perimeter;
    };

    const svg = d3.select('body').append('svg')
        .style('width', '100vw')
        .style('height', '100vh')
        .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
        .on('click', () => focusOn()); // Reset zoom on canvas click

    // d3.json('https://gist.githubusercontent.com/mbostock/4348373/raw/85f18ac90409caa5529b32156aa6e71cf985263f/flare.json', (error, root) => {
    //     if (error) throw error;

    root = d3.hierarchy(sunburst_year_data_country);
    root.sum(d => d.size);

    const slice = svg.selectAll('g.slice')
        .data(partition(root).descendants());

    slice.exit().remove();

    const newSlice = slice.enter()
        .append('g').attr('class', 'slice')
        .on('click', d => {
            d3.event.stopPropagation();
            focusOn(d);
        });

    newSlice.append('title')
        .text(d => d.data.name + '\n' + formatNumber(d.value));

    newSlice.append('path')
        .attr('class', 'main-arc')
        .style('fill', d => color((d.children ? d : d.parent).data.name))
        .attr('d', arc);

    newSlice.append('path')
        .attr('class', 'hidden-arc')
        .attr('id', (_, i) => `hiddenArc${i}`)
        .attr('d', middleArcLine);

    const text = newSlice.append('text')
        .attr('display', d => textFits(d) ? null : 'none');

    // Add white contour
    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data.name)
        .style('fill', 'none')
        .style('stroke', '#fff')
        .style('stroke-width', 5)
        .style('stroke-linejoin', 'round');

    text.append('textPath')
        .attr('startOffset','50%')
        .attr('xlink:href', (_, i) => `#hiddenArc${i}` )
        .text(d => d.data.name);


    function focusOn(d = { x0: 0, x1: 1, y0: 0, y1: 1 }) {
        // Reset to top-level if no data point specified

        const transition = svg.transition()
            .duration(750)
            .tween('scale', () => {
                const xd = d3.interpolate(x.domain(), [d.x0, d.x1]),
                    yd = d3.interpolate(y.domain(), [d.y0, 1]);
                return t => { x.domain(xd(t)); y.domain(yd(t)); };
            });

        transition.selectAll('path.main-arc')
            .attrTween('d', d => () => arc(d));

        transition.selectAll('path.hidden-arc')
            .attrTween('d', d => () => middleArcLine(d));

        transition.selectAll('text')
            .attrTween('display', d => () => textFits(d) ? null : 'none');

        moveStackToFront(d);

        //

        function moveStackToFront(elD) {
            svg.selectAll('.slice').filter(d => d === elD)
                .each(function(d) {
                    this.parentNode.appendChild(this);
                    if (d.parent) { moveStackToFront(d.parent); }
                })
        }
    }

}