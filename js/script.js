// show content after the fonts have been loaded and rendered
try {
	Typekit.load({
		active: function() {
			$('.main').removeClass('hidden');
			$('.layer').addClass('opacity');
			setTimeout(function() {
				$('.layer').hide();
				$('.js-opacity').removeClass('opacity');
			}, 3000);
		}
	});
} catch(e) {}

$(document).ready(function() {
	
	var mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if( mobile == false ) {

		// load fullpage
	    $.getScript( "js/jquery.fullPage.min.js", function() {
	    	$('.main').fullpage({
	   			css3: true,
	   			verticalCentered: false,
	   			resize: false,
				responsive: 767,
	   			continuousVertical: true,
	   			onLeave: function(index){
		            if(index == '1'){
		                $('.next').fadeOut('fast');
		            }
		        },
	   			afterLoad: function(index){
		            var title = $('.title.active').attr('id');
					if ($('#' + title).hasClass('active')) {
						$('#' + title + ' iframe').attr('src', 'assets/' + title + '/');
				    } else {
				        $('.title iframe').attr('src', '');
				    }
		        }
	   		});
	    });

	    // load threejs
		$.getScript( "js/three.min.js");
		
		// keep scrolling
		$('.title h1').click(function() {
			$.fn.fullpage.moveSectionDown();
			return false;
		})

		// menu
		// special thanks to @qrohlf for his help on Trianglify integration
		var closeModal = function() {
			$('#modal').fadeOut();
			$('#menu').removeClass('close').addClass('menu');
		};
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
			$('#menu').toggleClass('menu close');
			$('#modal').fadeOut();
			return false;
		});
		$('.js-about').click(function() {
			$.fn.fullpage.moveTo(2);
			closeModal();
			return false;
		});
		$('.js-experiments').click(function() {
			$.fn.fullpage.moveTo(4);
			closeModal();
			return false;
		});
		$('.js-connect').click(function() {
			$.fn.fullpage.moveTo(6);
			closeModal();
			return false;
		});
		$('.js-bg').click(function() {
			var pattern = Trianglify({
			    height: window.innerHeight,
			    width: window.innerWidth,
			    variance: '1',
			    x_colors: 'random',
			    cell_size: 33});
			pattern.canvas(bgCanvas);
			return false;
		});
		
		// arrow
		$('.next').click(function() {
			$(this).fadeOut('fast');
			$.fn.fullpage.moveSectionDown();
			return false;
		});

	}
   	
	// analytics
	$('#logo').on('click', function() {
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