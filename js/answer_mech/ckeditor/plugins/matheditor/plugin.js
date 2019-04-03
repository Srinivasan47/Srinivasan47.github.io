/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.plugins.add( 'matheditor', {
  icons: 'matheditor', // %REMOVE_LINE_CORE%
  init: function( editor ) {
    var command = editor.addCommand( 'matheditor', new CKEDITOR.dialogCommand( 'matheditor' ) );
    command.modes = { wysiwyg:1, source:1 };
    command.canUndo = false;
    command.readOnly = 1;

    editor.ui.addButton && editor.ui.addButton( 'matheditor', {
      label: 'MathEditor',
      command: 'matheditor',
      toolbar: 'matheditor'
    });

    var matheditorCommand = editor.addCommand( 'matheditor', {
      exec: function() {
        // get current editor name
        var name = CKEDITOR.currentInstance.name;
        var startElement = CKEDITOR.currentInstance.getSelection().getStartElement();
        var el = name.split(/_/);
        var par = '';
        if (startElement.getName() == 'img' && startElement.getAttribute('math_id') ){
          par = '&eid=' + startElement.getAttribute('math_id');
        }
        
        window.open('math_editor.html?name=' + name + par, 'MathEditor');
      }
    });
  }
});
