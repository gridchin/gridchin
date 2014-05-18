$(document).ready(function() {

	$('#logo, #content')
		.hide()
		.delay(500)
		.fadeIn(700);
	
	$('#about header a').scrollTo({
	    offset: -250
	});
	
	$('#work header a').scrollTo({
	    offset: -280
	});
	
	$('#connect header a').scrollTo({
	    offset: -310
	});
	
});

$(document).scroll(function() {
	
	var work = $('.work li').length;
	
	if( $(this).scrollTop() >= 472 ) {
        $('#work header').addClass("active");
    } else {
        $('#work header').removeClass("active");
    }
    
    if( $(this).scrollTop() >= work*22+658 ) {
        $('#connect header').addClass("active");
    } else {
        $('#connect header').removeClass("active");
    } 
       
});