// JavaScript Document
var Rebond = false;

var cpt=0;
function animate(){
	element = document.params.traj;
	
	if (element[1].checked) {
		context.clearRect(0, 0, canvas.width, canvas.height);
		// Tracé du Rayon de Schwarzchild.
		context.beginPath();
		context.fillStyle = '#FF0000';
		context.arc(posX3, posY3, (scale_factor*2*m/rmax), 0, Math.PI*2);
		context.lineWidth="1";
		context.stroke();
		
		diametre_particule = 4;
	}else{
		diametre_particule = 2;
	}

	//Tracé de la particule
	context.beginPath();
	context.fillStyle = '#008B8B';
	context.arc(posX1, posY1+diametre_particule/2, diametre_particule/2, 0, Math.PI*2);
	context.lineWidth="1";
	context.fill();
	
	if(r0!=0.0) {
		temps_particule += dtau;
		r_part = rungekutta(dtau);

		if ( r_part < 2*m || r_part<r_phy) {
			alert("haaaaaaa !");
			// FAIRE BOUM
			arret();
			}

		phi = phi + (c*L*dtau/Math.pow(r_part,2));

		posX1 = x2part = scale_factor*r_part*Math.cos(phi)/rmax+canvas.width/2;
		posY1 = y2part = scale_factor*r_part*Math.sin(phi)/rmax+canvas.height/2;


		if(r_part < 0.0) {
			r_part = 0.0;
		}

		V= Math.pow(L*c/r_part,2)*(1-2*m/r_part);
		data2 = [];
		V=V*Math.pow(c,2);
		data2.push({date:r_part,close:V});
		update_graphique_2();
		
		dt = E*dtau*(1/(1-2*m/r_part));
		temps_observateur += dt;
		
		
		
		vrm=Math.pow(c*E,2)-Math.pow(c,2)*(1-2*m/r_part)*(1+Math.pow(L/r_part,2));
		vpm=Math.pow(c*L/r_part,2);
		vm=Math.sqrt(vrm+vpm);
		
		// Test en fonction de r à faire.
		// Si r plus petit que 10 metres plus de Warning.
		gm=-Math.pow(c,2)*(2*m/Math.pow(r_part,2)-2*Math.pow(L,2)/Math.pow(r_part,3)+6*m*Math.pow(L,2)/Math.pow(r_part,4))/2;
		gmp=-Math.pow(c,2)*(2*m/Math.pow(r_part+1,2)-2*Math.pow(L,2)/Math.pow(r_part+1,3)+6*m*Math.pow(L,2)/Math.pow(r_part+1,4))/2;
		fm=Math.abs(gm-gmp);
		
		document.getElementById("tp").innerHTML = 0;//temps_particule.toExponential(4);
		//document.getElementById("vp").innerHTML = vm.toExponential(3);						
		document.getElementById("ga").innerHTML = fm.toExponential(3);
		document.getElementById("r_par").innerHTML = r_part.toExponential(3);
		
		if ( Number(fm) <= 1 ) {
			
			document.getElementById('DivClignotante').innerHTML = " <img src='/Images/diodever.gif' height='14px' />";
			document.getElementById('DivClignotante').style.color="green";
		}else if ( 1 < Number(fm) && Number(fm) < 5) {
			
			document.getElementById('DivClignotante').innerHTML = " <img src='./Images/diodejaune.gif' height='14px' />"
			document.getElementById('DivClignotante').style.color="yellow";
		}else if ( Number(fm) >= 5 ) { 
			
			document.getElementById('DivClignotante').innerHTML = " <img src='./Images/dioderouge.gif' height='14px' />"
			document.getElementById('DivClignotante').style.color="red";
		}else{
			
			document.getElementById('DivClignotante').innerHTML = " Erreur";
		}
		
		if(r_part > rmax*1.2) {
			alert("La Particule sort de la zone d'affichage");
			arret();
		}
		
	}
	
}

