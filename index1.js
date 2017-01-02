const scores = [
    {
        name: "bob",
        score: 1
    },
    {
        name: "jonn",
        score: 24
    },
    {
        name: "a-aron",
        score: 12
    },
    {
        name: "james",
        score: 5
    },
    {
        name: "boob",
        score: 8
    },
];

(function(){
    const update = d3.select('#chart1')
        .selectAll('div')
        .data(scores, d => d ? d.name : this.innerText)
        .style("color", "green");

    const enter = update.enter()
        .append('div')
        .text(d => d.name)
        .style('color', 'blue');

    update.exit().remove();

    update.merge(enter)
        .style("width", d => (d.score * 10) + "px")
        .style("height", "50px")
        .style("background", "lightblue")

}())
