/**
 *  Data used to load the files used :
 *  
 **/
var requiredStructure = function(ENV){
	var inputData = {
	  "root" : {
	    
			AM_BASE : ENV,
			AM_ASSETS : ENV + "/assets",
			AM_CSS : ENV + "/css",
			AM_FEEDS : ENV + "/feeds",
			AM_IMAGES : ENV + "/images",
			AM_JS : ENV + "/js",
			AM_JS_INTEGRATION : ENV + "/js/integration",
			AM_JS_ANSWER_MECH : ENV + "/js/answer_mech",
			AM_JS_INTERFACE : ENV + "/js/interface",
			AM_JS_JQUERY : ENV + "/js/jquery",
			AM_JS_SOUNDMANAGER : ENV + "/js/soundmanager",
			AM_JS_ANSWER_MECH_GLOBAL : ENV + "/js/answer_mech/global.js",
			AM_JS_ANSWER_MECH_CONFIG : ENV + "/js/answer_mech/config.js",
			AMS : {
			    "choices" : {
			    	"BASE" : ENV + "/js/answer_mech/choices/choices.js",
			    	"PREVIEW" : ENV + "/js/answer_mech/choices/choicesPreview.js",
			    	"TEST" : ENV + "/js/answer_mech/choices/choicesTest.js",
			    	"REVIEW" : ENV + "/js/answer_mech/choices/choicesReview.js"
			     },
			     "select" : {
				    	"BASE" : ENV + "/js/answer_mech/select/select.js",
				    	"PREVIEW" : ENV + "/js/answer_mech/select/selectPreview.js",
				    	"TEST" : ENV + "/js/answer_mech/select/selectTest.js",
				    	"REVIEW" : ENV + "/js/answer_mech/select/selectReview.js"
				     },
				 "hot-spot" : {
					 "BASE" : ENV + "/js/answer_mech/hotspot/hotspot.js",
					 "PREVIEW" : ENV + "/js/answer_mech/hotspot/hotspotPreview.js",
					 "TEST" : ENV + "/js/answer_mech/hotspot/hotspotTest.js",
					 "REVIEW" : ENV + "/js/answer_mech/hotspot/hotspotReview.js"	
					  },
				"hs-click" : {
					 "BASE" : ENV + "/js/answer_mech/hotspot/hotSpot.js",
					 "PREVIEW" : ENV + "/js/answer_mech/hotspot/hotspotPreview.js",
					 "TEST" : ENV + "/js/answer_mech/hotspot/hotspotTest.js",
					 "REVIEW" : ENV + "/js/answer_mech/hotspot/hotspotReview.js"	
				},
				"embed-in-text": {
					"BASE" : ENV + "/js/answer_mech/embeddedText/embeddedText.js",
					 "PREVIEW" : ENV + "/js/answer_mech/embeddedText/embeddedTextPreview.js",
					 "TEST" : ENV + "/js/answer_mech/embeddedText/embeddedTextTest.js",
					 "REVIEW" : ENV + "/js/answer_mech/embeddedText/embeddedTextReview.js"	
				},
				"embed-in-image": {
					"BASE" : ENV + "/js/answer_mech/embeddedImage/embeddedImage.js",
					 "PREVIEW" : ENV + "/js/answer_mech/embeddedImage/embeddedImagePreview.js",
					 "TEST" : ENV + "/js/answer_mech/embeddedImage/embeddedImageTest.js",
					 "REVIEW" : ENV + "/js/answer_mech/embeddedImage/embeddedImageReview.js"
				},
				"drag-drop": {
					"BASE" : ENV + "/js/answer_mech/dragdrop/dragdrop.js",
					 "PREVIEW" : ENV + "/js/answer_mech/dragdrop/dragdropPreview.js",
					 "TEST" : ENV + "/js/answer_mech/dragdrop/dragdropTest.js",
					 "REVIEW" : ENV + "/js/answer_mech/dragdrop/dragdropReview.js"
				},
				"sort": {
					"BASE" : ENV + "/js/answer_mech/sorting/sorting.js",
					 "PREVIEW" : ENV + "/js/answer_mech/sorting/sortingPreview.js",
					 "TEST" : ENV + "/js/answer_mech/sorting/sortingTest.js",
					 "REVIEW" : ENV + "/js/answer_mech/sorting/sortingReview.js"
				},
				"segment": {
					"BASE" : ENV + "/js/answer_mech/graphs/graphs.js",
					 "TEST" : ENV + "/js/answer_mech/graphs/graphsTest.js"
				},
				"highlight": {
					"BASE" : ENV + "/js/answer_mech/highlight/highlight.js",
					 "TEST" : ENV + "/js/answer_mech/highlight/highlightTest.js"
				},
				"open-response": {
					"BASE" : ENV + "/js/answer_mech/openResponse/openResponse.js",
					 "TEST" : ENV + "/js/answer_mech/openResponse/openResponseTest.js"
				}
			}
			//AM_CSS_PASSAGE : URL_CONFIG.AM_CSS + "/" + "passage.css"
	  }
	}
	return inputData;
}
