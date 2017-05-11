
//executing function
function inverse(){
	//recuperation des valeurs
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	t0 = Number(document.getElementById("T0_annexes").value);
	h0 = Number(document.getElementById("H0_annexes").value); 
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	omegaDE0 = Number(document.getElementById("omegaDE0_annexes").value)
	a = document.getElementById("resul_omegar0");
	
	
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
	
	alert(Or);
	a.value =Or;
	a.innerHTML = Or;
	//calcul de omegak
	omegak0 = 1-Or-omegam0-omegaDE0;
	document.getElementById("resultat_omegak0_annexes").innerHTML = omegak0;
	
	//Energie Noire
	w0 = Number(document.getElementById("omega0_annexes").value);
	w1 = Number(document.getElementById("omega1_annexes").value);
	
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
	
	au = 149597870700;
	H0parsec = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	H0enannee = H0parsec*(3600*24*nbrjours);
	H0engannee = H0enannee*Math.pow(10, 9);
	
	
	
	get_root_dm();
	get_root_t();
}



//pour calculer dm
function Enoire(x,omegam0, omegaDE0, Or) {
	omegak0 = 1 - Or - omegam0 -omegaDE0;
	return 1/Math.pow((omegaDE0*Ya(x) + omegak0*(Math.pow((1.+x),2)) + omegam0*(Math.pow((1.+x),3)) + Or*(Math.pow((1.+x),4))),1/2);

}

function Enoire_temps(x,omegam0, omegaDE0, Or){
	return Enoire(x,omegam0,omegaDE0,Or)/(1+x);
}

function Ya(x){
	w0 = Number(document.getElementById("omega0_annexes").value);
	w1 = Number(document.getElementById("omega1_annexes").value);
	
	
	return Math.exp(-3*(w1+w0+1)*Math.log(1/(1+x)) -(3*w1*(1-(1/(1+x)))));
}

// pour calculer les bornes de la région sur laquelle l'intégrale des fonctions ci-dessus est définie.
function fonction_E_noir(x,omegam0, omegaDE0, Or){
	return (Number(Or)*Math.pow((1+x),4) + Number(omegam0)*Math.pow((1+x),3) + (1-Number(omegam0)-Number(Or)-Number(omegaDE0))*Math.pow((1+x),2) + Number(omegaDE0)*Ya(x));
}

function derive_fonction_E_noir(x,omegam0, omegaDE0, Or){
	w0 = Number(document.getElementById("omega0_annexes").value);
	w1 = Number(document.getElementById("omega1_annexes").value);

	return (4 * Number(Or)*Math.pow((1+x),3) + 3 * Number(omegam0)*Math.pow((1+x),2) + 2 * (1-Number(omegam0)-Number(Or)-Number(omegaDE0))*(1+x) + Number(omegaDE0)*Ya(x)*(3*(w1+w0+1)*(1+x)^(-1) - (3*w1*(1+x)^(-2))));
}







/*                                                      ---------------------  CALCULS INVERSES POUR LE DM ------------------------------------                            */


//#######################################     GET_ROOT_DM fonction suprême qui ordonne le calcul de "dm". récupère les paramètres de la page HTML Calculs


function get_root_dm(){	
	dm = document.getElementById("dm_racine_dm").value;
	z = bisection_method_dm(dm, omegam0, omegaDE0, Or);  // !!!______!!!!   initiation du calcul inverse étape1: "bisection_method"
	document.getElementById("z_racine_dm").innerHTML= z;
}




//#######################################     BISECTION_METHOD_DM prépare les variables et mène des vérifications nécessaires avant de lancer l'algorithme de dicothomie

