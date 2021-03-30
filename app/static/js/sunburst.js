var abbrev = {
    'ADMINISTRATION':'Administration',
    'SMART AND INCLUSIVE GROWTH':'Growth',
    'Competitiveness for growth and jobs':'Competitiveness',
    'Large infratsructure projects':'Infrastructure',
    'Implementation and exploitation of European satellite navigation systems (EGNOS and GALILEO)':'EGNOS/GALILEO',
    'International Thermonuclear Experimental Reactor (ITER)':'ITER',
    'European Earth Observation Programme (Copernicus)':'EU Earth Observation',
    'Nuclear decommissioning assistance programmes':'Nuclear Decommissioning',
    'Common Strategic Framework (CSF) Research and Innovation':'Research & Innovation',
    'The Framework Programme for Research and Innovation (Horizon 2020)':'Horizon 2020',
    'Euratom Research and Training Programme':'Euratom',
    'Programme for the Competitiveness of Enterprises and small and medium-sized enterprises (COSME)':'COSME',
    'The Union Programme for Education, Training, Youth and Sport (Erasmus+)':'Erasmus+',
    'European Union Programme for Employment and Social Innovation (EaSI)':'EaSI',
    'Action Programmes for customs, for taxation and for anti-fraud in the European Union (Customs 2020, Fiscalis 2020 and Anti-Fraud)':'Customs & Taxation',
    'Connecting Europe Facility (CEF)':'CEF',
    'Energy':'Energy',
    'Transport':'Transport',
    'Informations and Communications Technology (ICT)':'ICT',
    'Energy projects to aid economic recovery (EERP)':'EERP',
    'Decentralised agencies':'Decentralised agencies',
    'Other actions and programmes':'Other',
    'Pilot projects and preparatory actions':'Pilot project',
    'Actions financed under the prerogatives of the Commission and specific competences conferred to the Commission':'European Commission',
    'Economic, social and territorial cohesion':'Economic cohesion',
    'Investment for growth and jobs':'Growth investment',
    'Less developed regions (Regional convergence)':'Less developed regions',
    'Transition regions':'Transition regions',
    'More developed regions (Competitiveness)':'More developed regions',
    'Outermost and sparsely populated regions':'Sparsely populated regions',
    'Cohesion fund (including contribution to the Connecting Europe Facility CEF)':'Cohesion fund',
    'European territorial cooperation':'Territorial cooperation',
    'Technical assistance and innovative actions':'Other assistance',
    'Technical assistance':'Technical assistance',
    'Innovative actions':'Innovative actions',
    'Fund for European Aid to the Most Deprived':'European aid',
    'Youth Employment Initiative (specific top-up allocation)':'Youth employment',
    'Decentralised agencies':'Decentralised agencies',
    'Other actions and programmes':'Other',
    'Actions financed under the prerogatives of the Commission and specific competences conferred to the Commission':'European Commission',
    'SUSTAINABLE GROWTH: NATURAL RESOURCES':'Natural Resources',
    'European Agricultural Guarantee Fund (EAGF) - Market related expenditure and direct payments':'EU Agricultural Fund',
    'European Agricultural Guarantee Fund (EAGF) - Market related expenditure and direct payments':'EAGF',
    'Direct aid':'Direct aid',
    'Export refunds':'Export refunds',
    'Storage':'Storage',
    'Other':'Other',
    'European Agricultural Fund for Rural Development (EAFRD)':'EAFRD',
    'European Maritime and Fisheries Fund (EMFF), Regional Fisheries Management Organisations (RFMOs) and Sustainable Fisheries Agreements (SFAs)':'Fishery',
    'Programme for the Environment and Climate Action (LIFE+)':'Climate (LIFE+)',
    'Decentralised agencies':'Decentralised agencies',
    'Pilot projects and preparatory actions':'Pilot projects',
    'SECURITY AND CITIZENSHIP':'Security & Citizenship',
    'Asylum, Migration and Integration Fund':'Immigration',
    'Internal Security Fund':'Internal Security',
    'IT Systems':'IT Systems',
    'Justice Programme':'Justice Programme',
    'Rights, Equality and Citizenship programme':'Rights & Equality',
    'Union Civil Protection Mechanism - Heading 3':'Civil protection',
    'Europe for Citizens':'Europe for Citizens',
    'Food and feed':'Food & feed',
    'Union action in the field of health (Health Programme)':'Health Programme',
    'Consumer programme':'Consumer Programme',
    'GLOBAL EUROPE':'Global Europe',
    'Instrument for Pre-accession Assistance (IPA)':'IPA',
    'other':'Other',
    'COMPENSATIONS':'Compensations',
    'NEGATIVE RESERVE':'Negative Reserve',
    'SPECIAL INSTRUMENTS':'Special Instruments',
    'Total Expenditure':'Total Expenditure',
    'European Maritime and Fisheries Fund (EMFF)':'EMFF',
    'Instrument for Emergency Support within the Union (IES)':'Emergency Support',
    'Creative Europe Programme':'Creative Programme',
    'Sustainable Fisheries Partnership Agreements (SFAs) and compulsory contributions to Regional Fisheries':'Sustainable Agreements'
}


