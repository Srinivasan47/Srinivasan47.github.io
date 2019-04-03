window.waggleui.controller = (function() {
	
	function getInitData(user) {
		 latestFeet = true; //(flag to disable click)-vallabh
		var avatar = $('.avatar-item-img').data('avatar'),
			$usersList = $('.users-list'),
			classIndex, classLength,
			userProfile = user.profile,
			$avatarName = $('.avatar-name'),
			$avatarItemImage = $('.avatar-item-img'),
			instructionalAssignments = user['instructionalAssignments'] ? user['instructionalAssignments'].trim() : "";
		
		window.waggleui.model.setUserProfile(userProfile);
		window.waggleui.model.setPrivateUserProfile(userProfile);
		//window.waggleui.messageController.getMessageObject(user.class.alerts);
		
		$avatarName.text(userProfile.studentDisplayName);
		$avatarName.attr({
			'studentId' : userProfile.studentId,
			'knewtonId' : userProfile.knewtonId,
			'year'      : userProfile.year
		});
		if (instructionalAssignments){
			if ( (instructionalAssignments != '') && (instructionalAssignments > 0) ){
				$("#assignmentsNotification").css({"display":"inline-block"}).html(instructionalAssignments);
			}else{
				$("#assignmentsNotification").css({"display":"none"});
			}						
		}else{
			$("#assignmentsNotification").css({"display":"none"});
		}
		/*$('.avatar-name').attr('studentId',userProfile.studentId); //multiple use of same jQuery selector.
		$('.avatar-name').attr('knewtonId',userProfile.knewtonId);
		$('.avatar-name').attr('year',userProfile.year);*/
		if(userProfile.avatar){
			$avatarItemImage.removeClass(avatar + '-avatar').removeClass('hidden')
							.addClass(userProfile.avatar + '-avatar')
							.data("avatar", userProfile.avatar);
		}else{
			$avatarItemImage.removeClass(avatar + '-avatar').removeClass('hidden')
							.addClass('default-avatar')
							.data("avatar", 'default');
		}
		var $drop1 = $('#drop1').find('.audio-icon');
		if(userProfile.globalAudio === 'on') {
			$drop1.removeClass('mute').addClass('play');
			//window.waggleui.model.setGlobalAudio(true);
		} else {
			$drop1.removeClass('play').addClass('mute');
			//window.waggleui.model.setGlobalAudio(false);
		}	
		var $getCoach = $('.get-coach');
		if(userProfile.getCoach === 'on') {
			$getCoach.removeClass('hide');
		} else {
			$getCoach.addClass('hide');
		}
		$usersList.find('li').remove();
		
		if ( (user['class']) && (user['class']['classViewId'].trim() != '') ){
			
			$(".app-stats-blocks .score, .app-stats-blocks .app-stats-title, .app-stats-blocks .flying-pig").css({"visibility":"visible"});
			$(".show-user-list-wrapper .show-users, .show-user-list-wrapper #users-list-nav").css({"display":"block"});
			
			var markup = [];
			//$('.class-mark').before('<li><a classId="'+user['class'].classId+'">'+user['class'].className+'</a></li>');
			//markup.push('<li><a classviewid="'+user['class'].classViewId+'" classId="'+user['class'].classId+'">'+user['class'].className+'</a></li>');
			classLength =  user.classes.length;
			for(classIndex = 0; classIndex < classLength; classIndex += 1) {
				//$('.class-mark').before('<li><a classId="'+user.classes[classIndex].classId+'">'+user.classes[classIndex].className+'</a></li>');
				markup.push('<li><a classviewid="'+user.classes[classIndex].classViewId+'" classId="'+user.classes[classIndex].classId+'">'+user.classes[classIndex].className+'</a></li>');
				
			}		
			markup.join('');
			$usersList.html(markup);
			//$usersList.find('li:first').find('a').addClass('active');
			initializecarousel(user['classes']);
			
			$usersList.append('<li class="class-mark"></li>');
			/*$('.class-mark').css({
		        'left': ((($usersList.find('a.active').position().left + $usersList.find('a.active').width() / 2) - $('.class-mark').outerWidth()+10 + 'px'))
		    });*/			
		}else{
			$("#skillsAcquired").removeClass('skills').css({"cursor":"default"});
			$("#flocksReleased").removeClass('flocks').css({"cursor":"default"});
			$('a.games-anchor').addClass('disableAnchorTag');
		}
		
		/* Session Validation for Games -  Starts */
		var previousGameStatus = JSON.parse(sessionStorage.getItem("closeGame"));		
		if (previousGameStatus){
			if (previousGameStatus == true)	{
				var restoreProperties = JSON.parse(sessionStorage.getItem("gameRestoreProperties"));
				if (restoreProperties){
					var activeClassId = restoreProperties['activeClassId'],
						modalFrom = restoreProperties['game']['modalFrom'],
						classId = $("#users-list-nav .viewport .active").attr('classId');
						
					//console.log ("activeClassId and modalFrom is -> "+ activeClassId +"  "+modalFrom);
						
					if (modalFrom == 'practice'){ //assignments
						setTimeout(function(){$('#users-list-nav .users-list li a[classviewid='+activeClassId+']').trigger('click')},500);
					}else if (modalFrom == 'games'){
						setTimeout(function(){$('#users-list-nav .users-list li a[classviewid='+activeClassId+']').trigger('click')},500);
						setTimeout(function(){$("#appMenu li:eq(1) .app-links").trigger('click.changeState')},500);
					}						        			
				}
			}else{
				_defaultProcedure();
			}
		}else{
			_defaultProcedure();
		}
		/* Session Validation for Games -  Ends */
		
		function _defaultProcedure(){
			if ( (user['class']) && (user['class']['classViewId'].trim() != '') ){
				getAssignmentLists (user['class']);
				
				//Analytics - pageview
				/*var analyticsRequestObjectPageView = window.waggleui.view.prepareAnalyticsObjectForPageView ('SDB Assignments');
				window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
			}
		}
		
		if( (user['class']) && (user['class']).hasOwnProperty('showGames') && user['class']['showGames'] === 'off'){
			$('a.games-anchor').addClass('disableAnchorTag');
		}		
	}
	
	
	function initializecarousel(totalClass){
		
		var ousers = $('#users-list-nav'),
			userslength = ousers.find('.overview li').length,
			wwidth=$(window).width(),
			$userListLi = $(".users-list li");
				
		if(userslength <=4 ){
			//$('#users-nav-left,#users-nav-right').css('display','none');
			$("#users-list-nav .overview li").css('border-left','0px');
			//$(".users-list li").css('border-left','2px solid #CECECE');
			$(".users-list li:first-child").css('border-left','0px');
			$(".users-list li:last-child").css('border-left','0px');
			$userListLi.css({
				'text-align' : 'center' /* , 'padding' : '0 10px 0' */
			});
			/*$(".users-list li").css('text-align','center');
			$(".users-list li").css('padding','0 10px 0');*/
			$("#users-list-nav .overview li").css('width','auto');
		}
		
		if (wwidth === 768 ) {
			//_decidePagination(3, totalClass);
			ousers.tinycarousel({display:3, pager: true});
			$(".users-list").css('line-height','14px');
			$(".overview").css('margin-top:1px;');
		}else {
			//_decidePagination(5, totalClass);
			//ousers.tinycarousel({display:5, pager: true});
			window.waggleui.view.initializeClassListCarousel();
		}
		
		function _decidePagination(display, totalClass){
			var numberOfClass = totalClass.length,
				numberOfPagination = Math.ceil(numberOfClass/display),
				count = 0;
			
			//console.log ("numberOfClass/display = numberOfPagination => "+ numberOfClass+"/"+display+"="+numberOfPagination);
			
			$("#users-list-nav .pager").html("");
			for (var i=0; i<numberOfPagination; i++){
				count = i+1;
				$("#users-list-nav .pager").append('<li><a rel="'+i+'" class="pagenum" href="#">'+count+'</a></li>');
			}			
		}
	}

	/**
	 *  Get Assignment List when page load by default class or clicked by any classes
	 *  @assignmentListObject is class object contains Assignment lists and other infos.
	 */
	function getAssignmentLists (assignmentListObject){
		//if(latestFeet){} //(flag to disable click)-vallabh
		
		//Analytics
		/*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.header.class');
		window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
		
		$("#dueDate, #packAssignment").removeAttr("title");
		
		var $assignmentStatusPopup = $('.assignment-status-popup'),
		    $showHideCompleted = $("#showHideCompleted"),
		    $noAssignmentListWrapper = $(".no-assignment-list-wrapper"),
		    $assignmentListWrapper = $(".assignment-list-wrapper");
		    
		if(	$assignmentStatusPopup.is(':visible')){
			$assignmentStatusPopup.slideUp(50).attr('assignment_id','');
			$('.assignment-row').css({opacity:"1"});
			$('.skillMeterStatus').addClass('line-strip').removeClass('line-strip');
		}
		window.waggleui.model.setCurrentClassObject (assignmentListObject); //Store class object in model
				
		if(	$('#completedAssignmentListWrapper').is(':visible'))
		{
    		window.waggleui.animation.completedAssignmentEasingOut ("toRight","updateHeaderHeight");
		}else{
			window.waggleui.messageController.getMessageObject(assignmentListObject.alerts); //onClick of Classes, Bring its messages
		}
		
		if(assignmentListObject.hasOwnProperty('showGames') && assignmentListObject['showGames']=== "off"){
			$('a.games-anchor').addClass('disableAnchorTag');
		}else{
			$('a.games-anchor').removeClass('disableAnchorTag');
		}
		
		if (assignmentListObject.hasClearedAssignments == "off"){
			$showHideCompleted.hide();
		}else{
			$("#showHideCompleted").css({"display":"inline-block"});
		}
		
		if ( (assignmentListObject.hasTeachers) && (assignmentListObject.hasTeachers == 'off') ){
			$("#assignmentWrapper").hide();			
			$('.main-container').delay(1500).removeClass('remove-dotted-bg');
			$('#lift_level,.score_marker').delay(750).animate({opacity: '1'}, 500);
			$("#classHasNoTeacher, #errorMessageModalOverlay").removeClass("hide");
		}else{
			if ( (assignmentListObject.classSuggestions) && (assignmentListObject.classSuggestions.length > 0) ){
				$showHideCompleted.hide();
				zeroState(window.waggleui.model.getCurrentClassObject());
				$noAssignmentListWrapper.removeClass("hide");
				$noAssignmentListWrapper.css({'display':'block'});			
				$("#wrapperleft ul").empty();
				$(".app-modules-pager ul").empty();
				//$("#showHideCompleted").addClass("hide");
				window.waggleui.animation.assignmentEasingIn ('zeroState');
			}else if ( (assignmentListObject.assignments) && (assignmentListObject.assignments.length > 0) ){
				//list completedAssignment and followed by "sort" uncompletedassignment by dueXdays
				var sortedAssignments = null,
					collectCompletedAssignment = [],
					collectUnCompletedAssignment = [],
					finalarray = null,
					assignmentList = assignmentListObject.assignments;
				$("#noAssignmentListWrapper").empty();			
				
				//sort start
				/*for (i=0; i<assignmentList.length; i++){
					if (assignmentList[i]['outcome']['completed'] == 'false'){
						collectUnCompletedAssignment.push(assignmentList[i]);
					}else{
						collectCompletedAssignment.push(assignmentList[i]);
					}
				}

				sortedAssignments = _sortAssignmentsByDate (collectUnCompletedAssignment);	//Sort only unCompleted Assignments
				finalarray = $.merge( $.merge([],collectCompletedAssignment), sortedAssignments);*/			
				//sort ends
				
				finalarray = assignmentList;
				
				window.waggleui.model.setThisAssignmentList (finalarray); //Store sorted assignment array in Model
				//showHideCompletedAssignments (finalarray);
							
				createPagination (assignmentList.length);	//Create pagination
				//sliceAssignments (finalarray.slice(0,5));	//Slice Assignments into five
				sliceAssignments (finalarray);	//Slice Assignments into five
				
				/* Session Validation for Games -  Starts */
				var previousGameStatus = JSON.parse(sessionStorage.getItem("closeGame"));			
				if (previousGameStatus){
					if (previousGameStatus == true)	{
						var restoreProperties = JSON.parse(sessionStorage.getItem("gameRestoreProperties"));
						if (restoreProperties){
							var activeClassId = restoreProperties['activeClassId'],
								modalFrom = restoreProperties['game']['modalFrom'];
								
							if (modalFrom == 'practice'){ //assignments
								if(window.location.hash.search('itemId') === -1){
									window.waggleui.animation.assignmentEasingIn ('assignmentList');
								}							
							}else if (modalFrom == 'games'){}
							sessionStorage.setItem("closeGame", false);
							sessionStorage.setItem( "gameRestoreProperties", JSON.stringify({}) );
						}					
					}else{
						if(window.location.hash.search('itemId') === -1){
							window.waggleui.animation.assignmentEasingIn ('assignmentList');
						}
					}
				}else{
					if(window.location.hash.search('itemId') === -1){
						window.waggleui.animation.assignmentEasingIn ('assignmentList');
					}	
				}		
				/* Session Validation for Games -  Ends */
				
			} /* assignment list ends */
		}
		
		//setTheme(assignmentListObject);
		
		/* general cloud position - starts */
		
		var $cloudContainer = $("#cloudContainer .cloud"),
		    $cloudyMessageWrapper = $("#cloudyMessageWrapper");
		
		$cloudContainer.css({"right":"55px"});
    	if($cloudContainer.is(":visible")){
			var left = $cloudContainer.offset().left - ($cloudContainer.outerWidth() - 10),
				top = $cloudContainer.offset().top,
				height = $cloudContainer.outerHeight() + 5;
			
			/*if($cloudContainer.is(":visible")){
				$cloudyMessageWrapper.css({
				"left": left -22,
				"top": top + height + 5
				});
			}else{
				$cloudyMessageWrapper.css({
				"left": left,
				"top": top + height
				});
			}*/
    	}    	
    	/* general cloud position - ends */
    	
    	//Lift meter
    	//$("#lift_level").css({"opacity":"1"});    	
	
		window.waggleui.model.setMessageClouds(assignmentListObject.messageClouds);
		$("#skillsAcquired").find(".score").html(assignmentListObject.rewards.skillsAccquired);
		var flocksReleased = parseInt(assignmentListObject.rewards.flocksReleased);
		if(flocksReleased > 999){
			//$(".flocks").find(".score").css('font-size','2.9em');
			$(".flocks").find(".score").addClass('more-digits');
		}else{
			$(".flocks").find(".score").removeClass('more-digits');
		}
		$(".flocks").find(".score").html(flocksReleased);
		$.fn.commafy = function(){ 
		    return this.each(function(){ 
		        $(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
		    })
		}

         $('#background_lines,#lift_level').css('bottom','3px');
		$(".feet").find(".score").html(assignmentListObject.rewards.feetTraveled);
       
		var flocksReleasedLength = assignmentListObject.flockClouds.length,			
			$flockCloudoff = $(".flock-cloud-off");

		if (flocksReleasedLength === 0){
			$flockCloudoff.css({display:"none"});
			$flockCloudoff.find('.display-count').html(flocksReleasedLength);
		}else{
			var studentFlockCloudId = assignmentListObject.flockClouds[0]["studentFlockCloudId"];
			$flockCloudoff.css({display:"block"});
			$flockCloudoff.css({"right":"45px", "top":"235px"});
			$flockCloudoff.find('.display-count').html(flocksReleasedLength);
			$flockCloudoff.find('.display-count').attr("studentflockcloudid",studentFlockCloudId);
		}
		// added by jpa suresh 
		
		/*dynamic feet, cloud and feet travelled starts -vallabh */
		
		var feetCloudLength = assignmentListObject.feetClouds.length,
		    $feetCloudOff = $('.feet-cloud-off'),
		    $feetCloudDisplayCount = $('.feet-cloud-off .display-count'),
		    $feetCloudFeetDistance = $('.feet-cloud-off .feet-distance');
		
		if(feetCloudLength === 0){
			$feetCloudOff.css({display : 'none'});
			$feetCloudDisplayCount.html(feetCloudLength);
			$("#flockCloudyOff").css({"right":"125px", "top":"140px"});
		}else{
			var feetLeft = assignmentListObject.feetClouds[0]['value'],
			studentFeetCloudId = assignmentListObject.feetClouds[0]['studentFeetCloudId'];
			$feetCloudOff.css({
				display : 'block',
				right   : '125px'
			});
			$feetCloudDisplayCount.html(feetCloudLength); 
			$feetCloudFeetDistance.html('+' + feetLeft);
			$feetCloudFeetDistance.attr("studentfeetcloudid",studentFeetCloudId);
			if(feetLeft> 99){
				$feetCloudFeetDistance.addClass('more-digits');			
			}
		}
		//This code can be removed.too much use of jQuery selector.
		/*if (feetCloudLength === 0){
			$(".feet-cloud-off ").css({display:"none"});
			$('.feet-cloud-off .display-count').html(feetCloudLength);
			$("#flockCloudyOff").css({"right":"125px", "top":"140px"});
		}else{
			var feetLeft = assignmentListObject.feetClouds[0]['value'],
				studentFeetCloudId = assignmentListObject.feetClouds[0]['studentFeetCloudId'];
			$(".feet-cloud-off").css({display:"block"});
			$(".feet-cloud-off").css('right','125px');
			$('.feet-cloud-off .display-count').html(feetCloudLength); 
			$('.feet-cloud-off .feet-distance').html('+' + feetLeft);
			$('.feet-cloud-off .feet-distance').attr("studentfeetcloudid",studentFeetCloudId);
			if(feetLeft> 99){
				$('.feet-cloud-off .feet-distance').addClass('more-digits');			
			}
		}*/
		setBgLines();	
		$(".app-stats-blocks").find(".score").commafy(); // to add comma after 3 digits
		/* feet ends */
		
		/* dynamic subjects starts*/
		var subjectListObject = assignmentListObject.subjects,
			subjectLength = subjectListObject.length,
			collectSubject= [],
			subjectIndex;
		
		if (subjectLength == "1"){
			collectSubject.push('<div class="subject-dropdown" subjectid="'+subjectListObject[0].subjectId+'">' + subjectListObject[0].subjectName + '</div>');
			$(".custom").html(collectSubject.join(""));
		}
		else{
			for(subjectIndex = 0; subjectIndex < subjectLength; subjectIndex += 1){
				collectSubject.push('<option subjectid="'+subjectListObject[subjectIndex].subjectId+'">' + subjectListObject[subjectIndex].subjectName + '</option>');				
			}
			$("#customDropdown1").html(collectSubject.join(""));
		}
		//$('#goalsAcquiredCurrent .current','.dropdown','form.custom').html(subjectListObject[0].subjectName);
		$('#goalsAcquiredCurrent .current').html(subjectListObject[0].subjectName);
		
		if ( (assignmentListObject.classSuggestions) && (assignmentListObject.classSuggestions.length > 0) ){}
		/*else if ( (assignmentListObject.assignments) && (assignmentListObject.assignments.length > 0) ){
			var currentAssignment = window.waggleui.model.getThisAssignmentList()[0],
		    	preferenceObj = {
		    		'studentId': $('.avatar-name').attr('studentId'),
		    		'classId': assignmentListObject.classId,
		    		'classViewId': assignmentListObject.classViewId,
		    		'subjectId': window.waggleui.model.getCurrentClassObject().subjects[0].subjectId,
		    		'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
		    		'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId']
		    	};			
			//window.waggleui.services.getSkillsAquired(preferenceObj);
			//window.waggleui.services.getsubjectskills (subjectListObject[0].subjectName)
		}*/		
		/* dynamic subjects end*/
		if(window.location.hash.search('itemId') === -1){
			window.waggleui.animation.cloudEasingIn();						
		}
		
		window.waggleui.view.resetClassNavigation();	//Positioning the class pointer to exact class inside class carousel.
				
		cloudyMessageBuilder('initial');
		setTheme(assignmentListObject);
	}
	
	/**
	 * set Theme Function
	 */	
	var prevTheme;
	function setTheme(assignmentListObject) {
		var theme = assignmentListObject.theme;		
		
		$('.users-list a').removeClass('emerald peridot sapphire amethyst garnet');
		$('.app-stats span.app-stats-title').removeClass('emerald peridot sapphire amethyst garnet');
		$('.users-list a.active').addClass(theme);
		$('.app-stats span.app-stats-title').addClass(theme);
		
		function displayTheme(currentTheme){
			if(prevTheme===undefined){
				prevTheme = currentTheme;
				$('body').addClass(currentTheme).addClass('body-animation');	
			}
			else{
				$('body').removeClass('body-animation').removeClass(prevTheme).addClass(currentTheme);
				prevTheme = currentTheme;
			}
		}
		displayTheme(assignmentListObject.theme);
	}
	
	/**
	 * 
	 */
	function getClearedAssignmentLists (clearedAssignments){
		var waggleProperties = window.waggleui.model.getWaggleProperties();
		$('.assignment-status-popup').slideUp(50).attr('assignment_id','');
		$('.assignment-row').css({opacity:"1"});
		$('.skillMeterStatus').addClass('line-strip').removeClass('line-strip');
		var currentClassId = $('.users-list').find('a.active').attr('classId'),			
			assignmentList = clearedAssignments.assignments;
		if (clearedAssignments.classId == currentClassId){
			window.waggleui.model.setThisAssignmentList (assignmentList); //Store assignment array in Model
			$(".no-assignment-list-wrapper").addClass("hide");
			createPagination (assignmentList.length);	//Create pagination
			sliceAssignments (assignmentList);	//Slice Assignments into five
			window.waggleui.animation.assignmentEasingIn ('assignmentList');
			$("#dueDate, #packAssignment").attr("title", waggleProperties['label.content.showCleared.assignmentList.over']);
		}
		setTheme(clearedAssignments);		
	}
	
	/**
	 * 
	 */
	function getUnClearedAssignmentLists (unClearedAssignments){
		$('.assignment-status-popup').slideUp(50).attr('assignment_id','');
		$('.assignment-row').css({opacity:"1"});
		$('.skillMeterStatus').addClass('line-strip').removeClass('line-strip');
		$("#dueDate, #packAssignment").removeAttr("title");
		var currentClassId = $('.users-list').find('a.active').attr('classId');
		if (unClearedAssignments.classId == currentClassId){
			if ( (unClearedAssignments.classSuggestions) && (unClearedAssignments.classSuggestions.length > 0) ){
				var $showHideCompleted = $("#showHideCompleted"),
			    $noAssignmentListWrapper = $(".no-assignment-list-wrapper");

				$showHideCompleted.hide();
				zeroState(unClearedAssignments);
				$noAssignmentListWrapper.removeClass("hide");
				$noAssignmentListWrapper.css({'display':'block'});			
				$("#wrapperleft ul").empty();
				$(".app-modules-pager ul").empty();
				//$("#showHideCompleted").addClass("hide");
				window.waggleui.animation.assignmentEasingIn ('zeroState');
			}else if ( (unClearedAssignments.assignments) && (unClearedAssignments.assignments.length > 0) ){
				//list completedAssignment and followed by "sort" uncompletedassignment by dueXdays
				var sortedAssignments = null,
					collectCompletedAssignment = [],
					collectUnCompletedAssignment = [],
					finalarray = null,
					assignmentList = unClearedAssignments.assignments;
				
				//sort start
				/*for (i=0; i<assignmentList.length; i++){
					if (assignmentList[i]['outcome']['completed'] == 'false'){
						collectUnCompletedAssignment.push(assignmentList[i]);
					}else{
						collectCompletedAssignment.push(assignmentList[i]);
					}
				}
				sortedAssignments = _sortAssignmentsByDate (collectUnCompletedAssignment);	//Sort only unCompleted Assignments
				finalarray = $.merge( $.merge([],collectCompletedAssignment), sortedAssignments);*/
				//sort ends	
				
				finalarray = assignmentList;		
				
				window.waggleui.model.setThisAssignmentList (finalarray); //Store assignment array in Model
				$(".no-assignment-list-wrapper").addClass("hide");			
				createPagination (finalarray.length);	//Create pagination
				sliceAssignments (finalarray);	//Slice Assignments into five
				
				window.waggleui.animation.assignmentEasingIn ('assignmentList');
			}			
		}
		setTheme(unClearedAssignments);
	}
	
	
	/**
	 * 
	 */	
	function clickAndClearCompletedAssignment (clearedAssignmentList, activePaginationId, clickedAssignmentIndex){
		$(".no-assignment-list-wrapper").addClass("hide");		
		
		/*var thisAssignmentList = null,
			localVar = null,
			slicedAssignmentList = [];*/	
		
		if (activePaginationId){
			
			/*numberOfPages = Math.ceil(clearedAssignmentList.length/5);			
			if (numberOfPages > activePaginationId){				
			}else{
				activePaginationId = activePaginationId - 1;				
			}
			createPagination (clearedAssignmentList, activePaginationId);	//Create pagination
			localVar = parseInt(activePaginationId) + 1;
			slicedAssignmentList = clearedAssignmentList.slice(activePaginationId*5,5*localVar);*/
			
			sliceAssignments (clearedAssignmentList);
		}else{
			if (clickedAssignmentIndex >= 0){
				$("#wrapperleft li:eq("+clickedAssignmentIndex+")").remove();
			}
		}		
	}
	
	/**
	 * Create pagination based on Number of Assignments
	 * Dot pagination is created based on (total_no_of_pagination/5)
	 */
	function createPagination (totalAssignments, paginationId){ //sortedAssignments		
		
		/*var paginationCount = Math.ceil(totalAssignments/5); //assignmentDisplaycount		
		$("#assignmentPager").html('');		
		if (totalAssignments != 1){
			for (var i=0; i<paginationCount; i++){
				var j = i+1;
				$("#assignmentPager").append('<li><a rel="'+i+'" class="pagenum" href="#">'+j+'</a></li>');
			}
		}else{
			$("#assignmentPager").html('');
		}*/
		
			
		/*var totalPagination = null,
		paginationMarkup = [],
		totalPagination = Math.ceil(sortedAssignments.length/5);
		if (totalPagination != 1){
			for (var i=0; i<totalPagination; i++){
				if (i == 0){
					if ( (paginationId) && (i != paginationId) )
						paginationMarkup.push('<li>'+ i +'</li>');
					else
						paginationMarkup.push('<li class="selected">'+ i +'</li>');
				}
				else{
					if ( (paginationId) && (i == paginationId) )
						paginationMarkup.push('<li class="selected">'+ i +'</li>');
					else
					paginationMarkup.push('<li>'+ i +'</li>');
				}											
			}
			$(".app-modules-pager ul").html(paginationMarkup.join(""));
		}else{
			$(".app-modules-pager ul").empty();
		}*/
	}
	
	/**
	 * Slice Assignment function brings sliced object as parameter and makeUp datas.
	 */
	function sliceAssignments (slicedAssignment){
		var rowMarkupCollection = [],
			dueObject = null,
			rowMarkup = null,
			waggleProperties = window.waggleui.model.getWaggleProperties();
		
		//Take assignment list. makeup it. keep icon, based on dues and store in an array.
		for (x in slicedAssignment)
		{
			dueObject = _setDues (parseInt(slicedAssignment[x]['outcome']['dueXdays']), waggleProperties);			
			rowMarkup = _markupAssignmentLists (slicedAssignment[x],dueObject, waggleProperties);			
			rowMarkupCollection.push(rowMarkup);
		}
		$(".assignment-list-wrapper ul").empty();
		
		//Put inside "wrapper list container" and check to add dynamic skill meter circle.
		for (i=0,count=0; i<slicedAssignment.length; i++){
			//console.log (slicedAssignment[i]['packName']+"--"+slicedAssignment[i]['totalSkills']+"--"+slicedAssignment[i]['demonstratedSkills']);
			//console.log (slicedAssignment[i]['packName']+"--"+slicedAssignment[i]['dueXdays']+"--"+slicedAssignment[i]['completed']);
			$(".assignment-list-wrapper ul").append(rowMarkupCollection[i]);
			if(slicedAssignment[i]['type'] != "game" && !slicedAssignment[i]['info']['packName'] && (!slicedAssignment[i]['outcome']['itemStatus'] || slicedAssignment[i]['outcome']['itemStatus'].length <= 0)){
				$(".assignment-list-wrapper ul li:eq("+i+")").find('.subject-holder').css('display', 'none')
			}
			if (slicedAssignment[i]['outcome']['locked'] == 'off'){
				if (slicedAssignment[i]['type'] == "game"){
					var totalLevels = parseInt(slicedAssignment[i]['outcome']['totalLevels']),
						levelsCompleted =  parseInt(slicedAssignment[i]['outcome']['levelsCompleted']);
					createDynamicSkillMeter (totalLevels, levelsCompleted, count);
				}else{
					var totalSkills = parseInt(slicedAssignment[i]['outcome']['totalSkills']),
						demonstratedSkills = parseInt(slicedAssignment[i]['outcome']['demonstratedSkills']);				
					createDynamicSkillMeter (totalSkills, demonstratedSkills, count);
				}				
				count += 1;
			}
		}
		//$("#wrapperleft").append('<div id="assignmentHighlighter" class="assignment-highlighter assignment-wheel-animation"></div>');
		
		//$('.assignment-block:first').addClass('active_exercise');
		/* Remove Hover for Lock Assignment List */
		$(".assignment-row .status .status-type-5").parent().parent().each(function(){
			lock = $(this).find(".assignment-block");
			lock.css("cursor","default");
			lock.find(".due-date, .assignment-title, .large-header").css({"color":"black","cursor":"auto"}); //.date, .medium-text, 
			lock.find(".assignment-title").css("color","#666666");
			lock.find(".due-date, .assignment-title, .large-header").addClass("disable-hover");
		});
		/* Remove Hover for Lock Assignment List -ends  */
		
		window.waggleui.view.ellipsisForMultipleLine();	//apply Ellipsis for Assignment List				
		window.waggleui.view.assignmentListCarousel();
		//window.waggleui.view.positionDotPagination();	//position dot pagination whenever new assignmentlist is rendered
		//$(".assignment-list-wrapper").html(rowMarkupCollection.join(""));
	}
	
	/**
	 *  Get Assignment List based on Dot Pagination clicks
	 *  the single parameter -  "paginationId" will contain the value of dot (li)
	 */	
	function getAssignmentListByPagination (paginationId){
		var thisAssignmentList = null,localVar = null,slicedAssignmentList = [];
		thisAssignmentList = window.waggleui.model.getThisAssignmentList();
		localVar = parseInt(paginationId) + 1;
		slicedAssignmentList = thisAssignmentList.slice(paginationId*5,5*localVar);
		sliceAssignments (slicedAssignmentList);
	}
	
	/**
	 * Prepare Due Date(Today, Late, Upcoming[day or days]) for individual assignment
	 */
	function _setDues (dueDate, waggleProperties){
		
		//var today=new Date();	
		//today.setSeconds(0); today.setHours(0); today.setMinutes(0);		
		//var date = new Date(dueDate);
		//var daysLeft = Math.ceil((date - today)/86400000);
		
		var dueObject = {};
		if(dueDate == 0){	//today
			dueObject.dueClass = 'due-today';
			dueObject.icon = 0;
			dueObject.when = waggleProperties['label.dueDate.today'];			
		}else if(dueDate < 0){	//Late
			dueObject.dueClass = 'due-late';
			dueObject.icon = 0;
			dueObject.when = waggleProperties['label.dueDate.late'];
		}else if(dueDate == 1){	//Upcoming - Single
			dueObject.dueClass = '';
			dueObject.icon = dueDate;
			dueObject.when = waggleProperties['label.dueDate.dayLeft'];
		}else{	//Upcoming - Many
			dueObject.dueClass = '';
			dueObject.icon = dueDate;
			dueObject.when = waggleProperties['label.dueDate.daysLeft'];
		}		
		return dueObject;
	}
	
	/**
	 * Decorate Assignment lists
	 */
	function _markupAssignmentLists (sortedAssignments, dueObject, waggleProperties){	
		var row;		
		rowData = $('#dynamicAssignmentRowGenerator').html();
		row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {
			switch (group){
			case "assignmentId":
					if (sortedAssignments["info"]["assignmentId"]){						
						return sortedAssignments["info"]["assignmentId"];
					}
				break;
			case "dueClass":
				if (sortedAssignments["outcome"]["completed"] == "true"){
					return "due-completed";
				}else{
					return dueObject.dueClass
				}
				break;
			case "icon":
				return dueObject.icon
				break;
			case "when":
				if (sortedAssignments["outcome"]["completed"] == "true"){
					return waggleProperties['label.dueDate.complete'];
				}else{
					return dueObject.when
				}				
				break;
			case "disabled" :
				var items = sortedAssignments["outcome"]["itemStatus"];
				if(items){
					for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
						if((items[itemstatus_counter] == "Review") && (sortedAssignments['outcome']['completed'] == "true")){
							return '';
						}
					}
				} 
				
				if(items){
						for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
							if(items[itemstatus_counter] == "Paused"){
								return 'disabled';
							}
						}	
				}
					
					return '';
				break;
			case "packName":
				if(sortedAssignments['type'] === 'game'){
					return sortedAssignments["info"]['gameTheme'] ? sortedAssignments["info"]['gameTheme'] : '' ;
				}else{
					return (sortedAssignments["info"][group] ? sortedAssignments["info"][group] : "");
				}
				break;
			case "assignmentName":				
				return (sortedAssignments["info"][group]?sortedAssignments["info"][group]:"default value");
				break;
			case "notes":
				if (sortedAssignments["outcome"]["notes"]["showNotes"] == 'on'){
					var teacherNotesTitle = waggleProperties['label.assignstatus.teacherNotes'];
					if (sortedAssignments["outcome"]["notes"]["newNotes"] != '0'){
						return '<div class="right assignments-listing" id="notesToolTip" title="'+teacherNotesTitle+'"><div class="notes-count">'+sortedAssignments["outcome"]["notes"]["newNotes"]+'</div></div>';
					}else{
						return '<div class="right assignments-listing" id="notesToolTip" title="'+teacherNotesTitle+'"></div>';
					}
					
				}else{
					return '';
				}
				break;	
			case "locked":
				//sortedAssignments[group] = sortedAssignments[group].trim();				
				if (sortedAssignments["outcome"][group] == "on"){
					//return sortedAssignments[group] == "on" ? "status-type-5" : "status-type-6";
					return '<span class="assignment-status first-status status-type-5" title="'+waggleProperties['label.statusType.locked.title']+'"></span>';
				}else if ("off"){			
					return '<input type="text" value="text" data-min="0" data-readonly="true" class="dial">';
				}
				break;
			case "PausedItemstatus":
				var items = sortedAssignments["outcome"]["itemStatus"];
				if(items){
					for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
						if(items[itemstatus_counter] == "Paused"){
							return '<span title="'+waggleProperties['label.openResponse.gradeToContinue.over']+'" class="assignment-grade-to-continue" style="display:inline-block">'+waggleProperties['label.openResponse.gradeToContinue']+'</span>';
						}
					}
				}
					//return '<span class="assignment-grade-to-continue" style="display:none">Your teacher needs to grade to continue.</span>';
					return '';
				
				/*
				if((sortedAssignments["outcome"]["itemStatus"]) && ((sortedAssignments["outcome"]["itemStatus"] == "Paused"))){
					return '<span class="assignment-grade-to-continue" style="display:inline-block">Your teacher needs to grade to continue.</span>';
				}else {
					return '<span class="assignment-grade-to-continue" style="display:none">Your teacher needs to grade to continue.</span>';
				}*/
				break;
			case "RetryItemstatus":
				var items = sortedAssignments["outcome"]["itemStatus"];
				if(items){
					for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
						if(items[itemstatus_counter] == "Retry"){
							return '<span title="'+waggleProperties['label.openResponse.tryAgain.over']+'" class="assignment-try-again" style="display:inline-block">'+waggleProperties['label.openResponse.tryAgain']+'</span>';
						}
					}

				}
					//return '<span class="assignment-try-again" style="display:none">Try again!</span>';
					return '';
				
				/*if((sortedAssignments["outcome"]["itemStatus"]) && ((sortedAssignments["outcome"]["itemStatus"] == "Retry"))){
					return '<span class="assignment-try-again" style="display:inline-block">Try again!</span>';
				}else {
					return '<span class="assignment-try-again" style="display:none">Try again!</span>';
				}*/
				break;
			case "ReviewItemstatus":
				var items = sortedAssignments["outcome"]["itemStatus"];
				if(items){
					for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
						if(items[itemstatus_counter] == "Review"){
							return '<span title="'+waggleProperties['label.openResponse.graded.over']+'" class="assignment-graded" style="display:inline-block">'+waggleProperties['label.openResponse.graded']+'</span>';
						}
					}
				}
					//return '<span class="assignment-graded" style="display:none">Graded</span>';
					return '';
				/*if((sortedAssignments["outcome"]["itemStatus"]) && ((sortedAssignments["outcome"]["itemStatus"] == "Review"))){
					return '<span class="assignment-graded" style="display:inline-block">Graded</span>';
				}else {
					return '<span class="assignment-graded" style="display:none">Graded</span>';
				}*/
				break;
			case "remaining-play":
				if(sortedAssignments['type'] === 'game' && parseInt(sortedAssignments["outcome"]["playsLeft"]) > 0){
					return '<span class="games-inner-span">Play '+ sortedAssignments["outcome"]["playsLeft"] +' more times.</span>';
				}else{
					return '';
				}
				break;
			case "game-type":
				if(sortedAssignments['type'] === 'game'){
					return 'game-type-row';
				}else{
					return '';
				}
				break;
			case "text-ellipsis":
				var items = sortedAssignments["outcome"]["itemStatus"];
				if((items) && (items.length > 1)){
					for(var itemstatus_counter = 0; itemstatus_counter < items.length;  itemstatus_counter++){
						if(items[itemstatus_counter] == "Paused"){
							return 'text-ellipsis';
						}
					}
				}
				return '';
				break;
			}
        });		
		return row;
	}
	
	function createDynamicSkillMeter (totalSkills, demonstratedSkills, skillMeterIndex){
		
		//settings for the skillmeter
		$('.dial').eq(skillMeterIndex).val(demonstratedSkills).knob({
			'width':60,						                  
			'height':60,
			'thickness':0.33, 
			'max':totalSkills, 
			'fgColor': '#0986CB',
			'inputColor':'black',
			'margin-left':'12px',
			'margin-top':'-40px',
			'readOnly':'true'
		});
		
		//text in the center of the skillmeter
		$('.dial:eq('+skillMeterIndex+')').val(demonstratedSkills+"/"+totalSkills);
		
		//add class to dynamic div from canvas tag
		$(".skillMeterStatus").children('div').addClass("canvas-position");
        
		
		//hover state
		$('.assignment-row .status').hover(function(){
			now = $(this);
			var score = now.find('.dial').val()
			now.find('.dial').trigger('configure',{'fgColor':'#F89D02'});
			now.find('.dial').val(score);
			},function(){
			now=$(this);
			var score = now.find('.dial').val() 
			now.find('.dial').eq(0).trigger('configure',{'fgColor':'#0986CB'});
			now.find('.dial').val(score);
		});
		
		//skillMeterIndex+=1;
	}
	
	/**
	 * Sort only Uncompleted Assignment lists by dueXdays
	 */
	/*function _sortAssignmentsByDate (assignmentsSorting){
		assignmentsSorting.sort(function(a, b){
				//var dateA=new Date(a.dueDate), dateB=new Date(b.dueDate);
				var dueA = a.outcome.dueXdays, dueB = b.outcome.dueXdays;
				return dueA-dueB //sort by ascending										
				//return dueA-dueB //sort by descending										
			});
		return assignmentsSorting;
	}*/
	
	
	
	function getAssignmentItem(itemId, assignmentId, goalComplete) {
				
			var IsHybridAssignment = checkAssignmentType(itemId, assignmentId);			
			if(IsHybridAssignment){
				
				 $('#hybridLastItemPopup').toggleClass('hide');
				 $('#hybridLastItemPopup').css('z-index', '1000');
				 $('#windowOverlay').toggleClass('hide');
				 
				 $('#hybridLastItemPopup').off('click.lastitemgoback').on('click.lastitemgoback', function() {
					 
					 $('#hybridLastItemPopup').toggleClass('hide');
					 $('#windowOverlay').toggleClass('hide');
					 if( (location.hash == '') || (location.hash == '#') ){
							$('.users-list li a.active ').trigger('click');
						}else{
							window.location.hash = '';
						}	
					 
					 }); 
				 
			}
			else if (goalComplete){
		    	$("#growlMessageWrapper .growl-message-right").html(goalComplete);
		    	
		    	if( (location.hash == '') || (location.hash == '#') ){
		    	}else{
		    		$("#app_exercise_container").css({"display":"none"});		    		
		    	}		    	
		    	
				$("#growlMessageWrapper").fadeIn("900").delay(4000).fadeOut(900, function(){
					if( (location.hash == '') || (location.hash == '#') ){
						$('.users-list li a.active ').trigger('click');
					}else{
						window.location.hash = '';
					}					
					$("#growlMessageWrapper .growl-message-right").html('');					
			    });
		}else{
				/* Checking Remediation availability - Starts */
				  var remediation = window.waggleui.model.getAmsItem().interstitialsMessage;
				  if (remediation){
					  setTimeout(function(){
						$("#remediationPopUp .message-contents").html (remediation);		  	
						$('#remediationPopUp').css("display",'block');
					    //$(".overlay").css("display",'block');
					    $(".overlay").removeClass("hide");
					    $('#remediationPopUp').css('z-index','1000');
					    //$(".overlay").css('z-index','800');  
					  },2000);
				  }
				  /* Checking Remediation availability - Ends */
				
				$('.small-header-wrapper .audio-icon').removeClass('play mute');
				var audioStatus = window.waggleui.model.getUserProfile().globalAudio;
			 	
		        if(audioStatus==='on')
		        	$('.small-header-wrapper .audio-icon').addClass('play');
		        else
		            $('.small-header-wrapper .audio-icon').addClass('mute');
		        
		        var classId =   window.waggleui.model.getCurrentClassObject().classId;
		        
		        var hashVal = getHashParameter('itemId'),	// method defined in lift.js
		        	hashItemId = null, 
		        	hashAssignmentId = null;
		        if (hashVal) {
			        hashVal = hashVal.split(/_assignmentId=/);
			        hashItemId = hashVal[0];	        
			        hashAssignmentId = hashVal[1];			        
		        }
				
				/* Click Next Question Button from AMS - if item return, then execute following code - start  */
				if ($('#app_exercise_container').css("display")=="block"){
					// Push Existing Item down
					$('#app_exercise_container').animate(
							  {
							    top: '150%'
							  },
							  {
							    duration: 750,
							    easing: 'easeInBack',
							    complete: function (){
							    	$('#app_exercise_next').css('display', 'none');
							        $('#app_exercise_check').css('display', 'block');
							        $('#answer_options ul li').removeClass('current');
							        $('#app_exercise_container').css('top', '-100%');
							    } 
							  }
						  );
					
					// Push Next Item from top to middle	  
					  $('#app_exercise_container').delay(800).animate({
					    top: '50%'
					  },
					  {
					    duration: 1000,
					    easing: 'easeOutBack'
					  });
				}				
				/* Click Next Question Button from AMS - if item return, then execute following code - End  */
				
				if( (hashItemId == itemId) && (hashAssignmentId == assignmentId) ){
		        	read_hash('nextQuestionActive'); // method defined in lift.js		        	
		        }else{
		        	window.location.hash ='classid='+classId+'_itemId='+itemId+'_assignmentId='+assignmentId;
		        }
			}
			if (!goalComplete){
				//Analytics - pageview
				/*var analyticsRequestObjectPageView = window.waggleui.view.prepareAnalyticsObjectForPageView ('SDB AMS');
				window.waggleui.services.analyticsServiceTrackPageView(analyticsRequestObjectPageView);*/
			}
	}
	
	
	function checkAssignmentType(itemId, assignmentId){
		var assignmentList = window.waggleui.model.getThisAssignmentList() ? window.waggleui.model.getThisAssignmentList() : [];
		
		for(var assignmentList_counter = 0; assignmentList_counter <  assignmentList.length; assignmentList_counter++){
			if((assignmentList[assignmentList_counter].info.assignmentId == assignmentId) && (assignmentList[assignmentList_counter].info.grading == "hybrid")){
				var itemData = window.waggleui.model.getCompleteAmsItemobject();
				if(itemData.lastItem  && (itemData.lastItem == "true")){
					if(itemData.item && itemData.item.code){
						if(!(itemData.item.code == "open-response")){
							return true
						}
					}else{
						return true;
					}
				}
			}
		}
		
		return false;
		
		
	}
	
	function loadDynamicHTML(options) {
		var mainHTML = document.getElementById('mainWrapper').innerHTML,
			localeBaseModel = null;
		
		window.waggleui.model.setWaggleProperties(options);
		
		//Label
		mainHTML = mainHTML.replace(/{{(.+)}}/g, function (match, group) {	
            return options[group];
        });
		
		// URL
		localeBaseModel = window.waggleui.model.getLocaleBaseModel ();
		mainHTML = mainHTML.replace(/%%([^%]+)%%/g, function (match, group) {	// /%%(.+)%%/g
            return localeBaseModel[group];
        });
		
		document.getElementById('mainWrapper').innerHTML = mainHTML;
		
		var tempAssNotifyURL = $("#assignmentsNotificationAnchor").attr('href');
			tempAssNotifyURL = baseInstructURL+instructDashboardUrl; //'baseInstructURL' variable present in index.html
		$("#assignmentsNotificationAnchor").attr('href',tempAssNotifyURL);
		
		if (redirectVia){
			var tempHelpUrl = $("#sdbHelp").attr('href'),
				findHash = tempHelpUrl.substring(tempHelpUrl.length - 1, tempHelpUrl.length);
			if (findHash == '#'){
				tempHelpUrl = tempHelpUrl.substring(0, tempHelpUrl.length-1);				
			}
			tempHelpUrl = location.href + tempHelpUrl;
			$("#sdbHelp").attr('href',tempHelpUrl);						
		}else{
			$("#sdbHelp").attr('href',localeBaseModel['url.header.faq']);
		}		
		
		/*var reviewPopupHTML = document.getElementById('reviewSkillsPopUp').innerHTML;
		window.waggleui.model.setWaggleProperties(options);
		reviewPopupHTML = reviewPopupHTML.replace(/{{(.+)}}/g, function (match, group) {
            return options[group];
        });
		reviewPopupHTML = reviewPopupHTML.replace(/%%(.+)%%/g, function (match, group) {
            return options[group];
        });
		document.getElementById('reviewSkillsPopUp').innerHTML = reviewPopupHTML;*/
		
		
		/*var assignStatusPopupHTML = document.getElementById('assignmentStatusPopup').innerHTML;
		window.waggleui.model.setWaggleProperties(options);
		assignStatusPopupHTML = assignStatusPopupHTML.replace(/{{(.+)}}/g, function (match, group) {
            return options[group];
        });
		assignStatusPopupHTML = assignStatusPopupHTML.replace(/%%(.+)%%/g, function (match, group) {
            return options[group];
        });
		document.getElementById('assignmentStatusPopup').innerHTML = assignStatusPopupHTML;*/
		
		//Lock PopUp message
		/*var lockToolTip = document.getElementById('lockToolTip').innerHTML;
		window.waggleui.model.setWaggleProperties(options);
		lockToolTip = lockToolTip.replace(/{{(.+)}}/g, function (match, group) {
            return options[group];
        });
		lockToolTip = lockToolTip.replace(/%%(.+)%%/g, function (match, group) {
            return options[group];
        });
		document.getElementById('lockToolTip').innerHTML = lockToolTip;*/
		
		
		$(".hide-before-page-load").removeClass("hide-before-page-load"); // .menu-item-title, #showHideCompleted a, .footer-info, .footer-links
		
		var waggleProperties = window.waggleui.model.getWaggleProperties();
	    
	    $("#sessionTimeOutpopup .session-message-box").html(waggleProperties['label.popup.sessionTimeoutPopup']);
	    $("#openResponseRetrypopup .try-again-session-message-box").html(waggleProperties['label.ams.tryAgain.popUp']);	    
	    $("#knewtonFailurePopup .try-again-session-message-box").html(waggleProperties['label.ams.knewtonFailure.Popup']);
	    $("#classHasNoTeacher .try-again-session-message-box").html(waggleProperties['label.class.noTeacher.Popup']);
	    $("#openResponseLaseItemPopup .response-message-head").html(waggleProperties['label.openResponse.sendToTeacher.popup']);
	    $("#openResponseLaseItemPopup .response-message-box").html(waggleProperties['label.openResponse.waitForGrade.popup']);
	    $("#openResponsepopup .try-again-session-message-box").html(waggleProperties['label.openResponse.gradeToContinue.popUp']);
	    $("#meTitle").attr("title",waggleProperties['label.header.me.title']);
	    //$("#assignmentListingNote").attr("title",waggleProperties['label.assignstatus.teacherNotes.message']);
	    $("#skillsAcquired").attr("title",waggleProperties['label.footer.goalsAcquired.over']);
	    $("#batteryStatus").attr("title",waggleProperties['label.footer.goalsAcquired.battery.over']);
	    $("#flocksEmptyContentJs").html(waggleProperties['label.footer.flocksReleased.noFlockMessage']);
	    
	    //For google Analytics
	    var baseProperties = window.waggleui.model.getLocaleBaseModel();	    
	    //ga('create', gaPublishId, {'cookieDomain': 'none'}); //gaPublishId variable available in index.html
	}
	
	/**
	 * Zero State 
	 */
	function zeroState (currentClassObject){
		
		var collectZeroMarkUp = [],
			classSuggestion = currentClassObject.classSuggestions;
		
		for (i=0; i<classSuggestion.length; i++){
			collectZeroMarkUp.push( _markUpZeroState(classSuggestion[i], "#dynamicNoAssignmentRow" ));
		}
		$("#noAssignmentListWrapper").html(collectZeroMarkUp.join(""));
		
	}
	
	
	/**
	 * Zero State MarkUp - Dynamic Row Generator
	 */
	function _markUpZeroState (zeroStateObject,id){
		var row = null,
			rowData = null;		
		rowData = $(id).html();
		row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {
			switch (group){
			case "classId":
					return (zeroStateObject[group]?zeroStateObject[group]:"no-class-id");
				break;
			case "classViewId":
					return (zeroStateObject[group]?zeroStateObject[group]:"no-class-view-id");
				break;
			case "cleared":
					return (zeroStateObject[group]?zeroStateObject[group]:"no-data-view");
				break;	
			case "label":
					return (zeroStateObject[group]?zeroStateObject[group]:"no text available");
				break;
			}
        });		
		return row;
	}
	

	function setBgLines() {
		console.log('setting Bglines');
		  /*var winHeight = $(window).height()*10,
			  backgroundLines = Math.ceil(winHeight/20);*/
		  var startScaleValue = parseInt($(".feet .score").html())-100,
			  linesIn = '',
			  linesOut = '',
			  currentClassObject = window.waggleui.model.getCurrentClassObject(),
			  totalFeetClouds = 0,
			  score_marker = null,
			  liftScoreDisplay = 0,
			  exactFeetValue = parseInt($('.feet .score').html()),
			  markCurrentScore = 0;
		  
		  for (i=0; i < currentClassObject["feetClouds"].length; i++){
			  totalFeetClouds = totalFeetClouds +  currentClassObject["feetClouds"][i]["value"];
		  }
		  
		  totalFeetClouds = totalFeetClouds + 500;
		  
		  totalFeetClouds = Math.ceil(totalFeetClouds/10);
		  		  
		  for (var i = 1; i<= totalFeetClouds; i++) {
			liftScoreDisplay = liftScoreDisplay+1;
			
			var modValue = startScaleValue%100;
			if(modValue < 0){
				startScaleValue = -100;
			}else{
				startScaleValue = startScaleValue - modValue;
			}	
		    var feets = startScaleValue + 10*i;
		    linesIn = '<span>' + (feets >= 0 ? feets : '&nbsp;')  + '</span><\/li>' + linesIn;
		    linesOut = '<li><\/li>' + linesOut;

		    /*if((startScaleValue + 10*i) == exactFeetValue) {
		      linesIn = '<li class="current">' + linesIn;
		      score_marker = 20*i;
		    }*/
		    
		    if (markCurrentScore == 0){
		    	if (feets == exactFeetValue){
		    		linesIn = '<li class="current">' + linesIn;
				    score_marker = 20*i-25;
				    markCurrentScore = 1;
		    	}else if (feets > exactFeetValue){
		    		linesIn = '<li class="current">' + linesIn;
				    score_marker = 20*i-35;
				    markCurrentScore = 1;
		    	}
		    }		    
		    
		    //else {	    	
	    	if (liftScoreDisplay == 5){
	    		liftScoreDisplay = 0;
	    		linesIn = '<li class="visible">' + linesIn;
	    	}else{
	    		linesIn = '<li class="invisible">' + linesIn;
	    	}
		    	
		    /*if ((startScaleValue + 10*i)%50 == 0) {
		        linesIn = '<li class="visible">' + linesIn;
		      } else {
		        linesIn = '<li class="invisible">' + linesIn;
		      }*/
	    	
		    //}
		    
		  }
		    var  mainOffset = $('#mainWrapper').offset().left;
		     $('#background_lines').html(linesOut);
		     //$('#lift_level').html('<ul id ="lift-lines">' + '</ul>');
			  $('#lift_level').html(linesIn + '<li class="score_marker">' +'</li>');
			  $('.score_marker').append('<span id = "silhouetteAvatar" >'+ parseInt($('.feet .score').html()) + ' </span>');
			  
			  $('#lift_level').css({				
				  'right' : mainOffset + 'px'
			  });
			  var $silhouetteAvatar = $('#silhouetteAvatar');
			  var $scoreMarker = $('.score_marker');
			  var $avatarItemImg = $('.avatar-item-img');
			  $scoreMarker.css('bottom', score_marker+'px');
			  $silhouetteAvatar.commafy();
			  $('#lift_level li span').commafy();
			  $scoreMarker.removeClass('bear-silhouette elephant-silhouette frog-silhouette chicken-silhouette mantis-silhouette cat-silhouette');
			  if($avatarItemImg.hasClass('bear-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('bear-silhouette')};
			  if($avatarItemImg.hasClass('elephant-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('elephant-silhouette')};
			  if($avatarItemImg.hasClass('frog-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('frog-silhouette')};
			  if($avatarItemImg.hasClass('chicken-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('chicken-silhouette')};
			  if($avatarItemImg.hasClass('mantis-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('mantis-silhouette')};
			  if($avatarItemImg.hasClass('cat-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('cat-silhouette')};
			  if($avatarItemImg.hasClass('default-avatar')){$scoreMarker.removeClass('bear-silhouette').addClass('bear-silhouette')};
		}
	
	/**
	 * 
	 */
	function getCompletedAssignmentSkills(responseObj,pager){
		var collectskills =[],
			skillstouplet = [],
			clearedAssignment = responseObj,
			skills 			 = clearedAssignment.skills,
			length = skills.length-(6*(pager-1)),
			position = (pager-1)*6; 
		if(pager===1)
			length = skills.length>=6 ? 6:skills.length;
		else
			length = length>6? 6:length;		
		$('#completedAssignmentListWrapper .complete-assignment-skill-wrapper').remove();
		$('#completeAssignmentTitle .large-header').html(clearedAssignment.assignmentName);
		if(skills.length % 2){
			//odd
			console.log("odd count");
			for(i= 0 ;i<skills.length-1;i++){
				collectskills.push(_markUpCompletedAssignmentSkills(skills[i],"#dynamicCompletedAssignment",clearedAssignment));
			}
			collectskills.push(_markUpCompletedAssignmentSkills(skills[skills.length-1],"#dynamicCompletedAssignmentodd",clearedAssignment));
		}else{
			//even
			console.log("even count");
			for(i= 0 ;i<skills.length;i++){
				collectskills.push(_markUpCompletedAssignmentSkills(skills[i],"#dynamicCompletedAssignment",clearedAssignment));
			}
		}
		for(i=position;i-position<length;i=i+2){
			if(i!=length-1){
				skillstouplet[0] = collectskills[i];
				skillstouplet[1] = collectskills[i+1];
			}else{
				skillstouplet[0] = collectskills[i];
			}
			var html = skillstouplet.join("");
			$('#dynamicskillwrapper .complete-assignment-skill-wrapper').html(html);
			var html2 =  $('#dynamicskillwrapper').html();
			$('#insertion_helper').before(html2);
			//$("#completedAssignmentListWrapper #completeAssignmentTitle").after(html2);
			if(clearedAssignment.hasOwnProperty('grading') && clearedAssignment['grading'] === 'auto'){
				$('.complete-feedback').css('display','none');
			}else{
				if(clearedAssignment.hasOwnProperty('grading') && clearedAssignment['grading'] === 'hidden' ||
						clearedAssignment.hasOwnProperty('grading') && clearedAssignment['grading'] === 'manual')
				$('.complete-feedback').css('display','');
			}
			skillstouplet=[];
		}
		//$('#compltedAssignmentskillWrapper').html(collectskills.join(""));	
	}
	
	/**
	 * 
	 */
	function _markUpCompletedAssignmentSkills(responseObj,id,Obj){
		var row = null,
			rowData = null;
		rowData = $(id).html();
		row = rowData.replace(/@@([^@]+)@@/g, function(match,group){
			switch(group){
			case "name": 
				return (responseObj[group]?responseObj[group]:"no-class-id");
				break;
			case "proficiency": 
				return (responseObj[group]?responseObj[group]:"no-cahints-id");
				break;	
			/*case "feetTraveled": 
				return (responseObj[group]?responseObj[group]:"no-feet-id");
				break;
			case "practiceTime": 
				return (responseObj[group]?responseObj[group]:"no-practice-id");
				break;
			case "answered": 
				return (responseObj[group]?responseObj[group]:"no-answered-id");
				break;
			case "hintsUsed": 
				return (responseObj[group]?responseObj[group]:"no-cahints-id");
				break;
			case "complete-assignment-skill-lists-wrapper-class":
				if(Obj.hasOwnProperty('grading') && Obj['grading'] === 'auto'){
					return 'show';	
				}else{
					return 'hide';
				}
				break;	*/							
			}
		});
		return row;
	}
	
	/**
	 * 
	 */
	function completedAssignmentPagination(responseObj){
		var totalPages =  Math.ceil(responseObj.skills.length/6),
			paginationMarkup = [],
			page;
		
		if (totalPages != 1){
			for (var i=0; i<totalPages;i++){
				page = i+1;
				if (i == 0)
					paginationMarkup.push('<li class="selected">'+ page +'</li>');			
				else
					paginationMarkup.push('<li>'+ page +'</li>');						
			}
			$(".completed-assignmnet-pagination-wrapper ul").html(paginationMarkup.join(""));
		}else{
			$(".completed-assignmnet-pagination-wrapper ul").empty();
		}		
	}
	
	/**
	 * function to display session timeout details for the student.
	 */
	function startTimer(countdownTime) {
	    var index = countdownTime;
	    //show UI for warning users about the impending expiry of their session.
	    var sessionTimeoutpopup = $('#sessionTimeOutpopup'),
	    	overlay = $($(".overlay")[0]);
	    	
	    sessionTimeoutpopup.removeClass("hide").find('.timer').text(index);
	    overlay.removeClass("hide");
	    sessionTimeoutpopup.off('click.timeout').on('click.timeout', function() {
			clearInterval(counter);
            //session has been refreshed.
			overlay.addClass("hide");
            sessionTimeoutpopup.addClass("hide");
            //send a dummy request to server.
            window.waggleui.services.cancelSessionTimeout({'studentId': $('.avatar-name').attr('studentId')});			            
		});
	    counter = setInterval(function() {
	    	//show countdown timers.
	        index -= 1;
	        sessionTimeoutpopup.find('.timer').text(index);
	        if(index === 0) {
	            clearInterval(counter);
	            //session has expired. logout the user.
	            overlay.addClass("hide");
	            sessionTimeoutpopup.addClass("hide");
				console.log('session timed out...');
				window.waggleui.view.getReportActiveTime('SessionTimeOut');
				$('.sign-out').click();
	        }
	    }, 1000);
	}	
	
	function getGameLists (gameListsObject){
		//console.log (gameListsObject);
		window.waggleui.model.setCurrentGameObject (gameListsObject); //Store game object in model
		if ( (gameListsObject.games) && (gameListsObject.games.length > 0) ){
			var gamesList = gameListsObject.games;			
			createGamePagination (gamesList.length);	//Create Game pagination
			markUpGames (gamesList);	//Slice Assignments
		}
	}
	
	function createGamePagination (totalGames){
		$("#gamesPaginationContainer").html('');
		if (totalGames > 1){
			for (var i=0; i<totalGames; i++){
				//var j = i+1;
				if (i==0){
					$("#gamesPaginationContainer").append('<a rel="'+i+'" href="#"	class="games-pagination active"></a>');
				}else{
					$("#gamesPaginationContainer").append('<a rel="'+i+'" href="#"	class="games-pagination"></a>');
				}								
			}
		}else{
			$("#gamesPaginationContainer").html('');
		}
	}
	
	function markUpGames (gamesList){
		var	dueObject = null,
			gameMarkup = null,
			gameMarkupCollection = [],
			waggleProperties = window.waggleui.model.getWaggleProperties();
			
		for (var i=0; i<gamesList.length; i++){
			if (gamesList[i]['dueXdays'])
				dueObject = _setGameDues (parseInt(gamesList[i]['dueXdays']), waggleProperties);
			else
				dueObject = false;	
			gameMarkup = _markupGameFromJson (gamesList[i], dueObject, waggleProperties);
			gameMarkupCollection.push(gameMarkup);
		}
		$("#roundAboutHolder").empty();
		for (i=0; i<gamesList.length; i++){
			$("#roundAboutHolder").append(gameMarkupCollection[i]);			
		}
	}
	
	function _setGameDues (dueDate, waggleProperties){
		var dueObject = {};		
		if(dueDate == 0){	//today
			dueObject.dueClass = 'game-today';
			dueObject.icon = '';
			dueObject.when = waggleProperties['label.dueDate.today'];			
		}else if(dueDate < 0){	//Late
			dueObject.dueClass = 'game-late';
			dueObject.icon = '';
			dueObject.when = waggleProperties['label.dueDate.late'];
		}else if(dueDate == 1){	//Upcoming - Single
			dueObject.dueClass = 'game-days-left';
			dueObject.icon = dueDate;
			dueObject.when = waggleProperties['label.game.dueDate.dayLeft'];
		}else{	//Upcoming - Many
			dueObject.dueClass = 'game-days-left';
			dueObject.icon = dueDate;
			dueObject.when = waggleProperties['label.game.dueDate.daysLeft'];
		}		
		return dueObject;
	}
	function numberWithCommas(x) {
	    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
	
	function _markupGameFromJson (gameObject, dueObject, waggleProperties){
		var row = null,
			rowData = $('#dynamicGameGenerator').html();
		
		row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {
			switch (group){
				case "display-theme":
					var displayTheme = gameObject["displayTheme"].toLowerCase();
					if (displayTheme){
						return displayTheme;
					}else{
						return "red";
					}
				break;
				/*case "game-theme-image":
					if(gameObject.hasOwnProperty('gameImage') && !$.isEmptyObject(gameObject["gameImage"])){
						return gameObject["themeImage"];
			    	}else{
			    		return "";
			    	}
					break;*/
				case "game-image":
					if(gameObject.hasOwnProperty('themeImage') && !$.isEmptyObject(gameObject["themeImage"])){
						return '<img alt="Games" src="'+gameObject["gameImage"]+'" />';
			    	}else{
			    		return "";
			    	}
					break;	
			    case "best-score-visivility-class" :
			    	if(gameObject.hasOwnProperty('bestScore') && !$.isEmptyObject(gameObject["bestScore"])){
			    		return "show";
			    	}else{
			    		return "hide";
			    	}
			    	break;
				case "best-score-level":
					if (gameObject.hasOwnProperty('bestScore') && !$.isEmptyObject(gameObject["bestScore"]) && gameObject["bestScore"]["level"]){
						return "LEVEL "+gameObject["bestScore"]["level"];
					}else{
						return "";
					}
				break;
				case "best-score-earned":
					if (gameObject.hasOwnProperty('bestScore') && !$.isEmptyObject(gameObject["bestScore"]) && gameObject["bestScore"]["score"]){
						return numberWithCommas(gameObject["bestScore"]["score"]);
					}else{
						return "";
					}
				break;
				case "best-score-star":
					if ((gameObject.hasOwnProperty('bestScore') && !$.isEmptyObject(gameObject["bestScore"]) && gameObject["bestScore"]["rating"]) && (gameObject["bestScore"]["rating"] < 5) ){
						var rating = gameObject["bestScore"]["rating"];						
						if (rating <= 0){
							return '<span class="game-score-stars no-score"></span><span class="game-score-stars no-score"></span><span class="game-score-stars no-score"></span><span class="game-score-stars no-score"></span>';
						}else if (rating == 1){
							return '<span class="game-score-stars"></span><span class="game-score-stars no-score"></span><span class="game-score-stars no-score"></span><span class="game-score-stars no-score"></span>';
						}else if (rating == 2){
							return '<span class="game-score-stars"></span><span class="game-score-stars"></span><span class="game-score-stars no-score"></span><span class="game-score-stars no-score"></span>';	
						}else if (rating == 3){
							return '<span class="game-score-stars"></span><span class="game-score-stars"></span><span class="game-score-stars"></span><span class="game-score-stars no-score"></span>';
						}else if (rating >= 4){
							return '<span class="game-score-stars"></span><span class="game-score-stars"></span><span class="game-score-stars"></span><span class="game-score-stars"></span>';
						}
					}else{
						return "";
					}
				break;
				case "game-title":
					if (gameObject["title"]){
						return gameObject["title"];
					}
				break;
				case "number-or-unlimitedicon-class":
					if (gameObject["playsLeft"]){
						var playsLeft = gameObject["playsLeft"];
						if (playsLeft < 0){	//Unlimited Plays
							return "infinity";
						}else if (playsLeft == 0){	//Do not show play button
							return "";
						}else if (playsLeft > 0){	//x number of plays
							return "";
						}						
					}
				break;
				case "number-or-unlimitedicon":
					if (gameObject["playsLeft"]){
						var playsLeft = gameObject["playsLeft"];
						if (playsLeft < 0){	//Unlimited Plays
							return "";
						}else if (playsLeft == 0){	//Do not show play button
							return playsLeft;
						}else if (playsLeft > 0){	//x number of plays
							return playsLeft;
						}						
					}
				break;
				case "plays-left-or-unlimited-class":
					if (gameObject["playsLeft"]){
						var playsLeft = gameObject["playsLeft"];
						if (playsLeft < 0){	//Unlimited Plays
							return ""; //medium-size-text
						}else if (playsLeft == 0){	//Do not show play button
							return "";
						}else if (playsLeft > 0){	//x number of plays
							return "";
						}						
					}
				break;
				case "plays-left-or-unlimited":
					if (gameObject["playsLeft"]){
						var playsLeft = gameObject["playsLeft"];
						if (playsLeft < 0){	//Unlimited Plays
							return waggleProperties['label.game.playsText'];
						}else if (playsLeft == 0){	//Do not show play button
							return waggleProperties['label.game.playsLeftThisWeek'];
						}else if (playsLeft > 0){	//x number of plays
							return waggleProperties['label.game.playsLeftThisWeek'];
						}
					}
				break;
				case "game-due-status-class":
					if (gameObject["isAssigned"]){
						if (gameObject["isAssigned"] == 'off'){
							return 'hide-game-block';
						}
					}
					if (gameObject["status"]){
						if (gameObject["status"] == 'completed'){
							return 'plays-complete';
						}
					}
					if (gameObject["locked"]){
						if (gameObject["locked"] == 'on'){
							return 'game-start-yet';
						}else{
							if (dueObject)
								return dueObject["dueClass"];
							else
								return '';
						}						
					}
				break;
				case "game-due-status-number":					
					if (gameObject["status"]){
						if (gameObject["status"] == 'completed'){
							return '';
						}
					}else{
						return '';
					}
					if (gameObject["locked"]){
						if (gameObject["locked"] == 'on'){
							return '';
						}else{
							if (dueObject)
								return dueObject["icon"];
							else
								return '';
						}
					}else{
						return '';
					}
				break;
				case "game-due-status-text":					
					if (gameObject["status"]){
						if (gameObject["status"] == 'completed'){
							return 'COMPLETE!';
						}
					}else{
						return '';
					}
					if (gameObject["locked"]){
						if (gameObject["locked"] == 'on'){
							return waggleProperties['label.game.cannotStartYet']; //'CAN NOT START YET';
						}else{
							if (dueObject)
								return dueObject["when"];
							else
								return '';
						}						
					}else{
						return '';
					}
				break;				
				case "banner-visibility-class" :
					if( (gameObject.hasOwnProperty('mostRecent') && !$.isEmptyObject(gameObject["mostRecent"])) || (gameObject.hasOwnProperty('highestLevelPlayed') && !$.isEmptyObject(gameObject["highestLevelPlayed"]))  ){
						return "show";
					}else{
						return "hide";
					}
				break;
				case "most-recent-level":
					 if(gameObject.hasOwnProperty('mostRecent') && !$.isEmptyObject(gameObject["mostRecent"])&& gameObject["mostRecent"]["level"]){
						 return "LEVEL " + gameObject["mostRecent"]["level"];
					 }else{
						 return "";
					 }
			   break;
				case "most-recent-level-score":
					if(gameObject.hasOwnProperty('mostRecent') && !$.isEmptyObject(gameObject["mostRecent"])&& gameObject["mostRecent"]["score"]){
						 return numberWithCommas(gameObject["mostRecent"]["score"]);
					 }else{
						 return "";
					 }
			   break;
				case "highest-level-played":
					if(gameObject.hasOwnProperty('highestLevelPlayed') && !$.isEmptyObject(gameObject["highestLevelPlayed"])&& gameObject["highestLevelPlayed"]["level"]){
						 return "LEVEL " + gameObject["highestLevelPlayed"]["level"];
					 }else{
						 return "";
					 }
			   break;
				case "highest-level-played-score":
					if(gameObject.hasOwnProperty('highestLevelPlayed') && !$.isEmptyObject(gameObject["highestLevelPlayed"])&& gameObject["highestLevelPlayed"]["score"]){
						 return numberWithCommas(gameObject["highestLevelPlayed"]["score"]);
					 }else{
						 return "";
					 }
			   break;			   
				case "play-status-visibility-class" :
					if (gameObject["locked"] && gameObject["playsLeft"]){
						if( (gameObject["locked"] == 'off') && (gameObject["playsLeft"] != 0) ){
							return "plays-continue";
						}else{
							return "hide";
						}
					}else
						return '';
				break;
				case "play-status-value" :
					if(gameObject.hasOwnProperty('mostRecent') && gameObject.hasOwnProperty('highestLevelPlayed') && gameObject.hasOwnProperty('bestScore')){
						return  waggleProperties['label.game.continueButton'];
					}else{
						return waggleProperties['label.game.playButton'];
					}
			   break;
				case "minimum-play-count" :
					if(gameObject.hasOwnProperty('minPlayCount') && gameObject["minPlayCount"]){
						var countString = gameObject["minPlayCount"] == 1 ? gameObject["minPlayCount"]+" "+waggleProperties['label.game.time'] : gameObject["minPlayCount"]+" "+waggleProperties['label.game.times'];
						return countString;
					}
					break;
				case "finish-assignment-visibility-class" :
					if(gameObject.hasOwnProperty('isAssigned') && gameObject['isAssigned'] === 'on'){
						return "show";
					}else{
						return "hide";
					}
					break;
				case "gameId" :
					if(gameObject.hasOwnProperty('goalId')){
						return gameObject['goalId'];
					}
			}
		});
		return row;
	}
	
	
	/*
	 * Cloud Controller - Start
	 * */
	function cloudyMessageBuilder(value) {
        //build the html
    	separateCloudMsgGroups();
        updatepropMessageCounter();
        showIfSystemMsgAvailable(value);
    }
    	
    function separateCloudMsgGroups() {
        var rowMarkupCollection = [],
            rowMarkupCollection1 = [],
            rowMarkup1 = null,
            rowMarkup = null;
        var cloudMessages = window.waggleui.model.getMessageClouds();
        for (x in cloudMessages) {
            if (cloudMessages[x]['messageGroup'] == 'system') {
                rowMarkup1 = _cloudyMessageBuilderli(cloudMessages[x], $('#propmessagecontainer'));
                rowMarkupCollection1.push(rowMarkup1);                
            } else if(cloudMessages[x]['messageGroup'] == 'class') {
                rowMarkup = _cloudyMessageBuilderli(cloudMessages[x], $('#systemmessagecontainer'));
                rowMarkupCollection.push(rowMarkup);
            }
        }
        $("#propmessagecontainer").html(rowMarkupCollection.join(""));
        $("#systemmessagecontainer").html(rowMarkupCollection1.join(""));
        
        
        function _cloudyMessageBuilderli(cloudyMessages,htmlContainer) {
            var row;
            rowData = '<li data-message-id="@@message-id@@" data-cloudy-state="@@cloudy-state@@">@@message@@</li>';
            row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {
                switch (group) {
                case "message":
                    return cloudyMessages.message;
                    break;
                case "cloudy-state":
                    return cloudyMessages.type;
                    break;
                case "message-id":
                    return cloudyMessages.messageId;
                    break;
                }
            });
            return row;
        }
        
    }	            

    function updatepropMessageCounter() {
		if ($("#slider-code").find('li').size()) {
			$(" .cloud .display-count").html($("#slider-code").find('li').size());
		} else {
			$(" .cloud .display-count").addClass('hide');
		}           
    }
    
    function clearReadMessageFromModel(readMessageIdList){
    	if(readMessageIdList.length > 0){
    		var cloudMessages = window.waggleui.model.getMessageClouds();
        	for(var i = 0; i < cloudMessages.length; i++) {
        	    var obj = cloudMessages[i];
        	    if(readMessageIdList.indexOf(obj.messageId) !== -1) {
        	    	cloudMessages.splice(i, 1);
        	        i--;
        	    }
        	}
        	window.waggleui.model.setMessageClouds(cloudMessages);
    	}
    }
    
	function showIfSystemMsgAvailable(close){
	$('#slider-code1').addClass('hide');
	$('#slider-code').addClass('hide');
	$("#cloudyMessageWrapper").removeAttr("style");
		if ($("#systemmessagecontainer").find('li').length) {
			$(" .cloud .display-count").addClass('hide');
			$(".cloud").css('display','block');
			$(".cloud").trigger('click',[close]);
		} else if($("#propmessagecontainer").find('li').length) {
			$(" .cloud .display-count").removeClass('hide');
			$(".cloud").removeClass("cloud-calm-off cloud-urgency-off cloud-excited-off").addClass('cloud-calm-off');
		}else{
			$(".cloud").removeClass("cloud-calm-off cloud-urgency-off cloud-excited-off").addClass('cloud-calm-off');
		}
	}
	
	/* Cloud Controller - End */
	
	function updateCloudyAndFeetsInfo (response){
		if (response.messageClouds){
			var currentClassObject = window.waggleui.model.getCurrentClassObject();
						
			currentClassObject.messageClouds = response.messageClouds;
			window.waggleui.model.setCurrentClassObject(currentClassObject);
			
			window.waggleui.model.setMessageClouds(response.messageClouds);
		}
		//update feet
		if (response.feetClouds){
			var currentClassObject = window.waggleui.model.getCurrentClassObject();
			currentClassObject.feetClouds = response.feetClouds;
			window.waggleui.model.setCurrentClassObject(currentClassObject);
			
			var feetCloudLength = response.feetClouds.length,
		    $feetCloudOff = $('.feet-cloud-off'),
		    $feetCloudDisplayCount = $('.feet-cloud-off .display-count'),
		    $feetCloudFeetDistance = $('.feet-cloud-off .feet-distance');
			
			if(feetCloudLength === 0){
				$feetCloudOff.css({display : 'none'});
				$feetCloudDisplayCount.html(feetCloudLength);
				$("#flockCloudyOff").css({"right":"125px", "top":"140px"});
			}else{
				var feetLeft = response.feetClouds[0]['value'],
				studentFeetCloudId = response.feetClouds[0]['studentFeetCloudId'];
				$feetCloudOff.css({
					display : 'block',
					right   : '125px'
				});
				$feetCloudDisplayCount.html(feetCloudLength); 
				$feetCloudFeetDistance.html('+' + feetLeft);
				$feetCloudFeetDistance.attr("studentfeetcloudid",studentFeetCloudId);
				if(feetLeft> 99){
					$feetCloudFeetDistance.addClass('more-digits');			
				}
			}
		}
	}
	
	function loadBadQuestionOptions (response){
		if (response.problemOptions){
			window.waggleui.model.setBadQuestionOptions(response);
			$("#badQuestionReasons, #chooseBadQuestionOptions ul").html("");
			$("#chooseBadQuestionOptions a.current").text("Choose One");
			var options = response.problemOptions,
				collectOptions = [];
				collectLis = [];				
			//collectLis.push('<li data-badrequestid="" class="selected">Choose One</li>');
			for (var i=0; i<options.length; i++){
				collectOptions.push('<option data-optionid="'+options[i].id+'">' + options[i].value + '</option>');
				collectLis.push('<li data-badrequestid="'+options[i].id+'">'+ options[i].value +'</li>');
			}
			$("#badQuestionReasons").html(collectOptions.join(""));
			$("#chooseBadQuestionOptions ul").html(collectLis.join(""));			
			$("#reportBadQuestionModalOverlay, #reportBadQuestionModal").toggleClass('hide');
		}
	}
	
	function reportBadQuestionResponse (response){
		if ( (response.status) && (response.status == "WG200") ){
			$("#reportBadQuestionModalOverlay, #reportBadQuestionModal").toggleClass('hide');
			$('.goback-submit').trigger('click.onsubmit');
			$("#growlMessageWrapper .growl-message-right").html(response.message);
	    	$("#growlMessageWrapper").fadeIn("900").delay(3000).fadeOut(900, function(){
	    		$("#growlMessageWrapper .growl-message-right").html('');	
	    	});
	    	$(".transparentOverlay").fadeIn("900",function(){
	    		$(this).css('display','block');
	    	}).delay('3000').fadeOut('900',function(){
	    		$(this).css('display','none');
	    	});
		}
	}
	
	return {
		getInitData: getInitData,
		getAssignmentLists: getAssignmentLists,
		loadDynamicHTML: loadDynamicHTML,
		getAssignmentListByPagination: getAssignmentListByPagination,		
		getAssignmentItem: getAssignmentItem,
		getCompletedAssignmentSkills:getCompletedAssignmentSkills,		
		/*getCompletedAssignmentSkills:getCompletedAssignmentSkills,*/
		setBgLines: setBgLines,
		clickAndClearCompletedAssignment: clickAndClearCompletedAssignment,
		getClearedAssignmentLists: getClearedAssignmentLists,
		getUnClearedAssignmentLists: getUnClearedAssignmentLists,
		completedAssignmentPagination:completedAssignmentPagination,
		zeroState: zeroState,
		startTimer: startTimer,
		getGameLists: getGameLists,
		numberWithCommas : numberWithCommas,
		cloudyMessageBuilder: cloudyMessageBuilder,
		updatepropMessageCounter: updatepropMessageCounter,
		showIfSystemMsgAvailable: showIfSystemMsgAvailable,
		clearReadMessageFromModel : clearReadMessageFromModel,
		updateCloudyAndFeetsInfo : updateCloudyAndFeetsInfo,
		loadBadQuestionOptions: loadBadQuestionOptions,
		reportBadQuestionResponse: reportBadQuestionResponse
	}
	
}());