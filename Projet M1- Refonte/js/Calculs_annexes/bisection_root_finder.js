/*                                                      ---------------------  CALCULS INVERSES POUR LE DM ------------------------------------                            */

function get_root_dm(){
	au=149597870700;
    c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	h0 = Number(document.getElementById("H0_annexes").value); 
	omegam0 = Number(document.getElementById("omegam0_annexes").value);
	omegalambda0 = Number(document.getElementById("omegalambda0_annexes").value);
	omegalambda0 = omegalambda0.toExponential();
	H0parsec = h0*1000/((au*(180*3600))/Math.PI*Math.pow(10, 6));
	dm = document.getElementById("dm_racine").value;
	eps = 0.00001;
	Or = 0;
	z = bisection_method_dm(dm, omegam0, omegalambda0, Or, eps);
	if(z != 0){
		z = z.toExponential(3);
	}
	
	document.getElementById("z_racine").innerHTML= z;
	
}

function bisection_method_dm (dm, omegam0, omegalambda0, Or, eps){
  omegak0=(1-omegam0-omegalambda0-Or);
  f_x = formule_z(omegak0);
	za = 0;
	zb = 1e8;
	iterations_max = 1000; //nombres de calculs max permises avant de s'arrêter lorsqu'on ne trouve pas de soluce
	i = 0; //compteur de nombre d'iterations	
	ex = 0.0000001; //indicateur de tolérence d'erreur
	

	
	dm_za = f_x(za, omegam0, omegalambda0, Or, eps);
	
	
	
	dm_zb = f_x(zb, omegam0, omegalambda0, Or, eps);
	if (dm > dm_zb){
		return 1/0.0;  //retourne NaN
		}
	
	while (i<iterations_max){
	  zc = (zb+za)/2.0;
	  
	  dm_zc = f_x(zc, omegam0, omegalambda0, Or, eps);
	  if (((zb-za)/2)<ex){
	    return zc;
	  }
	  else if ((dm_zc-dm)*(dm_zb-dm)< 0){
	    za = zc;
	    dm_za = dm_zc;
	  }
	  else{
	    zb = zc;
	    dm_zb = dm_zc;
	  }
	  //i = i+1;
	}
	alert("taliho");
	return "échec de calcul";
}






  


//formules pour dm basé sur omegaK0
  
  function Sk_sin_x(bornSup, omegam0, omegalambda0, Or, eps){
    integ = Math.sqrt( Math.abs(omegak0)) * simpson(0, bornSup, fonction_dm, omegam0, Number(omegalambda0), Number(Or), eps);
    return (c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sin(integ);
  }
  
  function Sk_x(bornSup, omegam0, omegalambda0, Or, eps){
    return (c/(H0parsec) * simpson(0, bornSup, fonction_dm, omegam0, Number(omegalambda0), Number(Or), eps));
  }

  function Sk_sinh_x(bornSup, omegam0, omegalambda0, Or, eps){
    integ = Math.sqrt( Math.abs(omegak0)) * simpson(0, bornSup, fonction_dm, omegam0, omegalambda0, Or, eps);
    return (c/(H0parsec*Math.sqrt( Math.abs(omegak0) ))) * Math.sinh(integ);
  }


//choix de la formulepour calculer dm
function formule_z(omegak0){
		//d騁ermine quelles formules sont utilent pour la distance metrique, omegak positif 0 ou negatif
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









/*                                                      ---------------------  CALCULS INVERSES POUR LE TEMPS  ------------------------------------                            */

//pour calculer t
function get_root_t(){
  
}