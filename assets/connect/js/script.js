/**
 * Based on http://letters-inc.jp/
 */

var WW = window.innerWidth,
	WH = window.innerHeight,
	looper,
	canvas = document.getElementById('canvas'),
	context = canvas.getContext('2d'),
	nodes,
	NUM_NODES = 100,
	minDist = 80,
	springAmount = 0.0002,
	rgb = '255,255,255';

function createNodes() {
	nodes = [];
	for (var i=0; i<NUM_NODES; i++) {
		var node = {
			radius: 1.5,
			x: Math.random()*WW,
			y: Math.random()*WH,
			vx: Math.random()*6-3,
			vy: Math.random()*6-3,
			mass: 1,
			update: function() {
				this.x += this.vx;
				this.y += this.vy;
				if (this.x > WW) {
					this.x = 0;
				} else if (this.x < 0) {
					this.x = WW;
				}
				if (this.y > WH) {
					this.y = 0;
				} else if (this.y < 0) {
					this.y = WH;
				}
			},
			draw: function() {
				context.fillStyle = "rgb("+rgb+")";
				context.beginPath();
				context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
				context.closePath();
				context.fill();
			}
		};
		nodes.push(node);
	}
}

function nodes_loop() {
	context.clearRect(0, 0, canvas.width, canvas.height);
    for (i=0; i<NUM_NODES; i++) {
        nodes[i].update();
    	nodes[i].draw();
    }
	for (i=0; i<NUM_NODES-1; i++) {
		var node1 = nodes[i];
		for (var j=i+1; j<NUM_NODES; j++) {
			var node2 = nodes[j];
			spring(node1, node2);
		}
	}
}

function spring(na, nb) {
	var dx = nb.x - na.x;
	var dy = nb.y - na.y;
	var dist = Math.sqrt(dx*dx + dy*dy);

	if (dist<minDist) {
		context.beginPath();
		context.strokeStyle = "rgba("+rgb+","+(1-dist/minDist)+")";
		context.moveTo(na.x, na.y);
		context.lineTo(nb.x, nb.y);
		context.stroke();
		context.closePath();
		var ax = dx*springAmount;
		var ay = dy*springAmount;
		na.vx += ax;
		na.vy += ay;
		nb.vx -= ax;
		nb.vy -= ay;
	}
}

function nodes_init() {
    createNodes();
	context.lineWidth = 1.5;
	looper = setInterval(nodes_loop, 1000/31);
}

nodes_init();

setTimeout(function() {
    document.body.className = "loaded";
}, 0);