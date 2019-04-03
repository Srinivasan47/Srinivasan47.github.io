window.waggleui.view = (function () {	
    function bindEvents() {
    	//close icon for System Error PopUp
        $("#errorMessageModal .close-server-error-modal-js").off('click.close-server-error-modal').on('click.close-server-error-modal', function (e) {
        	$("#errorMessageModal, #errorMessageModalOverlay").addClass("hide");
        });
    }
    function amsRefresh(){		
		$("#alertWrapper").slideUp(1000);
    	//$("#wrapperleft").css('display','none');
		   setTimeout(function(){$("#bodyWrapper").css("padding-top","0px");},1500);
				   
    	//changed by Praveen Chand
        //window.location.hash = 'assignmentId=' + $(this).attr('assignment_id');
		 $('.small-header-wrapper .audio-icon').removeClass('play mute');
	 	var audioStatus = window.waggleui.model.getAmsStandAloneItem()['profile']['globalAudio'];
	         if(audioStatus==='on')
	         $('.small-header-wrapper .audio-icon').addClass('play');
	         else
	             $('.small-header-wrapper .audio-icon').addClass('mute');
	         
	         var avatar =  window.waggleui.model.getAmsStandAloneItem()['profile']['avatar'];
	       
	        
	         var avatarClass = avatar+'-avatar';
	         $('.small-header-wrapper .small-menu-avatars').removeClass('hen-avatar bear-avatar cat-avatar elephant-avatar frog-avatar mantis-avatar');
	         $('.small-header-wrapper .small-menu-avatars').addClass(avatarClass);
	         
	         var assignmentName = window.waggleui.model.getAmsStandAloneItem()['assignment']['info']['assignmentName'];
 	        $('.small-header-content').html(assignmentName);

	}
    function init (){
    	bindEvents();
    }
    return {
        init: init,
        amsRefresh: amsRefresh
    };
}());