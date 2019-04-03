function dragdrop() {
    var namespace,
        drag_drop;

    /*
     * DRAG & DROP
     * Complete model and view classes for interaction with the drag & drop type exercises
     * @author: Juan Pablo Atiaga <jpatiaga@funnygarbage.com>
     *
     */
    var DragDrop = Backbone.Model.extend({
        /*
         * Define the default values and the properties of this model
         */
        defaults: {
            canvasId: 'canvas_dd',
            //json containing the path to the file containing the initial data used for the exercise
            initialData: ''
        },
        /**
         * Attributes to reference the loaded data
         */
        answer_elements: [],

        show_targets: false,

        // map to store which element is placed on which target; also store the reversed relation, for faster access and cleaner code
        answer_target_map: [],
        target_answer_map: [],
        available_selected_answers: [],

        /*
         * Initialize the model, load exercise initial data, define the canvas
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

            // initialize internal vars, as this method may be called a second time
            this.answer_elements = [];
            this.answer_target_map = [];
            this.target_answer_map = [];

            //set the datafile reference used for answer checking

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
         * Define the method called once the xml data is retrieved or after the json data is defined
         * @param {object} data - initial data
         **/
        load_data: function (data) {
            this.options.namespace.canvas_controller.renderQuestionHTML(data);
            this.options.namespace.canvas_controller.defaultViewselection();

            // reset current hint
            current_hint = 1;

            // change the default existingHints to exercise's hints number
            existingHints = data.hints_total;

            this.options.namespace.canvas_controller.set({
                totalAvailableHints: existingHints
            });

            this.show_targets = data.show_targets;

            var options = data.drag_drop_available_answers.answer;
            if (options == null) {
                data.drag_drop_available_answers.answer = [];
            } else {
                for (var optionsCounter = 0; optionsCounter < options.length; optionsCounter++) {
                    this.addAnswerObject(options[optionsCounter], options[optionsCounter].index);
                }
                var timer,
            	timing = 0,
            	_this = this;
            	timer = window.setInterval(function () {
            		 if(timing < 5000){
            			 var canvas = _this.get('canvas');
                		 canvas.renderAll();
                		 canvas.calcOffset();
                		 timing += 10
            		 }else{
            			 window.clearInterval(timer);
            		 }
            		 
            	 },10);
            }


            var targets = data.available_targets
            if (targets == null) {
                data.available_targets = [];
            } else {
                for (var targetsCounter = 0; targetsCounter < targets.length; targetsCounter++) {
                    this.addTargetToCanvas(targets[targetsCounter], targets[targetsCounter].index);
                }
            }

            var correct_answers = data.correct_answers
            if (correct_answers == null) {
                data.correct_answers = [];
            }

            //this.addListeners();
        },


        /**
         * Render student response on canvas
         * @param {object} data - initial data
         */
        addStudentResponse: function () {
            var data = this.get('initialData');

            var selected_answers = (data && data.selected_answers) ? data.selected_answers : [];
            var targets = data.available_targets;
            var canvas = this.get('canvas');
            var answer_object;
            for (var selected_answers_counter = 0; selected_answers_counter < selected_answers.length; selected_answers_counter++) {
                answer_object = this.getAnswerObject(selected_answers[selected_answers_counter].answer_object);
                for (var targets_counter = 0; targets_counter < targets.length; targets_counter++) {
                    if (targets[targets_counter].index == selected_answers[selected_answers_counter].target_object) {
                        answer_object.left = targets[targets_counter].originX - 10;
                        answer_object.top = targets[targets_counter].originY - 10;
                        this.snapElementToTarget(answer_object);
                    }
                }
            }
            canvas.renderAll();
            canvas.calcOffset();
            

        },

        /**
         * Returns answer object
         */
        getAnswerObject: function (index) {
            var answer_objects = this.answer_elements;

            if (!_.isUndefined(index)) {
                for (var answer_objects_counter = 0; answer_objects_counter < answer_objects.length; answer_objects_counter++) {
                    if (answer_objects[answer_objects_counter].answer_index == index) {
                        return answer_objects[answer_objects_counter];
                    }
                }
            }
        },


        /**
         * makes answer selectable on canvas
         */
        answersSelectable: function (flag) {
            var answerElements

            if (flag) {
                this.addListeners();
            } else {
                answerElements = this.answer_elements;
                for (var answerElements_counter = 0; answerElements_counter < answerElements.length; answerElements_counter++) {
                    this.answer_elements[answerElements_counter].selectable = false;
                }
            }

            //this.addListeners();

        },



        /**
         * Add listeres for the canvas elements and html elements to handle click/touch and drag
         **/
        addListeners: function () {
            canvas.on({
                'mouse:down': $.proxy(this.onCanvasMouseDown, this),
                'mouse:up': $.proxy(this.onCanvasMouseUp, this)
            });
        },

        /**
         * Callback for the mouse down event
         * @param {event} evt - event that triggered the call
         */
        onCanvasMouseDown: function (evt) {
            var _this = this;
            if ((!_.isUndefined(_this.options.namespace.ruler) && _this.options.namespace.ruler) || (!_.isUndefined(_this.options.namespace.protractor) && _this.options.namespace.protractor)) {
                return false;
            }
            if (!evt.target) return;

            if (evt.target.is_element != null) {
                evt.target.bringToFront();
                evt.target.opacity = _this.options.namespace.DDOBJECTOPACITYONMOVING;

                // add shaddow and also move the object to simulate lifting
                if (typeof evt.target.textShadow != 'undefined') {
                    evt.target.textShadow = _this.options.namespace.DDTEXTOBJECTMOVINGSHADOWCOLOR + ' ' + _this.options.namespace.DDTEXTOBJECTMOVINGSHADOWOFFSETX + 'px ' + _this.options.namespace.DDTEXTOBJECTMOVINGSHADOWOFFSETY + 'px ' + _this.options.namespace.DDTEXTOBJECTMOVINGSHADOWBLUR + 'px';
                    evt.target.left -= _this.options.namespace.DDTEXTOBJECTMOVINGSHADOWOFFSETX;
                    evt.target.top -= _this.options.namespace.DDTEXTOBJECTMOVINGSHADOWOFFSETY;
                } else {
                    evt.target.shadow = new fabric.Shadow({
                        color: _this.options.namespace.DDOBJECTMOVINGSHADOWCOLOR,
                        blur: _this.options.namespace.DDOBJECTMOVINGSHADOWBLUR,
                        offsetX: _this.options.namespace.DDOBJECTMOVINGSHADOWOFFSETX,
                        offsetY: _this.options.namespace.DDOBJECTMOVINGSHADOWOFFSETY
                    });
                    evt.target.left -= _this.options.namespace.DDOBJECTMOVINGSHADOWOFFSETX;
                    evt.target.top -= _this.options.namespace.DDOBJECTMOVINGSHADOWOFFSETY;
                }
                var canvas = this.get('canvas');
                canvas.renderAll();
                canvas.calcOffset();
            }
        },

        /**
         * Callback for the mouse up event
         * @param {event} evt - event that triggered the call
         */
        onCanvasMouseUp: function (evt) {
            var _this = this;
            if (!evt.target) return;

            if (evt.target.is_element != null) {
                evt.target.opacity = _this.options.namespace.DDOBJECTDEFAULTOPACITY;
                if (typeof evt.target.textShadow != 'undefined') {
                    evt.target.textShadow = null;
                } else {
                    evt.target.shadow = null;
                }

                var canvas = this.get('canvas');
                canvas.renderAll();
                canvas.calcOffset();

                this.snapElementToTarget(evt.target);
            }
        },

        /*
         * Reset the object position (left, right) to it's original place.
         * @param {object} object - object we reset position for
         */
        resetPosition: function (object) {
            if (!object) return false;
            object.left = object.original_data.originX;
            object.top = object.original_data.originY;
        },

        /*
         * Get answer element by position
         * @param {number} left position
         * @param {number} top position
         */
        getObjectByPosition: function (left, top) {
            for (var i = 0; i < this.answer_elements.length; i++) {
                var sampleobject = this.answer_elements[i];
                if (sampleobject.left == left && sampleobject.top == top) return sampleobject;
            }
            return null;
        },

        /**
         * Creates the element and target of an answer
         * @param {object} data - the answer data
         * @param {int} answer_index - the index of the element in the initialData.drag_drop_available_answers.answer array
         * @return {object} element
         */
        addAnswerObject: function (data, answer_index, show_target) {
            var _this = this;
            var canvas = this.get('canvas');

            // element holds the answer draggable object (label, shape etc)
            var element = null;
            var text = data.label;
            newText = this.options.namespace.canvas_controller.textWrapping(text, 15);

            if (data.type == 'image') {
                var object_image = this.preloadImage(data.src, 'object', answer_index),
                    img = $(object_image),
                    img_obj = img.get(0);
                if (!object_image) {
                    return;
                }
            }
            // create the element
            switch (data.type) {
            case 'label':
				var isLowerGrade = false;  //TBR
				if(!_.isUndefined(this.get('initialData').lower_grade_font)){
					isLowerGrade = this.get('initialData').lower_grade_font;
				}
                                //isLowerGrade = true;  //TBR
				if(isLowerGrade)
				{
					element = new fabric.Text(newText, {
						left: data.originX,
						top: data.originY,
						fontFamily: _this.options.namespace.DRAGANDDROPLABELLOWERGRADEFONTFAMILY,
						fontSize: _this.options.namespace.DRAGANDDROPLABELLOWERGRADEFONTSIZE,
						fill: _this.options.namespace.DDDEFAULTELEMENTFONTCOLOR,
						fontStyle: _this.options.namespace.DDDEFAULTELEMENTFONTSTYLE
					});
				}
				else
				{
						 element = new fabric.Text(newText, {
						left: data.originX,
						top: data.originY,
						fontFamily: _this.options.namespace.DDDEFAULTELEMENTFONTFAMILY,
						fontSize: _this.options.namespace.DDDEFAULTELEMENTFONTSIZE,
						fill: _this.options.namespace.DDDEFAULTELEMENTFONTCOLOR,
						fontStyle: _this.options.namespace.DDDEFAULTELEMENTFONTSTYLE
					});

				}
                break;
            case 'shape':
                switch (data.shape_type) {
                case 'circle':
                    element = new fabric.Circle({
                        radius: data.radius,
                        fill: data.color
                    });
                    break;
                case 'rectangle':
                    element = new fabric.Rect({
                        width: data.width,
                        height: data.height,
                        fill: data.color
                    });
                    break;
                case 'polygon':
                    // clone the points array, as Fabric will use and alter the passed array
                    var points_clone = [];
                    for (var pointsCounter = 0; pointsCounter < data.points.length; pointsCounter++) {
                        points_clone.push({
                            x: data.points[pointsCounter].x,
                            y: data.points[pointsCounter].y
                        });
                    }

                    element = new fabric.Polygon(points_clone, {
                        fill: data.color
                    });
                    break;
                }
                break;
            case 'image':
                var _this = this;
                /*fabric.Image.fromURL(data.src, function(element) {
          if (data.width != null) {
            element.scaleToWidth(data.width);
          }*/

                element = new fabric.Image(img_obj, {
                    width: data.width,
                    height: data.height

                });
                // element.perPixelTargetFind = true;

                _this.addElementToCanvas(data, element, answer_index);
                //});
                break;
            case 'equation':
                var _this = this;
                fabric.Image.fromURL(data.src, function (element) {
                    if (data.width != null) {
                        element.scaleToWidth(data.width);
                    }
                    element.perPixelTargetFind = true;

                    _this.addElementToCanvas(data, element, answer_index);
                });
                break;
            }

            if (data.type != 'image' && data.type != 'equation') {
                this.addElementToCanvas(data, element, answer_index);
            }
        },

        /**
         * Adds an element to canvas and sets the global attributes
         */
        preloadImage: function (url, object, index) {
            // compute the image id and search for the image in the DOM
            var img_id = 'draganddrop_' + object + '_' + index,
                img = $('#preload img#' + img_id);
            $('<img>')
                .attr('id', img_id)
                .addClass('draganddrop_preloaded_image')
                .appendTo('#preload')
                .attr('src', url);

            return img.selector;
        },

        /**
         * Adds an element to canvas and sets the global attributes
         * @param {object} data the answer data
         * @param {object} element the canvas element
         * @param {int} answer_index the index of the element in the initialData.drag_drop_available_answers.answer array
         * @return {object} element
         */
        addElementToCanvas: function (data, element, answer_index) {
            var _this = this;
            var canvas = this.get('canvas');

            // set common attributes
            element.set({
                left: data.originX,
                top: data.originY,
                angle: data.angle ? data.angle : 0,
                hasControls: false,
                hasBorders: false,
                is_element: true,
                answer_index: answer_index,
                opacity: _this.options.namespace.DDOBJECTDEFAULTOPACITY
            });

            //element.answer_index = answer_index;

            // if this element is not a decoy, also create the target element
            /* if (!data.is_decoy && this.show_targets) {
      new fabric.Image.fromURL(
        DDTARGETIMAGE,
        function(target) {
          target.is_target = true;

          // create references from element to target and vice-versa
          element.target = target;
          target.element = element;

          canvas.add(target);
        },
        {left: data.target.originX, top: data.target.originY, hasControls: false, opacity: DDOBJECTDEFAULTOPACITY}
      );
    }*/

            element.original_data = data;
            this.answer_elements.push(element);

            canvas.add(element);

            canvas.renderAll();
            canvas.calcOffset();

            return element;
        },

        /**
         * Creates the target of an answer
         * @param {object} data - the answer data
         * @param {int} answer_index - the index of the element in the initialData.drag_drop_available_answers.answer array
         * @return {object} element
         */
        addTargetToCanvas: function (data, target_index) {
            var _this = this;
            var canvas = this.get('canvas');
            if (this.show_targets) {
                new fabric.Image.fromURL(
                    _this.options.namespace.DDTARGETIMAGE,
                    function (target) {
                        target.is_target = true;

                        // create references from element to target and vice-versa
                        /* element.target = target;
			          target.element = element;*/

                        canvas.add(target);
                        target.selectable = false;
                    }, {
                        left: data.originX,
                        top: data.originY,
                        hasControls: false,
                        opacity: _this.options.namespace.DDOBJECTDEFAULTOPACITY
                    }
                );
            } else {
                new fabric.Image.fromURL(
                    _this.options.namespace.DDTARGETIMAGE,
                    function (target) {
                        target.is_target = true;

                        // create references from element to target and vice-versa
                        /* element.target = target;
			          target.element = element;*/

                        canvas.add(target);
                        target.selectable = false;
                    }, {
                        left: data.originX,
                        top: data.originY,
                        hasControls: false,
                        opacity: /*DDOBJECTDEFAULTOPACITY*/ 0
                    }
                );
            }
            canvas.renderAll();
            canvas.calcOffset();
        },

        /**
         * Snaps an element A to the closest target
         * If the closest target is occupied by another element B, then that element (B) will be placed elsewhere, depending on where was the A element place before:
         *  - if A was on its original position, then B will also return to its original position
         *  - if A was placed on another target, A and B will swap places
         *
         * @param {object} element - an element that corresponds to an answer
         */
        snapElementToTarget: function (element) {
            var _this = this;
            var options = this.get('initialData').drag_drop_available_answers.answer;
            var targets = this.get('initialData').available_targets;
            var correct_answers = this.get('initialData').correct_answers;
            // use a basic object to compare the element with all the targets, using an extra snap tolerance
            // hardcoded width and height values 2 - used to generate a square around the position of the target, based on the configurable tolerance - DO NOT CHANGE THIS VALUE
            var target_obj = {
                left: null,
                top: null,
                width: _this.options.namespace.DDTARGETSNAPTOLERACE * 2,
                height: _this.options.namespace.DDTARGETSNAPTOLERACE * 2,
                scaleX: 1,
                scaleY: 1
            };
            // hardcoded value -1 representing the out of bounds index of an array - DO NOT CHANGE THIS VALUE
            var snap_to_index = -1;
            var target_counter_value = '';
            var snap_to_distance = null;
            var canvas = this.get('canvas');

            for (var targetsCounter = 0; targetsCounter < targets.length; targetsCounter++) {
                /*if (options[optionsCounter].is_decoy) {
        continue;
      }*/
                target_obj.left = targets[targetsCounter].originX;
                target_obj.top = targets[targetsCounter].originY;

                var distance = this.options.namespace.canvas_controller.areObjectsOverlapping(element, target_obj, true);
                // if objects are not overlapping, skip to the next target
                if (!distance) {
                    continue;
                }
                // if objects are overlapping, but the distance is greater than a previous target candidate, skip to the next target
                if (distance && snap_to_index != -1 && snap_to_distance < distance) {
                    continue;
                }

                snap_to_index = targets[targetsCounter].index;
                target_counter_value = targetsCounter;
                snap_to_distance = distance;
            }

            // hardcoded value -1 - the original value of snap_to_index - DO NOT CHANGE THIS VALUE
            if (snap_to_index == -1) {
                // if the element wasn't dragged close enough to a target, place it back to the original position
                for (var optionsCounter = 0; optionsCounter < options.length; optionsCounter++) {
                    if (options[optionsCounter].index === element.answer_index) {
                        element.animate({
                            left: options[optionsCounter].originX,
                            top: options[optionsCounter].originY
                        }, {
                            duration: _this.options.namespace.DDSNAPTOORIGINALPOSITIONANIMATIONDELAY,
                            onChange: canvas.renderAll.bind(canvas)
                        });
                        continue;
                    }
                }

                // reset the answer-target maps to empty values
                if (this.answer_target_map[element.answer_index] != null) {
                    var target_element_index = this.answer_target_map[element.answer_index];
                    this.answer_target_map[element.answer_index] = null;
                    this.target_answer_map[target_element_index] = null;
                }
                this.available_selected_answers = [];
                var answer_targets = this.answer_target_map
                for (answer_targets_counter = 0; answer_targets_counter < answer_targets.length; answer_targets_counter++) {
                    var answers_selected = {};
                    if ((!_.isUndefined(answer_targets[answer_targets_counter])) && (answer_targets[answer_targets_counter] != null)) {
                        answers_selected.target_object = answer_targets[answer_targets_counter];
                        answers_selected.answer_object = answer_targets_counter;
                        this.available_selected_answers.push(answers_selected);
                    }
                }

                return;
            }

    if(navigator.userAgent.match(/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i)  && targets[target_counter_value].originX >= 120 )  {
                  element.animate({
               
                        left: targets[target_counter_value].originX - 30,
                        top: targets[target_counter_value].originY + 5
                
                
            }, {
                duration: _this.options.namespace.DDSNAPTOTARGETANIMATIONDELAY,
                onChange: canvas.renderAll.bind(canvas)
            });
        }else{
                element.animate({
               
                        left: targets[target_counter_value].originX,
                        top: targets[target_counter_value].originY
                
                
            }, {
                duration: _this.options.namespace.DDSNAPTOTARGETANIMATIONDELAY,
                onChange: canvas.renderAll.bind(canvas)
            }); 

        }

            // at this point the element will snap to a target; animate it to the target position
           
            console.log("left"+targets[target_counter_value].originX+"top"+ targets[target_counter_value].originY);
            // if there's no other element on the same target
            if (this.target_answer_map[snap_to_index] == null || this.target_answer_map[snap_to_index] == element.answer_index) {
                // then just reset the maps of the target this element used to be on
                var target_element_index = this.answer_target_map[element.answer_index];
                this.answer_target_map[element.answer_index] = null;
                this.target_answer_map[target_element_index] = null;
            } else {
                // there's another element placed on the same target: get that element and move it elsewhere (to the old position of the current element if present, otherwise to its original position)
                var other_element = null;
                for (var answersCounter = 0; answersCounter < this.answer_elements.length; answersCounter++) {
                    if (this.answer_elements[answersCounter].answer_index == this.target_answer_map[snap_to_index]) {
                        other_element = this.answer_elements[answersCounter];
                        break;
                    }
                }
                if (other_element) {
                    // if the current element was previously placed on a different target, then place the other element to that target
                    if (this.answer_target_map[element.answer_index] != null) {
                        var target_element_index = this.answer_target_map[element.answer_index];
                        for (var targetsCounter = 0; targetsCounter < targets.length; targetsCounter++) {
                            if (targets[targetsCounter].index == target_element_index) {
                                other_element.animate({
                                    left: targets[targetsCounter].originX,
                                    top: targets[targetsCounter].originY
                                }, {
                                    duration: _this.options.namespace.DDSNAPTOORIGINALPOSITIONANIMATIONDELAY,
                                    onChange: canvas.renderAll.bind(canvas)
                                });
                                continue;
                            }
                        }
                        this.answer_target_map[other_element.answer_index] = target_element_index;
                        this.target_answer_map[target_element_index] = other_element.answer_index;
                    }
                    // otherwise, revert the other element to its original position
                    else {
                        for (var optionsCounter = 0; optionsCounter < options.length; optionsCounter++) {
                            if (options[optionsCounter].index == other_element.answer_index) {
                                other_element.animate({
                                    left: options[optionsCounter].originX,
                                    top: options[optionsCounter].originY
                                }, {
                                    duration: _this.options.namespace.DDSNAPTOORIGINALPOSITIONANIMATIONDELAY,
                                    onChange: canvas.renderAll.bind(canvas)
                                });
                                this.answer_target_map[other_element.answer_index] = null;
                                continue;
                            }
                        }


                    }
                }
            }

            // update the answer-target maps for the current element
            this.answer_target_map[element.answer_index] = snap_to_index;
            this.target_answer_map[snap_to_index] = element.answer_index;
            this.available_selected_answers = [];
            var answer_targets = this.answer_target_map
            for (answer_targets_counter = 0; answer_targets_counter < answer_targets.length; answer_targets_counter++) {
                var answers_selected = {};
                if ((!_.isUndefined(answer_targets[answer_targets_counter])) && (answer_targets[answer_targets_counter] != null)) {
                    answers_selected.target_object = answer_targets[answer_targets_counter];
                    answers_selected.answer_object = answer_targets_counter;
                    this.available_selected_answers.push(answers_selected);
                }
            }
        },

        /*
         * Delete shape
         */
        deleteShape: function () {
            var myObj = this.get('canvas').getActiveObject();
            this.set({
                shapes: _.without(this.get('shapes'), myObj)
            });
            this.get('canvas').remove(myObj);
            this.deselect();
        },

        /*
         * Deselect the current object
         */
        deselect: function () {
            if (!_.isUndefined(this.get('activeItem')) && !_.isNull(this.get('activeItem'))) {
                this.get('activeItem').setActive(false);
                this.set({
                    'activeItem': null
                });
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
                currentView.renderHint('No hints available');
            }
        },

        /*
         * Submit the exercise solution to the server
         */
        submitForm: function () {
            return {
                selected_answers: this.available_selected_answers,
                hints_used: this.options.namespace.canvas_controller.get('totalHintsUsed')
            }
        },

        /*
         * Parse check answer response
         * Should pop up the corresponding message
         * @param {object} response - response object
         */

        parseResponse: function (response) {},

        /*
         * Cancel all answer responses
         */
        resetQuestionForm: function (dispAnswer, option) {
            var _this = this;
            var options = this.get('initialData').drag_drop_available_answers.answer,
                canvas = this.get('canvas');
            for (var answerElementsCounter = 0; answerElementsCounter < this.answer_elements.length; answerElementsCounter++) {
                var element = this.answer_elements[answerElementsCounter],
                    answer_index = element.answer_index;

                for (var optionsCounter = 0; optionsCounter < options.length; optionsCounter++) {
                    if (options[optionsCounter].index === answer_index) {
                        element.animate({
                            left: options[optionsCounter].originX,
                            top: options[optionsCounter].originY
                        }, {
                            duration: _this.options.namespace.DDSNAPTOORIGINALPOSITIONANIMATIONDELAY,
                            onChange: canvas.renderAll.bind(canvas),
                            onComplete: function () {
                                if (dispAnswer) {
                                    _this.displayAnswerBase(option);
                                } else if (!_.isUndefined(dispAnswer) && (!dispAnswer)) {
                                    _this.addStudentResponse();
                                }
                            }
                        })

                        continue;
                    }
                }

                /*element.animate({
        left: options[answer_index].originX,
        top: options[answer_index].originY
      }, {duration: DDSNAPTOORIGINALPOSITIONANIMATIONDELAY, onChange: canvas.renderAll.bind(canvas)});*/
            }
            this.available_selected_answers = [];
            this.answer_target_map = [];
            this.target_answer_map = [];
        },

        "displayAnswerBase": displayAnswerBase,
        "getUserResponse": getUserResponse



    });




    /**
     * Gets the user response and sends it to the platform
     **/
    function getUserResponse() {

        var response = namespace.canvas_controller.get('currentObject').submitForm();
        if (response.selected_answers) {
            var responseObj = {
                am_code: "dragdrop",
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
     * Gets the user response and sends it to the platform
     **/
    function displayAnswerBase(options) {

        var correct_answers;
        correct_answers = (options && options.correct_answers) ? options.correct_answers : [];

        if (correct_answers) {
            //drag_drop.resetQuestionForm();
            var data = drag_drop.get('initialData');
            var targets = (data && data.available_targets) ? data.available_targets : [];
            var canvas = drag_drop.get('canvas');
            var answer_object;
            for (var correct_answers_counter = 0; correct_answers_counter < correct_answers.length; correct_answers_counter++) {
                answer_object = drag_drop.getAnswerObject(correct_answers[correct_answers_counter].answer_object);
                for (var targets_counter = 0; targets_counter < targets.length; targets_counter++) {
                    if (targets[targets_counter].index == correct_answers[correct_answers_counter].target_object) {
                        answer_object.left = targets[targets_counter].originX - 10;
                        answer_object.top = targets[targets_counter].originY - 10;
                        drag_drop.snapElementToTarget(answer_object);
                    }
                }
            }
            /*canvas.renderAll();
      canvas.calcOffset();*/
        }


    }




    /**
     * Drag & Drop Screen View
     * Class that controls the Drag & Drop exercises
     **/
    var DragDropView = Backbone.View.extend({
        defaults: {
            //set canvas id
            canvasId: 'canvas_dd',
            //path to demo data file used in current demo
            demoData: ''
        },
        /**
         * Initialize the view
         * @params {object} options - Object defining the options used to initialize the current model
         */
        initialize: function (options) {
            //reset all global vars
            //canvas_controller = hot_spot = choice = select = math_graph = field_text = field_image = drag_drop = open_response = null;
            //closeHintbox();
            $('canvas.upper-canvas').remove();
            currentView = this;

            this.options = _.extend(this.defaults, options);
            this.render();
            this.afterRender();
        },
        /*
         * Load the canvas template used on the drag & drop demo
         */
        render: function () {
            // Compile the template using underscore
            var template = _.template($("#canvas_template").html(), {
                canvas_id: this.options.canvasId
            });
            // Load the compiled HTML into the Backbone "el"
            this.$el.html(template);

        },
        /*
         * After the canvas is rendered create the controls and listeners
         * Load action menu options
         */
        afterRender: function () {
            namespace = this.options.namespace;
            namespace.canvas_controller = new CanvasController({
                canvasId: this.options.canvasId,
                namespace: this.options.namespace
            });
            //JSON DEMO
            drag_drop = new DragDrop({
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
            drag_drop.loadHint(index);
            displayHintbox(index);
        }
    });

    /**
     *  Check my answers method
     **/
    function save_drag_drop() {
        if (drag_drop) {
            drag_drop.submitForm();
        } else {
            alert('Drag & Drop not found');
        }
    }


    function load_nextdd_exercise(index) {
        var dd_view = new DragDropView({
            el: $(".canvas_container"),
            canvasId: 'canvas_dd' + index,
            demoData: 'feeds/xml/dragDropDemo' + index + '.xml',
            demoDataType: 'xml'
        });
        currentView = dd_view;
        next_question_index++;
    }

    this.DragDrop = DragDrop;
    this.DragDropView = DragDropView;
    this.displayAnswerBase = displayAnswerBase;
    this.getUserResponse = getUserResponse;
}
console.log("dynamicScript");
//@ sourceURL=dynamicScript.js
/*
 * END DRAG & DROP
 */