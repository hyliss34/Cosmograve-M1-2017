// JavaScript Document
function chargement(){
	$("#gif").fadeIn();
var opts = {
            lines: 12, // The number of lines to draw
            length: 7, // The length of each line
            width: 3, // The line thickness
            radius: 8, // The radius of the inner circle
            color: '#000', // #rgb or #rrggbb
            speed: 1, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
			className: 'spinner',
			top: '100%',
			left: '50%',
			scale:0.7,
			position: 'absolute',
        }

var target = document.getElementById("gif");
var spinner = new Spinner(opts).spin(target);
	target.appendChild(spinner.el);
	$(target).data('spinner',spinner);
return true;
};

function stop_spin(){
	$("#gif").data('spinner').stop();
}