function bisection_method_dm (dm, omegam0, omegaDE0, Or){
	omegak0=(1-omegam0-omegaDE0-Or);
	f_x = formule_z(omegak0);                  // !!!______!!!!    recherche de la fonction mathématique qui correspond aux paramètres omegas étape2: "formule_z"
	za = 0;    //valeur par default za = 0 si   
 	zb = 5e10;
	
	//les calculs inverses se basent sur la fonction (E(x))^(-0.5). Si E(x)<=0 l'intégral n'est pas définie.
	//za = -1. E(za) = omegaDE0. si omegaDE0 <=0 alors l'intégral n'est pas définie. Il faut donc redéfinir za (la borne inférieur de l'intégal.
	//E(0) ne dépend pas des paramètres omegas. E(0)=1. donc on peut trouver une nouvelle valeur pour za sur l'intervalle [-1;0]
	/*if (Number(omegaDE0)<=0){
		za = Number(dichotomie(za, 0,fonction_E_noir,0))+ 0.0000001; //le 0.0000001 est un epsilon
	}*/
	
	dm_za = f_x(za, omegam0, omegaDE0, Or); 
	dm_zb = f_x(zb, omegam0, omegaDE0, Or);
	
	//vérification des valeurs permisent
	//"reconditionneur"   cette variable possède 2 valeurs [nouveau_zb, contrainte] contrainte =0 ou 1. 0 indique l'absence de contrainte
	reconditionneur = espacedefinie(omegam0, omegaDE0, Or);       // !!!______!!!!  recherche des limites de l'espace définie. redéfinition de zb   étape3: "espacedefinie"
	
	zb = Number(reconditionneur[0])
	contrainte = Number(reconditionneur[1]);
	if (contrainte==1){
		zb -= 0.00001;  //le 0.00001 est un epsilon
	}
	dm_za = f_x(za, omegam0, omegaDE0, Or); 
	dm_zb = f_x(zb, omegam0, omegaDE0, Or);
	
	if (Number(dm)===0){
		//valeur connu. dm=0 correspond à za=zb
		return za;
	}
	else{}
	
	
	
	//valeur par default de zb est 5e10. L'utilisateur peut demander le calul inverse de dm > dm_zb.
	//Si aucune contrainte n'existe et omegak0 <=0 on peut augmenter la valeur de zb afin d'avoir dm_zb > dm
	if (omegak0 <=0){
		limit = 0;
		if (contrainte ==0){
			while (dm > dm_zb && limit<100){
				zb = zb*10;
				dm_zb = f_x(zb, omegam0, omegaDE0, Or);
				limit+=1;
			}
			if (limit>=100){
				return NaN;
			}
		}
		//la fonction "fonction_dm" est monotone pour omegak <=0. 
		//Si dm est supérieur à dm_zb après avoir multiplié zb par 1000 alors la foncion converge et son intégrale ne peut pas atteindre la valeur dm
		if (dm>dm_zb){

			return NaN;
		}
		
		Z = dichotomie(za, zb, f_x, dm);  // !!!______!!!!  vérifications terminées. Lancement de la recherhce de Z étape4.a: "dichotomie"
		return Z;
	}
	//la condition de else est omegak0 >0
	else{
		//amplitude A de la fonction composée de sin(integral)       Sk_sin_x
		A = (c/(H0parsec*Math.sqrt( Math.abs(omegak0) )))
		if (dm > A){
			return NaN;  // !!!______!!!! dm n'a pas de solution z étape4.b: Z=Nan
		}
		integB = Math.sqrt( Math.abs(omegak0)) * simpson(0, zb, fonction_dm, omegam0, Number(omegaDE0), Number(Or));
		//dans la situation qui suit, sin(integrale) est montone sur l'intervalle [za; zb] 
		if (integB<Math.PI/2){
			//on vérifie que dm n'est pas supérieur à dm_zb car dm_zb< A   ici l'integral du dm_zb se situe dans [0;PI/2]
			if (dm > dm_zb){
				return NaN;  
			}
			return dichotomie(0, zb, f_x, dm);
		}
		else if((integB>Math.PI/2) && (integB<Math.PI)){
			//recherche z qui correspond à PI/2
			z_Pi_div_2 = dichotomie(0, zb, Integral_dm, Math.PI/2);
			//recherche z solution de dm dans l'intervalle [0;PI/2]
			z_sol_1 = dichotomie(0, z_Pi_div_2, f_x, dm);
			
			if (dm>dm_zb){
				z_sol_2 = dichotomie(z_Pi_div_2, zb, f_x, dm);
				return (z_sol_1+", " + z_sol_2);
			}
			return z_sol_1;
		}
		else{
			z_Pi_div_2 = Number(dichotomie(0, zb, Integral_dm, Math.PI/2));
			z_Pi = Number(dichotomie(0, 5e10, Integral_dm, Math.PI));
			z_sol_1 = dichotomie(0, z_Pi_div_2, f_x, dm);
			z_sol_2 = dichotomie(z_Pi_div_2, z_Pi, f_x, dm);
			z_f2 = z_sol_1+", " + z_sol_2;
			return z_f2;
		}
	}
}








