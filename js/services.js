window.waggleui.services = (function() {	
	var integration = window.waggleui.integration,
		util = window.waggleui.util;
	function getInitData(preferenceObj) {
		integration.getInitData(preferenceObj);
	}
	
	function loadAssignments(preferenceObj, via) {		
		integration.loadAssignments(preferenceObj, via);
	}
	
	/*function loadClearedAssignments (preferenceObj){		//loadClearedAssignments: loadClearedAssignments
		integration.loadClearedAssignments(preferenceObj);
	}*/
	
	/*function saveAudio(preferenceObj) {	//saveAudio: saveAudio,
		integration.saveAudio(preferenceObj);		
	}*/
	
	/*function saveAvatar(preferenceObj) {	//saveAvatar: saveAvatar,
		integration.saveAvatar(preferenceObj);
	}*/
	
	
	function getAssignmentItem(preferenceObj,_onSuccessCallAnimation) {
		integration.getAssignmentItem(preferenceObj,_onSuccessCallAnimation);
	}
	
	function getGradedAssignmentItem(preferenceObj,_onSuccessCallAnimation) {
		integration.getGradedAssignmentItem(preferenceObj,_onSuccessCallAnimation);
	}
	
	function getretryAssignmentItem(preferenceObj,_onSuccessCallAnimation) {
		integration.getretryAssignmentItem(preferenceObj,_onSuccessCallAnimation);
	}
	
	function getTeachersFeedbackItem(preferenceObj) {
		integration.getTeachersFeedbackItem(preferenceObj);
	}
	
	function getAssignmentSkills(preferenceObj, assignmentOrGame) {
		integration.getAssignmentSkills(preferenceObj, assignmentOrGame);
	}
	
	function getSkillsAquired(preferenceObj) {
		integration.getSkillsAquired(preferenceObj);
	}
	
	function loadAssignmentSkillReview (preferenceObj){
		integration.loadAssignmentSkillReview(preferenceObj);
	}
	
	/*function loadAssignments(preferenceObj) {
		integration.loadAssignments(preferenceObj);
	}*/
	
	function getMessages(preferenceObj) {
		integration.getMessages(preferenceObj);
	}
	
	function updateMessageViewStatus(preferenceObj) {
		integration.updateMessageViewStatus(preferenceObj);
	}
	
	function getUpdatedFlocksReleased(preferenceObj) {
		integration.getUpdatedFlocksReleased(preferenceObj);
	}
	
	function getUpdatedFeetTraveled(preferenceObj) {
		integration.getUpdatedFeetTraveled(preferenceObj);
	}
	
	/*function getAssignmentItem(preferenceObj) {
		integration.getAssignmentItem(preferenceObj);
	}*/ 
	function checkAnswer(preferenceObj){
		return integration.checkAnswer(preferenceObj);
	}
	
	function submitAnswer(preferenceObj){
		return integration.submitAnswer(preferenceObj);
	}
	
	function saveAnswer(preferenceObj){
		return integration.saveAnswer(preferenceObj);
	}
	
	function getHint(preferenceObj) {
		return integration.getHint(preferenceObj);
	}
	
	function ReportActiveTime(preferenceObj,UserAction){ 
        return integration.ReportActiveTime(preferenceObj,UserAction); //UserAction will be "AMBrowseClose"
	}
	function getFlocks(preferenceObj) {
		return integration.getFlocks(preferenceObj);
	}
	
	function getFeetTraveled(preferenceObj) {
		return integration.getFeetTraveled(preferenceObj);
	}
	
	function getsubjectskills(subjectname) {
		return integration.getsubjectskills(subjectname);
	}
	
	function getCurrentAssignment(assignmentId) {
		var assignmentsList = window.waggleui.model.getThisAssignmentList(),
    		currentAssignment = null, aIndex;
		
		if (assignmentsList == null){
			return currentAssignment;
		}else{
			for(aIndex = 0; aIndex < assignmentsList.length; aIndex += 1) {
	    		if(assignmentId === assignmentsList[aIndex]['info']['assignmentId']) {
	    			currentAssignment = assignmentsList[aIndex];
	    			break;
	    		}    	
	    	}
	    	return currentAssignment;
		}
	}
	
	/*function loadProperties() {	//loadProperties: loadProperties,
		util.logMessage('loadProperties','loading initial properties dynamically.');
		util.ajax({
			'url': 'json/waggleProperties.json',
			'async': false,
			'success': window.waggleui.controller.loadDynamicHTML
		});
	}*/
	
	function getLocaleBase (){
		util.logMessage('getLocaleBase','loading initial URL properties dynamically.');
		util.ajax({
			'url': 'assets/locale/base/localeBase.json',
			'async': false,
			'success': function(response){
				window.waggleui.model.setLocaleBaseModel(response);
			}
		});
	}
	
	function getLocaleProperties (){
		util.logMessage('getLocaleProperties','loading initial LABEL properties dynamically.');
		util.ajax({
			'url': 'assets/locale/'+locale+'/localeProperties.json',
			'async': false,
			'success': window.waggleui.controller.loadDynamicHTML
		});
	}
	
	function getAssignmentNotes (preferenceObj){
		integration.getAssignmentNotes(preferenceObj);
	}
	
	/*function changeStudentAvatar (preferenceObj){	//changeStudentAvatar : changeStudentAvatar,
		integration.changeStudentAvatar(preferenceObj);
	}*/
	
	function setAvatar (preferenceObj){
		integration.setAvatar(preferenceObj);
	}
	
	/*function toggleAudio (preferenceObj){	//toggleAudio: toggleAudio,
		integration.toggleAudio(preferenceObj);
	}*/
	
	function setAudio (preferenceObj){
		integration.setAudio(preferenceObj);
	}
	
	/*function userSignOut (preferenceObj){	//userSignOut: userSignOut,
		integration.userSignOut(preferenceObj);
	}*/
	
	function signOut (preferenceObj){
		integration.signOut(preferenceObj);
	}
	
	function updateAssignmentNoteViewStatus (preferenceObj){
		integration.updateAssignmentNoteViewStatus(preferenceObj);
	}
	
	/*function getAlertMessages (){		getAlertMessages: getAlertMessages,
		util.logMessage('Load Messaging','Loding Parent\'s Messages in Student DashBoard ');		
		util.ajax({
			'url': 'json/messages.json',
			'async': false,
			'success': window.waggleui.messageController.getMessageObject
		});
	}*/
	
	function updateAlertStatus (preferenceObj){
		integration.updateAlertStatus(preferenceObj);
	}
	
	/*function getCompletedAssignmentSkills(preferenceObj){	//getCompletedAssignmentSkills:getCompletedAssignmentSkills,
		integration.getCompletedAssignmentSkills(preferenceObj);
	}*/
	
	function getCompletedAssignmentItem(preferenceObj ,assignmentBlock){
		integration.getCompletedAssignmentItem(preferenceObj, assignmentBlock);
	}
	
	function removeCompletedAssignmentFromList (preferenceObj){
		integration.removeCompletedAssignmentFromList(preferenceObj);
	}			
	
	function cancelSessionTimeout(preferenceObj) {
		integration.cancelSessionTimeout(preferenceObj);
	}
	
	function loadGames(preferenceObj) {
		integration.loadGames(preferenceObj);
	}
	
	function getED(preferenceObj) {
		var encryptedData = JSON.stringify(preferenceObj);
		var cipher = encryptedData.match(/.{1,2}/g).reverse().join('').replace(/[^{}\[\]":,]+/g, function(){
	          return encodeURIComponent(arguments[0]);
	    });
		console.log(cipher);
	}

	function getDD(cipher) {
		var dataString = decodeURIComponent(cipher),
	        regLen = dataString.length % 2,
	        regex, end, start;
	    if (!regLen) {
	        regex = new RegExp(".{1,2}");
	    } else {
	        regex = new RegExp(".{1," + regLen + "}");
	    }
	    end = dataString.match(regex);
	    start = dataString.replace(regex, '');
	    dataString = "";
	    if (start) {
	        dataString = start.match(/.{1,2}/g).reverse().join('');
	    }
	    if (end) {
	        dataString = dataString + end[0];
	    }
	    return JSON.parse(dataString);
	}
	
	function getGame(preferenceObj){
		integration.getGame(preferenceObj);
	}
	
	function analyticsServiceTrackPageView(preferenceObj){		
		util.logMessage('wg-analytics-pageview', '');
		console.log (preferenceObj);
		ga('send',preferenceObj);
	}
	
	function analyticsServiceTrackEvent(preferenceObj){		
		util.logMessage('wg-analytics-event', '');
		console.log (preferenceObj);
		ga('send',preferenceObj);
	}
	
	function getLocalAnalyticsInfo (){
		util.logMessage('getLocalAnalytics','loading local Analytics Object');
		util.ajax({
			'url': 'json/localAnalytics.json',
			'async': false,
			'success': function(response){				
				window.waggleui.model.setLocalAnalytics(response);
			}
		});
	}
	
	function getUpdatedCloudyAndFeetsInfo (preferenceObj){
		integration.getUpdatedCloudyAndFeetsInfo(preferenceObj);
	}
	
	function getBadQuestionOptions (){
		integration.getBadQuestionOptions();
	}
	
	function reportBadQuestion (preferenceObj){
		integration.reportBadQuestion(preferenceObj);
	}
	
	function amsStandAloneGetItem (preferenceObj){
		integration.amsStandAloneGetItem(preferenceObj);
	}
	
	return {
		getInitData: getInitData,
		getAssignmentItem: getAssignmentItem,
		getGradedAssignmentItem: getGradedAssignmentItem,
		getretryAssignmentItem:getretryAssignmentItem,
		getSkillsAquired: getSkillsAquired,
		loadAssignments: loadAssignments,		
		getMessages: getMessages,
		updateMessageViewStatus: updateMessageViewStatus,
		getTeachersFeedbackItem: getTeachersFeedbackItem,
		getHint: getHint,		
		getAssignmentSkills: getAssignmentSkills,
		loadAssignmentSkillReview: loadAssignmentSkillReview,
		getsubjectskills: getsubjectskills,
		checkAnswer: checkAnswer,
		submitAnswer: submitAnswer,
		saveAnswer: saveAnswer,
		getCurrentAssignment: getCurrentAssignment,
		getAssignmentNotes: getAssignmentNotes,
		updateAssignmentNoteViewStatus: updateAssignmentNoteViewStatus,
		getFlocks: getFlocks,
		getUpdatedFlocksReleased: getUpdatedFlocksReleased,
		getFeetTraveled: getFeetTraveled,
		getUpdatedFeetTraveled: getUpdatedFeetTraveled,
		updateAlertStatus: updateAlertStatus,
		getCompletedAssignmentItem:getCompletedAssignmentItem,
		removeCompletedAssignmentFromList: removeCompletedAssignmentFromList,
		setAvatar: setAvatar,
		signOut: signOut,
		setAudio: setAudio,
		cancelSessionTimeout: cancelSessionTimeout,
		ReportActiveTime :ReportActiveTime,
		loadGames: loadGames,
		getED: getED,
		getDD: getDD,
		getGame : getGame,
		getLocaleBase: getLocaleBase,
		getLocaleProperties: getLocaleProperties,
		analyticsServiceTrackPageView: analyticsServiceTrackPageView,
		analyticsServiceTrackEvent: analyticsServiceTrackEvent,
		getLocalAnalyticsInfo: getLocalAnalyticsInfo,
		getUpdatedCloudyAndFeetsInfo: getUpdatedCloudyAndFeetsInfo,
		getBadQuestionOptions: getBadQuestionOptions,
		reportBadQuestion: reportBadQuestion,
		amsStandAloneGetItem: amsStandAloneGetItem
	}
}());