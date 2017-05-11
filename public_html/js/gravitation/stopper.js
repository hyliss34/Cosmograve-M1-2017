function arret() {
	pause = true;
	//alert("on s'arrete");
	clearInterval(myInterval);
}
function pau(){
	pause = false;
	if (typeof myInterval !== 'undefined') {
		clearInterval(myInterval);
	}
}