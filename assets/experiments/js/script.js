/**
 * @author http://letters-inc.jp/
 */

 $(function(){
	
	function getBrowser(){var ua = window.navigator.userAgent.toLowerCase(); var ver = window.navigator.appVersion.toLowerCase(); var name = 'unknown'; if (ua.indexOf("msie") != -1){if (ver.indexOf("msie 6.") != -1){name = 'ie ie6'; }else if (ver.indexOf("msie 7.") != -1){name = 'ie ie7'; }else if (ver.indexOf("msie 8.") != -1){name = 'ie ie8'; }else if (ver.indexOf("msie 9.") != -1){name = 'ie ie9'; }else if (ver.indexOf("msie 10.") != -1){name = 'ie ie10'; }else{name = 'ie'; } }else if(ua.indexOf('trident/7') != -1){name = 'ie ie11'; }else if (ua.indexOf('chrome') != -1){name = 'chrome'; }else if (ua.indexOf('safari') != -1){name = 'safari'; }else if (ua.indexOf('opera') != -1){name = 'opera'; }else if (ua.indexOf('firefox') != -1){name = 'firefox'; } return name; };
	
	subheadH = 1000;
	winW = $(window).width();
	winH = $(window).height();

	if(getBrowser() == 'chrome'){
		var STAR = 250;
	}else{
		var STAR = 150;
	}

	var mouseX = 0, mouseY = 0,
	windowHalfX = winW / 2,
	windowHalfY = winH / 2,
	SEPARATION = 200,AMOUNTX = 5,AMOUNTY = 5,camera, scene, renderer;

	about_init();
	about_animate();

	function about_init() {
		var container, separation = 100, amountX = 50, amountY = 50,particles, particle;
		camera = new THREE.PerspectiveCamera( 75, winW / subheadH, 1, 10000 );
		camera.position.z = 100;
		scene = new THREE.Scene();
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(winW, winH );
		$('#canvas').html(renderer.domElement);
		PI2 = Math.PI * 2;
		material = new THREE.SpriteCanvasMaterial( {
			color: 0x000000,
			program: function ( context ) {
				context.beginPath();
				// context.arc( 0, 0, 0, 0, PI2, true );
				context.fill();
			}
		});
		geometry = new THREE.Geometry();
		for ( var i = 0; i < STAR; i ++ ) {
			particle = new THREE.Sprite( material );
			particle.position.x = Math.random() * 2 - 1;
			particle.position.y = Math.random() * 2 - 1;
			particle.position.z = Math.random() * 2 - 1;
			particle.position.normalize();
			particle.position.multiplyScalar( Math.random() * 10 + 1000 );
			particle.scale.x = particle.scale.y = 10;
			scene.add( particle );
			geometry.vertices.push( particle.position );
		}
		var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0x000000, opacity: 0.1 } ) );
		scene.add(line);
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		window.addEventListener( 'resize', onWindowResize, false );
	}
	function onWindowResize() {
		windowHalfX = winW / 2;
		windowHalfY = subheadH / 2;
		camera.aspect = winW / subheadH;
		camera.updateProjectionMatrix();
		renderer.setSize( winW, subheadH);
	}
	function onDocumentMouseMove(event) {
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}
	function about_animate() {
		requestAnimationFrame( about_animate );
		about_render();
	}
	function about_render() {
		camera.position.x += ( mouseX - camera.position.x ) * .05;
		camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
		camera.lookAt( scene.position );
		renderer.render( scene, camera );
	}
	
});