/* cloudy feet animation*/

$('#feetCloudyOff').off('click').on('click',feetLift);
    
function feetLift() {
	if(latestFeet){ //(flag to disable click)-vallabh
		$('.feet-cloud-off .feet-distance').removeClass('more-digits');
		var preferenceObj = {
			'studentId': $('.avatar-name').attr('studentId'),
			'classId': $('.users-list .active').attr('classid'),
			'classViewId': $('.users-list .active').attr('classviewid'),
			'studentFeetCloudId': $('.feet-cloud-off .feet-distance').attr("studentfeetcloudid")
		}
		window.waggleui.services.getUpdatedFeetTraveled(preferenceObj);
		console.log('feet clicked');
		//setBgLines();
	}
};