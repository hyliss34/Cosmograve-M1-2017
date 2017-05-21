// JavaScript Document


// Update des valeurs de Omegar, omegak, omegam et omegal/de
/* Simulation Univers update constantes */


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
	
	document.getElementById("resultat_omegar0").innerHTML = Or;
	update_omegak0_simu();
}


function update_omegak0_simu(){
	omegam0 = Number(document.getElementById("omegam0").value);
	Or= Number(document.getElementById("resultat_omegar0").innerHTML);
	omegalambda0 =Number(document.getElementById("omegalambda0").value);
	
	omegak0 = 1 - Or - omegam0 - omegalambda0;
	// verfie si univers plat coché
	if(document.getElementById("univ_plat").checked){
		omegak0=0;
		la = 1 - Or - omegam0;
		la = la.toExponential(3);
		document.getElementById("omegalambda0").value = la;
	}
	omegak0= omegak0.toExponential(3);
	document.getElementById("resultat_omegak0").innerHTML = omegak0;
}

function Omegak0_plat(){
	Or= Number(document.getElementById("resultat_omegar0").innerHTML);
	omegam0 = Number(document.getElementById("omegam0").value);
	
	omegalambda0= 1- Or -omegam0;
	omegalambda0 = omegalambda0.toExponential(3);
	document.getElementById("resultat_omegak0").innerHTML = 0;
	document.getElementById("omegalambda0").value = omegalambda0;
}



/* Simulation univers Noire */
function update_omegar0_simu_noir(){
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	
	t0 = Number(document.getElementById("T0").value);
	h0 = Number(document.getElementById("H0").value);
	omegam0 = Number(document.getElementById("omegam0").value);

	
	
	
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
	
	document.getElementById("resultat_omegar0").innerHTML = Or;
	update_omegak0_simu_noir();
}

function update_omegak0_simu_noir(){
	omegam0 = Number(document.getElementById("omegam0").value);
	Or= Number(document.getElementById("resultat_omegar0").innerHTML);
	omegaDE0 =Number(document.getElementById("omegaDE0").value);
	
	omegak0 = 1 - Or - omegam0 - omegaDE0;
	// verfie si univers plat coché
	if(document.getElementById("univ_plat").checked){
		omegak0=0;
		la = 1 - Or - omegam0;
		la = la.toExponential(3);
		document.getElementById("omegaDE0").value = la;
	}
	omegak0= omegak0.toExponential(3);
	document.getElementById("resultat_omegak0").innerHTML = omegak0;
}

function Omegak0_plat_noir(){
	Or= Number(document.getElementById("resultat_omegar0").innerHTML);
	omegam0 = Number(document.getElementById("omegam0").value);
	
	omegalambda0= 1- Or -omegam0;
	omegalambda0 = omegalambda0.toExponential(3);
	document.getElementById("resultat_omegak0").innerHTML = 0;
	document.getElementById("omegaDE0").value = omegalambda0;
}




/*Calcul Annexe */
function update_omegar0_calc(){
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = Number(document.getElementById("T0_annexes").value);
	h0 = Number(document.getElementById("H0_annexes").value); 

	
	
	
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
			Or=0;
	}
	
	document.getElementById("Orr").innerHTML = Or;
	update_omegak0_calc();
}