//########### ESPACE_DEFINIE fonction qui intervient pour vérifier si les paramètres omegas posent des contraintes à leur fonction associé.
//                    si cette fonction signale la présence de régions de valeurs interdites pour les intégrales...

function espacedefinie(omegam0, omegaDE0, Or){
	//z_prime est la racine de la dérivé de E(x)  (E'(x)) sur [0, infini). c'est donce l'extremum (minimum) de E(x) sur [0, infini)
	//on vérifie à l'avance si E'(x) coupe l'axe des abscisses sur [0;infini)
	D_prime_za = derive_fonction_E_noir(0,omegam0, omegaDE0, Or);
	D_prime_zb = derive_fonction_E_noir(zb,omegam0, omegaDE0, Or);
	alert(Number(omegaDE0)<0);
	if (D_prime_za*D_prime_zb<0 && Number(omegaDE0)>0){
		z_prime = Number(dichotomie(0, zb,derive_fonction_E_noir,0));
		//si on a E(z_prime)>0 alors E(x) n'a pas de racines et donc aucune contrainte se manifèste pour les intégrales. On conserve zb
		if (fonction_E_noir(z_prime,omegam0, omegaDE0, Or)>0){

			res = [zb,0];    //0 va être un indicateur qu'on utilisera plus tard qui confirme l'absence des contraintes possibles.
			return res;
		}
	
		//si on a E(z_prime)=0 alors E(x) possède une racine. Une contrainte se manifèste, zb->z_prime les intégrales sont définit sur [0, z_prime)
		else if(fonction_E_noir(z_prime,omegam0, omegaDE0, Or)==0){
			res = [z_prime, 1]; //1 va confirmer la présence de contraintes
			document.getElementById("z_lim").innerHTML= z_prime;
			return res;
		}
	
		////si on a E(z_prime)<0 alors E(x) possède 2 racines. On prend la première z_pr. intégrales sont définit sur [0, z_pr)
		else{
			z_pr = Number(dichotomie(0, z_prime,fonction_E_noir,0));
			res = [z_pr,1];
			document.getElementById("z_lim").innerHTML= z_pr;
			return res;
		}
	}
	//cas special
	else if(Number(omegaDE0)<0){
		E_b = Number(fonction_E_noir(zb, omegam0, omegaDE0, Or));
		if(E_b<0){
			z = Number(dichotomie(0, zb, fonction_E_noir, 0));
			res = [z,1];
			document.getElementById("z_lim").innerHTML= z;
			return res;
		}
		else{
			return res = [zb,0];
		}
	}
	//si E'(x) ne coupe pas l'axe des abscisses sur [0;infini) alors on conserve la valeur de zb et on indique l'absence de contraintes.
	else{
		return res = [zb,0];
	}
}




//-----------------------------------------------------------------------------  Works normally


//########### DICHOTOMIE     outil mathématique fondamental:   DICHOTOMIE  POUR "dm"   

