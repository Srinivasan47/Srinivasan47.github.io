//window.waggleui.skills = (function () {
/*pop up skill meter js starts*/

var $overlay = $('.overlay'),
	skillsDropup = $('.skills-dropup'),
	$assignmentStatusPopup = $('.assignment-status-popup'),
	skillMeterStatus = $('.skillMeterStatus'),
	//$assignmentRow = $('.assignment-row'),
	$flocksWrapper = $(".flocks-wrapper"),
	$skillListItemsWrapper = $('.skill-list-items-wrapper'),
	$currentStudentId = $('.avatar-name').attr('studentId'),		
	userProfile = window.waggleui.model.getUserProfile(),
	flockCloudyAnimation = false;

// skills acquired dropup

$('.skills').off('click.skillsAcquiredPopup').on('click.skillsAcquiredPopup',function(){
	$(document).foundation(); //we are using foundation method to reload the dropdown again.
	
	var assignmentListObject = window.waggleui.model.getCurrentClassObject(); //get class object in model
	
	/*if ( (assignmentListObject.assignments) && (assignmentListObject.assignments.length > 0) ){
		var currentAssignment = window.waggleui.model.getThisAssignmentList()[0],
	    	preferenceObj = {
	    		'studentId': $('.avatar-name').attr('studentId'),
	    		'classId': assignmentListObject.classId,
	    		'classViewId': assignmentListObject.classViewId,
	    		'subjectId': window.waggleui.model.getCurrentClassObject().subjects[0].subjectId,
	    		'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
	    		'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId']
	    	};
		window.waggleui.services.getSkillsAquired(preferenceObj);		
	}*/
	

	//var currentAssignment = window.waggleui.model.getThisAssignmentList()[0],
    	preferenceObj = {
    		'studentId': $('.avatar-name').attr('studentId'),
    		'classId': assignmentListObject.classId,
    		'classViewId': assignmentListObject.classViewId,
    		'subjectId': assignmentListObject.subjects[0].subjectId,
    		'knewtonLearningInstanceId': assignmentListObject.knewtonLearningInstanceId,
    		'knewtonRegistrationId': assignmentListObject.knewtonRegistrationId
    	};
	window.waggleui.services.getSkillsAquired(preferenceObj);		

	
	var $dropUp = $(this),
	left = $dropUp.offset().left;
	$(".skills-dropup").css({
		//"left":left + 6 + 'px',
		"left":left
	}); 
	skillsDropup.slideToggle();/*.slideDown(300);.css({display:"block"});*/
	$('#goalsAcquiredCurrent .current').text($($('#customDropdown1').find('option')[0]).text());
	fleXenv.fleXcrollMain("footerScrollBar");
	if(document.getElementById("footerScrollBar").fleXcroll) {
		document.getElementById("footerScrollBar").fleXcroll.setScrollPos(false,0);
	}
	//$overlay.css({display:"block"});
	$overlay.removeClass("hide");
	
	//Analytics
	/*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.footer.goalsReached');
	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
});



      // skills acquired close
$('.close-wrapper').off('click.closePopup').on('click.closePopup',function(){
	skillsDropup.slideUp(300);/*.css({display:"none"});*/
	$assignmentStatusPopup.slideUp().attr('assignment_id','');
	//$overlay.css({display:"none"});
	$overlay.addClass("hide");
	skillMeterStatus.removeClass('line-strip');
	$('.assignment-row').css({opacity:"1"});
});


/* review button hover - starts */
/*

function reviewbuttonfunction(e) {
	var reviewSkillsPopup = $('#reviewSkillsPopUp');
	if(!$(e.currentTarget).find('.skill-title-inline').hasClass('disable') && !$(e.currentTarget).hasClass('review-button') && !$(e.target).hasClass('button')) {
	var height_1=$(e.currentTarget).height();
	//console.log(height_1);
	var height_3= (height_1 - 37)/2;
		$('.review-button .button.round').css({"margin-top":height_3});
		$(e.currentTarget).find('.review-button').css('display','block');
	}
	
	$(".review-button").find(".button").off('click.review-button').on('click.review-button',function(e) {
		reviewSkillsPopup.css({display:"block"}).css('z-index','899');
		skillsDropup.slideUp(200);.css({display:"none"});
	});
	
	
	$(".review-close").off('click.ReviewPopupclose').on('click.ReviewPopupclose',function(e) {
		reviewSkillsPopup.css({display:"none"});
		$overlay.css({display:"none"});
	});
}//

skillsDropup.off('mouseover.skillTitlemouseOver').on('mouseover.skillTitlemouseOver', '.skill-title', function (e){
	reviewbuttonfunction(e) ;
});

skillsDropup.off('touchend.skillTitleTouch').on('touchend.skillTitleTouch', '.skill-title', function (e){
	reviewbuttonfunction(e) ;
});

*/
/* review button hover - Ends */