function trajectoire() {
	cpt=cpt+1; // compteur pour gerer plusieurs clics de suite sur start
	
	// Si plus d'un clic => reset de tout et relance
	if(cpt==1){
	
	if(pause || debut){
		$("#grsvg_2").empty();	
		document.getElementById("tg2").style.display="table";
		document.getElementById("pau").innerHTML="Pause";
		pause=false;
		debut = false;
		//-------- Nos variables Globales ( de c à L) --------//
		c = 299792458;													
		G = 6.6742*Math.pow(10,-11);						
		r0 = Number(document.getElementById("r0").value);
		r_phy = Number(document.getElementById("r_phy").value);
		vphi = Number(document.getElementById("vphi").value); 
		M = Number(document.getElementById("M").value);
		vr = Math.sqrt(Math.pow(c,2)-Math.pow(vphi,2));//Number(document.getElementById("vr").value); 
		m = G*M/Math.pow(c,2);
		L = vphi*r0/c;

		scale_factor = 220;
		//--------------------------------------------------------------------------------------//
		if(r_phy > r0 ){
			alert("Lancer depuis l'interieur de l'horizon interdit");
			arret();
		}
		//Cette Partie traite le calcul de la trajectoire de la particule, dans son référentiel propre, et aussi dans celui de l'observateur//
		
		phi = 0.0;
		phi2 = 0.0;
		temps_chute_libre = Math.PI*r0*Math.sqrt(r0/(2*G*M))/2;
		dtau = temps_chute_libre/1000;
		E = Math.sqrt(Math.pow(vr/c,2)+Math.pow(L/r0,2)*(1-2*m/r0));//Math.sqrt(Math.pow(vr/c,2)+(1-2*m/r0)*(1+Math.pow(L/r0,2)));
		A_init = vr;
		r_init = r0;
		rayon_trouNoir = 2*m;
		rmax = 5000;//eq3d(L,m,E);
		dr = rmax/1000;
		data1 = [];
		data2 = [];
		temps_particule = 0; 
		temps_observateur = 0;
		bool = true;
		
		// Ici, les positions de départ de la particule, dans son référentiel et dans celui de l'observateur//
		if ( E > 1 ) { rmax=5*r0; }
		
		x1part=scale_factor*r0*Math.cos(phi)/rmax;
		y1part=scale_factor*r0*Math.sin(phi)/rmax;
		x1obs=scale_factor*r0*Math.cos(phi)/rmax;
		y1obs=scale_factor*r0*Math.sin(phi)/rmax;	   
		
		k=[0,0,0,0];
		j=[0,0,0,0];
		k2=[0,0,0,0];
		j2=[0,0,0,0];
	
		/* --- */
		r1=(L*(L-Math.sqrt(Math.pow(L,2)-12*Math.pow(m,2)))/(2*m));
		r2=(L*(L+Math.sqrt(Math.pow(L,2)-16*Math.pow(m,2)))/(4*m));
	


		ra=2*m*Math.pow(L,2);
		rb=((2*m/r0)-1)*Math.pow(L,2);
		X0 = 1/r0;
		rc = 2*m - Math.pow(L,2)*X0 +2*m*Math.pow(L*X0,2);
		DELTA = Math.pow(rb,2)- 4*ra*rc;
		r3=2*ra/(-rb-Math.sqrt(DELTA));
		
	
		if(L<2*Math.sqrt(3)*m){
			rmax=r0;}
		else if(L<=4*m && L>2*Math.sqrt(3)*m){
			if(Vr(r0)<=Vr(r1) && r0>r1){
				if(r3>r0){rmax=r3;}
				else if(r3<r0){
					rmax=r0;
				}
			}
			else {
				rmax = r0;
			}
		}
		else if(L>4*m){
			if(r0>r2){
				if(r3>r0){rmax=r3;}
				else if(r3<r0){rmax=r0;}
			}
			else{rmax=r0;}
		}

		if(rmax>100000){dtau*=10;}
		rmax*=1.2;
		dr= rmax/1000;
		
		/*
			L'enjeu ici est donc de calculer pour chaque itérations les coordonnées de la particule x2_part y2_part, x2_obs y2_obs 
			on a donc d'abord besoin de calculer r_part et r_obs par Runge-Kutta, puis d'en déduire le calucl de phi et phi2, le
			tout nous permettra donc de calculer x2 et y2 et les autres paramètres comme la force de marée en chaque point de la trajectoire
			*/
			canvas = document.getElementById("myCanvas");

			if(!canvas){
				alert("Impossible de récupérer le canvas");
				return;
			}

			context = canvas.getContext("2d");

			if(!context){
				alert("Impossible de récupérer le context");
				return;
			}

			context.clearRect(0, 0, canvas.width, canvas.height);

			diametre_particule = 2;

		// La position de départ est le milieu de la fenêtre d'affichage auquel on ajoute la position initiale de la particule.     
		
		posX1 = (canvas.width/2.0) + x1part;
		posY1 = (canvas.height/2.0) + y1part;
		
		posX2 = (canvas.width/2.0) + x1obs;
		posY2 = (canvas.height/2.0) + y1obs;
		
		posX3 = (canvas.width/2.0);
		posY3 = (canvas.height/2.0);
		
		// Ici on va créer l'animation avec setinerval, laquelle prend comme paramètres la fonction animate() définie ci-après et qui calcul les coordonnées de la particule à cahque instant.    
		
		myInterval = setInterval(animate,1000/300);
		var Dtau1 = 16*(temps_chute_libre/1000);
		var Dtau2 = (temps_chute_libre/1000)/16;
		
		document.getElementById('plusvite').addEventListener('click', function() {
			if (dtau >= Dtau1) {
				dtau = Dtau1;
			}
			else {
				dtau += dtau;
			}
		}, false);
		
		document.getElementById('moinsvite').addEventListener('click', function(){
			if (dtau <= Dtau2) {
				dtau = Dtau2;
			}
			else {
				dtau = dtau/2;
			}
		}, false);
		
		//Ici le bout de code pour le bouton Reset, quand on clique dessus, la fonction appelé efface le canvas en entier.
		document.getElementById('clear').addEventListener('click', function() {
			location.reload();
		}, false);
		
		// Tracé du Rayon de Schwarzchild.
		context.lineWidth="1";
		context.fillStyle = '#000000';
		if(((scale_factor*m/rmax)) < 3){
			alert("here");
			context.beginPath();
			context.moveTo(posX3-10,posY3);
			context.lineTo(posX3-3,posY3);
			context.stroke();
			context.beginPath();
			context.moveTo(posX3+3,posY3);
			context.lineTo(posX3+10,posY3);
			context.stroke();
			context.beginPath();
			context.moveTo(posX3,posY3-10);
			context.lineTo(posX3,posY3-3);
			context.stroke();
			context.beginPath();
			context.moveTo(posX3,posY3+3);
			context.lineTo(posX3,posY3+10);
			context.stroke();
		}else{
			context.beginPath();
			context.arc(posX3, posY3, ((scale_factor*2*m/rmax)), 0, Math.PI*2);
			context.stroke();
		}
		
		if(m < r_phy){
			context.beginPath();
			context.arc(posX3, posY3, (scale_factor*2*r_phy/rmax), 0, Math.PI*2);
			context.stroke();
		}
		
		$( document.params.traj[0] ).change(function() {
			// Tracé du Rayon de Schwarzchild si on change en cours de simulation
			context.lineWidth="1";
			context.fillStyle = '#000000';
			if(((scale_factor*m/rmax)) < 3){
				context.beginPath();
				context.moveTo(posX3-10,posY3);
				context.lineTo(posX3-3,posY3);
				context.stroke();
				context.beginPath();
				context.moveTo(posX3+3,posY3);
				context.lineTo(posX3+10,posY3);
				context.stroke();
				context.beginPath();
				context.moveTo(posX3,posY3-10);
				context.lineTo(posX3,posY3-3);
				context.stroke();
				context.beginPath();
				context.moveTo(posX3,posY3+3);
				context.lineTo(posX3,posY3+10);
				context.stroke();
			}else{

				context.beginPath();
				context.arc(posX3, posY3, 	(scale_factor*2*m/rmax), 0, Math.PI*2);
				context.stroke();
			}
		});
		
		document.getElementById("m").innerHTML = m.toExponential(3);
		document.getElementById("L").innerHTML = L.toExponential(3);
		document.getElementById("E").innerHTML = E.toExponential(3);
		
		for(r=rayon_trouNoir;r<rmax*1.1;r+=dr) {
			
			V= Math.pow(c*L/r,2)*(1-2*m/r);//(1-(2*m)/r)*(1+Math.pow(L/r,2))/c*c;
			V=V*Math.pow(c,2);
			data1.push({date:r,close:V});
			
		}

		V= Math.pow(c*L/rmax,2)*(1-2*m/rmax);//(1-(2*m)/rmax)*(1+Math.pow(L/rmax,2))/c*c;
		V=V*Math.pow(c,2);
		data2.push({date:rmax,close:V});
		
		graphique_creation_pot();
	}else{
		myInterval = setInterval(animate,1000/300);
	}
	}
	else{
		clearInterval(myInterval);
		dtau=0;
		canvas = document.getElementById("myCanvas");
		context=canvas.getContext("2d");
		context.clearRect(0,0,canvas.width,canvas.height);
		$("#grsvg_2").empty();
		pause=true;
		debut=true;
		cpt=0;
		trajectoire();
	}
}

function pausee(){
	if(pause==false){
		document.getElementById("pau").innerHTML ="Resume";
		dtau=0;
		pause=true;
	}
	else {
		pause=false;
		document.getElementById("pau").innerHTML ="Pause";
		if(rmax>100000){dtau = temps_chute_libre/100;}
		else{dtau = temps_chute_libre/1000;}
	}
}