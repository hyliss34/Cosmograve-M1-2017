

function graphique_creation() {
	chart = d3.select("#graphique_svg");
	wid = chart.width;
	hei = chart.height;
	
	ratio = chart.width / chart.height;
	
	 
    var c = d3.scale.linear().range([0, 680]),
        d = d3.scale.linear().range([390, 0]),
        e = d3.svg.line().x(function(a) {
            return c(a.date)
        }).y(function(a) {
            return d(a.close)
        }),
        b = d3.select("#graphique_svg").style("fill","none").style("font-size", "12px").attr("width",wid).attr("height",hei).append("g").attr("transform", "translate(50,30)"),
        f = d3.svg.axis().scale(c).orient("bottom").ticks(8).tickFormat(d3.format("d")),
        g = d3.svg.axis().scale(d).orient("left").ticks(10);
    data.forEach(function(a) {
        a.date = a.date;
        a.close = +a.close
    });
    c.domain(d3.extent(data, function(a) {
        return a.date
    }));
    d.domain([0, d3.max(data, function(a) {
        return a.close
    })]);
    b.append("g").attr("class", "x axis").attr("transform", "translate(0,390)").style({
        stroke: "black",
        fill: "none",
        "stroke-width": "1px",
        "shape-rendering": "crispEdges"
    }).call(f);
	
    1 == document.getElementById("grille").checked && (b.selectAll("line.x").data(c.ticks(10)).enter().append("line").attr("class",
        "x").attr("x1", c).attr("x2", c).attr("y1", 0).attr("y2", 390).style("stroke", "grey").style("stroke-width", "1").style("shape-rendering", "crispEdges").style("fill", "none"), b.selectAll("line.y").data(d.ticks(8)).enter().append("line").attr("class", "y").attr("x1", 0).attr("x2", 680).attr("y1", d).attr("y2", d).style("stroke", "grey").style("stroke-width", "1").style("shape-rendering", "crispEdges").style("fill", "none"));
    b.append("g").attr("class", "y axis").style({
        stroke: "black",
        fill: "none",
        "stroke-width": "1px",
        "shape-rendering": "crispEdges"
    }).call(g);
    b.append("text").attr("class", "legend_titre").attr("x", 175).attr("y", -15).attr("dy", ".3em").attr("transform", "rotate(0)").style("font-weight", "bold").style("font-size", "1.3em").text("Evolution du facteur d'\u00e9chelle r\u00e9duit").style({
		stroke: "black",
        fill: "black",
        "stroke-width": "0.5px",
        "shape-rendering": "crispEdges"});
    b.append("text").attr("class", "legend_axe").attr("x", 355).attr("y", 415).attr("dy", ".3em").attr("transform", "rotate(0)").style("font-weight", "bold").style("font-size", "1.2em").text("t (Ga)").style({
		stroke: "black",
        fill: "black",
        "stroke-width": "0.5px",
        "shape-rendering": "crispEdges"});
    b.append("text").attr("class", "legend_axe").attr("x", -200).attr("y", -37).attr("dy", ".3em").attr("transform", "rotate(-90)").style("font-weight", "bold").style("font-size", "1.2em").text("a (t)").style({
		stroke: "black",
        fill: "none",
        "stroke-width": "0.5px",
        "shape-rendering": "crispEdges"});
    b.append("path").style("stroke", "steelblue").style("stroke-width", "2").style("fill", "none").attr("class", "line").attr("d", e(data));

};