skillsDropup.off('click.goalTitleClick').on('click.goalTitleClick', '#goalTitle', function (e){
	var $this = $(this),
		index = $this.parent('#goalContainer').index(),
		$currentClassId = $('.users-list a.active').attr('classid'),
		$currentClassViewId = $('.users-list a.active').attr('classviewid'),
	    currentGoal = window.waggleui.model.getGoalsAcquiredInfo().goals[index],
	    preferenceObj = {
			'studentId': $currentStudentId,
			'knewtonId': userProfile.knewtonId,
    		'year': userProfile.year,
    		'assignmentId': currentGoal.assignmentId,
    		'studentAssignmentId': currentGoal.studentAssignmentId,
			'goalId': currentGoal.goalId,  //$(this).parent('#goalContainer').attr('goalId'),
			'knewtonGoalId': currentGoal.knewtonGoalId,
    		'knewtonLearningInstanceId': currentGoal.knewtonLearningInstanceId,
    		'knewtonRegistrationId': currentGoal.knewtonRegistrationId,
			'classId': $currentClassId,
			'classViewId': $currentClassViewId
		};
	$(".close-wrapper").trigger('click');	
	window.waggleui.view.goToCompletedAssignmentPage (preferenceObj, false);
	
	//Analytics
	/*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.footer.goalsReached.goal');
	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
});


skillsDropup.off('click.batteryStatusClick').on('click.batteryStatusClick', '#batteryStatus', function (e){
	var $this = $(this), 
		index = $this.parent('#goalContainer').index(),
		$currentClassId = $('.users-list a.active').attr('classid'),
		$currentClassViewId = $('.users-list a.active').attr('classviewid'),
	    currentGoal = window.waggleui.model.getGoalsAcquiredInfo().goals[index],	
		preferenceObj = {
			'studentId': $currentStudentId,
			'knewtonId': userProfile.knewtonId,
			'year': userProfile.year,
			'assignmentId': currentGoal.assignmentId, //$(this).attr('assignmentid'),
			'studentAssignmentId': currentGoal.studentAssignmentId, 
			'goalId': currentGoal.goalId,  //$(this).parent('#goalContainer').attr('goalId'),
			'knewtonGoalId': currentGoal.knewtonGoalId,
			'knewtonLearningInstanceId': currentGoal.knewtonLearningInstanceId,
			'knewtonRegistrationId': currentGoal.knewtonRegistrationId,
			'classId': $currentClassId,
			'classViewId': $currentClassViewId,
			'isNextQuestion': false,
			'isReview': true
		};
	
	if ($(this).is(".battery-single-plug, .battery-double-plug")){
		$(".close-wrapper").trigger('click');
		
		/* Session Storage - to check isReview */	    	
    	var amsProperties = {
        			'cameFrom': 'completedAssignmentPage'
        		};
    	if ( !sessionStorage.getItem("goToAmsSessionInfo") ){
    		sessionStorage.setItem( "goToAmsSessionInfo", JSON.stringify(amsProperties) );
    	}  		
  		/* Session Storage - Ends */
		
		if ($("#completedAssignmentListWrapper:visible").length == 0){			
			window.waggleui.view.goToAmsPage (preferenceObj, false);
		}else{
			window.waggleui.view.goToAmsPage (preferenceObj, false, 'clickedThroughGoalIcon');			
		}
	}
});

$overlay.off('click.reviewSkills').on('click.reviewSkills',function(){
	if($flocksWrapper.is(':visible')){
		$flocksWrapper.slideToggle();/*.css({display:"none"});*/
		//$('#reviewSkillsPopUp').css({display:"none"});
		//$overlay.css({display:"none"});
		$overlay.addClass("hide");
	}
});

