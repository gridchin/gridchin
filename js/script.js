$(document).ready(function() {

	// $('.main')
	// 	.delay(300)
	// 	.removeClass('fade');

	// scroll effect
	$(".main").onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		pagination: false,
		loop: false,
		updateUrl: true,
		responsiveFallback: 600
	});
	
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