function dichotomie(BornInf, BornSup, fonction, cible){
	ex = 0.0000001; //indicateur de tolérence d'erreur de l'interpolation/dichotomie
	z_inf = BornInf;
	z_sup = BornSup;
	dm_z_inf = fonction(z_inf, omegam0, omegaDE0, Or); 
	dm_z_sup = fonction(z_sup, omegam0, omegaDE0, Or);
	max_iterations = 500;
	
	while (true){
			zc = (z_inf+z_sup)/2.0;
			
			dm_zc = fonction(zc, omegam0, omegaDE0, Or);
			//alert("za : " + za + " dm_za: " + dm_za + " zb: " + zb + " dm_zb: " + dm_zb + " zc: " + zc); 
			if (((z_sup-z_inf)/2)<ex){
				//dans ce qui suit on prend la valeur absolue car zc peut être négatif (sur l'intervalle [-1;0])
				if (Math.abs(zc/ex) < 100){
					
					ex = ex*1e-5;
				}
				else{
					zc = zc.toExponential(3);
					return zc;
				}
			}
			else if(isNaN(dm_zc)){
				return NaN;
			}
				
			else if ((dm_zc-cible)*(dm_z_sup-cible)< 0){
				z_inf = zc;
				dm_z_inf = dm_zc;
			}
			else{
				z_sup = zc;
				dm_z_sup = dm_zc;
			}
		}
}





//fonction définit du produit de  l'intégral de la fonction "fonction_dm" avec abs(omegak0)^0.5   
//Ceci sert à trouver le z correspondant a pi/2 ou pi pour cette fonction



//formules pour dm basé sur omegak0
function Sk_sin_x(bornSup, omegam0, omegaDE0, Or){
	
    integ = Math.sqrt( Math.abs(omegak0)) * simpson(za, bornSup, Enoire, omegam0, Number(omegaDE0), Number(Or));
    return (c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ);
  }
  
function Sk_x(bornSup, omegam0, omegaDE0, Or){
    return (c/(H0parsec) * simpson(za, bornSup, Enoire, omegam0, Number(omegaDE0), Number(Or)));
  }

function Sk_sinh_x(bornSup, omegam0, omegaDE0, Or){
    integ = Math.sqrt( Math.abs(Number(omegak0))) * simpson(za, Number(bornSup), Enoire, Number(omegam0), Number(omegaDE0), Number(Or));
    return (c/(H0parsec*Math.sqrt( Math.abs(Number(omegak0)) ))) * Math.sinh(integ);
  }

  
//choix de la formule pour calculer dm
function formule_z(omegak0){
		//détermine les formules qui doivent être utilisé pour la distance metrique, omegak positif 0 ou negatif
	if (omegak0>0){
	  return Sk_sin_x;
      
		}
	else if (omegak0===0){
	  return Sk_x;

		}
	else{
	  return Sk_sinh_x;
	}
}












/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------*/


/*                                                      ---------------------  CALCULS INVERSES POUR LE TEMPS  ------------------------------------            */


//#######################################     GET_ROOT_T fonction suprême qui ordonne le calcul inverse. récupère les paramètres de la page HTML Calculs


function get_root_t(){
	t_em = (document.getElementById("t_racine_em").value)*H0enannee;
	z_em = bisection_method_t(t_em, omegam0, omegaDE0, Or, 0);
	document.getElementById("z_racine_t_em").innerHTML= z_em;
	
	t_rec = (document.getElementById("t_racine_rec").value)*H0enannee;
	z_rec = bisection_method_t(t_rec, omegam0, omegaDE0, Or, 1);
	document.getElementById("z_racine_t_rec").innerHTML= z_rec;
}

//#######################################     BISECTION_METHOD_T prépare les variables et mène des vérifications nécessaires avant de lancer l'algorithme de dicothomie



