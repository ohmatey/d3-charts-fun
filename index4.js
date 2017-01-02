(function(){
    const margin = {
        top: 10,
        left: 50,
        bottom: 60,
        right: 0,
    }

    const width = 425 - margin.left - margin.right;
    const height = 625 - margin.top - margin.bottom;

    const fullWidth = width + margin.left + margin.right;
    const fullHeight = height + margin.top + margin.bottom;

    const svg = d3.select("#chart4")
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .call(responsivefy)
        .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)



    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.call(yAxis);

    const xScale = d3.scaleBand()
        .padding(0.2)
        .domain(scores.map(d => d.name))
        .range([0, width]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickPadding(15);

    svg.append('g')
            .attr('transform', `translate(0, ${height})`)
        .call(xAxis)
        .selectAll('text')
            .style('text-anchor', 'end')
            .attr('transform', 'rotate(-45)');

    svg.selectAll('rect')
        .data(scores)
        .enter()
        .append('rect')
            .attr('x', d => xScale(d.name))
            .attr('y', d => yScale(d.score))
            .attr('width', d => xScale.bandwidth())
            .attr('height', d => height - yScale(d.score))
            .attr('fill', 'blue');
}())
