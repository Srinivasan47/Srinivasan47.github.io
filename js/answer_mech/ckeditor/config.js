/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config
	config.height = "50";
	config.width = "100%";
	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'basics', items : [ 'Bold','Italic', '-', 'Subscript','Superscript', '-', '-', 'matheditor' ] },//, '-', 'PasteFromWord', 'PasteText'
		{ name: 'paragraph', items: [ 'BulletedList', 'NumberedList' ] }
	];

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.extraPlugins = 'colorbutton,matheditor,pastefromword,pastetext,justify';
	
	config.autoGrow_minHeight = 50;
	config.pasteFromWordPromptCleanup = false;
	config.forcePasteAsPlainText = true;
	
	//config.removeButtons = 'Underline,Strike';
  config.removePlugins = 'resize,elementspath';

};


CKEDITOR.on('instanceReady', function(ev) {
	ev.editor.on('paste', function(evt) {
		//alert("Paste from Word detected. Auto-cleanup of characters activated.");
		evt.data['html'] = '<!--class="Mso"-->'+evt.data['html'];
	}, null, null, 9);
});