const format = d3.format(",d");
    const width = 360;
    const radius = width / 6;

function updateSunburst(year, country) {
  removeoldSunburst();
  createNewSunburst(year, country);
}

function removeoldSunburst() {
    d3.select("#sunburst")
        .remove();
}

function createNewSunburst(year, country) {
    var sunburst_year_data_country = sunburst_data[year][country];
    //console.log(sunburst_year_data_country);

    const arc = d3.arc()
            .startAngle(d => d.x0)
            .endAngle(d => d.x1)
            .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
            .padRadius(radius * 1.5)
            .innerRadius(d => d.y0 * radius)
            .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1));
    
    const partition = data => {
        const root = d3.hierarchy(data)
                .sum(d => d.size)
                .sort((a, b) => b.value - a.value);
        return d3.partition()
                .size([2 * Math.PI, root.height + 1])
                (root);
    }
    
    const {require} = new observablehq.Library;

    require()('@observablehq/flare').then(data => {
        //console.log(data);
        const root = partition(sunburst_year_data_country);
        // const color = d3.scaleOrdinal().range(d3.quantize(d3.interpolateRainbow, data.children.length));

        const dark = [
          '#B03A2E',
          '#2874A6',
          '#148F77',
          '#B9770E',
          '#884EA0'
        ];
        
        const mid = [
          '#E74C3C',
          '#3498DB',
          '#1ABC9C',
          '#F39C12',
          '#AF7AC5'
        ];
        
        const light = [
          '#F1948A',
          '#85C1E9',
          '#76D7C4',
          '#F8C471',
          '#D7BDE2'
        ];
        
        const lightest = [
          '#FADBD8',
          '#D6EAF8',
          '#D1F2EB',
          '#FDEBD0',
          '#EBDEF0'
        ];

        const palettes = [dark, mid, light, lightest];
        const lightGreenFirstPalette = palettes
          .map(d => d)
          .reduce((a, b) => a.concat(b));
        
        const color = d3.scaleOrdinal(lightGreenFirstPalette);

        root.each(d => d.current = d);
    
        const svg = d3.select('#partitionSVG')
                .style("width", "100%")
                .style("height", "auto")
                .style("font", "6px sans-serif");
    
        const g = svg.append("g")
                .attr("id", 'sunburst')
                .attr("transform", `translate(${width / 2},${width / 2})`);
    
        const path = g.append("g")
                .selectAll("path")
                .data(root.descendants().slice(1))
                .join("path")
                .attr("fill", d => {
                    while (d.depth > 1)
                        d = d.parent;
                    return color(d.data.name);
                })
                .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
                .attr("d", d => arc(d.current));
    
        path.filter(d => d.children)
                .style("cursor", "pointer")
                .on("click", clicked);
    
        path.append("title")
                .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
    
        const label = g.append("g")
                .attr("pointer-events", "none")
                .attr("text-anchor", "middle")
                .style("user-select", "none")
                .selectAll("text")
                .data(root.descendants().slice(1))
                .join("text")
                .attr("dy", "0.35em")
                .attr("fill-opacity", d => +labelVisible(d.current))
                .attr("transform", d => labelTransform(d.current))
                .text(d => abbrev[d.data.name]);
                
        const parent = g.append("circle")
                .datum(root)
                .attr("r", radius)
                .attr("fill", "none")
                .attr("pointer-events", "all")
                .on("click", clicked);
    
        function clicked(p) {
            // Change selected budget if we select a sub-category of budgets
            if (p.data.name !== countryNames[FirstSelectedCountry]) {
                selectedBudget = p.data.name
            }
            else {
                selectedBudget = "SUSTAINABLE GROWTH: NATURAL RESOURCES"
            }

            // Update barchart with budget selected in sunburst
            updateBarchart(selectedCountries, selectedBudget)

            parent.datum(p.parent || root);
    
            root.each(d => d.target = {
                    x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                    x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
                    y0: Math.max(0, d.y0 - p.depth),
                    y1: Math.max(0, d.y1 - p.depth)
                });
    
            const t = g.transition().duration(750);
    
            // Transition the data on all arcs, even the ones that aren’t visible,
            // so that if this transition is interrupted, entering arcs will start
            // the next transition from the desired position.
            path.transition(t)
                    .tween("data", d => {
                        const i = d3.interpolate(d.current, d.target);
                        return t => d.current = i(t);
                    })
                    .filter(function (d) {
                        return +this.getAttribute("fill-opacity") || arcVisible(d.target);
                    })
                    .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
                    .attrTween("d", d => () => arc(d.current));
    
            label.filter(function (d) {
                return +this.getAttribute("fill-opacity") || labelVisible(d.target);
            }).transition(t)
                    .attr("fill-opacity", d => +labelVisible(d.target))
                    .attrTween("transform", d => () => labelTransform(d.current));
        }
    
        function arcVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
        }
    
        function labelVisible(d) {
            return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
        }
    
        function labelTransform(d) {
            const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
            const y = (d.y0 + d.y1) / 2 * radius;
            return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
        }
    });
}