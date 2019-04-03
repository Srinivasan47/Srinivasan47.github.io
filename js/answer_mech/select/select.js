function select() {
    var namespace;
    var select;


    var Choice = Backbone.Model.extend({
        /*
         * Define the default values and the properties of this model
         */
        defaults: {
            id: 0,
            canvasId: 'canvas',
            initialData: '',
            namespace: {}
        },

        /*
         * Initialize current model
         */
        initialize: function (options) {

            this.options = _.extend(this.defaults, options);

            //set the canvas object
            if (!this.options.namespace.canvas_controller) {
                this.options.namespace.canvas_controller = new CanvasController({
                    canvasId: this.get('canvasId')
                });
                this.set({
                    canvas: this.options.namespace.canvas_controller.get('canvas')
                });
            } else if (!this.get('canvas')) {
                this.set({
                    canvas: this.options.namespace.canvas_controller.get('canvas')
                });
            }

            this.options.namespace.canvas_controller.clearCanvas();
            this.options.namespace.canvas_controller.setCurrentObjectElement(this);

            this.set({
                dataFile: this.get('initialData')
            });

            //load the provided set of Data to prepare the exercise
            this.loadInitialDataSet();
            //this.get('namespace').btn_reset.show();
            this.get('namespace').btn_reset.css('display','block');

        },

        /*
         * Check that initial data set is provided and load all info required for this exercise to run
         */
        loadInitialDataSet: function () {

            if (!this.get('initialData')) {
                currentView.renderHint('No data provided for current exercise');
                return;
            }

            var _this = this;

            //check if initial data format is object or string
            // get article data
            if (typeof this.get('initialData') == 'string') {

                //if string, read the file and get the initial data
                $.get(this.get('initialData'), function (data) { //parse js data
                    jsonObject = inputData.root;
                    _this.set('initialData', jsonObject);
                    _this.load_data(jsonObject);

                });

            } else {

                //if object, preload the values
                _this.load_data(this.get('initialData'));
            }
        },


        /**
         * Add answer UI elements
         * @param array array - array to add objects to
         * @param object - fabric.js object to be added
         * @param value int - answer index
         */
        add_answer_object: function (array, object, value) {
            object.hasControls = object.hasBorders = false;
            object.lockMovementX = true;
            object.lockMovementY = true;
            object.clickedValue = value;
            array.push(object);
            canvas.add(object);
        },

        /**
         * Render HTML answer options on canvas
         * @param {object} data - initial data
         */

        /*renderHTMLOptions: function (data) {
            var _this = this;
            var theOptions = '';
            var sfx = '';
            var start = 65;

            if (data.answer_label != "alpha") {
                start = 49;
            };

            if (data.answer_label == "none") {
                sfx = ' class="none"';
            };

            for (var i = 0; i < data.choices_available_answers.answer.length; i++) {
                var newOpt = (data && data.choices_available_answers && data.choices_available_answers.answer) ? data.choices_available_answers.answer[i].payload : '';
                theOptions += '<li id="blt_' + (String.fromCharCode(start + i)) + '"' + sfx + '><span></span><div>' + newOpt + '</div><div class="tick-mark hide"></div></li>';
            };

            this.get('namespace').answer_options.find('ul').html(theOptions);

        },*/
        
        /*
         * Adds student response when required
         */
        addStudentResponse: function () {
        	var data = this.get('initialData') ? this.get('initialData') : {};
            var selectedAnsewers = (data && data.selected_answers) ? data.selected_answers : [];
            this.set({
                current_selection: selectedAnsewers
            });
            for (var i = 0; i < selectedAnsewers.length; i++) {
                $(this.get('namespace').answer_options.find('li')[selectedAnsewers[i].index]).addClass('current');
            }
        },
        
        /*
         * Making answer options selectable
         */
        answersSelectable: function () {
        	var data = this.get('initialData') ? this.get('initialData') : {};
            var start = 65;
            if (data.answer_label != "alpha") {
                start = 49;
            };
            var _this = this;
            this.get('namespace').answer_options.find('li').click(function () {
                _this.get('namespace').answer_options.find('li').removeClass('current');
                $(this).toggleClass('current');
                var selected_answers = [];
                var answers = {};
                var answer = $(this).attr('id').replace(/blt_/, '');
                answers.label = answer;
                answers.index = answer.charCodeAt(0) - start;
                answers.text = $('div', this).html();
                selected_answers.length = 0;
                selected_answers.push(answers);
                _this.set({
                    current_selection: selected_answers
                });
            })
        },
        
        /**
         * Define the method called once the xml data is retrieved or after the json data is defined
         * @param {object} data - initial data
         **/
        load_data: function (data) {
            var _this = this;
            //render article
            _this.renderArticle(data, !_.isUndefined(_this.get('isAuthoringTool')));
            _this.options.namespace.canvas_controller.defaultViewselection();

            //render question group
            var questionGroup = this.options.namespace.canvas_controller.renderQuestionHTML(data);
            // change the default max_hints to exercise's hints number
            existingHints = data ? data.hints_total : this.options.namespace.MINHINTSNUMBER;
            this.options.namespace.canvas_controller.set({
                totalAvailableHints: existingHints
            });
            this.renderHTMLOptions(data);
            //this.addStudentResponse();
            //this.answersSelectable();
            //setTimeout(function(){fleXenv.fleXcrollMain('question_area_html');}, 500)

            canvas.renderAll();

            //handling click/touch
            canvas.observe('mouse:down', function (evt) {
                if (!evt.target) return;
                if (jQuery.inArray(evt.target, answer_elements) > -1) {
                    _this.selectAnswer(evt.target);
                }
            });
        },

        /*
         * Generate a scrollable text element
         * @param {string} long_text - initial text to load
         */

        generateLongText: function (long_text) {
            var container = $('.scrollable_text');
            if (container.length < 1) {
                container = $('<div class="scrollable_text passage" id="app_exercise_left"><div class="line_numbers"></div><div class="passage"></div><div class="passage_clear"></div></div>');
                container.appendTo('.canvas-container');
            }
            $('.passage', container).html(long_text);

            var max_text_height = $('.canvas-container .scrollable_text .passage').height();
            $('.canvas-container .scrollable_text .line_numbers').height(max_text_height);
        },

        /*
         * Define the left column area, fill it with the reference article, load the default CSS properties
         * @param {object} initialData - initial data
         * @param {bool} allowEdit - true if article text can be edited
         */

        renderArticle: function (initialData, allowEdit) {
            if (!initialData) {
                currentView.renderHint('Render article: no data');
                return;
            }
            canvas = this.options.namespace.canvas_controller.get('canvas');
            // getting text from json
            if (!_.isUndefined(initialData.assets_used) && initialData.assets_used) {
                var assets = initialData.assets_used;
                var passage = null;
                for (var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
                    if (assets[assetIndex].asset_type == "passage") {
                        passage = assets[assetIndex];
                    }
                }
                if (passage != null && (!_.isUndefined(passage.text)) && passage.text) {
                    this.generateLongText(passage.text);
                }
            }
        },
        /*
         * Load hint for current exercise
         * @param {number} index - index of the loaded hint
         */
        loadHint: function (index) {
            if (this.get('initialData')) {
                this.options.namespace.canvas_controller.loadHint(index);
            } else {
                currentView.renderHint('No hints available - loading hint');
            }
        },
        /*
         * Submit the choices to the server
         */
        submitForm: function () {
            return {
                selected_answers: this.get('current_selection'),
                hints_used: this.options.namespace.canvas_controller.get('totalHintsUsed')
            }
        },
        /*
         * Parse check answer response
         * Should pop up the corresponding message
         * @param response - response object
         */
        parseResponse: function (response) {},

        /**
         * Remove all the answers added so far
         */
        resetQuestionForm: function () {

            this.get('namespace').answer_options.find('li').removeClass('current');
            if (!_.isUndefined(this.get('current_selection'))) {
                this.set({
                    current_selection: undefined
                });
            }
        },




    });




    /**
     * MultiSelect Model
     * Class that defines the multiselect model properties
     **/
    var MultiSelect = Choice.extend({
        renderHTMLOptions: function (data) {
            var _this = this;
            var theOptions = '';
            var sfx = '';
            var start = 65;
            if (data.answer_label != "alpha") {
                start = 49;
            };
            if (data.answer_label == "none") {
                sfx = ' class="none"';
            };
            if(data && data.select_available_answers && data.select_available_answers.answer) {
            for (var i = 0; i < data.select_available_answers.answer.length; i++) {
                	var newOpt = data.select_available_answers.answer[i].payload;
                	var responseElements = $(newOpt);
                	if(!_.isEmpty(data.select_available_answers.answer[i].math)){
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
            	                for(var text_mathmlCounter = 0; text_mathmlCounter < data.select_available_answers.answer[i].math.length; text_mathmlCounter++){
            	            	  if(data.select_available_answers.answer[i].math[text_mathmlCounter].id == mathmlCounter){
            	            		  var mathMlVal = data.select_available_answers.answer[i].math[text_mathmlCounter].mathml.replace(/<br>/gm, '');
            	            		  mathMlVal = mathMlVal.replace(/<br\/>/gm, '');
            	            	  }
            	                }
            	                mathMlVal = mathMlVal.replace(/<math>/, '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">');
            	                var theMathMl = '<span class="MathJax" id="MathJax-Element-answer-options-span' + mathmlCounter + '-Frame" style=""><\/span>'+'<scr' + 'ipt type="math/mml" id="MathJax-Element-answer-options-select' + mathmlCounter + '">' + mathMlVal + '<\/scr' + 'ipt>';
            	                $(this).before('<span class="mathMlWrapper">'+theMathMl+'</span>');
            	                $(this).remove();
            	            }
            	          });
            	          
            	          //Restoring the tags
            	          for(var idx=0;idx<=$(this).length - 1;idx++){
            		        if($(this)[idx].nodeName){
            		          var tag = $(this)[idx].nodeName.toLowerCase();
            		          textHint += '<' + tag + '>' + $(this).html();
            	     	      if (!imgChildren.length) {
            	     	            textHint += theMathMl;
            	     	      }
            	     	      textHint += '</' + tag + '>';
            		      	}
            		      }
            		    }else{
            		        //Restoring tags for elements not having fMath	
            	        	for(var idx=0;idx<=$(this).length - 1;idx++){
            	        	  if($(this)[idx].nodeName){
            	        	    var tag = $(this)[idx].nodeName.toLowerCase();
                		        textHint += '<' + tag + '>' + $(this).html() + '</' + tag + '>';
              	              }
            	        	}
            		     }
            	      }
            	    });
            	    newOpt = textHint;
                  }
                	theOptions += '<li id="blt_' + (String.fromCharCode(start+i)) + '"' + sfx + '><span class="blt"></span><div>' + newOpt + '</div></li>';
                }
            }
            this.get('namespace').answer_options.find('ul').html(theOptions);
            MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

            if (!_.isUndefined(_this.get('current_selection'))) {
                var selected_answers = _this.get('current_selection');
            } else {
                var selected_answers = [];
                _this.set({
                    current_selection: selected_answers
                });
            }

        },
        answersSelectable: function () {
            var data = this.get('initialData');
            var _this = this;
            var start = 65;
            if (data.answer_label != "alpha") {
                start = 49;
            };

            this.get('namespace').answer_options.find('li').click(function () {
                if (!_.isUndefined(_this.get('current_selection'))) {
                    var selected_answers = _this.get('current_selection');
                } else {
                    var selected_answers = [];
                    _this.set({
                        current_selection: selected_answers
                    });
                }
                var answers = {};
                // we select/unselect the option
                $(this).toggleClass('current');
                var answer = $(this).attr('id').replace(/blt_/, '');
                //answers.label = answer;
                answers.index = answer.charCodeAt(0) - start;
                //answers.text = $('div', this).html();
                // if it's selected
                if ($(this).hasClass('current')) {
                    var added = false;
                    // we test to see if it's already added or not
                    for (var answerIndex = 0; answerIndex < selected_answers.length; answerIndex++) {
                        if (selected_answers[answerIndex].index == answers.index) {
                            added = true;
                        }
                    }
                    // if it's not already in the answer array
                    if (!added) {
                        selected_answers.push(answers);
                    }
                    // if it's not selected
                } else {
                    var position = -1;
                    // we test it's presence in the array
                    for (var answerIndex = 0; answerIndex < selected_answers.length; answerIndex++) {
                        if (selected_answers[answerIndex].index == answers.index) {
                            position = answerIndex;
                        }
                    }
                    // if it's in the answer array
                    if (position != -1) {
                        // we remove the option from the array
                        selected_answers.splice(position, 1);
                    }
                }
                _this.set({
                    current_selection: selected_answers
                });
            })
        },

        "displayAnswer": displayAnswer,
        "getUserResponse": getUserResponse



    });



    /**
     * Choices Screen View
     * Class that controls the Choices exercises
     **/
    var ChoicesView = Backbone.View.extend({
        // We can pass it default values.
        defaults: {
            canvasId: 'canvas_ch',
            //path to demo data file used in current demo
            demoData: ''
        },
        /**
         * Initialize the view
         * @params {object} options - Object defining the options used to initialize the current model
         */
        initialize: function (options) {
            /* choice = null;
	    drag_drop = null;
	    math_graph = null;
	    
	    canvas_controller = null;*/
            //$('canvas.upper-canvas').remove();
            currentView = this;
            this.options = _.extend(this.defaults, options);
            this.render();
            this.afterRender();
        },
        /**
         * Render current view items
         */
        render: function () {
            // Compile the template using underscore
            var template = _.template($("#canvas_template").html(), {
                canvas_id: this.options.canvasId
            });
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);

        },
        /**
         * After the canvas is rendered create the controls and listeners
         */
        afterRender: function () {

            var namespace = this.options.namespace;
            namespace.canvas_controller = new CanvasController({
                canvasId: 'canvas_ch',
                questionLineLength: 29,
                questionLineHeight: 1.2,
                namespace: namespace
            });

            //Pass variables in using Underscore.js Template
            // var variables = {};
            // Compile the template using underscore
            // var template4 = _.template( $("#toolkit_template").html(), variables );
            //place action template in app_header div
            // $('#toolkit_container').html( template4 );

            choice = new Choice({
                canvasId: this.options.canvasId,
                initialData: this.options.demoData,
                namespace: this.options.namespace
            });

        },
        /**
         * Render hint HTML
         * @params {string} text - text of the hint
         * @params {string} sound - path of the hint audio file
         * @params {string} image - path of the hint image file
         */

        renderHint: function (text, sound, image) {
            //Pass variables in using Underscore.js Template

            var variables = {
                hint_message: text,
                hint_audio: sound
            };
            // Compile the template using underscore
            var template = _.template($("#hintbox_template").html(), variables);
            //place template inside hintbox div
            $('#app_hint').html(template);
            if (image) {
                var variables2 = {
                    hint_sketch: image
                };
                var template2 = _.template($("#hintbox_overlay_template").html(), variables2);
                $('#app_hint_overlay').html(template2);
                $('#app_hint_overlay').css('display', 'block');
            }
        },
        /**
         * Load hint by index
         * @params {number} index - index of the loaded hint
         */
        loadHint: function (index) {
            choice.loadHint(index);
            displayHintbox(index);
        }
    });



    function displayAnswer(options) {

    	var info;
        info = (options && options.correct_answers) ? options.correct_answers : [];
        if (!_.isEmpty(info)) {
        	namespace.answer_options.find('li').removeClass('current');
        	namespace.answer_options.find('li').addClass('incorrect');
            for (var i = 0; i < info.length; i++) {
                //namespace.answer_options.find('li div.tick-mark:eq(' + (info[i].index) + ')').toggleClass('hide');
            	namespace.answer_options.find('li:nth-child('+(parseInt(info[i].index) + 1)+')').removeClass('incorrect');
            	namespace.answer_options.find('li:nth-child('+(parseInt(info[i].index) + 1)+')').addClass('correct');
            }

        } else {
           // namespace.answer_options.find('li div.tick-mark').addClass('hide');
        	namespace.answer_options.find('li').removeClass('incorrect');
        	namespace.answer_options.find('li').removeClass('correct');
        	select.addStudentResponse();
        }
    }

    function getUserResponse() {

        var response = namespace.canvas_controller.get('currentObject').submitForm();
        if (!_.isUndefined(response) && response.selected_answers) {
            var responseObj = {
                am_code: "select",
                answer_type: "multiple",
                hints_used: response.hints_used,
                selected_answers: response.selected_answers
            };

            console.log(responseObj);

            return responseObj;

        } else {
            console.log("no answer selected");
        }
    }




    /**
     * Choices Screen View
     * Class that controls the Choices exercises
     **/
    var MultiSelectView = ChoicesView.extend({
        // We can pass it default values.
        defaults: {
            canvasId: 'canvas_sl',
            //path to demo data file used in current demo
            demoData: ''
        },
        render: function () {
            // Compile the template using underscore
            var template = _.template($("#canvas_template").html(), {
                canvas_id: this.options.canvasId
            });
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);

        },
        //after the canvas is rendered create the controls and listeners
        afterRender: function () {
            namespace = this.options.namespace;
            namespace.canvas_controller = new CanvasController({
                canvasId: 'canvas_sl',
                namespace: this.options.namespace
            });
            select = new MultiSelect({
                canvasId: this.options.canvasId,
                initialData: this.options.demoData,
                namespace: this.options.namespace
            });

        },
        loadHint: function (index) {
            select.loadHint(index);
            displayHintbox(index);
        }
    });

    /**
     *  Check my answers method
     *  Will post the hot spots to the server
     **/
    function check_select() {
        if (select) {
            select.submitForm();
        } else {
            alert('Select not found');
        }
    }


    this.MultiSelectView = MultiSelectView;
    this.MultiSelect = MultiSelect;
    this.displayAnswer = displayAnswer;
    this.getUserResponse = getUserResponse;
}