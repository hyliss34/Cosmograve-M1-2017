//formule utilisée pour le calcul de l'age de l'univers
function fonction_integrale(x, omegam0, omegalambda0, Or){
	return (1./(1.+x)) * Math.pow(Or*Math.pow(1.+x, 4) + omegam0*Math.pow(1.+x, 3) - (omegalambda0 + Or + omegam0 - 1.)*Math.pow(1.+x, 2) + omegalambda0, -1./2);
}

//formule utilisée pour le calcul de distance metrique
function fonction_dm(x, omegam0, omegalambda0, Or){
	return 1./Math.pow((Or*Math.pow((1.+x),4)+omegam0*Math.pow((1+x),3)+(1-Or-omegam0-omegalambda0)*Math.pow((1+x),2)+omegalambda0),(1./2.));
}

// pour calculer les omegas pour une valeur de z
function fonction_E(x,omegam0, omegalambda0, Or){return (Or*Math.pow(1.+x,4)+omegam0*Math.pow(1.+x,3)+(1-omegam0-omegalambda0-Or)*Math.pow(1.+x,2)+omegalambda0) ;}



//fonction de l'equation de simpson n = nombre de pas
function simpson(bornInf, bornSup, n, fonction, omegam0, omegalambda0, Or){
    var S = 0;
	var somme1 = 0.0;
	var somme2 = 0.0;
	var h = (bornSup-bornInf)/n;
	
	var xk1 = bornInf+h;
	var xk2 = bornInf+2.0*h;
	
    for (i=1; i<n; i+=2){
        somme1+=fonction(xk1, omegam0, omegalambda0, Or);
        somme2+=fonction(xk2, omegam0, omegalambda0, Or);
        xk1+=2.0*h;
        xk2+=2.0*h;
	}
	somme1+=fonction(xk1, omegam0, omegalambda0, Or);
	S=(h/3.0)*( fonction(bornInf, omegam0, omegalambda0, Or) + 4.0*somme1 + 2.0*somme2 + fonction(bornSup, omegam0, omegalambda0, Or));
	
    return S;
}