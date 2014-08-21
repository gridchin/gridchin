$(document).ready(function() {

	// show content
	// setTimeout(function() {
	$('.main').fadeIn(2000).removeClass('display');
	// },1000);
	
	// scroll effect
	$(".main").onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		pagination: true,
		loop: false,
		updateUrl: true,
		responsiveFallback: 600
	});

	$('.title a').click(function(){
		$(".main").moveDown();
		return false;
	})
	
	// iframe fix on FF
	var isFirefox = typeof InstallTrigger !== 'undefined'; 
	if (isFirefox == true) {
		$('.title iframe').css('pointer-events', 'none');
	};

	// ANALYTICS, activate later
	// $('#logo').on('click', function() {
	// 	ga('send', 'event', '#logo', 'click');
	// });
	
});