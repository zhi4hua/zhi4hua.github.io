$(document).ready(function() {
	$("ul li").hover(function() {
		$('ul li ul').css('display', 'none');
		$('ul li ul').fadeIn(0.4*1000, function(){
			$(this).css('display', 'block');
		});
	});
});