function bisection_method_t (t, omegam0, omegaDE0, Or, type){
	omegak0=(1-omegam0-omegaDE0-Or);
	
	var za = 0  //-1 est une valeur interdite dans l'intégrale
	//les calculs inverses se basent sur la fonction (E(x))^(-0.5). Si E(x)<=0 l'intégral n'est pas définie.
	//za = -1. E(za) = omegaDE0. si omegaDE0 <=0 alors l'intégral n'est pas définie. Il faut donc redéfinir za (la borne inférieur de l'intégal.
	//E(0) ne dépend pas des paramètres omegas. E(0)=1. donc on peut trouver une nouvelle valeur pour za sur l'intervalle [-1;0]
	/*if (Number(omegaDE0)<=0){
		za = Number(dichotomie(za, 0,fonction_E,0))+ 0.0000001;
	}*/
	
	var zb = 5e6; //valeur par default
	
	
	f_x_zb = formule_t(zb, omegam0, omegaDE0, Or);
	
	t_zb = f_x_zb(zb, omegam0, omegaDE0, Or);
	
	f_x_za = formule_t(za, omegam0, omegaDE0, Or);
	t_za = f_x_za(za, omegam0, omegaDE0, Or);
	reconditionneur_t  = espacedefinie(omegam0, omegaDE0, Or);
	contrainte_t = Number(reconditionneur_t[1]);
	
	//aucune contrainte, zb est donné la possibilité de prendre n'importe quelle valeur
	/*if (contrainte_t==0){
		//Les integrales convergent. Ici uncalculable signale si le calcul inverse est impossible. Sa fonction associé regulator ajuste 
		//l'intervalle où la solution peut se trouver
		uncalculable = regulator(za, zb, t, omegam0, omegaDE0, Or);
		if (isNaN(uncalculable[0]) || isNaN(uncalculable[1])){
			return NaN;
		}
		za = uncalculable[0];
		zb = uncalculable[1];
	}*/
	//else{
	zb = reconditionneur_t[0];
	//}
	alert("fin");
	return dichotomie_t(za, zb, t, type);
}




//########### DICHOTOMIE     outil mathématique fondamental:   DICHOTOMIE  POUR "T"   zc varie et le choix de la Enoire_temps dépend de la valeur z


function dichotomie_t(BornInf, BornSup, cible, type){
	ext = 0.00001; //indicateur de tolérence d'erreur dichotomie temporelle
	z_inf = BornInf;
	z_sup = BornSup;
	//foncttions correspondantes aux z
	f_z_inf = formule_t(z_inf, omegam0, omegaDE0, Or, type);
	f_z_sup = formule_t(z_sup, omegam0, omegaDE0, Or, type);
	
	t_z_inf = f_z_inf(z_inf, omegam0, omegaDE0, Or); 
	t_z_sup = f_z_sup(z_sup, omegam0, omegaDE0, Or);
	
	while (true){
			zc = (z_inf+z_sup)/2.0;
			f_zc = formule_t(zc, omegam0, omegaDE0, Or, type);
			t_zc = f_zc(zc, omegam0, omegaDE0, Or);
			if (((z_sup-z_inf)/2)<ext){
				if (Math.abs(zc/ext)<100){
					ext = ext*1e-5; //si Z est petit, la tolérence d'erreur de la dichotomie doit être réduit.
				}
				else{
					zc = zc.toExponential(3);
					return zc;
				}
			}
			else if(isNaN(t_zc)){
				return NaN;
			}
			else if ((t_zc-cible)*(t_z_sup-cible)< 0){
				z_inf = zc;
				t_z_inf = t_zc;
			}
			else{
				z_sup = zc;
				t_z_sup = t_zc;
			}
		}
}

//#########################################################         FORMULE_T  choisit la fonction correspondante aux paramètres omegas et z récupérés de la page html


function formule_t(z, omegam0, omegaDE0, Or, type){
	if(Or > 0){ 
		//preparation des indicateurs pour mener au bon choix du fonction
		w = 0;
		v = 0;
		Om0=1./omegam0-1.;
	
		if(omegam0 <= 0.5){
			w=(1./3.)*Math.log(Om0+Math.sqrt(Om0*Om0-1.0));
			Olambdalim=4.*omegam0*Math.cosh(w)*Math.cosh(w)*Math.cosh(w);
		}
		else{
			v =(1./3.)*Math.acos(Om0);
			Olambdalim=4.*omegam0*Math.cos(v)*Math.cos(v)*Math.cos(v);
		}
		
		
		if(z <= 5e6){  
			if(omegaDE0 >= Olambdalim){
				return Or_z_inf_omlambda_sup;
			}
			else{
				return Or_z_inf_omlambda_inf;
			}
		}
		else{
			if(omegaDE0 >= Olambdalim) {
				return Or_z_sup_omlambda_sup;
			}
			else{
				return Or_z_sup_omlambda_inf;
			}
		}
	}
 
 
 
	if(Or === 0 && omegam0 !== 0){  
		if(z <= 5e6){
			return T_Or_z_inf;
		}
		else{
			return T_Or_z_sup;
		}
	}

	if(Or === 0 && omegam0=== 0 && omegak0 !== 0){  
		if(z <= 5e6){
			return T_Or_omegam0_z_inf; 
		}
		else{
			return T_Or_omegam0_z_sup;
		}
	}
					  
	if(Or === 0 && omegam0=== 0 && omegak0 === 0){
		return T_Or_omegam0_omegak0;
	}		
}


