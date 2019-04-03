window.waggleui.view = (function () {
	var classNavigationArray = [];
    function bindEvents() {
        if (window.orientation != undefined) {
            $('body').removeClass('no-touch');
        }
		if( (window.waggleui.model.getUserProfile()) && (window.waggleui.model.getUserProfile().role == 'teacher') ){
			$('.teacher-student-preview').removeClass('hide');
			$("#drop1 .sign-out").addClass('hide');	
		}
        var $classMark = $('.class-mark'),
            $usersList = $('.users-list'),
            $drop1 = $('#drop1'),
            $headerWrapper = $('#headerWrapper');

        $(".app-avatar-wrapper").off('click.open').on('click.open',".dropdown",function (e) {
            $drop1.slideToggle();
            e.stopPropagation();	        
        });
                
        $("#sdbHelp").off('click.sdbhelp').on('click.sdbhelp', function (e) {
        	//Analytics
	        /*var analyticsRequestObject = prepareAnalyticsObject ('label.header.help');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
        /*$("#app_exercise_container").off('click.bad-question').on('click.bad-question',"#badQuestion",function (e) {
        	window.waggleui.services.getBadQuestionOptions();
        });*/
        
        $(".close-report-bad-question-Modal-js").off('click.close-bad-question-modal').on('click.close-bad-question-modal',function (e) {
        	$("#reportBadQuestionModalOverlay, #reportBadQuestionModal").toggleClass('hide');
        });
        
        $("#sendBadQuestion").off('click.send-bad-question').on('click.send-bad-question',function (e) {
        	var reason = $("#chooseBadQuestionOptions .current").text(),
        		reasonId = "",
        		badQuestionOptions = window.waggleui.model.getBadQuestionOptions()['problemOptions'],
        		description = $("#badQuestionDescription").val(),
        		completeItem = window.waggleui.model.getCompleteAmsItemobject(),
        		currentClass = window.waggleui.model.getCurrentClassObject(),
        		widthHeight = window.innerWidth + "*" + window.innerHeight,
        		browserInfo = getBrowserInfo(),
        		preferenceObject = {
        			"item":{
        				"itemId": completeItem['item']['itemId'],
        				"knewtonModuleId": "",
        				"itemSubject": "",
        				"code": completeItem['item']['code']
        			},
        			"student":{
        				"studentId": completeItem['profile']['studentId'],
        				"grade": currentClass['grade'],
        				"className":currentClass['className'],
        				"classId": currentClass['classId'],
        				"classViewRegId": currentClass['classViewRegId'],
        				"schoolCode":completeItem['profile']['schoolId']
        			},
        			"device":{
        				"diviceType":navigator.platform,
        				"browser":browserInfo.browserName,
        				"version":browserInfo.fullVersion,
        				"screenResolution":widthHeight
        			},
        			"assignment":{
        				"assignmentId": completeItem['assignment']['info']['assignmentId'],
        				"studentAssignmentId": completeItem['assignment']['info']['studentAssignmentId'],
        				"assignmentName": completeItem['assignment']['info']['assignmentName'],
        				"goalId": completeItem['assignment']['info']['goalId'],
        				"knewtonGoalId": completeItem['assignment']['info']['knewtonGoalId'],
        				"knewtonLearningInstanceId": completeItem['assignment']['info']['knewtonLearningInstanceId'],
        				"knewtonRegistrationId": completeItem['assignment']['info']['knewtonRegistrationId']
        			},
        			"problemSelected":{
        				"id":reasonId,
        				"value": reason
        			},
        			"comments":description
        		};
        	for (var i=0; i<badQuestionOptions.length; i++){
				if (badQuestionOptions[i]["value"] == reason){
					reasonId = badQuestionOptions[i]["id"];
				}
			}
        	preferenceObject.problemSelected.id = reasonId;
        	window.waggleui.services.reportBadQuestion(preferenceObject);
        });

        $(".dropdown").off('touchstart.opendropdown').on('touchstart.opendropdown', function (e) {
            e.stopPropagation();
        });
        $(document).off('click.close').on('click.close', function (e) {
            if (!$(e.target).hasClass(".dropdown") && $(e.target).parents("#drop1").length == 0) {
                $drop1.slideUp();
            }
        });

        $(document).off('touchstart.closedropdown').on('touchstart.closedropdown', function (e) {
            if (!$(e.target).hasClass(".dropdown") && $(e.target).parents("#drop1").length == 0) {
                $drop1.slideUp();
            }
        });
        
        $(".contact-js").off('click.click-contact-us').on('click.click-contact-us', function (e) {
        	//Analytics
        	/*var analyticsRequestObject = prepareAnalyticsObject ('label.footer.contactUs');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
        $(".privacy-js").off('click.click-privacy').on('click.click-privacy', function (e) {
        	//Analytics
        	/*var analyticsRequestObject = prepareAnalyticsObject ('label.footer.privacyPolicy');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
        $(".terms-and-condition-js").off('click.click-terms-and-condition').on('click.click-terms-and-condition', function (e) {
        	//Analytics
        	/*var analyticsRequestObject = prepareAnalyticsObject ('label.footer.termsAndConditions');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
        $(".disclaimer-js").off('click.click-disclaimer').on('click.click-disclaimer', function (e) {
        	var waggleProperties = window.waggleui.model.getLocaleBaseModel();
        	
        	$("#windowOverlay").toggleClass('hide');
        	$("#disclaimerIframe").attr("src",waggleProperties["url.footer.disclaimer"]);
    		$(".disclaimer-modal").toggleClass('hide');
    		//Analytics
    		/*var analyticsRequestObject = prepareAnalyticsObject ('label.footer.disclaimer');
    		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
        $(".disclaimer-close-js").off('click.close-disclaimer').on('click.close-disclaimer', function (e) {
    		$("#windowOverlay").toggleClass('hide');
    		$(".disclaimer-modal").toggleClass('hide');
    	});
        
        //close icon for System Error PopUp
        $("#errorMessageModal .close-server-error-modal-js").off('click.close-server-error-modal').on('click.close-server-error-modal', function (e) {
        	$("#errorMessageModal, #errorMessageModalOverlay").addClass("hide");
        });
        
	      //onClose of Game Modal PopUp
	        $('#closeGame').off('click.close-game-modal').on('click.close-game-modal', function () {	        	
        		var modalFrom = $("#appMenu a.active span.menu-item-title").html().toLowerCase(),
        			restoreProperties = {
	        			'activeClassId': $("#users-list-nav .viewport .active").attr('classviewid'),
	        			'game': {
	        				"modalFrom":modalFrom
	        			}
	        		};
        		sessionStorage.setItem("closeGame", true);
        		sessionStorage.setItem( "gameRestoreProperties", JSON.stringify(restoreProperties) );
        		
        		$('.games-modal , #gameModalOverlay').addClass('hide');	//close Game Modal
        		location.reload();        		
	        	//window.waggleui.sessionStorage = window.waggleui.model;	        	
	        });
		
        /* Ipad - stopped default behaviour - starts  */
        /*document.addEventListener('touchmove', function(e) {
        	e.preventDefault();
        	e.stopPropagation();
        }, false);*/
	        var handleMove = function (e) {
	            var scrollable = false;
	            var items = $(e.target).parents();
	            $(items).each(function(i,o) {
	                if($(o).hasClass("cke_contents")) {
	                    scrollable = true;
	                }
	            });
	            if(!scrollable)
	                e.preventDefault();
	        };
	        document.addEventListener('touchmove', handleMove, true);
        /* Ipad - stopped default behaviour - ends  */
        
        /* Mouse Wheel on Assignment List - do scrolling - Starts */
		
		$("#wrapperleft").off('mousewheel.onAssignmentscroll').on('mousewheel.onAssignmentscroll', function (event) {
			
			// if note or lock tool tip popup visible, close it
			//noteAndLockPopUpClose ();
			
			//skillsPopupCloseOnOutsideClick (event);	//if skill meter pop up open, close it.
			$("#assignmentStatusPopup .close-wrapper").trigger('click');	//if skill meter pop up open, close it.
			
			if( $('#assignmentHighlighter').is(':visible') ){
       		   $('#assignmentHighlighter').css({"display":"none"});
       	   	}
			
			if (event.deltaY < 0) {
				_assignmentListScrollUpDown ('down');
			}else if (event.deltaY > 0) {
				_assignmentListScrollUpDown ('up');
			}
		});
		
		var assignmentScrolling = 0,
		assignmentPaginationNextRel = null,
		assignmentPaginationPrevRel = null;
		
		function _assignmentListScrollUpDown (direction){
			if (assignmentScrolling==0) {
				assignmentScrolling=1;
				
				var currentRel = parseInt($("a.active", "#assignmentListPaginationWrapper .pager").attr("rel"));
				if (direction == 'down') {
						//console.log ("scrolling downwards");	// scrolling downwards
						assignmentPaginationNextRel = currentRel + 1;
						$("a[rel='"+assignmentPaginationNextRel+"']","#assignmentListPaginationWrapper .pager").trigger("click");													
				}else if (direction == 'up') {
					//console.log ("scrolling upwards");	// scrolling upwards
					assignmentPaginationPrevRel = currentRel - 1;
					$("a[rel='"+assignmentPaginationPrevRel+"']","#assignmentListPaginationWrapper .pager").trigger("click");					
				}
				setTimeout(function(){
					assignmentScrolling=0;						
				},500);
			}
		}
		/* Mouse Wheel on Assignment List - do scrolling - ends */
		
		/* Assignment List - Drag up and down for Pads starts */
		//Drag up
        Hammer('#wrapperleft').off('dragup').on('dragup', function () {
        	dragupFlag = true;
        	
        	Hammer('#wrapperleft').off('release').on('release', function () {		            	
                if (dragupFlag) {
                	dragupFlag = false;	                	
					//my code here
                	_assignmentListScrollUpDown ('down');
                }
            });
        });	            
        
        //Drag Down
        Hammer('#wrapperleft').off('dragdown').on('dragdown', function () {
        	dragdownFlag = true;
        	
        	Hammer('#wrapperleft').off('release').on('release', function () {
                if (dragdownFlag) {
                	dragdownFlag = false;
                	//my code here
                	_assignmentListScrollUpDown ('up');
                }
            });
        });	            
        /* Assignment List - Drag Left and right for Pads ends */
        
        
        /* Assignment List - When window resize - adjust the assignment list count - starts */
        var assignmentListingResizeTimeout = null;
        $(window).off('resize.assignment-listing-adjustment').on('resize.assignment-listing-adjustment', function (e) {        	
        	clearTimeout(assignmentListingResizeTimeout);
        	assignmentListingResizeTimeout = setTimeout(function(){
        		assignmentListCarousel();
        		if ($("#alertMessagesScrollBar").css("display") == "block"){
        			_alertMessageOnResizeWindow(); //If alerts in expanded state, this function will update and set height for alerts.
        		}        		
			}, 2000);
        });
        /* Assignment List - When window resize - adjust the assignment list count - ends */
        
        
      //Click logo to go home page - SDB
        $("#logoWrapper a").off('click.goToSdb').on('click.goToSdb', function (e){
        	/**
        	 * 1. if first class is not active
        	 * 2. if we are in game page
        	 * 3. if we are in cleared assignment list page
        	 * 4. if we are in completed assignment page
        	 */
        	if ( ($('.users-list li:first a.active').length == 0) || ($('#appMenu li:eq(1) a.active').length == 1) || ($('#showHideCompleted a').text() == 'Hide Cleared') || ($("#completedAssignmentContainer").css("display") == 'block') ){
        		window.location.reload(true);
        	}
        	
        	/*if ($('.users-list li:first a.active').length == 0){
        		window.waggleui.services.loadProperties();
            	if(window.localStorage.teacherId != undefined && window.localStorage.classId != undefined){ //!= is intentionally used to cover both 'undefined' and 'null'.
            		window.waggleui.services.getInitData({'teacherId':window.localStorage.teacherId,'classId':window.localStorage.classId});
            	} else {
            		window.waggleui.services.getInitData({'studentId':$('.avatar-name').attr('studentId')});
            	}
            	//window.waggleui.view.init();
            	window.location.reload(true);
        	}*/        	
        });
        
        //class-navigation
        $('.users-list li').off('click.usersList').on('click.usersList', "a", function (e) {
        	// if(latestFeet){} //(flag to disable click for liftmeter) -vallabh
        	if(e.originalEvent) {
        		if($(this).hasClass('active')){
        			return false;
        		}
            }
        	/*if((user['class']).hasOwnProperty('hasGame') && user['class']['hasGame']=== false){
    			$('a.games-anchor').addClass('disableAnchorTag');
    		}*/
        	$('.assignment-status-popup').css({display:"none"}).attr('assignment_id','');
    		$('.assignment-row').css({opacity:"1"});
    		$('.skillMeterStatus').addClass('line-strip').removeClass('line-strip');
        	
    		noteAndLockPopUpClose ();
    		
    		//About Game - Starts Here
    		/*if ($("#gamesWrapper").css("display")== 'block'){    			
    			$("#gamesWrapper").css({"display":"none"});
    			$("#appMenu li:first a").addClass("active");
    			$("#appMenu li:eq(1) a").removeClass("active");
    		}*/
    		// About Game - Ends Here
        	
            var $usersListA = $(this),
            	preferenceObj = null,
            	localVariable = window.waggleui.model.getLocalProperties(), 
                waggleProperties = window.waggleui.model.getWaggleProperties();
            
            // reset the active class
            /*$usersList.find('a').removeClass('active');
            $usersListA.addClass('active');*/
            
            /*// Move carrot arrow to active class
            $classMark.animate({
                left: (($usersListA.position().left + $usersListA.width() / 2) - $classMark.outerWidth()+16 + 'px')
            }, 1000);*/
            
            //cloudyMessageBuilder(); (shifte to bottom for ajax call correction - vallabh

	    	/*if(	$('#completedAssignmentListWrapper').is(':visible'))
    		{
	    		//alertsHandling("assignmentsList");
	    		window.waggleui.animation.completedAssignmentEasingOut ("toRight");
    		}*/
	    	
	    	if(window.location.hash.search('itemId') === -1){}
            
          if (localVariable.callClearedAssignmentFromZeroState == "true"){
            		preferenceObj = {
                            'studentId': $('.avatar-name').attr('studentId'),
                            'classId': $usersListA.attr('classId'),
                            'classViewId': $usersListA.attr('classviewid'),
                            'cleared': 'on'	//'showCleared': 'off'
                    }
            		var currentClassViewId = $('.users-list').find('a.active').attr('classViewId');
            		localVariable.callClearedAssignmentFromZeroState = "";	//reset variable
            		window.waggleui.model.setLocalProperties(localVariable); // and store back to model	
            		if(currentClassViewId == preferenceObj.classViewId){
            			window.waggleui.services.loadAssignments(preferenceObj, "showCleared");
            		}else{
            			window.waggleui.services.loadAssignments(preferenceObj, "zeroStateShowCleared");
            		}
            		$("#showHideCompleted a").text(waggleProperties['label.content.hideCleared']);
            		$("#showHideCompleted").css({"display":"inline-block"});
            		$("#wrapperleft .assignment-row").addClass("cleared-assignment-row");	//hover is different for cleared assignment
            		$("#noAssignmentListWrapper").css({"display":"none"});
           }else{
            		preferenceObj = {
                            'studentId': $('.avatar-name').attr('studentId'),
                            'classId': $usersListA.attr('classId'),
                            'classViewId': $usersListA.attr('classviewid'),
                            'cleared': 'off'	//'showCleared': 'off'
                    }
            		if ($("#showHideCompleted a").text()== waggleProperties['label.content.hideCleared']){
        	        	$("#showHideCompleted a").text(waggleProperties['label.content.showCleared']);
        	        }
            		if(	$('#completedAssignmentListWrapper').is(':visible'))
            		{
            			setTimeout(function(){
            				window.waggleui.services.loadAssignments(preferenceObj, "class");
                    	},1000);
            		}else{
            			window.waggleui.services.loadAssignments(preferenceObj, "class");
            		}	
           }  
           //cloudyMessageBuilder('initial');
           
         }); //
        
        
        // Completed Assignment page, view all Assignments.
        $('#viewAllAssignments a').off('click.viewAllAssignments').on('click.viewAllAssignments',function(){
        	var checkClassSuggestion = window.waggleui.model.getCurrentClassObject(),
        		assignmentOrZeroFlag = null;        	
        	
			if ( (checkClassSuggestion.classSuggestions) && (checkClassSuggestion.classSuggestions.length > 0) ){
        		assignmentOrZeroFlag = 'zeroState'
        	}else{
        		assignmentOrZeroFlag = 'assignmentList'
        	}
        	
        	if(	$('#completedAssignmentListWrapper').is(':visible'))
	    		//alertsHandling("assignmentsList");
        		window.waggleui.animation.completedAssignmentEasingOut ("toRight","assignmentsList");
	    	if(window.location.hash.search('itemId') === -1){
	    		if (sessionStorage.getItem("feetsAndCloudyMessageUpdates")){
	    			sessionStorage.removeItem("feetsAndCloudyMessageUpdates");	    			
	    			var preferenceObj = {
                            'studentId': $('.avatar-name').attr('studentId'),
                            'classId': $("#users-list-nav .viewport .active").attr('classId'),
                            'classViewId': $("#users-list-nav .viewport .active").attr('classviewid')
                    }
	    			window.waggleui.services.getUpdatedCloudyAndFeetsInfo(preferenceObj);	    			
	    		}
    			setTimeout(function(){
	    			if ($("#wrapperleft ul li").length == 0){
	    				$("#wrapperleft").css({"height":"0px"});
	    			}
	    			if ( (checkClassSuggestion.cleared) && (checkClassSuggestion.cleared == 'on') ){
	    				window.waggleui.animation.assignmentEasingIn (assignmentOrZeroFlag);
	    			}else{
	    				if (checkClassSuggestion.hasTeachers == 'on'){
		    				window.waggleui.animation.assignmentEasingIn (assignmentOrZeroFlag);
		    			}else{
	    					$("#classHasNoTeacher, #errorMessageModalOverlay").removeClass("hide");
		    				$('.main-container').delay(1500).removeClass('remove-dotted-bg');
		    				$('#lift_level,.score_marker').delay(750).animate({opacity: '1'}, 500);	    				
		    			}
	    			}
	    			window.waggleui.animation.cloudEasingIn ();	    			
	    			window.waggleui.controller.cloudyMessageBuilder('initial');
    			},1500);	    		
	    	}
	    	
	    	//Analytics - pageview
	    	/*var analyticsRequestObjectPageView = window.waggleui.view.prepareAnalyticsObjectForPageView ('SDB Assignments');
	    	window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
	    	
	    	//Analytics
	    	/*var analyticsRequestObject = prepareAnalyticsObject ('label.completedAssignments.allAssignments');
	    	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
	    $(".completed-assignmnet-pagination-wrapper").off('click.dotClick').on('click.dotClick', "li[class!='selected']", function () {
	    	
	    //	window.waggleui.controller.getAssignmentListByPagination($(this).text());
    		var responseObj = window.waggleui.model.getCompletedAssignmentSkills(),
			pager = $(this).text();  	
		 	window.waggleui.controller.getCompletedAssignmentSkills(responseObj,pager);
	    	$('.completed-assignmnet-pagination-wrapper li').removeClass('selected');
			$(this).addClass('selected');
			//waggle.waggleui.model.setPageNumber($('.selected').html());
			//change or build html of assignemntlist here
			positionArrowPagination();
			easingcompletedAssignment();
			window.waggleui.animation.completedAssignmentEasingIn("rightToLeft");
	
			//Easing animation for Assignment list			
		});
	    
	    // Completed Assignment Skills page - onclick of reviewAllSkills button
	    $('#completedAssignmentButton a.review-all-skills').off('click.reviewAllSkills').on('click.reviewAllSkills',function(){
	    	
	    	  var skillObject = window.waggleui.model.getCompletedAssignmentSkills(),
	    	     preferenceObj = {
	        		'studentId': skillObject.studentId,    
	        		'classId': skillObject.classId,
	        		'classViewId': skillObject.classViewId,
	        		'classViewRegId': skillObject.classViewRegId,
	        		'assignmentId': skillObject.assignmentId,
	        		'studentAssignmentId': skillObject.studentAssignmentId,
	        		'knewtonGoalId': skillObject.knewtonGoalId,
	        		'knewtonLearningInstanceId': skillObject.knewtonLearningInstanceId,
	        		'knewtonRegistrationId': skillObject.knewtonRegistrationId,
	        		'isReview': true,
	        		'isNextQuestion': false
	        	};	//'source': 'completedAssignment',
	    	  
	    	/* Session Storage - to check isReview */	    	
	    	var amsProperties = {
	        			'cameFrom': 'completedAssignmentPage'
	        		};      		
      		sessionStorage.setItem( "goToAmsSessionInfo", JSON.stringify(amsProperties) );
      		/* Session Storage - Ends */
      		
      		/* Session Storage - Start */
      			sessionStorage.setItem( "feetsAndCloudyMessageUpdates", true);
      		/* Session Storage - End*/
	    	  
	    	  window.waggleui.model.setFlagGetItem(true);
	    	  var gradedAmProperties = {
	        			'referedFrom': 'asignmentTitle'
	        		};
				//if ( !sessionStorage.getItem("checkGradeOrAssignment") ){
	    		sessionStorage.setItem( "checkGradeOrAssignment", JSON.stringify(gradedAmProperties) );
				//} 
				
				window.waggleui.services.getAssignmentItem(preferenceObj, function(){
					window.waggleui.animation.completedAssignmentEasingOut ("toLeft");
				});
  	        
  	        window.waggleui.model.setCompletedAssignmentSourceFlag('completedAssignment');

  	        var assignmentName = window.waggleui.model.getAssignmentName();
  	        $('.small-header-content').html(assignmentName);
  	         
  	         var avatar =  window.waggleui.model.getUserProfile().avatar;
  	         
  	         $('.small-header-wrapper .small-menu-avatars').removeClass('hen-avatar bear-avatar cat-avatar elephant-avatar frog-avatar mantis-avatar');
  	         $('.small-header-wrapper .small-menu-avatars').addClass(avatar+'-avatar');
	    	
  	     //Analytics
  	       /*var analyticsRequestObject = prepareAnalyticsObject ('label.completedAssignments.reviewSkills');
  	       window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
	    });
	    
	    // Completed Assignment Skills page - onclick of completeFeedback button
	    $('#completedAssignmentButton a.complete-feedback').off('click.completeFeedback').on('click.completeFeedback',function(){
	    	  var skillObject = window.waggleui.model.getCompletedAssignmentSkills(),
	    	     preferenceObj = {
	        		'studentId': skillObject.studentId,    
	        		'classId': skillObject.classId,
	        		'classViewId': skillObject.classViewId,
	        		'classViewRegId': skillObject.classViewRegId,
	        		'assignmentId': skillObject.assignmentId,
	        		'studentAssignmentId': skillObject.studentAssignmentId,
	        		'knewtonGoalId': skillObject.knewtonGoalId,
	        		'knewtonLearningInstanceId': skillObject.knewtonLearningInstanceId,
	        		'knewtonRegistrationId': skillObject.knewtonRegistrationId,
	        		'source': 'completedAssignment',	        		
	        		'isNextQuestion': false
	        	};
	    	  	    	  
	    	  window.waggleui.animation.completedAssignmentEasingOut ("toLeft");
	    	  window.waggleui.model.setFlagGetItem(true);	
	    	  var gradedAmProperties = {
	        			'referedFrom': 'gradedTitle'
	        		};
				//if ( !sessionStorage.getItem("checkGradeOrAssignment") ){
	    		sessionStorage.setItem( "checkGradeOrAssignment", JSON.stringify(gradedAmProperties) );
				//} 
				window.waggleui.services.getGradedAssignmentItem(preferenceObj);
	    	 // window.waggleui.services.getTeachersFeedbackItem(preferenceObj);
	        
	        window.waggleui.model.setCompletedAssignmentSourceFlag('completedAssignment');

	        var assignmentName = window.waggleui.model.getAssignmentName();
	        $('.small-header-content').html(assignmentName);
	         
	         var avatar =  window.waggleui.model.getUserProfile().avatar;
	         
	         $('.small-header-wrapper .small-menu-avatars').removeClass('hen-avatar bear-avatar cat-avatar elephant-avatar frog-avatar mantis-avatar');
	         $('.small-header-wrapper .small-menu-avatars').addClass(avatar+'-avatar');
	    });
        
        
        $drop1.off('click.soundOnOff').on('click.soundOnOff', '.audio-icon', function () {
            var preferenceObj = {
                'studentId': $('.avatar-name').attr('studentId')
            };
            //window.waggleui.services.toggleAudio(preferenceObj);
            
            if ($(this).hasClass('play')) {
                preferenceObj.audio = 'off';
                window.waggleui.services.setAudio(preferenceObj);
            }else {
                preferenceObj.audio = 'on';
                window.waggleui.services.setAudio(preferenceObj);
            }
            
        	var audioResponse = window.waggleui.model.getAudioInfo();
	        if (audioResponse.status == 'WG201'){
	            $(this).toggleClass("play mute");
	            if ($(this).hasClass('play')) {
	                /*preferenceObj.audio = 'on';
	                window.waggleui.services.saveAudio(preferenceObj);*/
	            }else {
	                /*preferenceObj.audio = 'off';
	                window.waggleui.services.saveAudio(preferenceObj);*/
	            }
        	}
            //keep toggle for plugin on off
        });  //
        
        $headerWrapper.find('.small-avatar[data-avatar="' + $headerWrapper.find(".avatar-item-img").data("avatar") + '"]').addClass('active');
        
        $drop1.off('click.changeAvatar').on('click.changeAvatar', '.small-avatar', function () {
        	var $avatarImg = $headerWrapper.find(".avatar-item-img"),
            $this = $(this),
            preferenceObj = {
                'studentId': $('.avatar-name').attr('studentId'),
                'avatar': $this.data('avatar')
            };
        	
        	window.waggleui.services.setAvatar(preferenceObj);
        	var avatarResponse = window.waggleui.model.getAvatarInfo();
        	if (avatarResponse.status == 'WG201'){
	            $drop1.find(".small-avatar").removeClass("active");
	            $this.addClass("active");
	            $avatarImg.removeClass($avatarImg.data('avatar') + '-avatar');
	            $avatarImg.addClass($this.data('avatar') + '-avatar');
	            $avatarImg.data("avatar", $this.data('avatar'));
	          //Analytics
		        /*var analyticsRequestObject = prepareAnalyticsObject ('label.header.avatar');
	        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        	}
            var $scoreMarker = $('.score_marker');
			 
			  $scoreMarker.removeClass('bear-silhouette elephant-silhouette frog-silhouette chicken-silhouette mantis-silhouette cat-silhouette');
			  if($('.avatar-item-img').hasClass('bear-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('bear-silhouette')};
			  if($('.avatar-item-img').hasClass('elephant-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('elephant-silhouette')};
			  if($('.avatar-item-img').hasClass('frog-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('frog-silhouette')};
			  if($('.avatar-item-img').hasClass('chicken-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('chicken-silhouette')};
			  if($('.avatar-item-img').hasClass('mantis-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('mantis-silhouette')};
			  if($('.avatar-item-img').hasClass('cat-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('cat-silhouette')};
			  if($('.avatar-item-img').hasClass('default-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('bear-silhouette')};
		
        });
        
        $headerWrapper.off('click.changeState').on('click.changeState', '.app-links', function () {
        	noteAndLockPopUpClose();	
        	var $completedAssignmentContainer = $('#completedAssignmentContainer'),
        	    $assignmentWrapper = $('#assignmentWrapper'),
        	    analyticsRequestObject = null,
        	    analyticsRequestObjectPageView = null;
        	
        	if ( !($(this).hasClass("active")) && $completedAssignmentContainer.css('display') == 'none' ){        		
        		var tabType =  $(this).find('.menu-item-title').text().toLowerCase();
        		$headerWrapper.find('.app-links').removeClass("active");
        		$(this).addClass("active");
        		
        		if (tabType == 'games'){        			
        			window.waggleui.animation.assignmentEasingOut('gameEasingIn');
        			
                	var preferenceObj = {
                            'studentId': $('.avatar-name').attr('studentId'),
                            'classId': $("#users-list-nav .viewport .active").attr('classId'),
                            'classViewId': $("#users-list-nav .viewport .active").attr('classviewid'),
                            'games': 'on'
                    }
                	window.waggleui.services.loadGames(preferenceObj);
                	//Analytics
                	/*analyticsRequestObject = prepareAnalyticsObject ('label.header.games');
                	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
                	
                	//Analytics - pageview
                	/*analyticsRequestObjectPageView = prepareAnalyticsObjectForPageView ('SDB Games');
                	window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
                	
        		}else if (tabType == 'practice'){ //assignments        			
        			
        			var checkClassSuggestion = window.waggleui.model.getCurrentClassObject();
        			
        			if (checkClassSuggestion.hasTeachers == 'off'){
        				window.waggleui.animation.gameEasingOut();
        				$("#classHasNoTeacher, #errorMessageModalOverlay").removeClass("hide");
        			}else{
		            	if ( (checkClassSuggestion.classSuggestions) && (checkClassSuggestion.classSuggestions.length > 0) ){	            		
		            		window.waggleui.animation.gameEasingOut("assignmentEasingIn-zerostate");
		            	}else{
		            		window.waggleui.animation.gameEasingOut("assignmentEasingIn");
		            	}        			
        			}
        			//Analytics
        			/*analyticsRequestObject = prepareAnalyticsObject ('label.header.assignments');
                	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
                	
                	//Analytics - pageview
                	/*analyticsRequestObjectPageView = prepareAnalyticsObjectForPageView ('SDB Assignments');
                	window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
        		}
        		populateGames();
        	}else{
        		if( $completedAssignmentContainer.css('display') == 'block'){
	        		var tabType =  $(this).find('.menu-item-title').text().toLowerCase();
	        		$headerWrapper.find('.app-links').removeClass("active");
	        		$(this).addClass("active");
	        		if (tabType == 'games'){	        				        			
	        			var preferenceObj = {
	                            'studentId': $('.avatar-name').attr('studentId'),
	                            'classId': $("#users-list-nav .viewport .active").attr('classId'),
	                            'classViewId': $("#users-list-nav .viewport .active").attr('classviewid'),
	                            'games': 'on'
	                    }
	                	window.waggleui.services.loadGames(preferenceObj);	        			
	        			//alertsHandling("gamesList");
	        			window.waggleui.animation.completedAssignmentEasingOut ("toRight","gamesList");
	        	    	if(window.location.hash.search('itemId') === -1){
	        	    		setTimeout(function(){		        	    			
		        	    			window.waggleui.animation.gameEasingIn();
		        	    			window.waggleui.animation.cloudEasingIn();
		        	    			window.waggleui.controller.cloudyMessageBuilder('initial');
	        	    			},1500);
	        	    	}
	        	    	//Analytics
	        	    	/*analyticsRequestObject = prepareAnalyticsObject ('label.header.games');
	        	    	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
	        	    	
	        	    	//Analytics - pageview
	                	/*analyticsRequestObjectPageView = prepareAnalyticsObjectForPageView ('SDB Games');
	                	window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
	                	
	        		}else if (tabType == 'practice'){ //assignments	        				        			
	        			//Analytics
	        			/*analyticsRequestObject = prepareAnalyticsObject ('label.header.assignments');
	                	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
	                	
	                	//Analytics - pageview
	                	/*analyticsRequestObjectPageView = prepareAnalyticsObjectForPageView ('SDB Assignments');
	                	window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
	        		}	        		
	        		populateGames();
        	  }
        	}
        });      
               
        
       $('.sign-out').off('click.signout').on('click.signout', function () {
            var preferenceObj = {
                'studentId': $('.avatar-name').attr('studentId')
            };
            window.waggleui.services.signOut(preferenceObj);
            //window.waggleui.services.userSignOut(preferenceObj);
        	var signOutResponse = window.waggleui.model.getSignOutStatus();
        	if (signOutResponse.status == 'WG201'){
        		console.log('SignOut succesfull');
        		//Analytics
		        /*var analyticsRequestObject = prepareAnalyticsObject ('label.header.signOut');
	        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        	}
        });
                
        $("#footerAssignmentSkills").off('click.popupReview').on('click.popupReview', ".button", function() {
        	var currentAssignment = window.waggleui.model.getThisAssignmentList()[0],
        	preferenceObj = {
        		'studentId': $('.avatar-name').attr('studentId'),
        		'classId': $usersList.find('a.active').attr('classId'),
        		'classViewId': $usersList.find('a.active').attr('classviewid'),
        		'skillId': $(this).parent().parent().attr('skillid') || 'skillId',
        		'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
        		'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId']
        	};
			window.waggleui.services.loadAssignmentSkillReview(preferenceObj);
        });
               
        
        /* Cloud - Starts */
        var pos = 0;
        $(".cloud").off('click.cloud').on('click.cloud', function (e,close) {        	
        	noteAndLockPopUpClose ();
			//checking if there are left messages		
			if (!$("#cloudyMessageWrapper li").length) {
                return false;
            }
            var $this = $(this),
                left = $this.offset().left - ($this.outerWidth() - 10),
                top = $this.offset().top,
                height = $this.outerHeight() + 5,
                h,
                carousel,
                messageCloudResponse = null,
                preferenceObj = {
                    'studentId': $('.avatar-name').attr('studentId'),
                    'classId': $usersList.find('a.active').attr('classId'), 
                    'classViewId': $usersList.find('a.active').attr('classviewid'),
                    'messageId': ''
                };
            if ($("#cloudyMessageWrapper").css("visibility") == 'hidden') {	//!$("#cloudyMessageWrapper").is(":visible")
            	
            	//Analytics
		        /*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.cloudy');
	        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
            	
				if ($("#systemmessagecontainer").find('li').length) {
					 $('#slider-code1').removeClass("hide");
					 $('#slider-code').addClass("hide");
					preferenceObj['messageId'] =  $("#systemmessagecontainer li:first").data('message-id');
					
					//console.log ("cloud -> "+ close);
					
					//$(".viewport1").height(0);
					$("#cloudyMessageWrapper").css({"visibility": "visible"});
					$(".viewport1, #slider-code1").height($("#systemmessagecontainer li:first").height());
					
					
					/*if(close == 'initial'){
						setTimeout(function(){
							$("#cloudyMessageWrapper").css({"visibility": "visible"});
							$(".viewport1").height($("#systemmessagecontainer li:first").height());
						},1500);
					}else{
						$("#cloudyMessageWrapper").css({"visibility": "visible"});
						$(".viewport1").height($("#systemmessagecontainer li:first").height());
					}*/
					
					$(window).trigger('resize.cloudy');
					
                    $(".cloud").removeClass("cloud-calm-off cloud-urgency-off cloud-excited-off").addClass("cloud-" + $("#systemmessagecontainer li:first").data('cloudy-state') + "-off");
                    
                    window.waggleui.services.updateMessageViewStatus(preferenceObj);
                    messageCloudResponse = window.waggleui.model.getMessageCloudResponse();
                	if ( (messageCloudResponse) && (messageCloudResponse.status == 'WG201') ){
                		$("#systemmessagecontainer li:first").addClass("read");
                	}
                } else {
                	 $('#slider-code').removeClass("hide");
                     $('#slider-code1').addClass("hide");
                     $("#cloudyMessageWrapper").css({"visibility": "visible"});
					/*$("#cloudyMessageWrapper").css({
						"display": "block",
						"left": left,
						"top": top + height
					});*/					
                   
					$("#slider-code .viewport").height($("#propmessagecontainer li:first").height());
                    if (carousel == null)
                        $('#slider-code').tinycarousel({
                        	intervaltime:100,
                        	duration:200,
                            callback: function (element, index) {
                                pos = index;
                                $(".cloud").removeClass("cloud-calm-off cloud-urgency-off cloud-excited-off").addClass("cloud-" + $(this).find('li').eq(pos).data('cloudy-state') + "-off");
                                preferenceObj['messageId'] = $(this).find('li').eq(pos).data('message-id');
                                $(this.parentNode).height($(element).height());                                
                                console.log('cloud message changed...');                                
                                window.waggleui.services.updateMessageViewStatus(preferenceObj);
                                messageCloudResponse = window.waggleui.model.getMessageCloudResponse();
                            	if ( (messageCloudResponse) && (messageCloudResponse.status == 'WG201') ){
                            		$(this).find('li').eq(pos).addClass('read');
                            	}
                            }
                        });					
                }
            }
            if(e.originalEvent) {
            	//window.waggleui.services.getMessages(preferenceObj);
            }
            e.stopPropagation();
        });
        
        $("#cloudyMessageWrapper .jcarousel-next").off('click.cloud-next-message').on('click.cloud-next-message', function (e) {
        	//Analytics
	        /*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.cloudyNext');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
        
      //On close of cloud Message
        $(".close-cloudy-wrapper").off('click.closeCloudy').on('click.closeCloudy', function (e) {
        		/*$("#cloudyMessageWrapper").hide("fast",function () {
	        		$("#cloudyMessageWrapper").find('li.read').remove();
	        		$("#propmessagecontainer").css("left",0);
	        		$(".cloud").removeClass("cloud-urgency-off cloud-excited-off").addClass("cloud-calm-off");
	        		showIfSystemMsgAvailable('close');
	        		updatepropMessageCounter();
        		});*/
        	var readMessageIdList = $("#cloudyMessageWrapper").find('li.read').map(function(){return $(this).attr("data-message-id");}).get();
        		$("#cloudyMessageWrapper").animate(
        				{
        					visibility: 'hidden'
        				},
        				{
        					duration: 10,
        					complete: function (){
        						window.waggleui.controller.clearReadMessageFromModel(readMessageIdList);
        						$("#cloudyMessageWrapper").find('li.read').remove();
        		        		$("#propmessagecontainer").css("left",0);
        		        		$(".cloud").removeClass("cloud-urgency-off cloud-excited-off").addClass("cloud-calm-off");
        		        		window.waggleui.controller.showIfSystemMsgAvailable('close');
        		        		window.waggleui.controller.updatepropMessageCounter();
        					}
        				}
        			);
        		//Analytics
		        /*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.cloudyClose');
	        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });

        
        //On close of cloud Message
        /*$(".close-cloudy-wrapper").off('click.closeCloudy').on('click.closeCloudy', function (e) {
        	
        	var messageCloudResponse = null,
        		totalRead = null,
        		preferenceObj = {
                    'studentId': $('.avatar-name').attr('studentId'),
                    'classId': $usersList.find('a.active').attr('classId'),
                    'classViewId': $usersList.find('a.active').attr('classviewid'),
                    'messageId': []
            	};
        	
        	if ($("#systemmessagecontainer").find('li').length) {
        		preferenceObj['messageId'].push($("#systemmessagecontainer li:first").data('message-id'));        		        		
        	}else{
        		totalRead = $("#propmessagecontainer").find('li.read');
        		for (var i=0; i<totalRead.length; i++){
        			preferenceObj['messageId'].push(totalRead.eq(i).attr('data-message-id'));
        		}
        	}
        	window.waggleui.services.updateMessageViewStatus(preferenceObj);
        	messageCloudResponse = window.waggleui.model.getMessageCloudResponse();
        	if ( (messageCloudResponse) && (messageCloudResponse.status == 'WG201') ){
        		$("#cloudyMessageWrapper").hide("fast",function () {
                    $("#cloudyMessageWrapper").find('li.read').remove();
    				$("#propmessagecontainer").css("left",0);
    				$(".cloud").removeClass("cloud-urgency-off cloud-excited-off").addClass("cloud-calm-off");
                    showIfSystemMsgAvailable();
                    updatepropMessageCounter();
                });
        	}            
        });*/
        
        Hammer('.viewport').on("dragleft", function () {
            swiperLeft();
        });
        Hammer('.viewport').on("dragright", function () {
            swiperRight();
        });

        function swiperLeft() {
            flag1 = false;
            Hammer('.viewport').on('dragleft', function () {
                flag1 = true;
            });
            Hammer('.viewport').on('release', function () {
                if (flag1) {
                    flag1 = !flag1;
					if($('.jcarousel-next').is(":visible")){
						$('.jcarousel-next').trigger('click');
					}
                }
            });
        }

        function swiperRight() {
            flag2 = false;
            Hammer('.viewport').on('dragright', function () {
                flag2 = true;
            });
            Hammer('.viewport').on('release', function () {
                if (flag2) {
                    flag2 = !flag2;
					if($('.jcarousel-prev').is(":visible")){
						$('.jcarousel-prev').trigger('click');
					}
                }
            });
        }        
        
       // onResize consider cloudy and cloudy message position
        $(window).off('resize.cloudy').on('resize.cloudy', function (e) {
            var $cloud = $(".cloud")
        	if($cloud.is(":visible")){
				var left = $cloud.offset().left - ($cloud.outerWidth() - 10),
				top = $cloud.offset().top,
				height = $cloud.outerHeight() + 5;
				if($cloud.is(":visible")){
					$("#cloudyMessageWrapper").css({
					/*"left": left -22,
					"top": top + height + 5*/
					});
				}else{
					$("#cloudyMessageWrapper").css({
					/*"left": left,
					"top": top + height*/
					});
				}
        	}
            
        	var $popup = $("#wrapperleft"),
    		left = $popup.offset().left+$popup.width(),
    		top = $popup.offset().top;
        	$(".assignment-status-popup").css({
        		"left":left+2,
        		"top":top
        	});
        	if ($('.footer-dropup').is(':visible')) {
        		$('.footer-dropup').css({display:"none"});
               	//$('.overlay').css({display:"none"});
        		$('.overlay').addClass("hide");
        	}
        	
        	var  mainOffset = $('#mainWrapper').offset().left;
    		
  		 $('#lift_level').css({'right' : mainOffset + 'px'});
        	
        	//$('.main-container').css('')
        	/*lift meter inclusion */
        	/*setBgLines();*/
        });
                
        window.waggleui.controller.cloudyMessageBuilder('initial');
        
        /* Cloud - Ends */
        
        
        
   /*     window.onorientationchange = function() {
        	var orientation = window.orientation;
        	if(orientation > 60){
        		if ($('.footer-dropup').is(':visible')) {
            		$('.footer-dropup').css({display:"none"});
                   	$('.overlay').css({display:"none"});
            	}
        	}
        }*/
     
        
        // Show Cleared and Hide Cleared Button
	    $("#showHideCompleted").off('click.completed').on('click.completed', 'a', function () {
	    	noteAndLockPopUpClose ();
	    	var $this = $(this),
	    		options = window.waggleui.model.getWaggleProperties(),
		    	preferenceObj = null;
	    	
	    	if ($this.text() == options["label.content.showCleared"]){
	    		preferenceObj = {
		                'studentId': $('.avatar-name').attr('studentId'),
		                'classId': $usersList.find('a.active').attr('classId'),
		                'classViewId': $usersList.find('a.active').attr('classviewid'),
		                'cleared': 'on'		//'showCleared': 'on'
		        };	
	    		window.waggleui.services.loadAssignments(preferenceObj, "showCleared");
	    		window.waggleui.model.setOriginOfShowCleared("ASSIGNMENTS_STATE");//TODO:Developer:Needs natts approval
	    		$("#showHideCompleted a").text(options['label.content.hideCleared']);
	    		$("#wrapperleft .assignment-row").addClass("cleared-assignment-row"); //hover is different for cleared assignment
	    		//Analytics
	    		/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.showCleared');
	    		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/	    		
	    	}else if ($this.text() == options["label.content.hideCleared"]){
	    		preferenceObj = {
	                    'studentId': $('.avatar-name').attr('studentId'),
	                    'classId': $usersList.find('a.active').attr('classId'),
	                    'classViewId': $usersList.find('a.active').attr('classviewid'),
	                    'cleared': 'off'	//'showCleared': 'off'
	            };
	    		if(window.waggleui.model.getOriginOfShowCleared() === "ZERO_STATE"){// TODO: Developer: Needs natts approval
	    			window.waggleui.services.loadAssignments(preferenceObj, "class");
	    		}else{
	    			window.waggleui.services.loadAssignments(preferenceObj, "hideCleared");
	    		}
	    		$("#showHideCompleted a").text(options['label.content.showCleared']);
	    		$("#wrapperleft .assignment-row").removeClass("cleared-assignment-row"); //hover is different for cleared assignment
	    		//Analytics
	    		/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.hideCleared');
	    		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
	    	}	    	
		});
	    
	    //Zero State on click individual row.
	    $("#noAssignmentListWrapper").off('click.zeroStateClick').on('click.zeroStateClick', "#zeroStateIndividual", function() {
	    	var assignmentType = $(this).data('cleared'),
		    	thisClassId = $(this).attr("classid"),
	    		thisClassViewId = $(this).attr("classviewid");
	    	
	    	console.log ("Zero State Click -> "+assignmentType);
	    	
	    	if (assignmentType == "on"){
	    		var buildSelector = null,
	        		localVariable = null,
	        		waggleProperties = null;
	    	
	        	localVariable = window.waggleui.model.getLocalProperties();
	        	localVariable.callClearedAssignmentFromZeroState = "true";
	        	window.waggleui.model.setOriginOfShowCleared("ZERO_STATE");//TODO: Developer: Needs Natts Approval
	        	window.waggleui.model.setLocalProperties(localVariable);
	        	$(".assignment-list-wrapper").removeClass("hide");
	        	/*waggleProperties = window.waggleui.model.getWaggleProperties();*/
	        	
		    	buildSelector = "a[classid='"+thisClassId+"'][classviewid='"+thisClassViewId+"']";
		    	$(buildSelector).trigger('click');
	    	}else if (assignmentType == "off"){
	    		//var localClassId = $("#users-list-nav .overview li a[classid="+thisClassId+"]");
	    		var buildSelector = null;
	    		buildSelector = "a[classid='"+thisClassId+"'][classviewid='"+thisClassViewId+"']";
		    	$(buildSelector).trigger('click');
	    	}
	    	//resetClassNavigation ();
        });  //
	    
	    $('#wrapperleft').off('click.assignmentRowClick').on('click.assignmentRowClick', '#packAssignment', function(event) {
	    	var clearedShowHide = $("#showHideCompleted a").text(),
	    		$this = $(this);
	    	//var options = window.waggleui.model.getWaggleProperties();
	    		
	    	
	    	if ($this.closest("div.assignment-row").hasClass("game-type-row")){ //I am Game	  
	    		var gameObj       = window.waggleui.model.getThisAssignmentList()[$(this).closest('li').index()];
	    	        propObj       = window.waggleui.model.getWaggleProperties(),
			        preferenceObj = {
					    "studentId"           : $('.avatar-name').attr('studentId'),
					    "assignmentId"        : gameObj['info']['assignmentId'],
					    "studentAssignmentId" : gameObj['info']['studentAssignmentId'],
					    "gameId"              : gameObj['info']['goalId']
			        };
			document.getElementById('gamesIframe').src = gameObj['info']['gamesURL'];
			$('.games-modal , #gameModalOverlay').removeClass('hide');
			window.waggleui.services.getGame(preferenceObj);
	    		
	    	}else{
	    		/*if (clearedShowHide == options["label.content.showCleared"]){*/
		    	if($('.assignment-status-popup').is(':visible')){
		    		setTimeout(function(){
		    			assignmentRowClick($this, event.target);
		    			},400);
		    	}else{
		    		assignmentRowClick($this, event.target);
		    	}
		    	/*}else if(clearedShowHide == options["label.content.hideCleared"]){}*/
	    	}	    	
	    }); //

	    
	    //click completed icon
	    $('#wrapperleft').off('click.completedAssignmentIcon').on('click.completedAssignmentIcon', '#dueDate', function(event) {
	    	noteAndLockPopUpClose ();
	    	
	    	var clearedShowHide = $("#showHideCompleted a").text(),
    			options = window.waggleui.model.getWaggleProperties(),
	    		$this = $(this),
	    		serverResponse = null,
	    		clickCompletedAssignmentId = $this.closest("#assignmentBlock").attr("assignment_id"),
	    		clickCompletedAssignmentInfo = window.waggleui.services.getCurrentAssignment(clickCompletedAssignmentId),
	    		clickedAssignmentIndex = $this.closest('.assignment-row').index(),	    		
	    		selectedLi = $(".app-modules-pager li a.active").text(),
	    		assignmentLength = $("#wrapperleft .assignment-row").length;	    		
	    		
	    	if (clearedShowHide == options["label.content.showCleared"]){
		    	if ($this.hasClass("due-completed")){
		    		var preferenceObj = {
		                    'studentId': $('.avatar-name').attr('studentId'),
		                    'classId': $usersList.find("a.active").attr("classid"),
		                    'classViewId': $usersList.find("a.active").attr("classviewid"),
		                    'assignmentId': clickCompletedAssignmentId,
		                    'studentAssignmentId': clickCompletedAssignmentInfo['info']['studentAssignmentId']
		            };    		    	
		    		
		    		window.waggleui.services.removeCompletedAssignmentFromList(preferenceObj);	// send request
		    		serverResponse = window.waggleui.model.getClickCompletedAssignmentIconResponse(); // get response from model, as it is stored		    		
		    		if (serverResponse){
		    			if (serverResponse.status == 'WG201'){
			    			$this.closest("li").fadeOut("slow",function (){			    				
				    			var getSameAssignmentList = null;		    			
				    			getSameAssignmentList = window.waggleui.model.getThisAssignmentList ();
				    			for (i=0; i<getSameAssignmentList.length; i++){
				    				if (getSameAssignmentList[i]["info"]["assignmentId"] == preferenceObj.assignmentId){
				    					getSameAssignmentList.splice(i, 1);
				    				}
				    			}			    			
				    			window.waggleui.model.setThisAssignmentList (getSameAssignmentList); //Store sorted assignment array in Model
				    			window.waggleui.controller.clickAndClearCompletedAssignment(getSameAssignmentList, selectedLi, clickedAssignmentIndex);
				    			
				    			if ( (!selectedLi) && (assignmentLength == 1) ){
				    				$('.users-list li a.active ').trigger('click');
				    			}
				    		});
			    		}
			    		else if (serverResponse.classSuggestions && serverResponse.classSuggestions.length > 0){
			    			$("#showHideCompleted").hide();
			    			window.waggleui.controller.zeroState(serverResponse);
			    			$(".no-assignment-list-wrapper").removeClass("hide");
			    			$(".assignment-list-wrapper ul").empty();
			    			$(".app-modules-pager ul").empty();
			    			
			    			window.waggleui.animation.assignmentEasingIn ('assignmentList');
			    		}
			    		else{
			    			console.log ("Check the Server Response");
			    		}
		    		}else{
		    			console.log ("Check the Server Response");
		    		}
		    	}else{	//different due icon except completed
		    		
		    		if ($this.closest("div.assignment-row").hasClass("game-type-row")){	//I am Game		    			
		    			$('.games-modal , #windowOverlay').removeClass('hide');
		    		}else{
		    			var $this = $(this).next().find('#packAssignment');
				    	if($('.assignment-status-popup').is(':visible')){
				    		setTimeout(function(){
				    			assignmentRowClick($this, event.target);
				    			},400);
				    	}else{
				    		assignmentRowClick($this, event.target);
				    	}
		    		}		    		
		    	}
	    	}else if(clearedShowHide == options["label.content.hideCleared"]){
	    		if ($this.closest("div.assignment-row").hasClass("game-type-row")){ //I am Game	    			
	    			$('.games-modal , #windowOverlay').removeClass('hide');
	    		}else{
	    			$(this).parent().find('#packAssignment').trigger('click');
	    		}	    		
	    	}
	    }); //
	    
	    
	    $('.goback-submit').off('click.onsubmit').on('click.onsubmit',function(){
	    	isNext = false; //isNext is global variable and this should be false to do horizontal animation for AMS container	    	
	    	getReportActiveTime('Back');
			updateHash('');
	    	$('#app_exercise_navigator img').css("display","block");
	    	$('#app_exercise_next').css('display', 'none');
	        $('#app_exercise_check').css('display', 'block');
	        sessionStorage.removeItem("goToAmsSessionInfo"); //delete ams info, once go back to SDB
	    	//locationHashChanged ();
	        
	      //Analytics - pageview
	        /*var analyticsRequestObjectPageView = prepareAnalyticsObjectForPageView ('SDB Assignments');
	        window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
	    });
	    
	    $('#openResponseLaseItemPopup').off('click.lastitemgoback').on('click.lastitemgoback', function() {
	    	$('#openResponseLaseItemPopup').toggleClass('hide');
	    	getReportActiveTime('Back');
			updateHash('');
	    	$('#app_exercise_navigator img').css("display","block");
	    	$('#app_exercise_next').css('display', 'none');
	        $('#app_exercise_check').css('display', 'block');
	    	//locationHashChanged ();
	    });
	    
	    /* URL - Hash Changed - starts */
	    
	    $(window).off('hashchange').on('hashchange', function() {
	    	locationHashChanged();
	    	document.getElementById('streakPopUp').style.display = 'none'; //Chrome issue.
	    });
	    
	    /* URL - Hash Changed - ends  */
	    
	    $('.goback-cancel').off('click.oncancel').on('click.oncancel',function(){
	    	$('#goBackMessagePopUp').css("display",'none');
	    	//$(".overlay").css('display','none');
	    	$(".overlay").addClass("hide");
	    	$('.small-header-wrapper').removeClass('show-global-audio');
	    	//  $('.show-user-list-wrapper').css('z-index','0')
	    });
	    
	    /* Remediation PopUp - When Click OK button */
	    $("#remediationOk").off('click.onremediationok').on('click.onremediationok',function(){
	    	$('#remediationPopUp').css("display",'none');
	    	$("#remediationPopUp .message-contents").html ('');
	    	//$(".overlay").css('display','none');
	    	$(".overlay").addClass("hide");
	    });
	    
	    	    
	   /* $('#headerWrapper2').off('click.backButton').on('click.backButton', '.go-back-arrow', function(){
	    	$('#goBackMessagePopUp').css("display",'block');
	    	//$(".overlay").css("display",'block');
	    	$(".overlay").removeClass("hide");
	    	$('#goBackMessagePopUp').css('z-index','1000');
	    	//$(".overlay").css('z-index','800');
	    	$('.footer-dropup').css('z-index','1000');
	    	
	    	//Analytics
	    	var analyticsRequestObject = prepareAnalyticsObject ('label.am.back');
	    	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);
	    });*/
	    
	            
        /* Notes and Tooltips Starts */
        
        function toolTipsCustomHeight (currentLi){
        	var listHeader = currentLi.children(".listing-header").height(),
				listContent = currentLi.children(".listing-content").height(),
				listNavi = $('#assignmentListingNote .listing-navigater').height(),
				getId = null,
				toolTipHeight = null;        	
        	
			toolTipHeight = listHeader + listContent + listNavi;
			$('#assignmentListingNote .viewport').height(toolTipHeight);
			
			currentLi.children(".listing-content").height(listContent);
			
			getId = currentLi.children(".listing-content").attr("id");
			
			fleXenv.fleXcrollMain(getId);
			if(document.getElementById(getId).fleXcroll) {
				document.getElementById(getId).fleXcroll.setScrollPos(false,0);
			}
			
        }//
        
        $("#wrapperleft").off('click.noteClick').on('click.noteClick', "#notesToolTip", function (e) {
        	e.stopPropagation();
        	noteAndLockPopUpClose ();
        	
        	$(this).addClass('active-note');
        	var $tooltip = $(this),
        		/*left = $tooltip.position().left,
				top = $tooltip.position().top,*/
				left = $tooltip.offset().left,
				top = $tooltip.offset().top,
        	    height = parseInt($('#notesToolTip').css('height')),        	    
        	    winHeight = parseInt($(window).height()),
        	    clickedToolTipAssignmentId = $tooltip.parent().parent().attr("assignment_id"),
        		clickedToolTipAssignmentInfo = window.waggleui.services.getCurrentAssignment(clickedToolTipAssignmentId); 
        		
			preferenceObj = {
                    'studentId': $('.avatar-name').attr('studentId'),
                    'classId': $usersList.find("a.active").attr("classid"),
                    'classViewId': $usersList.find("a.active").attr("classviewid"),
                    'assignmentId': clickedToolTipAssignmentId,                    
                    'studentAssignmentId': clickedToolTipAssignmentInfo['info']['studentAssignmentId']
            },
            preferenceObjNotesView = {
                    'studentId': $('.avatar-name').attr('studentId'),
                    'classId': $usersList.find("a.active").attr("classid"),
                    'classViewId': $usersList.find("a.active").attr("classviewid"),
                    'assignmentId': clickedToolTipAssignmentId,
                    'studentAssignmentId': clickedToolTipAssignmentInfo['info']['studentAssignmentId'],
                    'noteId': [],
                    'studentNoteId': []
            },
            dragLeftFlag = false,
            dragRightFlag = false;
			
        	window.waggleui.services.getAssignmentNotes(preferenceObj);
        	
        	//Analytics
        	/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.notes');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        	
        	/* prev offset correction */
        	/*
        	$(".assignments-listing-note").css({				
				"left":left + 38 + 'px',
				"top":top - 46 + 'px'
			});
			
			//when window resize - take care the notes tooltip position
			$(window).off('resize.assignments-listing-note').on('resize.assignments-listing-note', function (e) {        		
        		var left = $tooltip.offset().left,
        			top = $tooltip.offset().top;
	        		$(".assignments-listing-note").css({
	        			"left": left + 38 + 'px',
	        			"top":top - 46 + 'px'
	        		});
        	});
        	
        	*/
        	
        	/* Notes dynamic alignment - Starts */
        	var showUserListTop = $(".show-user-list").offset().top,
        		showUserListHeight = $(".show-user-list").height(),
        		showUserListAdd =  showUserListTop + showUserListHeight,
        		footerWrapperTop = $("#footerWrapper").offset().top,
        		contentHeight = footerWrapperTop - showUserListAdd,
        		notesHalf = height/2,
        		topForNotes = top + notesHalf,
        		bottomEligible = footerWrapperTop - topForNotes,
        		topEligible = topForNotes - showUserListAdd;
        	
        	//console.log ("bottomEligible, topEligible  -> "+ bottomEligible +', '+ topEligible);
        	
        	if (bottomEligible > 280){
        		//console.log ('Bottom is eligible');
        		$(".assignments-listing-note").css({
    				"left":left + 38 + 'px',
    				"bottom" : 'auto',
    				"top": topForNotes - 53 + 'px'
    			});
        		$("#assignmentListingNote .left-arrow").css({"top":"44px"});
        	}else{
        		var difference = 280 - bottomEligible;
        		//console.log ('difference -> '+ difference);
        		if ( ((topEligible > difference) && (difference >= 53 )) || (topEligible > 53) ){
        			//console.log ('Bottom is NOT eligible: if');
        			$(".assignments-listing-note").css({
        				"left":left + 38 + 'px',
        				"bottom" : 'auto',
        				"top": topForNotes - difference + 'px'
        			});
        			$("#assignmentListingNote .left-arrow").css({"top":difference-5});
        		}else{
        			$(".assignments-listing-note").css({
        				"left":left + 38 + 'px',
        				"bottom" : 'auto',
        				"top": topForNotes - 53 + 'px'
        			});
        			$("#assignmentListingNote .left-arrow").css({"top":"44px"});        			        			
        		}
        	}        	       	
        	/* Notes dynamic alignment - Ends */
        	
        	//note height correction vallabh
        	/*if($('.assignments-listing').length >2){
	        	if($(this).is($('.assignments-listing').last()))
	        	{
	        		$(".assignments-listing-note").css({				
	    				"left":left + 38 + 'px',
	    				"top" : 'auto',
	    				"bottom": winHeight - 36 - height - top + 'px'
	    				
	    			}).addClass('last-note');
	        	}else{
					$(".assignments-listing-note").css({				
						"left":left + 38 + 'px',
						"bottom" : 'auto',
						"top": top - 46 + 13 + 'px'
					}).removeClass('last-note');
	        	}
        	}else{
        		$(".assignments-listing-note").css({
    				"left":left + 38 + 'px',
    				"bottom" : 'auto',
    				"top": top - 46 + 'px'
    			}).removeClass('last-note');
        	}*/
        	
			//when window resize - take care the notes tooltip position
			$(window).off('resize.assignments-listing-note').on('resize.assignments-listing-note', function (e) {
				
				setTimeout(function(){
					noteAndLockPopUpClose ();
				}, 1000);
				
        		/*var left = $tooltip.offset().left,
        			top = $tooltip.offset().top;
        		 height = parseInt($('#notesToolTip').css('height'));
          	   winHeight = parseInt($(window).height());
        	
        	
        		if($('.assignments-listing').length >2){
                	if($('.active-note').is($('.assignments-listing').last()))
                	{
                		$(".assignments-listing-note").css({				
            				"left":left + 38 + 'px',
            				"top" : 'auto',
            				"bottom": winHeight - 36 - height - top + 'px'
            				
            			}).addClass('last-note');
                	}else{
        			$(".assignments-listing-note").css({				
        				"left":left + 38 + 'px',
        				"bottom" : 'auto',
        				"top": top - 46 + 'px'
        			}).removeClass('last-note');
                	}
                	}else{
                		
                		$(".assignments-listing-note").css({				
            				"left":left + 38 + 'px',
            				"bottom" : 'auto',
            				"top": top - 46 + 'px'
            			}).removeClass('last-note');
                	}*/
        		
        	});
			
			$("#assignmentListingNote").toggleClass('hide');			
			
			$('#assignmentListingNote').tinycarousel({ pager: true,	intervaltime:100, duration:150 });
			
			//Set Total Notes count from pager to our custom navigater.
			if ($("#assignmentListingNote .pager li:last-child a").text() == '1'){
				$(".total-notes").html($("#assignmentListingNote .pager li:last-child a").text());
				$("#assignmentListingNote .listing-navigater").addClass("hide");
			}else{
				$("#assignmentListingNote .listing-navigater").removeClass("hide");
				$(".total-notes").html($("#assignmentListingNote .pager li:last-child a").text());
			}
			
					
			//update count of note icon.			
			/*if ($("#notesContainer").attr("newnotes") >= 1){
				if ($(this).children().hasClass('notes-count')){
					$(this).children(".notes-count").text($("#notesContainer").attr("newnotes"));
				}else{
					$(this).html('<div class="notes-count">'+$("#notesContainer").attr("newnotes")+'</div>');
				}
			}else{
				$(this).html('');
			}*/
			
			//show or hide notes icon, based on new response
			/*if ($("#notesContainer").attr("shownotes") == "off"){
				//$("#assignmentListingNote").css("display","none");
				$("#assignmentListingNote").toggleClass('hide');
				$(this).remove();
			}*/
			
			
			toolTipsCustomHeight($("#notesContainer li:eq(0)"));
			/*$("#notesContainer li:eq(0)").addClass("mark-as-read");*/
			
			$(".dynamic-notes").html($("#assignmentListingNote .pager").find ("a.active").text());
			
			if ($("#notesContainer li:eq(0)").attr("class") != 'read-notes'){
				$("#notesContainer li:eq(0)").addClass("read-now");
			}	
			preferenceObjNotesView.noteId.push($("#assignmentListingNote .pager").find ("a.active").attr("noteid"));
			preferenceObjNotesView.studentNoteId.push($("#assignmentListingNote .pager").find ("a.active").attr("studentnoteid"));
			
			
			//window.waggleui.services.updateAssignmentNoteViewStatus(preferenceObjNotesView);
			
			$(".listing-navigater a.prev, .listing-navigater a.next").off('click.leftRight').on('click.leftRight', function (e) {				
				e.stopPropagation();
				var readNotes = null,
				readNotesSelector = null;
				

				readNotes = $("#assignmentListingNote .pager").find ("a.active").attr("rel");
				readNotesSelector = "#notesContainer li:eq("+readNotes+")";
				//add 'mark-as-read' class
				/* $(readNotesSelector).addClass("mark-as-read");*/
				
				$(".dynamic-notes").html($("#assignmentListingNote .pager").find ("a.active").text());
				if ($(e.target).is('.nav-right.buttons.next')){
					var addNoteId = $("#assignmentListingNote .pager").find ("a.active").attr("noteid"),
						addStudentNoteId = $("#assignmentListingNote .pager").find ("a.active").attr("studentnoteid");					
					//if ($(readNotesSelector).attr("class") != 'read-notes'){
						if ($.inArray(addNoteId,preferenceObjNotesView.noteId) == -1){
							preferenceObjNotesView.noteId.push(addNoteId);
							preferenceObjNotesView.studentNoteId.push(addStudentNoteId);
						}						
					//}	
					if ($(readNotesSelector).attr("class") != 'read-notes'){
						$(readNotesSelector).addClass("read-now");
					}
					//window.waggleui.services.updateAssignmentNoteViewStatus(preferenceObjNotesView);
				}
				toolTipsCustomHeight($(readNotesSelector));
				if ($(e.target).hasClass('nav-right')){
					//Analytics
					/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.notes.next');
					window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
				}
				
				var assignmentNotes = window.waggleui.model.getAssignmentNotes(),
					noteIndex = $("#notesPager li a.active").attr('noteid')-1,
					teacherMessage = window.waggleui.model.getWaggleProperties()['label.assignstatus.teacherNotes.message'];
				
				teacherMessage = teacherMessage.replace("@@@@", assignmentNotes['notes']['notesArray'][noteIndex]['noteFrom']);
				$("#assignmentListingNote").attr("title",teacherMessage);
			});
			
			
			/* Swipe Left and right for Pads starts */
				/* Swipe Left */
	            Hammer('#assignmentListingNote .viewport').off('dragleft').on('dragleft', function () {
	            	dragLeftFlag = true;
	            	
	            	Hammer('#assignmentListingNote .viewport').off('release').on('release', function () {		            	
		                if (dragLeftFlag) {
		                	dragLeftFlag = false;	                	
							if(!$('#assignmentListingNote .nav-right').hasClass("disable")){							
								$('#assignmentListingNote .nav-right').trigger('click');
							}
		                }
		            });
	            });	            
		        
	            /* Swipe Right */
	            Hammer('#assignmentListingNote .viewport').off('dragright').on('dragright', function () {
	            	dragRightFlag = true;
	            	
	            	Hammer('#assignmentListingNote .viewport').off('release').on('release', function () {
		                if (dragRightFlag) {
		                	dragRightFlag = false;
							if(!$('#assignmentListingNote .nav-left').hasClass("disable")){								
								$('#assignmentListingNote .nav-left').trigger('click');
							}
		                }
		            });
	            });	            
	        /* Swipe Left and right for Pads ends */
			
            $(".close-listing").off('click').on('click',function() {
            	$('.assignments-listing').removeClass('active-note');
            	
            	window.waggleui.services.updateAssignmentNoteViewStatus(preferenceObjNotesView);
            	var notesResponse = window.waggleui.model.getNotesInfo();
            	
            	if (notesResponse.status == 'WG201'){
            		$("#notesContainer li[class~=read-now]").remove();
                	$("#notesContainer li[class~=read-notes]").remove();
            		var updateCount = $("#notesContainer li").length;
            		if (updateCount > 0){
            			$tooltip.html('<div class="notes-count">'+ updateCount +'</div>');
            		}else{
            			$tooltip.html('');
            		}
            		notesResponse.status = '';
            		window.waggleui.model.setNotesInfo(notesResponse);
            		//Analytics
					/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.notes.close');
					window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
            	}
            	
        		$("#assignmentListingNote").toggleClass('hide');
        		$("#notesContainer").css("left",0);
  
        	});

            /*$('body').off('click.notes').on('click.notes',function(e){            	
            	if(!$(e.target).is('#assignmentListingNote') && !$(e.target).is('#assignmentListingNote .viewport') && !$(e.target).is('#notesContainer li') && !$(e.target).is('#assignmentListingNote .contentwrapper') && !$(e.target).is('#assignmentListingNote .scrollgeneric') && !$(e.target).is('.listing-content') && !$(e.target).is('.listing-header') && !$(e.target).is('.listing-navigater'))
            	{
	             	if($('#assignmentListingNote').is(':visible'))
	        		{
	             		//$(".close-listing").trigger('click');
	        		}
            	}            	
            });*/
            
        }); //note click function ends here
        
        /* Notes and Tooltips Ends */

        /* Messaging System - Starts Here */
        /*$("#messagesContainer").off('click.messageClose').on('click.messageClose', "#alertclose", function (e) {
			$("#assignmentListingNote").addClass("hide");	// hide notes if it is on
        	var messageId = $(this).parent('.message-rows').parent('li').attr("messageid"),        		
	        	preferenceObj = {
	                'studentId': $('.avatar-name').attr('studentId'),
	                'messageId': messageId
	        	};
        	window.waggleui.services.updateAlertStatus(preferenceObj);
        	
        	if ($("#messagesContainer").attr("response") == "false"){
        		console.log ("No Alerts Received From Server Response");
        		$(this).parent('.message-rows').parent('li').remove();
            	$("#messagesContainer li.hide:first").removeClass('hide');
            	fleXenv.updateScrollBars();
        	}
        	
        	
        	if ($("#messagesContainer li").length == 1){
        		var setHeight = $("#messagesContainer li").innerHeight();
        		$("#alertMessagesScrollBar, #messagingWrapper").css("height",setHeight);
        		window.waggleui.messageController.alertAdjustBodyHeight ();
        	}else if ($("#messagesContainer li").length == 0){
        		$("#messagingWrapper").css("display","none");
        		$("#bodyWrapper").addClass("remove-padding");
				$("#bodyWrapper").css("padding-top","98px");
        	}
        	$('#messagesContainer').find('li:visible').css('border-bottom','2px solid #b2b26b');
            $('#messagesContainer').find('li:visible:last').css('border-bottom','none');    
            $(window).trigger('resize.cloudy');
        });*/
        /* Messaging System - Ends Here */
        
        
        /* old style -  Messaging System - Starts Here  (helping for doing testing)*/
        $("#messagingWrapper").off('click.messageClose').on('click.messageClose', "#alertclose", function (e) {
        	noteAndLockPopUpClose ();
        	var messageId = $(this).parent('.message-rows').parent('li').attr("messageid"),
        		messageResponse = null,
	        	preferenceObj = {
	                'studentId': $('.avatar-name').attr('studentId'),
	                'classId': $usersList.find('a.active').attr('classId'),
	        		'classViewId': $usersList.find('a.active').attr('classviewid'),
	                'messageId': messageId
	        	};
        	
        	window.waggleui.services.updateAlertStatus(preferenceObj);
        	messageResponse = window.waggleui.model.getMessageInfo();
        	
        	if (messageResponse.status == 'WG201'){
        		$(this).parent('.message-rows').parent('li').remove();
        		//$("#messagesContainer li.hide:first").removeClass('hide');        		
        		fleXenv.updateScrollBars();
                messageResponse.status = '';
        		window.waggleui.model.setMessageInfo(messageResponse);
        	}else if(messageResponse.alerts){
        		if (messageResponse.alerts.length > 0){
        			window.waggleui.messageController.getMessageObject(messageResponse.alerts);
        		}else{
        			console.log ("Alerts Array is Empty");
        		}
        	}else{
        		console.log ("Data Object does not contain - Alerts");
        	}
        	
        	//common for all
        	if ($("#messagesContainer li").length == 1){
        		/*var setHeight = $("#messagesContainer li").innerHeight();
        		$("#alertMessagesScrollBar, #messagingWrapper").css("height",setHeight);*/
        		window.waggleui.messageController.alertAdjustBodyHeight ();
        	}else if ($("#messagesContainer li").length == 0){
        		$("#alertWrapper").css("display","none");
				//$("#bodyWrapper").addClass("remove-padding");				
				//console.log ($("#headerWrapper").height());
				//$("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() + 5});
				$("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() - 93});
				/*$("#mainWrapper").css("min-height", "768px");*/
				//$("#assignmentWrapper,#gamesWrapper,#cloudContainer").css("margin-top","0px");
				$("#alertsOverlay").toggleClass('hide');
				assignmentListCarousel ();
        	}
        	$('#messagesContainer').find('li:visible').css('border-bottom','2px solid #b2b26b');
            $('#messagesContainer').find('li:visible:last').css('border-bottom','none');
            $(window).trigger('resize.cloudy');
            
        });
        /*old style -  Messaging System - Ends Here */
        
        
    	/* cloudy feet animation*/
    	
  	/*  $('.feet-cloud-off').click(function() {
	    // hardcoded 100 being step from full opacity to no opacity: DO NOT CHANGE
	    cloud_opacity = 100/parseInt($('.feet-cloud-off').html().replace('+',''));
	   //debugger;
	    setFeet();
  	  });
  	  */
  	  
		// Event for window close.
        $(window).off("beforeunload.closesdb").on("beforeunload.closesdb",function(){
        	getReportActiveTime('AMBrowseClose');
        });
        
        $('body').off('click').on('click',function(e){
        	//console.log (e.target);
        	if (!$(e.target).is('#lockToolTip, #lockToolTipContainer')){
        		if($('#lockToolTip').is(':visible')){
          		   $('#lockToolTip').addClass('hide');
          	   	}
        	}     	   
        });
      
        // Games Default Event Initialization
        function populateGames (){
        	//Initialize Variable
			var roundAboutHolder = $('ul#roundAboutHolder'),
				hammerRoundAboutHolder = Hammer('#roundAboutHolder'),				
				isGamesListScrolling = 0;
			
			//Initialize Round About
			roundAboutHolder.roundabout({
				minOpacity: 1.0,
				minScale: 0.4,				
				clickToFocusCallback: function (){
					var activeIndex = $(".roundabout-in-focus").index();		//way one
					//var activeIndex = $(this).roundabout("getChildInFocus"); 	// way two
					$("#gamesPaginationContainer > a").removeClass("active");
					$("#gamesPaginationContainer a:eq("+activeIndex+")").addClass("active");
				}
			});
			
			//Click Paginations
			$("#gamesPaginationContainer").off("click.roundabout-moveable-item").on("click.roundabout-moveable-item",".games-pagination", function(e){
				roundAboutHolder.roundabout("animateToChild", $(this).index());
				$("#gamesPaginationContainer > a").removeClass("active");
				$(this).addClass("active");
				return false;
			});			
				 
			//Mouse Wheel on Games List - do scrolling
			roundAboutHolder.off('mousewheel.onGamescroll').on('mousewheel.onGamescroll', function (event) {
				var currentIndex = $("#gamesPaginationContainer a.active").index();
				if (event.deltaY < 0) {	//scroll Down
					_gamesListScroll('down', currentIndex);
				}else if (event.deltaY > 0) {	//scroll Up
					_gamesListScroll('up', currentIndex);
				}
			});
			
			function _gamesListScroll (direction, currentIndex){				
				if (isGamesListScrolling==0) {
					isGamesListScrolling=1;				
					var lastIndex = $("#gamesPaginationContainer a:last").index();
					if (direction == 'down') {
						currentIndex = currentIndex + 1;
						if (currentIndex > lastIndex){
							currentIndex = 0;
						}
						//console.log ("Down Index -> " + currentIndex);
						$("#gamesPaginationContainer a:eq("+currentIndex+")").trigger("click.roundabout-moveable-item");
					}else if (direction == 'up') {
						currentIndex = currentIndex - 1;
						if (currentIndex < 0){
							currentIndex = lastIndex;
						}
						//console.log ("Up Index -> " + currentIndex);
						$("#gamesPaginationContainer a:eq("+currentIndex+")").trigger("click.roundabout-moveable-item");
					}
					setTimeout(function(){
						isGamesListScrolling=0;
					},600);	//RoundAbout Animation will take 600ms to finish its animation.
				}
			}//
						
			//Games List - Drag left for Pads
			hammerRoundAboutHolder.off('dragleft.drag-left').on('dragleft.drag-left', function () {
				var dragleftFlag = true;
				var currentIndex = $("#gamesPaginationContainer a.active").index();
								
				hammerRoundAboutHolder.off('release.drag-left-release').on('release.drag-left-release', function () {
					if (dragleftFlag) {
						dragleftFlag = false;
						_gamesListScroll ('down', currentIndex);
					}
				});
			});
			
			//Games List - Drag Right for Pads
			hammerRoundAboutHolder.off('dragright.drag-right').on('dragright.drag-right', function () {
				var dragrightFlag = true;
				var	currentIndex = $("#gamesPaginationContainer a.active").index();
				
				hammerRoundAboutHolder.off('release.drag-right-release').on('release.drag-right-release', function () {
					if (dragrightFlag) {
						dragrightFlag = false;						
						_gamesListScroll ('up',currentIndex);
					}
				});
			});
			
			$('.plays-continue').off('click').on('click',function(e){
				var propObj = window.waggleui.model.getWaggleProperties();
				var	currentGameObject = window.waggleui.model.getCurrentGameObject()["games"][$(this).closest('li').index()],
				    preferenceObj ={
					    "studentId":$('.avatar-name').attr('studentId'),
					    "assignmentId":null,
					    "studentAssignmentId":null,
					    "gameId": $(this).closest('li').attr('gameId')
				    };
				document.getElementById('gamesIframe').src = currentGameObject["gamesURL"];
				$('.games-modal , #gameModalOverlay').removeClass('hide');
				window.waggleui.services.getGame(preferenceObj);
				
				var analyticsRequestObject = null;
				//Analytics
				if ($(e.target).text() == propObj['label.game.continueButton']){
					//analyticsRequestObject = prepareAnalyticsObject ('label.games.continue');
				}else if ($(e.target).text() == propObj['label.game.playButton']){
					//analyticsRequestObject = prepareAnalyticsObject ('label.games.play');
				}				
				window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);
			});
        }
        
  	  /* ends here */
    
     /* on Click of Alert Header - Start */
        $('#alertFlipContainer').off('click.click-alert-title').on('click.click-alert-title',function(){
        	var win = window,
        		doc = document,
	        	ele = doc.documentElement,
				ges = doc.getElementsByTagName('body')[0],
	            wHeight = win.innerHeight|| ele.clientHeight|| ges.clientHeight,
	            alertMessagesScrollBar = $("#alertMessagesScrollBar"),
	            analyticsRequestObject = null;
        	
	        //console.log (wHeight);        
	        if (alertMessagesScrollBar.css("display") == "none"){
	        	alertMessagesScrollBar.height(wHeight-32);
	        	alertMessagesScrollBar.slideToggle(750, "swing", function (){	        		
	    			fleXenv.fleXcrollMain("alertMessagesScrollBar");
					if(document.getElementById("alertMessagesScrollBar").fleXcroll) {					
						document.getElementById("alertMessagesScrollBar").fleXcroll.setScrollPos(false,0);	
					}        		        		    			        		
				});
	        }else{
	        	alertMessagesScrollBar.slideToggle();
	        }
        	
        	$('#alertMessageClick span').toggleClass("alert-arrow-right alert-arrow-down");
        	$("#alertsOverlay").toggleClass('hide');
        	/*analyticsRequestObject = prepareAnalyticsObject ('label.header.viewMessages');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
        });
     /* on Click of Alert Header - End */
        
    /* on Click of overlay - close the alerts - starts  */
        $("body").off("mousedown.alert-dropdown-close").on("mousedown.alert-dropdown-close", function (event){
	        //console.log(event.target.className);
	        closeAlertsOnOutsideClick (event);
        });

        function closeAlertsOnOutsideClick (e) {
        	var targetClassName = e.target.className;
        	
        	if (targetClassName == 'alerts-overlay'){
        		$("#alertMessagesScrollBar").slideToggle('slow');
        		$('#alertMessageClick span').toggleClass("alert-arrow-right alert-arrow-down");
        		$("#alertsOverlay").toggleClass('hide');
        	}        	
        }
        
    /* on Click of overlay - close the alerts - ends  */    
    
	    function _alertMessageOnResizeWindow (){
	    	var win = window,
				doc = document,
		    	ele = doc.documentElement,
				ges = doc.getElementsByTagName('body')[0],
		        wHeight = win.innerHeight|| ele.clientHeight|| ges.clientHeight;
		    
	    	$("#alertMessagesScrollBar").height(wHeight-32);
		    	
	    	fleXenv.fleXcrollMain("alertMessagesScrollBar");
			if(document.getElementById("alertMessagesScrollBar").fleXcroll) {					
				document.getElementById("alertMessagesScrollBar").fleXcroll.setScrollPos(false,0);
			}		    
	    }
    
	//on Answer Mechanism when you receive message code ItemIDNotFound = WG430, we show different popup, when we click 'x' or 'ok', we need to redirect to SDB
	    $("#knewtonFailurePopup").off('click.knewton-failure-popup').on('click.knewton-failure-popup', '.button-blue,.close-modal' ,function (e) {
	    	
	    	window.waggleui.util.errorInfo['wg430'] = false;
	    	
	    	// From completed Assignment page, if we click "Review skills" button and if we get wg430, we have to handle the session and model
	    	if ($("#completedAssignmentContainer").css('display') != 'none'){
	    		if (sessionStorage.getItem( "goToAmsSessionInfo") != null){
	    			sessionStorage.removeItem("goToAmsSessionInfo");
	    		}
	    		window.waggleui.model.setCompletedAssignmentSourceFlag('');
	    	}
	    	
	    	
	    	$("#knewtonFailurePopup, #errorMessageModalOverlay").addClass("hide");
	    	if (window.location.hash == "" || window.location.hash == "#"){
	    		//window.location = "http://"+window.location.host + window.location.pathname;
	    	}else{
	    		$('.goback-submit').trigger('click.onsubmit');
	    	}
        });
	    
	    //When Class has no teacher but the student assigned to the class, in this case we need to handle this popup
	    $("#classHasNoTeacher").off('click.class-has-no-teacher').on('click.class-has-no-teacher', '.button-blue,.close-modal' ,function (e) {
	    	$("#classHasNoTeacher, #errorMessageModalOverlay").addClass("hide");
	    });
	    
    }	//Function bindEvent Ends here
    
	// function for activeTime 
    function getReportActiveTime(type){
    	var item_id = getHashParameter('itemId');
    	if(item_id){
	          item_id = item_id.split(/_assignmentId=/);
     var  itemId = item_id[0];
     var assignmentId = item_id[1]; 
     var  answerData = getAnswerData();
	 var currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId),
	     preferenceObj;	//check assignmentId is available in current assignment lists or not
	 var userProfile = window.waggleui.model.getUserProfile(),
		currentClassObject = window.waggleui.model.getCurrentClassObject ();
	 
	 if (currentAssignment == null){
		 preferenceObj = {
				  'studentId': userProfile.studentId,    
				  'knewtonId': userProfile.knewtonId,
				  'year': userProfile.year, 
				  'assignmentId': assignmentId,
				  'studentAssignmentId': null,
				  'goalId': null,
				  'knewtonGoalId': null,
				  'knewtonLearningInstanceId': null,
				  'knewtonRegistrationId': null,
				  'itemId': itemId,
				  'selected_answers': answerData['selected_answers'],
				  'hints_used': answerData['hints_used'],
				  'am_code': answerData['am_code'],
				  'classId': currentClassObject['classId'],
				  'classViewId': currentClassObject['classViewId'],
				  'classViewRegId': currentClassObject['classViewRegId'],
				  'activeTime': convertSecondsToHMS (itemSessionSecondsCount) // i am itemSessionSecondsCount, coming from global.js
				 };
	 }else{
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
				  'itemId': itemId,
				  'selected_answers': answerData['selected_answers'],
				  'hints_used': answerData['hints_used'],
				  'am_code': answerData['am_code'],
				  'classId': currentClassObject['classId'],
				  'classViewId': currentClassObject['classViewId'],
				  'classViewRegId': currentClassObject['classViewRegId'],
				  'activeTime': convertSecondsToHMS (itemSessionSecondsCount) // i am itemSessionSecondsCount, coming from global.js
				 };
	 }   

          var response = window.waggleui.services.ReportActiveTime(preferenceObj,type);  
          window.clearInterval(itemSession);	
  	      console.log(type);
      }
    }
    
    
    function goToCompletedAssignmentPage (preferenceObj, assignmentBlock){    	
    	window.waggleui.services.getCompletedAssignmentItem(preferenceObj, assignmentBlock);
    	
    	//Analytics
    	/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.completedAssignments');
    	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
    }
    
    function onSuccessGoToCompletedAssignmentPage(assignmentBlock){    // go to AM page restrict when error pop up occure.
		var currentClassObject = window.waggleui.model.getCurrentClassObject();
    	$("#viewAllAssignments a").attr('classid',currentClassObject.classId);
    	
    	//SlideUp Alerts
    	$messageWrapper = $('#alertWrapper');
		if(	$messageWrapper.css('display') == 'block'){
			$("#headerWrapper").animate({top:-$messageWrapper.height()},{duration:1000,complete:function(){$messageWrapper.css('display','none');$(this).css('top','0')}});
		}
    	
    	if (assignmentBlock){
    		window.waggleui.animation.individualAssignmentEasingOut (assignmentBlock,"completedAssignmentEasingIn");	// Via Assignment List
    	}else{
    		window.waggleui.animation.assignmentEasingOut ("completedAssignmentEasingIn");	//via Goals Acquired
    	}
    	
    	if ($("#completedAssignmentContainer").css("display") == "none"){
    		var readMessageIdList = $("#cloudyMessageWrapper #propmessagecontainer").find('li.read').map(function(){return $(this).attr("data-message-id");}).get();
    		window.waggleui.controller.clearReadMessageFromModel(readMessageIdList);
    		window.waggleui.animation.cloudEasingOut ();
    	}    	    	  	
    	
    	//goToCompletedAssignment Page from Game Page
    	if ($("#gamesWrapper").css("display") == 'block'){
    		window.waggleui.animation.gameEasingOut();
    	}
		
	//	setTimeout(function(){$('.assignment-wrapper').css('display','none');},2000);
		var totalpages = completedAssignmentTotalPages(),
			$completedAssignmentDown = $('#completedAssignmentDown');
		
    	 if(totalpages === 1){
    		 $completedAssignmentDown.addClass('complete-assignment-disable');
    	 }else{
    		 $completedAssignmentDown.removeClass('complete-assignment-disable');
    	 }
		
		easingcompletedAssignment();
		//window.waggleui.animation.completedAssignmentEasingIn("rightToLeft");
    }
    
	function goToAmsPage (preferenceObj, assignmentBlock, comingFrom){
		
		function _onSuccessCallAnimation (){
			$("#alertWrapper").slideUp(1000);
			if (comingFrom == 'clickedThroughGoalIcon'){
				window.waggleui.animation.completedAssignmentEasingOut ("toLeft");	//goToAMS page via goal Acquired, When we are in Completed Assignment Page.
			}else{
				if (assignmentBlock){
					window.waggleui.animation.individualAssignmentEasingOut (assignmentBlock);	//goToAMS page Via Assignment List
				}else{
					if ($("#gamesWrapper").is(":visible")){
						window.waggleui.animation.gameEasingOut();
					}else if ($("#assignmentWrapper").is(":visible")){
						window.waggleui.animation.assignmentEasingOut ();							//goToAMS page via goal Acquired, when we are in SDB Page.
					}
				}
				var readMessageIdList = $("#cloudyMessageWrapper #propmessagecontainer").find('li.read').map(function(){return $(this).attr("data-message-id");}).get();
				window.waggleui.controller.clearReadMessageFromModel(readMessageIdList);
				window.waggleui.animation.cloudEasingOut ();
			}
		}		
		
		$('#answer_options ul li').hide();
		if (preferenceObj && (comingFrom == "graded")){
			window.waggleui.model.setFlagGetItem(true);
			var gradedAmProperties = {
        			'referedFrom': 'gradedTitle'
        		};
			//if ( !sessionStorage.getItem("checkGradeOrAssignment") ){
    		sessionStorage.setItem( "checkGradeOrAssignment", JSON.stringify(gradedAmProperties) );
			//} 
			
			
			window.waggleui.services.getGradedAssignmentItem(preferenceObj, _onSuccessCallAnimation);
		}else if(preferenceObj && (comingFrom == "tryAgain")){
			
			window.waggleui.model.setFlagGetItem(true);
			var gradedAmProperties = {
        			'referedFrom': 'retryTitle'
        		};
    		sessionStorage.setItem( "checkGradeOrAssignment", JSON.stringify(gradedAmProperties) );
    		window.waggleui.services.getretryAssignmentItem(preferenceObj, _onSuccessCallAnimation);
    		
		}else if(preferenceObj){
			window.waggleui.model.setFlagGetItem(true);
			var gradedAmProperties = {
        			'referedFrom': 'asignmentTitle'
        		};
			//if ( !sessionStorage.getItem("checkGradeOrAssignment") ){
    		sessionStorage.setItem( "checkGradeOrAssignment", JSON.stringify(gradedAmProperties) );
			//} 
			
			window.waggleui.services.getAssignmentItem(preferenceObj, _onSuccessCallAnimation);
		}

		var assignmentName = window.waggleui.model.getAssignmentName();
		$('.small-header-content').html(assignmentName);

		var avatar =  window.waggleui.model.getUserProfile().avatar;

		$('.small-header-wrapper .small-menu-avatars').removeClass('hen-avatar bear-avatar cat-avatar elephant-avatar frog-avatar mantis-avatar');
		$('.small-header-wrapper .small-menu-avatars').addClass(avatar+'-avatar');		
	}
    
    /**
	 *	Easing Assignment List 
	 */
    
    function assignmentRowClick(current, currentTarget) {
    	/*if($('.assignment-status-popup').is(':visible')){
    		$('.assignment-status-popup').attr('assignmentClicked',true);
			return;
		}*/
    	//alert ($(this).parents('.assignment-block').attr('assignment_id'));
    	/*$(".assignment-row .status .status-type-5").parent().parent().each(function(){
    		
		});*/
    	// when messages are not closed and if end-user click an individual assignment to go AMS page, try to hide the messages
    	//$("#messagingWrapper").addClass("hide");
    
    	// Ends
    	
    	//var index = $(this).parents('.assignment-row').index(),
    	var index = $(current).closest('li').index();//current.parents('.assignment-row').index(),//JIRA - 1050
    	    currentAssignment = window.waggleui.model.getThisAssignmentList()[index],
    	    userProfile = window.waggleui.model.getUserProfile(),
    	    currentClassObject = window.waggleui.model.getCurrentClassObject (),
    		preferenceObj = {
        		'studentId': userProfile.studentId,    
        		'knewtonId': userProfile.knewtonId,
        		'year': userProfile.year,
        		'assignmentId': current.parents('.assignment-block').attr('assignment_id'),
        		'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
        		'goalId': currentAssignment['info']['goalId'],
        		'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
        		'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
        		'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId'],
	    		'classId': currentClassObject['classId'],
	    		'classViewId': currentClassObject['classViewId'],
	    		'classViewRegId': currentClassObject['classViewRegId'],	    		
	    		'isNextQuestion': false,
	    		'isReview': false,
	    		'isCompleted': currentAssignment['outcome']['completed']
        	};
    	if((currentAssignment['outcome']['itemStatus']) && (currentTarget.className) && (currentTarget.className == "assignment-grade-to-continue")){
    			$('#openResponsepopup').toggleClass("hide");    			
    			$('.overlay').removeClass("hide");
    		
    		//$('.overlay').css('display','block');
    		$('#openResponsepopup').off('click').on('click', function() {
    			//$('.overlay').css('display','none');
    			$('.overlay').addClass("hide");
    			$('#openResponsepopup').toggleClass("hide");
    		});
    		return;
    	}else if((currentAssignment['outcome']['itemStatus']) && (currentTarget.className) && (currentTarget.className == "assignment-try-again")){
    		
    		//Analytics
    		/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.am11.retry');
    		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
    		
    		$('#openResponseRetrypopup').removeClass("hide");
    		//$('.overlay').css('display','block');
    		$('.overlay').removeClass("hide");
    		$('#openResponseRetrypopup').off('click').on('click', function() {
    			//$('.overlay').css('display','none');
    			$('.overlay').addClass("hide");
    			$('#openResponseRetrypopup').addClass("hide");
    		});
    			var assignmentBlock = current.parents('.assignment-block');
         		goToAmsPage (preferenceObj, assignmentBlock, "tryAgain");
    			return;
    		
    	}else if((currentAssignment['outcome']['itemStatus']) && (currentTarget.className) && (currentTarget.className == "assignment-graded")){
    		
    		//Analytics
    		/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.viewGraded');
    		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
    		
    			var assignmentBlock = current.parents('.assignment-block');
         		goToAmsPage (preferenceObj, assignmentBlock, "graded");
         		return;
    		/*}else if((currentAssignment['outcome']['completed'] == "false")){
    			var assignmentBlock = current.parents('.assignment-block');
         		goToAmsPage (preferenceObj, assignmentBlock);
         		return;
    		}else{
    			var assignmentBlock = current.parents('.assignment-block');
         		goToCompletedAssignmentPage (preferenceObj, assignmentBlock);
         		return;
    		}*/
    	}else if(currentAssignment['outcome']['itemStatus']){

    		var items = currentAssignment["outcome"]["itemStatus"];
				for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
		    		if(items[itemstatus_counter] == "Review"){
						if((currentAssignment['outcome']['completed'] == "true")){
			    			var assignmentBlock = current.parents('.assignment-block');
			         		goToCompletedAssignmentPage (preferenceObj, assignmentBlock);
			         		return;
			    		}
					}
				}
    	}
    	
    	if(currentAssignment['outcome']['itemStatus']){
    		
				var items = currentAssignment["outcome"]["itemStatus"];
				for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
					if(items[itemstatus_counter] == "Paused"){
						return;
					}
				}
    	}
    	
    	
     	if(current.parents('.assignment-row').find('.due-completed').length){
    		//window.waggleui.services.getCompletedAssignmentSkills(preferenceObj);     		
     		var assignmentBlock = current.parents('.assignment-block');
     		goToCompletedAssignmentPage (preferenceObj, assignmentBlock);
    	}
    	
     	else if(!current.parents('.assignment-row').find('.status-type-5').length) {
    		    		
			var assignmentBlock = current.parents('.assignment-block');
     		goToAmsPage (preferenceObj, assignmentBlock);

    	}
    	// $('body').addClass('no-touch');
    }
    	
	function completedAssignmentTotalPages(){
		var responseObj = window.waggleui.model.getCompletedAssignmentSkills(),
/*		skills = responseObj.skills,
		length = skills.length,
		quotient = Math.floor(length/6),
		reminder = length%6;
		return reminder >0 ? (quotient+1) :quotient;*/
		pages =  Math.ceil(responseObj.skills.length/6);
		return pages;
	}
	

	
	function easingcompletedAssignment(){		
		var pager = $(".completed-assignmnet-pagination-wrapper selected").text();
		if(pager===1)
			$('#completedAssignmentUp').addClass('complete-assignment-disable');
	}
	
		
	/*	Handling Alerts, when user clicks "class", "all Assignment link", "gameTab". Inside  the completed assignment page 	 */
	function alertsHandling(list){	//animatebacktoclass		
		if ($("#messagesContainer li").length == 0){
			$("#alertWrapper").css("display","none");
			$("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() - 93});
		}else{
			$("#alertWrapper").slideDown(1000, function (){
				var measurement = $("#headerWrapper").height() - 93;
				
				/*var	existingTop = $("#cloudyMessageWrapper").css("top");		
				existingTop = parseInt(existingTop, 10);
				existingTop = existingTop + measurement;
				$("#cloudyMessageWrapper").css({"top":existingTop});*/
				
				$("#bodyWrapper").css({"padding-top":measurement});
				if (list == "assignmentsList"){
					assignmentListCarousel ();	//re-assign assignment lists
				}else{}
			});			
		}						
	}
	
	
	/**
	 * Ellipsis for Assignment List
	 */
	function ellipsisForMultipleLine(){
		$('.control-text-over-flow').each(function(){
			var orig = $(this),
				text = orig.html(),
				modifiedText = null;
				/*neW = $(this.cloneNode(true)).hide().css('overflow','visible').height('auto');
			
			orig.after(neW);
			while (text.length > 0 && (neW.height() > orig.height())) 
			{
			        text = text.substr(0, text.length - 40);
			        neW.html(text + "...");
			}
			orig.html(neW.html());
			neW.remove();*/
			
			//step 2
			if (text.length > 85)
			{
				modifiedText = text.substr(0,85);
				modifiedText = modifiedText + "...";
			}else{
				modifiedText = text;
			}
			orig.html(modifiedText);
		});
	}

	
	/**
	 * position dot pagination whenever new assignmentlist is rendered 
	 */
	function positionDotPagination (){
		listHeight = $('.assignment-list-wrapper').height();
		bulletsHeight = $('#assignmentListPaginationWrapper').height();
		topMargin = (listHeight - bulletsHeight)/2;
		$('.pagination-wrapper').css('margin-top',topMargin+'px');
	}
	
	function positionArrowPagination(){
		 $completedAssignmentListWrapper = $('#completedAssignmentListWrapper');
		 $completedAssignmentPaginationWrapper  = $('#completedAssignmentPaginationWrapper');
		listHeight =  $completedAssignmentListWrapper.height();
		listWidth =  $completedAssignmentListWrapper.width();
		listleft   =  $completedAssignmentListWrapper.offset().left;
		bulletsHeight = $completedAssignmentPaginationWrapper.height();
		topMargin = (listHeight - bulletsHeight)/2+20;
		left = listWidth+8;
		$completedAssignmentPaginationWrapper.css('margin-top',topMargin+'px');
		$completedAssignmentPaginationWrapper.css('left',left+'px');
	}

	
	function goBackPrevious(){		
	    $('body').addClass('no-touch');
	  	$('.left-small-menu').removeClass('show-global-audio');
	}
	
	function amsRefresh(){		
		$("#alertWrapper").slideUp(1000);
    	//$("#wrapperleft").css('display','none');
		   setTimeout(function(){$("#bodyWrapper").css("padding-top","0px");},1500);
				   
    	//changed by Praveen Chand
        //window.location.hash = 'assignmentId=' + $(this).attr('assignment_id');
		 $('.small-header-wrapper .audio-icon').removeClass('play mute');
	 	var audioStatus = window.waggleui.model.getAmsStandAloneItem()['profile']['globalAudio'];
	         if(audioStatus==='on')
	         $('.small-header-wrapper .audio-icon').addClass('play');
	         else
	             $('.small-header-wrapper .audio-icon').addClass('mute');
	         
	         var avatar =  window.waggleui.model.getAmsStandAloneItem()['profile']['avatar'];
	       
	        
	         var avatarClass = avatar+'-avatar';
	         $('.small-header-wrapper .small-menu-avatars').removeClass('hen-avatar bear-avatar cat-avatar elephant-avatar frog-avatar mantis-avatar');
	         $('.small-header-wrapper .small-menu-avatars').addClass(avatarClass);
	         
	         var assignmentName = window.waggleui.model.getAmsStandAloneItem()['assignment']['info']['assignmentName'];
 	        $('.small-header-content').html(assignmentName);

	}
	
	function locationHashChanged() {
		//console.log ("Location Hash Changed");
    	if( (location.hash == '') || (location.hash == '#') ){
    		//var paramValue = decodeURI((RegExp('source' + '=' + '(.+?)(&|$|_)').exec(location.hash)||[, ''])[1]);
    		var sourceFlag = window.waggleui.model.getCompletedAssignmentSourceFlag();
    		if (sourceFlag == "completedAssignment"){
	    		$messageWrapper = $('#alertWrapper');	    		
	    		$('body').addClass(window.waggleui.model.getCurrentClassObject().theme);
	    		$("#headerWrapper").animate(
	    				{top:-$messageWrapper.height()},
	    				{
	    					duration:1000,
	    					complete:function(){
	    							$('#alertWrapper').css('display','none');
	    							$(this).css('top','0');
	    							window.waggleui.animation.completedAssignmentEasingIn("rightToLeft");
	    						}
	    				});
	    		//$("#bodyWrapper").css("padding-top","0px");
	    		easingcompletedAssignment();
	    		window.waggleui.model.setCompletedAssignmentSourceFlag('');
	    	}else{
	    		setTimeout( function(){$('.users-list li a.active ').trigger('click');},2000);
	    		goBackPrevious();
	    	}
    		
    		sessionStorage.removeItem("goToAmsSessionInfo"); //delete ams info, once go back to SDB
    		
	     	$('#goBackMessagePopUp').css('display','none');
	    	//$(".overlay").css('display','none');
	     	$('.overlay').addClass("hide");
	    	hideHint();
	        $('body').addClass('no-touch'); 	  
	    	$('.small-header-wrapper').removeClass('show-global-audio');
	    	//$('#app_selection_body_overlay').addClass("hide");
	    	$('#app_selection_body_overlay').remove();
			$('#openResponseRetrypopup').addClass("hide");
    	}else{
    		//alert ('go To AMS Page');    		
    		var nextQuestionFlag = window.waggleui.model.getNextQuestionFlag();    		
    		if (nextQuestionFlag == true){
    			window.waggleui.model.setNextQuestionFlag(false);    			
    		}else{
    			//goToAmsPage (false, false, 'clickedThroughGoalIcon');
    		}
    	}
	}
	
    function init() {
    	bindEvents();    
    	if(window.location.hash.search('itemId')>1)
    	{
    		//console.log ("i m passed");	
    		classid = window.location.hash.substring(11,9);
    		$('.users-list li a').each(function(index,value){
    			$this = $(this)
    			if($this.attr('classid')==classid)
    				$this.trigger('click');
    		});
    		return
    	}    	
    }

    /**
     * assignmentList Carousel
     */
    function assignmentListCarousel (){    	
    	var win = window,
			doc = document,
			ele = doc.documentElement,
			ges = doc.getElementsByTagName('body')[0],
			wWidth = win.innerWidth || ele.clientWidth || ges.clientWidth,
			wHeight = win.innerHeight|| ele.clientHeight|| ges.clientHeight,
			headerHeight = $("#headerWrapper").outerHeight(),
			footerHeight = $("#footerWrapper").outerHeight(),
			assignmentWrapperHeight = 435, /* $("#scrollAssignmentList").outerHeight() */
			assignmentDisplaycount = 5,
			lengthOfAssi = $("#wrapperleft ul li").length,
			assignmentViewport = $("#assignmentListCarousel .viewport"),
			individualAssignmentHeight = $("#wrapperleft .overview li").height(),
			showHideClearedButton = $("#showHideCompleted").outerHeight(true),
			centerHeight = wHeight - headerHeight - footerHeight - showHideClearedButton;
    	
    	//console.log ("wWidth, wHeight -> " + wWidth +', '+ wHeight);    	
    	//console.log ("wHeight - headerHeight - footerHeight - 50 = centerHeight  ->  "+ parseInt(wHeight) +'-'+ parseInt(headerHeight) +'-'+ parseInt(footerHeight) +'-'+ parseInt(showHideClearedButton) +' = '+centerHeight);    	
    	//console.log ("centerHeight/individualAssignmentHeight -> "+ centerHeight/individualAssignmentHeight);
    	//console.log (Math.floor(centerHeight/individualAssignmentHeight));
    	    	
    	assignmentDisplaycount = Math.floor(centerHeight/individualAssignmentHeight);
    	assignmentWrapperHeight = assignmentDisplaycount * individualAssignmentHeight;
    	assignmentViewport.css("height",assignmentWrapperHeight);
    	
		//Dynamic Pagination Calculation
		var paginationCount = Math.ceil(lengthOfAssi/assignmentDisplaycount); //assignmentDisplaycount		
		$("#assignmentPager").html('');
		$("#assignmentPager").show();
		if (paginationCount >= 1){
			for (var i=0; i<paginationCount; i++){
				var j = i+1;
				$("#assignmentPager").append('<li><a rel="'+i+'" class="pagenum" href="#">'+j+'</a></li>');
			}
			if (paginationCount == 1){
				$("#assignmentPager").hide();
			}
		}else{
			$("#assignmentPager").html('');
		}
		
		// onclick of pagination - hide note and lock popup if visible.
		$("#assignmentPager a.pagenum").off('click.close-lock-popup').on('click.close-lock-popup',function (e) {	    	       	        	
			//Analytics
			/*var analyticsRequestObject = prepareAnalyticsObject ('label.assignments.pagination');
			window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
			
			noteAndLockPopUpClose ();
		});
				
    	//Tiny Carousel for Assignment list
		$('#assignmentListCarousel').tinycarousel({
			pager: true,
			axis: 'y',
			controls: false,	//show left and right navigation buttons?
			display: assignmentDisplaycount,			//how many blocks do you want to move at a time?	//assignmentDisplaycount
			animation: true,	//false is instant, true is animate.
			paginationCount: paginationCount,
			callback: function(element, index){
				//console.log(element, index);
			}
		});			
		
		setTimeout(function(){positionDotPagination ()},1000);
    }	//assignmentListCarousel function ends here
    
    /**
     * 
     */
    function noteAndLockPopUpClose (){
    	if($('#assignmentListingNote').is(':visible'))
    	{
    		$(".close-listing").trigger('click');
			$("#assignmentListingNote").addClass("hide");	// hide notes if it is on
    	}else if ( $('#lockToolTip').is(':visible') ){
    		$(".close-lock-popup").trigger('click');
    		$("#lockToolTip").addClass("hide");	// hide lock popup if it is on
    	}
    }
    
    /**
     * Positioning the class pointer to exact class inside class carousel.
     */
    function resetClassNavigation (){
    	
    	// reset the active class
		var getClassViewId = window.waggleui.model.getCurrentClassObject().classViewId;
		$('.users-list').find('a').removeClass('active');
		$("#users-list-nav .users-list li a[classviewid="+getClassViewId+"]").addClass('active');
    	
		//About Game - Starts Here
		if ($("#gamesWrapper").css("display")== 'block'){    			
			$("#gamesWrapper").css({"display":"none"});
			$("#appMenu li:first a").addClass("active");
			$("#appMenu li:eq(1) a").removeClass("active");
		}// About Game - Ends Here
		
    	var currentPagination = sessionStorage.getItem("classNavigationFlag"),    		
    		activeClass = $("#users-list-nav ul.users-list a.active").closest('li').index(),
    		arrayLength = classNavigationArray.length,
    		individualArray = [],
    		destination = null,
    		freeze = 0;
    		
		//find which pagination i should click
		for (i=0; i<arrayLength; i++){
			individualArray = classNavigationArray[i];
			if (freeze == 0){
				if ( (activeClass >= individualArray[1]) && (activeClass < individualArray[2]) ){
    				freeze = 1;
    				destination = i;
    			}else if ( (activeClass >= individualArray[1]) && (activeClass == individualArray[2]) && (individualArray[3] == '') ){
    				freeze = 1;
    				destination = i;
    			}
			}
		}
		
		/*console.log ("currentPagination -> "+ currentPagination + " activeClass -> "+ activeClass + " destination -> "+ destination);
		console.log (classNavigationArray);
		console.log ("arrayLength -> "+ arrayLength);*/
		
		if (currentPagination < destination){    			
			var len = destination - currentPagination;
			//console.log ("click Next and len is -> "+ len);
			for (i=0; i<len; i++){
				$("#users-nav-right").trigger("click.next-classes");
			}
		}else if(currentPagination > destination){    			
			var len = currentPagination - destination;
			//console.log ("click Prev and len is -> "+ len);
			for (i=0; i<len; i++){
				$("#users-nav-left").trigger("click.prev-classes");
			}
		}	
		
				
		// Move carrot arrow to active class
		var $classMark = $('.class-mark'),
			activeClass  = $('.users-list').find('a.active');
		$('.class-mark').animate({
            left: ((activeClass.position().left + activeClass.width() / 2) - $classMark.outerWidth()+16 + 'px')
        }, 1000);
		
    }
    
    function sessionGameValidation (){
    	
    }
    
    function initializeClassListCarousel (){
    	
    	var totalListItemWidth = 0,
			totalItem = $("#users-list-nav .overview li:not(.class-mark)").length,			
			viewportWidth = $("#users-list-nav .viewport").outerWidth(true),
			totalClassCharacter = null,
			className = null,
			updateClassName = null,
			updateClassWidth = null,
			listItemIndex = 0;
    	
    	//save a value
    	sessionStorage.setItem("classNavigationFlag", 0);
    	
    	//console.log ("Total Class -> "+totalItem+"   viewportWidth ->" + viewportWidth);
    	
    	//Evaluate All Class Names and try to put ellipsis, if it is more than 45 character.    	
    	for (i=0; i<totalItem; i++){
    		className = $("#users-list-nav .overview li:eq("+i+") a").text();
    		totalClassCharacter = $("#users-list-nav .overview li:eq("+i+") a").text().length;			
			
			if (totalClassCharacter > 45){
				updateClassName = className.substring(0,42)+"...";				
				/*$("#classWordCalculator").html(updateClassName);
				updateClassWidth = $("#classWordCalculator").outerWidth(true);
				$("#users-list-nav .overview li:eq("+i+") a").css({"width":updateClassWidth}).addClass("dont-change-width-js");*/
				$("#users-list-nav .overview li:eq("+i+") a").html(updateClassName);
			}
		}    	
		
		// Set UL Width - Start
		for (i=0; i<totalItem; i++){
			totalListItemWidth += $("#users-list-nav .overview li:eq("+i+")").outerWidth(true);									
		}		
		totalListItemWidth = totalListItemWidth + 23;
		$("#users-list-nav .overview").css({"width":totalListItemWidth});
		//console.log ("UL width -> "+ totalListItemWidth);
		
		/* Very first time, Calculate all move - start  */
		if (totalItem > 0){
			for (listItemIndex=0; listItemIndex<totalItem; listItemIndex++){
				classNavigationCalculateAllMove ();
			}
		}		
		
		function classNavigationCalculateAllMove (){
			var selectItems = 0,
				classWidthDeficiency = null,
				listItemOuterWidth = null,
				eachMoveArray = [],
				batchItemWidth = null;
			
			$("#users-list-nav .overview li a:not(.dont-change-width-js)").css({"width":"auto"});
			$("#users-list-nav .overview li a:not(.dont-change-width-js)").css({"visibility":"visible"});
			
			if (listItemIndex == 0){
				eachMoveArray[0] = "0px";
				eachMoveArray[1] = listItemIndex;
			}else{
				for (var i=0; i<listItemIndex; i++){
					batchItemWidth += $("#users-list-nav .overview li:eq("+i+")").outerWidth(true);
				}
				batchItemWidth= "-"+batchItemWidth+"px";
				eachMoveArray[0] = batchItemWidth;
				eachMoveArray[1] = listItemIndex;
			}		
				
			//Finding how many list item will fit inside view port
			for (var i=0; i<viewportWidth; i++){
				listItemOuterWidth = $("#users-list-nav .overview li:eq("+listItemIndex+"):not(.class-mark)").outerWidth(true);
				if (listItemOuterWidth){
					selectItems += listItemOuterWidth;					
					//console.log (listItemIndex + "--" + listItemOuterWidth + "--" + selectItems);
					listItemIndex += 1;
					i = selectItems;						
				}else{
					i = viewportWidth;
				}				
			}
			//console.log ("Loop listItemIndex -> "+listItemIndex);
			if (selectItems != 0){
				classWidthDeficiency = selectItems - viewportWidth;
			}
			
			if (classWidthDeficiency < 0){
				//console.log ("Class Width Deficiency -> " + classWidthDeficiency + "  Less Than 4");				
				eachMoveArray[2] = listItemIndex-1;
				eachMoveArray[3] = '';
			}else if (classWidthDeficiency == 0){
				if (!$("#users-list-nav .overview li:eq("+listItemIndex+")").outerWidth(true)){
					//console.log ("Class Width Deficiency -> " + classWidthDeficiency + "  4 and find -> No Item available");					
					eachMoveArray[2] = listItemIndex-1;
					eachMoveArray[3] = '';
				}else{
					//console.log ("Class Width Deficiency -> " + classWidthDeficiency + "  4 and find -> Item available");
					eachMoveArray[2] = listItemIndex-1;
					eachMoveArray[3] = '';
				}
			}else if (classWidthDeficiency > 0){
				//console.log ("Class Width Deficiency -> " + classWidthDeficiency + "  Greater Than 4");
				listItemIndex = listItemIndex - 1;
				eachMoveArray[2] = listItemIndex;
				
				
				//Evaluate Ellipsis
				var takeItemName = $("#users-list-nav .overview li:eq("+listItemIndex+") a").text(),
					takeItemWidth = $("#users-list-nav .overview li:eq("+listItemIndex+")").outerWidth(true),
					updatedItemName = takeItemName.substring(0,3)+"...",
					updatedItemWidth = 0,
					evaluateWidth = takeItemWidth - classWidthDeficiency,
					paddingAndBorderRemoval = evaluateWidth - 19; // 1px border-left,9px padding-left and 9px padding-right will not come in width calculation.
									
				$("#classWordCalculator").html(updatedItemName);
				updatedItemWidth = $("#classWordCalculator").outerWidth(true);
				
				if (paddingAndBorderRemoval > updatedItemWidth){
					$("#users-list-nav .overview li:eq("+listItemIndex+") a").css({"width":evaluateWidth});					
					eachMoveArray[3] = evaluateWidth;
				}else{
					$("#users-list-nav .overview li:eq("+listItemIndex+") a").css({"visibility":"hidden"});					
					eachMoveArray[3] = 'hidden';
				}
				$("#classWordCalculator").html('');
				
				//console.log ("takeItemName -> "+takeItemName+", takeItemWidth -> "+takeItemWidth+", updatedItemName -> "+updatedItemName+", updatedItemWidth -> "+updatedItemWidth+", evaluateWidth -> "+evaluateWidth+", paddingAndBorderRemoval -> "+ paddingAndBorderRemoval);
			}
			//console.log (eachMoveArray);
			classNavigationArray.push (eachMoveArray);			
			listItemIndex = listItemIndex - 1;
		}
		//console.log (classNavigationArray);		
		
		/* Very first time, Calculate all move - end  */
		
		// Default
		if (parseInt(sessionStorage.getItem("classNavigationFlag")) == 0){
			var classNavigationArrayLength = classNavigationArray.length,
				classArrayManipulate = classNavigationArray[0];
			if (classNavigationArray.length == 1){
				$("#users-nav-right, #users-nav-left").addClass("disable");				
			}else{
				$("#users-nav-left").addClass("disable");
				$("#users-nav-right").removeClass("disable");
			}
			
			// [" left","firstIndex","lastIndex","lastIndexRefinedWidth/hidden/'' "]
			if (classArrayManipulate[3] == ''){
			}else if (classArrayManipulate[3] == 'hidden'){
				$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"visibility":"hidden"});
			}else if (!isNaN(classArrayManipulate[3])){
				$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"width":classArrayManipulate[3]});
			}	
			
			if ( ($("#users-nav-left").hasClass("disable")) && ($("#users-nav-right").hasClass("disable")) ){
				$("#users-nav-left, #users-nav-right").css({"display":"none"});
			}
		}
			
				
		//Next Button
		$("#users-nav-right").off('click.next-classes').on('click.next-classes', function (e) {			
			if (!$("#users-nav-right").hasClass("disable")){
				var arrayIndexFlag = null;
				arrayIndexFlag = parseInt(sessionStorage.getItem("classNavigationFlag"));	
				arrayIndexFlag += 1;
				
				//console.log ("Next - classNavigationFlag -> "+ arrayIndexFlag);
				
				var classNavigationArrayLength = classNavigationArray.length,
					classArrayManipulate = classNavigationArray[arrayIndexFlag];
				
				$("#users-list-nav .overview li a:not(.dont-change-width-js)").css({"width":"auto"});
				$("#users-list-nav .overview li a:not(.dont-change-width-js)").css({"visibility":"visible"});
				
				if (arrayIndexFlag == classNavigationArrayLength-1){					
					$("#users-nav-right").addClass("disable");
					$("#users-list-nav .overview").animate({"left":classArrayManipulate[0]}, "slow");
					
					// [" left","firstIndex","lastIndex","lastIndexRefinedWidth/hidden/'' "]
					if (classArrayManipulate[3] == ''){
					}else if (classArrayManipulate[3] == 'hidden'){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"visibility":"hidden"});
					}else if (!isNaN(classArrayManipulate[3])){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"width":classArrayManipulate[3]});
					}					
				}else{					
					$("#users-list-nav .overview").animate({"left":classArrayManipulate[0]}, "slow");
					
					// [" left","firstIndex","lastIndex","lastIndexRefinedWidth/hidden/'' "]
					if (classArrayManipulate[3] == ''){
					}else if (classArrayManipulate[3] == 'hidden'){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"visibility":"hidden"});
					}else if (!isNaN(classArrayManipulate[3])){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"width":classArrayManipulate[3]});
					}					
				}			
				
				$("#users-nav-left").removeClass("disable");
				sessionStorage.setItem("classNavigationFlag", arrayIndexFlag);
			}
		});
		
		//Prev Button Click Event
		$("#users-nav-left").off('click.prev-classes').on('click.prev-classes', function (e) {
			
			if (!$("#users-nav-left").hasClass("disable")){
				var arrayIndexFlag = null;
				
				arrayIndexFlag = parseInt(sessionStorage.getItem("classNavigationFlag"));
				arrayIndexFlag -= 1;
				//console.log ("Prev - classNavigationFlag -> "+ arrayIndexFlag);
				
				var classArrayManipulate = classNavigationArray[arrayIndexFlag];
			
				$("#users-list-nav .overview li a:not(.dont-change-width-js)").css({"width":"auto"});
				$("#users-list-nav .overview li a:not(.dont-change-width-js)").css({"visibility":"visible"});
				
				if (arrayIndexFlag == 0){					
					$("#users-nav-left").addClass("disable");
					$("#users-list-nav .overview").animate({"left":classArrayManipulate[0]}, "slow");
					
					// [" left","firstIndex","lastIndex","lastIndexRefinedWidth/hidden/'' "]
					if (classArrayManipulate[3] == ''){
					}else if (classArrayManipulate[3] == 'hidden'){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"visibility":"hidden"});
					}else if (!isNaN(classArrayManipulate[3])){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"width":classArrayManipulate[3]});
					}					
				}else{					
					$("#users-list-nav .overview").animate({"left":classArrayManipulate[0]}, "slow");
					
					// [" left","firstIndex","lastIndex","lastIndexRefinedWidth/hidden/'' "]
					if (classArrayManipulate[3] == ''){
					}else if (classArrayManipulate[3] == 'hidden'){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"visibility":"hidden"});
					}else if (!isNaN(classArrayManipulate[3])){
						$("#users-list-nav .overview li:eq("+classArrayManipulate[2]+") a").css({"width":classArrayManipulate[3]});
					}
				}
				
				$("#users-nav-right").removeClass("disable");
				sessionStorage.setItem("classNavigationFlag", arrayIndexFlag);
			}
		});
		
    }// initializeClassListCarousel
    
    /**
     * Analytics - generate request object for events
     */
    function prepareAnalyticsObject (eventId){
		var analyticsLabels = window.waggleui.model.getLocalAnalytics(),		
    		preferenceObj = {
				'hitType': 'event',
				'eventCategory': analyticsLabels[eventId][0],
				'eventAction': analyticsLabels[eventId][1],
				'eventLabel': analyticsLabels[eventId][2],
				'page': window.location.href
		    };
		return preferenceObj;
	}
    
    /**
     * Analytics - generate request object for Page view
     * pageId = SDB Assignments, SDB Games, SDB AMS
     */
    function prepareAnalyticsObjectForPageView (pageId){
    	var roleInfo = window.waggleui.model.getPrivateUserProfile(),
    		classInfo = window.waggleui.model.getCurrentClassObject(),
    		preferenceObj = {
				'hitType': 'pageview',
				'page': window.location.href,
				'title': pageId,
				'dimension1':  _getUrlVars()['source'] ? _getUrlVars()['source'] : "practice"				
		    };
    	    	
    	roleInfo.role		? preferenceObj.dimension2 = roleInfo.role		: "";
    	roleInfo.userType	? preferenceObj.dimension3 = roleInfo.userType	: "";
    	classInfo.subjects[0]["subjectName"]	? preferenceObj.dimension4 = classInfo.subjects[0]["subjectName"]	: "";
    	classInfo.grade		? preferenceObj.dimension5 = classInfo.grade	: "";
    	roleInfo.school	? preferenceObj.dimension6 = roleInfo.school	: "";
    	
    	if (pageId == 'SDB AMS'){
    		var amsInfo = window.waggleui.model.getAmsItem();
    		amsInfo.code	? preferenceObj.dimension7 = amsInfo.code	: "";
    	}
		
    	function _getUrlVars()
    	{
    	    var vars = [], hash;
    	    var hashes = window.location.search.slice(window.location.search.indexOf('?') + 1).split('&');
    	    for(var i = 0; i < hashes.length; i++)
    	    {
    	        hash = hashes[i].split('=');
    	        vars.push(hash[0]);
    	        vars[hash[0]] = hash[1];
    	    }
    	    return vars;
    	}
    	
		return preferenceObj;
	}
    
    function getBrowserInfo (){
    	var nVer = navigator.appVersion;
		var nAgt = navigator.userAgent;
		var browserName  = navigator.appName;
		var fullVersion  = ''+parseFloat(navigator.appVersion); 
		var majorVersion = parseInt(navigator.appVersion,10);
		var nameOffset,verOffset,ix;
		var flag =0;

		// In Opera, the true version is after "Opera" or after "Version"
		if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		 browserName = "Opera";
		 fullVersion = nAgt.substring(verOffset+6);
		 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		   fullVersion = nAgt.substring(verOffset+8);
		}
		// In MSIE, the true version is after "MSIE" in userAgent
		else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		 browserName = "Microsoft Internet Explorer";
		 fullVersion = nAgt.substring(verOffset+5);
		}
		// In MSIE 11
		else if ((verOffset=nAgt.indexOf("Trident/"))!=-1) {
		 browserName = "Microsoft Internet Explorer";
		 var ua = navigator.userAgent;
		 var re  = new RegExp("Trident/.*rv:([0-9]{1,}[\.0-9]{0,})");
		 if (re.exec(ua) != null)
		  fullVersion = parseFloat( RegExp.$1 );
		  flag = 1;
		}			
		// In Chrome, the true version is after "Chrome" 
		else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		 browserName = "Chrome";
		 fullVersion = nAgt.substring(verOffset+7);
		}
		// In Safari, the true version is after "Safari" or after "Version" 
		else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		 browserName = "Safari";
		 fullVersion = nAgt.substring(verOffset+7);
		 if ((verOffset=nAgt.indexOf("Version"))!=-1) 
		   fullVersion = nAgt.substring(verOffset+8);
		}
		// In Firefox, the true version is after "Firefox" 
		else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		 browserName = "Firefox";
		 fullVersion = nAgt.substring(verOffset+8);
		}
		// In most other browsers, "name/version" is at the end of userAgent 
		else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
				  (verOffset=nAgt.lastIndexOf('/')) ) 
		{
		 browserName = nAgt.substring(nameOffset,verOffset);
		 fullVersion = nAgt.substring(verOffset+1);
		 if (browserName.toLowerCase()==browserName.toUpperCase()) {
		  browserName = navigator.appName;
		 }
		}
		// trim the fullVersion string at semicolon/space if present
		if (flag == 0){
			if ((ix=fullVersion.indexOf(";"))!=-1)
				fullVersion=fullVersion.substring(0,ix);
			if ((ix=fullVersion.indexOf(" "))!=-1)
			   fullVersion=fullVersion.substring(0,ix);
		}
		
		majorVersion = parseInt(''+fullVersion,10);
		if (isNaN(majorVersion)) {
		 fullVersion  = ''+parseFloat(navigator.appVersion); 
		 majorVersion = parseInt(navigator.appVersion,10);
		}
		
		return {
			browserName: browserName,
			fullVersion: fullVersion,
			majorVersion: majorVersion,
			appName: navigator.appName,
			userAgent: navigator.userAgent
		}		
    }
    
    return {
        init: init,
        ellipsisForMultipleLine: ellipsisForMultipleLine,
        positionDotPagination: positionDotPagination,        
        goBackPrevious:goBackPrevious,
        amsRefresh:amsRefresh,
        assignmentRowClick: assignmentRowClick,
        goToCompletedAssignmentPage: goToCompletedAssignmentPage,
		goToAmsPage: goToAmsPage,
		locationHashChanged: locationHashChanged,
		assignmentListCarousel: assignmentListCarousel,
		getReportActiveTime : getReportActiveTime,
		noteAndLockPopUpClose: noteAndLockPopUpClose,
		onSuccessGoToCompletedAssignmentPage: onSuccessGoToCompletedAssignmentPage,
		resetClassNavigation: resetClassNavigation,
		positionArrowPagination: positionArrowPagination,
		alertsHandling: alertsHandling,
		sessionGameValidation: sessionGameValidation,
		initializeClassListCarousel: initializeClassListCarousel,
		prepareAnalyticsObject: prepareAnalyticsObject,
		prepareAnalyticsObjectForPageView: prepareAnalyticsObjectForPageView,
		getBrowserInfo: getBrowserInfo 
    };
}());