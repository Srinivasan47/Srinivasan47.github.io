window.waggleui.animation = (function () {
	
    /**
	 *	Easing Assignment In
	 *	@param 1 - assignmentType will tell us "assignment list" or "zero state assignment" 
	 */
    function assignmentEasingIn (assignmentType){
    	console.log ("@-Easing AssignmentIn " + assignmentType);			
		if (assignmentType){
			if (assignmentType == "assignmentList"){
				$("#noAssignmentListWrapper, #showHideCompleted, .app-modules-pager").css({"display":"none"});
				$("#assignmentListCarousel").css({"display":"block"});								
			}else if (assignmentType == "zeroState"){
				$("#assignmentListCarousel").css({"display":"none"});	//, #showHideCompleted, .app-modules-pager
				$("#noAssignmentListWrapper").css({"display":"block"});
			}
		}
		$('.main-container').delay(1500).removeClass('remove-dotted-bg');
		$('#lift_level,.score_marker').delay(750).animate({opacity: '1'}, 500);
		$("#assignmentWrapper").css({"display":"block", "left":"-180%", "position":"relative"});
		$("#assignmentWrapper").delay(500).animate(
			{
				left: '0%'
			},
			{
				duration: 900,
				easing: 'easeOutBack',
				complete: function (){
					if (assignmentType == "assignmentList"){
						$(".app-modules-pager").fadeIn("slow");
						$("#showHideCompleted").css({"display":"inline-block"});
					}else if (assignmentType == "zeroState"){}
				}
			}
		);		
    } //Easing Assignment In - Ends
    
    
    /**
	 *	Easing Assignment Out
	 *	@param 1 - assignmentType will tell us "assignment list" or "zero state assignment" 
	 */
    function assignmentEasingOut (callBack){
    	console.log ("@-Easing AssignmentOut " + callBack);
    	var $assignmentWrapper = $("#assignmentWrapper");
    	$('body').addClass('no-touch');
    	
		$("#showHideCompleted, .app-modules-pager").fadeOut(500, function(){});		
		
		$assignmentWrapper.delay(350).animate({left: '-180%'},
				{
					duration: 1000,
					easing: 'easeInBack',
					complete: function (){
						if (callBack){
							if (callBack == "gameEasingIn"){								
								gameEasingIn ();
							}else if(callBack == "completedAssignmentEasingIn"){
								completedAssignmentEasingIn("rightToLeft");
							} 							
						}
						$("#assignmentWrapper").css({"display":"none"});	//
					}
				}
		);
    }
    
    /**
     * 
     */
    function individualAssignmentEasingOut (individualAssignment,callBack){
    	console.log ("@-Easing Individual AssignmentOut");
    	var $assignmentWrapper = $("#assignmentWrapper");
		
		//individual assignment
		/*if (individualAssignment){
			individualAssignment.parent().removeClass("indiviAssignOut");
			individualAssignment.parent().addClass("indiviAssignOut");
		}*/
    	
    	individualAssignment.parent().animate({left: '-180%'},
				{
					duration: 3000,
					easing: 'swing',
					complete: function (){
					   $(this).css('left', '0%');
					}
				}
		);
    	
		
		$('body').addClass('no-touch');		
		
		$("#showHideCompleted, .app-modules-pager").fadeOut(500, function(){});		
		
		/*individualAssignment.parent().animate({left: '-2000px'},{duration: 1000,easing: 'linear',complete: function (){}});*/
		$assignmentWrapper.delay(1200).animate({left: '-180%'},
				{
					duration: 500,
					easing: 'linear',
					complete: function (){
						//individualAssignment.parent().removeClass("indiviAssignOut");
						$("#assignmentWrapper").css({"display":"none"});	//
						if (callBack){
							if (callBack == 'completedAssignmentEasingIn'){
								completedAssignmentEasingIn("rightToLeft");
							}
						}
						
					}
				}
		);
		
		// fallback for ie9 browsers
		/*if(window.iefallbackflag){
			if (individualAssignment){
				 ieclickanimations(individualAssignment);
			 }else{
				 $assignmentWrapper.delay(800).animate({left: '-180%'}, 800, function () {});
			 }
		}*/
    }
    
    /**
     * 
     */
    function cloudEasingIn (){
    	console.log ("@-Easing CloudsIn");
    	
    	var getFeetCount = parseInt($("#feetCloudyOff .display-count").text()),
			getFlockCount = parseInt($("#flockCloudyOff .display-count").text());
	
		if ( (getFeetCount == 0) || (getFeetCount == '') ){
			if ( (getFlockCount != 0) || (getFlockCount != '') ){
				$('.flock-cloud-off').css({'display':'block','right':'125px','top':'140px'});
			}
		}else{
			$('.feet-cloud-off').css({'right':'125px'});
			if ( (getFlockCount != 0) || (getFlockCount != '') ){
				$('.flock-cloud-off').css({'display':'block','right':'45px','top':'235px'});
			}
		}
		
		if ( (getFlockCount === 0) || (getFlockCount == '') ) {
			$('.flock-cloud-off').css('display','none')
		}
    	
    	$('#cloudContainer').css({"display":"block", "right":"-180%", "position":"relative"});
    	//css('display','block').animate({right:'55px'},{duration:1000, easing:'easeOutBack'});
    	$("#cloudContainer").delay(500).animate(
				{
					right: '0%'
				},
				{
					duration: 900,
					easing: 'easeOutBack',
					complete: function (){}
				}
			);
    }
    
    /**
     * 
     */
    function cloudEasingOut (){
    	console.log ("@-Easing CloudsOut");
    	$('#cloudContainer').css({"display":"block", "right":"0%", "position":"relative"});    	
    	$("#cloudContainer").animate({right: '-180%'},
				{
					duration: 1100,
					easing: 'easeInBack',
					complete: function (){
						$('#cloudContainer').css({"display":"none"}); // 
					}
				}
			);
    }
    
    /**
     * 
     */
    function gameEasingIn (){
    	console.log ("@-Game EasingIn");
    	
    	$('.main-container').delay(1500).removeClass('remove-dotted-bg');
    	$('#lift_level,.score_marker').delay(750).animate({opacity: '1'}, 500);
    	$("#gamesWrapper").css({"display":"block", "left":"-180%", "position":"relative"});
		$("#gamesWrapper").delay(500).animate(
			{
				left: '0%'
			},
			{
				duration: 900,
				easing: 'easeOutBack',
				complete: function (){}
			}
		);
    }
    
    /**
     * 
     */
    function gameEasingOut (callBack){
    	console.log ("@-Game EasingOut "+callBack);
    	
    	$("#gamesWrapper").css({"display":"block", "left":"0%", "position":"relative"});
		$("#gamesWrapper").delay(500).animate(
			{
				left: '-180%'
			},
			{
				duration: 900,
				easing: 'easeInBack',
				complete: function (){
					if (callBack){
						if (callBack == "assignmentEasingIn"){
							assignmentEasingIn ('assignmentList');
						}else if (callBack == 'assignmentEasingIn-zerostate'){
							assignmentEasingIn ('zeroState');
						}						
					}
					$("#gamesWrapper").css({"display":"none"}); //
					$("#appMenu li:first a").addClass("active");
		    		$("#appMenu li:eq(1) a").removeClass("active");
				}
			}
		);
    }
    
    /**
     * 
     */
    function completedAssignmentEasingIn (direction){
    	console.log ("@-Completed Assignment EasingIn "+ direction);
    	var $completedAssignmentContainer = $('#completedAssignmentContainer');
		     	 console.log ("Header Wrapper Heigth -> "+$("#headerWrapper").height());
		
		$('#lift_level,.score_marker').animate({opacity: '0'}, 500);
    	$("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() + 5}); //
		 $('.main-container').delay(1500).addClass('remove-dotted-bg');
		 $("#viewAllAssignments, #completedAssignmentButton, #completedAssignmentPaginationWrapper").css({"visibility":"hidden"});
		 $completedAssignmentContainer.stop(true,true);
		 /*setTimeout(function(){
			 $('.assignment-wrapper').delay(600).css('display','none');
			 $("#bodyWrapper").css({"padding-top":$("#headerWrapper").height() + 5});
			 },1300);*/
		
		if (direction == 'rightToLeft'){
			$completedAssignmentContainer.css({"left":"110%", "display":"block"});
			$completedAssignmentContainer.animate(
					{
						left: '0%'
					},
					{
						duration: 1000,
						easing: 'easeOutBack',
						complete:function(){
								window.waggleui.view.positionArrowPagination();
								$("#viewAllAssignments, #completedAssignmentButton, #completedAssignmentPaginationWrapper").css({"visibility":"visible"});
								//$('#wrapperleft,.assignment-list-wrapper, .no-assignment-list-wrapper').removeClass('wrapperOut');						
							}
					}
			);
		}else{
			$completedAssignmentContainer.css({"display":"block", "left":"-180%"});
			 $completedAssignmentContainer.animate(
						{
							left: '0%'
						},
						{
							duration: 1000,
							easing: 'easeOutBack',
							complete:function(){
									positionArrowPagination();
									$("#viewAllAssignments, #completedAssignmentButton, #completedAssignmentPaginationWrapper").css({"visibility":"visible"});
									//$('#wrapperleft,.assignment-list-wrapper, .no-assignment-list-wrapper').removeClass('wrapperOut');						
								}
						}
				);
		}
		
    }
    
    /**
     * @Param 1 - "direction" - move completed assignment to right or left
     */
    function completedAssignmentEasingOut (direction, callBack){
    	console.log ("@-Completed Assignment EasingOut "+ direction);
    	var $completedAssignmentContainer = $('#completedAssignmentContainer');
    	$("#viewAllAssignments, #completedAssignmentButton, #completedAssignmentPaginationWrapper").css({"visibility":"hidden"});    	
		$completedAssignmentContainer.stop(true,true);		
		
		if (direction == 'toRight'){
			$completedAssignmentContainer.css('left','0%');
			$completedAssignmentContainer.animate(
					{
						left: '180%'
					},
					{
						duration: 1000,
						easing: 'easeInBack',
						complete:function(){
							$completedAssignmentContainer.css({"display":"none"});	//
							//Only for toRight
							if (callBack){
								if (callBack == "assignmentsList"){
								}else if(callBack == "updateHeaderHeight"){
									var tempClassObject = window.waggleui.model.getCurrentClassObject();
									window.waggleui.messageController.getMessageObject(tempClassObject.alerts);
								} else{									
								}
								window.waggleui.view.alertsHandling(callBack);
							}
						}
					}
			);
		}else{
			 $completedAssignmentContainer.css('left','0%');
			 $completedAssignmentContainer.animate(
						{
							left: '-180%'
						},
						{
							duration: 1000,
							easing: 'easeInBack',
							complete:function(){
								$completedAssignmentContainer.css({"display":"none"});	//								
							}
						}
				);
		}
    }
    
    return {
		assignmentEasingIn: assignmentEasingIn,
		assignmentEasingOut: assignmentEasingOut,
		individualAssignmentEasingOut: individualAssignmentEasingOut,
		cloudEasingIn: cloudEasingIn,
		cloudEasingOut: cloudEasingOut,
		gameEasingIn: gameEasingIn,
		gameEasingOut: gameEasingOut,
		completedAssignmentEasingIn: completedAssignmentEasingIn,
		completedAssignmentEasingOut: completedAssignmentEasingOut
    };
}());