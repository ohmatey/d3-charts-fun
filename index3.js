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

    const svg = d3.select("#chart3")
        .append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .call(responsivefy)
        .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`)

    svg.append('rect')
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'lightgreen')
        .style('stroke', 'blue');

    const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);

    const yAxis = d3.axisLeft(yScale).ticks(5);
    svg.call(yAxis);

    const xScale = d3.scaleTime()
        .domain([new Date(Date.now()), new Date(2017, 0, 1, 9)])
        .range([0, width]);

    const xAxis = d3.axisBottom(xScale)
        .ticks(5)
        .tickPadding(15);

    svg.append('g')
            .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

        function responsivefy(svg) {
          // get container + svg aspect ratio
          var container = d3.select(svg.node().parentNode),
              width = parseInt(svg.style("width")),
              height = parseInt(svg.style("height")),
              aspect = width / height;

          // add viewBox and preserveAspectRatio properties,
          // and call resize so that svg resizes on inital page load
          svg.attr("viewBox", "0 0 " + width + " " + height)
              .attr("preserveAspectRatio", "xMinYMid")
              .call(resize);

          // to register multiple listeners for same event type,
          // you need to add namespace, i.e., 'click.foo'
          // necessary if you call invoke this function for multiple svgs
          // api docs: https://github.com/mbostock/d3/wiki/Selections#on
          d3.select(window).on("resize." + container.attr("id"), resize);

          // get width of container and resize svg to fit it
          function resize() {
              var targetWidth = parseInt(container.style("width"));
              svg.attr("width", targetWidth);
              svg.attr("height", Math.round(targetWidth / aspect));
          }
        }

}())
