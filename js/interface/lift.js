//HARDCODED INITIAL VALUES - DO NOT CHANGE
var cloud_opacity = 0;
var score_marker = 0;
var diffHeight = 0;
var modules_pos = 0;
var cloud_pos = 0;
var current_hint = 1;
var existingHints = 5;
var startScaleValue = parseInt($(".feet .score").html())-100;
var global_sound = true;
var hints_sounds = [];
var hint_collection = {};
var itemSession = null;
var waggleProperties = window.waggleui.model.getWaggleProperties();

/* loading user data onto dashboard */
var user = getUser();
console.log(user);
if(!_.isUndefined(user) && !_.isEmpty(user)) {
  $('#app_kid_avatar img, #app_kid_avatar_small').attr('src', user.user.avatar);
  $('#app_kid_name').html(user.user.first_name + ' ' + user.user.last_name);
}
//debugger;
/*function loadDashboard() {
  loadTeachers();

  $('.feet-cloud-off').click(function() {
    // hardcoded 100 being step from full opacity to no opacity: DO NOT CHANGE
    cloud_opacity = 100/parseInt($('.feet-cloud-off').html().replace('+',''));
   
    setFeet();
  });
}*/

$(window).resize(function() {
	 /* setBgLines();
  if(parseInt($(window).width()/13.5) > 55) {
    $('#app_modules_list').css('left', parseInt($(window).width())/13.5+'px');
  } else {
    $('#app_modules_list').css('left', '55px');
  }
  $('#app_modules_pager').css('left', (parseInt($('#app_modules_list').css('left').replace(/px/, '')) + parseInt($('#app_modules_list').width()) + PAGEREXERCISESSPACING)+'px');
  if(parseInt($('#app_cloud').css('right').replace(/px/, '')) > 0) {
    // hardcoded 2 to set the cloud position at the middle: DO NOT CHANGE
    $('#app_cloud').css('right', $('#lift_level').width()/2+'px');
  }*/
});

function loadTeachers() {
  var classes = getTeachersList();
  if (classes.length) {
    for (var teacherIndex = 0; teacherIndex < classes.length; teacherIndex++) {
      // Compile the template using underscore
      var template = _.template( $("#teacher_template").html(), { 
        teacherid: classes[teacherIndex].id,
        teacher_html_class: classes[teacherIndex].id == DEFAULTTEACHER ? ' active' : '',
        teacher_name: classes[teacherIndex].name,
        teacher_color: classes[teacherIndex].color
      } );
      // Load the compiled HTML
      $('#app_classes_list #class_mark').before(template);
    }
    //place active carret; hardcoded 2 to center the caret under the name; DO NOT CHANGE
    $('#app_classes_list #class_mark').css({'left': ($('#app_classes_list li a.active').position().left-TEACHERCARETWIDTH+$('#app_classes_list li a.active').width()/2)+'px', 'display': 'block'});
    //load modules list
    loadTeacherModules($('#app_classes_list li a.teach' + classes[DEFAULTTEACHER].id), classes[DEFAULTTEACHER].color);
  }
}

