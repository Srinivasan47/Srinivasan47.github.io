window.waggleui.messageController = (function(){

/**
 * 
 */	
/* //window.waggleui.messageController.initMessaging(); */	
/*function initMessaging (){		initMessaging: initMessaging,
	window.waggleui.services.getAlertMessages();
}*/
	
/**
 * 
 */
function getMessageObject (messageObject){
	var alertWrapper = $("#alertWrapper"),
		messagingWrapper = $("#messagingWrapper"),
		alertMessagesScrollBar = $("#alertMessagesScrollBar"),
		messagesContainer = $("#messagesContainer"),
		bodyWrapperMessaging = $('#bodyWrapper'),
		headerWrapperMessaging = $("#headerWrapper");
	
	if (messageObject){
		//$("#bodyWrapper").removeClass("remove-padding");
		alertWrapper.css("display","block");		
		alertMessagesScrollBar.css("display","none");
		messagesContainer.html("");		
		//$("#alertMessagesScrollBar, #messagingWrapper").css("height","auto");
		
		
		if (messageObject.length > 0){
			
			//$("#bodyWrapper").removeClass("remove-padding");
			messagesContainer.attr("response","true");
			var collectMessages = [],
				count = 0;
			for (i=0; i < messageObject.length; i++){
				count += 1;
				collectMessages.push( _markUpMessage(messageObject[i], "#dynamicParentsMessaging", count ));
			}
			messagesContainer.html(collectMessages.join(""));

			for (i=0; i < messageObject.length; i++){
				$("#messagesContainer li:eq("+i+") .message-text").text(messageObject[i]['message']);
			}
			alertAdjustBodyHeight();
			
			/*$("#messagingWrapper").slideDown(750, function (){
				alertAdjustBodyHeight ();
				fleXenv.fleXcrollMain("alertMessagesScrollBar");
				if(document.getElementById("alertMessagesScrollBar").fleXcroll) {
					document.getElementById("alertMessagesScrollBar").fleXcroll.setScrollPos(false,0);	
				}
			});*/
			
			messagesContainer.find('li:visible:last').css('border-bottom','none');
		}else{
			alertWrapper.css("display","none");
			//$("#bodyWrapper").addClass("remove-padding");			
			if(window.waggleui.model.getUserProfile().role == 'teacher'){
				if ($(".teacher-student-preview").hasClass("hide")){	//very first time, student preview tab is not enabled quickly, so calculation is going wrong. this line gives solution
					bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 61});
				}else{
					bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 93});
				}			
			}else{
				bodyWrapperMessaging.css({"padding-top":0});
			}			
			messagesContainer.attr("response","false");
		}		
	}else{
		alertWrapper.css("display","none");
		//$("#bodyWrapper").addClass("remove-padding");		
		if(window.waggleui.model.getUserProfile().role == 'teacher'){
			if ($(".teacher-student-preview").hasClass("hide")){	//very first time, student preview tab is not enabled quickly, so calculation is going wrong. this line gives solution
				bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 61});
			}else{
				bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 93});
			}			
		}else{
			bodyWrapperMessaging.css({"padding-top":0});
		}
		messagesContainer.attr("response","false");
	}
}

function _markUpMessage(messages,id,count){
	var row;
	rowData = $(id).html();	
	row = rowData.replace(/@@([^@]+)@@/g, function (match, group) {			
		switch (group){
		case "messageId":
			return (messages[group]?messages[group]:"0");
		break;
		/*case "hide-me":
			if (count > 4){
				return 'hide';
			}else{
				return '';
			}
		break;*/
		case "messageHeader":
				return (messages[group]?messages[group]:"Default Header");
			break;
		/*case "message":
				return (messages[group]?messages[group]:"Default Message");
			break;*/		
		}
    });
	return row;
}



function alertAdjustBodyHeight(){
	
	if($('#alertFlipContainer').css('display') != 'none'){
		
		var bodyWrapperMessaging = $('#bodyWrapper'),
			headerWrapperMessaging = $("#headerWrapper");
		
		if(window.waggleui.model.getUserProfile().role == 'teacher'){
			if ($(".teacher-student-preview").hasClass("hide")){	//very first time, student preview tab is not enabled quickly, so calculation is going wrong. this line gives solution
				bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 61});
			}else{
				bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 93});
			}			
		}else{
			bodyWrapperMessaging.css({"padding-top":headerWrapperMessaging.height() - 93});
		}
		
		//$('#bodyWrapper').css({"padding-top":$("#headerWrapper").height() - 93});
		
		$("#assignmentWrapper, #gamesWrapper, #cloudContainer").css("margin-top","100px");
		
		$(window).trigger('resize.cloudy');
		window.waggleui.view.assignmentListCarousel(); //extra assignment list added or removed based on height
	}
}
	
	
	return {
		getMessageObject : getMessageObject,
		alertAdjustBodyHeight: alertAdjustBodyHeight
	} 
	
}());

