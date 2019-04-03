window.waggleui.integration = (function() {
	var util = window.waggleui.util;
	
	function getInitData(preferenceObj) {
		util = window.waggleui.util;
		util.logMessage('getInitData', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
				
		var jsonUrl;
		if(preferenceObj.teacherId != undefined){//!= is intentionally used to cover both 'undefined' and 'null'.
			jsonUrl = 'json/teacher.json';
		}else{
			jsonUrl = 'json/student.json';
		}
		//Obtaining dummy json objects for now with a callback function getInitData 
		util.ajax({
			'url' : jsonUrl,
			'async': false,
			'success': window.waggleui.controller.getInitData
		});
	}
	
	function loadAssignments(preferenceObj, via) {
		util.logMessage('loadAssignments', '');
		console.log (via);
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);	
		
		if ( (preferenceObj.cleared == 'off') && (via == 'class') ){
			// send request to get assignment list
			util.ajax({
				'url': 'json/class'+preferenceObj.classViewId+'.json',
				'async': false,
				'success': window.waggleui.controller.getAssignmentLists
			});
		}else if( (preferenceObj.cleared == 'on') && (via == 'showCleared') ){
			// send request to get cleared assignment list
			util.ajax({
				'url': 'json/showCleared'+preferenceObj.classViewId+'.json',
				'async': false,
				'success': window.waggleui.controller.getClearedAssignmentLists
			});
		}else if ( (preferenceObj.cleared == 'off') && (via == 'hideCleared') ){
			// send request to get cleared assignment list
			util.ajax({
				'url': 'json/hideCleared'+preferenceObj.classViewId+'.json',
				'async': false,
				'success': window.waggleui.controller.getUnClearedAssignmentLists
			});
		}else if ( (preferenceObj.cleared == 'on') && (via == 'zeroStateShowCleared') ){
			// send request to get cleared assignment list
			util.ajax({
				'url': 'json/zeroStateShowCleared'+preferenceObj.classViewId+'.json',
				'async': false,
				'success': window.waggleui.controller.getAssignmentLists
			});
		} 
	}
	
	function getFlocks(preferenceObj) {
		util.logMessage('getFlocks', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url': 'json/flocksReleased'+preferenceObj.classViewId+'.json',
			'async': false,
			'success': window.waggleui.skillMeterController.renderFlocksReleased
		});
	}
	
	function getUpdatedFlocksReleased(preferenceObj) {
		util.logMessage('getUpdatedFlocksReleased', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url': 'json/flockcloudy'+preferenceObj.classViewId+'.json',
			'async': false,
			'success': window.waggleui.skillMeterController.renderUpdatedFlocksReleased
		});		
	}
	
	// feet traveled - vallabh	
	function getUpdatedFeetTraveled(preferenceObj) {
		util.logMessage('getUpdatedFeetTraveled', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url': 'json/feetCloudy'+preferenceObj.classViewId+'.json',
			'async': false,
			'success': window.waggleui.liftMeterController.renderUpdatedFeetTraveled
		});
	}
	/* feet ends*/
	
	/*function saveAudio(preferenceObj) {	//saveAudio: saveAudio,
		util.logMessage('saveAudio', '');		
		console.log(preferenceObj);
	}*/
	
	/*function saveAvatar(preferenceObj) {	//saveAvatar: saveAvatar,
		util.logMessage('saveAvatar', '');
		console.log(preferenceObj);
	}*/	
	
	function getAssignmentSkills(preferenceObj, assignmentOrGame) {		
		util.logMessage('getAssignmentSkills', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
		
		if (assignmentOrGame == "gamesLevelListing"){
			//Obtaining dummy json objects for now with a callback function ''
			util.ajax({
				'url': 'json/gamesLevelListing.json',
				'async': false,
				'success': window.waggleui.skillMeterController.renderGamesLevelListing
			});
		}else{
			//Obtaining dummy json objects for now with a callback function ''
			util.ajax({
				'url': 'json/assignmentSkills.json',
				'async': false,
				'success': window.waggleui.skillMeterController.renderAssignmentSkillMeter
			});
		}
	}
	
	function getSkillsAquired(preferenceObj) {		
		util.logMessage('getSkillsAquired', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
		
		//Obtaining dummy json objects for now with a callback function ''
		util.ajax({
			'url': 'json/subject'+ preferenceObj.subjectId +'.json',
			'async': false,
			'success': function(response) {				
				window.waggleui.model.setGoalsAcquiredInfo(response);
				window.waggleui.skillMeterController.renderSubjectSkills(response);
			}
		});	
	}
	
	/*function getsubjectskills(subjectname) {	//getsubjectskills: getsubjectskills,						
		util.ajax({
			'url': 'json/'+ subjectname +'.json',
			'async': false,
			'success': window.waggleui.skillMeterController.renderSubjectSkills
		});
	}*/
	
	function loadAssignmentSkillReview(preferenceObj){
		util.logMessage('loadAssignmentSkillReview', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		//preferenceObj consists of properties studentId, classId, showCleared
		
		util.ajax({
			'url': 'json/morepractice.json',
			/*'async': false,*/
			'success': window.waggleui.skillMeterController.skillReview
		});
	}	
	
	function getMessages(preferenceObj) {
		util.logMessage('getMessages', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
	}
	
	function updateMessageViewStatus(preferenceObj) {
		util.logMessage('updateMessageViewStatus', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url': 'json/bool201.json',	
			'async': false,
			'success': function(response) {
				window.waggleui.model.setMessageCloudResponse(response);
			}
		});
	}
	
	function getAssignmentItem(preferenceObj, _onSuccessCallAnimation) {
		util.logMessage('getAssignmentItem', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		//Obtaining dummy json objects for now with a callback function getAssignmentItem
		util.ajax({
			'url': 'json/item'+preferenceObj.assignmentId+'.json',
			'async': false,
			'success': function(response) {
				if (response.item) {
					if (response.item.itemId){
						$('#preload').html(''); 
						$('body').removeClass('canvas_ch canvas_hs canvas_sl canvas_dd canvas_srt canvas_mg canvas_ei canvas_et emerald canvas_hl canvas_or');
						
						if ( (_onSuccessCallAnimation)&&(typeof _onSuccessCallAnimation === "function") ){
							_onSuccessCallAnimation ();
						}
						window.waggleui.model.setAmsItem(response.item, response.assignment, response);
						window.waggleui.model.setUserProfile(response.profile);
						window.waggleui.controller.getAssignmentItem(response.item.itemId, response.assignment["info"]["assignmentId"]);
					}else if(response.item.interstitialsMessage){
						window.waggleui.controller.getAssignmentItem(false, false, response.item.interstitialsMessage);
					}
				}else{
					window.waggleui.model.setAmsItem(null, response.assignment, response);
					window.waggleui.model.setUserProfile(response.profile);
					window.waggleui.controller.getAssignmentItem(false,  response.assignment["info"]["assignmentId"]);
				}
			}
		});
	}
	
	function getGradedAssignmentItem(preferenceObj, _onSuccessCallAnimation) {
		util.logMessage('getGradedAssignmentItem', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		//Obtaining dummy json objects for now with a callback function getAssignmentItem
		util.ajax({
			'url': 'json/gradedItem.json',
			//'url': 'json/'+ preferenceObj.assignmentId  +'.json',
			'async': false,
			'success': function(response) {
				if (response.item) {
					if (response.item.itemId){
						if ( (_onSuccessCallAnimation)&&(typeof _onSuccessCallAnimation === "function") ){
							_onSuccessCallAnimation ();
						}
						window.waggleui.model.setAmsItem(response.item, response.assignment, response);
						window.waggleui.model.setUserProfile(response.profile);
						window.waggleui.controller.getAssignmentItem(response.item.itemId, response.assignment["info"]["assignmentId"]);
					}else{
						window.waggleui.controller.getAssignmentItem(false, false, response.item.interstitialsMessage);
					}
				}
			}
		});
	}
	
	
	function getretryAssignmentItem(preferenceObj, _onSuccessCallAnimation) {
		util.logMessage('getretryAssignmentItem', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		//Obtaining dummy json objects for now with a callback function getAssignmentItem
		util.ajax({
			'url': 'json/retryItem.json',
			'async': false,
			'success': function(response) {
				if (response.item) {
					if (response.item.itemId){
						if ( (_onSuccessCallAnimation)&&(typeof _onSuccessCallAnimation === "function") ){
							_onSuccessCallAnimation ();
						}
						window.waggleui.model.setAmsItem(response.item, response.assignment, response);
						window.waggleui.model.setUserProfile(response.profile);
						window.waggleui.controller.getAssignmentItem(response.item.itemId, response.assignment["info"]["assignmentId"]);
					}else{
						window.waggleui.controller.getAssignmentItem(false, false, response.item.interstitialsMessage);
					}
				}
			}
		});
	}
	
	
	
	function getTeachersFeedbackItem(preferenceObj) {
		util.logMessage('getTeachersFeedbackItem', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		//Obtaining dummy json objects for now with a callback function getAssignmentItem
		util.ajax({
			'url': 'json/teachersfeedback.json',
			'async': false,
			'success': function(response) {
				if (response.item) {
					if (response.item.itemId){
						window.waggleui.model.setAmsItem(response.item, response.assignment, response);
						window.waggleui.model.setUserProfile(response.profile);
						window.waggleui.controller.getAssignmentItem(response.item.itemId, response.assignment["info"]["assignmentId"]);
					}else{
						window.waggleui.controller.getAssignmentItem(false, false, response.item.interstitialsMessage);
					}
				}
			}
		});
	}
	

	function checkAnswer(preferenceObj) {
		util.logMessage('checkAnswer', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
		
		var data = null;
		//Obtaining dummy json object.
		util.ajax({
			'url': 'json/checkAnswer2.json',
			'async' : false,
			'success': function(response) {
				data = response;
			}
		});		
		return data;
	}
	
	
	function submitAnswer(preferenceObj){
		util.logMessage('submitAnswer', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
		
		
		//Obtaining dummy json object.
		util.ajax({
			'url': 'json/submitAnswer.json',
			'async' : false,
			'success': function(response) {
				
			}
		});	
	}
	
	
	
	function saveAnswer(preferenceObj) {
		util.logMessage('saveAnswer', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
		
		var data = null;
		//Obtaining dummy json object.
		util.ajax({
			'url': 'json/saveAnswer.json',
			'async' : false,
			'success': function(response) {
				data = response;
			}
		});		
		return data;
	}

	function getHint(preferenceObj) {
		util.logMessage('getHint','');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		var data = null;		
		//Obtaining dummy json object.
		util.ajax({
			'url': 'json/hint'+preferenceObj.hintIndex+'.json',		
			'async': false,
			'success': function(response) {
				data = response;
			}
		});
		return data;
	}
	
	function ReportActiveTime(preferenceObj,UserAction) {
		util.logMessage('ReportActiveTime', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);		
		
		var data = null;
		//Obtaining dummy json object.
		/*util.ajax({
			'url': 'json/checkAnswer2.json',
			'async' : false,
			'success': function(response) {
				data = response;
			}
		});		
		return data;*/
		return false;
	}
	
	function getAssignmentNotes (preferenceObj){		
		util.logMessage('getAssignmentNotes', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url': 'json/notes.json',
			'async': false,
			'success': window.waggleui.notesController.getNotes
		});
	}
	
	function updateAssignmentNoteViewStatus (preferenceObj){
		util.logMessage('updateAssignmentNoteViewStatus', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			//'url': 'json/close-notes.json',
			'url': 'json/bool201.json',
			'async': false,
			//'success': window.waggleui.notesController.updateNotesCount
			'success': window.waggleui.model.setNotesInfo			
		});
	}
	
	/*function changeStudentAvatar (preferenceObj){	//changeStudentAvatar : changeStudentAvatar,
		util.logMessage('changeStudentAvatar', '');
		console.log(preferenceObj);
		
		util.ajax({			
			'url': 'json/avatarResponse.json',
			'async': false,			
			'success': window.waggleui.model.setAvatarInfo			
		});
	}*/
	
	function setAvatar (preferenceObj){
		util.logMessage('setStudentAvatar', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({			
			'url': 'json/avatarResponse.json',
			'async': false,			
			'success': window.waggleui.model.setAvatarInfo			
		});
	}
	
	/*function toggleAudio (preferenceObj){	//toggleAudio: toggleAudio,
		util.logMessage('toggleAudio', '');
		console.log(preferenceObj);
		
		util.ajax({			
			'url': 'json/audioResponse.json',
			'async': false,			
			'success': window.waggleui.model.setAudioInfo			
		});
	}*/
	
	function setAudio (preferenceObj){
		util.logMessage('setAudio', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({			
			'url': 'json/audioResponse.json',
			'async': false,			
			'success': window.waggleui.model.setAudioInfo			
		});
	}
	
	/*function userSignOut (preferenceObj){	//userSignOut: userSignOut,
		util.logMessage('userSignOut', '');
		console.log(preferenceObj);
		
		util.ajax({			
			'url': 'json/signOutResponse.json',
			'async': false,			
			'success': window.waggleui.model.setSignOutStatus			
		});
	}*/
	
	function signOut (preferenceObj){
		util.logMessage('userSignOut', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({			
			'url': 'json/signOutResponse.json',
			'async': false,			
			'success': window.waggleui.model.setSignOutStatus			
		});
	}
	
	function updateAlertStatus(preferenceObj){
		util.logMessage('updateAlertStatus', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
				
		util.ajax({
			'url': 'json/messages.json',
			//'url': 'json/bool201.json',
			'async': false,
			//'success': window.waggleui.messageController.getMessageObject
			'success': window.waggleui.model.setMessageInfo
		});
	}
	
	/*function getCompletedAssignmentSkills(preferenceObj){	//getCompletedAssignmentSkills:getCompletedAssignmentSkills,
		util.logMessage('getCompletedAssignmentSkills');
		util.ajax({
			'url':'json/clearedassignments.json',
			'async':false,
			'success': function(response){
				window.waggleui.model.setCompletedAssignmentSkills(response);
				window.waggleui.controller.getCompletedAssignmentSkills(response,1);
				window.waggleui.controller.completedAssignmentPagination(response);
			}
		});
	}*/
	
	function getCompletedAssignmentItem(preferenceObj, assignmentBlock){
		util.logMessage('getCompletedAssignmentSkills',"");
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url':'json/clearedassignments.json',
			'async':false,
			'success': function(response){
				window.waggleui.model.setCompletedAssignmentSkills(response);
				window.waggleui.controller.getCompletedAssignmentSkills(response,1);
				window.waggleui.controller.completedAssignmentPagination(response);				
				window.waggleui.view.onSuccessGoToCompletedAssignmentPage(assignmentBlock); //execute only in success case. 
			}
		});
	}
	
	function removeCompletedAssignmentFromList (preferenceObj){
		util.logMessage('removeCompletedAssignmentFromList', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url':'json/clickCompletedResponse.json',
			'async':false,
			'success': function(response){
				window.waggleui.model.setClickCompletedAssignmentIconResponse(response);
			}
		});
	}
	
	function cancelSessionTimeout(preferenceObj) {
		util.logMessage('cancelSessionTimeout', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		util.ajax({
			'url': 'json/bool201.json',
			'async':false,
			'success': function(response) {
				//dummy success object.
			}
		});
	}
	function loadGames(preferenceObj) {
		util.logMessage('loadGames', '');		
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		
		// send request to get assignment list
		util.ajax({
			'url': 'json/game'+preferenceObj.classViewId+'.json',
			'async': false,
			'success': window.waggleui.controller.getGameLists
		});
	}
	
	function getGame(preferenceObj){
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
	}
	
	function getUpdatedCloudyAndFeetsInfo (preferenceObj){
		util.logMessage('Get Updated Cloudy And Feets Information', '');		
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		// send request to get assignment list
		util.ajax({
			'url': 'json/getUpdatedCloudyAndFeetsInfo.json',
			'async': false,
			'success': window.waggleui.controller.updateCloudyAndFeetsInfo
		});
	}
	
	function getBadQuestionOptions (){
		util.logMessage('Get getBadQuestionOptions', '');
		util.ajax({
			'url': 'json/preCannedProblemOptions.json',
			'async': false,
			'success': window.waggleui.controller.loadBadQuestionOptions
		});
	}
	
	function reportBadQuestion (preferenceObj){
		util.logMessage('Report Bad Question', '');		
		console.log(preferenceObj);
		util.ajax({
			'url': 'json/reportBadQuestionResponse.json',
			'async': false,
			'success': window.waggleui.controller.reportBadQuestionResponse
		});
	}
	
	function amsStandAloneGetItem(preferenceObj){
		util.logMessage('AMS StandAlone getItem', '');
		console.log(preferenceObj);
		window.waggleui.services.getED(preferenceObj);
		//Obtaining dummy json objects for now with a callback function getAssignmentItem
		util.ajax({
			'url': 'json/item'+preferenceObj.itemId+'.json',
			'async': false,
			'success': function(response) {
				var itemData = JSON.parse(response.item);			      
			        itemData = cleanUpItem(itemData);
			        response.item = itemData;
			        console.log(itemData);			        
				if (response.item) {
					if (response.item.itemId){
						$('#preload').html(''); 
						$('body').removeClass('canvas_ch canvas_hs canvas_sl canvas_dd canvas_srt canvas_mg canvas_ei canvas_et emerald canvas_hl canvas_or');
						
						/*if ( (_onSuccessCallAnimation)&&(typeof _onSuccessCallAnimation === "function") ){
							_onSuccessCallAnimation ();
						}*/
						window.waggleui.model.setAmsStandAloneItem(response);
					}else if(response.item.interstitialsMessage){
						window.waggleui.controller.getAssignmentItem(false, false, response.item.interstitialsMessage);
					}
				}else{
					/*window.waggleui.model.setAmsItem(null, response.assignment, response);
					window.waggleui.model.setUserProfile(response.profile);
					window.waggleui.controller.getAssignmentItem(false,  response.assignment["info"]["assignmentId"]);*/
				}
			}
		});
	}
	
	return {
		getInitData: getInitData,
		getSkillsAquired: getSkillsAquired,
		loadAssignments: loadAssignments,
		getMessages: getMessages,
		getAssignmentItem: getAssignmentItem,
		getGradedAssignmentItem: getGradedAssignmentItem,
		getretryAssignmentItem: getretryAssignmentItem,
		getTeachersFeedbackItem: getTeachersFeedbackItem,
		getHint: getHint,
		updateMessageViewStatus: updateMessageViewStatus,
		getAssignmentSkills: getAssignmentSkills,		
		loadAssignmentSkillReview: loadAssignmentSkillReview,
		checkAnswer: checkAnswer,
		submitAnswer: submitAnswer,
		saveAnswer: saveAnswer,
		getAssignmentNotes: getAssignmentNotes,
		updateAssignmentNoteViewStatus: updateAssignmentNoteViewStatus,
		getFlocks: getFlocks,
		getUpdatedFlocksReleased: getUpdatedFlocksReleased,
		getUpdatedFeetTraveled: getUpdatedFeetTraveled,
		updateAlertStatus: updateAlertStatus,
		getCompletedAssignmentItem:getCompletedAssignmentItem,
		removeCompletedAssignmentFromList: removeCompletedAssignmentFromList,
		setAvatar : setAvatar,
		signOut: signOut,
		setAudio: setAudio,
		cancelSessionTimeout: cancelSessionTimeout,
		ReportActiveTime :ReportActiveTime,
		loadGames: loadGames,
		getGame : getGame,
		getUpdatedCloudyAndFeetsInfo: getUpdatedCloudyAndFeetsInfo,
		getBadQuestionOptions: getBadQuestionOptions,
		reportBadQuestion: reportBadQuestion,
		amsStandAloneGetItem: amsStandAloneGetItem
	}
}());


function getParameterByName(name) {
    //if(name=="itemID") name="itemId";
    //if (name == "productId") name = "productID";
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)","i"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function cleanUpItem(item) {
    if (item.highlight_method != undefined) {
        if (item.highlight_method == "paragraph") {
            var answerList = item.highlight_available_answers.answer;
            $.each(answerList, function (m) {
                var properText = this.text.trimLeft();
                this.text = properText;
                console.log(this);
            });
        }
    }
    return item;
}