//formule appliquer aux calculs de rungekutta
function fonction(x){
	return (-Or/(Math.pow(x,3))-(0.5)*omegam0/(Math.pow(x,2))+x*omegalambda0);
}



function valeurtest4(n, n2){ // 4 valeur test pour Runge-Kutta
	k1[0]=fonction(n)*pas;
	j1[0] = n2*pas;
	
	k1[1]=fonction(n+j1[0]/2)*pas;
	j1[1] =(n2+k1[0]/2)*pas;
	
	k1[2]=fonction(n+j1[1]/2)*pas;
	j1[2] =(n2+k1[1]/2)*pas;
	
	k1[3]=fonction(n+j1[2])*pas;
	j1[3] =(n2+k1[2])*pas;
}

function rungekutta(n){ // Fonction Runge-Kutta
	ymoinsrunge[1]=ymoinsrunge[0]+(1./6.)*(j1[0]+2.*(j1[1]+j1[2])+j1[3]);
	ymoinsrunge[0] = ymoinsrunge[1];
	ymoinsrungederiv[1]=ymoinsrungederiv[1]+(1./6.)*(k1[0]+2.*(k1[1]+k1[2])+k1[3]);
	ymoinsrungederiv[0] = ymoinsrungederiv[1];
	
	valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);

	return ymoinsrunge[1];
}

function rungekutta_neg(n){
	
	// Fonction Runge-Kutta
	ymoinsrunge[1]=ymoinsrunge[0]-(1./6.)*(j1[0]+2.*(j1[1]+j1[2])+j1[3]);
	//ymoinsrunge[0] = ymoinsrunge[1];
	ymoinsrungederiv[1]=ymoinsrungederiv[0]-(1./6.)*(k1[0]+2.*(k1[1]+k1[2])+k1[3]);
	//ymoinsrungederiv[0] = ymoinsrungederiv[1];
	
	valeurtest4(ymoinsrunge[1], ymoinsrungederiv[1]);
	return ymoinsrunge[1];
}

function runge_adaptatif_neg(n){
	var delta_x = 1;
	var precision = 0.0001;
	while(delta_x > precision){
		//alert(delta_x+"	"+pas);
		run_0 = rungekutta_neg(n);
		pas = n/2;
		run_1 = rungekutta_neg(pas);
		run_1 = rungekutta_neg(run_1);
		delta_x = Math.abs(run_0 - run_1);
		console.log(delta_x);
	}
	run_final = rungekutta_neg(pas);
	//alert(pas);
	return run_final;
}

function runge_adaptatif(n){
	var delta_x = 1;
	var precision = 0.0001;
	while(delta_x > precision){
		//alert(delta_x+"	"+pas);
		var pas_temp = pas;
		run_0 = rungekutta(n);
		pas = pas/2;
		run_1 = rungekutta(n);
		run_1 = rungekutta(run_1);
		delta_x = Math.abs(run_0 - run_1);
	}
	pas *= 2;
	return run_0;
}