//#########################################################         REGULATOR

/*cette fonction prend les paramètres et ajuste les intervalles dans les situations où celles-ci ne possèdent pas la solution recherché. La fonction
 déclare également lorsqu'il est véritablement impossible de calculer la solution (return "true")*/
 
function regulator(za, zb, t, omegam0, omegaDE0, Or){
	//la fonction associé à ces paramètres est monotone décroissante za<zb --- t_za>t_zb
	if(Or === 0 && omegam0 !== 0){ 
		//valeur maximale: t_za. Valeur non physique: t =<0
		if (t>t_za || t===0 || t<0){
			  new_z = [NaN,NaN];
			  
		    return new_z;
		}
		//regulation de l'intervalle
		else{
		  limit =0;
		  while ((t< t_zb && t!==0 && limit<100)){
			zb = zb*100;
		  	f_x_zb = formule_t(zb, omegam0, omegaDE0, Or);
		  	t_zb = f_x_zb(zb, omegam0, omegaDE0, Or);
		  	limit+=1;
		  }
		  //ceci démontre l'impossibilité de calculer la solution dû à la convergence de l'intégrale
		  if (limit==100){
		  	  new_z = [NaN,NaN];
		      return new_z;
		  }
		  else{
		    new_z = [za,zb];
		    return new_z;
		}
		}
	}
	
	
	//la fonction associé à ces paramètres est monotone décroissante za<zb --- t_za>t_zb
	else if(Or === 0 && omegam0=== 0 && omegak0 !== 0){
		if (t>t_za || t===0 || t<0){
			  new_z = [NaN,NaN];
		      return new_z;
		}
		//regulation de l'intervalle
		limit = 0;
		while (t< t_zb && t!==0 && limit<100 ){
			zb = zb*100;
			f_x_zb = formule_t(zb, omegam0, omegaDE0, Or);
			t_zb = f_x_zb(zb, omegam0, omegaDE0, Or);
			limit +=1;
		}

		if (limit===100){
			  new_z = [NaN,NaN];
		    return new_z;
			}
			else{
			  new_z = [za,zb];
			 
		    return new_z;
			}
	}
	
	
	//la fonction associé à ces paramètres est monotone croissante za<zb --- t_za<t_zb
	else if(Or === 0 && omegam0=== 0 && omegak0 === 0){
		if (t<t_za || t===0 || t<0){
			new_z = [NaN,NaN];
		  return new_z;
		}
		limit = 0;
		//regulation de l'intervalle
		while (t > t_zb && t!==0 &&limit<100){
			zb = zb*10;
			f_x_zb = formule_t(zb, omegam0, omegaDE0, Or);
			t_zb = f_x_zb(zb, omegam0, omegaDE0, Or);
			limit+=1;
		}
		if (limit===100){
			  new_z = [NaN,NaN];
		    return new_z;
			}
		new_z = [za,zb];
		return new_z;
	}
	
	
	// très complexe, regulation de l'intervalle associer aux fonctions utilisées pour Or>0
	if(Or > 0){ 
		//preparation des indicateurs pour mener au bon choix du fonction
		w = 0;
		v = 0;
		Om0=1./omegam0-1.;
	
		if(omegam0 <= 0.5){
			w=(1./3.)*Math.log(Om0+Math.sqrt(Om0*Om0-1.0));
			Olambdalim=4.*omegam0*Math.cosh(w)*Math.cosh(w)*Math.cosh(w);
		}
		else{
			v =(1./3.)*Math.acos(Om0);
			Olambdalim=4.*omegam0*Math.cos(v)*Math.cos(v)*Math.cos(v);
		}
		
		//la fonction associé à ces paramètres est monotone croissante za<zb --- t_za<t_zb
		if(omegaDE0 >= Olambdalim){
			if (t<t_za || t===0 || t<0){
				new_z = [NaN,NaN];
				return new_z;
			}
			limit = 0;
			//regulation de l'intervalle
			while (t > t_zb && t!==0 &&limit<100){
				zb = zb*10;
				f_x_zb = formule_t(zb, omegam0, omegaDE0, Or);
				t_zb = f_x_zb(zb, omegam0, omegaDE0, Or);
				limit+=1;
			}
			if (limit===100){
				new_z = [NaN,NaN];
				return new_z;
			}
			new_z = [za,zb];
			return new_z;                  
		}
		
		
		//la fonction associé à ces paramètres est monotone décroissante za<zb --- t_za>t_zb
		else{
			if (t>t_za || t===0 || t<0){
			  new_z = [NaN,NaN];
		    return new_z;
			}
			limit = 0;
			//regulation de l'intervalle
			while (t< t_zb && t!==0 && limit<100){
				zb = zb*10;
				f_x_zb = formule_t(zb, omegam0, omegaDE0, Or);
				t_zb = f_x_zb(zb, omegam0, omegaDE0, Or);
				limit+=1;
			}
			if (limit===100){
			  new_z = [NaN,NaN];
		    return new_z;
			}
			new_z = [za,zb]
			return new_z;
		}
	}
}

























