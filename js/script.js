$(document).ready(function() {
	
	try{Typekit.load({
		// show content after the fonts have been loaded and rendered
		active: function() {
			$('.main').animate({opacity: 1}, 3000);
		}
	});}catch(e){}

	var mobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	if( mobile == false ) {
	   
		// load fullpage
	    $.getScript( "js/jquery.fullPage.min.js", function() {
	    	$('.main').fullpage({
	   			css3: true,
	   			verticalCentered: false,
	   			resize: false,
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
		$.getScript( "js/three.min.js");
		
		// keep scrolling
		$('.title h1').click(function(){
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
		$('.js-work').click(function() {
			$.fn.fullpage.moveTo(4);
			return false;
		});
		$('.js-experiments').click(function() {
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

	}
   	
	// analytics
	$('#logo').on('click', function() {
		ga('send', 'event', '#logo', 'click');
	});
	
});