window.waggleui.model = (function() {
	var thisAssignmentObject = null,
	 	thismessageObj = null,
	 	waggleProperties = {},
	 	wagglePropertiesLinks = {},
	 	amsItemObject = null,
	 	amsassignment = null,
	 	classObject = null,
	 	localProperties = {},
	 	userProfile = null,
	 	privateUserProfile = null,
		globalAudio = null,
		completedAssignmentSkills = null,
		clickCompletedAssignmentIconResponse = null,
		notesInfo = {},
		avatarInfo = {},
		audioInfo = {},
		signOutStatus = {},
		messageInfo = {},
		goalsAcquiredInfo = {},
		sourceFlag = null,
		messageCloudResponse = {},
		nextQuestionFlag = null,
		getItemFlag = null,
		gameObject = null,
		completeAmsItemobject = null,
		localAnalytics = null,
		badQuestionOptions = null,
		amsStandAloneItem = null,
		assignmentNotesObject = null;
		originOfShowCleared = null;
	
	function setNextQuestionFlag (flagStatus){
		nextQuestionFlag = flagStatus;
	}
	
	function getNextQuestionFlag (){
		return nextQuestionFlag;
	} 
	
	function setCurrentClassObject (preferenceObj){
		classObject = preferenceObj;
	}
	
	function getCurrentClassObject (){
		return classObject;
	}
	
	function setThisAssignmentList(preferenceObj) {
		thisAssignmentObject = preferenceObj;
	}
	
	function getThisAssignmentList() {
		return thisAssignmentObject;
	}
	
	function setMessageClouds(messageObj) {
		thismessageObj = messageObj;
	}
	
	function getMessageClouds() {
		return thismessageObj;
	}
	
	function setWaggleProperties(options) {
		waggleProperties = options;
	}
	
	function getWaggleProperties() {
		return waggleProperties;
	}
	
	function setLocaleBaseModel (options){
		wagglePropertiesLinks = options;
	}
	
	function getLocaleBaseModel (){
		return wagglePropertiesLinks;
	}
	
	function setAmsItem(item,assignment, data) {
		amsItemObject = item;
		completeAmsItemobject = data;
		if (assignment)
			amsassignment = assignment;
	}
	
	function getCompleteAmsItemobject() {
		return completeAmsItemobject;
	}
	
	function getAmsItem() {
		return amsItemObject;
	}
	
	function getAssignmentName(){
		if (amsassignment){
			return amsassignment.info.assignmentName;
		}		
		return false;
	}
	
	function getSubjectID(){
		if (amsassignment && amsassignment.info && amsassignment.info.subjectId){
			return amsassignment.info.subjectId;
		}
		
		return null;
	}
	
	function setLocalProperties (variables){
		localProperties = variables;
	}
	
	function getLocalProperties (){
		return localProperties;
	}
	
	function setUserProfile(profile) {
		userProfile = profile;
	}
	
	function setPrivateUserProfile(profile) {
		privateUserProfile = profile;
	}
	
	function getUserProfile() {
		return userProfile;
	}
	
	function getPrivateUserProfile() {
		return privateUserProfile;
	}
	
	function setGlobalAudio(value){
		globalAudio = value;
	}	
	
	function getGlobalAudio(value){
		return globalAudio;
	}
	
	
	function setCompletedAssignmentSkills(preferenceObj){
		completedAssignmentSkills = preferenceObj;
	}
	
	function getCompletedAssignmentSkills(){
		return completedAssignmentSkills;
	}
	
	function setClickCompletedAssignmentIconResponse (preferenceObj){
		clickCompletedAssignmentIconResponse = preferenceObj;
	}
	
	function getClickCompletedAssignmentIconResponse (){
		return clickCompletedAssignmentIconResponse;
	}
	
	function setNotesInfo (preferenceObj){		
		notesInfo = preferenceObj;
	}
	
	function getNotesInfo (){
		return notesInfo;
	}
	
	function setAvatarInfo (preferenceObj){		
		avatarInfo = preferenceObj;
	}
	
	function getAvatarInfo (){
		return avatarInfo;
	}
	function setSignOutStatus (preferenceObj){		
		signOutStatus = preferenceObj;
	}
	
	function getSignOutStatus (){
		return signOutStatus;
	}
	
	function setAudioInfo (preferenceObj){		
		audioInfo = preferenceObj;
	}
	
	function getAudioInfo (){
		return audioInfo;
	}
	
	function setMessageInfo (preferenceObj){
		messageInfo = preferenceObj;
	}
	
	function getMessageInfo (){
		return messageInfo;
	}
	
	function setCompletedAssignmentSourceFlag (tempVar){
		sourceFlag = tempVar;
	}
	
	function getCompletedAssignmentSourceFlag (){
		return sourceFlag;
	}
	
	function setGoalsAcquiredInfo(tempVar){
		goalsAcquiredInfo = tempVar; 
	}
	
	function getGoalsAcquiredInfo(){
		return goalsAcquiredInfo;
	}
	
	function setMessageCloudResponse (tempVar){
		messageCloudResponse = tempVar;
	}
	
	function getMessageCloudResponse (){
		return messageCloudResponse;
	}
	
	function setFlagGetItem (flag){
		getItemFlag = flag;
	}
	
	function getFlagGetItem (){
		return getItemFlag;
	}
	
	function setCurrentGameObject (preferenceObj){
		gameObject = preferenceObj;
	}
	
	function getCurrentGameObject (){
		return gameObject;
	}
	
	function setLocalAnalytics (options){		
		localAnalytics = options;		
	}
	
	function getLocalAnalytics (){
		return localAnalytics;
	}
	
	function setAssignmentNotes (options){
		assignmentNotesObject = options; 
	}
	
	function getAssignmentNotes (){
		return assignmentNotesObject;
	}
	
	function getOriginOfShowCleared(){
		return originOfShowCleared;
	}
	
	function setOriginOfShowCleared(state){
		originOfShowCleared = state;
	}
	
	function setBadQuestionOptions (obj){
		badQuestionOptions = obj;
	}
	
	function getBadQuestionOptions (){
		return badQuestionOptions;
	}
	
	function setAmsStandAloneItem (obj){
		amsStandAloneItem = obj; 
	}
	
	function getAmsStandAloneItem (){
		return amsStandAloneItem; 
	}
	
	return {
		setThisAssignmentList: setThisAssignmentList,
		getThisAssignmentList: getThisAssignmentList,
		setMessageClouds: setMessageClouds,
		getMessageClouds: getMessageClouds,
		setWaggleProperties: setWaggleProperties,
		getWaggleProperties: getWaggleProperties,
		setAmsItem: setAmsItem,
		getAmsItem: getAmsItem,
		getSubjectID: getSubjectID,
		getAssignmentName:getAssignmentName,
		setCurrentClassObject: setCurrentClassObject,
		getCurrentClassObject: getCurrentClassObject,
		setLocalProperties: setLocalProperties,
		getLocalProperties: getLocalProperties,
		setUserProfile: setUserProfile,
		setPrivateUserProfile: setPrivateUserProfile,
		getUserProfile: getUserProfile,
		getPrivateUserProfile: getPrivateUserProfile,
		setGlobalAudio: setGlobalAudio,
		getGlobalAudio: getGlobalAudio,
		setCompletedAssignmentSkills:setCompletedAssignmentSkills,
		getCompletedAssignmentSkills:getCompletedAssignmentSkills,
		setClickCompletedAssignmentIconResponse: setClickCompletedAssignmentIconResponse,
		getClickCompletedAssignmentIconResponse: getClickCompletedAssignmentIconResponse,
		setNotesInfo: setNotesInfo,
		getNotesInfo: getNotesInfo,
		setAvatarInfo: setAvatarInfo,
		getAvatarInfo: getAvatarInfo,
		setAudioInfo : setAudioInfo,
		getAudioInfo:  getAudioInfo,
		setSignOutStatus: setSignOutStatus,
		getSignOutStatus: getSignOutStatus,
		setMessageInfo: setMessageInfo,
		getMessageInfo: getMessageInfo,
		setCompletedAssignmentSourceFlag: setCompletedAssignmentSourceFlag,
		getCompletedAssignmentSourceFlag: getCompletedAssignmentSourceFlag,
		setGoalsAcquiredInfo: setGoalsAcquiredInfo,
		getGoalsAcquiredInfo: getGoalsAcquiredInfo,
		setMessageCloudResponse: setMessageCloudResponse,
		getMessageCloudResponse: getMessageCloudResponse,
		setNextQuestionFlag: setNextQuestionFlag,
		getNextQuestionFlag: getNextQuestionFlag,
		setFlagGetItem: setFlagGetItem,
		getFlagGetItem:	getFlagGetItem,
		setCurrentGameObject: setCurrentGameObject,
		getCurrentGameObject: getCurrentGameObject,
		getCompleteAmsItemobject: getCompleteAmsItemobject,
		setLocaleBaseModel: setLocaleBaseModel,
		getLocaleBaseModel: getLocaleBaseModel,
		setLocalAnalytics: setLocalAnalytics,
		getLocalAnalytics: getLocalAnalytics,
		setAssignmentNotes: setAssignmentNotes,
		getAssignmentNotes: getAssignmentNotes,
		getOriginOfShowCleared : getOriginOfShowCleared,
		setOriginOfShowCleared : setOriginOfShowCleared,
		setBadQuestionOptions: setBadQuestionOptions,
		getBadQuestionOptions: getBadQuestionOptions,
		setAmsStandAloneItem: setAmsStandAloneItem,
		getAmsStandAloneItem: getAmsStandAloneItem
	}
}());