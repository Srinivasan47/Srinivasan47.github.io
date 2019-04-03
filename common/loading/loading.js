	//Displaying loading whenever an ajax call happends
	$(document).ajaxStart(function(){
		$('#progressBar').css({"display":"inline-block"});
		$('#progressBarOverlay').removeClass('hide');			
	});

	$(document).ajaxStop(function(){
		setTimeout(function(){
			$('#progressBar').css({"display":"none"});
			$('#progressBarOverlay').addClass('hide');
		},40);
	});
