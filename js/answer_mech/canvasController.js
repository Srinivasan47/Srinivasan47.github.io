/**
 * Canvas Controller class
 * Creates a fabris.Canvas controller
 * Allows interaction with the fabric canvas
 * All generic methods done on the fabric canvas should be placed here
 * @author: Lucia Marcu <LuciaMarcu@funnygarbage.com>
 */
var CanvasController = Backbone.Model.extend({
    /*
     * Define the default values and the properties of this model
     */
    defaults: {
        //id of the canvas tag
        canvasId: 'canvas',
        //percentage of the question textual area 
        /*articleAreaSize : CANVASLEFTWIDTH, 
	    //article line height
	    articleLineHeight : ARTICLELINEHEIGHT, 
	    //article character width
	    articleCharWidth : ARTICLECHARWIDTH, 
	    //percentage of the article area 
	    //article font size
	    articleFontSize : ARTICLEFONTSIZE, 
	    // area where the question is rendered
	    questionAreaSize : CANVASRIGHTWIDTH, 
	    //question font family
	    questionFontFamily : QUESTIONFONTFAMILY, 
	    //question font color
	    questionFontColor : QUESTIONFONTCOLOR, 
	    //question font size
	    questionFontSize : QUESTIONFONTSIZE, 
	    //question font style
	    questionFontStyle : QUESTIONFONTSTYLE,
	    // question font weight
	    questionFontWeight : QUESTIONFONTWEIGHT,
	    //question line length
	    questionLineLength : QUESTIONLINELENGTH,
	    //question line height
	    questionLineHeight : QUESTIONLINEHEIGHT, 
	    //background of the question area,
	    questionBackgroundColor : QUESTIONBACKGROUNDCOLOR,
	    //padding around the question text,
	    questionPadding : QUESTIONPADDING, 
	    //color of mechanical question text,    
	    mechanicalQuestionFontColor : MECHANICALQUESTIONFONTCOLOR,
	    //calculated max left point for the work area
	    maxWorkzoneLimit: CANVASLEFTWIDTH, 
	    // generic padding between canvas borders and drawn elements
	    softPadding: SOFTPADDING,*/
        //track hints used to solve current exercise
        totalHintsUsed: 0,
        totalAvailableHints: 0,
        //fabric canvas object - set on init
        canvas: null,
        //save the current Object
        currentObject: {},
        //set solved status to false
        exerciseSolved: false
    },
    /*
     * Initialize the model, create a new fabric canvas instance
     */
    initialize: function (options) {
    	hint_collection = {};
        this.options = _.extend(this.defaults, options);
        var configDefaults = {
            //percentage of the question textual area 
            articleAreaSize: this.get('namespace').CANVASLEFTWIDTH,
            //article line height
            articleLineHeight: this.get('namespace').ARTICLELINEHEIGHT,
            //article character width
            articleCharWidth: this.get('namespace').ARTICLECHARWIDTH,
            //percentage of the article area 
            //article font size
            articleFontSize: this.get('namespace').ARTICLEFONTSIZE,
            // area where the question is rendered
            questionAreaSize: this.get('namespace').CANVASRIGHTWIDTH,
            //question font family
            questionFontFamily: this.get('namespace').QUESTIONFONTFAMILY,
            //question font color
            questionFontColor: this.get('namespace').QUESTIONFONTCOLOR,
            //question font size
            questionFontSize: this.get('namespace').QUESTIONFONTSIZE,
            //question font style
            questionFontStyle: this.get('namespace').QUESTIONFONTSTYLE,
            // question font weight
            questionFontWeight: this.get('namespace').QUESTIONFONTWEIGHT,
            //question line length
            questionLineLength: this.get('namespace').QUESTIONLINELENGTH,
            //question line height
            questionLineHeight: this.get('namespace').QUESTIONLINEHEIGHT,
            //background of the question area,
            questionBackgroundColor: this.get('namespace').QUESTIONBACKGROUNDCOLOR,
            //padding around the question text,
            questionPadding: this.get('namespace').QUESTIONPADDING,
            //color of mechanical question text,    
            mechanicalQuestionFontColor: this.get('namespace').MECHANICALQUESTIONFONTCOLOR,
            //calculated max left point for the work area
            maxWorkzoneLimit: this.get('namespace').CANVASLEFTWIDTH,
            // generic padding between canvas borders and drawn elements
            softPadding: this.get('namespace').SOFTPADDING
        }
        this.options = _.extend(this.defaults, configDefaults);
        if (!this.get('canvas')) {
            this.set({
                canvas: new fabric.Canvas(this.get('canvasId'), {
                    selection: false,
                    hasControls: false,
                    hasBorders: false,
                    hoverCursor: 'pointer'
                })
            });
        }
        
        $('body').removeClass('canvas_ch canvas_hs canvas_sl canvas_dd canvas_srt canvas_mg canvas_ei canvas_et emerald canvas_hl canvas_or').addClass(this.get('canvasId'));
        //$('body').attr('class', '').addClass(this.get('canvasId'));
        
        this.set({
            'hintsUsed': []
        });
        this.set({
            'hintsUsedIds': []
        });
    },
    /*
     * Clear the canvas and stop its observer
     */
    clearCanvas: function () {
        if (this.get('canvas')) {
            this.get('canvas').clear();
            this.get('canvas').stopObserving('mouse:down', function () {});
            this.get('canvas').stopObserving('object:moving', function () {});
            this.get('canvas').stopObserving('object:scaling', function () {});
        }
    },
    /*
     * Generate a random color
     */
    getRandomColor: function () {
        return (
            this.pad(fabric.util.getRandomInt(0, 255).toString(16), 2) +
            this.pad(fabric.util.getRandomInt(0, 255).toString(16), 2) +
            this.pad(fabric.util.getRandomInt(0, 255).toString(16), 2)
        );
    },
    /*
     * internal method used in the random color generation
     */
    pad: function (str, length) {
        while (str.length < length) {
            str = '0' + str;
        }
        return str;
    },
    getAssetFromUsedAssetsById: function (assetId) {
        var initData = this.get('currentObject').get('initialData');
        var insertedObjects = !_.isUndefined(initData.assets_used) ? initData.assets_used : [];
        if (insertedObjects.length) {
            for (var assetIndex = 0; assetIndex < insertedObjects.length; assetIndex++) {

                if (insertedObjects[assetIndex].asset_id == assetId) {
                    return insertedObjects[assetIndex];
                }
            }
        }
        return {};
    },
    /**
     * Load canvas image on which the hot spots are applied
     */
    loadCanvasImage: function () {
        var bgAssetId = '';
        var insertedObjects = !_.isUndefined(this.get('currentObject').get('initialData').assets_used) ? this.get('currentObject').get('initialData').assets_used : [];
        if (insertedObjects.length) {
            for (var objectsIndex = 0; objectsIndex < insertedObjects.length; objectsIndex++) {
                if (insertedObjects[objectsIndex].asset_type == 'background') {
                    bgAssetId = insertedObjects[objectsIndex].asset_id;
                    break;
                }
            }
        }

        if (bgAssetId) {
            var asset = this.getAssetFromUsedAssetsById(bgAssetId);
            if (_.isEmpty(asset)) {
                return;
            }
            var imagePath = asset.asset_value;
            var canvas = this.get('canvas');
            var _this = this;
            fabric.Image.fromURL(imagePath, function (oImg) {
                //image should not be seletable nor should it have controls
                oImg.selectable = oImg.hasRotatingPoint = oImg.hasControls = oImg.hasBorders = false;
                //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
                var left = (_this.options.namespace.CANVASLEFTWIDTH - oImg.width) / 2 + oImg.width / 2;
                var top = (_this.options.namespace.CANVASHEIGHT - oImg.height) / 2 + oImg.height / 2;
                oImg.set({
                    left: left,
                    top: top,
                    isBackgroundImage: true
                });
                //canvas.add(oImg);
                //canvas.sendToBack(oImg);
            });
        }
    },
    /**
     * Render Question as HTML
     */
    renderQuestionHTML: function (initialData) {
        if (!initialData) {
            currentView.renderHint('Render question: no data');
            return;
        }
        this.loadCanvasImage();
        var currentObject = this.get('currentObject');
        canvas = this.get('canvas');
        if (!_.isUndefined(initialData.instructional_prompt_math) && initialData.instructional_prompt_math.length) {
            console.log('Treat instructional prompt math');
            var instructionalPromptText = '';
            var text = '<p>' + initialData.instructional_prompt + '</p>';
            var ipElements = $(text);

            ipElements.each(function (index) {
                /* var hasImages = false;
        var imgChildren = $(this).children('img');
        if (imgChildren.length) {
          imgChildren.each(function(index){
            if ($(this).attr('math_id')) {
              hasImages = true;
              var mathmlCounter = $(this).attr('math_id');
              var mathMlVal = initialData.instructional_prompt_math[mathmlCounter].mathml.replace(/<br>/gm, '\r\n').replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
              var theMathMl = '<span class="MathJax" id="MathJax-Element-' + mathmlCounter + '-Frame" style=""><\/span>'+
                        '<scr' + 'ipt type="math/mml" id="MathJax-Element-' + mathmlCounter + '">' + mathMlVal + '<\/scr' + 'ipt>';
              $(this).before(theMathMl);
              $(this).remove();
            }
          });
        }
        
        instructionalPromptText += '<p>' + $(this).html() + '</p>';*/

                if ($(this)[0].nodeName != "#text") {
                    //var hasImages = false;
          	        var imgChildren = $(this).children('img');
          	      //Checking for fMath images inside <ul> and <ol> tags (Mathml code cleanup)
        	          if(($(this)[0].nodeName == "UL")||($(this)[0].nodeName == "OL")){
        	        	imgChildren = $(this).children('li').children('img');
        	          }
                    // console.log($(this));
                    if (imgChildren.length /*&& !imgChildren.context == "text"*/ ) {
                        imgChildren.each(function (index) {
                            if ($(this).attr('math_id')) {
                                //hasImages = true;
                                var mathmlCounter = $(this).attr('math_id');
                                for (var instructional_prompt_mathmlCounter = 0; instructional_prompt_mathmlCounter < initialData.instructional_prompt_math.length; instructional_prompt_mathmlCounter++) {
                                    if (initialData.instructional_prompt_math[instructional_prompt_mathmlCounter].id == mathmlCounter) {
          	            		  var mathMlVal = initialData.instructional_prompt_math[instructional_prompt_mathmlCounter].mathml.replace(/<br>/gm, '');
          	            		  mathMlVal = mathMlVal.replace(/<br\/>/gm, '');
                                    }
                                }
                                mathMlVal = mathMlVal.replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
                                var theMathMl = '<span class="MathJax" id="MathJax-Element-Ip-' + mathmlCounter + '-Frame" style=""><\/span>' +
                                    '<scr' + 'ipt type="math/mml" id="MathJax-Element-Ip-' + mathmlCounter + '">' + mathMlVal + '<\/scr' + 'ipt>';
          	              $(this).before('<span style="font-size:12px">' + theMathMl + '</span>');
                                $(this).remove();
                                //console.log($(this));
                            }
                        });
                        // console.log($(this)[0]);
                        for (i = 0; i <= $(this).length - 1; i++) {
          	      		/*if($(this)[i].nodeName && $(this)[i].nodeName == "OL"){
                                instructionalPromptText += '<ol>' + $(this).html();
                                if (!imgChildren.length) {
                                    instructionalPromptText += theMathMl;
                                }
                                instructionalPromptText += '</ol>';
                            } else {
                                instructionalPromptText += '<p>' + $(this).html();
                                if (!imgChildren.length) {
                                    instructionalPromptText += theMathMl;
                                }
                                instructionalPromptText += '</p>';
          	            }*/
          	        	  
          	        	  //Mathml code cleanup
          	        	  if($(this)[i].nodeName){
              		          var tag = $(this)[i].nodeName.toLowerCase();
              		          instructionalPromptText += '<' + tag + '>' + $(this).html();
              	     	      if (!imgChildren.length) {
              	     	    	 instructionalPromptText += theMathMl;
              	     	      }
              	     	     instructionalPromptText += '</' + tag + '>';
                            }
                        }
                    } else {

                        for (i = 0; i <= $(this).length - 1; i++) {
              	      		/*if($(this)[i].nodeName && $(this)[i].nodeName == "OL"){
                                instructionalPromptText += '<ol>' + $(this).html();
                                instructionalPromptText += '</ol>';
                            } else {
                                instructionalPromptText += '<p>' + $(this).html();
                                instructionalPromptText += '</p>';
              	            }*/
          	        		
          	        		//Mathml code cleanup
          	        		if($(this)[i].nodeName && ($(this)[i].nodeName != "#text")){		//Adding condition to check whether the node is a #text element - JIRA Ticket #1423
      			        	    var tag = $(this)[i].nodeName.toLowerCase();
      			        	    instructionalPromptText += '<' + tag + '>' + $(this).html() + '</' + tag + '>';
                            }
                        }

                        //if($(this).nodeName && $(this).nodeName == "P"){

                    }
                    /* textHint += '<p>' + $(this).html();
    	        if (!imgChildren.length) {
    	          textHint += theMathMl;
    	        }*/
                    //if($(this).nodeName && $(this).nodeName == "P"){

                    //} 
                }


            });

            this.get('namespace').instructional_prompt.html(instructionalPromptText);

            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        } else {
			//SHK-ItalicText
			if (!_.isUndefined(initialData.instructional_prompt)) {
				initialData.instructional_prompt = AddSpaceSpecialCharNextToItalic(initialData.instructional_prompt);
			}
            this.get('namespace').instructional_prompt.html(initialData.instructional_prompt);
        }
		  //SHK-ItalicText
		if (!_.isUndefined(initialData.mechanical_prompt)) {
			initialData.mechanical_prompt = AddSpaceSpecialCharNextToItalic(initialData.mechanical_prompt);
		}
        this.get('namespace').mechanical_prompt.html(initialData.mechanical_prompt);

        // checks for instructional & mechanical prompt sound
        if (!_.isUndefined(initialData.instructional_prompt_audio) && !_.isEmpty(initialData.instructional_prompt_audio)) {
            this.get('namespace').instructional_prompt.prepend('<a href="javascript:;" onclick="promptSound(this)" src="' + initialData.instructional_prompt_audio + '" class="prompt_audio"></a>');
        }
        if (!_.isUndefined(initialData.mechanical_prompt_audio) && !_.isEmpty(initialData.mechanical_prompt_audio)) {
            this.get('namespace').mechanical_prompt.prepend('<a href="javascript:;" onclick="promptSound(this)" src="' + initialData.mechanical_prompt_audio + '" class="prompt_audio"></a>');
        }

        //check if passage is included and enable button
        //    if (!_.isUndefined(inputData.passage_asset_id) && inputData.passage_asset_id) {
        //      enable_view_selection_link();
        //    }

        // dinamically add exercise's title'
        var item = getAssetDetails(currentObject.id);
        $('#app_exercise_title').html(item.result[0].set_name);
        // initialise hints sounds accordingly to global sound
        // setHintsSound();
        this.animateHints();
        this.createToolkit();
        
     // getting exercise type
        var exercise_type = getAssetDetails(initialData.code);
        if(!_.isUndefined(exercise_type.subject) && (exercise_type.subject != '')) {
          this.createToolkit(exercise_type.subject);
        }
        
      //set hints used
        if (!_.isUndefined(initialData.hints_used) && initialData.hints_used) {
          var hintsIds = [],
          	  hintsUsed = [];
          for (var hintsCounter = 0; hintsCounter < initialData.hints_used; hintsCounter++) {
            hintsIds.push(hintsCounter);
          }
          for (var hintsCounter = 0; hintsCounter < initialData.hints_used; hintsCounter++) {
        	  var itemData = this.getAnswerData();
              var displayHint = getHint(hintsCounter, itemData.itemId, this.get('currentObject').get('initialData').productID);
              hintsUsed.push(displayHint);
            }
          
          this.set({
            hintsUsed: hintsUsed,
            totalHintsUsed: initialData.hints_used,
            hintsUsedIds: hintsIds
          });
        }
        
        //load inserted objects
        var insertedObjects = !_.isUndefined(initialData.assets_used) ? initialData.assets_used : [];
        var bgArray = [],
            vdoArray = [],
            imgArray = [],
            textArray = [],
            eqnArray = [],
            audioArray = [];
        for (var objectsIndex = 0; objectsIndex < insertedObjects.length; objectsIndex++) {
            switch (insertedObjects[objectsIndex].asset_type) {
            case 'background':
                bgArray.push(insertedObjects[objectsIndex]);
                break;
            case 'video':
                vdoArray.push(insertedObjects[objectsIndex]);
                break;
            case 'image':
                imgArray.push(insertedObjects[objectsIndex]);
                break;
            case 'equation':
                eqnArray.push(insertedObjects[objectsIndex]);
                break;
            case 'text':
            case 'passage':
                textArray.push(insertedObjects[objectsIndex]);
                break;
            case 'audio':
                audioArray.push(insertedObjects[objectsIndex]);
                break;
            default:
                break;
            }
        }

        insertedObjects = bgArray.concat(vdoArray, imgArray, eqnArray, textArray, audioArray);

        if (insertedObjects.length) {
            for (var objectsIndex = 0; objectsIndex < insertedObjects.length; objectsIndex++) {
                if ((_.isUndefined(insertedObjects[objectsIndex].left)) && (insertedObjects[objectsIndex].asset_type != "background")) {
                    continue;
                }
                //create and set values for HTML object
                this.get('namespace').canvas_container.append('<div id="text_object_' + insertedObjects[objectsIndex].index + '" class="inserted_objects"><\/div>');
                var element = $('#text_object_' + insertedObjects[objectsIndex].index);
                switch (insertedObjects[objectsIndex].asset_type) {
                case 'text':
                  var hasMathjax = false;
              	  var responseElements = $(insertedObjects[objectsIndex].asset_value);
              	  if (!_.isUndefined(insertedObjects[objectsIndex].math) && (insertedObjects[objectsIndex].math.length!=0)) {
              	      hasMathjax = true;
              	      var textHint = '';
              	      responseElements.each(function(index){
              	    	if($(this)[0].nodeName != "#text"){
              	    	  var imgChildren = $(this).children('img');
              	          //Checking for fMath images inside <ul> and <ol> tags
              	          if(($(this)[0].nodeName == "UL")||($(this)[0].nodeName == "OL")){
              	        	imgChildren = $(this).children('li').children('img');
              	          }
              	          if (imgChildren.length) {
              	            // for each fMath image
              	            imgChildren.each(function(index){
              	              if ($(this).attr('math_id')) {
              	                var mathmlCounter = $(this).attr('math_id');
              	              
              	                //Replacing all '<br/>' tags with '\r\n'
              	                for(var text_mathmlCounter = 0; text_mathmlCounter < insertedObjects[objectsIndex].math.length; text_mathmlCounter++){
              	            	  if(insertedObjects[objectsIndex].math[text_mathmlCounter].id == mathmlCounter){
              	            		  var mathMlVal = insertedObjects[objectsIndex].math[text_mathmlCounter].mathml.replace(/<br>/gm, '\r\n');
              	            		  mathMlVal = mathMlVal.replace(/<br\/>/gm, '\r\n');
              	            	  }
              	                }
              	                mathMlVal = mathMlVal.replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
              	                var theMathMl = '<span class="MathJax" id="MathJax-Element-feedback' + mathmlCounter + '-Frame" style=""><\/span>'+'<scr' + 'ipt type="math/mml" id="MathJax-Element-feedback' + mathmlCounter + '">' + mathMlVal + '<\/scr' + 'ipt>';
              	                $(this).before('<span class="mathMlWrapper">'+theMathMl+'</span>');
              	                $(this).remove();
              	            }
              	          });
              	          
              	          //Restoring the tags
              	          for(i=0;i<=$(this).length - 1;i++){
              		        if($(this)[i].nodeName){
              		          var tag = $(this)[i].nodeName.toLowerCase();
              		          textHint += '<' + tag + '>' + $(this).html();
              	     	      if (!imgChildren.length) {
              	     	            textHint += theMathMl;
              	     	      }
              	     	      textHint += '</' + tag + '>';
              		      	}
              		      }
              		    }else{
              		        //Restoring tags for elements not having fMath	
      			        	for(i=0;i<=$(this).length - 1;i++){
      			        	  if($(this)[i].nodeName){
      			        	    var tag = $(this)[i].nodeName.toLowerCase();
      	        		        textHint += '<' + tag + '>' + $(this).html() + '</' + tag + '>';
      		  	              }
      			        	}
              		     }
              	      }
              	    });
              	    responseElements = textHint;
              	    element.html('<div class="text-asset-contents">' + responseElements + '</div>');
              	  }
              	  else{
              		  element.html('<div class="text-asset-contents">' + insertedObjects[objectsIndex].asset_value + '</div>');
              	  }
              	  
                    //element.html('<div class="text-asset-contents">' + responseElements + '</div>');
                    if (!_.isUndefined(insertedObjects[objectsIndex].math) && insertedObjects[objectsIndex].math.length){
              	    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                    }
                    element.css('max-width','640px');
                break;
                case 'passage':
                    element.html(insertedObjects[objectsIndex].asset_value);
                    element.css('max-width', '640px');
                    break;
                case 'image':
                    element.html('<img src="' + insertedObjects[objectsIndex].asset_value + '" width="' + insertedObjects[objectsIndex].width + '" height="' + insertedObjects[objectsIndex].height + '" />');
                    break;
                case 'background':
                    element.html('<span style="display: table-cell; vertical-align: middle;"><img src="' + insertedObjects[objectsIndex].asset_value + '" style = "max-height : 496px;" /></span>');
                    insertedObjects[objectsIndex].left = 0;
                    insertedObjects[objectsIndex].top = 0;
                    break;
                case 'equation':
                    var mathMlVal = insertedObjects[objectsIndex].math[0].mathml.replace(/<br>/gm, '\r\n');
                    mathMlVal = mathMlVal.replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
                    var theMathMl = '<span class="MathJax" id="MathJax-Element-Asset-' + insertedObjects[objectsIndex].index + '-Frame" style=""><\/span>' +
                        '<scr' + 'ipt type="math/mml" id="MathJax-Element-Asset-' + insertedObjects[objectsIndex].index + '">' + mathMlVal + '<\/scr' + 'ipt>';
                    element.html(theMathMl);
                    MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
                    //element.html('<img src="' + insertedObjects[objectsIndex].asset_value + '" width="' + insertedObjects[objectsIndex].width + '" height="' + insertedObjects[objectsIndex].height + '" />');
                    break;
                case 'audio':
                    element.append('<div id="audio_object_' + insertedObjects[objectsIndex].index + '"><\/div>');

                    jwplayer('audio_object_' + insertedObjects[objectsIndex].index).setup({
                        file: insertedObjects[objectsIndex].asset_value,
                        height: insertedObjects[objectsIndex].height,
                        width: insertedObjects[objectsIndex].width
                    });
                    break;
                case 'video':
                    element.append('<div id="video_object_' + insertedObjects[objectsIndex].index + '"><\/div>');

                    jwplayer('video_object_' + insertedObjects[objectsIndex].index).setup({
                        file: insertedObjects[objectsIndex].asset_value,
                        title: insertedObjects[objectsIndex].asset_value,
                        autostart: false,
                        height: insertedObjects[objectsIndex].height,
                        width: insertedObjects[objectsIndex].width
                    });
                    break;
                }
                element.css({
                	position: 'absolute',
                    display: 'block',
                    'z-index': 50, 
                    left: insertedObjects[objectsIndex].left,
                    top: insertedObjects[objectsIndex].top,
                    width: insertedObjects[objectsIndex].width,
                    height: insertedObjects[objectsIndex].height,
                    'font-family': this.get('namespace').DDDEFAULTELEMENTFONTFAMILY,
                    'font-size': this.get('namespace').DDDEFAULTELEMENTFONTSIZE,
                    'font-style': this.get('namespace').DDDEFAULTELEMENTFONTSTYLE,
                    'transform': 'rotate(' + insertedObjects[objectsIndex].angle + 'deg)',
                    '-webkit-transform': 'rotate(' + insertedObjects[objectsIndex].angle + 'deg)translate3d(0,0,0)',
                    '-moz-transform': 'rotate(' + insertedObjects[objectsIndex].angle + 'deg)',
                    '-o-transform': 'rotate(' + insertedObjects[objectsIndex].angle + 'deg)',
                    '-ms-transform': 'rotate(' + insertedObjects[objectsIndex].angle + 'deg)'
                });
                //MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
                if ((insertedObjects[objectsIndex].asset_type === "image") || (insertedObjects[objectsIndex].asset_type === "equation")) {
                    element.css({
                        left: (insertedObjects[objectsIndex].left - insertedObjects[objectsIndex].width / 2),
                        top: (insertedObjects[objectsIndex].top - insertedObjects[objectsIndex].height / 2),
                    });
                }
                if ((insertedObjects[objectsIndex].asset_type === "video") || (insertedObjects[objectsIndex].asset_type === "audio")) {
                    element.css({
                        'z-index': 100
                    });
                }
                if (insertedObjects[objectsIndex].asset_type === "background") {
                    //#Offshore //Issue:952 666
                    //element.css({'width':'678px', 'height':'496px', 'text-align':'center', 'display':'table'});
                    //element.children().css({'max-height': '496px' ,'display':'block', 'margin':'auto'});
                }
                if (insertedObjects[objectsIndex].asset_type === "text") {
                	element.css({
                		width: insertedObjects[objectsIndex].width,
                		'line-height' : 'normal',
                		'font-size' : '20px',
                		'border' : '1px solid transparent'
                		/*'left' : (insertedObjects[objectsIndex].left + 7),
                		'top' : (insertedObjects[objectsIndex].top - 5)*/
                	});
                    //For Text with Bulletine
                	/*if (insertedObjects[objectsIndex].asset_value.indexOf('<ul>') > -1) {
                	    element.css({        	      
                	        'top': (insertedObjects[objectsIndex].top - 20)
                	    });
                	}*/
                }
                if (insertedObjects[objectsIndex].asset_type === "equation") {

                    if (!_.isUndefined(insertedObjects[objectsIndex].math)) {
                        if (insertedObjects[objectsIndex].math[0].mathml.indexOf('1.8') > -1) {
                            element.css({
                                'font-size': '11px',
                                'left': (parseInt($('#text_object_' + insertedObjects[objectsIndex].index).css('left'), 10) + 6),
                                'top': (parseInt($('#text_object_' + insertedObjects[objectsIndex].index).css('top'), 10) + 13)
                            });

                        } else {
                            element.css({
                                'font-size': '11px',
                                'left': (parseInt($('#text_object_' + insertedObjects[objectsIndex].index).css('left'), 10) - 8),
                                'top': (parseInt($('#text_object_' + insertedObjects[objectsIndex].index).css('top'), 10) + 8)
                            });

                        }
                    }

                }
            }
        }
    },
    /**
     * Load default view selection text if available
     **/
    defaultViewselection: function () {
        var currentData = this.get('namespace').canvas_controller.get('currentObject').get('initialData');
        var selectionText = false;
        if ((!_.isUndefined(currentData.assets_used)) && (currentData.assets_used)) {
            for (var asset_count = 0; asset_count < currentData.assets_used.length; asset_count++) {
                if (currentData.assets_used[asset_count].asset_type == "selection") {
                    var passage = currentData.assets_used[asset_count].text;
                    selectionText = true;
                }
            }
        }

        if (selectionText) {
            $('#app_header').css('z-index', '5');
            $('#app_exercise_container').append('<div id="app_selection_overlay" style="z-index: 499;"></div>');
           // $('body').append('<div id="app_selection_body_overlay" style="z-index: 40;"></div>');
            $('body').css('overflow', 'hidden');
            var waggleProperties = window.waggleui.model.getWaggleProperties();
            $('#app_exercise_container').append('<div id="app_selection_popup" class="passage"><a href="javascript:;" id="app_selection_close"><span id="close_button_text">'+waggleProperties['label.ams.passage.close']+'</span><span id="close_button_viewselection"></span></a><div id="app_selection_content">' + passage + '<div class="passage_end"></div></div></div>');
            $('#app_selection_popup').css({
                'width': '670px',
                'height': '496px',
                /* 'margin-top': '-285px', 'margin-left': '-475px',*/ 'z-index': '500'
            });
            //SHK
            var $images = $('#app_selection_content img'),
                preloaded = 0,
                total = $images.length;
            $images.load(function () {
                if (++preloaded === total) {
                    fleXenv.updateScrollBars();
                    fleXenv.initByClass('app_selection_content');
                }
            })
                .error(function () {
                    $(this).attr('src', 'no-image.jpg');
                });
            // console.log('Failed Answer Validation Item');
            setTimeout(function () {
                fleXenv.fleXcrollMain('app_selection_content');
            }, 500);


            $('#app_selection_close').click(function () {
                $('#app_header').css('z-index', '500');
                $('#app_selection_body_overlay').remove();
                $('#app_selection_overlay').remove();
                $('#app_selection_popup').remove();
                $('body').css('overflow', 'auto');
            })
        }
    },
    /**
     * set the current object using the canvas controller
     **/
    setCurrentObjectElement: function (currentObjectRecord) {
        this.set({
            currentObject: currentObjectRecord
        });
    },
    /*
     * Use the Minkowski sum to check for two objects overlapping
     */
    areObjectsOverlapping: function (object1, object2, returndistance) {
        //return object1.intersectsWithObject(object2);      This method doesn't always work.
        var w = 0.5 * (object1.width + object2.width * object2.scaleX); //0.5 value must not be changed, as it is part of the Minkowski sum formula
        var h = 0.5 * (object1.height + object2.height * object2.scaleY); //0.5 value must not be changed, as it is part of the Minkowski sum formula
        var dx = object1.left - object2.left;
        var dy = object1.top - object2.top;
        var they_are = (Math.abs(dx) <= w && Math.abs(dy) <= h);

        //optionally return the distance in pixels
        if (returndistance && they_are) return Math.sqrt(Math.pow(Math.abs(dx), 2) + Math.pow(Math.abs(dy), 2));

        return they_are;
    },
    /*
     * Load hint for current exercise
     */
    loadHint: function (index) {
    	//changes for text2Speech
    	if(typeof($rw_isSpeaking) == "function"){
    		if($rw_isSpeaking()){
        		$rw_stopSpeech();
        	}
    	}
    	$('#app_hint_overlay').html('');
        $('#app_hint_overlay').hide();

        if ((index > current_hint || index < 0) && (!this.get('exerciseSolved'))) {
            return;
        }
        var mathmlCounter = '';
        var hintsUsed = this.get('hintsUsed');
        // getting the hint content from stubbed
        var hintIndex = $.inArray(index - 1, this.get('hintsUsedIds'));
        /*if (hintIndex >= 0 && hintsUsed[index - 1].status != 'error') {
            var displayHint = hintsUsed[hintIndex];
        } else {
            //calling get hint
            var displayHint = getHint(index - 1, defData.id, defData.productID);

			var hint = displayHint;
			//Formula Spacing:#Issue769   //#OffShore
			if (!_.isUndefined(hint.math)) {
				jQuery.each(hint.math, function (index) {
					jQuery.each(hint.math[index], function (prop, val) {
						if (prop == "mathml") {
							if (val.indexOf('mspace') > -1) {
								var valWidth = $(val).find('mspace').attr('width')
								var regex = new RegExp(valWidth, "g");
								var replacedMathml = val.replace(regex, '2');
								hint.math[index].mathml = replacedMathml;
							}
						}
					});

				});
			}

			displayHint = hint;

			//SHK-Italicized text

			if (!_.isUndefined(displayHint.message)) {
				displayHint.message = AddSpaceSpecialCharNextToItalic(displayHint.message);
			}

            var hintsIds = this.get('hintsUsedIds');
            hintsUsed[index - 1] = displayHint;

            if (displayHint.status != 'error') {
                hintsIds.push(index - 1);
            }
            this.set({
                hintsUsed: hintsUsed,
                totalHintsUsed: hintsIds.length,
                hintsUsedIds: hintsIds
            });
        }*/
        
        /*var assignmentId = window.location.href.match(/assignmentId=.+/g)[0].match(/[^=]+/g)[1],
		currentAssignment = window.waggleui.services.getCurrentAssignment(assignmentId),
		userProfile = window.waggleui.model.getUserProfile(),
		itemInfo = window.waggleui.model.getAmsItem();*/
		var completeInfo = window.waggleui.model.getAmsStandAloneItem(),
			displayHint;
	    /*var preferenceObj = window.waggleui.model.getThisAssignmentList();    
	    var assignmentId = window.location.href.match(/assignmentId=\d+/g)[0].match(/\d+/g)[0];
	    preferenceObj.hintIndex = index;*/
		if(hint_collection['hint_data_'+index]){
			displayHint = hint_collection['hint_data_'+index];
		}else{
			/*var preferenceObj = {
					'studentId': userProfile.studentId,    
		        	'knewtonId': userProfile.knewtonId,
		        	'year': userProfile.year,
					'assignmentId': assignmentId,
					'studentAssignmentId': currentAssignment['info']['studentAssignmentId'],
					'goalId': currentAssignment['info']['goalId'],
					'knewtonGoalId': currentAssignment['info']['knewtonGoalId'],
					'knewtonLearningInstanceId': currentAssignment['info']['knewtonLearningInstanceId'],
					'knewtonRegistrationId': currentAssignment['info']['knewtonRegistrationId'],
					'hintIndex': index,
					'itemId': itemInfo.itemId,
					'activeTime': convertSecondsToHMS (itemSessionSecondsCount)
				};*/
			var preferenceObj = {
					'studentId': completeInfo['profile']['studentId'],    
		        	'knewtonId': completeInfo['profile']['knewtonId'],
		        	'year': completeInfo['profile']['year'],
					'assignmentId': completeInfo['assignment']['info']['assignmentId'],
					'studentAssignmentId': completeInfo['assignment']['info']['studentAssignmentId'],
					'goalId': completeInfo['assignment']['info']['goalId'],
					'knewtonGoalId': completeInfo['assignment']['info']['knewtonGoalId'],
					'knewtonLearningInstanceId': completeInfo['assignment']['info']['knewtonLearningInstanceId'],
					'knewtonRegistrationId': completeInfo['assignment']['info']['knewtonRegistrationId'],
					'hintIndex': index,
					'itemId': completeInfo['item']['itemId'],
					'activeTime': convertSecondsToHMS (itemSessionSecondsCount)
				};
			displayHint = window.waggleui.services.getHint(preferenceObj);
			hint_collection['hint_data_'+index] = displayHint;
		}
	  //Analytics
	    /*var analyticsRequestObject = window.waggleui.view.prepareAnalyticsObject ('label.am.hints');
	    window.waggleui.services.analyticsServiceTrackEvent(analyticsRequestObject);*/

        // if hint has audio and hint sound is not muted
        /*if (displayHint.audio && hints_sounds[index - 1]) {
            audiomanager.play(displayHint.audio);
        }*/
        // check if sound is muted to display appropriate icon
        var snd_sfx = hints_sounds[index - 1] ? 'on' : 'off';
        var hasMathjax = false;
        var hintElements = $(displayHint.message);
        //console.log(hintElements);
        if (!_.isUndefined(displayHint.math) && displayHint.math.length) {
            hasMathjax = true;
            var textHint = '';

            hintElements.each(function (index) {
                if ($(this)[0].nodeName != "#text") {
                    //var hasImages = false;
          		  var imgChildren = $(this).children('img');
          	        //Checking for fMath images inside <ul> and <ol> tags > JIRA Ticket #1392 
          	        if(($(this)[0].nodeName == "UL")||($(this)[0].nodeName == "OL")){
          	        	imgChildren = $(this).children('li').children('img');
          	        }
                    if (imgChildren.length /*&& !imgChildren.context == "text"*/ ) {
                        imgChildren.each(function (index) {
                            if ($(this).attr('math_id')) {
                                //hasImages = true;
                                mathmlCounter = $(this).attr('math_id');
                                for (var hint_mathmlCounter = 0; hint_mathmlCounter < displayHint.math.length; hint_mathmlCounter++) {
                                    if (displayHint.math[hint_mathmlCounter].id == mathmlCounter) {
          	            		  var mathMlVal = displayHint.math[hint_mathmlCounter].mathml.replace(/<br>/gm, '');
          	            		  mathMlVal = mathMlVal.replace(/<br\/>/gm, '');
                                    }
                                }
                                mathMlVal = mathMlVal.replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
                                var theMathMl = '<span class="MathJax" id="MathJax-Element-hint-' + mathmlCounter + '-Frame" style=""><\/span>' +
                                    '<scr' + 'ipt type="math/mml" id="MathJax-Element-hint-' + mathmlCounter + '">' + mathMlVal + '<\/scr' + 'ipt>';
          	              $(this).before('<span style="font-size:13px">'+theMathMl+'</span>');
                                $(this).remove();
                                //console.log($(this));
                            }
                        });
                        // console.log($(this)[0]);
          	        //Changing the code structure for restoring tags as part of JIRA Ticket #1392
                        for (i = 0; i <= $(this).length - 1; i++) {
              		        if($(this)[i].nodeName){
              		          var tag = $(this)[i].nodeName.toLowerCase();
              		          textHint += '<' + tag + '>' + $(this).html();
              	     	      if (!imgChildren.length) {
              	     	            textHint += theMathMl;
              	     	      }
              	     	      textHint += '</' + tag + '>';
              		      	}
              		      }
          	          
          	          /*for(i=0;i<=$(this).length - 1;i++){
                            if ($(this)[i].nodeName && $(this)[i].nodeName == "OL") {
                                textHint += '<ol>' + $(this).html();
                                if (!imgChildren.length) {
                                    textHint += theMathMl;
                                }
                                textHint += '</ol>';
                            } else {
                                textHint += '<p>' + $(this).html();
                                if (!imgChildren.length) {
                                    textHint += theMathMl;
                                }
                                textHint += '</p>';
                            }
          	          }*/
                    } else {
          	        	//Changing the code structure for restoring tags as part of JIRA Ticket #1392
                        for (i = 0; i <= $(this).length - 1; i++) {
          	        		if($(this)[i].nodeName){
      			        	    var tag = $(this)[i].nodeName.toLowerCase();
      	        		        textHint += '<' + tag + '>' + $(this).html() + '</' + tag + '>';
      		  	            }
      			        }
          	        	
          	        	/*for(i=0;i<=$(this).length - 1;i++){
                            if ($(this)[i].nodeName && $(this)[i].nodeName == "OL") {
                                textHint += '<ol>' + $(this).html();
                                textHint += '</ol>';
                            } else {
                                textHint += '<p>' + $(this).html();
                                textHint += '</p>';
                            }
              	          }*/

                        //if($(this).nodeName && $(this).nodeName == "P"){

                    }
                    /* textHint += '<p>' + $(this).html();
    	        if (!imgChildren.length) {
    	          textHint += theMathMl;
    	        }*/
                    //if($(this).nodeName && $(this).nodeName == "P"){

                    //} 
                }

            });
            hintElements = textHint;
        } else {
            var textHint = '';
            for (i = 0; i <= hintElements.length - 1; i++) {
          		/*if((hintElements[i].nodeName && hintElements[i].nodeName == "P")||(hintElements[i].nodeName && hintElements[i].nodeName == "UL")||(hintElements[i].nodeName && hintElements[i].nodeName == "OL")){
                    if (hintElements[i].nodeName && hintElements[i].nodeName == "OL") {
                        textHint += '<ol>' + hintElements[i].innerHTML + '</ol>';
                    } else {
                        textHint += '<p>' + hintElements[i].innerHTML + '</p>';
                    }
          		}*/
          		
          		//Changing the code structure for restoring tags as part of JIRA Ticket #1392
          		if(hintElements[i].nodeName && hintElements[i].nodeName != "#text"){			//Adding condition to check whether the node is a #text element - JIRA Ticket #1423 
              	    var tag = hintElements[i].nodeName.toLowerCase();
      		        textHint += '<' + tag + '>' + hintElements[i].innerHTML + '</' + tag + '>';
                }
            }
            hintElements = textHint;
        }

        /*currentView.renderHint(
            '<span id="hHeader">Hint ' + index + ': </span>' + '<span class = "hint-description">' + hintElements + '</span>', !_.isUndefined(displayHint.audio) ? '<a href="javascript:;" src="' + displayHint.audio + '" id="app_hint_snd"><img src="images/btn37x70-hint_snd_' + snd_sfx + '.png" border="0" /></a>' : '', !_.isUndefined(displayHint.overlay) ? displayHint.overlay : ''
        );*/
        
        currentView.renderHint(
                '<span id="hHeader">Hint ' + index + ': </span>' + '<span class = "hint-description" id="hintDescription">' + hintElements +'&nbsp;'+ '</span>', !_.isUndefined(displayHint.audio) ? '<a href="javascript:;" src="' + displayHint.audio + '" id="app_hint_snd" class="playActive"  ></a>' : '', !_.isUndefined(displayHint.overlay) ? displayHint.overlay : ''
        );

        // check if there's an overlay available and display it if yes
        if (!_.isUndefined(displayHint.overlay)) {
            $('#app_hint_overlay').show();
        }
        /*
         *  behaviours of the hint box items
         */
        $('#app_hint_close').click(function () {
            hideHint();
        });
        // mouse over effect for the hint close btn
        $('#app_hint_close img').hover(function () {
            $(this).animate({
                opacity: 0
            }, 150)
        }, function () {
            $(this).animate({
                opacity: 1
            }, 150)
        });
        // sound button behavior
        $('#app_hint_snd img').hover(function () {
            $(this).animate({
                'opacity': '0'
            }, 200)
        }, function () {
            $(this).animate({
                'opacity': '1'
            }, 200)
        });


        //changes for text2Speech
        // muting and enabling the sound for each hint
        /*$('#app_hint_snd').click(function () {
            if (hints_sounds[index - 1]) {
                $('#app_hint_snd img').attr('src', $('#app_hint_snd img').attr('src').replace(/on/, 'off'));
                hints_sounds[index - 1] = false;
            } else {
                $('#app_hint_snd img').attr('src', $('#app_hint_snd img').attr('src').replace(/off/, 'on'));
                hints_sounds[index - 1] = true;
                // if there is sound for the hint
                if (displayHint.audio) {
                    audiomanager.play(displayHint.audio);
                }
            }
        });*/
        
        if('ontouchstart' in window){
        	$('#app_hint_snd').bind("touchstart.text-speech-hint",function(e){
            	if($(this).hasClass('playActive')){
            		$(this).removeClass('playActive').addClass('playHover');
            	}
            	else{
            		$(this).removeClass('stopActive').addClass('stopHover');
            		$rw_stopSpeech();
            	}
            	
            });
            
            $('#app_hint_snd').bind("touchend.text-speech-hint",function(e){
            	if($(this).hasClass('playHover')){
            		$(this).removeClass('playHover').addClass('stopActive');
            		checkedStartSpeech('app_hint_body');
            	}
            	else{
            		$(this).removeClass('stopHover').addClass('playActive');
            		
            	}
            });
        }
        else{
        	
            $('#app_hint_snd').off("click.text-speech-hint").on("click.text-speech-hint",function(){
            	if($(this).hasClass('playHover')){
            		$(this).removeClass('playHover').addClass('stopActive');
            		checkedStartSpeech('app_hint_body');
            	}
            	else if($(this).hasClass('playActive')){
            		$(this).removeClass('playActive').addClass('stopActive');
            		checkedStartSpeech('app_hint_body');
            	}
            	else if($(this).hasClass('stopHover')){
            		$(this).removeClass('stopHover').addClass('playActive');
            		$rw_stopSpeech();
            	}
            	else if($(this).hasClass('stopActive')){
            		$(this).removeClass('stopActive').addClass('playActive');
            		$rw_stopSpeech();
            	}
            });
            
        	$('#app_hint_snd').bind("mouseover.text-speech-hint",function(e){
            	if($(this).hasClass('playActive')){
            		$(this).removeClass('playActive').addClass('playHover');
            	}
            	else if($(this).hasClass('stopActive')){
            		$(this).removeClass('stopActive').addClass('stopHover');
            	}
            	
            });
            
            $('#app_hint_snd').bind("mouseout.text-speech-hint",function(e){
            	if($(this).hasClass('playHover')){
            		$(this).removeClass('playHover').addClass('playActive');
            	}
            	else if($(this).hasClass('stopHover')){
            		$(this).removeClass('stopHover').addClass('stopActive');
            	}
            });
        }
        
        if (hasMathjax) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }
    },

    /*
     * Forward check answer response to appropriate object
     * @param response - response object
     *
     */
    parseCheckAnswerResponse: function (response) {
       
         var currentObject = this.get('currentObject'),
        	_this = this;
        if (_.isEmpty(currentObject)) {
            return;
        }
        
        if(currentObject.get('initialData').code == 'open-response'){
        	currentObject.showFeedback(response);
        	 $('#app_exercise_check').css('display', 'none');
             $('#app_exercise_next').css('display', 'block');
             this.set({exerciseSolved: true});
             // unlock all hints
             $('#app_hints_navigator ul li').removeClass('hint_active').addClass('hint_clickable');
        	return;
        }

        //INSERT MATHML Formula
        var hasMathjax = false;
        var responseElements = $(response.message);

        if (!_.isUndefined(response.math) && response.math.length) {
            hasMathjax = true;
            var textHint = '';

            responseElements.each(function (index) {
                if ($(this)[0].nodeName != "#text") {
                    //var hasImages = false;
                    var imgChildren = $(this).children('img');
              //Checking for fMath images inside <ul> and <ol> tags > JIRA Ticket #1392 
              if(($(this)[0].nodeName == "UL")||($(this)[0].nodeName == "OL")){
              	imgChildren = $(this).children('li').children('img');
              }
                    if (imgChildren.length) {
                        imgChildren.each(function (index) {
                            if ($(this).attr('math_id')) {
                                //hasImages = true;
                                var mathmlCounter = $(this).attr('math_id');
                                for (var feedback_mathmlCounter = 0; feedback_mathmlCounter < response.math.length; feedback_mathmlCounter++) {
                                    if (response.math[feedback_mathmlCounter].id == mathmlCounter) {
                  		  var mathMlVal = response.math[feedback_mathmlCounter].mathml.replace(/<br>/gm, '');
                  		  mathMlVal = mathMlVal.replace(/<br\/>/gm, '');
                                    }
                                }
                                mathMlVal = mathMlVal.replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
                                var theMathMl = '<span class="MathJax" id="MathJax-Element-feedback' + mathmlCounter + '-Frame" style=""><\/span>' +
                                    '<scr' + 'ipt type="math/mml" id="MathJax-Element-feedback' + mathmlCounter + '">' + mathMlVal + '<\/scr' + 'ipt>';
                    $(this).before('<span style="font-size:13px">'+theMathMl+'</span>');
                                $(this).remove();
                            }
                        });
                        //}
                        /*textHint += $(this).html();
        if (!hasImages) {
          textHint += theMathMl;
        }*/
                        // });

                        for (i = 0; i <= $(this).length - 1; i++) {
              	  	//Changing the code structure for restoring tags as part of JIRA Ticket #1392
      		        if($(this)[i].nodeName){
      		          var tag = $(this)[i].nodeName.toLowerCase();
      		          textHint += '<' + tag + '>' + $(this).html();
      	     	      if (!imgChildren.length) {
      	     	            textHint += theMathMl;
      	     	      }
      	     	      textHint += '</' + tag + '>';
      		      	}
      	      		/*if($(this)[i].nodeName && $(this)[i].nodeName == "OL"){
                                textHint += '<ol>' + $(this).html();
                                if (!imgChildren.length) {
                                    textHint += theMathMl;
                                }
                                textHint += '</ol>';
                            } else {
                                textHint += '<p>' + $(this).html();
                                if (!imgChildren.length) {
                                    textHint += theMathMl;
                                }
                                textHint += '</p>';
      	            }*/
                            }
                    } else {
      	        	//Changing the code structure for restoring tags as part of JIRA Ticket #1392
                        for (i = 0; i <= $(this).length - 1; i++) {
      	        		if($(this)[i].nodeName){		
      		        	    var tag = $(this)[i].nodeName.toLowerCase();
              		        textHint += '<' + tag + '>' + $(this).html() + '</' + tag + '>';
      	  	            }
      		        }
      	        	/*for(i=0;i<=$(this).length - 1;i++){
                            if ($(this)[i].nodeName && $(this)[i].nodeName == "OL") {
                                textHint += '<ol>' + $(this).html();
                                textHint += '</ol>';
                            } else {
                                textHint += '<p>' + $(this).html();
                                textHint += '</p>';
                            }
        	          }*/

                    }

                }
            });
            responseElements = textHint;
        } else {

            var textHint = '';
            for (i = 0; i <= responseElements.length - 1; i++) {
          		/*if((responseElements[i].nodeName && responseElements[i].nodeName == "P")||(responseElements[i].nodeName && responseElements[i].nodeName == "UL")||(responseElements[i].nodeName && responseElements[i].nodeName == "OL")){
                    if (responseElements[i].nodeName && responseElements[i].nodeName == "OL") {
                        textHint += '<ol>' + responseElements[i].innerHTML + '</ol>';
                    } else {
                        textHint += '<p>' + responseElements[i].innerHTML + '</p>';
                    }
          		}*/
          		
          		//Changing the code structure for restoring tags as part of JIRA Ticket #1392
          		if(responseElements[i].nodeName && (responseElements[i].nodeName != "#text")){		//Adding condition to check whether the node is a #text element - JIRA Ticket #1423
              	    var tag = responseElements[i].nodeName.toLowerCase();
      		        textHint += '<' + tag + '>' + responseElements[i].innerHTML + '</' + tag + '>';
                }
            }
            responseElements = textHint;
            //responseElements = responseElements.html();
        }
        //END INSERT MATHML Formula
        var sfx = '';
        //global feedback message
        if (response.state == 'correct') {
        	//grant flocks and rewards
            var pigsAwarded = _this.get('namespace').PIGSALLHINTSUSED;
            if (this.get('totalHintsUsed') == 0) {
              //no hints used
              pigsAwarded = _this.get('namespace').PIGSNOHINTSUSED;
            } else if (this.get('totalHintsUsed') <= parseInt(this.get('totalAvailableHints')/2)) {
              //0  to half hints used
              pigsAwarded = _this.get('namespace').PIGSHALFHINTSUSED;
            } else if (this.get('totalHintsUsed') < this.get('totalAvailableHints')) {
              //more than half, but not all hints used
              pigsAwarded = _this.get('namespace').PIGSLESSHINTSUSED;
            }
            showPigs(pigsAwarded);
        	
            sfx = '<span id="cAnswer">Yes!</span>';
            // answer is correct, can go to next question
            $('#app_exercise_check').css('display', 'none');
            $('#app_exercise_next').css('display', 'block');
            // set exercise status as solved to unlock the hints
            this.set({
                exerciseSolved: true
            });
            // unlock all hints
            $('#app_hints_navigator ul li').removeClass('hint_active').addClass('hint_clickable');
            /*to handle streak. To be removed when done by FG*/
            handleStreak(response);
        } else if(response.state == 'error') {
            var sfx = '<span id="wAnswer">Error!</span>';
        } else {
          var sfx = '<span id="wAnswer">Take another look</span>';
        }
        // check if there's a sound attached to the message
        // audio functionality removed when text 2 speech is introduced
        /*if (!_.isUndefined(response.sound)) {
            var sfx2 = isAudioOn() ? 'on' : 'off';
            sfx = '<a href="javascript:;" id="app_answer_snd"><img src="images/btn37x70-hint_snd_' + sfx2 + '.png" border="0" /></a>' + sfx;
            
            if (isAudioOn()) {
                try {
                    audiomanager.play(response.sound);
                } catch (exception) {
                    console.log('Play sound failed.');
                    console.log(exception);
                }
            }
        }*/
        sfx = '<a href="javascript:;" id="app_answer_snd" class="playActive"></a>' + sfx;
        var displayMess = sfx + '<span class = "hint-description">' + responseElements + "&nbsp;" + '</span>';

        if (response.state == 'error') {
            currentView.renderHint(displayMess);
        } else {
            currentView.renderHint(displayMess, '', !_.isUndefined(response.overlay) ? response.overlay : '');
        }

        //changes for text2Speech
        /*$('#app_answer_snd').click(function () {
            if (isAudioOn() && ($('#app_answer_snd img').attr('src').indexOf('off') > -1)) {
                $('#app_answer_snd img').attr('src', $('#app_answer_snd img').attr('src').replace(/off/, 'on'));
                audiomanager.play(response.sound);
            } else {
                $('#app_answer_snd img').attr('src', $('#app_answer_snd img').attr('src').replace(/on/, 'off'));
            }
        });*/
        
        if('ontouchstart' in window){
        	$('#app_answer_snd').bind("touchstart.text-speech-hint",function(e){
            	if($(this).hasClass('playActive')){
            		$(this).removeClass('playActive').addClass('playHover');
            	}
            	else{
            		$(this).removeClass('stopActive').addClass('stopHover');
            		$rw_stopSpeech();
            	}
            	
            });
            
            $('#app_answer_snd').bind("touchend.text-speech-hint",function(e){
            	if($(this).hasClass('playHover')){
            		$(this).removeClass('playHover').addClass('stopActive');
            		checkedStartSpeech('app_hint_body');
            	}
            	else{
            		$(this).removeClass('stopHover').addClass('playActive');
            		
            	}
            });
        }
        else{
        	
            $('#app_answer_snd').off("click.text-speech-hint").on("click.text-speech-hint",function(){
            	if($(this).hasClass('playHover')){
            		$(this).removeClass('playHover').addClass('stopActive');
            		checkedStartSpeech('app_hint_body');
            	}
            	else if($(this).hasClass('playActive')){
            		$(this).removeClass('playActive').addClass('stopActive');
            		checkedStartSpeech('app_hint_body');
            	}
            	else if($(this).hasClass('stopHover')){
            		$(this).removeClass('stopHover').addClass('playActive');
            		$rw_stopSpeech();
            	}
            	else if($(this).hasClass('stopActive')){
            		$(this).removeClass('stopActive').addClass('playActive');
            		$rw_stopSpeech();
            	}
            });
            
        	$('#app_answer_snd').bind("mouseover.text-speech-hint",function(e){
            	if($(this).hasClass('playActive')){
            		$(this).removeClass('playActive').addClass('playHover');
            	}
            	else if($(this).hasClass('stopActive')){
            		$(this).removeClass('stopActive').addClass('stopHover');
            	}
            	
            });
            
            $('#app_answer_snd').bind("mouseout.text-speech-hint",function(e){
            	if($(this).hasClass('playHover')){
            		$(this).removeClass('playHover').addClass('playActive');
            	}
            	else if($(this).hasClass('stopHover')){
            		$(this).removeClass('stopHover').addClass('stopActive');
            	}
            });
        }

        if (hasMathjax) {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
        }

        currentObject.parseResponse(response);
    },
    
    /*
     * 
     */
    parseSaveAnswerResponse : function(response){
	    currentObject = this.get('currentObject');
	  	if(currentObject.get('initialData').code == 'open-response'){
	  	  currentObject.showSaveFeedback(response);
	  	  return;
	    }
    },
    
    /*
     * Wrap a long text on multiple lines if longer than the speficied width
     * @param str string to wrap
     * @param width number - max number of characters that can fit on a line depending on the font and font size used for the text
     * @param brk string - string to insert as breaking point
     * @param cut boolean - true if a word should be cut
     *
     */
    textWrapping: function (str, width, brk, cut) {
        brk = brk || '\n';
        width = width || 16;
        cut = cut || false;

        if (!str) {
            return str;
        }

        var regex = '.{1,' + width + '}(\\s|$)' + (cut ? '|.{' + width + '}|.+$' : '|\\S+?(\\s|$)');

        return str.match(RegExp(regex, 'g')).join(brk);
    },
    /**
     * Create the hints container and animate it into view
     *
     **/
    animateHints: function () {
        var _this = this;
        var initialData = _this.get('currentObject').get('initialData');
        $('#app_exercise_navigator').animate({
            bottom: '0'
        }, 250, function () {
            var hint_pos = 400 - (45 * (_this.get('namespace').MAXHINTSNUMBER - existingHints));
            // create the hints dynamically
            var theHints = '';
            for (var hintsCounter = 0; hintsCounter < existingHints; hintsCounter++) {
                theHints += '<li id="app_h' + (hintsCounter + 1) + '" onclick="currentView.loadHint(' + (hintsCounter + 1) + ')"></li>';
            };
            theHints += '<li id="app_hint_caret"></li>';
            if (!_.isUndefined(initialData.hints_used) && initialData.hints_used) {
                current_hint = initialData.hints_used + 1;
            } else {
                current_hint = 1;
            }
            //$('#app_hints_navigator ul').html(theHints);
            if (!_this.get('exerciseSolved')) {
                $('#app_hints_navigator ul li#app_h' + current_hint).addClass('hint_active hint_clickable');
            }
            $('#app_hints_navigator').css('display', 'block');
            $('#app_hints_navigator').animate({
                right: hint_pos
            }, 300);
            var txtFx = setInterval(function () {
                if ($('#app_exercise_left').height() > 0) {
                    clearInterval(txtFx);
                    fleXenv.fleXcrollMain('app_exercise_left');
                }
            }, 250);
            for (var hintsCounter = 0; hintsCounter < initialData.hints_used; hintsCounter++) {
                $('#app_hints_navigator li#app_h' + (hintsCounter + 1)).addClass('hint_clickable');
            }

        })
    },
    /**
     * Gets available toolkit for current exercise and creates the HTML container
     **/
    createToolkit: function (subject) {
        var toolkit = '',
            _this = this;
        var itemData = this.get('currentObject').get('initialData');

        console.log(subject);
        switch(subject) {
          case 'math':
            // get toolkit based on the current item ID
            var theTools = getToolsAvailable(itemData.itemId);
            console.log('tools: ', theTools);
            var tools = [];
            var toolsList = '';
            var calcFields = '';
            for(var toolsCounter = 0; toolsCounter < theTools.length; toolsCounter++) {
                toolsList += '<li><a href="javascript:;" id="' + theTools[toolsCounter].type + '" onclick="showTools(\'' + theTools[toolsCounter].type + '\')">' + theTools[toolsCounter].label + '</a></li>';
                tools[theTools[toolsCounter].type] = theTools[toolsCounter].resource;
            }
            // if tools are available to the math exercise
            if(theTools.length > 0) {
              toolsList = calcFields + '<span id="tools">Tools:</span><ul>' + toolsList + '<li id="app_toolbox_caret"></li></ul><a href="javascript:;" id="app_toolbox_close"><img src="images/btn13x26-close_hint.png" border="0" style="opacity: 1;"></a>';
              toolkit += '<a href="javascript:;" onclick="showToolBox()" id="app_show_tools"></a><div id="app_toolbox">' + toolsList + '</div>';
              // attach tools to exercise
              itemData.tools = tools;
              this.get('currentObject').set({initialData: itemData});
            }
          break;
          case 'ELA':
        	  var theTools = getToolsAvailable(this.get('currentObject').get('id'));
        	  var tools = [];
              var toolsList = '';
              var calcFields = '';
        	  if(!_.isUndefined(itemData.assets_used) && itemData.assets_used) {
        	    	var selection = null;
        	        var assets = itemData.assets_used;
        	        for(var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
        	          if(assets[assetIndex].asset_type == "selection") {
        	            selection = assets[assetIndex];
        	          }
        	        }
        	        if((selection != null) && (!_.isUndefined(selection.asset_id))) {
        	          toolkit += '<a href="javascript:;" onclick="viewSelection()" id="app_view_selection" class="active"></a>';
        	        } else {
        	        	for(var toolsCounter = 0; toolsCounter < theTools.length; toolsCounter++) {
        	                toolsList += '<li><a href="javascript:;" id="' + theTools[toolsCounter].type + '" onclick="showTools(\'' + theTools[toolsCounter].type + '\')">' + theTools[toolsCounter].label + '</a></li>';
        	                tools[theTools[toolsCounter].type] = theTools[toolsCounter].resource;
        	            }
        	      	  if(theTools.length > 0) {
        	              toolsList = calcFields + '<span id="tools">Tools:</span><ul>' + toolsList + '<li id="app_toolbox_caret"></li></ul><a href="javascript:;" id="app_toolbox_close"><img src="images/btn13x26-close_hint.png" border="0" style="opacity: 1;"></a>';
        	              toolkit += '<a href="javascript:;" onclick="showToolBox()" id="app_show_tools"></a><div id="app_toolbox">' + toolsList + '</div>';
        	              // attach tools to exercise
        	              itemData.tools = tools;
        	              this.get('currentObject').set({initialData: itemData});
        	            }
        	        }
        	      }
          break;
        }

        //append toolkit container to HTML
        $('#toolkit_container').html(toolkit);
        $('#app_toolbox_close img').hover(function () {
            $(this).animate({
                opacity: 0
            }, 150)
        }, function () {
            $(this).animate({
                opacity: 1
            }, 150)
        });
        $('#app_toolbox_close').click(function () {
            $('#app_show_tools').toggleClass('active');
            $('#app_toolbox').toggle();
            $('#app_exercise_left').css('display', 'block');
        })
        //check if toolkit is not empty string
        if (toolkit != '') {
            $('#toolkit_container').delay(_this.get('namespace').TOOLBARDELAY).animate({
                bottom: '12'
            }, _this.get('namespace').TOOLBARANIMATIONDURATION);
        }

        function makeUnselectable(node) {
            if (node.nodeType == 1) {
                node.setAttribute("unselectable", "on");
            }
            var child = node.firstChild;
            while (child) {
                makeUnselectable(child);
                child = child.nextSibling;
            }
        }
        $('#app_exercise_container').addClass('unselectable');
        makeUnselectable($('#app_exercise_container'));
    },
    getAnswerData: function () {
        if (_.isEmpty(this.get('currentObject'))) {
            return {};
        }
        this.options.namespace.SUBMITFORMFLAG = true;
        var data = this.get('currentObject').submitForm();
        data.itemId = this.get('currentObject').get('initialData').id;
        if (!_.isUndefined(this.get('currentObject').get('initialData')) && (this.get('currentObject').get('initialData').code)) {
            data.am_code = this.get('currentObject').get('initialData').code;
        }
        if (!_.isUndefined(this.get('currentObject').get('initialData')) && (this.get('currentObject').get('initialData').answer_type)) {
            data.answer_type = this.get('currentObject').get('initialData').answer_type;
        }
        return data;
    }
});

function AddSpaceSpecialCharNextToItalic(source) {


    //SHK-Italicized text

    if (!_.isUndefined(source)) {
        if (source != null) {

            var regex1 = new RegExp('</em>;', "g");
            var replacedMessageSemicolon = source.replace(regex1, '</em> ;');
            source = replacedMessageSemicolon;

            var regex2 = new RegExp('</em>:', "g");
            var replacedAnswercolon = source.replace(regex2, '</em> :');
            source = replacedAnswercolon;

            var regex3 = new RegExp('</em>,', "g");
            var replacedHash = source.replace(regex3, '</em> ,');
            source = replacedHash;
        }

    }
    return source;
}

function sectionCompleteCallback(){
	 $rw_stopSpeech();
	 $('#app_hint_snd').removeClass('stopActive').addClass('playActive');
	 $('#app_answer_snd').removeClass('stopActive').addClass('playActive');
}