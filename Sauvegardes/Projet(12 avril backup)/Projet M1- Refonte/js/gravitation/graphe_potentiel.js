function graphique_creation_pot(){
	

	// Set the dimensions of the canvas / graph
	var margin = {top: 30, right: 0, bottom: 30, left: 80},
	chart = d3.select("#graphique2");
	wid = chart.width;
	hei = chart.height;
	//alert(wid);
	width = 750 - margin.left - margin.right ,
	height = 450 - margin.top - margin.bottom;
	
	// Set the ranges
	x = d3.scale.linear().range([0, width]);
	y = d3.scale.linear().range([height, 0]);

	// Define the line
	var valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
	
	// Adds the svg canvas
	var svg = d3.select("#grsvg_2")
	.attr("width", width)
	.attr("height", height)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(8);
	
	var yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(10);
	
	//d3.csv("data.csv", function(error, data) {
	data1.forEach(function(d) {
		d.date = d.date;
		d.close = +d.close;
	});
	
	data2.forEach(function(d) {
		d.date = d.date;
		d.close = +d.close;
	});
	//alert(data);
	// Scale the range of the data
	x.domain(d3.extent(data1, function(d) { return d.date }));
	y.domain([0, d3.max(data1, function(d) { return d.close; })]);
	
	// Add the X Axis
	svg.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
	
	
	svg.selectAll("line.x")
	.data(x.ticks(8))
	.enter().append("line")
	.attr("class", "x")
	.attr("x1", x)
	.attr("x2", x)
	.attr("y1", 0)
	.attr("y2", height)
	.style("stroke", "#ccc");
	
	svg.selectAll("line.y")
	.data(y.ticks(8))
	.enter().append("line")
	.attr("class", "y")
	.attr("x1", 0)
	.attr("x2", width)
	.attr("y1", y)
	.attr("y2", y)
	.style("stroke", "#ccc");
	
	
	// Add the Y Axis
	svg.append("g")
	.attr("class", "y axis")
	.call(yAxis);
	
	svg.append("text")
	.attr("class", "legend_titre")
	.attr("x", 240)
	.attr("y", -15)
	.attr("dy", ".3em")
	.attr("transform", "rotate(0)")
	.text("Potentiel effectif");
	
	svg.append("text")
	.attr("class", "legend_axe")
	.attr("x", 350)
	.attr("y", 420)
	.attr("dy", ".3em")
	.attr("transform", "rotate(0)")
	.text("r");
	
	svg.append("text")
	.attr("class", "legend_axe")
	.attr("x", -235)
	.attr("y", -50)
	.attr("dy", ".3em")
	.attr("transform", "rotate(-90)")
	.text("V(r)");
	
	// Add the valueline path.
	svg.append("path")
	.attr("class", "line")
	.attr("d", valueline(data1))
	.attr('stroke', 'steelblue')
	.attr('stroke-width', 2)
	.attr('fill', 'none');
	
	point = svg.append("g")
	.attr("class", "line-point");
	
	point.selectAll('circle')
	.data(data2)
	.enter().append('circle')
	.attr("cx", x(data2[0].date))
	.attr("cy", y(data2[0].close))
	.attr("r", 4)
	.style("fill", "orange")
	.attr('stroke', 'orange');
}	

function update_graphique_2(){
	
	$('.line-point').empty();
	
	point.selectAll('circle')
	.data(data2)
	.enter().append('circle')
	.attr("cx", x(data2[0].date))
	.attr("cy", y(data2[0].close))
	.attr("r", 4)
	.style("fill", "orange")
	.attr('stroke', 'orange');
}