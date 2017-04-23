var i=0;
function trace(){

var frames = [
	{name : 'Graphe', data: [{x: [],y: []}]},
	{name : 'Point', data: [{x: [],y: []}]}
];




m=2;
L=3;
c=3e8;
rmax=500;
	
	
for(r=2*m;r<rmax;r++){
	V=Math.abs((1-(2*m)/r)*(1+Math.pow(L/r,2))/c*c);
	
	frames[0].data[0].x[r]=r;
	frames[0].data[0].y[r]=V;
	frames[1].data[0].x[r]=1;
	frames[1].data[0].x[r]=0;
}

tracer1 = [{
	x: frames[0].data[0].x,
  	y: frames[0].data[0].y,
  	line: {simplify: false},
}];


Plotly.plot('graph',tracer1, {
	xaxis: {range: [2*m,rmax]},
	yaxis: {range: [0,1]}
});
	
	
	Myinterv = setInterval(anim,10000);
}

function anim(){
	i++;
m=2;
L=3;
c=3e8;
	
V=Math.abs((1-(2*m)/i)*(1+Math.pow(L/i,2))/c*c);
tracer2=[{i,V}];
	
	
	
tracer=[tracer1,tracer2];
Plotly.plot('graph',tracer, {
	xaxis: {range: [2*m,rmax]},
	yaxis: {range: [0,1]}
});
	
	if(i>4){
		clearInterval(Myinterv);
	}
	
}