$skillListItemsWrapper.off('mouseleave.skillTitlemouseLeave').on('mouseleave.skillTitlemouseLeave', '.skill-title', function () {
	$(".skill-title > div").css({display:"none"});
	
 });

//assignmentskill popup
//assignment-status-popUp HTML's code: Starting
$('#bodyWrapper').off("click").on("click", '.skillMeterStatus', function (event){
		
	$("#skillMeterStatusOrig .status-type-5").removeClass("message-active-lock");
	
	window.waggleui.view.noteAndLockPopUpClose ();
	
	var index = $(this).parents('li').index(),
		$this = $(this),
		$assignmentRow = $('.assignment-row'),
		$currentClassId = $('.users-list a.active').attr('classid'),
		$currentClassViewId = $('.users-list a.active').attr('classviewid'),
		currentAssignment = window.waggleui.model.getThisAssignmentList()[index],		
		preferenceObj = {
			'studentId': $currentStudentId,
			'classId': $currentClassId,
			'classViewId': $currentClassViewId,
			'assignmentId': currentAssignment['info']['assignmentId'],
			'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
			'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
			'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
			'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId']
		},
		siblings = null,
		totalHeight = null,
		assignmentHighlighter = $("#assignmentHighlighter");	
			
	//siblings = $(this).parents('li').prevAll().length; //procedure of calculating sibling is changed because scrollable elements.
	var offset = document.getElementById('wrapperleft').getBoundingClientRect();
	var wrappertop = offset.top;
	var currentY = event.pageY;
	var diff = currentY - wrappertop;
	siblings = parseInt(diff/87);
	totalHeight = 0;
	
	for (var i = 0; i < siblings; i += 1) {
        totalHeight += 87;
    }
	
	assignmentHighlighter.css({
        "top": totalHeight,
        "display": "block"
    });
	
	/*if(!$(this).find('.status-type-5').length) {    			
		window.waggleui.services.getAssignmentSkills(preferenceObj);
	}*/
	
	$('#wrapperleft,.assignment-list-wrapper, .no-assignment-list-wrapper').stop(true,true);
	$('#wrapperleft').removeClass('wrapperIn');
	
	if($this.children('div').hasClass('canvas-position')) {
		var $popup = $("#wrapperleft"),
		left = $popup.offset().left+$popup.width(),
		top = $popup.offset().top;
		$(".assignment-status-popup").css({
			"left":left-2,
			"top":top
		});
		//Becasause of scrollable content we are not only depend on wrapperleft height we also require other factors like below changes.
		var height = $('#wrapperleft').height(),
		    assignmentListWrapperOffset = (document.getElementsByClassName('assignment-list-wrapper')[0]).getBoundingClientRect(),
		    overviewULOffset = (document.getElementsByClassName('overview')[1]).getBoundingClientRect(),
		    alwfBottom =  assignmentListWrapperOffset.bottom,
		    ouBottom = overviewULOffset.bottom,
		    bottomdiff = null,
		    height=height - 32;
		if(ouBottom < alwfBottom){
		    bottomdiff = alwfBottom - ouBottom;
			height = height - bottomdiff + 1;
		}
			
		$('#assignmentSkillScrollBar').height(height);	
		$('.skill-description').height(height);
		$("#footerWrapper").css('z-index','3');
		$("#headerWrapper").css('z-index','3');
		
		$(".assignment-row .status").removeClass("box-change");
		$this.addClass('box-change');    //$this
		
		var assnId = $this.parents('.assignment-row').find('.assignment-block').attr('assignment_id');
		//var currentDiv= $this;   //$this
		skillMeterStatus.removeClass('line-strip');
		
		
		if(assnId === $assignmentStatusPopup.attr('assignment_id')) {			
		    $('.assignment-status-popup:visible').slideUp();
		    $assignmentStatusPopup.attr('assignment_id','');
		    $this.addClass('line-strip').removeClass('line-strip');
		    $assignmentRow.css({opacity:"1"});
		} else {			
		    /*$(".assignment-status-popup").slideUp(); */						
		    $('.skillMeterStatus').removeClass('line-strip');
		    
		    if ($this.closest("div.assignment-row").hasClass("game-type-row")){		    	
		    	window.waggleui.services.getAssignmentSkills(preferenceObj, "gamesLevelListing");
		    }else{		    	
		    	window.waggleui.services.getAssignmentSkills(preferenceObj, "assignmentSkills");
		    }
			$('.skill-description').css({display:"none"});			
			$skillListItemsWrapper.css({display:"block"});			
			$("#assignmentSkillScrollBar").css({display:"block"});
			if($('#assignmentStatusPopup').is(':visible'))
			{
				$("#skillListItem").fadeOut('fast');
			}
			$("#skillListItem").fadeIn('slow');
			$(".assignment-status-popup").slideDown();
		    setTimeout(function(){ $this.removeClass('line-strip').addClass('line-strip');}, 500);
		    $assignmentRow.css({opacity:"0.8"});
		    
		    setTimeout(function(){
		    	$this.parent().css({opacity:"1"});
		    },400);
		    		    
		    $assignmentStatusPopup.attr('assignment_id',assnId);
		    fleXenv.fleXcrollMain("assignmentSkillScrollBar");
			if(document.getElementById("assignmentSkillScrollBar").fleXcroll) {
				document.getElementById("assignmentSkillScrollBar").fleXcroll.setScrollPos(false,0);
			}
		}
		//Analytics
		/*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.assignments.skillPie');
		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
		
	}else if ($this.children('span').hasClass('status-type-5')){
		
		$this.children('span.status-type-5').addClass('message-active-lock');
		setLockPopUpPosition ($this);
    	$("#lockToolTip").toggleClass('hide');
    	
    	//when window resize - take care the Lock tooltip position
		/*$(window).off('resize.lockpopup').on('resize.lockpopup', function (e) {
			//setLockPopUpPosition ($('.message-active-lock').parent());
			
			setTimeout(function(){
				window.waggleui.view.noteAndLockPopUpClose ();
			}, 1000);
			
    	});*/	//
		
		//Close Lock Message Tool Tip
		$("#lockToolTip .close-lock-popup").off('click.closelockpopup').on('click.closelockpopup', function (){
			$("#lockToolTip").addClass("hide");
		});
		
		//Close Lock Message Tool Tip
		/*$('body').off('click.closelockpopup').on('click.closelockpopup',function(e){
        	if( !$(e.target).is('#lockToolTip') && !$(e.target).is('#lockToolTipContainer') )
        	{}            	
        });*/
	}
	
	//Position the PopUp
	function setLockPopUpPosition($tooltip){
		
		var left = $tooltip.offset().left,
			top = $tooltip.offset().top,
			height = parseInt($('#skillMeterStatusOrig').css('height')),
			winHeight = parseInt($(window).height());
		
		if($('#skillMeterStatusOrig .status-type-5').length >2){
        	if( $tooltip.is($('.status-type-5').last()) )
        	{
        		$(".lock-tool-tip").css({
    				"left":left + 66 + 9 + 'px',  /* 38 */
    				"top" : 'auto',
    				"bottom": winHeight - 36 - height - top + 'px'
    			}).addClass('last-lock');
        	}else{
				$(".lock-tool-tip").css({
					"left":left + 66 + 9 + 'px', /* 38 */
					"bottom" : 'auto',
					"top": top + 16 + 'px' /* - 46  */
				}).removeClass('last-lock');
        	}
    	}else{
    		$(".lock-tool-tip").css({
				"left":left + 66 + 9 + 'px', /* 38 */
				"bottom" : 'auto',
				"top": top + 16 + 'px' /* - 46  */
			}).removeClass('last-lock');
    	}
	} //
	event.stopPropagation();
}); 


