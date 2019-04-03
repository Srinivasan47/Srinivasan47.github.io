(function (){
	function graphTest(){
		var that = this;
		function initView(options){
			new that.GraphsView(options);
		}
		
		this.initView = initView;
	}
	
	graphTest.prototype = new graph();
	graphTest.prototype.constructor = graphTest;
	
	window.currentAMClass = graphTest;
	
})();



