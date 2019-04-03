$(document).ready(function(){
	var showAgainOnPortrait = true;
	function onResize(){
		if(navigator.userAgent.match(/(iPad|iPhone|iPod)/g) && window.innerWidth < 1024 && showAgainOnPortrait){
			$('#checkPortview').find('#check').off('click.check').on('click.check',function(){
				$(this).hasClass('checked') ? $(this).removeClass('checked') : $(this).addClass('checked');
			});
			$('#checkPortview').find('#ok').off('click.ok').on('click.ok',function(){
				if($('#checkPortview').find('#check').hasClass('checked')){
					showAgainOnPortrait = false;
				}
				hideModal();
			});
			$('#checkPortview').find('#close').off('click.close').on('click.close',function(){
				hideModal();
			});
			showModal();
		}else{
			hideModal();
		}
		
		function showModal(){
			$('#checkPortview').removeClass('hide');
			$('#checkPortviewoverlay').removeClass('hide');
		}
		
		function hideModal(){
			$('#checkPortview').addClass('hide');
			$('#checkPortviewoverlay').addClass('hide');
		}
	}
	if(window.attachEvent) {
	    window.attachEvent('onresize', function() {
	    	onResize();
	    });
	}
	else if(window.addEventListener) {
	    window.addEventListener('resize', function() {
	    	onResize();
	    }, true);
	}
	onResize();
});