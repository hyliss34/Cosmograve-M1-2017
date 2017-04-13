// JavaScript Document

function ouvre_calc_fr(){
	// recuperation des variables de la page simulation
	k = document.getElementById("k_p").value ;
	c = document.getElementById("c_p").value ;
	G = document.getElementById("G_p").value;
	h = document.getElementById("h_p").value;
	type = document.getElementById("typeannee").value;
	nbre = document.getElementById("nbr_precision").value;
	T0 = document.getElementById("T0calc").value;
	H0 = document.getElementById("H0calc").value;
	Om = document.getElementById("Omcalc").value;
	Ol = document.getElementById("Olcalc").value;
	Or = document.getElementById("Orcalc").value;
	Ok = document.getElementById("Okcalc").value;

	// Stockage des valeurs
	sessionStorage.setItem("T0",T0);
	sessionStorage.setItem("H0",H0);
	sessionStorage.setItem("Om",Om);
	sessionStorage.setItem("Ol",Ol);
	sessionStorage.setItem("Or",Or);
	sessionStorage.setItem("Ok",Ok);
	sessionStorage.setItem("k",k);
	sessionStorage.setItem("c",c);
	sessionStorage.setItem("G",G);
	sessionStorage.setItem("h",h);
	sessionStorage.setItem("type",type);
	sessionStorage.setItem("nb",nbre);

	// Ouverture de la fenêtre
	window.open("Calculs.html","c","width=600,height=650,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no,left=500");

}
function ouvre_calc_Noire_fr(){
	// recuperation des variables de la page simulation
	k = document.getElementById("k_p").value ;
	c = document.getElementById("c_p").value ;
	G = document.getElementById("G_p").value;
	h = document.getElementById("h_p").value;
	type = document.getElementById("typeannee").value;
	nbre = document.getElementById("nbr_precision").value;
	T0 = document.getElementById("T0calc").value;
	H0 = document.getElementById("H0calc").value;
	Om = document.getElementById("Omcalc").value;
	Ol = document.getElementById("Olcalc").value;
	Or = document.getElementById("Orcalc").value;
	Ok = document.getElementById("Okcalc").value;

	// Stockage des valeurs
	sessionStorage.setItem("T0",T0);
	sessionStorage.setItem("H0",H0);
	sessionStorage.setItem("Om",Om);
	sessionStorage.setItem("Ol",Ol);
	sessionStorage.setItem("Or",Or);
	sessionStorage.setItem("Ok",Ok);
	sessionStorage.setItem("k",k);
	sessionStorage.setItem("c",c);
	sessionStorage.setItem("G",G);
	sessionStorage.setItem("h",h);
	sessionStorage.setItem("type",type);
	sessionStorage.setItem("nb",nbre);

	// Ouverture de la fenêtre
	window.open("Calculs_noire.html","c","width=600,height=650,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no,left=500");

}

function param()
{var fene = window.open("Parametres.html","childWindow","width=550,height=450,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no");
}

function param_ang()
{window.open("Parameters_ang.html","childWindow","width=550,height=450,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no");
}


function enregis(){
	window.opener.document.getElementById("k_p").value=document.getElementById("k").value;
	window.opener.document.getElementById("c_p").value=document.getElementById("c").value;
	window.opener.document.getElementById("G_p").value=document.getElementById("G").value;
	window.opener.document.getElementById("h_p").value=document.getElementById("h").value;
	window.opener.document.getElementById("typeannee").value=document.getElementById("type_annee").value;
	window.opener.document.getElementById("nbr_precision").value=document.getElementById("nbre_chiffres").value;
	window.close();
	
}

function Reset_para() {
	document.getElementById("k").value = 1.38064852e-23;
	document.getElementById("c").value = 299792458;
	document.getElementById("G").value = 6.67385e-11;
	document.getElementById("h").value = 6.62607004e-34;
	document.getElementById("type_annee").value = "Grégorienne";
	document.getElementById("nbre_chiffres").value = 4;
	window.opener.document.getElementById("k_p").value=document.getElementById("k").value;
	window.opener.document.getElementById("c_p").value=document.getElementById("c").value;
	window.opener.document.getElementById("G_p").value=document.getElementById("G").value;
	window.opener.document.getElementById("h_p").value=document.getElementById("h").value;
	window.opener.document.getElementById("typeannee").value=document.getElementById("type_annee").value;
	window.opener.document.getElementById("nbr_precision").value=document.getElementById("nbre_chiffres").value;
	
}

function retour_simu(){
	window.close("Calculs.html");
	window.close("Calculs_ang.html");
}

function retour_noire(){
	window.close("Calculs_noire.html");
}
function retour() {
	window.close("Paramètres.html");
}

