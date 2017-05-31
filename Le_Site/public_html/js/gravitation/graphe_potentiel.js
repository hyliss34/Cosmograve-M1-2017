function graphique_creation_pot(){
	

	// Se")t the dimensions of the canvas / graph

	
	var margin = {top: 50, right: 20, bottom: 30, left: 120};
	
	taille_carac=12;
	wid_fen=window.innerWidth;
	hei_fen=window.innerHeight;
	
	// Valeurs de largeur et hauteur adaptées pour la version mobile / desktop
	if(wid_fen>960 && wid_fen<=1100){
		width=wid_fen*0.45;
		height=width*2/3;
	}
	else if(wid_fen>1100 && wid_fen<1700){
		width=wid_fen*0.39;
		height=width*2/3;
	}
	else if(wid_fen>1100){
		width=wid_fen*0.25;
		height=width*2/3;
	}
	else{
		margin= {top: 50, right: 20, bottom: 30, left: 70};
		width=wid_fen*0.8;
		height=width*2/3;
	}
	//alert(wid);
	
	
	// Set the ranges
	x = d3.scale.linear().range([0, width]);
	y = d3.scale.linear().range([height, 0]);
	// Define the line
	var valueline = d3.svg.line()
	.x(function(d) { return x(d.date); })
	.y(function(d) { return y(d.close); });
	
	// Adds the svg canvas
	
	var svg = d3.select("#grsvg_2")
	.attr("width", width+margin.left+margin.right)
	.attr("height", height+margin.bottom+margin.top*2)
	.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	// Define the axes
	var xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(8).tickFormat(d3.format(".1e"));
	
	var yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(10).tickFormat(d3.format(".1e"));
	
	//d3.csv("data.csv", function(error, data) {
	form = d3.format(".1e");
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
	x.domain(d3.extent(data1, function(d) { 
		return d.date }));
	y.domain([0, d3.max(data1, function(d) { return d.close })]);

	// Add the X Axis
	svg.append("g")
	.attr("class", "x axis")
	.style("font-size",""+taille_carac+"px")
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
	.style("font-size",""+taille_carac+"px")
	.attr("class", "y axis")
	.call(yAxis);
	
	if(ANG==1){titre="Effective Potential";}
	else{titre="Potentiel effectif";}
	
	svg.append("text")
	.attr("class", "legend_titre")
	.attr("x", width/2 - 100)
	.attr("y", -margin.top/2)
	.attr("dy", ".3em")
	.attr("transform", "rotate(0)")
	.style("font-size",""+taille_carac*2+"px")
	.text(titre);
	
	svg.append("text")
	.attr("class", "legend_axe")
	.attr("x", width/2)
	.attr("y", height+margin.top/1.4)
	.attr("dy", ".3em")
	.attr("transform", "rotate(0)")
	.style("font-size",""+taille_carac+"px")
	.text("r (m)");
	
	svg.append("text")
	.attr("class", "legend_axe")
	.attr("x", -height/2)
	.attr("y", -margin.left/1.5)
	.attr("dy", ".3em")
	.attr("transform", "rotate(-90)")
	.style("font-size",""+taille_carac+"px")
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