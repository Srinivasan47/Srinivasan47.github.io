window.waggleui.app = (function() {
	
	//window.waggleui.services.loadProperties();
	window.waggleui.services.getLocaleBase();
	window.waggleui.services.getLocaleProperties();
	//window.waggleui.services.getLocalAnalyticsInfo();
	if(window.localStorage.teacherId != undefined && window.localStorage.classId != undefined){//!= is intentionally used to cover both 'undefined' and 'null'.
		//window.waggleui.services.getInitData({'teacherId':window.localStorage.teacherId,'classId':window.localStorage.classId});
	} else {
		//window.waggleui.services.getInitData({'studentId':1});
	}	
	window.waggleui.view.init();
}());