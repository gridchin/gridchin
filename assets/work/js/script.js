/**
 * Based on http://letters-inc.jp/
 */

var c = document.getElementById('canvas');
ctx = c.getContext('2d'),
cw = c.width = window.innerWidth,
ch = c.height = window.innerHeight,
d2r = function(degrees){
    return degrees * (Math.PI / 360);
}
animate();

var baseArcRotation = 1,
	arc;

function draw(){
	ctx.save();
	ctx.translate(arc.x, arc.y);
	ctx.rotate(-d2r(arc.angle));
	ctx.beginPath();
	ctx.rect(-arc.size/2, -arc.size/2, arc.size, arc.size);
	ctx.strokeStyle = 'rgba(255,255,255,.3)';
	ctx.stroke();
	arc.angle += 20;
	arc.size *= 1.2;
	ctx.restore();      
}

function animate() {
    requestAnimationFrame( animate );
    redraw();
}

function redraw() {
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
<<<<<<< HEAD
	
	var interval = setInterval( redraw, 35 );

	setTimeout(function() {
	    $('body').addClass('loaded');
	}, 50);
=======
	baseArcRotation -= 0.2;
}
>>>>>>> Canvas-optimization

setTimeout(function() {
    document.body.className = "loaded";
}, 50);
