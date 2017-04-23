function fonction(r) {

	return -Math.pow(c,2)*(2*m/Math.pow(r,2)-2*Math.pow(L,2)/Math.pow(r,3)+6*m*Math.pow(L,2)/Math.pow(r,4));

						}

function calcul_J_K(pas_de_temps,a,A) {

	j[0] = A*pas_de_temps;
	j[1] =(A+k[0]/2)*pas_de_temps;
	j[2] =(A+k[1]/2)*pas_de_temps;
	j[3] =(A+k[2])*pas_de_temps;


	k[0]=fonction(a)*(pas_de_temps/2);
	k[1]=fonction(a+j[0]/2)*(pas_de_temps/2);
	k[2]=fonction(a+j[1]/2)*(pas_de_temps/2);
	k[3]=fonction(a+j[2])*(pas_de_temps/2);

											}

function rungekutta(pas_de_temps) {

	r_init = r_init + (1/6)*(j[0]+2*(j[1]+j[2])+j[3]);				/* r1 et r2 sont les valeurs initiales à partir desquelles la métohde 
															   de runge kutta effectue le premiers calcul puis on itère. */
	A_init = A_init + (1/6)*(k[0]+2*(k[1]+k[2])+k[3]);
															
	calcul_J_K(pas_de_temps,r_init,A_init);

	return r_init;

								}

