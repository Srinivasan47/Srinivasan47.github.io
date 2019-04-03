 window.iefallbackflag = true;

 // these functions will be called only in ie9 and below browsers where cssanimations does not work
 function ieclickanimations(currentrow) {
     var detailAssignment = $('#individualAssignmentWrapper');
     var $wrapperleft = $("#wrapperleft");

     currentrow.parent().animate({
         left: '-2000px'
     }, 3500, function () {
         $(this).css('left', '0px');
     })

     $wrapperleft.delay(600).animate({
         left: '-2000px'
     }, 800, function () {
    	 
     })
 }

 function iebackanimatoins() {
     $('#wrapperleft,.assignment-list-wrapper, .no-assignment-list-wrapper').stop(true, true)
     //	$('.assignment-list-wrapper, .no-assignment-list-wrapper').css({'left':"-180%"}); 
     $('.assignment-list-wrapper, .no-assignment-list-wrapper').css({
         'left': '-180%',
         'position': 'relative'
     });
     $('.assignment-list-wrapper, .no-assignment-list-wrapper').delay(300).animate({
         left: '0%'
     }, {
         duration: 1000,
         easing: 'easeOutBack'
     });
 }