//########                 Boîte à Fonctions physiques


//liste des formes de la fonction pour les calculs de temps


function Or_z_inf_omlambda_sup(z, omegam0, omegaDE0, Or){
	return simpson(0, z, Enoire_temps, omegam0, Number(omegaDE0), Number(Or));
}

function Or_z_inf_omlambda_inf(z, omegam0, omegaDE0, Or){
	return simpson(Number(z), 5e6, Enoire_temps, omegam0, Number(omegaDE0), Number(Or))+(1/(Math.pow(Or, 1/2)))*(1/(2*Math.pow(5e6, 2)));
}

function Or_z_sup_omlambda_sup(z, omegam0, omegaDE0, Or){
	return simpson(0, 5e6, Enoire_temps, omegam0, Number(omegaDE0), Number(Or))+0.5*(1/(Math.pow(Or, 1/2)))*(1/Math.pow(5e6,2)-1/Math.pow(z2,2));
}

function Or_z_sup_omlambda_inf(z, omegam0, omegaDE0, Or){
	return (1/(Math.pow(Or, 1/2)))*(1/(2*Math.pow(z, 2)));   
}





function T_Or_z_inf(z, omegam0, omegaDE0, Or){
  return simpson(Number(z), 5e6, Enoire_temps, omegam0, Number(omegaDE0), 0.0)+(1/(Math.pow(omegam0, 1/2)))*(2/(3*Math.pow(5e6, 3/2)));
}

function T_Or_z_sup(z, omegam0, omegaDE0, Or){
  return (1/(Math.pow(omegam0, 1/2)))*(2/(3*Math.pow(z, 3/2)));
}

function T_Or_omegam0_z_inf(z, omegam0, omegaDE0, Or){
  return simpson(Number(z), 5e6, Enoire_temps, omegam0, Number(omegaDE0), 0.0)+1/(Math.pow(omegak0, 1/2)*5e6);
}

function T_Or_omegam0_z_sup(z, omegam0, omegaDE0, Or){
  return 1/(Math.pow(omegak0, 1/2)*z);
}

function T_Or_omegam0_omegak0(z, omegam0, omegaDE0, Or){
	return Math.log(1+z)/Math.pow(Number(omegaDE0), 1/2);
}
