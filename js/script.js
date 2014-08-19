$(document).ready(function() {

	setTimeout(function() {
		$('.main').animate({
			opacity: 1
		},2000, function() {
			$('.main').removeClass('fade');
		});
	}, 1000);

	// scroll effect
	$(".main").onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		pagination: false,
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