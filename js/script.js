$(document).ready(function() {
	
	// show content after the fonts have been loaded and rendered
	try{Typekit.load({
		active: function() {
			$('.main, .menu').animate({opacity: 1}, 3000);
		}
	});}catch(e){}

	// load fullpage
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
        }
	});

	var mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if( mobile == false ) {

		$.getScript( "js/three.min.js");
		
		// keep scrolling
		$('.title h1').click(function() {
			$.fn.fullpage.moveSectionDown();
			return false;
		})

		// menu
		$('body').on('click', '.menu', function() {
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
			return false;
		});
		$('.js-experiments').click(function() {
			$.fn.fullpage.moveTo(4);
			return false;
		});
		$('.js-work').click(function() {
			$.fn.fullpage.moveTo(6);
			return false;
		});
		$('.js-connect').click(function() {
			$.fn.fullpage.moveTo(8);
			return false;
		});
		$('#modal a').click(function() {
			$('#modal').fadeOut();
			$('#menu').removeClass('close').addClass('menu');
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