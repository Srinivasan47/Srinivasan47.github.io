(function (){
	var namespace = {};
	function EmbeddedImageTest(){
		var that = this;
		function initView(options){
			new that.EmbeddedImageView(options);
			namespace = options.namespace;
			namespace.canvas_controller.get('currentObject').addStudentResponse();
		}
		
		this.initView = initView;
	}
	
	EmbeddedImageTest.prototype = new embeddedImage();
	EmbeddedImageTest.prototype.constructor = EmbeddedImageTest;
	window.currentAMClass = EmbeddedImageTest;
	
})();



