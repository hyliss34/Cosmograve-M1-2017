
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
	age_sec = simpson(0, 4e6, Enoire_temps, omegam0, Number(omegaDE0), Number(Or),eps);
		
	age_sec = age_sec*(1./H0parsec);
	//on le passe en gigaannees
	age = age_sec/((3600*24*nbrjours)*Math.pow(10, 9));

	//on creer une variable limite en nombre de decimal pour l'affichage
	age_afficher = Number(age).toExponential(nbr_precision);
	age_sec_afficher = Number(age_sec).toExponential(nbr_precision);
		
	
	
	//on réinitialise les 3 champs pour eviter les erreurs d'affichage
	document.getElementById("resultat_ageunivers_ga").innerHTML = "Pas de Big Bang";
	document.getElementById("resultat_ageunivers_s").innerHTML = "Pas de Big Bang";
	document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
	document.getElementById("resultat_dureeuniv").innerHTML = "";
	
	if(age >= 0){
		document.getElementById("resultat_ageunivers_ga").innerHTML = age_afficher;
		document.getElementById("resultat_ageunivers_s").innerHTML = age_sec_afficher;
		}else{
		document.getElementById("resultat_ageunivers").innerHTML = "Pas de Big Bang";
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
	data = [];
		while (yrunge2 > 0.01 && yrunge2 < 5.){
			

				
			yrunge2 = rungekutta_neg(m);
			ymoinsrunge[0] = ymoinsrunge[1];
			res=age+m/H0engannee;
			ymoinsrungederiv[0] = ymoinsrungederiv[1];
			data.push({date:age+m/H0engannee,close:yrunge2});
			m=m-pas;
		}
		
	data.reverse();
	
	//on refait appel à rungekutta pour la deuxieme partie
	i = 0;
	pas = 0.0001;
	yrunge = 1;
	ymoinsrunge = [1,1];
	ymoinsrungederiv = [1,1];
	k = [0,0,0,0];
	j = [0,0,0,0];
	while (yrunge > -0.01 && yrunge < 5.){ // permet de boucler sur une valeur de reference
			if(yrunge<0.1){pas=Math.pow(10,-6);}
			yrunge = rungekutta(i); //position f(x) Runge-Kutta
			data.push({date:age+i/H0engannee,close:yrunge});
			i=i+pas;
	}
	
	//liste les differents cas pour afficher a l'utilisateur les informations
	if(age_afficher < 0){
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+Math.abs(age_afficher)+" Ga = "+Math.abs(age_sec_afficher)+" s";
		}else if(yrunge <= 0.){
		tBC = i/H0engannee;
		tBC_sec = Number(i/H0parsec).toExponential(nbr_precision);
		tBC_afficher = Number(tBC).toExponential(nbr_precision);
		total = (Number(age_afficher)+Number(tBC_afficher)).toExponential(nbr_precision);
		total_sec = (Number(age_sec_afficher)+Number(tBC_sec)).toExponential(nbr_precision);
		document.getElementById("resultat_bigcrunch").innerHTML = "Temps avant le Big Crunch = "+tBC_afficher+" Ga = "+tBC_sec+" s";
		document.getElementById("resultat_dureeuniv").innerHTML = (total)+" Ga = "+total_sec+" s";
		}else if(h0<0 && yrunge2 <= 0.){
		document.getElementById("resultat_bigcrunch").innerHTML = "Big Crunch &agrave; calculer";
		}else{
		document.getElementById("resultat_bigcrunch").innerHTML = "Pas de Big Crunch";
	}
	
	
	//on creer le graphique
	graphique_creation_noir();
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



//Sauvegarder= graphique
function Save_graph() {
	svgd = $("#graphique_svg");
	svg = svgd[0].outerHTML;
	canv = document.getElementById("Canv_enr");
	im = canv.toDataURL('image/png');
	canvg(canv,svg);
	
	im = canv.toDataURL('image/png');
    
	
	$("#tel").attr('href',im);
	document.getElementById("tel").click();
}

// Tracer graphique
function graphique_creation_noir(){
	chart = d3.select("#graphique_svg");
    wid1 = window.innerWidth;
    hei1 = window.innerHeight;
	
	if(wid1 > 960){
		wid = wid1*0.5;
		hei= wid*2/3;
	}
	else{
		wid = wid1*0.8;
		hei = wid*2/3;
	}
	
	
    c = d3.scale.linear().range([0, wid]);
    d = d3.scale.linear().range([hei, 0]);
    e = d3.svg.line().x(function(a) {return c(a.date)}).y(function(a) {return d(a.close)});
    b = d3.select("#graphique_svg").style("font-size", "12px").attr("width",wid+100).attr("height",hei+100).append("g").attr("transform", "translate(40,40)");
    f = d3.svg.axis().scale(c).orient("bottom").ticks(8).tickFormat(d3.format("d"));
    g = d3.svg.axis().scale(d).orient("left").ticks(10);

    data.forEach(function(a) {
        a.date = a.date;
        a.close = +a.close
    });
    c.domain(d3.extent(data, function(a) {
        return a.date
    }));
    d.domain([0, d3.max(data, function(a) {
        return a.close
    })]);
    b.append("g").attr("class", "x axis").attr("transform", "translate(0,"+hei+')').style({
        stroke: "black",
        fill: "none",
        "stroke-width": "1px",
        "shape-rendering": "crispEdges"
    }).call(f);
    
    1 == document.getElementById("grille").checked && (b.selectAll("line.x").data(c.ticks(10)).enter().append("line").attr("class",
        "x").attr("x1", c).attr("x2", c).attr("y1", 0).attr("y2", hei).style("stroke", "grey").style("stroke-width", "1").style("shape-rendering", "crispEdges").style("fill", "none"), b.selectAll("line.y").data(d.ticks(8)).enter().append("line").attr("class", "y").attr("x1", 0).attr("x2", wid).attr("y1", d).attr("y2", d).style("stroke", "grey").style("stroke-width", "1").style("shape-rendering", "crispEdges").style("fill", "none"));
    b.append("g").attr("class", "y axis").style({
        stroke: "black",
        fill: "none",
        "stroke-width": "1px",
        "shape-rendering": "crispEdges"
    }).call(g);
    b.append("text").attr("class", "legend_titre").attr("x", wid/2-100).attr("y", -15).attr("dy", ".3em").attr("transform", "rotate(0)").style("font-weight", "bold").style("font-size", "1.3em").text("Evolution du facteur d'\u00e9chelle r\u00e9duit");
    b.append("text").attr("class", "legend_axe").attr("x", wid/2).attr("y", hei+35).attr("dy", ".3em").attr("transform", "rotate(0)").style("font-weight", "bold").style("font-size", "1.2em").text("t (Ga)");
    b.append("text").attr("class", "legend_axe").attr("x", -hei/1.7).attr("y", -35).attr("dy", ".3em").attr("transform", "rotate(-90)").style("font-weight", "bold").style("font-size", "1.2em").text("a (t)");
    b.append("path").style("stroke", "steelblue").style("stroke-width", "2").style("fill", "none").attr("class", "line").attr("d", e(data));

}

function resize(){
	$("#graphique_svg").empty();
	graphique_creation_noir();
}