function loadTeacherModules(teacherItem, color) {
  $('#app_classes #app_classes_list li a').removeClass('active');
  $(teacherItem).addClass('active');
  $('body').animate({
    backgroundColor: color
  }, 1500);
  $('#app_stats li span').animate({
    color: color
  }, 2000);

  // hardcoded 2 to position caret in the middle of the name; DO NOT CHANGE
  var newPos = ($(teacherItem).position().left - TEACHERCARETWIDTH + $(teacherItem).width()/2) + 'px';
  $('#class_mark').animate({left: newPos}, TEACHERCARETSPEED);
  var hash = location.hash, hashValue = hash.replace(/^#/, '');
  if (hashValue.indexOf('page') == -1) {
    loadModulesList($(teacherItem).attr('tid'), 1);
  }
}

/**
 * Return URL hash parameter By Name value
 * @param {string} name - name of the parameter we want to read the value for
 * @return string
 **/
function getHashParameter(name) {
 return decodeURI(
   (RegExp(name + '=' + '(.+?)(&|$)').exec(location.hash)||[, ''])[1]
 );
}

/**
 * On load events
**/
$(window).load(function() {
  read_hash();  
//	updateHash('');
});


function read_hash(nextQuestion){
	
	  var item_id = getHashParameter('itemId'),
	      page = parseInt(getHashParameter('page'));

	  if (page) {
	    if ($('#app_modules_list').not(':visible')) {
	      unloadExercise();
	    }
	    if (parseInt($('#app_modules_pager ul li.selected').attr('page_no')) != page) {
	      loadModulesPage(page);
	    }
	    return;
	  }

	  if (item_id) {
		  
		  var pefObject = {
				  "itemId": item_id
		  }
		  
		  window.waggleui.services.amsStandAloneGetItem(pefObject);
		  
		//WG430 popup handle
		if (!$("#knewtonFailurePopup").hasClass('hide')){
			$("#knewtonFailurePopup, #errorMessageModalOverlay").addClass("hide");
		}
		window.clearInterval(itemSession); // clear if previous itemSession available
		  
	    //item_id = item_id.split(/_assignmentId=/);
	   // var productID = !_.isUndefined(item_id[1]) ? item_id[1] : '';    
	    //itemId = item_id[0];
	    //assignmentId = item_id[1];
	    
	  //  console.log('URI itemID: ', item_id);
	   // console.log('URI productID: ', productID);
	    var flagStatus = window.waggleui.model.getFlagGetItem();
	    
	    /*if (flagStatus == true){
	    	window.waggleui.model.setFlagGetItem(false);
	    }else{
	    	if (nextQuestion != 'nextQuestionActive')	{
		    	var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId),	//check assignmentId is available in current assignment lists or not
			    	userProfile = window.waggleui.model.getUserProfile(),
			    	currentClassObject = window.waggleui.model.getCurrentClassObject (),	    		
			        preferenceObj = {
			    		'studentId': userProfile.studentId,
			    		'knewtonId': userProfile.knewtonId,
			    		'year': userProfile.year,
			    		'assignmentId': assignmentId,
			    		'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
			    		'goalId': currentAssignment['info']['goalId'],
			    		'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
			    		'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
			    		'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId'],
			    		'classId': currentClassObject['classId'],
			    		'classViewId': currentClassObject['classViewId'],
			    		'classViewRegId': currentClassObject['classViewRegId'],		    		
			    		'isNextQuestion': true,
			    		'isReview': false,
			    		'isCompleted': currentAssignment['outcome']['completed']
			    	};
		    	
		    	if (sessionStorage.getItem("checkGradeOrAssignment")){
		    		var goToAmsSessionInfo = JSON.parse(sessionStorage.getItem("checkGradeOrAssignment"));    		
		    		if (goToAmsSessionInfo['referedFrom']){
		    			if (goToAmsSessionInfo['referedFrom'] == 'gradedTitle'){
		    					window.waggleui.services.getGradedAssignmentItem(preferenceObj);			
		    			}else if(goToAmsSessionInfo['referedFrom'] == 'retryTitle'){
		    				window.waggleui.services.getretryAssignmentItem(preferenceObj);
		    			}else if (goToAmsSessionInfo['referedFrom'] == 'asignmentTitle'){
		    				window.waggleui.services.getAssignmentItem(preferenceObj);
		    			}				
		    		}
		    	}
	    	}	
	    }*/
	    
	    var itemModel = window.waggleui.model.getAmsStandAloneItem(),
	    	currentItemId = itemModel['item']['itemId'],
	    	currentAssignmentId = itemModel['assignment']['info']['assignmentId'];
	    
	    /*Loading AM using AM-Enhancement Code*/
		initAMBase(currentItemId, currentAssignmentId);
		
	    loadQuestionItem(currentItemId);	    
	    if(!isNext) {
	    	if (nextQuestion == 'nextQuestionActive'){
	    		window.waggleui.view.amsRefresh();
	    	}else{
	    		window.waggleui.view.amsRefresh();
	    		if (window.waggleui.util.errorInfo['wg430'] == false){
	    			loadExerciseEffect();
	    		}
	    	}
	    }
	    isNext = false;

	    return;
	  }else{
		  window.clearInterval(itemSession); //Clear Time - Need to record the time when user is on Answering Mechanism page  till clicks on  checkAnswer.
	  }

	  /*if ($('#app_modules_list li').length < 1) {
	    loadDashboard();
	  } PraveenCHnd*/
	  // Praveen Chand on clicking back button in the browser
	  if($('#app_exercise_container').is(':visible'))
		  {
		  unloadExercise();
		  //window.waggleui.view.goBackPrevious();
		  return;
		  }
	  unloadExercise();
}


/*
 * Initialises AM Base
 */
function initAMBase(itemId, assignmentId){
	/*var flagStatus = window.waggleui.model.getFlagGetItem();
    
    if (flagStatus == true){
    	window.waggleui.model.setFlagGetItem(false);
    }else{
    	var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId),	//check assignmentId is available in current assignment lists or not
	    	userProfile = window.waggleui.model.getUserProfile(),
	    	currentClassObject = window.waggleui.model.getCurrentClassObject (),
	        preferenceObj = {
	    		'studentId': userProfile.studentId,
	    		'knewtonId': userProfile.knewtonId,
	    		'year': userProfile.year,
	    		'assignmentId': assignmentId,
	    		'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
	    		'goalId': currentAssignment['info']['goalId'],
	    		'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
	    		'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
	    		'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId'],
	    		'classId': currentClassObject['classId'],
	    		'classViewId': currentClassObject['classViewId'],
	    		'classViewRegId': currentClassObject['classViewRegId'],		    		
	    		'isNextQuestion': true,
	    		'isReview': false
	    	};
    	window.waggleui.services.getAssignmentItem(preferenceObj);
    }*/
	var localeBaseModel = window.waggleui.model.getLocaleBaseModel(),
		amEnvironment = null;
	
	if (AMEnvironment == null){
		amEnvironment = localeBaseModel['url.AMEnvironment'];
	}else{
		amEnvironment = AMEnvironment;
	}
		
	var options = {
			mode : 'TEST',
			questionId: itemId,
			assignmentId: assignmentId,
			namespace: window,
			htmlContainer: $('#app_exercise_container'),
			AMEnvironment: amEnvironment,
			obtainRequiredResources: false,			
			questionData: window.waggleui.model.getAmsStandAloneItem()['item'],
			showFeedBackLink: window.waggleui.model.getLocaleBaseModel()['showFeedbackLink'] ? window.waggleui.model.getLocaleBaseModel()['showFeedbackLink'] : false
	}
	
	base = new Base(options);
}


function loadModulesList(tid, page) {
  //call te stubbedFunction that returns current teachers modules list
  var modList = getModulesList(tid, page);
  if (modList.length) {
    //load next group of items
    $('#app_modules_list ul li').remove();
    
    for (var moduleIndex = 0; moduleIndex < modList.length; moduleIndex++) {
      // Compile the template using underscore
      var template = _.template( $("#module_template").html(), { 
        mod_item_id: !_.isUndefined(modList[moduleIndex].itemID) ? modList[moduleIndex].itemID : '',
        mod_product_id: !_.isUndefined(modList[moduleIndex].productID) ? modList[moduleIndex].productID : '',
        dueday_class: modList[moduleIndex].dueDays > 0 ? '' : ' due_now',
        dueday: modList[moduleIndex].dueDays,
        dueday_label: modList[moduleIndex].dueDays > 0 ? 'DAYS' : 'TODAY',
        mod_type: modList[moduleIndex].type,
        mod_title: modList[moduleIndex].title,
        mod_users: modList[moduleIndex].aeronauts,
        mod_percentage: modList[moduleIndex].currentUserPercentage        
      } );
      // Load the compiled HTML
      $('#app_modules_list ul').append(template);
    }
    $('#app_modules_pager ul li').removeClass('selected');
    $('#app_modules_pager ul li[page_no=' + page + ']').addClass('selected');
    
    $('#app_modules_list ul li').click(function() {
      $('#answer_options ul li').hide();
      window.location.hash = 'itemId=' + $(this).attr('item_id') + '__productID=' + $(this).attr('product_id');
      // if this is not the active exercise, show check answer button
      // this should be read from JSON (exercise state)
      if(!($(this).hasClass('active_exercise'))) {
        $('#app_exercise_next').css('display', 'none');
        $('#app_exercise_check').css('display', 'block');
      }
      $('#app_modules_list ul li').removeClass('active_exercise');
      $(this).addClass('active_exercise');
      loadExerciseEffect(this);
    });

    $('#app_modules_pager').css('left', (modules_pos + parseInt($('#app_modules_list').width()) + PAGEREXERCISESSPACING)+'px');
  }
}

function loadExerciseEffect(element, global) {
   $('#app_exercise_container').css({'display':'block','left': '200%'});
   if (element) {
     $(element).animate({'marginLeft': '-100%', 'marginRight':'100%'}, 1000);       
   }

   setTimeout(function() {

     $('#app_modules_list').delay(MODULESANIMATEDELAY).animate(
       {
         left: '-100%'
       },
       {
         duration: MODULESANIMATEDURATION,
         easing: 'easeInBack',
         complete: setTimeout(function() {
           $('#app_modules_list').css('display','none');
         }, LOADNEWEXERCISEDELAY)
       }
     );

     $('#app_modules_pager').animate({
       opacity: '0'
     }, PAGEROPACITYANIMATEDURATION);

     $('#lift_level').animate({
       opacity: '0'
     }, LIFTLEVELOPACITYANIMATEDURATION);

     $('.score_marker').animate({
       opacity: '0'
     }, SCOREMARKERANIMATEDURATION);

     $('#app_exercise_container').delay(EXERCISECONTAINERANIMATIONDELAY).animate(
       {
         // hardcoded 2 to center the container: DO NOT CHANGE
         left: '37px' // was at 0px... changed for center position of the current UI code.
       }, {
         duration: EXERCISECONTAINERANIMATIONDURATION,
         easing: 'easeOutBack',
         complete: function() {
            if (canvas_controller && canvas_controller.get('canvas')) {
              canvas_controller.get('canvas').calcOffset();
            }
            $('#canvas_container .scrollable_text').css({ width: '640px' });

            //SHK
            var $images = $('#app_selection_content img'),
            preloaded = 0,
            total = $images.length;
            $images.load(function () {
                if (++preloaded === total) {
                    fleXenv.updateScrollBars();
                    fleXenv.initByClass('app_selection_content');
                }
            })
            .error(function () {
                   $(this).attr('src', 'no-image.jpg');
               });

            setTimeout(function () { fleXenv.fleXcrollMain('app_exercise_left'); }, 500);
          // add line numbers
          // if (typeof choice != "undefined" && choice != undefined) {
          //   choice.addLineNumbers();
          // }
         }
       }
     );

/*     $('#app_classes').animate({
       top: '-45px'
     }, 350, function() {
       $('#app_big_top').animate({
         top: '-100px'
       }, 500, function() {
         $('#app_small_top').animate({
           top: '0'
         }, 250, function() {
           $('#app_small_nav').animate({
             top: 0
           }, 250)
         })
       });
       $('#app_header_left, #app_header_right').animate({
         marginTop: '-100px'
       }, 500);
     })* by praveen */

     $('.show-user-list-wrapper').animate({
         top: '-45px'
       }, 650, function() {
         $('#headerWrapper').animate({
           top: '-300px'
         }, 1500, function() {
        	 $('.main-container').addClass('remove-dotted-bg');
           $('#headerWrapper2').removeClass('hide').animate({
             top: '0'
           }, 250, function() {
        	   $('html, body').animate({ scrollTop : "0px"}, 800);
        	
           })
         })
       });
     
     $('#footerWrapper').delay(650).animate({
         bottom: '-300px'
       }, 1500)

  /*   $('#app_footer').delay(650).animate({
       bottom: '-80px'
     }, 500);
*/
    
     
     

   }, 100)
}

function showHint(caretPosition) {
  $('#app_hint').css({'display': 'block', 'opacity': '1'});
  $('#app_hint_caret').css({'left': caretPosition, 'display': 'block'});
}

function hideHint() {
  
  //changes for text2Speech	
  if(typeof($rw_isSpeaking) == "function"){
	if($rw_isSpeaking()){
		$rw_stopSpeech();
	}
  } 	
	
  $('#app_hint').hide(100);
  $('#app_hint_caret').css({'display':'none', 'opacity': '1'});
  $('#app_hint_overlay').css('display', 'none');
}

/*function setBgLines() {
  var winHeight = $(window).height()*2;
  var backgroundLines = Math.ceil(winHeight/20);
  var linesIn = '';
  var linesOut = '';
//debugger;
  for (var i = 0; i<= backgroundLines; i++) {
    var feets = startScaleValue + 10*i;
    linesIn = '<span>' + (feets > 0 ? feets : '&nbsp;')  + '</span><\/li>' + linesIn;
    linesOut = '<li><\/li>' + linesOut;

    if((startScaleValue + 10*i) == parseInt($('.feet .score').html())) {
      linesIn = '<li class="current">' + linesIn;
      score_marker = 20*i;
    } else {
      if ((startScaleValue + 10*i)%50 == 0) {
        linesIn = '<li class="visible">' + linesIn;
      } else {
        linesIn = '<li>' + linesIn;
      }
    }
  }
//debugger;
  $('#lift_level').html(linesIn + '<li id="score_marker">'+parseInt($('.feet .score').html())+'</li>')
 // $('#background_lines').html(linesOut);
  $('#score_marker').css('bottom', score_marker+'px');
}*/


function loadModulesPage(page) {
  $('#app_modules_pager ul li').removeClass('selected');
  $('#app_modules_pager ul li').each(function(){
    if (parseInt($(this).html()) == parseInt(page)) {
      $(this).addClass('selected');
    }
  });
  
  //hide current items
  $('#app_modules_list ul').animate({
    opacity: '0'
  }, 500, function() {
    //load next group of items
    $('#app_modules_list ul li').remove();
    //load modules list
    var tid = $('#app_classes_list li a.active').attr('tid');
    loadModulesList(tid, page);
    
    //show current items
    $('#app_modules_list ul').animate({
      opacity: '1'
    }, 500);
  }); 
}

function goBackToDashboard() {
  hideHint();

  var page_no = $('#app_modules_pager ul li.selected').attr('page_no');
  // hardcoded value 1 to leave the hash empty in case of first page DO NOT CHANGE THIS VALUE
  if (page_no && page_no != 1) {
    updateHash('page=' + page_no);
  }
  else {
    updateHash('');
  }
}

function unloadExercise() {
  if($('#app_selection_overlay').length > 0) {
    $('#app_selection_overlay').remove();
  }
  if($('#app_selection_popup').length > 0) {
    $('#app_selection_popup').remove();
  }
 // $('body').css('overflow', 'hidden');  // made it for no-scroll
  
  $('#app_modules_list').css({'left':'-100%', 'display':'block'});

  $('#app_modules_list ul li').css({'margin-left': '0px', 'margin-right':'0px'});

  $('#app_toolbox').css('display', 'none');

  $('#app_hints_navigator').animate({
    right: '50'
  }, 250, function(){
    $('#app_hints_navigator').css('display', 'none');
  });

  $('#app_exercise_navigator').delay(250).animate({
    bottom: '71'
  });

  $('#toolkit_container').delay(180).animate({
    bottom: '71'
  });

  $('#app_modules_pager').delay(2000).animate({
    opacity: '1'
  }, 500);

  $('#app_exercise_container').delay(250).animate(
  {
    left: '200%'
  },
    1000,
   'easeInBack',function(){
	  $(this).css('display','none');
  }
  );
  
  $('#app_modules_list').delay(2000).animate(
  {
    left: modules_pos
  },
  {
    duration: 1000,
    easing: 'easeOutBack'
  }
  );

  $('#app_small_menu').animate({
    bottom: '0'
  }, 150)

  $('#app_small_nav').delay(300).animate({
    top: '-36'
  }, 250)

  $('#headerWrapper2').delay(500).animate({
    top: '-44'
  }, 250, function() {
    $('#headerWrapper').animate({
      top: '0'
    }, 550, function() {
      $('.show-user-list-wrapper').animate({
        top: '0'
      },200,function(){});
    });
    $('#headerWrapper2').addClass('hide');
    $('.main-container').delay(2000).removeClass('remove-dotted-bg');
    
    if ($("#messagesContainer li").length == 0)
    	{
		//$("#messagingWrapper").css("display","none");
    	//$("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() + 5});
    	}
    else{
    	
    	$("#messagingWrapper").slideDown({
    		duration:'1000',
    		complete: function(){    			
    			//$("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() - 93});
    		}
    		});
    	
    	}
  });


  
  $('#footerWrapper').delay(650).animate({
    bottom: '0'
  }, 500);
  


 

 /* $('#lift_level').delay(750).animate({
    opacity: '1'
  }, 500);

  $('.score_marker').delay(750).animate({
    opacity: '1'
  }, 500);*/
	// $('.show-user-list-wrapper').css('z-index','0');
}

function checkExercise() {
  // gets the data from the exercise; this should be passed along to the server
 
  //changes for text2Speech	
  if(typeof($rw_isSpeaking) == "function"){
	if($rw_isSpeaking()){
		$rw_stopSpeech();
	}
  }	
	
  var exerciseData = getAnswerData();
  if(exerciseData.am_code == 'open-response'){
  	  var responseLength = exerciseData.studentResponse.replace(/(<([^>]+)>)/ig, "").replace(/\s/g,"").replace(/\n/g,"").replace(/&nbsp;/ig,"").length;
    }
  if ((typeof (exerciseData.selected_answers) == 'undefined' || !exerciseData.selected_answers.length)&&(exerciseData.am_code!='open-response')) {
    var message;
    switch (exerciseData.am_code) {
      case 'drag-drop':
        message = 'Please drag and drop your answer!';
        break;
      case 'segment':
        message = 'Please draw your answer!';
        break;
      case 'highlight':
        message = 'Please highlight your answer!';
        break;
      case 'choices':
      case 'select':
      case 'hot-spot':
      case 'hs-click':
      case 'embed-in-text':
      case 'embed-in-image':
      default:
        message = 'Please select your answer!';
        break;
    }
    currentView.renderHint(message);
    $('#app_hint').css('display', 'block');
    $('#app_hint_close').click(function() {hideHint();});
    return;
  }else if((exerciseData.am_code=='open-response')&&(!exerciseData.studentResponse || (responseLength < MINRESPONSELENGTH))){
	  message = '<span class="or-validation-msg">'+waggleProperties['label.openResponse.fail.validationMessage']+'</span>';
	  currentView.renderHint(message);
	  $('#app_hint').css('display', 'block');
	  $('#app_hint_close').click(function() {hideHint();});
      return;
  }else{
	//Clear Time - Need to record the time when user is on Answering Mechanism page  till clicks on  checkAnswer.
		window.clearInterval(itemSession);		
  }
  
  
  $('#app_hint:after').css('display', 'block');
  $('#app_hint_caret').css({'display':'none', 'opacity': '1'});
  $('#app_hint_overlay').css('display', 'none');
  
  var itemID = exerciseData.itemId ? exerciseData.itemId : window.waggleui.model.getAmsStandAloneItem()['item']['itemId'];
      productID = exerciseData.productID;
  delete exerciseData.itemId;
  delete exerciseData.productID;
  
  if(exerciseData.am_code == 'open-response'){
	  submitAnswer(itemID, exerciseData, productID);
	//Analytics
	  /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am11.sendToTeacher');
	  window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
  }else{
	  checkAnswer(itemID, exerciseData, productID, function(response){
		    showFeedback(response);
		    // display hintbox with the answer
		    // next question or not at answer parsing time
		    if(exerciseData.am_code!='open-response'){
			    $('#app_hint').css('display', 'block');
			    $('#app_hint_close').click(function() {hideHint();});
		    }
		  });
	//Analytics
	  /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am.checkAnswer');
	  window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
  }
}

function saveExercise(){
	var exerciseData = getAnswerData();
	  if(exerciseData.am_code == 'open-response'){
	  	  var responseLength = exerciseData.studentResponse.replace(/(<([^>]+)>)/ig, "").replace(/\s/g,"").replace(/\n/g,"").replace(/&nbsp;/ig,"").length;
	  	  if((exerciseData.am_code=='open-response')&&(!exerciseData.studentResponse || (responseLength < MINRESPONSELENGTH))){
	  		message = '<span class="or-validation-msg">'+waggleProperties['label.openResponse.fail.validationMessage']+'</span>';
	  		currentView.renderHint(message);
	  		$('#app_hint').css('display', 'block');
	  		$('#app_hint_close').click(function() {hideHint();});
	        return;
	  	  }
	}
	  $('#app_hint:after').css('display', 'block');
	  $('#app_hint_caret').css({'display':'none', 'opacity': '1'});
	  $('#app_hint_overlay').css('display', 'none');
	  var itemID = exerciseData.itemId;
	      productID = exerciseData.productID;
	  delete exerciseData.itemId;
	  delete exerciseData.productID;
	  saveAnswer(itemID, exerciseData, productID, function(response){
		showSaveFeedback(response);
	    // display hintbox with the answer
	    // next question or not at answer parsing time
	    if(exerciseData.am_code!='open-response'){
		    $('#app_hint').css('display', 'block');
		    $('#app_hint_close').click(function() {hideHint();});
	    }
	  });
	
	//Analytics
	  /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am11.save');
	  window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
}

function loadNextExercise() {
	
	//changes for text2Speech	
	  if(typeof($rw_isSpeaking) == "function"){
		if($rw_isSpeaking()){
			$rw_stopSpeech();
		}
	}
	
	var itemId = prompt("Please Enter Next Item Id:");

	if (itemId != null) {
		window.location.hash = 'itemId='+itemId;
	}
	
	
	/*hideHint();  
	setTimeout(function() {
    current_hint = 1;
    $('.pig-image-container').hide();                               // hiding the winged pig shown in the previous assignment
	$('#app_exercise_navigator img').css("display","block");		// displaying the default pig image
        
    var extractHash = getHashParameter('itemId');    
    extractHash = extractHash.split(/_assignmentId=/);        
    assignmentId = extractHash[1];
    
    isNext = true;	//isNext is global variable and this should be false to do horizontal animation for AMS container, But as we are doing vertical animation here we set isNext to true
    
	var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId),
		userProfile = window.waggleui.model.getUserProfile(),
		currentClassObject = window.waggleui.model.getCurrentClassObject (),
		isReview = null;
	
	//Session Validation to decide 'isReview' attribute's value -  Starts
	if (sessionStorage.getItem("goToAmsSessionInfo")){
		var goToAmsSessionInfo = JSON.parse(sessionStorage.getItem("goToAmsSessionInfo"));    		
		if (goToAmsSessionInfo['cameFrom']){
			if (goToAmsSessionInfo['cameFrom'] == 'completedAssignmentPage'){
				isReview = true;				
			}else{
				isReview = false;
			}				
		}
	}else{
		isReview = false;
	}
	//Session Validation -  Ends
	
	var preferenceObj = {
			'studentId': userProfile.studentId,    
			'knewtonId': userProfile.knewtonId,
			'year': userProfile.year,
			'assignmentId': assignmentId,
			'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
			'goalId': currentAssignment['info']['goalId'],
			'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
			'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
			'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId'],
    		'classId': currentClassObject['classId'],
    		'classViewId': currentClassObject['classViewId'],
    		'classViewRegId': currentClassObject['classViewRegId'],
    		'isNextQuestion': true,
    		'isReview': isReview
	    };
    window.waggleui.model.setNextQuestionFlag(true);
    window.waggleui.model.setFlagGetItem(true);
    if (sessionStorage.getItem("checkGradeOrAssignment")){
		var goToAmsSessionInfo = JSON.parse(sessionStorage.getItem("checkGradeOrAssignment"));    		
		if (goToAmsSessionInfo['referedFrom']){
			if (goToAmsSessionInfo['referedFrom'] == 'gradedTitle'){
					window.waggleui.services.getGradedAssignmentItem(preferenceObj);			
			}else if ((goToAmsSessionInfo['referedFrom'] == 'asignmentTitle') || (goToAmsSessionInfo['referedFrom'] == 'retryTitle')){
				window.waggleui.services.getAssignmentItem(preferenceObj);
			}				
		}
	}
    
  }, 1000);
	
	//Analytics
	//var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am.nextQuestion');
	//window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject); */
}



function openSoundTab() {
  if($('#app_show_snd').hasClass('sndOpened')) {
    $('#app_small_menu').animate({
      bottom: '0'
    }, 250, function(){
      $('#app_show_snd').toggleClass('sndOpened');
      $('#app_show_snd span img').attr('src','images/btn18x24-arrow_dn.png');
      $('#app_show_snd span img').css('opacity', '1');
    })
  } else {
    $('#app_small_menu').animate({
      bottom: '-56'
    }, 250, function(){
      $('#app_show_snd').toggleClass('sndOpened');
      $('#app_show_snd span img').attr('src','images/btn18x24-arrow_up.png');
      $('#app_show_snd span img').css('opacity', '1');
    })
  }
}

// uniform
(function(e,t){"use strict";function n(e){var t=Array.prototype.slice.call(arguments,1);return e.prop?e.prop.apply(e,t):e.attr.apply(e,t)}function s(e,t,n){var s,a;for(s in n)n.hasOwnProperty(s)&&(a=s.replace(/ |$/g,t.eventNamespace),e.bind(a,n[s]))}function a(e,t,n){s(e,n,{focus:function(){t.addClass(n.focusClass)},blur:function(){t.removeClass(n.focusClass),t.removeClass(n.activeClass)},mouseenter:function(){t.addClass(n.hoverClass)},mouseleave:function(){t.removeClass(n.hoverClass),t.removeClass(n.activeClass)},"mousedown touchbegin":function(){e.is(":disabled")||t.addClass(n.activeClass)},"mouseup touchend":function(){t.removeClass(n.activeClass)}})}function i(e,t){e.removeClass(t.hoverClass+" "+t.focusClass+" "+t.activeClass)}function r(e,t,n){n?e.addClass(t):e.removeClass(t)}function l(e,t,n){var s="checked",a=t.is(":"+s);t.prop?t.prop(s,a):a?t.attr(s,s):t.removeAttr(s),r(e,n.checkedClass,a)}function u(e,t,n){r(e,n.disabledClass,t.is(":disabled"))}function o(e,t,n){switch(n){case"after":return e.after(t),e.next();case"before":return e.before(t),e.prev();case"wrap":return e.wrap(t),e.parent()}return null}function c(t,s,a){var i,r,l;return a||(a={}),a=e.extend({bind:{},divClass:null,divWrap:"wrap",spanClass:null,spanHtml:null,spanWrap:"wrap"},a),i=e("<div />"),r=e("<span />"),s.autoHide&&t.is(":hidden")&&"none"===t.css("display")&&i.hide(),a.divClass&&i.addClass(a.divClass),s.wrapperClass&&i.addClass(s.wrapperClass),a.spanClass&&r.addClass(a.spanClass),l=n(t,"id"),s.useID&&l&&n(i,"id",s.idPrefix+"-"+l),a.spanHtml&&r.html(a.spanHtml),i=o(t,i,a.divWrap),r=o(t,r,a.spanWrap),u(i,t,s),{div:i,span:r}}function d(t,n){var s;return n.wrapperClass?(s=e("<span />").addClass(n.wrapperClass),s=o(t,s,"wrap")):null}function f(){var t,n,s,a;return a="rgb(120,2,153)",n=e('<div style="width:0;height:0;color:'+a+'">'),e("body").append(n),s=n.get(0),t=window.getComputedStyle?window.getComputedStyle(s,"").color:(s.currentStyle||s.style||{}).color,n.remove(),t.replace(/ /g,"")!==a}function p(t){return t?e("<span />").text(t).html():""}function m(){return navigator.cpuClass&&!navigator.product}function v(){return window.XMLHttpRequest!==void 0?!0:!1}function h(e){var t;return e[0].multiple?!0:(t=n(e,"size"),!t||1>=t?!1:!0)}function C(){return!1}function w(e,t){var n="none";s(e,t,{"selectstart dragstart mousedown":C}),e.css({MozUserSelect:n,msUserSelect:n,webkitUserSelect:n,userSelect:n})}function b(e,t,n){var s=e.val();""===s?s=n.fileDefaultHtml:(s=s.split(/[\/\\]+/),s=s[s.length-1]),t.text(s)}function y(e,t,n){var s,a;for(s=[],e.each(function(){var e;for(e in t)Object.prototype.hasOwnProperty.call(t,e)&&(s.push({el:this,name:e,old:this.style[e]}),this.style[e]=t[e])}),n();s.length;)a=s.pop(),a.el.style[a.name]=a.old}function g(e,t){var n;n=e.parents(),n.push(e[0]),n=n.not(":visible"),y(n,{visibility:"hidden",display:"block",position:"absolute"},t)}function k(e,t){return function(){e.unwrap().unwrap().unbind(t.eventNamespace)}}var H=!0,x=!1,A=[{match:function(e){return e.is("a, button, :submit, :reset, input[type='button']")},apply:function(e,t){var r,l,o,d,f;return l=t.submitDefaultHtml,e.is(":reset")&&(l=t.resetDefaultHtml),d=e.is("a, button")?function(){return e.html()||l}:function(){return p(n(e,"value"))||l},o=c(e,t,{divClass:t.buttonClass,spanHtml:d()}),r=o.div,a(e,r,t),f=!1,s(r,t,{"click touchend":function(){var t,s,a,i;f||e.is(":disabled")||(f=!0,e[0].dispatchEvent?(t=document.createEvent("MouseEvents"),t.initEvent("click",!0,!0),s=e[0].dispatchEvent(t),e.is("a")&&s&&(a=n(e,"target"),i=n(e,"href"),a&&"_self"!==a?window.open(i,a):document.location.href=i)):e.click(),f=!1)}}),w(r,t),{remove:function(){return r.after(e),r.remove(),e.unbind(t.eventNamespace),e},update:function(){i(r,t),u(r,e,t),e.detach(),o.span.html(d()).append(e)}}}},{match:function(e){return e.is(":checkbox")},apply:function(e,t){var n,r,o;return n=c(e,t,{divClass:t.checkboxClass}),r=n.div,o=n.span,a(e,r,t),s(e,t,{"click touchend":function(){l(o,e,t)}}),l(o,e,t),{remove:k(e,t),update:function(){i(r,t),o.removeClass(t.checkedClass),l(o,e,t),u(r,e,t)}}}},{match:function(e){return e.is(":file")},apply:function(t,r){function l(){b(t,p,r)}var d,f,p,v;return d=c(t,r,{divClass:r.fileClass,spanClass:r.fileButtonClass,spanHtml:r.fileButtonHtml,spanWrap:"after"}),f=d.div,v=d.span,p=e("<span />").html(r.fileDefaultHtml),p.addClass(r.filenameClass),p=o(t,p,"after"),n(t,"size")||n(t,"size",f.width()/10),a(t,f,r),l(),m()?s(t,r,{click:function(){t.trigger("change"),setTimeout(l,0)}}):s(t,r,{change:l}),w(p,r),w(v,r),{remove:function(){return p.remove(),v.remove(),t.unwrap().unbind(r.eventNamespace)},update:function(){i(f,r),b(t,p,r),u(f,t,r)}}}},{match:function(e){if(e.is("input")){var t=(" "+n(e,"type")+" ").toLowerCase(),s=" color date datetime datetime-local email month number password search tel text time url week ";return s.indexOf(t)>=0}return!1},apply:function(e,t){var s,i;return s=n(e,"type"),e.addClass(t.inputClass),i=d(e,t),a(e,e,t),t.inputAddTypeAsClass&&e.addClass(s),{remove:function(){e.removeClass(t.inputClass),t.inputAddTypeAsClass&&e.removeClass(s),i&&e.unwrap()},update:C}}},{match:function(e){return e.is(":radio")},apply:function(t,r){var o,d,f;return o=c(t,r,{divClass:r.radioClass}),d=o.div,f=o.span,a(t,d,r),s(t,r,{"click touchend":function(){e.uniform.update(e(':radio[name="'+n(t,"name")+'"]'))}}),l(f,t,r),{remove:k(t,r),update:function(){i(d,r),l(f,t,r),u(d,t,r)}}}},{match:function(e){return e.is("select")&&!h(e)?!0:!1},apply:function(t,n){var r,l,o,d;return n.selectAutoWidth&&g(t,function(){d=t.width()}),r=c(t,n,{divClass:n.selectClass,spanHtml:(t.find(":selected:first")||t.find("option:first")).html(),spanWrap:"before"}),l=r.div,o=r.span,n.selectAutoWidth?g(t,function(){y(e([o[0],l[0]]),{display:"block"},function(){var e;e=o.outerWidth()-o.width(),l.width(d+e),o.width(d)})}):l.addClass("fixedWidth"),a(t,l,n),s(t,n,{change:function(){o.html(t.find(":selected").html()),l.removeClass(n.activeClass)},"click touchend":function(){var e=t.find(":selected").html();o.html()!==e&&t.trigger("change")},keyup:function(){o.html(t.find(":selected").html())}}),w(o,n),{remove:function(){return o.remove(),t.unwrap().unbind(n.eventNamespace),t},update:function(){n.selectAutoWidth?(e.uniform.restore(t),t.uniform(n)):(i(l,n),o.html(t.find(":selected").html()),u(l,t,n))}}}},{match:function(e){return e.is("select")&&h(e)?!0:!1},apply:function(e,t){var n;return e.addClass(t.selectMultiClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.selectMultiClass),n&&e.unwrap()},update:C}}},{match:function(e){return e.is("textarea")},apply:function(e,t){var n;return e.addClass(t.textareaClass),n=d(e,t),a(e,e,t),{remove:function(){e.removeClass(t.textareaClass),n&&e.unwrap()},update:C}}}];m()&&!v()&&(H=!1),e.uniform={defaults:{activeClass:"active",autoHide:!0,buttonClass:"button",checkboxClass:"checker",checkedClass:"checked",disabledClass:"disabled",eventNamespace:".uniform",fileButtonClass:"action",fileButtonHtml:"Choose File",fileClass:"uploader",fileDefaultHtml:"No file selected",filenameClass:"filename",focusClass:"focus",hoverClass:"hover",idPrefix:"uniform",inputAddTypeAsClass:!0,inputClass:"uniform-input",radioClass:"radio",resetDefaultHtml:"Reset",resetSelector:!1,selectAutoWidth:!0,selectClass:"selector",selectMultiClass:"uniform-multiselect",submitDefaultHtml:"Submit",textareaClass:"uniform",useID:!0,wrapperClass:null},elements:[]},e.fn.uniform=function(t){var n=this;return t=e.extend({},e.uniform.defaults,t),x||(x=!0,f()&&(H=!1)),H?(t.resetSelector&&e(t.resetSelector).mouseup(function(){window.setTimeout(function(){e.uniform.update(n)},10)}),this.each(function(){var n,s,a,i=e(this);if(i.data("uniformed"))return e.uniform.update(i),void 0;for(n=0;A.length>n;n+=1)if(s=A[n],s.match(i,t))return a=s.apply(i,t),i.data("uniformed",a),e.uniform.elements.push(i.get(0)),void 0})):this},e.uniform.restore=e.fn.uniform.restore=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n,s=e(this);n=s.data("uniformed"),n&&(n.remove(),t=e.inArray(this,e.uniform.elements),t>=0&&e.uniform.elements.splice(t,1),s.removeData("uniformed"))})},e.uniform.update=e.fn.uniform.update=function(n){n===t&&(n=e.uniform.elements),e(n).each(function(){var t,n=e(this);t=n.data("uniformed"),t&&t.update(n,t.options)})}})(jQuery);