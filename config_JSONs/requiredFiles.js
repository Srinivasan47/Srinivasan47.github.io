/**
 *  Data used to load the files used :
 *  
 **/


var requiredFiles = function(ENV){

	var inputData = {
	  "root" : 
	    [
			{
				 "type":"link",
				 "url": ENV + "/css/reset.css" 
			},
			/*{
				 "type":"link",
				 "url": ENV + "/css/canvas.css" 
			},*/
			{
				 "type":"link",
				 "url": ENV + "/css/MyFontsWebfontsKit.css" 
			},
			{
				 "type":"link",
				 "url": ENV + "/css/passage.css" 
			},
			{
				 "type":"link",
				 "url": ENV + "/css/uniform.aristo.css" 
			},
			{
				 "type":"link",
				 "url": ENV + "/css/jquery.calculator.css" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/interface/jwplayer.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/interface/jwplayeriniter.js" 
			},
			{
				 "type":"script",
				 "url":ENV + "/js/jquery/jquery.calculator.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/jquery/jquery-ui-1.10.1.custom.min.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/jquery/jquery.easing.1.3.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/jquery/jquery.ui.touch-punch.min.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/interface/mathjax/MathJax.js?config=MML_HTMLorMML" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/soundmanager/soundmanager2-nodebug-jsmin.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/soundmanager/audiomanager.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/interface/fabric.min.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/interface/underscore-min.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/interface/backbone-min.js" 
			},
			/*{
				 "type":"script",
				 "url": ENV + "/js/interface/lift.js" 
			},*/
			/*{
				 "type":"script",
				 "url": global.URL_CONFIG.AM_JS_INTERFACE + "/flexcroll.js" 
			},*/
			{
				 "type":"script",
				 "url": ENV + "/js/answer_mech/canvasController.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/answer_mech/ckeditor/ckeditor.js" 
			},
			{
				 "type":"script",
				 "url": ENV + "/js/answer_mech/am.js" 
			}
	     ]
	  
	}
	return inputData;

}
