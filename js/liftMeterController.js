window.waggleui.liftMeterController = (function(){

	function renderUpdatedFeetTraveled(feetObject) {
		console.log ('setting feet');
		var feetVal = null,
			feetCloudLength = null,
			feetNext = null,
			studentFeetCloudId = null;
			feetLeft = null,
			bottomFeet = null,
			feetCalc = null,
			localCalculation = null,
			lastFeetTravelled = parseInt($('#lift_level').css("bottom"));
		
		if (feetObject.status == 'WG201'){
			var currentClassObject = window.waggleui.model.getCurrentClassObject(),
				tempFeetTravelled = currentClassObject.rewards.feetTraveled,
				tempFeetClouds = currentClassObject.feetClouds.shift();	//remove the first item of an array
				
				feetVal = parseInt(tempFeetTravelled) + parseInt(tempFeetClouds["value"]);	//feet travelled score
				feetCloudLength = currentClassObject.feetClouds.length;				//feet cloud red notification
				
				if (feetCloudLength != 0){
					feetNext = currentClassObject.feetClouds[0]['value'];				//feet cloud val
					studentFeetCloudId = currentClassObject.feetClouds[0]['studentFeetCloudId'];
				}				
				feetLeft = parseInt(feetVal) - parseInt($(".feet .score").html().replace(/[^0-9]/g,""));
				bottomFeet = feetLeft*2 + parseInt($('.score_marker').css('bottom').replace(/px/, ''));
				
			//set updated currentClassObject info
			currentClassObject.rewards.feetTraveled = feetVal;
			window.waggleui.model.setCurrentClassObject(currentClassObject);
			
			//Analytics
	        /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.assignments.feetCloud');
        	window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/
				
		}else if( (feetObject.feetTravelled) && (feetObject.feetClouds) ){
			feetVal = feetObject.feetTravelled,
			feetCloudLength = feetObject.feetClouds.length,
			feetNext = feetObject.feetClouds[0]["value"],
			studentFeetCloudId = feetObject.feetClouds[0]['studentFeetCloudId'],
			feetLeft = parseInt(feetVal) - parseInt($(".feet .score").html().replace(/[^0-9]/g,"")),
			bottomFeet = feetLeft*2 + parseInt($('.score_marker').css('bottom').replace(/px/, ''));
		}else{
			console.log ("Data Object is Empty or Contains Insufficient Data");
			//flockCloudyAnimation = false;
			return false;
		}		
		
		console.log("Let's Start Lift Meter Animation");
		latestFeet = false; //(flag to disable click)-vallabh

		if(!latestFeet){ //(flag to disable click)-vallabh
			if(feetLeft > 0) {
				
				//Animate Score Maker - moving at top
				$('.score_marker').animate(
				{
					bottom: '+'+bottomFeet
				},
				{
					duration: 1700,
					easing: 'easeOutBack'
				});
				
				//Animate feet Cloud - reduce to zero and disappear the feet cloud
				$('.feet-cloud-off').animate(
				{
					opacity: 0
				}, 
				{
					duration: 1700,
					easing: 'easeInExpo',
					complete: function(){
						console.log('Feet Cloud disappeared');
					}
				});
				
				//Animate Feet Travelled - Bottom Third Tab
				$({ somefeetValue : parseInt($(".feet .score").html().replace(/[^0-9]/g,"")) }).animate({somefeetValue : parseInt(feetVal) }, {
					duration: 2000,
					easing:'swing',
					step: function() { // called on every step
						// Update the element's text with rounded-up Value:
						
						$('.feet .score').text(Math.ceil(this.somefeetValue)).commafy();
						$('#silhouetteAvatar').text(Math.ceil(this.somefeetValue)).commafy();

						if(feetLeft> 99){
							$('.feet-cloud-off .feet-distance').addClass('more-digits');
						}

						$('.feet-cloud-off .feet-distance').html('+' +  ( parseInt(feetVal) - Math.ceil(this.somefeetValue)));  
					}
				});
				
				feetCalc =  '-'+(feetLeft*2 - 3);				
				localCalculation = lastFeetTravelled + parseInt(feetCalc);
				
				
				/*console.log ("lastFeetTravelled -> " +  lastFeetTravelled);
				console.log ("feetleft -> " +  feetLeft);				
				console.log ("localCalculation -> " + localCalculation);*/
				
				
				//Animate lift - coming down and background lines
				$('#lift_level, #background_lines').delay(2000).animate(
				{
					textIndent : 0,
					bottom: localCalculation
				},
				{
					duration: 1000,
					easing: 'easeInQuart',
					complete: function(){
						if(feetCloudLength === 0) {
							$('.feet-cloud-off .display-count').html(feetCloudLength);
							$(".feet-cloud-off ").css({display:"none"});
							$("#flockCloudyOff").css({"right":"125px", "top":"140px"});							
						}else{
							$('.feet-cloud-off .display-count').html(feetCloudLength); 
							$('.feet-cloud-off .feet-distance').removeClass('more-digits').html('+' + feetNext);
							$('.feet-cloud-off .feet-distance').attr("studentfeetcloudid",studentFeetCloudId);
							if(feetNext > 99){
								$('.feet-cloud-off .feet-distance').addClass('more-digits');
							}

							$.fn.commafy = function(){
								return this.each(function(){
								$(this).text( $(this).text().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") ); 
								})
							}
							
							/*$(".app-stats-blocks").find(".score").commafy();
							$('#silhouetteAvatar').commafy();*/
							$('#lift_level .current').removeClass('current');
						}
					} 
				});
								
				// Animate Feet Cloud - finally display the feet cloudy back
				$('.feet-cloud-off').delay(1700).animate(
					{
						opacity: 100
					}, 
					{
						duration: 400,
						easing: 'easeInExpo',
						complete: function(){
							console.log('Feet Cloud appeared back and enabled click event');
							latestFeet = true; //(flag to disable click)-vallabh
						}
					});
				
			}else{
				console.log ("Please check the JSON");
				latestFeet = true;
			}// check feetLeft is greater than zero			
		} // disable and enable click at correct time for flock cloud
	};
	
	return {
		renderUpdatedFeetTraveled: renderUpdatedFeetTraveled
	}
}());

