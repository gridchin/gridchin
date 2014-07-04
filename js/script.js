$(document).ready(function() {

	$('#logo')
		.delay(300)
		.removeClass('fade');

	$(".main").onepage_scroll({
		sectionContainer: "section",
		responsiveFallback: 600,
		loop: true
	});
	
	// $('#logo').on('click', function() {
	// 	ga('send', 'event', '#logo', 'click');
	// });
	
});