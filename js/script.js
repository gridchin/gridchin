$(document).ready(function() {

	// show iframes only on desktop
	if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') == -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
	}else{
		$('#about').append('<iframe src="assets/about/"></iframe>');
		$('#work').append('<iframe src="assets/work/"></iframe>');
		$('#experiments').append('<iframe src="assets/experiments/"></iframe>');
		$('#connect').append('<iframe src="assets/connect/"></iframe>');
	}

	// show content
	// setTimeout(function() {
	$('.main').fadeIn(2000).removeClass('display');
	// },1000);
	
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
	    }
	    // ,
	    // afterMove: function(3_index) {
	    //   alert('hi');
	    // }
	});

	// keep scrolling
	$('.title a').click(function(){
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