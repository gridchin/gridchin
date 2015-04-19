// load typekit
try {
	Typekit.load();
} catch(e) {}

$(document).ready(function() {
	
	var mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if( mobile == false ) {

		// load fullpage
	    $.getScript( "js/jquery.fullPage.min.js", function() {
	    	$('.main').fullpage({
	   			verticalCentered: false,
				responsive: 767,
	   			continuousVertical: true,
	   			afterRender: function() {
	   				$('.main, .layer').toggleClass('opacity');
					setTimeout(function() {
						$('.layer').hide();
						$('.js-opacity').removeClass('opacity');
					}, 3000);
	   			},
	   			onLeave: function(index) {
		            if(index == '1'){
		                $('.next').fadeOut('fast');
		            }
		        }
	   		});
	    });

	    // load threejs
		$.getScript( "js/three.min.js");
		
		// keep scrolling
		$('body').on('click', '.title h1', function() {
			$.fn.fullpage.moveSectionDown();
			return false;
		})

		// menu
		// special thanks to @qrohlf for his help on Trianglify integration
		var closeModal = function() {
			$('#modal').fadeOut();
			$('#menu').removeClass('close').addClass('menu');
		};
		$(document).keydown(function() {
			if (event.keyCode == 27){  //escape key
				closeModal();
			}
		});
		var bgCanvas = document.getElementById('bg');
		$('body').on('click', '.menu', function() {
			var pattern = Trianglify({
			    height: window.innerHeight,
			    width: window.innerWidth,
			    variance: '1',
			    x_colors: 'random',
			    cell_size: 33});
			pattern.canvas(bgCanvas);
			$('#menu').toggleClass('menu close');
			$('#modal').fadeIn();
			return false;
		}).on('click', '.close', function() {
			closeModal();
			return false;
		}).on('click', '.js-about', function() {
			$.fn.fullpage.setScrollingSpeed(0);
			$.fn.fullpage.moveTo(2);
			closeModal();
			$.fn.fullpage.setScrollingSpeed(700);
			return false;
		}).on('click', '.js-experiments', function() {
			$.fn.fullpage.setScrollingSpeed(0);
			$.fn.fullpage.moveTo(4);
			closeModal();
			$.fn.fullpage.setScrollingSpeed(700);
			return false;
		}).on('click', '.js-connect', function() {
			$.fn.fullpage.setScrollingSpeed(0);
			$.fn.fullpage.moveTo(6);
			closeModal();
			$.fn.fullpage.setScrollingSpeed(700);
			return false;
		});
		$('.js-bg').on({
			mouseenter: function(){
				$(this).addClass("animated");
			}, click: function() {
				$(this).addClass("animated");
				var pattern = Trianglify({
				    height: window.innerHeight,
				    width: window.innerWidth,
				    variance: '1',
				    x_colors: 'random',
				    cell_size: 33});
				pattern.canvas(bgCanvas);
				return false;
			} 
		}).bind("webkitAnimationEnd mozAnimationEnd animationEnd", function(){
			$(this).removeClass("animated");
		});
		
		// arrow
		$('body').on('click', '.next', function() {
			$(this).fadeOut('fast');
			$.fn.fullpage.moveSectionDown();
			return false;
		});

	}
   	
	// analytics
	$('body').on('click', '#logo', function() {
		ga('send', 'event', '#logo', 'click');
	});

	// hotjar
	(function(f,b){
        var c;
        f.hj=f.hj||function(){(f.hj.q=f.hj.q||[]).push(arguments)};
        f._hjSettings={hjid:17566, hjsv:3};
        c=b.createElement("script");c.async=1;
        c.src="//static.hotjar.com/c/hotjar-17566.js?sv=3";
        b.getElementsByTagName("head")[0].appendChild(c); 
    })(window,document);
	
});