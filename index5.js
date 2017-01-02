(function(){
    const margin = {
        top: 50,
        left: 80,
        bottom: 60,
        right: 50,
    }

    const width = 800 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const fullWidth = width + margin.left + margin.right;
    const fullHeight = height + margin.top + margin.bottom;

    const svg = d3.select("#chart5")
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .call(responsivefy)
        .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

    fetch('http://api.population.io:80/1.0/population/2016/aged/18/',{
        method: 'get'
    })
    .then(resp => resp.json())
    .then(data => buildChart(data));

    const buildChart = respData => {
        const data = respData
            .filter(d => d.total > 1500000)
            .filter(d => d.country !== 'World');

        const yScale = d3.scaleLinear()
            .domain(d3.extent(data, d => d.total))
            .range([height, 0]);

        const yAxis = d3.axisLeft(yScale).ticks(5);
        svg.call(yAxis);

        const xScale = d3.scaleBand()
            .padding(1)
            .domain(data.map(d => d.country))
            .range([0, width]);

        const xAxis = d3.axisBottom(xScale)
            .ticks(5);

        svg.append('g')
                .attr('transform', `translate(0, ${height})`)
            .call(xAxis)
            .selectAll('text');

        const rScale = d3.scaleSqrt()
            .domain([0, d3.max(data, d => d.total)])
            .range([0, 100]);

        const circles = svg.selectAll('.country')
            .data(data)
            .enter()
            .append('g')
                .attr('class', 'country')
                .attr('transform', d => `translate(${xScale(d.country)}, ${yScale(d.total)})`)



        circles
            .append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', d => rScale(d.total))
            .attr('fill-opacity', 0.5)
            .style('fill', 'steelblue');

        circles
            .append('text')
            .style('text-anchor', 'middle')
            .style('fill', 'black')
            .attr('y', 4)
            .text(d => d.total);

        circles
            .append('text')
            .style('text-anchor', 'middle')
            .style('fill', 'black')
            .attr('y', -8)
            .text(d => d.country);
    }

}())
