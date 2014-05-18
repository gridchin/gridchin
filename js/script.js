$(document).ready(function() {

	$('.loading')
		.delay(500)
		.fadeOut(1000);
	
	$('#about header a').scrollTo({
	    offset: -250
	});
	
	$('#work header a').scrollTo({
	    offset: -280
	});
	
	$('#connect header a').scrollTo({
	    offset: -310
	});
	
	/*
	$('#logo').click(function() {
  		_gaq.push(['_trackEvent', 'Logo', 'Click', 'http://gridchin.com/#logo']);
	});
	*/
	
	$('#logo').on('click', function() {
	  ga('send', 'event', '#logo', 'click');
	});
	
});


$(document).scroll(function() {
	
	var work = $('.work li').length;
	var work_top = 400;
	var connect_top = 535;
	
	if( $(this).scrollTop() >= work_top ) {
        $('#work header').addClass("active");
    } else {
        $('#work header').removeClass("active");
    }
    
    if( $(this).scrollTop() >= work*22 + connect_top ) {
        $('#connect header').addClass("active");
    } else {
        $('#connect header').removeClass("active");
    }
       
});