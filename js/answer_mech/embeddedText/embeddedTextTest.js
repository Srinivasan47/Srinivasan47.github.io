(function (){
	var namespace = {};
	function EmbeddedTextTest(){
		var that = this;
		function initView(options){
			new that.EmbeddedTextView(options);
			namespace = options.namespace;
			namespace.canvas_controller.get('currentObject').addStudentResponse();
		}
		
		this.initView = initView;
	}
	
	EmbeddedTextTest.prototype = new embeddedText();
	EmbeddedTextTest.prototype.constructor = EmbeddedTextTest;
	
	window.currentAMClass = EmbeddedTextTest;
	
})();



