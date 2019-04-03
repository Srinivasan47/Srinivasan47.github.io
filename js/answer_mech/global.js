//global variables used accross available methods
var Global = function (params) {
    var global = {};
    
    if (params.namespace) {
        global = params.namespace;
    } else {
        global = window;
    }

    global.canvas_controller = null;
    global.amHandle = null;
    global.hot_spot = null;
    global.choice = null;
    global.multiselect = null;
    global.drag_drop = null;
    global.math_graph = null;
    global.field_text = null;
    global.field_image = null;
    global.text_highlight = null;
    global.currentView = null;
    global.next_question_index = 2;
    global.existingHints = global.MAXHINTSNUMBER;
    global.ruler = false, protractor = false, calculator = false;
    global.defData = null;
    global.completeData = null;
    global.isPlaying = false;
    global.isNext = false;
    global.itemSessionSecondsCount = null;
    //global.itemSession = null;
    global.g_strQueuedId = null;
    
    /**
     * If toolbar not added then load toolbar.
     */
    global.checkedStartSpeech = function (p_strId){    	
    	
    	var p_strBookId = getURLParameter("productID"),
    	p_strPageId = getURLParameter("itemID");
    		
        if(typeof($rw_speakById) !== "function")
        {
            g_strQueuedId = p_strId;
            TexthelpSpeechStream.addToolbar(p_strBookId, p_strPageId,true);
        }
        else
        {	
    		removeTouchEvents();
    		addTouchEvents();
            $rw_speakById(p_strId);
        }
    }
    
    /**
     * This is called when the speech stream toolbar file has loaded.
     * This could be used to disable buttons using the toolbar until the toolbar has loaded, and maybe display some
     * message if attempt to do this.  Only issue of not doing this is message in the console output if try to
     * call $rw_speakById without the toolbar loaded.
     */
    global.$rw_toolbarLoadedCallback = function (){
        //document.getElementById("callbackmsg").innerHTML = "SpeechStream Toolbar enabled.";
    	addTouchEvents();
        if(g_strQueuedId != null)
        {
            $rw_speakById(g_strQueuedId);
        }
        //alert ('textHelpMain.js is loaded');
    }
    
    global.addTouchEvents = function (){
    	if(document.getElementById('app_hint_snd')){
    		addEvent(document.getElementById('app_hint_snd'), 'touchstart', $rw_getTouchSelection);	
    	}
    	else if(document.getElementById('app_answer_snd')){
    		addEvent(document.getElementById('app_answer_snd'), 'touchstart', $rw_getTouchSelection);
    	}
    	
    }
    
    global.removeTouchEvents = function (){
    	if(document.getElementById('app_hint_snd')){
    		removeEvent(document.getElementById('app_hint_snd'), 'touchstart', $rw_getTouchSelection);	
    	}
    	else if(document.getElementById('app_answer_snd')){
    		removeEvent(document.getElementById('app_answer_snd'), 'touchstart', $rw_getTouchSelection);
    	}
    	
    }
    
    global.addEvent = function (obj, eventType, func){
    	 if (obj.addEventListener){
		        obj.addEventListener(eventType, func, false);
		        return true;
		    }    else if (obj.attachEvent){
		        return obj.attachEvent("on" + eventType, func);
		    }    else{
		        return false;
		    }
    }
    
    global.removeEvent = function (obj, eventType, func){
   	 	if (obj.removeEventListener){
		        obj.removeEventListener(eventType, func, false);
		        return true;
		    }    else if (obj.detachEvent){
		        return obj.detachEvent("on" + eventType, func);
		    }    else{
		        return false;
		    }
   }

    /**
     * Return URL parameter By Name value
     * @param name @type string - name of the parameter we want to read the value for
     * @returns string
     **/
    global.getURLParameter = function (name) {
        return decodeURI(
            (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, ''])[1]
        );
    }
    
    /**
     * Return URL hash parameter By Name value
     * @param {string} name - name of the parameter we want to read the value for
     * @return string
     **/
    global.getHashParameter = function(name) {
	     return decodeURI(
	       (RegExp(name + '=' + '(.+?)(&|$)').exec(location.hash)||[, ''])[1]
	     );
    }

    global.setDefaultData = function (data, exercise) {
    	var page = parseInt(getHashParameter('page'));
    	var item_id = data.id;
    	/*if(params.loadStudentDetails){
    		
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
    			  item_id = item_id.split(/_assignmentId=/);
    			  // var productID = !_.isUndefined(item_id[1]) ? item_id[1] : '';    
    			  itemId = item_id[0];
    			  assignmentId = params.assignmentId;   
    		    
    			  //  console.log('URI itemID: ', item_id);
    			  // console.log('URI productID: ', productID);
    			  var flagStatus = window.waggleui.model.getFlagGetItem();
    			  defData = data;
    		    
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
    				  var isgradedItem = window.waggleui.model.getItemGraded();
    			    	
    			    	if(isgradedItem){
    			    		window.waggleui.services.getGradedAssignmentItem(preferenceObj);
    			    	}else{
    			    		window.waggleui.services.getAssignmentItem(preferenceObj);
    			    	}
    			    }
    			
    		    loadQuestionItem(exercise);
    		    if(!isNext) {
    		    	  window.waggleui.view.amsRefresh();
    		    	loadExerciseEffect(exercise, global);
    		    }
    		    isNext = false;
    		    
    		    return;
    		  }else{
    			  window.clearInterval(itemSession); //Clear Time - Need to record the time when user is on Answering Mechanism page  till clicks on  checkAnswer.
    		  }

    		  if ($('#app_modules_list li').length < 1) {
    		    loadDashboard();
    		  } PraveenCHnd
    		  // Praveen Chand on clicking back button in the browser
    		  if($('#app_exercise_container').is(':visible'))
    			  {
    			  unloadExercise();
    			  //window.waggleui.view.goBackPrevious();
    			  return;
    			  }
    		  unloadExercise();
    	}*/
    	//else {
    		defData = data;
	        global.loadQuestionItem(exercise);
	        loadExerciseEffect(exercise, global);
    	//}
    }
    
    /**
     * Item Session
     */
    global.startItemSession = function (tempSeconds){
	   	itemSessionSecondsCount = tempSeconds;
	   	window.clearInterval(itemSession);
	   	//itemSessionSecondsCount = 0;
	   	itemSession=self.setInterval(function(){
	   			itemSessionSecondsCount += 1;
	   			//console.log (itemSessionSecondsCount);
   		},1000);
   }
    
   /**
    * 
    * @param totalSec
    * @returns {String}
    */ 
   global.convertSecondsToHMS = function (itemSessionSecondsCount){
	   	console.log ("TSEC -> "+ itemSessionSecondsCount);	
	   	var hours = parseInt( itemSessionSecondsCount / 3600 ),
	   		hoursRemaining = itemSessionSecondsCount % 3600,
	   		minutes = parseInt( hoursRemaining / 60 ),
	   		minutesRemaining =  hoursRemaining % 60;
	   		
	   	console.log (hours+"."+minutes+"."+minutesRemaining);
	   	return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (minutesRemaining  < 10 ? "0" + minutesRemaining : minutesRemaining);	 
   }

   /**
    * 
    * @param timeFormat
    * @returns {String}
    */
   global.convertHmsToSeconds = function (timeFormat){
	   	var hms = timeFormat.split(":"),
	   		hoursToSecs = parseInt(hms[0]) * 3600,
	   		minutesToSecs = parseInt(hms[1]) * 60,
	   		seconds = parseInt(hms[2]),
	   		totalSecs = hoursToSecs + minutesToSecs + seconds;	
	   	return totalSecs;
   }

    global.renderAllOnCanvas = function () {
        if (global.canvas_controller) {
            global.canvas_controller.get('canvas').renderAll();
        }
    }
    /**
     * Update page URL hash
     **/
   global.updateHash = function(hash) {
     window.location.hash = hash;
   }
    /**
     * Load JSON class needed for current item
     * @returns nil
     */
    global.loadItemClass = function (item, callback) {
        if (typeof callback != 'function') {
            callback = function () {};
        }

        var auth_tool_file = null;
        switch (item) {
        case 'choices':
            auth_tool_file = window.ChoicesView == null ? 'choices.js' : null;
            break;
        case 'select':
            if (window.ChoicesView == null) {
                global.loadItemClass('choices', function () {
                    global.loadItemClass(item, callback);
                });
                return;
            }
            auth_tool_file = window.MultiSelectView == null ? 'select.js' : null;
            break;
        case 'drag-drop':
            auth_tool_file = window.DragDropView == null ? 'dragdrop.js' : null;
            break;
        case 'hot-spot':
        case 'hs-single':
        case 'hs-multi':
        case 'hs-us-dummy':
        case 'hs-us-texas':
        case 'hs-pie':
        case 'hs-fish':
        case 'hs-click':
            auth_tool_file = window.HotSpotView == null ? 'hotSpot.js' : null;
            break;
        case 'segment':
            auth_tool_file = window.GraphsView == null ? 'graphs.js' : null;
            break;
        case 'text-highlight':
            auth_tool_file = window.TextHighlightView == null ? 'textHightlight.js' : null;
            break;
        case 'highlight':
            auth_tool_file = window.HighlightView == null ? 'highlight.js' : null;
            break;
        case 'embed-in-text':
            auth_tool_file = window.EmbeddedTextView == null ? 'embeddedText.js' : null;
            break;
        case 'embed-in-image':
            if (window.EmbeddedTextView == null) {
                global.loadItemClass('embed-in-text', function () {
                    global.loadItemClass(item, callback);
                });
                return;
            }
            auth_tool_file = window.EmbeddedImageView == null ? 'embeddedImage.js' : null;
            break;
        case 'sort':
            auth_tool_file = window.SortingView == null ? 'sorting.js' : null;
            break;
        case 'open-response':
            auth_tool_file = window.OpenResponseView == null ? 'openResponse.js' : null;
            break;
        }

        if (auth_tool_file == null) {
            // the JS class is already loaded
            callback.call();
            return;
        }


        $.ajax({
            url: 'js/answer_mech/' + auth_tool_file,
            dataType: 'script',
            cache: true,
            success: function (data) {
                console.log('Successfully loaded Authoring Tool JS class (' + auth_tool_file + ')');
                callback.call();
            },
            error: function () {
                console.log('Failed loading Authoring Tool JS class (' + auth_tool_file + ')');
            }
        });
    }

    global.loadQuestionItem = function (item) {
        var initData = defData;
        var options = {
            el: $(".canvas_container"),
            id: item, //initData.id,
            demoData: initData,
            namespace: global,
            am: initData.code,
            //am: item,
            completeData: window.waggleui.model.getAmsStandAloneItem(),
            mode: params.mode
        };
        //if(params.loadStudentDetails){
        	  var completeAssignmentData = window.waggleui.model.getCompleteAmsItemobject();
        	  if (!initData || initData.code == null) {
        	    console.log('Unable to load Question for item ID: ' + item_id + ' (empty response data or no exercise code present in the response)');
        	    return;
        	  }
        	  console.log ("Item type -> "+ initData.code);
        	  
        	  if (initData){
        		  if (initData.activeTime){
        			  itemSessionSecondsCount = convertHmsToSeconds (initData.activeTime);
        			  startItemSession (itemSessionSecondsCount);
        		  }else{
        			  console.log ("activeTime not available for the item");
        		  }
        	  }
        //}
        new AM(options);
    }

    $(function () {
    	
    	  //setBgLines();
    	  // hardcoded 13.5 to determine list initial position: DO NOT CHANGE
    	  modules_pos = parseInt($(window).width())/13.5 + 'px';
    	  $('#app_modules_list').css('left', modules_pos);

    	  // hardcoded 2 to set the cloud position at the middle: DO NOT CHANGE
    	  cloud_pos = $('#lift_level').width()/2+'px';
    	  $('#app_cloud').css('right', cloud_pos);

    	  $('#app_back, #app_back img').hover(function(){
    	    $('#app_back img').animate({
    	        'opacity': '0'
    	    }, BACKARROWOPACITYSPEED);
    	  }, function() {
    	    $('#app_back img').animate({
    	        'opacity': '1'
    	    }, BACKARROWOPACITYSPEED);
    	  })

    	  // sound tab animation
    	  $('#app_show_snd').click(function(){
    	    openSoundTab();
    	  })
    	  
    	  $('#app_snd').click(function() {
    	    $(this).toggleClass('sndOff');
    	    toggleAudio($(this).hasClass('sndOff') == true ? false : true);
    	    setHintsSound();
    	  })
    	
    	
    	
    	
        /* Calculator */
        // when a value is clicked
        $(".val").click(function (e) {
            // prevent the link from acting like a link
            e.preventDefault();
            //grab this link's href value
            var a = $(this).attr("href");
            // append said value to the screen
            $(".screen").append(a);
            // append same value to a hidden input
            $(".outcome").val($(".outcome").val() + a);

        });
        // when equals is clicked
        $(".equal").click(function () {
            // solve equation and put in hidden field
            $(".outcome").val(eval($(".outcome").val()));
            // take hidden field's value & put it on screen
            $(".screen").html(eval($(".outcome").val()));
        });
        // clear field
        $(".clear").click(function () {
            $(".outcome").val("");
            $(".screen").html("");
        });
        // minimize (looks kinda cool?)
        $(".min").click(function () {
            $(".cal").stop().animate({
                width: "0px",
                height: "0px",
                marginLeft: "700px",
                marginTop: "1000px"
            }, 500);
            setTimeout(function () {
                $(".cal").css("display", "none")
            }, 600);
        });
        //close window. refresh to get back
        $(".close").click(function () {
            $(".wrap").toggle();
        })
        /* END Calculator */
    })

    global.displayHintbox = function (index) {
        // we check if the hint is available
        if ($('#app_hints_navigator li#app_h' + index).hasClass('hint_clickable')) {
            $('#app_hints_navigator li#app_h' + index).removeClass('hint_active');
            // if more hints are available, and you clicked the current one, make available the next one
            
            /* enable the hint, which is disable when we click active hint */
            if ((current_hint < global.existingHints) && (index == current_hint)) {
            	if(!canvas_controller.get('exerciseSolved')) {
      			  current_hint++;
      			  $('#app_hints_navigator ul li#app_h'+current_hint).toggleClass('hint_clickable hint_active');
      		  	}
            }            
            
            /*if ((current_hint < global.existingHints) && (index == current_hint)) {
            	//if(params.loadStudentDetails){
            		var assignmentId = window.location.href.match(/assignmentId=.+/g)[0].match(/[^=]+/g)[1],
        	    	currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId),
        	    	userProfile = window.waggleui.model.getUserProfile(),
        	    	itemInfo = window.waggleui.model.getAmsItem(),
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
        		    	'hintIndex': index,
        		    	'itemId': itemInfo.itemId
        	    	};
	            	var displayHint = window.waggleui.services.getHint(preferenceObj);
	            	// var displayHint = canvas_controller.get('hintsUsed')[index-1];
	            	if (displayHint && displayHint.status != 'error') {
	                      //current_hint++;
	                      //$('#app_hints_navigator ul li#app_h'+current_hint).toggleClass('hint_clickable hint_active');
	            		  if(!canvas_controller.get('exerciseSolved')) {
	            			  current_hint++;
	            			  $('#app_hints_navigator ul li#app_h'+current_hint).toggleClass('hint_clickable hint_active');
	            		  }
	            	}
            	//}
            	else {
            		var displayHint = global.canvas_controller.get('hintsUsed')[index - 1];
                    if (displayHint && displayHint.status != 'error') {
                        if (!global.canvas_controller.get('exerciseSolved')) {
                            current_hint++;
                            $('#app_hints_navigator ul li#app_h' + current_hint).toggleClass('hint_clickable hint_active');
                        }
                    }
            	}
            }// */            
            
        }

        // if you clicked an available hint
        if ($('#app_hints_navigator li#app_h' + index).hasClass('hint_clickable') || $('#app_hints_navigator li#app_h' + index).hasClass('hint_used')) {
            // display the hint box
            $('#app_hint').show(100);
            // display and animate the caret
            $('#app_hint_caret').css({
                'display': 'block'
            });
            $('#app_hint_caret').animate({
                left: $('#app_hints_navigator li#app_h' + index).position().left
            }, 150);
        }

    }

    global.closeHintbox = function () {
        hideHint();
    }

    global.showTools = function (tool_type) {
        if (global.canvas_controller) {
            var canvas = global.canvas_controller.get('canvas');
            var theTool = global.canvas_controller.get('currentObject').get('initialData');
            var path = '';
            if (tool_type == 'ruler' && !ruler) {
                //show ruler
                path = theTool.tools[tool_type];
                ruler = true;
            } else if (tool_type == 'ruler' && ruler) {
                //hide ruler
                ruler = false;
                canvas.forEachObject(function (obj) {
                    if (obj.type == 'image' && obj.tool == 'ruler') {
                        canvas.remove(obj);
                        canvas.renderAll();
                    }
                });
            }
            if (tool_type == 'protractor' && !protractor) {
                path = theTool.tools[tool_type];
                protractor = true;
            } else if (tool_type == 'protractor' && protractor) {
                protractor = false;
                canvas.forEachObject(function (obj) {
                    if (obj.type == 'image' && obj.tool == 'protractor') {
                        canvas.remove(obj);
                        canvas.renderAll();
                    }
                });
            }
            if (tool_type == 'calculator' && !calculator) {
                // show calculator
                calculator = true;
                console.log('showing calculator');
                protractor = false;
                ruler = false;
                scientific = false;
                global.removeTools('protractor');
                global.removeTools('ruler');
                global.removeTools('scientific');
                if ($('#calculator_field').length == 0) {
                    $('#app_exercise_container').append('<input type="text" id="calculator_field" style="position: absolute; z-index: 1; top: 100px; left: 200px; display: block;" />');
                    $('#calculator_field').calculator({
                        showOn: "focus"
                    });
                }
                $('#calculator_field').blur();
                $('#calculator_field').focus();
                $('.calculator-row:last button.calculator-digit:first').addClass('myBtn');
            } else {
                // hide calculator
                calculator = false;
                global.removeTools('calculator');
            }
            if (tool_type == 'scientific' && !scientific) {
                // show scientific calculator
                scientific = true;
                console.log('showing scientific calculator');
                protractor = false;
                ruler = false;
                calculator = false;
                global.removeTools('protractor');
                global.removeTools('ruler');
                global.removeTools('calculator');
                if ($('#scientific_field').length == 0) {
                    $('#app_exercise_container').append('<input type="text" id="scientific_field" style="position: absolute; z-index: 1; top: 100px; left: 200px; display: block;" />');
                    $('#scientific_field').calculator({
                        showOn: "focus",
                        layout: $.calculator.scientificLayout
                    });
                }
                $('#scientific_field').blur();
                $('#scientific_field').focus();
                $('.calculator-row button.calculator-equals').addClass('myBtnEq');
                $('.calculator-row:last').css({
                    'margin-top': '-48px',
                    'float': 'left'
                });
            } else {
                // hide calculator
                scientific = false;
                global.removeTools('scientific');
            }
            if (path) {
                fabric.Image.fromURL(path, function (oImg) {
                    oImg.left = 350;
                    oImg.top = 400;
                    oImg.hasControls = oImg.hasBorders = oImg.selectable = true;
                    oImg.hasRotatingPoint = true;
                    oImg.lockScalingX = oImg.lockScalingY = true;
                    oImg.set({
                        tool: tool_type
                    });
                    canvas.add(oImg);
                    canvas.bringToFront(oImg);
                });
            }
            // disables and enables the text over the canvas so we can see the toolkit
            if ($('#app_exercise_left')) {
                $('#app_exercise_left').css('display', 'none');
            }
            if (!ruler && !protractor) {
                $('#app_exercise_left').css('display', 'block');
            }
        }
    }

    global.updateflexcroll = function () {
        if (global.canvas_controller) {
            global.canvas_controller.get('currentObject').updateflexcroll();
        }
    }

    /**
     * Get answer data
     * @returns JSON encrypted data to be sent to the softcrylic team for checking
     */
    global.getAnswerData = function () {
        if (global.canvas_controller && !_.isEmpty(global.canvas_controller.get('currentObject'))) {
            return global.canvas_controller.getAnswerData();
        }
        return {};
    }
    /**
     * Reset answer data
     * @returns nil
     * TBD by: FG
     */
    global.resetAnswer = function () {
        console.log('TBD: reset answer data to original state');
    }

    /**
     * Parse checkAnswer response and display the feedback message
     * @param data @type object: JSON {overlayImage, text, audioFilePath}
     * @returns nil
     * TBD by: FG
     */
    global.showFeedback = function (data) {
        if (global.canvas_controller) {
            global.canvas_controller.parseCheckAnswerResponse(data);
        }
    }
    
    /**
     *  Parse saveAnswer response and display the growl message
     *  @param {object} data JSON {overlayImage, text, audioFilePath}
     *  @return nil
     */
    global.showSaveFeedback = function(data) {
      if (global.canvas_controller) {
    	  global.canvas_controller.parseSaveAnswerResponse(data);
    	  console.log(data);
      }
    }
    
    /**
     * Global function for showing growl messages
     */
    global.showGrowlMessage = function(message){
    	$("#growlMessageWrapper .growl-message-right").html(message);
    	$("#growlMessageWrapper").fadeIn("900").delay(3000).fadeOut(900);
    	$(".transparentOverlay").fadeIn("900",function(){
    		$(this).css('display','block');
    	}).delay('3000').fadeOut('900',function(){
    		$(this).css('display','none');
    	});
    }

    /**
     * Hide feedback message
     * @returns nil
     * TBD by: FG
     */
    global.hideFeedback = function () {
        hideHint();
    }

    /**
     * Load next question
     * @param itemId @type integer - id of the next question to be loaded
     * load the current data
     * @returns nil
     * TBD by: FG
     */
    global.loadNextQuestion = function (itemId) {
        console.log('TBD: load next question');
    }

    /**
     * Check if audio is turned on
     * @returns boolean value: true if sound on
     */
    global.isAudioOn = function () {
        return global_sound;
    }

    /**
     * Set audio on or off
     * @param value @type boolean - true for on, false for off
     * @returns nil
     */
    global.toggleAudio = function (value) {
        global_sound = value;
        global.closeHintbox();
        global.setHintsSound();
    }


    /**
     * Set hints sound on or off according to global sounds
     * @returns nil
     */
    global.setHintsSound = function () {
        hints_sounds.length = 0;
        for (var hs = 0; hs < global.existingHints; hs++) {
            hints_sounds[hs] = global_sound;
        }
    }
    /**
     * Print the syudent response in AM 11
     * @params isGraded: boolean value
     */
    global.printResponseDetails = function(isGraded) {
    	if (canvas_controller && canvas_controller.get('currentObject') && typeof canvas_controller.get('currentObject').printResponseDetails == 'function') {
    	    canvas_controller.get('currentObject').printResponseDetails(isGraded);
    	}
    	
    	//Analytics
    	/*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am11.print');
    	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
    }

    /**
     * Enables prompt sound if global sound if off or plays the sound
     * @return nil
     */
    global.promptSound = function (obj) {
        if ($(obj).hasClass('prompt_muted')) {
            $(obj).removeClass('prompt_muted');
        } else {
            if (!isPlaying) {
                $(obj).addClass('prompt_playing');
                var mySound = soundManager.createSound({
                    id: $(obj).attr('src'),
                    url: $(obj).attr('src')
                });
                isPlaying = true;
                soundManager.play($(obj).attr('src'), {
                    onfinish: function () {
                        $(obj).removeClass('prompt_playing');
                        isPlaying = false;
                    }
                });
            }
        }
    }

    /**
     * Calls the reset exercise method of the current tool, if present
     */
    global.reset_question_form = function () {
        if (global.canvas_controller && global.canvas_controller.get('currentObject') && typeof global.canvas_controller.get('currentObject').resetQuestionForm == 'function') {
            global.canvas_controller.get('currentObject').resetQuestionForm();
        }
    }

    global.getItemData = function (url) {
        var result = '';

        url = url.replace("feeds", global.URL_CONFIG.AM_FEEDS);
        //url = url.replace("feeds", global.URL_CONFIG.AM_FEEDS);
        $.ajax({
            url: url,
            async: false,
            success: function (data) {
                result = inputData.root;
            },
            error: function (e, x, r) {
                console.log('Error loading data');
                console.log(e, x, r)
            }
        });
        return result;
    }

    /**
     * Fetching of json according to product ID and item ID taken from the URL
     *
     */
    /*
	$(window).load(function() {
	  var id = global.getURLParameter('itemID'),
	      productId = global.getURLParameter('productID'),
	      exercise = location.hash.replace(/^#/, ''),
	      data = getQuestionItem(id, productId);
	
	  console.log('ex: ', exercise);
	  console.log('id: ', id);
	  console.log('productid: ', productId);
	
	  if (!id || !exercise || !data) {
	    alert('Unknown exercise...');
	    window.close();
	    return;
	  }
	  data.id = id;
	  data.productID = productId;
	  global.setDefaultData(data, exercise);
	});
	*/



    global.showPassageOrTools = function (ele) {

        if (ele && (ele.id == 'app_view_selection')) {
            global.viewSelection();
        } else {
            global.showToolBox();
        }


    }



    /**
     * Initializing Global and fetching the JSON
     */
    function init() {
        //load all neccessary files to platform dom once
        if ((!window.defaultResourceLoaded) && params.obtainRequiredResources) {
            loadDefaultResources();
            window.defaultResourceLoaded = true;
        }
        if(!params.questionData){
        	var id = params.questionId,
            	productId = global.getURLParameter('productID'),
            	data = getQuestionItem(id, productId),
            	completeData = getCompleteQuestionItem(id, productId),
            	exercise = data.code;
        	global.completeData = completeData;
	        console.log('ex: ', exercise);
	        console.log('id: ', id);
	        console.log('productid: ', productId);
	
	        if (!id || !exercise || !data) {
	            alert('Unknown exercise...');
	            window.close();
	            return;
	        }
	
	
	        data.id = id;
	        data.productID = productId;
        } else{
        	var data = params.questionData,        		
        		exercise = data.code;
        }
        defData = data;
        //global.setDefaultData(data, exercise);
    }

    /**
     * Returns the same number with a maximum number of decimals, taking care of the floating point issues
     * @param int max_decimals
     * @returns {unresolved}
     */
    Number.prototype.roundDecimals = function (max_decimals) {
        if (max_decimals == null) {
            max_decimals = 0;
        }
        return parseFloat(this.toFixed(max_decimals));
    }
    
    global.showpopup = function(){
    	global.canvas_controller.get('currentObject').showpopup();
    }

    global.closepopup = function(save){
    	global.canvas_controller.get('currentObject').closepopup(save);
    }

    global.exitAssignment = function(){
    	global.canvas_controller.get('currentObject').exitAssignment();
    }

    global.nextGradedAssignment = function(){
    	global.canvas_controller.get('currentObject').nextGradedAssignment();
    }    

    /**
     * Open Selection modal screen
     * @return nil
     */
    global.viewSelection = function () {    	    	
        var currentData = global.canvas_controller.get('currentObject').get('initialData');        
        for (var asset_count = 0; asset_count < currentData.assets_used.length; asset_count++) {
            if (currentData.assets_used[asset_count].asset_type == "selection") {
                var passage = currentData.assets_used[asset_count].text;
            }
        }
        $('#app_header').css('z-index', '5');
        $('#app_selection_overlay').remove();
        $('#app_selection_body_overlay').remove();
        //$('body').append('<div id="app_selection_body_overlay" style="z-index: 40;"></div>');
        params.namespace.container.append('<div id="app_selection_overlay" style="z-index: 499;"></div>');
        
        //removing this line as it affects page scrolling when we move from iframe implementation to container based one
        //$('body').css('overflow', 'hidden');
        
        $('#app_selection_popup').remove();
        var waggleProperties = window.waggleui.model.getWaggleProperties();
        params.namespace.container.append('<div id="app_selection_popup" class="passage"><a href="javascript:;" id="app_selection_close"><span id="close_button_text">'+waggleProperties['label.ams.passage.close']+'</span><span id="close_button_viewselection"></span></a><div id="app_selection_content">' + passage + '<div class="passage_end"></div></div></div>');
        $('#app_selection_popup').css({
            'width': '670px',
            'height': '496px',
            /* 'margin-top': '-285px', 'margin-left': '-475px',*/ 'z-index': '500'
        });

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

        setTimeout(function () {
            fleXenv.fleXcrollMain('app_selection_content');
        }, 600);


        $('#app_selection_close').click(function () {
            $('#app_header').css('z-index', '500');
            $('#app_selection_overlay').remove();
            $('#app_selection_body_overlay').remove();
            $('#app_selection_popup').remove();
            $('body').css('overflow', 'auto');
        });
      
        if (currentData['code'] == 'open-response'){
        	//Analytics
            /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am11.viewPassage');
            window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        }else{
        	//Analytics
            /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am.viewPassage');
            window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        }
    }

    global.showToolBox = function () {
        $('#app_toolbox').toggle();
        $('#app_show_tools').toggleClass('active');
        
      //Analytics
        /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am.tools');
        window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
    }

    global.removeTools = function (tool_type) {
        canvas.forEachObject(function (obj) {
            if (obj.type == 'image' && ((obj.tool == tool_type.replace(" ", "_")) || (obj.tool == 'ctrl_' + tool_type.replace(" ", "_")))) {
                canvas.remove(obj);
                canvas.renderAll();
            }
        });
        ruler = false;
        protractor = false;
        calculator = false;
        scientific = false;
        $('#scientific_field').remove();
        $('#calculator_field').remove();
    }

    global.showTools = function (tool_type) {
        var mouseX = 0;
        var mouseY = 0;
        if (global.canvas_controller) {
            var canvas = global.canvas_controller.get('canvas');
            var theTool = global.canvas_controller.get('currentObject').get('initialData');
            var path = '';
            $('.canvas-container').css({
                'z-index': ''
            });
            if (!_.isUndefined(global.canvas_controller.get('currentObject').active_tool)) {
                global.removeTools(global.canvas_controller.get('currentObject').active_tool);
            }
            if ((tool_type == global.canvas_controller.get('currentObject').active_tool)) {
                delete global.canvas_controller.get('currentObject').active_tool;
                return;
            }
            path = theTool.tools[tool_type];
            global.canvas_controller.get('currentObject').active_tool = tool_type;
            if (tool_type.indexOf('ruler') != -1) {
                ruler = true;
                $('.canvas-container').css({
                    'z-index': '5010'
                });
            } else if (tool_type.indexOf('protractor') != -1) {
                protractor = true;
                $('.canvas-container').css({
                    'z-index': '5010'
                });
            }
            if (tool_type == 'scientific') {
                scientific = true;
                if ($('#scientific_field').length == 0) {
                    $('#app_exercise_container').append('<input type="text" id="scientific_field" readonly="true" style="position: absolute; z-index: 1; top: 100px; left: 200px; display: block;" />');
                    $('#scientific_field').calculator({
                        showOn: "focus",
                        layout: $.calculator.scientificLayout
                    });
                }
                $('#scientific_field').focus();
                $('.calculator-row button.calculator-equals').addClass('myBtnEq');
                $('.calculator-row:last').css({
                    'margin-top': '-48px',
                    'float': 'left'
                });
                $( ".calculator-popup" ).draggable({ containment: "#app_exercise_container" });
            }
            if (tool_type == 'calculator') {
            	//making scientific as false to prevent any ambiguities.
            	scientific = false;
                calculator = true;
                if ($('#calculator_field').length == 0) {
                    $('#app_exercise_container').append('<input type="text" id="calculator_field" readonly="true" style="position: absolute; z-index: 1; top: 100px; left: 200px; display: block;" />');
                    $('#calculator_field').calculator({
                        showOn: "focus"
                    });
                }
                $('#calculator_field').focus();
                $('.calculator-row:last button.calculator-digit:first').addClass('myBtn');
                $( ".calculator-popup" ).draggable({ containment: "#app_exercise_container" });
            }

            if (path) {
                var coordX1 = 0;
                var coordX2 = 0;
                var coordY = 0;
                fabric.Image.fromURL(path, function (oImg) {
                    oImg.left = 300;
                    oImg.top = 200;
                    oImg.hasControls = oImg.selectable = true;
                    oImg.set({
                        cornerSize: 0
                    });
                    oImg.hasRotatingPoint = oImg.hasBorders = false;
                    oImg.lockScalingX = oImg.lockScalingY = true;
                    oImg.set({
                        tool: tool_type.replace(" ", "_")
                    });
                    canvas.add(oImg);
                    canvas.bringToFront(oImg);
                    coordX1 = oImg.left - oImg.width / 2;
                    coordX2 = oImg.left + oImg.width / 2;
                    coordY = oImg.top + oImg.height / 2;
                    buildRotation(coordX1, coordX2, coordY);
                });

                function buildRotation(coordX1, coordX2, coordY) {
                    fabric.Image.fromURL('images/rotate.png', function (oImg) {
                        oImg.hasControls = oImg.selectable = true;
                        oImg.set({
                            cornerSize: 0
                        });
                        oImg.hasRotatingPoint = oImg.hasBorders = false;
                        oImg.lockScalingX = oImg.lockScalingY = oImg.lockMovementX = oImg.lockMovementY = true;
                        oImg.set({
                            tool: 'ctrl_' + tool_type.replace(" ", "_")
                        });
                        oImg.set({
                            rotation: 'up'
                        });
                        canvas.add(oImg);
                        oImg.left = coordX1 - oImg.width / 2;
                        oImg.top = coordY + oImg.height / 2;
                        canvas.bringToFront(oImg);
                    })
                    fabric.Image.fromURL('images/rotate2.png', function (oImg) {
                        oImg.hasControls = oImg.selectable = true;
                        oImg.set({
                            cornerSize: 0
                        });
                        oImg.hasRotatingPoint = oImg.hasBorders = false;
                        oImg.lockScalingX = oImg.lockScalingY = oImg.lockMovementX = oImg.lockMovementY = true;
                        oImg.set({
                            tool: 'ctrl_' + tool_type.replace(" ", "_")
                        });
                        oImg.set({
                            rotation: 'down'
                        });
                        canvas.add(oImg);
                        oImg.left = coordX2 + oImg.width / 2;
                        oImg.top = coordY + oImg.height / 2;
                        canvas.bringToFront(oImg);
                    })

                }
                setTimeout(function () {
                for (var objIndex = 0; objIndex < canvas.getObjects().length; objIndex++) {
                    canvas.getObjects()[objIndex].setCoords();
                }
                }, 1000);
            }
            // disables and enables the text over the canvas so we can see the toolkit
            if ($('#app_exercise_left')) {
                $('#app_exercise_left').css('display', 'none');
            }
            if (!ruler && !protractor) {
                $('#app_exercise_left').css('display', 'block');
            }
            canvas.on({
                'mouse:down': function (e) {
                    if (ruler && e.target && (!_.isUndefined(e.target.tool)) && (!_.isUndefined(e.target.rotation))) {
                        for (var objIndex = 0; objIndex < canvas.getObjects().length; objIndex++) {
                            if (canvas.getObjects()[objIndex].tool == global.canvas_controller.get('currentObject').active_tool.replace(" ", "_")) {
                                if (e.target.rotation == "up") {
                                    canvas.getObjects()[objIndex].set({
                                        angle: canvas.getObjects()[objIndex].angle + global.RULERROTATIONANGLE
                                    });
                                } else {
                                    canvas.getObjects()[objIndex].set({
                                        angle: canvas.getObjects()[objIndex].angle - global.RULERROTATIONANGLE
                                    });
                                }
                                canvas.calcOffset();
                            }
                        }
                    }
                    if (protractor && e.target && (!_.isUndefined(e.target.tool)) && (!_.isUndefined(e.target.rotation))) {
                        for (var objIndex = 0; objIndex < canvas.getObjects().length; objIndex++) {
                            if (canvas.getObjects()[objIndex].tool == global.canvas_controller.get('currentObject').active_tool.replace(" ", "_")) {
                                if (e.target.rotation == "up") {
                                    canvas.getObjects()[objIndex].set({
                                        angle: canvas.getObjects()[objIndex].angle + global.PROTRACTORROTATIONANGLE
                                    });
                                } else {
                                    canvas.getObjects()[objIndex].set({
                                        angle: canvas.getObjects()[objIndex].angle - global.PROTRACTORROTATIONANGLE
                                    });
                                }
                                canvas.calcOffset();
                            }
                        }
                    }
                },
                'object:moving': function (e) {
                    if (e.target && (!_.isUndefined(e.target.tool)) && (e.target.tool == global.canvas_controller.get('currentObject').active_tool.replace(" ", "_"))) {
                        for (var objIndex = 0; objIndex < canvas.getObjects().length; objIndex++) {
                            if (canvas.getObjects()[objIndex].tool == "ctrl_" + global.canvas_controller.get('currentObject').active_tool.replace(" ", "_")) {
                                if (canvas.getObjects()[objIndex].rotation == "up") {
                                    canvas.getObjects()[objIndex].left = e.target.left - canvas.getObjects()[objIndex].width - e.target.width / 2;
                                    canvas.getObjects()[objIndex].top = e.target.top + canvas.getObjects()[objIndex].height / 2 + e.target.height / 2;
                                } else {
                                    canvas.getObjects()[objIndex].left = e.target.left + canvas.getObjects()[objIndex].width + e.target.width / 2;
                                    canvas.getObjects()[objIndex].top = e.target.top + canvas.getObjects()[objIndex].height / 2 + e.target.height / 2;
                                }
                                canvas.getObjects()[objIndex].setCoords();
                            }
                            e.target.setCoords();
                        }
                    }
                }
            })
        }
    }

    /**
     * Generates a fraction representation of a number
     * @return array(numerator, denominator)
     */
    Number.prototype.toFraction = function () {
        if (parseInt(this) == this) {
            return [this, 1];
        }

        function getMaxNumerator(f) {
            var f2 = null;
            var ixe = f.toString().indexOf("E");
            if (ixe == -1) ixe = f.toString().indexOf("e");
            if (ixe == -1) f2 = f.toString();
            else f2 = f.toString().substring(0, ixe);

            var digits = null;
            var ix = f2.toString().indexOf(".");
            if (ix == -1) digits = f2;
            else if (ix == 0) digits = f2.substring(1, f2.length);
            else if (ix < f2.length) digits = f2.substring(0, ix) + f2.substring(ix + 1, f2.length);

            var L = digits;

            var numDigits = L.toString().length;
            var L2 = f;
            var numIntDigits = L2.toString().length;
            if (L2 == 0) numIntDigits = 0;
            var numDigitsPastDecimal = numDigits - numIntDigits;

            for (var i = numDigitsPastDecimal; i > 0 && L % 2 == 0; i--) L /= 2;
            for (var i = numDigitsPastDecimal; i > 0 && L % 5 == 0; i--) L /= 5;

            return L;
        }

        var d = Math.abs(this);

        var numerators = [0, 1];
        var denominators = [1, 0];

        var maxNumerator = getMaxNumerator(d);

        var d2 = d;
        var calcD, prevCalcD = NaN;
        for (var i = 2; i < 1000; i++) {
            var L2 = Math.floor(d2);
            numerators[i] = L2 * numerators[i - 1] + numerators[i - 2];
            if (Math.abs(numerators[i]) > maxNumerator) {
                break;
            }

            denominators[i] = L2 * denominators[i - 1] + denominators[i - 2];

            calcD = numerators[i] / denominators[i];
            if (calcD == d || calcD == prevCalcD) {
                break;
            }

            prevCalcD = calcD;

            d2 = 1 / (d2 - L2);
        }

        var last_index = denominators.length - 1;
        return [numerators[last_index] * (this < 0 ? -1 : 1), denominators[last_index]];
    }

    global.returnStrippedHtml = function (input, allowed) {
        input = input.replace(/<!doctype html>/i, "").replace(/<title>[\W\w]+<\/title>/ig, "").replace(/<style[\W\w]+<\/style>/ig, "").replace(/(\n\s*)+/ig, '\n');
        allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
        var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
            commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
        return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
            return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
        });
    }

    function loadDefaultResources() {
        var essentialResourcesMap;
        $.ajax({
            url: params.ENV + '/config_JSONs/requiredFiles.js',
            dataType: 'script',
            async: false,
            cache: true,
            success: function (data) {
                console.log('Successfully loaded Authoring Tool JS class requiredFiles.js');
                essentialResourcesMap = requiredFiles(params.ENV).root;
            },
            error: function () {
                console.log('Failed loading Authoring Tool JS class requiredFiles.js');
            }
        });

        for (var i = 0; i < essentialResourcesMap.length; i++) {
            global.Util.loadResource(essentialResourcesMap[i]);
        }
    }
    
   global.removeActiveTool = function(){
    	delete global.canvas_controller.get('currentObject').active_tool;
    }

    //exposing method to window level
    window.getItemData = global.getItemData;
    window.viewSelection = global.viewSelection;
    window.reset_question_form = global.reset_question_form;
    window.showToolBox = global.showToolBox;
    window.showTools = global.showTools;
    window.removeTools = global.removeTools;
    window.removeActiveTool = global.removeActiveTool;
    //initializing global 
    init();
}