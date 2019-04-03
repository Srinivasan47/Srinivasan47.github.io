(function (){
	function highlightTest(){
		var that = this;
		function initView(options){
			new that.HighlightView(options);
		}
		
		this.initView = initView;
	}
	
	highlightTest.prototype = new highlight();
	highlightTest.prototype.constructor = highlightTest;
	
	window.currentAMClass = highlightTest;
	
})();



