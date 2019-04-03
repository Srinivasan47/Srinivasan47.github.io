(function() {
	
	$('#mainWrapper').off('click.analytics').on('click.analytics', '[wg-analytics^="on"]', function(e) {
	    var analyticsName = $.trim(this.getAttribute('wg-analytics').split('|')[1]),
	        params = {
	            'userId' : $('.avatar-name').attr('studentId')
	        };        
	    console.log('@wg-analytics:');
	    console.log('eventType: '+e.type);
	    console.log('eventName: '+analyticsName);
	    console.log('params: ');
	    console.log(params);
	});
	
}());