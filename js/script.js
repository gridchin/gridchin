$(document).ready(function() {

	// show content
	// setTimeout(function() {
	$('.main').fadeIn(2000).removeClass('display');
	// },1000);
	
	// scroll effect
	$('.main').onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		pagination: false,
		loop: false,
		updateUrl: true,
		responsiveFallback: 600,
		beforeMove: function(index) {
	    	$('.next').fadeOut('fast');
	    }
	});

	// keep scrolling
	$('.title a').click(function(){
		$(".main").moveDown();
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
	$('#about').click(function() {
		$(".main").moveTo(2);
		return false;
	});
	$('#experiments, #experiments-anchor').click(function() {
		$(".main").moveTo(4);
		return false;
	});
	$('#work').click(function() {
		$(".main").moveTo(6);
		return false;
	});
	$('#connect').click(function() {
		$(".main").moveTo(18);
		return false;
	});
	$('#modal a').click(function() {
		$('#modal').fadeOut();
		$('#menu').removeClass('close').addClass('menu');
		return false;
	});
	
	// arrows
	$('.up').click(function() {
		$(".main").moveTo(1);
		return false;
	});
	$('.next').click(function() {
		$(this).fadeOut('fast');
		$(".main").moveDown();
		return false;
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