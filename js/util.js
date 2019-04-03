var customData = {};
var timer, counter;

window.waggleui.util = {
		'errorInfo' :{
			'wg430' : false
		}, 
	'ajax' : function (options) {
		var Util = this;		
		$.ajax({
	        'url': options.url,
	        'contentType': options.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
	        'dataType': options.dataType || 'json',
	        'type': options.type || 'GET',
	        'async': (options.async === false) ? options.async : true,
	        'data': options.data || '',
	        'processData': (options.processData === false) ? options.processData : true,
	        'enctype': options.enctype || '',
	        'cache': (options.cache === false) ? options.cache : true,	        
	        'beforeSend': function(xhr, opts) {
	        	/*opts.data.customData = customData;
	        	var encryptedData = JSON.stringify(opts.data);
	        	var cipher = encryptedData.match(/.{1,2}/g).reverse().join('').replace(/[^{}\[\]":,]+/g, function(){
	  	          return encodeURIComponent(arguments[0]);
	  	        });*/
	        	//console.log(cipher);	   
	        	//opts.data = cipher; //uncomment this line to send encoded data to server.
	        	return opts;
	        },
	        'dataFilter': function(data, type) {
	        	var parsedData;
	        	if(type === 'json') {
	        		parsedData = JSON.parse(data);
	        		if(parsedData.customData != undefined) {
	        			customData = parsedData.customData;
	        		}
	        		return data;
	        	}
	        },
			'success': function (response) {				 
				if(response.info) {					
					//property names of timer and counter needs to be confirmed.		
					if( (typeof enableTimeout != 'undefined') && (response.info.sessionTimeout) && (response.info.countdownTime) ) {
						if (enableTimeout == 'on'){
							Util.timer(response.info.sessionTimeout, response.info.countdownTime);
						}						
					}
					if(response.data) {
						if (options.success) {
				            options.success(response.data);	//Assign only Data object as success
				        }            
					} else {
						/**
				        * Supports following Application error codes
				        *          WG200 - OK
				        *          WG404 - Not Found
				        *          WG500 - Internal Server Error
				        *          WG201 - Created
				        *          WG304 - Not Modified
				        *          WG400 - Bad Request
				        *          WG401 - Unauthorized
				        *          WG403 - Forbidden
				        *          WG503 - Down For Maintenance
				        *          WG440 - Login Timeout
				        *          WG501 - Not Implemented
				        */						
						var code = response.info.status;
						if ((code == 'WG200') || (code == 'WG201')){
							Util.logMessage('util.ajax.status', response.info.title);
							options.success(response.info);	//Assign only info object as success
						}else if (code == 'WG440') {
							location.reload();
						}else if(code == "WG441"){ //signout the page.
			    			window.location.href = signOutUrl;
			    		}else if(code == "WG430"){ //			    			
							$("#knewtonFailurePopup, #errorMessageModalOverlay").removeClass("hide");
							window.waggleui.util.errorInfo['wg430'] = true;
			    		}else{
							Util.logMessage('util.ajax.status.error', response.info.title);
							$('.feet-cloud-off .feet-distance').addClass('more-digits');
							
							if (response.info.title.trim() == ""){
								var customMessage = null;
								switch (response.info.status)
								{
								case "WG404":
									customMessage="Not Found";
								  break;
								case "WG500":
									customMessage="Internal Server Error";
								  break;
								case "WG304":
									customMessage="Not Modified";
								  break;
								case "WG400":
									customMessage="Bad Request";
								  break;
								case "WG401":
									customMessage="Unauthorized";
								  break;
								case "WG403":
									customMessage="Forbidden";
								  break;
								case "WG503":
									customMessage="Down For Maintenance";
								  break;
								case "WG440":
									customMessage="Login Timeout";
								  break;
								case "WG501":
									customMessage="License Expired"; //Not Implemented
								  break;
								default:
									customMessage="Custom Message";
								}
								customMessage = customMessage.toUpperCase();
								$("#errorMessageModal #server-error-message-js").text(customMessage);
							}else{
								$("#errorMessageModal #server-error-message-js").text(response.info.title.toUpperCase());
							}							
							$("#errorMessageModal .error-code").text(function (i, old) {
							     return old
							         .replace('@#@', response.info.status);
							});
							var serverErrorPopUpcontent = window.waggleui.model.getWaggleProperties();
							if (response.info.message.trim() == ""){
								$("#errorMessageModal .error-code-message").html(serverErrorPopUpcontent["label.popup.serverError"]);
							}else{
								$("#errorMessageModal .error-code-message").html(response.info.message);
							}
							//show Error Message Modal
							$("#errorMessageModal, #errorMessageModalOverlay").removeClass("hide");							
						}
				    }
				}				
			},
	        'error': options.error || function (response) {
	            Util.logMessage('util.ajax.error', '');
					var customMessage = null;
					switch (response.status)
					{
					case 0:
						customMessage="Network Connection - Failed";
					  break;
					case 404:
						customMessage="Network Connection - Failed";
					  break;
					case 500:
						customMessage="Internal Server Error";
					  break;
					case 400:
						customMessage="Bad Request";
					  break;
					case 401:
						customMessage="Unauthorized";
					  break;
					case 403:
						customMessage="Forbidden";
					  break;
					case 440:
						customMessage="Login Timeout";
					  break;
					default:
						customMessage="Custom Message";
					}
					customMessage = customMessage.toUpperCase();
					$("#errorMessageModal #server-error-message-js").text(customMessage);
				$("#errorMessageModal .error-code").text(function (i, old) {
				     return old
				         .replace('@#@', response.status);
				});
				var serverErrorPopUpcontent = window.waggleui.model.getWaggleProperties();
				$("#errorMessageModal .error-code-message").html(serverErrorPopUpcontent["label.popup.serverError"]);
				//show Error Message Modal
				$("#errorMessageModal, #errorMessageModalOverlay").removeClass("hide");
	        },
	        'complete': options.complete || function () {
	            Util.logMessage('util.ajax.complete', '');
	        }
		});
	},
	'logMessage' : function(className, message) {
		if(console) {
			console.log('@'+className+': '+message);
		}
	},
	'timer' : function(timeout, countdownTime) {
		clearInterval(counter);
		clearTimeout(timer);
		
		timeout = (timeout - countdownTime) * 1000;		
		
		timer = setTimeout(function() {
			window.waggleui.controller.startTimer(countdownTime);
		}, timeout);		
	}
}