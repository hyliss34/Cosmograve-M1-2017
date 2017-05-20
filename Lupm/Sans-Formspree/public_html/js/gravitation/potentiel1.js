

function Calcul_potentiel(){

	var r0 =Number(document.getElementById("r0").value);
	var Vphi0 =Number(document.getElementById("Vphi0").value) ; 
	var M = Number(document.getElementById("M").value); 
	var G=6.6742*Math.pow(10,-11);
	var c=299792458;
	var m=G*M/Math.pow(c,2);
	var L=Vphi0*r0/c;
	var rmax=200*m;
	var rinit=2*m;
	var dr=rmax/500;
	data = [];	

	for(r=rinit;r<rmax*1.1;r+=dr) 
	{
		V=(1-(2*m)/r)*(1+Math.pow(L/r,2)); 
		data.push({date:r,close:V/(c*c)}); 

	}








					


