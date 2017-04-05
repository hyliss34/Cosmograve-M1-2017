// JavaScript Document

function ouvre_calc(){
	form = document.getElementById('calc_form');
	tes = document.getElementById("T0calc");
	window.open('',"Calculs");
	form.submit();
	tes.submit();
}

function param()
{window.open("Parametres.html","childWindow","width=500,height=450,toolbar=no,location=no,directories=no,menubar=no,scrollbars=no,copyhistory=no,resizable=no");
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
	window.open("Simulation_univers.html");
}
function retour() {
	window.close("Paramètres.html");
}