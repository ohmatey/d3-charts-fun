(function(){
    const bar = d3.select("#chart2")
        .append('svg')
        .attr('height', 200)
        .selectAll('g')
        .data(scores)
        .enter()
            .append('g')
            .attr("transform", (d, i) => `translate(0, ${i * 33})`);

    bar.append('rect')
        .style("width", d => d.score * 10)
        .attr("class", "bar")
        .on('mouseover', function(){
            d3.select(this).style('fill', "blue")
        });

    bar.append('text')
        .attr('y', 20)
        .text(d => d.name);

}())
