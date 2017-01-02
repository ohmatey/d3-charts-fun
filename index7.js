(function(){
    const margin = {
        top: 10,
        right: 20,
        bottom: 30,
        left: 30
    };
    const width = 400 - margin.left - margin.right;
    const height = 565 - margin.top - margin.bottom;

    const svg = d3.select('#chart7')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const parseTime = d3.timeParse('%Y/%m/%d');

    d3.json('./data.json', function (err, data) {

        data.forEach(company => {
            company.values.forEach(d => {
                d.date = parseTime(d.date);
                d.close = +d.close;
            });
        });

        var xScale = d3.scaleTime()
            .domain([
                d3.min(data, co => d3.min(co.values, d => d.date)),
                d3.max(data, co => d3.max(co.values, d => d.date))
            ])
            .range([0, width]);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale).ticks(5));

        var yScale = d3.scaleLinear()
            .domain([
                d3.min(data, co => d3.min(co.values, d => d.close)),
                d3.max(data, co => d3.max(co.values, d => d.close))
            ])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(yScale));

        var area = d3.area()
            .x(d => xScale(d.date))
            .y0(yScale(yScale.domain()[0]))
            .y1(d => yScale(d.close))
            .curve(d3.curveCatmullRom.alpha(0.5));

        svg
            .selectAll('.area')
            .data(data)
            .enter()
            .append('path')
                .attr('class', 'area')
                .attr('d', d => area(d.values))
                .style('stroke', (d, i) => ['#FF9900', '#3369E8'][i])
                .style('stroke-width', 2)
                .style('fill', (d, i) => ['#FF9900', '#3369E8'][i])
                .style('fill-opacity', 0.5);

    });

}())
