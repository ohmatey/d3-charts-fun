(function(){
    const margin = {
        top: 10,
        right: 20,
        bottom: 30,
        left: 30
    };
    const width = 400 - margin.left - margin.right;
    const height = 565 - margin.top - margin.bottom;

    const svg = d3.select('#chart8')
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .call(responsivefy)
        .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const parseTime = d3.timeParse('%Y/%m/%d');

    d3.json('./circleData.json', function (err, data) {
        if(err){
            console.log(err)
        }

        var xScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, width]);

        svg.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(xScale));

        var yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([height, 0]);

        svg.append('g')
            .call(d3.axisLeft(yScale));

        svg.selectAll('.circle')
            .data(data)
            .enter()
            .append('circle')
                .attr('class', 'circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y))
                .attr('r', d => d.r)
                .style('stroke', '#FF9900')
                .style('stroke-width', 2)
                .style('fill', '#FF9900')
                .style('fill-opacity', 0.5);

        const t = d3.transition()
            .delay(100)
            .duration(100);

        d3.selectAll('.circle')
            .transition(t)
            .style('fill', "#FFFF");
    });

}())
