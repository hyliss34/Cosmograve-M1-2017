// JavaScript Document

function Lancer_calc() {
	chargement();
	setTimeout(Calc,300);
}

function Calc(){

	
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
	omegaDE0 = Number(document.getElementById("omegaDE0").value);
	
	
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
	if(omegaDE0 >= 0){
		PosY += -omegaDE0*325/4.5;
		}else{
		PosY -= omegaDE0*325/4.5
	}
	
	PosX -= 1.5;
	PosY -= 1.5;
	

	//on calcule omegak
	omegak0 = 1-Or-omegam0-omegaDE0;
	
	Or = parseFloat(Or).toFixed(10);
	omegak0 = omegak0.toFixed(10);

	$('#graphique_svg').empty();
	
	
	//donne les variables sous forme d'exposant si differente de 0
	if(omegaDE0 != 0){
		omegaDE0 = omegaDE0.toExponential();
	}
	if(omegak0 != 0){
		omegak0 = parseFloat(omegak0).toExponential();
		}else{
		omegak0 = 0;
	}
	if(Or != 0){
		Or = parseFloat(Or).toExponential();
		}else{
		Or = 0;
	}
	
	omegak0_afficher = Number(omegak0).toFixed(6);
	
	//affiche les imformations sur les paramètres cosmologiques de la simulation
	document.getElementById("resultat_omegam0").innerHTML = omegam0;
	document.getElementById("resultat_omegar0").innerHTML = Or;
	document.getElementById("resultat_omegarlambda0").innerHTML = omegaDE0;
	document.getElementById("resultat_omegak0").innerHTML = Number(omegak0_afficher).toExponential();
	
	
	//calcul de l'age de l'univers
		
	//age_sec = simpson(0, 5e6, 1e8, Enoire_temps, omegam0, Number(omegaDE0), Number(Or)) + (1/(h0*Math.pow(Or, 1/2)))*(1/(2*Math.pow(5e6, 2)));

	eps = 0.00001;
	age_sec = simpson(0, 5e6, Enoire_temps, omegam0, Number(omegaDE0), Number(Or),eps);
		
	age_sec = age_sec*(1./H0parsec);
	//on le passe en gigaannees
	age = age_sec/((3600*24*nbrjours)*Math.pow(10, 9));

	//on creer une variable limite en nombre de decimal pour l'affichage
	age_afficher = Number(age).toExponential(nbr_precision);
	age_sec_afficher = Number(age_sec).toExponential(nbr_precision);
		
	
	
	//on réinitialise les 3 champs pour eviter les erreurs d'affichage
	document.getElementById("resultat_ageunivers_ga").innerHTML = "No Big Bang";
	document.getElementById("resultat_ageunivers_s").innerHTML = "No Big Bang";
	document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
	document.getElementById("resultat_dureeuniv").innerHTML = "";
	
	if(age >= 0){
		document.getElementById("resultat_ageunivers_ga").innerHTML = age_afficher;
		document.getElementById("resultat_ageunivers_s").innerHTML = age_sec_afficher;
		}else{
		document.getElementById("resultat_ageunivers").innerHTML = "No Big Bang";
		age = 0;
	}
	
	

	//on fait appel a la methode de rungekutta pour calculer les points de la courbe
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	pas = 0.0001;
	m = 0;
	yrunge = 1;
	yrunge2 = 1;
	data_x = [];
	data_y = [];
		while (yrunge2 > 0.01 && yrunge2 < 5.){	
			yrunge2 = rungekutta_neg(m);
			ymoinsrunge[0] = ymoinsrunge[1];
			res=age+m/H0engannee;
			ymoinsrungederiv[0] = ymoinsrungederiv[1];
			data_x.push(age+m/H0engannee);
			data_y.push(yrunge2);
			m=m-pas;
		}
		
	data_x.reverse();
	data_y.reverse();
	
	//on refait appel à rungekutta pour la deuxieme partie
	i = 0;
	pas = 0.001;
	yrunge = 1;
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-6);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			data_x.push(age+i/H0engannee);
			data_y.push(yrunge);
			i=i+pas;
	}
	
	//liste les differents cas pour afficher a l'utilisateur les informations
	if(age_afficher < 0){
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps since Crunch = "+Math.abs(age_afficher)+" Ga = "+Math.abs(age_sec_afficher)+" s";
		}else if(yrunge <= 0.){
		tBC = i/H0engannee;
		tBC_sec = Number(i/H0parsec).toExponential(nbr_precision);
		tBC_afficher = Number(tBC).toExponential(nbr_precision);
		total = (Number(age_afficher)+Number(tBC_afficher)).toExponential(nbr_precision);
		total_sec = (Number(age_sec_afficher)+Number(tBC_sec)).toExponential(nbr_precision);
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps before Big Crunch = "+tBC_afficher+" Ga = "+tBC_sec+" s";
		document.getElementById("resultat_dureeuniv").innerHTML = (total)+" Ga = "+total_sec+" s";
		}else if(h0<0 && yrunge2 <= 0.){
		document.getElementById("resultat_bigcrunch").innerHTML = "Big Crunch &agrave; calculer";
		}else{
		document.getElementById("resultat_bigcrunch").innerHTML = "No Big Crunch";
	}
	
	
	//on creer le graphique
	graphique_creation_noir_ang();
	setTimeout(stop_spin,300);
	//setTimeout(stop_spin,300);
}

