$(document).ready(function() {

	// $('.main')
	// 	.delay(300)
	// 	.removeClass('fade');

	$(".main").onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		pagination: false,
		loop: false,
		updateUrl: true,
		responsiveFallback: 600
	});
	
	// $('#logo').on('click', function() {
	// 	ga('send', 'event', '#logo', 'click');
	// });
	
});