// JavaScript Document


function update_omegak0(){
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = Number(document.getElementById("T0_annexes").value);
	h0 = Number(document.getElementById("H0_annexes").value); 
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	Or=Number(document.getElementById("Orr").innerHTML);
		
	
	if(document.getElementById("omegalambda0_annexes") != null){
		omegalambda0 = Number(document.getElementById("omegalambda0_annexes").value);
		omegalambda0 = omegalambda0.toExponential();
		omegak0 = 1-Or-omegam0-omegalambda0;
		document.getElementById("resultat_omegak0_annexes").innerHTML=omegak0.toExponential(3);
	}
	else {
		omegaDE0=Number(document.getElementById("omegaDE0_annexes").value);
		omegak0 = 1-Or-omegam0-omegaDE0;
		document.getElementById("resultat_omegak0_annexes").innerHTML=omegak0.toExponential(3);
	}	
}

function update_omegar0(){
	
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = Number(document.getElementById("T0_annexes").value);
	h0 = Number(document.getElementById("H0_annexes").value); 
	
	//definition du type d'annee
	if(typeannee == "Sidérale"){
		nbrjours = 365.256363051;
		}else if(typeannee == "Julienne"){
		nbrjours = 365.25;
		}else if(typeannee == "Tropique (2000)"){
		nbrjours = 365.242190517;
		}else{
		nbrjours = 365.2425;
	}

	//calcul de h0 par secondes et par gigaannees
	au = 149597870700;
	H0parsec = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	H0parsec = H0parsec;
	H0enannee = H0parsec*(3600*24*nbrjours);
	H0engannee = H0enannee*Math.pow(10, 9);
	
	
	Or = 0;
	if (document.getElementById("resultat_omegar0_annexes").options[2].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		Or=1.68*Or;
		Or = Or.toExponential(3);
		} else if (document.getElementById("resultat_omegar0_annexes").options[1].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		Or = Or.toExponential(3);
		} else {
		
	}
	

	document.getElementById("Orr").innerHTML=" "+Or;
	update_omegak0();
}

function update_omegar0_simu(){
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	
	t0 = Number(document.getElementById("T0").value);
	h0 = Number(document.getElementById("H0").value);
	omegam0 = Number(document.getElementById("omegam0").value);
	
	//Update resultats 
	document.getElementById("resultat_omegam0").innerHTML=omegam0;
	
	
	//on recupere le bon nombre de jour par an.
	if(typeannee == "Sidérale"){
		nbrjours = 365.256363051;
		}else if(typeannee == "Julienne"){
		nbrjours = 365.25;
		}else if(typeannee == "Tropique (2000)"){
		nbrjours = 365.242190517;
		}else{
		nbrjours = 365.2425;
	}
	
	//calcule des h0 par seconde par anneee et par gigaannee
	au = 149597870700;
	H0parsec = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	H0enannee = H0parsec*(3600*24*nbrjours);
	H0engannee = H0parsec*(3600*24*nbrjours)*Math.pow(10, 9);
	
	//on calcule omegar si besoin
	Or = 0;
	if (document.getElementById("liste").options[2].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		Or=1.68*Or;
		Or = Or.toExponential(3);
		} else if (document.getElementById("liste").options[1].selected) {
		sigma = (2*Math.pow(Math.PI, 5)*Math.pow(k, 4))/(15*Math.pow(h, 3)*Math.pow(c, 2));
		rho_r = (4*sigma*Math.pow(t0, 4))/(Math.pow(c, 3));
		Or =(8*Math.PI*G*rho_r)/(3*Math.pow(H0parsec, 2));
		Or = Or.toExponential(3);
		} else {
			Or=0;
	}
	

	document.getElementById("resultat_omegar0").innerHTML = Or.toExponential(3);
	update_omegak0_simu();
}



function update_omegak0_simu(){
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value;
	omegam0 = Number(document.getElementById("omegam0").value);
	
	
	if(document.getElementById("omegalambda0")!=null){
		omegalambda0 = Number(document.getElementById("omegalambda0").value);
		omegak0=1-Or-omegalambda0-omegam0;
		if(Math.abs(omegak0)<1e-9){omegak0=0;}
		document.getElementById("resultat_omegarlambda0").innerHTML=omegalambda0.toExponential(3);
		document.getElementById("resultat_omegak0").innerHTML = omegak0.toExponential(3);
	}
	else{
		omegaDE0=Number(document.getElementById("omegaDE0").value);
		omegak0=1-Or-omegaDE0-omegam0;
		if(Math.abs(omegak0)<1e-9){omegak0=0;}
		document.getElementById("resultat_omegaDE0").innerHTML=omegaDE0.toExponential(3);
		document.getElementById("resultat_omegak0").innerHTML=omegak0.toExponential(3);
		
	}	
}

function Omegak0_plat(){
	update_omegar0_simu();
	if(document.getElementById("univ_plat").checked){
		omegak0=0;
		omegam0 = Number(document.getElementById("omegam0").value);
		Or=Number(document.getElementById("resultat_omegar0").innerHTML);
		
		result = 1-omegak0-omegam0-Or;
		result = result.toExponential(3);
		
		if(document.getElementById("omegalambda0")!=null){
			document.getElementById("omegalambda0").innerHTML=result;
			document.getElementById("omegalambda0").value=result;
			document.getElementById("resultat_omegarlambda0").innerHTML=result;
			document.getElementById("resultat_omegak0").value=0;
			document.getElementById("resultat_omegak0").innerHTML=0;
		}
		else{
			document.getElementById("omegaDE0").innerHTML=result;
			document.getElementById("omegaDE0").value=result;
			document.getElementById("resultat_omegak0").innerHTML=0;
		}
	}
	else{
		update_omegar0_simu();
	}
	
}

function Omegak0_plat_calcul(){
	update_omegar0();
	if(document.getElementById("univ_plat").checked){
		omegak0=0;
		omegam0 = Number(document.getElementById("omegalambda0_annexes").value);
		Or=Number(document.getElementById("Orr").innerHTML);
		
		result = 1-omegak0-omegam0-Or;
		result = result.toFixed(3);
		
		if(document.getElementById("omegalambda0_annexes")!=null){
			document.getElementById("omegalambda0_annexes").value=result;
			document.getElementById("resultat_omegak0_annexes").innerHTML=0;
		}
		else{
			document.getElementById("omegaDE0_annexes").value=result;
			document.getElementById("resultat_omegak0_annexes").innerHTML=0;
		}
	}
	else{
		update_omegar0();
	}
	
}
