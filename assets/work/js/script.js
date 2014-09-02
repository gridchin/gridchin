/**
 * @author http://letters-inc.jp/
 */

var c = document.getElementById('canvas');
ctx = c.getContext('2d'),
cw = c.width = window.innerWidth,
ch = c.height = window.innerHeight,
d2r = function(degrees){
    return degrees * (Math.PI / 360);
}

var baseArcRotation = 1;
var arc;
draw = function(){
	ctx.save();
	ctx.translate(arc.x, arc.y);
	ctx.rotate(-d2r(arc.angle));
	ctx.beginPath();
	ctx.rect(-arc.size/2, -arc.size/2, arc.size, arc.size);
	ctx.strokeStyle = 'rgba(0,0,0, 0.2)';
	ctx.stroke();
	arc.angle += 20;
	arc.size *= 1.2;
	ctx.restore();      
}

function start() {
	requestAnimationFrame(start);
	arc = {
		x: cw/2,
		y: ch/2,
		size: 1,
		angle: baseArcRotation
	}
	c.width = c.width;
	var times = 60;
	while(times--){
		draw();
	}
	baseArcRotation -= 0.2;
}

var myReq = requestAnimationFrame(start);
function stop() { 
	window.cancelAnimationFrame(myReq);
}

//requestAnimationFrame(start);

setTimeout(function() {
    $('body').addClass('loaded');
}, 0);