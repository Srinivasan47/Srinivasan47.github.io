(function (){
	function openResponseTest(){
		var that = this;
		function initView(options){
			new that.OpenResponseView(options);
		}
		
		this.initView = initView;
	}
	
	openResponseTest.prototype = new openresponse();
	openResponseTest.prototype.constructor = openResponseTest;
	
	window.currentAMClass = openResponseTest;
	
})();



