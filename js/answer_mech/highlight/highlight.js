function highlight(){
var namespace,
text_highlight;
/**
 * Embedded Text Model
 * Class that defines the embedded Text model properties
 **/
var Highlight = Backbone.Model.extend({
  /*
   * Define the default values and the properties of this model
   */
  defaults : {
    //hardcoded default value 0 for initial object id - DO NOT CHANGE THIS VALUE
    id: 0,
    canvasId : 'canvas_hl',
    // track for the current option
    activeOption: null,
    //json containing the path to the file containing the initial data used for the exercise
    initialData: ''
  },
  /*
   * Initialize the model, load exercise initial data, define the canvas
   * @param {object} options - options used to load current model
   */
  initialize: function(options) {
    //options should contain the ID of the exercise to Edit or no ID if adding new exercise
    this.defaults = _.extend(this.defaults, options);

    //set the canvas object
    if (!namespace.canvas_controller) {
      namespace.canvas_controller = new CanvasController({canvasId: this.get('canvasId')});
      this.set({canvas: namespace.canvas_controller.get('canvas')});
    } else if (!this.get('canvas')) {
      this.set({canvas: namespace.canvas_controller.get('canvas')});
    }
    namespace.canvas_controller.clearCanvas();
    namespace.canvas_controller.setCurrentObjectElement(this);
    
    //if ID present in options object, we are editing an existing exercise
    //We load the image used and all the hot spots defined
    if (!_.isUndefined(options.id) && options.id) {
      this.set({id: options.id});
      //load the provided set of Data to prepare the exercise
      this.loadInitialDataSet();
    }
    this.get('namespace').btn_reset.css('display','block');
  },
  /*
   * Check that initial data set is provided and load all info required for this exercise to run
   */
  loadInitialDataSet: function() {
    if (!this.get('initialData')) {
      alert ('No data provided for current exercise');
      return;
    }
    
    var _this = this;
    //check if initial data format is object or string
    // get article data
    if (typeof this.get('initialData') == 'string' ) {
      //if string, read the file and get the initial data
      $.get(this.get('initialData'), function(data){ //parse js data
         jsonObject = inputData.root;
         _this.set('initialData', jsonObject);
         _this.load_data(jsonObject);
      });     
    } else {
      //if object, preload the values
      _this.load_data(this.get('initialData'));
    }
  },
  /**
   * Load initial data from JSON
   * @param {object} data - initial data
   **/
  load_data: function(data) {
    if (data.instructional_prompt == 'Type instructional prompt' || data.instructional_prompt == '') {
      data.instructional_prompt = namespace.DEFAULTEMBEDDEDTEXTINSTRUCTIONALPROMPT;
      this.set('initialData', data);
    }
    if (data.mechanical_prompt == 'Click or tap on an answer' || data.mechanical_prompt == '') {
      data.mechanical_prompt = namespace.DEFAULTEMBEDDEDTEXTMECHANICALPROMPT;
      this.set('initialData', data);
    }

    namespace.canvas_controller.renderQuestionHTML(data);
    namespace.canvas_controller.defaultViewselection();
    //hint box numbers 
    existingHints = data.hints_total;
    namespace.canvas_controller.set({totalAvailableHints: existingHints});
    $('#app_hints_navigator li#app_h1').addClass('hint_clickable');

    // creates highlight areas
    this.addExerciseText(data);

  },
  addExerciseText: function(data) {
    var passage = null;
    if(!_.isUndefined(data.assets_used) && data.assets_used) {
      var assets = data.assets_used;
      for(var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
        if(assets[assetIndex].asset_type == "passage") {
          passage = assets[assetIndex];
        }
      }
    }
    // if text is defined
    if((!_.isUndefined(data.custom_text) && data.custom_text) || ((passage != null) && !_.isUndefined(passage.text))) {
      this.get('namespace').canvas_container.append('<div id="highlight_text"></div>');
      $('#highlight_text').css({'width': (namespace.CANVASLEFTWIDTH-2*namespace.DEFAULTPARAGRAPHMARGINLEFT) + 'px', 'height': (namespace.CANVASHEIGHT-2*namespace.DEFAULTPARAGRAPHMARGINTOP) + 'px', 'left': namespace.DEFAULTPARAGRAPHMARGINLEFT + 'px', top: namespace.DEFAULTPARAGRAPHMARGINTOP + 'px', 'line-height': namespace.DEFAULTPARAGRAPHLINEHEIGHT + 'px'});
      // if split method exists
      if(!_.isUndefined(data.highlight_method) && (data.highlight_method != '')) {
        this.splitText(data.highlight_method);
      }
    }
  },
  splitText: function(method) {
    var initData = this.get('initialData');
    var passage = null;
    if(!_.isUndefined(initData.assets_used) && initData.assets_used) {
      var assets = initData.assets_used;
      for(var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
        if(assets[assetIndex].asset_type == "passage") {
          passage = assets[assetIndex];
        }
      }
    }
    if((passage != null) && !_.isUndefined(passage.text)) {
      if (_.isUndefined(passage.start)) {
        passage.start = 0;
      }
      if (_.isUndefined(passage.end)) {
        passage.end = strlen(returnStrippedHtml(passage.text));
      }
    }

    var exercise = (!_.isUndefined(initData.custom_text) && initData.custom_text) ? initData.custom_text : (((passage != null) && !_.isUndefined(passage.text)) ? returnStrippedHtml(passage.text).substring(passage.start, passage.end) : '');

    var answers = initData.highlight_available_answers.answer;
    switch(method) {
      case 'word':
      case 'sentence':
    	  var innerTable = '';
        for(var answersIndex = 0; answersIndex < answers.length; answersIndex++) {
          if(answers[answersIndex].text != null) {
        	  //$('#highlight_text').append('<span id="answer' + answers[answersIndex].index + '">' + answers[answersIndex].text + '</span> ');
        	  innerTable += '<span id="answer' + answers[answersIndex].index + '">' + answers[answersIndex].text + '</span> ';
          }        	
        }
        $('#highlight_text').append(innerTable);
        $('#highlight_text span').css('background-color','transparent');
      break;
      case 'paragraph':
        for(var paragraphCounter = 0; paragraphCounter < answers.length; paragraphCounter++) {
          if(answers[paragraphCounter].text != null)
        	$('#highlight_text').append('<p><span id="answer' + answers[paragraphCounter].index + '">' + answers[paragraphCounter].text + '</span></p>');
        }
      break;
      case 'phrase':
        // sort the array by answers positions
        answers.sort(function(a, b) {
          var a1 = a.index, b1 = b.index;
          if(a1 == b1) return 0;
          return a1 > b1? 1 : -1;
        });
        var textOffset = 0;
        var tempText = '';
        var tempAns = []; 
        for(var ansIndex = 0; ansIndex < answers.length ; ansIndex += 1){
        	tempAns.push(answers[ansIndex].text);
        }
        tempAns = this.restoreAnswers(tempAns);
        for(var phrasesCounter = 0; phrasesCounter < tempAns.length; phrasesCounter++) {
          //tempText += exercise.substring(textOffset, answers[phrasesCounter].start);
          tempText += '<span id="answer' + answers[phrasesCounter].index + '">' + tempAns[phrasesCounter] + '</span>';
          //textOffset += answers[phrasesCounter].end;
        }
        //tempText += exercise.substring(textOffset);
        $('#highlight_text').append(tempText);
        $('#highlight_text span').css('background-color','transparent');
      break;
    }
   
    /*$('#highlight_text span').css('background-color', namespace.DEFAULTTEXTCOLOR);*/
    $('#highlight_text span').click(function() {
      $(this).toggleClass('highlight_answer');
      if($(this).hasClass('highlight_answer')) {
        $(this).css('background-color', namespace.HIGHLIGHTEDTEXTCOLOR)
      } else {
        /*$(this).css('background-color', namespace.DEFAULTTEXTCOLOR)*/
    	  $(this).css('background-color','transparent');
      }
    })
    $('#highlight_text span').hover(
      function(){
        $(this).css('background-color', namespace.MOUSEOVERTEXTCOLOR);
      },
      function() {
        if($(this).hasClass('highlight_answer')) {
          $(this).css('background-color', namespace.HIGHLIGHTEDTEXTCOLOR)
        } else {
          /*$(this).css('background-color', namespace.DEFAULTTEXTCOLOR)*/
        	$(this).css('background-color','transparent');
        }
      }
    );
  },
  /*
   * Load hint for current exercise
   */
  loadHint: function(index) {
    if (this.get('initialData')) {
      namespace.canvas_controller.loadHint(index);
    } else {
      currentView.renderHint('No hints available - loading hint');
    }
  },
  trimText: function(text, method) {
    var words = text.split(' ');
    var textLength = ((method == 'paragraph') ? namespace.PARAGRAPHWORDSLENGTH : namespace.SENTENCEWORDSLENGTH);
    if(words.length <= textLength) {
      text = text;
    } else {
      text = '';
      for(var wordCounter = 0; wordCounter < textLength; wordCounter++) {
        text += words[wordCounter] + ' ';
      }
      text += '(...)';
    }
    return text;
  },
  //submit the choices to the server
  submitForm: function() {
    var answers = [];
    var _this = this;
    $('#highlight_text .highlight_answer').each(function() {
      var answer = {};
      answer.index = parseInt($(this).attr('id').replace('answer', ''));
      answer.text = _this.get('initialData').highlight_available_answers.answer[answer.index].text;
      if(!_.isUndefined(_this.get('initialData').highlight_method)) {
        answer.label = _this.trimText(answer.text, _this.get('initialData').highlight_method);
      }
      answers.push(answer);
    })
    return {
      selected_answers: answers, 
      hints_used: namespace.canvas_controller.get('totalHintsUsed')
    } 
  },
  /*
   * Parse check answer response
   * Should pop up the corresponding message
   * @param response - response object
   */
  parseResponse: function(response) {
  },
  resetQuestionForm: function() {
      var answers = $('#highlight_text')[0].children;
      var answerTotalCount = $('#highlight_text span').length;
      for (var answerCounter = 0; answerCounter < answerTotalCount; answerCounter++) {
		  $('#answer' + answerCounter).removeClass('highlight_answer');
		  $('#answer' + answerCounter).css('background-color','rgb(255, 255, 255)');
	  }	  
    //$('.embed_answers').val('');
    //$('.embed_answers').click();
  },
  
  /*
   * Restore the missign spaces while displaying the answers
   * @param availableAnswers - highlight available answers 
   */
  restoreAnswers: function(availableAnswers){
	  var initData = this.get('initialData'),
	  	  customTextFaulty = "",
	  	  splitPoints = [0];
	  for(var ansIndex = 0; ansIndex < availableAnswers.length; ansIndex += 1){
		  customTextFaulty += availableAnswers[ansIndex];
	  }
	  if(customTextFaulty.length < initData.custom_text.length){
		  for(var letterIndex = 0; letterIndex<customTextFaulty.length; letterIndex += 1){
			  if(customTextFaulty[letterIndex] != initData.custom_text[letterIndex]){
				  customTextFaulty = customTextFaulty.substring(0,letterIndex) + " " + customTextFaulty.substring(letterIndex);
				  splitPoints.push(letterIndex);
			  }
		  }
		  splitPoints.push(customTextFaulty.length);
		  if((splitPoints.length -1) == availableAnswers.length){
			  for(var splitIndex = 0; splitIndex < (splitPoints.length-1) ; splitIndex += 1){
				  availableAnswers[splitIndex] = customTextFaulty.slice(splitPoints[splitIndex],splitPoints[splitIndex+1]); 
			  }
		  }
	  }
	  return availableAnswers;
  }
});

/**
 * Embedded Text View
 * Class that controls the Embedded Text exercises
 **/
var HighlightView = Backbone.View.extend({
  defaults: {
    id: 0,
    //set canvas id
    canvasId : 'canvas_hl',
    //path to demo data file used in current demo
    demoData: ''
  },
  initialize: function(options) {
    //reset all global vars
    /*if (canvas_controller) {
      canvas_controller.get('canvas').clear();
	}
    canvas_controller = hot_spot = choice = select = math_graph = field_text = field_image = drag_drop = text_highlight = open_response = null;*/
    currentView = this;
    $('canvas.upper-canvas').remove();
    this.options = _.extend(this.defaults, options);
    this.render(); 
    this.afterRender(); 
  },
  /*
   * Load the canvas template used on the hot spot demo
   */
  render: function() {
    // Compile the template using underscore
    var template = _.template( $("#canvas_template").html(), { canvas_id: this.options.canvasId } );
    // Load the compiled HTML into the Backbone "el"
    this.$el.html( template );
  },
  afterRender: function() {
	  namespace = this.options.namespace;
	  namespace.canvas_controller = new CanvasController({
      canvasId: this.options.canvasId,
      maxWorkzoneLimit: namespace.CANVASWIDTH,
      namespace: namespace
    });

    text_highlight = new Highlight({
      id: this.options.id,
      canvasId: this.options.canvasId,
      initialData: this.options.demoData,
      namespace: namespace
    });
    text_highlight.get('canvas').calcOffset();
    console.log('xxx ', $('#highlight_text span').length);
    
    $('#highlight_text span:hover').css('background-color', namespace.MOUSEOVERTEXTCOLOR);
  },
  renderHint: function(text, sound, image) {
    //Pass variables in using Underscore.js Template

    var variables = {hint_message: text, hint_audio: sound};
    // Compile the template using underscore
    var template = _.template( $("#hintbox_template").html(), variables );
    //place template inside hintbox div
    $('#app_hint').html( template );
    if (image) {
      var variables2 = {hint_sketch: image};
      var template2 = _.template( $("#hintbox_overlay_template").html(), variables2 );
      $('#app_hint_overlay').html( template2 );
      $('#app_hint_overlay').css('display','block');
    }
  },
  loadHint: function(index) {
    text_highlight.loadHint(index);
    displayHintbox(index);
  }
});

this.Highlight = Highlight;
this.HighlightView = HighlightView;
}