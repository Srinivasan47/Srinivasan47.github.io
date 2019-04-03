function openresponse(){
	var namespace,
		open_response,
		waggleProperties = window.waggleui.model.getWaggleProperties();

/**
 * Open Response Model
 * Class that defines the open response model properties
 **/
var OpenResponse = Backbone.Model.extend({
  /*
   * Define the default values and the properties of this model
   */
  defaults : {
    //hardcoded default value 0 for initial object id - DO NOT CHANGE THIS VALUE
    id: 0,
    canvasId : 'canvas_or',
    // track for the current option
    activeOption: null,
    //json containing the path to the file containing the initial data used for the exercise
    initialData: ''
  },
  
  config: {
	  markup: {
		//print and save buttons
		    printButton : '<a id="printResponse" onclick="printResponseDetails(false)"><span id="printResponseIcon"></span><span class="print-response-text">Print<span></a>',
		    saveButton : '<a id="saveResponse" href="javascript:;" onclick="saveExercise()"><span id="saveResponseIcon"></span><span class="save-response-text">Save</span></a>',
		    editorarea : '<textarea id="openResponseField"></textarea>',
		    sendToTeacher : 'Send To Teacher'
	  },
	  messages: {
		  	noDataFound : 'No data provided for current exercise',
		  	defaultSavedMessage : waggleProperties['label.openResponse.save.popup']
	  }
  },
  
  initialize: function(options) {
    //options should contain the ID of the exercise to Edit or no ID if adding new exercise
	  $('.canvas-container').css('display', 'none');
    this.defaults = _.extend(this.defaults, options);
    if(this.defaults.completeData.reviewDetails){
	    /*fleXenv.fleXcrollMain("ams-right-panel");	
		if(document.getElementById("ams-right-panel").fleXcroll) {		
			document.getElementById("ams-right-panel").fleXcroll.setScrollPos(false,0);
		};*/
    	setTimeout(function(){fleXenv.fleXcrollMain("app_exercise_left1")}, 100);
		//fleXenv.fleXcrollMain("app_exercise_left1");	
		if(document.getElementById("app_exercise_left1").fleXcroll) {		
			document.getElementById("app_exercise_left1").fleXcroll.setScrollPos(false,0);
		};
		$('.question_area_html').hide();
    }
    this.get('namespace').btn_reset.css('display','none');
    
    
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
      if(!this.defaults.completeData.reviewDetails)
    	  namespace.canvas_container.append(this.config.markup.printButton + this.config.markup.saveButton);
      this.loadInitialDataSet();
    }
   
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
      $.get(this.get('initialData'), function(inputDatainputData){ //parse js data
         jsonObject = inputData.root;
         _this.set('initialData', jsonObject);
         this.loadData(jsonObject);
      });     
    } else {
      //if object, preload the values
      this.loadData(this.get('initialData'));
    }
  },
    /**
     * Define the method called once the xml data is retrieved or after the json data is defined
     * */
  loadData: function(data) {
	    var _this = this;
    	if(this.defaults.completeData.reviewDetails){
	    	var skillDetails='',
	    		ratingDetail='';
	    	var reviewdetail = _this.defaults.completeData.reviewDetails;
	    	ratingDetail += _.template( $("#Review_skill_rating").html(), { teacher_response: _this.defaults.completeData.reviewDetails.reviewComments.comments,
					 													    rating: _this.defaults.completeData.reviewDetails.reviewComments.rating});
	    	$('.ams-body-content').append(ratingDetail);
	    	var addedClass = reviewdetail.reviewComments.rating.replace(/\s/g,'-').replace('!','');
	    	$('.skill-great-holder span:first-child').addClass('skill-'+ addedClass.toLowerCase());
	    	
	    	for(var skillCounter = 0; skillCounter<_this.defaults.completeData.reviewDetails.rubricScores.length; skillCounter++){
	    		skillDetails += _.template( $("#Review_skills_details").html(), {skill_count: _this.defaults.completeData.reviewDetails.rubricScores[skillCounter].scale,
	    																		skill_title: _this.defaults.completeData.reviewDetails.rubricScores[skillCounter].skill,
	    																		skill_desc: _this.defaults.completeData.reviewDetails.rubricScores[skillCounter].description});
	    	}
	    	$('.skill-slider-holder').append(skillDetails);
	    	setTimeout(function(){fleXenv.fleXcrollMain("ams-right-panel")}, 100);	
			if(document.getElementById("ams-right-panel").fleXcroll) {		
				document.getElementById("ams-right-panel").fleXcroll.setScrollPos(false,0);
			}
	    	/*switch(reviewdetail.reviewComments.rating){
	    		case "Good":
	    			$('.skill-slider #good').addClass('achived');
	    		break;
	    		case "Great!":
	    			$('.skill-slider #great').addClass('achived');
	    		break;	
	    		case "Needs Improvement":
	    			$('.skill-slider #needImprovement').addClass('achived');
	    		break;
	    		case "Keep at it!":
	    			$('.skill-slider #keepatit').addClass('achived');
	    		break;
	    	}*/
	    	
    	} else{
    		$('#question_area_html').css('display', 'block');
    	    $('#app_exercise_check').attr('onclick', 'checkExercise()');
		     if (data.instructional_prompt == namespace.DEFAULT_OPENRESPONSE_INSTRUCTIONALPROMPT || data.instructional_prompt == '') {
		        data.instructional_prompt = namespace.DEFAULT_OPENRESPONSE_INSTRUCTIONALPROMPT;
		        _this.set('initialData', data);
		      }
		     if (data.mechanical_prompt == namespace.DEFAULT_OPENRESPONSE_MECHANICALPROMPT || data.mechanical_prompt == '') {
		        data.mechanical_prompt = namespace.DEFAULT_OPENRESPONSE_MECHANICALPROMPT;
		        _this.set('initialData', data);
		     }
		     _this.createEditor();
			 $('#cke_openResponseField #cke_1_contents div:first-child').attr({ 'id' : 'flexcroll_box' });
			 if(!_.isUndefined(data.studentResponse) && !_.isUndefined(data.studentResponse.responseData)){
				  _this.loadWYSIWYGTextareafromJSON(data.studentResponse.responseData);
			 }
      }
      existingHints = data.hints_total;
      namespace.canvas_controller.set({totalAvailableHints: existingHints});
      $('#app_hints_navigator li#app_h1').addClass('hint_clickable');
      $('#app_exercise_check img').remove();
      if(this.defaults.completeData.reviewDetails){
    	  if((!_.isUndefined(this.defaults.completeData.lastItem)) && (this.defaults.completeData.lastItem == "true")){
    		  $('#app_exercise_check').html('Exit');
    		  $('#app_exercise_check').removeAttr('onclick').attr('onclick', 'exitAssignment()');
    	  } else {
    		  $('#app_exercise_check').html('Next');
    		  $('#app_exercise_check').removeAttr('onclick').attr('onclick', 'nextGradedAssignment()');
    	  }
    	  
      } else {    	  
    	  $('#app_exercise_check').html(waggleProperties['label.ams.openResponse.sendToTeacher']);
      }
      $('#app_exercise_check').addClass('submit-assignment');
      namespace.canvas_controller.renderQuestionHTML(data);
      namespace.canvas_controller.defaultViewselection();
      saveSelection = function(win) {
          var sel = win.getSelection(), ranges = [];
          if (sel.rangeCount) {
              for (var i = 0, len = sel.rangeCount; i < len; i++) {
                  ranges.push(sel.getRangeAt(i));
              }
          }
          return ranges;
      };

      restoreSelection = function(win, savedSelection) {
          var sel = win.getSelection();
          sel.removeAllRanges();
          for (var i = 0, len = savedSelection.length; i < len; i++) {
              sel.addRange(savedSelection[i]);
          }
      };
      function isIE () {
		  var myNav = navigator.userAgent.toLowerCase();
		  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}
      setTimeout(function(){
		  //fleXenv.fleXcrollMain(document.getElementsByClassName('cke_contents')[0]);
		  if (isIE()) {
			  var heightContent;
		  /*$('#cke_openResponseField .cke_contents div:first-child').bind('keyup keydown', function(){
			  
			  if( heightContent != $('#cke_1_contents_contentwrapper').height() ){
				  var savedCursor = saveSelection(window);
				  document.getElementsByClassName('cke_contents')[0].fleXcroll.scrollContent(10,50);
				  updateflexcroll();
				  restoreSelection(window,savedCursor);
				  heightContent = $('#cke_1_contents_contentwrapper').height();
			  }
			  else{
				  heightContent = $('#cke_1_contents_contentwrapper').height();
			  }
		  });*/
		  }
		  else{
			  var heightContent;
			  /*$('#cke_openResponseField .cke_contents div:first-child').bind('keyup keydown', function(){
				  if( heightContent != $('#cke_1_contents_contentwrapper').height() ){
				  var savedCursor = saveSelection(window);
				  document.getElementsByClassName('cke_contents')[0].fleXcroll.scrollContent(10,50);
				  setTimeout(function(){
				  document.getElementsByClassName('cke_contents')[0].fleXcroll.scrollContent(10,50);
				  _this.updateflexcroll();
				  },1500);
				  document.getElementsByClassName('cke_contents')[0].fleXcroll.scrollContent(10,50);
				  restoreSelection(window,savedCursor);
				  }
				  else{
					  heightContent = $('#cke_1_contents_contentwrapper').height();
				  }
			  });*/
		  }
	 },2000);
      
  },
  
  
  createEditor: function(){
	  //var _this = this;
	  namespace.canvas_container.append('<textarea id="openResponseField"></textarea>');
	  CKEDITOR.replace( 'openResponseField', {
          toolbarGroups: [
            {name: 'basics', items : [ 'Bold','Italic','Underline','-','NumberedList','BulletedList','-','Superscript','Subscript', '-', 'Cut', 'Copy', 'Paste']}
          ],
          extraPlugins: 'divarea'
	  });
  },
  
  /*
   * Update all flexcrolls in the page
   */
  updateflexcroll: function(){
	  //fleXenv.updateScrollBars();
	  document.getElementsByClassName('cke_contents')[0].fleXcroll.updateScrollBars();
	  //console.log('key pressed - need to update scrollbar');
  },
  
  exitAssignment: function(){
	$('#goBackMessagePopUp').css("display",'block');
	$('#windowOverlay').removeClass("hide");
  	//$(".overlay").css("display",'block');
  	$('#goBackMessagePopUp').css('z-index','1000');
  	//$(".overlay").css('z-index','800');
  	$('.footer-dropup').css('z-index','1000');
  },
  
  nextGradedAssignment: function(){
	  console.log('Next Graded Assignment is loading');
	  loadNextExercise();
  },
  
  /*
   * Load response into CK Editor from JSON
   */
  loadWYSIWYGTextareafromJSON: function(responseData){
	  responseData = responseData.replace(/↵/ig, "");
	  if(_.isUndefined(responseData)||(responseData.length == 0)){
		  responseData = '<p></p>';
	  }
	  CKEDITOR.instances['openResponseField'].setData(responseData);
  },
  
  printResponseDetails: function(isGraded){
	  var _this = this,
	  	  date = new Date(),
	  	  month = date.getMonth()+1,
	  	  day = date.getDate(),
	  	  dateOutput = (month<10 ? '0' : '') + month + '/' + (day<10 ? '0' : '') + day + '/' + date.getFullYear(),
	  	  printStudentMessageHtml = '',
	  	  className = window.waggleui.model.getCurrentClassObject().className,
	  	  printScript;
	  console.log("Print student message ");
	  mywindow = window.open();
	  if(isGraded){
		  var skillsdetails = '';
		  for(var skillCounter = 0; skillCounter<_this.defaults.completeData.reviewDetails.rubricScores.length; skillCounter++){
			  skillsdetails += _.template( $("#openresponseSkillsPrint").html(), {skill_scale: _this.defaults.completeData.reviewDetails.rubricScores[skillCounter].scale,
																				  skill_title: _this.defaults.completeData.reviewDetails.rubricScores[skillCounter].skill,
																				  skill_desc: _this.defaults.completeData.reviewDetails.rubricScores[skillCounter].description});
	      }
		  printStudentMessageHtml = _.template( $('#openresponseGradedPrint').html(), {student_name: _this.defaults.completeData.profile.studentDisplayName,
				 																 	   class_name: className,
				 																 	   date: dateOutput,
				 																 	   goal_name: _this.defaults.completeData.assignment.info.assignmentName,
				 																 	   instructional_prompt: _this.defaults.completeData.item.instructional_prompt,
				 																 	   teacher_comments: _this.defaults.completeData.reviewDetails.reviewComments.comments,
				 																 	   how_you_did: skillsdetails,
				 																 	   student_response: _this.defaults.completeData.item.studentResponse.responseData});
		  printScript = '$(function(){var content_height = 820; var page = 1;function buildNewsletter(){if($("#newsletterContent").contents().length > 0){$page = $(".page_template:first").clone().addClass("page").css("display", "block");$page.find(".footer span#pageNo").append(page);$("body").append($page);page++;$(\'#newsletterContent\').columnize({columns: 1,target: ".page:last .content",overflow: {height: content_height,id: "#newsletterContent",doneFunc: function(){buildNewsletter();}}});$(".page .footer span.totalPage").html(\'of \' + (page-1) +\'.\');}} setTimeout(buildNewsletter, 300);})';
		  printStudentMessageHtml = '<html><head><title>Print Student Response</title><link href="css/ams/canvas.css" type="text/css" rel="stylesheet" /></head><body><div class="page_template"><div class="header">' + _this.defaults.completeData.profile.studentDisplayName+ '</div><div class="content"></div><div class="footer"><span id="pageNo">Page </span><span class="totalPage">of </span><span class="copyright"> &copy; '+date.getFullYear()+' Learning.</span></div></div><div id="newsletterContent">' + printStudentMessageHtml + '</div><script type="text/javascript" src="js/vendor/jquery.js"></script><script type="text/javascript" src="js/jquery/jquery.columnizer.js"></script><script>'+printScript+'</script></body></html>';
		  print(printStudentMessageHtml);
	  } else {
		  printStudentMessageHtml = _.template( $('#openresponsePrint').html(), {student_name: _this.defaults.completeData.profile.studentDisplayName,
																				 class_name: className,
																				 date: dateOutput,
																				 goal_name: _this.defaults.completeData.assignment.info.assignmentName,
																				 instructional_prompt: _this.defaults.completeData.item.instructional_prompt,
																				 student_response: CKEDITOR.instances['openResponseField'].getData()});
		  printScript = '$(function(){var content_height = 820; var page = 1;function buildNewsletter(){if($("#newsletterContent").contents().length > 0){$page = $(".page_template:first").clone().addClass("page").css("display", "block");$page.find(".footer span#pageNo").append(page);$("body").append($page);page++;$(\'#newsletterContent\').columnize({columns: 1,target: ".page:last .content",overflow: {height: content_height,id: "#newsletterContent",doneFunc: function(){buildNewsletter();}}});$(".page .footer span.totalPage").html(\'of \' + (page-1) +\'.\');}} setTimeout(buildNewsletter, 300);})';
		  printStudentMessageHtml = '<html><head><title>Print Student Response</title><link href="css/ams/canvas.css" type="text/css" rel="stylesheet" /></head><body style="height:auto;"><div class="page_template"><div class="header">' + _this.defaults.completeData.profile.studentDisplayName+ '</div><div class="content"></div><div class="footer"><span id="pageNo">Page </span><span class="totalPage">of </span><span class="copyright"> &copy; '+date.getFullYear()+' Learning.</span></div></div><div id="newsletterContent">' + printStudentMessageHtml + '</div><script type="text/javascript" src="js/vendor/jquery.js"></script><script type="text/javascript" src="js/jquery/jquery.columnizer.js"></script><script>'+printScript+'</script></body></html>';
		  print(printStudentMessageHtml);
	  }
      
	  function isIE () {
		  var myNav = navigator.userAgent.toLowerCase();
		  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
		}
	  
	  function print(printTemplate){
		  mywindow.document.open();
		  mywindow.document.write(printTemplate);
		  if (isIE()) {
			  mywindow.document.location.reload();
			 } 
		  mywindow.document.close();
		  setTimeout(function(){mywindow.print();},1000);
		  return true;
	  }
  },
  
  showFeedback: function(data){
	  if(!_.isUndefined(data) && !_.isUndefined(data.studentResponseId) && data.studentResponseId){
	    this.get('initialData')['studentResponseId'] = data.studentResponseId;
	  }
	  var messages = {};
	  messages = {
		  message : waggleProperties['label.openResponse.sendToTeacher.popup']
	  };	  
	  this.showpopup(messages);
  },
  
  showSaveFeedback: function(data){
	  if(data.studentResponseId){
	    this.get('initialData')['studentResponseId'] = data.studentResponseId;
	  }
	  showGrowlMessage(this.config.messages.defaultSavedMessage);
  },
  
 showpopup: function(messages){
	  var popupdetail = '';
	  if((!_.isUndefined(this.defaults.completeData.lastItem)) && (this.defaults.completeData.lastItem == "true")){
		  $('#openResponseLaseItemPopup').toggleClass('hide');
	  } else {
		  popupdetail += _.template( $("#showOpenResponsePopup").html(), {popup_text: messages.message});
	  }
	  $('#windowOverlay').removeClass("hide");
	  //$('#windowOverlay').css({'display':'block','z-index':'50'});
	  $('#windowOverlay').css({'z-index':'50'});
	  $('body').append(popupdetail);
  },
  
  closepopup: function(){
	  //$('#windowOverlay').css('display', 'none');
	  $('#windowOverlay').addClass("hide");
	  $( "#openResponsePopup" ).remove();
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
  //submit the choices to the server
  submitForm: function() {
	var submitResponse;
	if(this.defaults.completeData.reviewDetails){
		submitResponse =  {
				hints_used: namespace.canvas_controller.get('totalHintsUsed')
		}
	}else{
		submitResponse =  {
				studentResponse: CKEDITOR.instances['openResponseField'].getData(),
				hints_used: namespace.canvas_controller.get('totalHintsUsed')
		}
		if(this.get('initialData').studentResponseId){
			submitResponse['studentResponseId'] = this.get('initialData').studentResponseId;
		}
	}
    return submitResponse;
  },
  /*
   * Parse check answer response
   * Should pop up the corresponding message
   * @param response - response object
   */
  parseResponse: function(response) {
  },

  resetQuestionForm: function() {    
  }
});

