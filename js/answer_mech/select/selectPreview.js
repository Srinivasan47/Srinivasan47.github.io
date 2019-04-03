(function (){
	
	function selectPreview(){
		var that = this;
		function initView(options){
			new that.MultiSelectView(options);
			var namespace = options.namespace;
			namespace.btn_reset.removeAttr('onClick');
		}
		
		this.initView = initView;
	}
	
	selectPreview.prototype = new select();
	selectPreview.prototype.constructor = selectPreview;
	window.currentAMClass = selectPreview;
	
})();