function embeddedText() {
    var namespace;

    /**
     * Embedded Text Model
     * Class that defines the embedded Text model properties
     **/
    var EmbeddedText = Backbone.Model.extend({
        /*
         * Define the default values and the properties of this model
         */
        defaults: {
            //hardcoded default value 0 for initial object id - DO NOT CHANGE THIS VALUE
            id: 0,
            canvasId: 'canvas_et',
            // track for the current option
            activeOption: null,
            //json containing the path to the file containing the initial data used for the exercise
            initialData: ''
        },
        initialize: function (options) {
            //options should contain the ID of the exercise to Edit or no ID if adding new exercise
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

            //if ID present in options object, we are editing an existing exercise
            //We load the image used and all the hot spots defined
            if (!_.isUndefined(options.id) && options.id) {
                this.set({
                    id: options.id
                });
                //load the provided set of Data to prepare the exercise
                this.loadInitialDataSet();
            }
            //this.get('namespace').btn_reset.show();
            this.get('namespace').btn_reset.css('display','block');
        },
        /*
         * Check that initial data set is provided and load all info required for this exercise to run
         */
        loadInitialDataSet: function () {
            if (!this.get('initialData')) {
                alert('No data provided for current exercise');
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
                    load_data(jsonObject);
                });
            } else {
                //if object, preload the values
                load_data(this.get('initialData'));
            }
            /**
             * Define the method called once the xml data is retrieved or after the json data is defined
             * */
            function load_data(data) {
                if (data.instructional_prompt == 'Type instructional prompt' || data.instructional_prompt == '') {
                    data.instructional_prompt = _this.options.namespace.DEFAULTEMBEDDEDTEXTINSTRUCTIONALPROMPT;
                    _this.set('initialData', data);
                }
                if (data.mechanical_prompt == 'Click or tap on an answer' || data.mechanical_prompt == '') {
                    data.mechanical_prompt = _this.options.namespace.DEFAULTEMBEDDEDTEXTMECHANICALPROMPT;
                    _this.set('initialData', data);
                }

                _this.options.namespace.canvas_controller.renderQuestionHTML(data);
                //setTimeout(function(){fleXenv.fleXcrollMain('question_area_html');}, 500)
                _this.options.namespace.canvas_controller.defaultViewselection();
                //hint box numbers 
                // var hints = data.hints.hint;
                // change the default max_hints to exercise's hints number
                // existingHints = hints.length;
                existingHints = data.hints_total;
                _this.options.namespace.canvas_controller.set({
                    totalAvailableHints: existingHints
                });
                $('#app_hints_navigator li#app_h1').addClass('hint_clickable');

                // loads existing available answers
                _this.loadFields(data);
            }
        },
        loadFields: function (data) {
            var out = '';
            var answers = data.embed_in_text_available_answers.answer;
            var passage = null;
            var _this = this;
            if (!_.isUndefined(data.assets_used) && data.assets_used) {
                var assets = data.assets_used;
                for (var assetIndex = 0; assetIndex < assets.length; assetIndex++) {
                    if (assets[assetIndex].asset_type == "passage") {
                        passage = assets[assetIndex];
                    }
                }
                if (passage != null) {
                    if (_.isUndefined(passage.start)) {
                        passage.start = 0;
                    }
                    if (_.isUndefined(passage.end)) {
                        //        passage.end = strlen(passage.text.replace(/(<([^>]+)>)/ig,""));
                        passage.end = strlen(_this.options.namespace.returnStrippedHtml(passage.text));
                    }
                }
            }
            //    var text = !_.isUndefined(data.custom_text) && data.custom_text ? data.custom_text : (passage != null && !_.isUndefined(passage.text) ? passage.text.replace(/(<([^>]+)>)/ig,"").substring(passage.start, passage.end) : '');
            var text = !_.isUndefined(data.custom_text) && data.custom_text ? data.custom_text : (passage != null && !_.isUndefined(passage.text) ? _this.options.namespace.returnStrippedHtml(passage.text).replace(new RegExp("\r\n", "g"), '\n').replace(/(\n\s*)+/ig, '\n').substring(passage.start, passage.end) : '');
            while (text.charAt(0) == '\n') {
                text = text.substring(1);
            }
            // add original index to the object
            for (var answerIndex = 0; answerIndex < answers.length; answerIndex++) {
                answers[answerIndex].index = answerIndex;
            }
            // sort the array by answers positions
            answers.sort(function (a, b) {
                var a1 = a.position,
                    b1 = b.position;
                if (a1 == b1) return 0;
                return a1 > b1 ? 1 : -1;
            });
            var offset = 0;
            for (var answerIndex = 0; answerIndex < answers.length; answerIndex++) {
                var out = '';
                if (answers[answerIndex].position == -1) {
                    continue;
                }
                if (answers[answerIndex].type == "select") {
                    out += ' <select id="field' + answers[answerIndex].index + '" class="embed_answers" name="answer[]">';
                    var options = answers[answerIndex].options;
                    out += '<option value="">Choose</option>';
                    if (options.length) {
                        for (var optionsIndex = 0; optionsIndex < options.length; optionsIndex++) {
                            out += '<option id="selectOption_' + answerIndex + '_' + optionsIndex + '" value="">' + options[optionsIndex] + '</option>';
                        }
                    }
                    out += '</select> ';

                } else {
                    var length_sfx = '';
                    var field_length = '';
                    if (data.restrict_length == true) {
                        length_sfx += ' maxlength=' + answers[answerIndex].maxlength;
                        field_length = ' style="width: ' + ((answers[answerIndex].maxlength * _this.options.namespace.ARTICLEFONTSIZE * 0.8) + 10) + 'px"';
                    }
                    out += ' <input id="field' + answers[answerIndex].index + '" class="embed_answers" name="answer[]" type="text"' + length_sfx + field_length + ' /> ';
                    //        out += '<input id="field' + answers[answerIndex].index + '" class="embed_answers" name="answer[]" type="text" />';
                }
                var position = answers[answerIndex].position;
                position += offset;
                var endVal = text.substring(position);
                if (answers[answerIndex].replaced) {
                    endVal = endVal.replace(answers[answerIndex].replaced, "");
                }
                var newValue = text.substring(0, position) + out + endVal;
                text = newValue;
                if (!_.isUndefined(answers[answerIndex].replaced) && (answers[answerIndex].replaced != null))
                    offset += (out.length - (answers[answerIndex].replaced.length));
                else
                    offset += out.length;
            }
            text = text.replace(/\n/gi, '<br />')
            // create the textarea with the text to be edited
            this.get('namespace').canvas_container.append('<div id="embed_text_container" style="width: 630px; height: ' + (_this.options.namespace.CANVASHEIGHT - 2 * _this.options.namespace.SOFTPADDING) + 'px; border: 0; position: absolute; top: 0; left: 0; padding: ' + _this.options.namespace.SOFTPADDING + 'px ' + _this.options.namespace.SOFTPADDING + 'px; font-size: ' + _this.options.namespace.ARTICLEFONTSIZE + 'px; line-height: ' + _this.options.namespace.EMBEDDEDTEXTLINEHEIGHT + 'px;z-index: 5000;">' + text + '</div>');

            for (var answerIndex = 0; answerIndex < answers.length; answerIndex++) {
                if (answers[answerIndex].position == -1) {
                    continue;
                }
                if (answers[answerIndex].type == "select") {
                    var options = answers[answerIndex].options;
                    for (var optionsIndex = 0; optionsIndex < options.length; optionsIndex++) {
                        $('#selectOption_' + answerIndex + '_' + optionsIndex).val(options[optionsIndex]);
                    }
                }
            }
            var txtFx = setInterval(function () {
                if ($('#embed_text_container').height() > 0) {
                    clearInterval(txtFx);
                    fleXenv.fleXcrollMain('embed_text_container');
                }
            }, _this.options.namespace.FLEXSCROLLINTERVAL);
            $('.embed_answers').uniform();

        },
        /*
         * Load hint for current exercise
         */
        loadHint: function (index) {
            if (this.get('initialData')) {
                this.options.namespace.canvas_controller.loadHint(index);
            } else {
                currentView.renderHint('No hints available - loading hint');
            }
        },


        /*
         * Render student response on canvas
         */
        addStudentResponse: function () {
            var data = this.get('initialData'),
                selectedAnswers = (data && data.selected_answers) ? data.selected_answers : [];
            if (selectedAnswers.length != 0) {
                selectedAnswers.sort(function (a, b) {
                    var a1 = a.index,
                        b1 = b.index;
                    if (a1 == b1) return 0;
                    return a1 > b1 ? 1 : -1;
                });
                $('.embed_answers').each(function () {
                    answerIndex = parseInt($(this).attr('id').replace('field', ''));
                    $(this).val(selectedAnswers[answerIndex].text);
                    $.uniform.update(this);

                });
            }
        },

        /*
         *
         */
        disableFields: function () {
            $('.embed_answers').each(function () {
                if (this.nodeName == 'SELECT') {
                    $(this).children('option').prop('disabled', true);
                } else {
                    $(this).prop('readonly', true);
                }
            });
        },

        //submit the choices to the server
        submitForm: function () {
            var answers = [];
            var allAnswered = true;
            var _this = this;
            $('.embed_answers').each(function () {
                if ($(this).val().trim()) {
                    var answer = {};
                    $(this).prop('tagName') == 'INPUT' ? answer.type = 'input' : answer.type = 'select';
                    if ($(this).prop('tagName') == 'SELECT') {
                        // HARDCODED 1 to remove the first option ( Choose ) from the answer index count; DO NOT CHANGE
                        answer.answer_index = $(this).prop('selectedIndex') - 1;
                    }
                    answer.index = parseInt($(this).attr('id').replace('field', ''));
                    answer.text = $(this).val();
                    answers.push(answer);
                } else {
                    allAnswered = false;
                }
            })
            if (!allAnswered && namespace.SUBMITFORMFLAG)
                answers = [];
            return {
                selected_answers: answers,
                hints_used: this.options.namespace.canvas_controller.get('totalHintsUsed')
            }
        },
        /*
         * Parse check answer response
         * Should pop up the corresponding message
         * @param response - response object
         */
        parseResponse: function (response) {},

        resetQuestionForm: function () {
            $('.embed_answers').val('');
            $('.embed_answers').prop('selectedIndex', 0);
            $('.embed_answers').click();

        },

        "getUserResponse": getUserResponse

    });




    /**
     * Displays and hides correct answer
     * @params [array] options - correct answers data
     */
    function displayAnswerBase(options) {
        field_text.resetQuestionForm();
        var correctAnswers = (options && options.correct_answers) ? options.correct_answers : [];
        correctAnswers.sort(function (a, b) {
            var a1 = a.index,
                b1 = b.index;
            if (a1 == b1) return 0;
            return a1 > b1 ? 1 : -1;
        });
        $('.embed_answers').each(function () {
        	var answerIndex = parseInt($(this).attr('id').replace('field', ''));
             correctAnswerValue = correctAnswers[answerIndex] ? correctAnswers[answerIndex].value[0] : "";
            $(this).val(correctAnswerValue);
            $.uniform.update(this);
        });
    }




    function getUserResponse() {

        var response = namespace.canvas_controller.get('currentObject').submitForm();
        if (response.selected_answers) {
            var responseObj = {
                am_code: "embed-in-text",
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
     * Embedded Text View
     * Class that controls the Embedded Text exercises
     **/
    var EmbeddedTextView = Backbone.View.extend({
        defaults: {
            id: 0,
            //set canvas id
            canvasId: 'canvas_et',
            //path to demo data file used in current demo
            demoData: ''
        },
        initialize: function (options) {
            //reset all global vars
            if (this.options.namespace.canvas_controller) {
                this.options.namespace.canvas_controller.get('canvas').clear();
            }
            //canvas_controller = hot_spot = choice = select = math_graph = field_text = field_image = drag_drop = open_response =null;
            currentView = this;
            $('canvas.upper-canvas').remove();
            this.options = _.extend(this.defaults, options);
            this.render();
            this.afterRender();
        },
        /*
         * Load the canvas template used on the hot spot demo
         */
        render: function () {
            // Compile the template using underscore
            var template = _.template($("#canvas_template").html(), {
                canvas_id: this.defaults.canvasId
            });
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);
        },
        afterRender: function () {

            namespace = this.options.namespace;
            namespace.canvas_controller = new CanvasController({
                canvasId: this.options.canvasId,
                maxWorkzoneLimit: namespace.CANVASWIDTH,
                namespace: this.options.namespace
            });

            field_text = new EmbeddedText({
                id: this.options.id,
                canvasId: this.options.canvasId,
                initialData: this.options.demoData,
                namespace: this.options.namespace
            });
            field_text.get('canvas').calcOffset();
        },
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
        loadHint: function (index) {
            field_text.loadHint(index);
            displayHintbox(index);
        }
    });


    this.EmbeddedText = EmbeddedText;
    this.EmbeddedTextView = EmbeddedTextView;
    this.getUserResponse = getUserResponse;
    this.displayAnswerBase = displayAnswerBase;
}