/**
 * Open Response View
 * Class that controls the Open Response exercises
 **/
var OpenResponseView = Backbone.View.extend({
  defaults: {
    id: 0,
    //set canvas id
    canvasId : 'canvas_or',
    //path to demo data file used in current demo
    demoData: '',
    completeData: ''
  },
  initialize: function(options) {
    //reset all global vars
   /* if (namespace.canvas_controller) {
      namespace.canvas_controller.get('canvas').clear();
    }
    canvas_controller = hot_spot = choice = select = math_graph = field_text = field_image = drag_drop = open_response = null;*/
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
	  var template='';
	  if(!this.options.completeData.reviewDetails){
		   template = _.template( $("#canvas_template").html(), { canvas_id: this.defaults.canvasId } );
	  }else{
		   template += _.template( $("#canvas_template").html(), { canvas_id: this.defaults.canvasId } );
		   template += _.template( $("#Review_details").html(), { student_response:this.options.completeData.item.studentResponse.responseData,
			   													  instructional_prompt:this.options.completeData.item.instructional_prompt} ); 
		   
	  }
    //var template = _.template( $("#canvas_template").html(), { canvas_id: this.defaults.canvasId } );
    
    // Load the compiled HTML into the Backbone "el"
    //this.$el.html( template );
    this.$el.html( template );
  },
  afterRender: function() {
	  namespace = this.options.namespace;
	  namespace.canvas_controller = new CanvasController({
      canvasId: this.options.canvasId,
      maxWorkzoneLimit: namespace.CANVASWIDTH,
      namespace: namespace
    });

    open_response = new OpenResponse({
      id: this.options.id,
      canvasId: this.options.canvasId,
      initialData: this.options.demoData,
      completeData: this.options.completeData,
      namespace: namespace
    });
    open_response.get('canvas').calcOffset();
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
      $('#app_hint_overlay').css('display', 'block');
    }
  },
  loadHint: function(index) {
    open_response.loadHint(index);
    displayHintbox(index);
  }
});

this.OpenResponseView = OpenResponseView;
this.OpenResponse = OpenResponse;

}