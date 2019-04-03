(function (){
	
	function hotspotTest(){
		var that = this;
		function initView(options){
			new that.HotSpotView(options);
			setTimeout(function(){
				options.namespace.canvas_controller.get('currentObject').setupHotSpotsGenerator();
				options.namespace.canvas_controller.get('currentObject').addStudentResponse();
        		},300);
			
		}
		
		this.initView = initView;
	}
	
	hotspotTest.prototype = new hotspot();
	hotspotTest.prototype.constructor = hotspotTest;
	
	window.currentAMClass = hotspotTest;
	
})();



