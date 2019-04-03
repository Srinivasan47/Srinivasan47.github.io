/**
  * Show pigs in current flock
  * @param pigsCount @type integer - number of pigs to display
  * TBD by: FG
  */
function showPigs(pigsCount) {
  console.log('TBD: show collected pigs ', pigsCount);
  var currentUser = user.user;
  if (_.isUndefined(currentUser.currentPigs)) {
    currentUser.currentPigs = 0;
  }
  currentUser.currentPigs += pigsCount;
  if (currentUser.currentPigs >= PIGSNOHINTSUSED) {
    addFlock();
    currentUser.currentPigs -= PIGSNOHINTSUSED;
  }
}

/**
  * Add flock
  * @returns nil
  * TBD by: FG
  */
function addFlock() {
  console.log('TBD: add flock');  
}

/**
  * Cloud animation effect
  * Decrease cloud value, move avatar up, move background lines down to give a flight effect
  * @returns nil
  */
/*function setFeet() {
  var feetLeft = $('.feet-distance').html();
  feetLeft = parseInt(feetLeft.replace('+', ''));
	var feetLeft = 50;
 
  var bottomFeet = feetLeft*2 + parseInt($('#score_marker').css('bottom').replace(/px/, ''));
  if(feetLeft > 0) {
    $('#score_marker').animate(
      {
        bottom: '+'+bottomFeet
      },
      {
        duration: 1700,
        easing: 'easeOutBack'
      }
    );
   // debugger;
    $('.feet-cloud-off').animate(
      {
        opacity: 0
      }, 1700
      {
        duration: 1700,
        easing: 'easeInExpo'
      }, function(){
          $(this).css('display','none');
      }
    );
    var val = parseInt($('.feet .score').html());
    $({someValue: val}).animate({someValue: val+feetLeft}, {
      duration: 2000,
      easing:'swing',
      step: function() { // called on every step
          // Update the element's text with rounded-up value:
          $('.feet .score').text(Math.ceil(this.someValue));
          //debugger;
          $('#score_marker').text(Math.ceil(this.someValue));
          $('.feet-cloud-off').text('+' + (feetLeft - (Math.ceil(this.someValue) - val)))
  }
    });
    $(' #lift_level').delay(2000).animate({
      bottom: '-' + feetLeft*2
    }, {
      duration: 1000,
      easing: 'easeInQuart'
    });
  }
 // debugger;
}*/

function handleStreak(response) {
	 //Calling the showStreak() written in recognition.js
      var streak = (!_.isUndefined(response.streak)) ? response.streak : "";
      if(streak){
    	  showStreak(streak);
      }
      
      /*++++++++ Code for displaying different types of wings for using hints+++++*/
      wingSize = response.wingSize;
      //$('#app_exercise_navigator img').hide();
      $('.pig-image-container').css('display','block');
      wingContainer = $('.pig-image-container');
      switch(wingSize){
      	case "small":
      		wingContainer.addClass('smallWings');
      		wingContainer.css('left','17%');
      		break;
      	case "medium":
      		wingContainer.addClass('mediumWings');
      		wingContainer.css({'left':'11%','width':'28%'});
      		break;
      	case "large":
      		wingContainer.addClass('largeWings');
      		wingContainer.css('left','9%');
      		break;
      }
       /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
}

function showStreak(streak){
	$('#streakPopUp').css('display','block');
	$('#windowOverlay').toggleClass('hide');
	$(".overlay").css('z-index','800');
	$(".streak-value").html(streak);

	
	$('.overlay,#streakPopUp').off('click.streakpopup').on('click.streakpopup',function(){
		if($('#streakPopUp').is(':visible')){
			$('#streakPopUp').hide();	
			$('#windowOverlay').addClass('hide');
		}	

	});	
	
}