$("#wrapperleft").off("click.blur").on("click.blur", ".dial", function (){
	$(this).blur();
});

/*$("#assignmentStatusPopup").off('click.skillDescriptionToggle').on('click.skillDescriptionToggle', '.help-icon', function () {
	$skillListItemsWrapper.toggle();
    $('.skill-description').toggle();
    $("#assignmentSkillScrollBar").toggle();
});*/


/*pop up skill meter js end*/

$("#customDropdown1").off("change.subjectSkills").on("change.subjectSkills", function (){
	//var subjectname=$("select option:selected").text();
	//window.waggleui.services.getsubjectskills(subjectname);	
	var subjectId, value = this.value;
	$(this).find('option').each(function() {
	    if(this.value === value) {
	    	subjectId = this.getAttribute('subjectId');
	    }
	});
	//var currentAssignment = window.waggleui.model.getThisAssignmentList()[0];
	var classObject = window.waggleui.model.getCurrentClassObject(),
		$currentClassId = $('.users-list a.active').attr('classid'),
		$currentClassViewId = $('.users-list a.active').attr('classviewid'),
		preferenceObj = {
			'studentId': $currentStudentId,			
			'classId': $currentClassId,
			'classViewId': $currentClassViewId,
			'subjectId': subjectId,
			'knewtonLearningInstanceId': classObject.knewtonLearningInstanceId,
			'knewtonRegistrationId': classObject.knewtonRegistrationId
		};
	window.waggleui.services.getSkillsAquired(preferenceObj);
});