function update_omegak0_calc(){
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	Or= Number(document.getElementById("Orr").innerHTML);
	omegalambda0 =Number(document.getElementById("omegalambda0_annexes").value);
	
	zld=espace_definie(omegam0,omegalambda0,Or);
	ztl=espacedefinie(omegam0,omegalambda0,Or);
	
	
	omegak0 = 1 - Or - omegam0 - omegalambda0;
	// verfie si univers plat coché
	if(document.getElementById("univ_plat").checked){
		omegak0=0;
		la = 1 - Or - omegam0;
		la = la.toExponential(3);
		document.getElementById("omegalambda0_annexes").value = la;
	}
	omegak0= omegak0.toExponential(3);
	document.getElementById("resultat_omegak0_annexes").innerHTML = omegak0;
	
	za=-0.99;
	
	if(omegalambda0<=0){
		eps=0.00001;
		var za = -0.99;  //-1 est une valeur interdite dans l'intégrale
    //les calculs se basent sur la fonction (E(x))^(-0.5). Si E(x)<=0 l'intégral n'est pas définie.
    //za = -1. E(za) = omegalambda0. si omegalambda0 <=0 alors l'intégral n'est pas définie. Il faut donc redéfinir za (la borne inférieur de l'intégal.
    //E(-1) = omegalambda0  et  E(0) ne dépend pas des paramètres omegas. E(0)=1. donc on peut trouver une nouvelle valeur pour za sur l'intervalle [-1;0] lorsque omegalambda0<0
    
    //il est possible d'avoir E(-1)>0 avec deux singularités sur l'intervalle [-1;0]. Afin d'affirmer l'existence de ces singularités on utile la dérivé de E(x)
    
    
    deriv_E_neg_1 = derive_fonction_E(za,omegam0, omegalambda0, Or);
    deriv_E_0 =  derive_fonction_E(0,omegam0, omegalambda0, Or);
    
    if (Number(omegalambda0)<0){
        za = Number(dichotomie(za, 0,fonction_E,0,eps))+ 0.0001;
    }
    else if (deriv_E_neg_1*deriv_E_0<0){
      Z_deriv_root = Number(dichotomie(za, 0,derive_fonction_E,0,eps))+ 0.0001;
      if(fonction_E(Z_deriv_root,omegam0, omegalambda0, Or)==0){
        za = Z_deriv_root+ 0.0001;
      }
      else if(fonction_E(Z_deriv_root,omegam0, omegalambda0, Or)<0){
        za = Number(dichotomie(Z_deriv_root, 0,fonction_E,0,eps))+ 0.0001;
      }
      else{
        za = za;
      }
    }
    else if(Number(omegalambda0)==0){
      za = -0.99;
    }
    else{
      
    }
	}
	za=za.toFixed(4);
	document.getElementById("z_lim_inf").innerHTML = za;
	
	
	
	if(Number(zld[0])>1e4){
		//rien
		}
	else{
	document.getElementById("z_lim").innerHTML=zld[0].toFixed(4);
	}
	if(ztl[0]>1e4){
	}else{
	document.getElementById("z_lim_t").innerHTML=ztl[0].toFixed(4);
	}
	
	
}

function Omegak0_plat_calc(){
	Or= Number(document.getElementById("Orr").innerHTML);
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	
	omegalambda0= 1- Or -omegam0;
	omegalambda0 = omegalambda0.toExponential(3);
	document.getElementById("resultat_omegak0_annexes").innerHTML = 0;
	document.getElementById("omegalambda0_annexes").value = omegalambda0;
}




/* Calcul Noire */



function update_omegar0_calc_noir(){
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = Number(document.getElementById("T0_annexes").value);
	h0 = Number(document.getElementById("H0_annexes").value); 

	
	
	
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
			Or=0;
	}
	
	document.getElementById("Orr").innerHTML = Or;
	update_omegak0_calc_noir();
}


function update_omegak0_calc_noir(){
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	Or= Number(document.getElementById("Orr").innerHTML);
	omegalambda0 =Number(document.getElementById("omegaDE0_annexes").value);
	
	omegak0 = 1 - Or - omegam0 - omegalambda0;
	// verfie si univers plat coché
	if(document.getElementById("univ_plat").checked){
		omegak0=0;
		la = 1 - Or - omegam0;
		la = la.toExponential(3);
		document.getElementById("omegaDE0_annexes").value = la;
	}
	omegak0= omegak0.toExponential(3);
	document.getElementById("resultat_omegak0_annexes").innerHTML = omegak0;
}

function Omegak0_plat_calc_noir(){
	Or= Number(document.getElementById("Orr").innerHTML);
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	
	omegalambda0= 1- Or -omegam0;
	omegalambda0 = omegalambda0.toExponential(3);
	document.getElementById("resultat_omegak0_annexes").innerHTML = 0;
	document.getElementById("omegaDE0_annexes").value = omegalambda0;
}

