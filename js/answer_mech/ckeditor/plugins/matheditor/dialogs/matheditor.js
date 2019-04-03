/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.dialog.add( 'matheditor', function( editor ) {
	window.open('/math_editor.html', 'MathEditor');
	// {
	// 	title: 'Math Equation Editor',
	// 	minWidth: 640,
	// 	minHeight: 500,
	// 	contents: [
	// 		{
	// 		id: 'tab1',
	// 		label: '',
	// 		title: '',
	// 		expand: true,
	// 		padding: 0,
	// 		elements: [
	// 			{
	// 			type: 'html',
	// 			html: '<div id="app_header"><a href="javascript:;" onclick="save_equation_png();" class="check_action">Save equation PNG</a></div>' + 
	// 					'<div id="Div1" style="width:870px;height:400px;">' +
	// 			  		'<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0" width="100%" height="100%" id="editML" name="editML" align="middle">' +
	// 			  			'<param name="allowScriptAccess" value="always"/><param name="allowFullScreen" value="true"/><param name="loop" value="false"/><param name="quality" value="high" />' +
	// 			  			'<param name="flashVars" value="htmlId=1&amp;width=800&amp;height=400"/><param name="movie" value="/js/authoring/math_editor/MathMLEditor.swf" />' +
	// 			  			'<param name="flashVars" value="configUrl=/js/authoring/math_editor/configMathMLEditor.xml"/>' +
	// 			  			'<embed src="/js/authoring/math_editor/MathMLEditor.swf"' +
	// 			  				'flashVars="htmlId=1&amp;width=800&amp;height=400&amp;configUrl=/js/authoring/math_editor/configMathMLEditor.xml"' +
	// 			  				'loop="false"' +
	// 			  				'quality="high"' +
	// 			  				'id="editML"' +
	// 			  				'name="editML"' +
	// 			  				'align="middle"' +
	// 			  				'allowScriptAccess="always"' +
	// 			  				'allowFullScreen="true"' +
	// 			  				'type="application/x-shockwave-flash"' +
	// 			  				'pluginspage="http://www.adobe.com/go/getflashplayer" />' +
	// 			  		'</object>' +
	// 			  	'</div>' +
	// 			  	'<script>' +
	// 			    'function save_equation_png() { var equation = getSWF("editML").getBase64Image("PNG"); $("#hint_sshot img").attr("src", "data:image/png;base64," + equation); $("#hint_sshot").toggle(); }' +
	// 			    '$(function(){ focusEditor(); });'+
	// 			    '</script>'
	// 			}
	// 		]
	// 	}
	// 	],
	// 	buttons: [ CKEDITOR.dialog.cancelButton ]
	// };
});
