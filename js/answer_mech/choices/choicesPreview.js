
(function (){
	
	function choicePreview(){
		var that = this;
		function initView(options){
			new that.ChoicesView(options);
			var namespace = options.namespace;
			namespace.btn_reset.removeAttr('onClick');
		}
		
		this.initView = initView;
	}
	
	choicePreview.prototype = new choices();
	choicePreview.prototype.constructor = choicePreview;
	window.currentAMClass = choicePreview;
	
})();



