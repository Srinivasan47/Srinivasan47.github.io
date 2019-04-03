window.waggleui.skillMeterController = (function(){
	
	/**
	 * 
	 * @returns
	 */
	function renderAssignmentSkillMeter (skillmeterobject){
		var collectSkills = [],
			waggleProperties = window.waggleui.model.getWaggleProperties();
		
		$("#assignmentStatusPopup .header-show").html(waggleProperties['label.assignstatus.skills']+'<a href="javascript:;" title="'+waggleProperties['label.assignstatus.skillsHelpIcon.title']+'" class="help-icon"></a>');
		skillmeterobject = skillmeterobject.skills;
		for (i=0; i<skillmeterobject.length; i++){
			collectSkills.push( _markUpSkillMeter(skillmeterobject[i], "#dynamicSkillMeterRowGeneratorAssignment" ));		
		}
		$("#skillListItem").html(collectSkills.join(""));
		fleXenv.fleXcrollMain("assignmentSkillScrollBar");
		if(document.getElementById("assignmentSkillScrollBar").fleXcroll) {
			document.getElementById("assignmentSkillScrollBar").fleXcroll.setScrollPos(false,0);
		}
	}
	
	/**
	 * Assignment List contians Games too, when we click skillmeter circle for games, we render it.
	 */
	function renderGamesLevelListing (gamesLevelListingObject){
		var collectLevels = [],
			waggleProperties = window.waggleui.model.getWaggleProperties();
		
		$("#assignmentStatusPopup .header-show").html(waggleProperties['label.assignstatus.level']+'<a href="javascript:;" title="'+waggleProperties['label.assignstatus.levelHelpIcon.title']+'" class="help-icon"></a>');
		gamesLevelListingObject = gamesLevelListingObject.levels;
		for (i=0; i<gamesLevelListingObject.length; i++){
			collectLevels.push( _markUpSkillMeter(gamesLevelListingObject[i], "#dynamicSkillMeterRowGeneratorGame" ));		
		}
		$("#skillListItem").html(collectLevels.join(""));
		fleXenv.fleXcrollMain("assignmentSkillScrollBar");
		if(document.getElementById("assignmentSkillScrollBar").fleXcroll) {
			document.getElementById("assignmentSkillScrollBar").fleXcroll.setScrollPos(false,0);
		}
	}
	
	function renderSubjectSkills (skillmeterobject){
		var collectSkills = [],
			$skillsDropup = $('.skills-dropup'),		
			skillmeterobject = skillmeterobject.goals;
		
		if (skillmeterobject.length == "0"){
			$skillsDropup.find('.footer-flexcroll').css({display:"none"});
			$skillsDropup.find('.empty-table-cell').css({display:"table"});
		}
		else{
			for (i=0; i<skillmeterobject.length; i++){
				collectSkills.push(_markUpSkillMeter(skillmeterobject[i], "#dynamicFooterSkillMeter" ));
			}
		$("#footerAssignmentSkills").html(collectSkills.join(""));
		$skillsDropup.find('.empty-table-cell').css({display:"none"});

		$skillsDropup.find('.footer-flexcroll').css({display:"block"});
		
		fleXenv.fleXcrollMain("footerScrollBar");
		if(document.getElementById("footerScrollBar").fleXcroll) {
			document.getElementById("footerScrollBar").fleXcroll.setScrollPos(false,0);
		}
		
		//window.onfleXcrollRun=function(){}		
				
		//fleXenv.updateScrollBars();
		
		}
	}
	
	
	function skillReview (gamesObject){		
		var collectGames = [];
		$("#reviewSkillsPopUp").find('.review-contents').html(gamesObject.reviewDescription);
		gamesObject = gamesObject.morePractice;
		for (i=0; i<gamesObject.length; i++){
			collectGames.push(_markUpSkillMeter(gamesObject[i], "#reviewPopUp" ));
		}
		$("#skillPopUpImages").html(collectGames.join(""));
		//$('#skillPopUpImages').css("left":"0px");
		var gamesUl = $('.slider-container').find('ul');
		if (gamesObject.length == "1"){
			gamesUl.css("margin-left","130px");
		}
		else{ if (gamesObject.length == "2"){
			gamesUl.css("margin-left","60px");
		}
		}
		$('.practice-name').find('a').each(function(){
			var orig = $(this);			
			var text = orig.html();
			var neW = $(this.cloneNode(true)).hide().css('overflow','visible').height('auto');
			orig.after(neW);

			while (text.length > 30)
			{
			        text = text.substr(0, 28);
			        neW.html(text + "...");
			}

			orig.html(neW.html());
			neW.remove();
			
			});
		$('#slider2').tinycarousel({
				intervaltime:100,
            	duration:10
		});
	}
	
	/**
	 * Skillmeter lists
	 */
	function _markUpSkillMeter (skillObject,id){
		var row,
			waggleProperties = window.waggleui.model.getWaggleProperties();
		
		rowData = $(id).html();
		row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {			
			switch (group){
			case "name":
					return (skillObject[group]?skillObject[group]:"Skill Name");
				break;
			case "proficiency":
					return (skillObject[group]? "skill-battery "+skillObject[group]:"skill-battery-disabled");
				break;
			case "goalId":
				return (skillObject[group]?skillObject[group]:"");
			break;
			case "assignmentId":
				return (skillObject[group]?skillObject[group]:"");
			break;
			case "level":
				return (skillObject[group]?skillObject[group]:"");
			break;
			case "levelTitle":
				return (skillObject[group]?skillObject[group]:"");
			break;
			case "status":
				return (skillObject[group]? "game-levels "+skillObject[group]:"skill-battery-disabled");
			break;
			case "gameLevelIconTitle":
				if (skillObject["status"] == 'locked'){
					return (waggleProperties['label.assignstatus.closedLock']);
				}else if (skillObject["status"] == 'open'){
					return (waggleProperties['label.assignstatus.openedLock']);
				}else if (skillObject["status"] == 'completed'){
					return (waggleProperties['label.assignstatus.filledCircle']);
				}else if (skillObject["status"] == 'inprogress'){
					return (waggleProperties['label.assignstatus.openCircle']);
				}				
			break;
			
			/*case "disable":
				return (skillObject["proficiency"]? '':"disable");
			break*/			
			
			
			/*case "gameTitle":
				return (skillObject[group]?skillObject[group]:"Game Title");
			break;
			case "gameThumbNail":				
				return (skillObject[group]?'<img src="images/pracitice-sliders/'+skillObject[group]+'.jpg" />':"");
			break;*/
			
			}
        });		
		return row;
	}
	
	
	
	/*flocks released controller*/
	
	function renderFlocksReleased (flocksobject) {
		var flocksobject = flocksobject.flocksReleased,
			$flocksWrapper = $('.flocks-wrapper'),
			flocksObjectItem = $('.flocks-items-number').find('.digits'),
			flockItems = $('.flocks-items');
		
		if ((flocksobject.golden === "0")&&(flocksobject.large === "0")&&(flocksobject.medium === "0")&&(flocksobject.small === "0")){
			$flocksWrapper.find('.flocks-dropup-wrapper').css({display:"none"});
			$flocksWrapper.find('.flocks-empty-wrapper').css({display:"table"});
		}
		else{
			$flocksWrapper.find('.flocks-empty-wrapper').css({display:"none"});
			$flocksWrapper.find('.flocks-dropup-wrapper').css({display:"block"});
			
			if (flocksobject.golden === "0") {
				$(flockItems[0]).css({display:"none"});
			}else{
				$(flockItems[0]).css({display:"block"});
			}
			if (flocksobject.large === "0") {
				$(flockItems[1]).css({display:"none"});
			}else{
				$(flockItems[1]).css({display:"block"});
			}
			if (flocksobject.medium === "0") {
				$(flockItems[2]).css({display:"none"});
			}else{
				$(flockItems[2]).css({display:"block"});
			}
			if (flocksobject.small === "0") {
				$(flockItems[3]).css({display:"none"});
			}else{
				$(flockItems[3]).css({display:"block"});
			}
			
			var $flockReleased = $('#flocksReleased');
			
			if($flockReleased.hasClass("checked") && $($('.digits','.flocks-items')[0]).text() !== ""){
				console.log("trigger not click");
				$flockReleased.removeClass("checked");
				timeoutID = setTimeout(function(){
					$(flocksObjectItem[0]).html(flocksobject.golden);
					$(flocksObjectItem[1]).html(flocksobject.large);
					$(flocksObjectItem[2]).html(flocksobject.medium);
					$(flocksObjectItem[3]).html(flocksobject.small);	
					
				},1100);
			}else{
				console.log("click not trigger or first time rendering.");
                $(flocksObjectItem[0]).html(flocksobject.golden);
				$(flocksObjectItem[1]).html(flocksobject.large );
				$(flocksObjectItem[2]).html(flocksobject.medium);
				$(flocksObjectItem[3]).html(flocksobject.small);	
				
	    	}
			for (i=0; i<flocksObjectItem.length; i++){
				var number = parseInt($(flocksObjectItem[i]).html());
				if( number > 99){
					//$(flocksObjectItem[i]).css('font-size','3em');
					$(flocksObjectItem[i]).addClass('more-digits');
				}else{
					$(flocksObjectItem[i]).removeClass('more-digits');
				}
			}
	   }
	}
	function renderUpdatedFlocksReleased(updatedflocksobject) {
		var $flockCloudy = $('.flock-cloud-off'),
			$flockCloudyCount = $flockCloudy.find('.display-count'),
			$flockReleasedCount = $('#flocksReleased').find('.score'),
			flockCloudsLength = null,
			studentFlockCloudId = null,
			currentFlocksReleased = null;
		
		if (updatedflocksobject.status == 'WG201'){
			
			//Analytics
	        /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.assignments.flockCloud');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
			
			var currentClassObject = null;
			
			currentClassObject = window.waggleui.model.getCurrentClassObject();
			
			currentFlocksReleased =  parseInt(currentClassObject.rewards.flocksReleased) + 1;
			currentClassObject.flockClouds.shift();
			flockCloudsLength = currentClassObject.flockClouds.length;
			if (flockCloudsLength != 0){
				studentFlockCloudId = currentClassObject.flockClouds[0]['studentFlockCloudId'];
			}
			//set updated currentClassObject info
			currentClassObject.rewards.flocksReleased = currentFlocksReleased;			
			window.waggleui.model.setCurrentClassObject(currentClassObject);
			
		}else if( (updatedflocksobject.flocksReleased) && (updatedflocksobject.flockClouds) ){
			flockCloudsLength = updatedflocksobject.flockClouds.length;
			studentFlockCloudId = updatedflocksobject.flockClouds[0]['studentFlockCloudId'];
			currentFlocksReleased =	updatedflocksobject.flocksReleased;
		}else{
			console.log ("Data Object is Empty or Contains Insufficient Data");
			flockCloudyAnimation = false;
			return false;
		}
		
		if (flockCloudsLength === 0) {
			//$flockCloudy.css({display:"none"});
			$flockCloudy.fadeOut(function (){
				flockCloudyAnimation = false;
			});
			$flockCloudyCount.html(flockCloudsLength);
			$flockCloudyCount.attr("studentflockcloudid",studentFlockCloudId);
		}else{
			$flockCloudy.fadeOut(function(){				
				$flockCloudyCount.html(flockCloudsLength);
				$flockCloudyCount.attr("studentflockcloudid",studentFlockCloudId);
			}).fadeIn(function (){
				flockCloudyAnimation = false;				
			});
		}
		$flockReleasedCount.html(currentFlocksReleased);
		 
		setTimeout(function(){
			//onClick of Flock Cloudy, we need to temporarily disable the click of "flocksReleased" bottom middle tab, now we are enable this back again
			$("#flocksReleased").addClass('flocks');			
			$("#flocksReleased").trigger('click');
			},800
		);
		
		setTimeout(function(){
			if (!$("#windowOverlay").hasClass("hide")){
				$("#windowOverlay").trigger('click');
			}
			},3000);
	}
		
	return {
		renderAssignmentSkillMeter : renderAssignmentSkillMeter,
		renderGamesLevelListing: renderGamesLevelListing,
		renderSubjectSkills: renderSubjectSkills,
		renderFlocksReleased: renderFlocksReleased,
		renderUpdatedFlocksReleased: renderUpdatedFlocksReleased,
		skillReview: skillReview
	} 
	
}());