// ENERGIE NOIRE
function Enoire_norm(x,omegam0, omegaDE0, Or){
	omegak0 = 1 - Or - omegam0 -omegaDE0;
	return (omegaDE0*Ya(x) + omegak0*(Math.pow((1.+x),2)) + omegam0*(Math.pow((1.+x),3)) + Or*(Math.pow((1.+x),4)));
}
function Enoire(x,omegam0, omegaDE0, Or) {
	omegak0 = 1 - Or - omegam0 -omegaDE0;
	return 1/Math.pow((omegaDE0*Ya(x) + omegak0*(Math.pow((1.+x),2)) + omegam0*(Math.pow((1.+x),3)) + Or*(Math.pow((1.+x),4))),1/2);

}

function Enoire_temps(x,omegam0, omegaDE0, Or){
	return Enoire(x,omegam0,omegaDE0,Or)/(1+x);
}



// Ya(x)

function Ya_a(x){
	w0 = Number(document.getElementById("omega0").value);
	w1 = Number(document.getElementById("omega1").value);
	
	
	return Math.exp(-3*(w1+w0+1)*Math.log(x) -(3*w1*(1-x)));
}

function Ya(x){
	w0 = Number(document.getElementById("omega0").value);
	w1 = Number(document.getElementById("omega1").value);
	
	
	return Math.exp(-3*(w1+w0+1)*Math.log(1/(1+x)) -(3*w1*(1-(1/(1+x)))));
}

// Tracer graphique
function graphique_creation_noir_ang(){
	graph = $("#graphique_sombre");
	Plotly.purge(graph);
	graph.empty();
	wid = graph.width();
	hei = wid*1.7/3;
	document.getElementById("graphique_sombre").style.height = hei;
	
	frame = [{name : 'Graphe', data: [{x: [],y: []}]}];
	frame[0].data[0].x=data_x;
	frame[0].data[0].y=data_y;

	maxx = getMaxTableau(data_x);
	maxy = getMaxTableau(data_y);
	minx = getMinTableau(data_y);
	miny = getMinTableau(data_y);
	
	console.log(miny+" "+maxy);
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
		text: '<b>Inputs</b><br>'+'T<sub>0</sub>:'+t0+'<br>'+'H<sub>0:</sub>'+h0+'<br>'+'w<sub>m0</sub>:'+omegam0+'<br>w<sub>DE0</sub>:'+omegaDE0,
 
		showarrow:false,
	},
	{"xref": "paper", "yref": "paper", "text": "<b>Outputs<\/b><br>w<sub>r0<\/sub>:0<br>w<sub>k0:<\/sub>0<br>T<sub>BB<\/sub>:1.3803e+1(Ga)", "y":1, "x": 1,xanchor:'center',yanchor:'bottom', "showarrow": false}];
	}
	else {
		annots=[];
	}
	// tracer
	var img_png = d3.select('#png');
	var img_jpg = d3.select('#jpg');
	var img_svg = d3.select('#svg-1');
	
	Plotly.newPlot('graphique_sombre',tracer1, {
		title: "<b>Reduce Sacle factor evolution</b>",
		
	xaxis: {range: [minx,maxx],
		   title: 't (Ga)'},
		
		
	yaxis: {range: [miny,maxy],
		   title: 'a(t)'},
	annotations: annots,
	},{displaylogo: false});
	
	Plotly.newPlot('graphique_enr',tracer1, {
		title: "<b>Reduce Sacle factor evolution</b>",
		
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