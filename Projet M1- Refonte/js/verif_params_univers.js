//Limites imposées pour les donnees d'entrees
$( "#T0" ).change(function() {
	if(document.getElementById("T0").value > 1e99){
		alert("La valeur maximale de T0 est de 1e99, elle a été redéfinie à 1e99.");
		document.getElementById("T0").value = 1e99;
	}
});

$( "#H0" ).change(function() {
	if(document.getElementById("H0").value > 1e99){
		alert("La valeur maximale de H0 est de 1e99, elle a été redéfinie à 1e99.");
		document.getElementById("H0").value = 1e99;
	}
});

$( "#omegam0" ).change(function() {
	if(document.getElementById("omegam0").value > 1e99){
		alert("La valeur maximale de \u03A9_m0 est de 1e99, elle a été redéfinie à 1e99.");
		document.getElementById("omegam0").value = 1e99;
	}
});

$( "#omegalambda0" ).change(function() {
	if(document.getElementById("omegalambda0").value > 1e99){
		alert("La valeur maximale de \u03A9_\u039B 0 est de 1e99, elle a été redéfinie à 1e99.");
		document.getElementById("omegalambda0").value = 1e99;
	}
});