$("body").off("mousedown.skillspopupclose").on("mousedown.skillspopupclose", function (event){
	//console.log(event.target.className);
	skillsPopupCloseOnOutsideClick (event);	
	});

function skillsPopupCloseOnOutsideClick (e) {
	if(	!$(e.target).is('#skillMeterStatusOrig, #skillMeterStatusOrig .canvas-position, #skillMeterStatusOrig .dial, #skillMeterStatusOrig canvas, #assignmentStatusPopup, .skills-list-wrapper, .skills-header, .skills-header .left, .help-icon, .skill-description, #assignmentSkillScrollBar, #assignmentSkillScrollBar_mcontentwrapper, #skillListItem, .skill-title, .skill-title-inline, .skill-battery, .line-strip, #assignmentSkillScrollBar_vscrollerbar, #assignmentSkillScrollBar_vscrollerrest, #assignmentSkillScrollBar_vscrollerfill')){
		/*$assignmentStatusPopup.slideUp(function(){
			
		});*/		
		$assignmentStatusPopup.slideUp().attr('assignment_id','');
		//$assignmentStatusPopup.attr('assignment_id','');
		$('.assignment-row').css({opacity:"1"});
		$("#assignmentHighlighter").css({display:"none"});
		$('.skillMeterStatus').addClass('line-strip').removeClass('line-strip');
	}
	if( $(e.target).hasClass('skillMeterStatus') && !$(e.target.innerHTML).hasClass('canvas-position')){ // so many classes are added in above condition so wrote seprately.
		$assignmentStatusPopup.slideUp().attr('assignment_id','');
        $('.assignment-row').css({opacity:"1"});
		$("#assignmentHighlighter").css({display:"none"});
		$('.skillMeterStatus').addClass('line-strip').removeClass('line-strip');
	}
}

/*flocks released dropup*/

$("#footerWrapper").off('click.flocksReleasedDropup').on('click.flocksReleasedDropup','.flocks',function(e) {
	
	var preferenceObj = {
            'studentId': $currentStudentId,
            'classId': $('.users-list a.active').attr('classid'),
            'classViewId': $('.users-list a.active').attr('classviewid')
    }
	window.waggleui.services.getFlocks(preferenceObj);
	//$overlay.toggle();
	$overlay.removeClass("hide");
	var $dropUp = $(this),
		left = $dropUp.position().left;
	
	$flocksWrapper.css({"left":left});
	$flocksWrapper.slideToggle();
	
	//Analytics
	/*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.footer.flocksReleased');
	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
});


$("#flockCloudyOff").off('click.updateflocksReleased').on('click.updateflocksReleased',function(e) {
	 if (flockCloudyAnimation) {
		 return;
	 }
	 //onClick of Flock Cloudy, we need to temporarily disable the click of "flocksReleased" bottom middle tab
	 $("#flocksReleased").removeClass('flocks');
	 
	 flockCloudyAnimation = true;
	var preferenceObj = {
            'studentId': $currentStudentId,
            'classId': $('.users-list a.active').attr('classid'),
            'classViewId': $('.users-list a.active').attr('classviewid'),
            'studentFlockCloudId': $("#flockCloudyOff .display-count").attr("studentflockcloudid")
    }
	$('#flocksReleased').addClass("checked");
	window.waggleui.services.getUpdatedFlocksReleased(preferenceObj);
});
//}());