

function lance_calc() {
	document.getElementById("ret").click();
	chargement();
	setTimeout(calcul,1000);
}
function calcul(){   // fonction principale de cosmograve
	
	
	
	//on recupere les valeurs des variables
	c = Number(document.getElementById("c_p").value);
	G = Number(document.getElementById("G_p").value);
	h = Number(document.getElementById("h_p").value);
	k = Number(document.getElementById("k_p").value);
	typeannee = document.getElementById("typeannee").value;
	nbr_precision = document.getElementById("nbr_precision").value;
	
	t0 = document.getElementById("T0").value;
	h0 = document.getElementById("H0").value;
	omegam0 = Number(document.getElementById("omegam0").value);
	omegalambda0 = Number(document.getElementById("omegalambda0").value);
	
	
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
	}
	
	//on s'occupe de changer la position du point sur le modèle
	PosX = 53+omegam0*230/3;
	PosY = 246;
	if(omegalambda0 >= 0){
		PosY += -omegalambda0*325/4.5;
		}else{
		PosY -= omegalambda0*325/4.5
	}
	
	PosX -= 1.5;
	PosY -= 1.5;


	//on calcule omegak
	omegak0 = 1-Or-omegam0-omegalambda0;
	

	omegak0 = omegak0.toFixed(10);

	$('#graphique_svg').empty();
	
	
	//donne les variables sous forme d'exposant si differente de 0
	if(omegalambda0 != 0){
		omegalambda0 = omegalambda0.toExponential(3);
	}
	if(omegak0 != 0){
		omegak0 = parseFloat(omegak0).toExponential(3);
		}else{
		omegak0 = 0;
	}
	if(Or != 0){
		Or = parseFloat(Or).toExponential(3);
		}else{
		Or = 0;
	}
	
	omegak0_afficher = Number(omegak0);
	
	//affiche les imformations sur les paramètres cosmologiques de la simulation


	
	eps = 0.00001;
	if(omegalambda0>1e6 || omegam0>1e6){
		eps=0.01;
	}
	if(omegam0 != 0 && omegalambda0 != 1){
		//calcul de l'age de l'univers
		if(Or != 0 && t0 >= 2){
			age_sec = simpson(0, 5e6,  fonction_integrale, omegam0, Number(omegalambda0), Number(Or) + (1/(h0*Math.pow(Or, 1/2)))*(1/(2*Math.pow(5e6, 2))),eps);
		}else{

			age_sec = simpson(0, 5e6, fonction_integrale, omegam0, Number(omegalambda0), Number(Or),eps);
		}
		age_sec = age_sec*(1./H0parsec);
		//on le passe en gigaannees
		age = age_sec/((3600*24*nbrjours)*Math.pow(10, 9));
		//on creer une variable limite en nombre de decimal pour l'affichage
		age_afficher = Number(age).toExponential(nbr_precision);
		age_sec_afficher = Number(age_sec).toExponential(nbr_precision);
		}else{
		age = NaN;
		age_aficher = NaN;
	}
	
	//on réinitialise les 3 champs pour eviter les erreurs d'affichage
	document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
	document.getElementById("resultat_ageunivers_s").innerHTML = "No Big Bang";
	document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
	document.getElementById("resultat_dureeuniv").innerHTML = "";
	
	if(age >= 0){
		document.getElementById("resultat_ageunivers_ga").innerHTML = age_afficher;
		document.getElementById("resultat_ageunivers_s").innerHTML = age_sec_afficher;
		}else{
		document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
		document.getElementById("resultat_ageunivers_s").innerHTML = "No Big Bang";
		age = 0;
	}
	
	//on regarde si on proche de la separatrice
	w = 0;
	v = 0;
	if(omegam0 <= 0.5){
		w=(1./3.)*Math.log(((1./omegam0)-1.)+Math.sqrt(((1./omegam0)-1.)*((1./omegam0)-1.)-1.0));
		OlER=4.*omegam0*cosh(w)*cosh(w)*cosh(w);
		}else{
		v =(1./3.)*Math.acos((1./omegam0)-1.);
		OlER=4.*omegam0*Math.cos(v)*Math.cos(v)*Math.cos(v);
	}
	proche_bleu = Math.abs(omegalambda0 - OlER) < 0.01;
	
	//permet de recuperer la valeur de la separatrice verte
	if(omegam0 >= 1){
		u_max=1./3.*(Math.acos((1./omegam0)-1));
		OlER_max=4.*omegam0*Math.cos((u_max+(4./3.)*Math.PI))*Math.cos((u_max+(4./3.)*Math.PI))*Math.cos((u_max+(4./3.)*Math.PI));
		}else{
		OlER_max = 0;
	}
	proche_vert = Math.abs(omegalambda0 - OlER_max) < 0.01;
	
	if(proche_bleu){
		alert("We are close to the separator");
		document.getElementById("grille").checked = false;
	}else if(proche_vert){
		alert("We are close to the separator");
	}
	
	//on fait appel a la methode de rungekutta pour calculer les points de la courbe
	console.log("ici");
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k1 = [0,0,0,0];
	j1 = [0,0,0,0];
	pas = 0.001;
	m = 0;
	yrunge = 1;
	yrunge2 = 1;
	data_x=[];
	data_y=[];
	if(omegam0 == 0 && omegalambda0 == 1){
		while (yrunge2 > 0.01 && yrunge2 < 5.){
			
				if(yrunge2<0.1){pas=Math.pow(10,-4);}
				
			yrunge2 = rungekutta_neg(m);
			ymoinsrunge[0] = ymoinsrunge[1];
			ymoinsrungederiv[0] = ymoinsrungederiv[1];
			if(yrunge2>0){
			data_x.push(age+m/H0engannee);
			data_y.push(yrunge2);
			}
			m=m-pas;
		}
		}else{
		while (yrunge2 > 0 && yrunge2 < 5.){
				if(yrunge2<0.25){pas=Math.pow(10,-5);}
				if(yrunge2>0.25){pas=Math.pow(10,-4);}
			yrunge2 = rungekutta_neg(m);
			ymoinsrunge[0] = ymoinsrunge[1];
			ymoinsrungederiv[0] = ymoinsrungederiv[1];
			if(yrunge2>0){
			data_x.push(age+m/H0engannee);
			data_y.push(yrunge2);
			}
			m=m-pas;
		}
	}
	data_x.reverse();
	data_y.reverse();
	
	//on refait appel à rungekutta pour la deuxieme partie
	i = 0;
	pas = 0.001;
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k1 = [0,0,0,0];
	j1 = [0,0,0,0];
	omegalambda0_bis = Number(omegalambda0);
	//suite rungekutta avec rajout du cas ou l'on serait sur la generatrice
	if(omegalambda0_bis < OlER_max){
		while (yrunge > -0.01 && yrunge < 50.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.25){pas=Math.pow(10,-5);}
			if(yrunge>0.25){pas=Math.pow(10,-4);}
			
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			if(yrunge>0){
			data_x.push(age+i/H0engannee);
			data_y.push(yrunge);
			}
			if(yrunge >= 50){alert("Universe with Big Crunch, Not entirely calculated for stablity reasons.")}
			i=i+pas;
		}
		}else if(omegalambda0_bis == OlER_max){
		while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-4);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			if(yrunge>0){
			data_x.push(age+i/H0engannee);
			data_y.push(yrunge);
			}
			i=i+pas;
		}
		alert("Close to the separator");
		}else{
		while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-4);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			if(yrunge>0){
			data_x.push(age+i/H0engannee);
			data_y.push(yrunge);
			}
			i=i+pas;
		}
	}
	
	//liste les differents cas pour afficher a l'utilisateur les informations
	if(age_afficher < 0){
		document.getElementById("resultat_bigcrunch").innerHTML = "Time before the Big Crunch = "+Math.abs(age_afficher)+" Ga = "+Math.abs(age_sec_afficher)+" s";
		}else if(yrunge <= 0.){
		tBC = i/H0engannee;
		tBC_sec = Number(i/H0parsec).toExponential(nbr_precision);
		tBC_afficher = Number(tBC).toExponential(nbr_precision);
		total = (Number(age_afficher)+Number(tBC_afficher)).toExponential(nbr_precision);
		total_sec = (Number(age_sec_afficher)+Number(tBC_sec)).toExponential(nbr_precision);
		document.getElementById("resultat_bigcrunch").innerHTML = "Time before the Big Crunch = "+tBC_afficher+" Ga = "+tBC_sec+" s";
		document.getElementById("resultat_dureeuniv").innerHTML = (total)+" Ga = "+total_sec+" s";
		}else if(h0<0 && yrunge2 <= 0.){
		document.getElementById("resultat_bigcrunch").innerHTML = "Big Crunch &agrave; calculer";
		}else{
		document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
	}
	
	
	//on creer le graphique
	Or=document.getElementById("resultat_omegar0").innerHTML;
	omegak0=document.getElementById("resultat_omegak0").innerHTML;
	graph = $("#graphique");
	Plotly.purge(graph);
	graph.empty();
	wid = graph.width();
	hei = wid*2/3;
	document.getElementById("graphique").style.height = hei;
	
	frame = [{name : 'Graphe', data: [{x: [],y: []}]}];
	frame[0].data[0].x=data_x;
	frame[0].data[0].y=data_y;

	maxx = getMaxTableau(data_x);
	maxy = getMaxTableau(data_y);
	minx = getMinTableau(data_x);
	miny = getMinTableau(data_y);
	
	tracer1 = [{
	x: frame[0].data[0].x,
  	y: frame[0].data[0].y,
  	line: {simplify: false},
	}];
	
	if(window.innerWidth>960){
	annots = [{
		x: 0,
		xref:'paper',
		xanchor:'center',
		y: 1,
		yref:'paper',
		yanchor:'bottom',
		text: '<b>Inputs</b><br>'+'T<sub>0</sub>:'+t0+'<br>'+'H<sub>0:</sub>'+h0+'<br>'+'Omega<sub>m0</sub>:'+omegam0+'<br>Omega<sub>L0</sub>:'+omegalambda0,
 
		showarrow:false,
	},
	{"xref": "paper", "yref": "paper", "text": "<b>Sorties<\/b><br>Omega<sub>r0<\/sub>:"+Or+"<br>Omega<sub>k0:</sub>"+omegak0+"<br>T<sub>BB</sub>:"+age_afficher+"(Ga)", "y":1, "x": 1,xanchor:'center',yanchor:'bottom', "showarrow": false}];
	}
	else {
		annots=[];
	}
	// tracer
	var img_png = d3.select('#png');
	var img_jpg = d3.select('#jpg');
	var img_svg = d3.select('#svg-1');
	
	Plotly.newPlot('graphique',tracer1, {
		title: "<b>Reduce scale factor evolution</b>",
		
	xaxis: {range: [minx,maxx],
		   title: 't (Ga)'},
		
		
	yaxis: {range: [miny,maxy],
		   title: 'a(t)'},
	annotations: annots,
	},{displaylogo: false});
	
	Plotly.newPlot('graphique_enr',tracer1, {
		title: "<b>Reduce scale factor evolution</b>",
		
	xaxis: {range: [minx,maxx],
		   title: 't (Ga)'},
		
		
	yaxis: {range: [miny,maxy],
		   title: 'a(t)'},
	annotations: annots,
	},{displaylogo: false}).then(function(gd){
    Plotly.toImage(gd)
      .then(function(url){
        img_png.attr("href", url);
        return Plotly.toImage(gd,{format:'png'})
		}).then(function(url){
        img_jpg.attr("href", url);
        return Plotly.toImage(gd,{format:'jpeg'})
		}).then(function(url){
        img_jpg.attr("href", url);
        return Plotly.toImage(gd,{format:'jpeg'})
		}).then(function(url){
		img_svg.attr("href", url);
		return Plotly.toImage(gd,{format:'svg'})})
		.then(function(url){
		img_svg.attr("href", url);
		return Plotly.toImage(gd,{format:'svg'})
	})
	
	
	});
		
      
		
	
	setTimeout(stop_spin,300);
	
}


function enre(){
	format=document.getElementById("format_enr");
	png=document.getElementById("png");
	jpg=document.getElementById("jpg");
	svg=document.getElementById("svg-1");
		if(format.options[0].selected){
			png.click();
		} 
	else if(format.options[1].selected){
			jpg.click();
	}
	else{
			svg.click();
	}
			
}


// Recherche max et min dans un tableau
function getMaxTableau(tableauNumerique) {
    return Math.max.apply(null, tableauNumerique);
}
function getMinTableau(tableauNumerique) {
    return Math.min.apply(null, tableauNumerique);
}