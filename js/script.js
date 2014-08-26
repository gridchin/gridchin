$(document).ready(function() {
	
	try{Typekit.load({
		// this function will be called after the fonts have loaded and rendered
		active: function() {
			$('.main').animate({opacity: 1}, 3000);
		}
	});}catch(e){}

	// show iframes only on desktop
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') > 0) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	}else{
		// scroll effect
		$('.main').onepage_scroll({
			sectionContainer: 'section',
			responsiveFallback: 600,
			pagination: false,
			loop: false,
			updateUrl: true,
			responsiveFallback: 600,
			beforeMove: function(index) {
		    	$('.next').fadeOut('fast');
		    },
			afterMove: function (index) {				
				var title = $('.title.active').attr('id');
				if ($('#' + title).hasClass('active')) {
					$('#' + title + ' iframe').attr('src', 'assets/' + title + '/');
			    } else {
			        $('.title iframe').attr('src', '');
			    }			    
			}
		});
	}

	// keep scrolling
	$('.title h1').click(function(){
		$('.main').moveDown();
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
		$('.main').moveTo(2);
		return false;
	});
	$('.js-work').click(function() {
		$('.main').moveTo(4);
		return false;
	});
	$('.js-experiments').click(function() {
		$('.main').moveTo(6);
		return false;
	});
	$('.js-connect').click(function() {
		$('.main').moveTo(8);
		return false;
	});
	$('#modal a').click(function() {
		$('#modal').fadeOut();
		$('#menu').removeClass('close').addClass('menu');
		return false;
	});
	
	// arrows
	$('.up').click(function() {
		$('.main').moveTo(1);
		return false;
	});
	$('.next').click(function() {
		$(this).fadeOut('fast');
		$('.main').moveDown();
		return false;
	});

	// projects
	$('.work a').mouseover(function() {
		var project = $(this).attr('class');
		$('li.visible').removeClass('visible');
		$('li.' + project).addClass('visible');
	}).mouseout(function() {
		$('li.visible').removeClass('visible');
	});

	// iframe fix on FF
	var isFirefox = typeof InstallTrigger !== 'undefined'; 
	if (isFirefox == true) {
		$('.title iframe').css('pointer-events', 'none');
	};

	// analytics
	$('#logo').on('click', function() {
		ga('send', 'event', '#logo', 'click');
	});
	
});