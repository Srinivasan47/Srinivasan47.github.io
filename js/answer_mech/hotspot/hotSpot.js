function hotspot() {
    var namespace,
        hot_spot;

    /*
     * HOT SPOTS..
     * Complete model and view classes for interaction with the hot spots type exercises
     * @author: Lucia Marcu <LuciaMarcu@funnygarbage.com>
     *
     */
    var HotSpot = Backbone.Model.extend({
        /*
         * Define the default values and the properties of this model
         */
        defaults: {
            canvasId: 'canvas',
            mode: 'circle',
            //width of the rectangle or radius of the circle
            width: 30,
            //number of hints used to solve the question
            height: 30,
            //json containing the path to the file containing the initial data used for the exercise
            initialData: ''
        },
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

            //save the original hot spot shape
            this.set({
                original_mode: this.get('mode')
            });
            this.set({
                dataFile: this.get('initialData')
            });

            //initialize the shapes array
            this.set({
                shapes: new Array()
            });

            //initialize the display shapes array
            this.set({
                displayShapes: new Array()
            });

            this.set({
                hotSpots: new Array()
            });
            //load the provided set of Data to prepare the exercise
            this.loadInitialDataSet();
            //initialize the hot spots map generator
            //this.setupHotSpotsGenerator();
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
            //load initial data
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
                _this.options.namespace.canvas_controller.renderQuestionHTML(data);
                _this.options.namespace.canvas_controller.defaultViewselection();
                //hint box numbers 
                existingHints = data.hints_total;
                _this.options.namespace.canvas_controller.set({
                    totalAvailableHints: existingHints
                });
                $('#app_hints_navigator li#app_h1').addClass('hint_clickable');

                //check if image or color fill hotspot
                if (data.code == 'hs-click') {
                    _this.set({
                        fill_type: 'color'
                    });

                    var insertedObjects = data.assets_used ? data.assets_used : [];
                    if (insertedObjects.length) {
                        for (var objectsIndex = 0; objectsIndex < insertedObjects.length; objectsIndex++) {
                            if (insertedObjects[objectsIndex].asset_type == 'image_replace') {
                                _this.image_fill_replace_asset_id = insertedObjects[objectsIndex].asset_id;
                            }

                            if (insertedObjects[objectsIndex].asset_type == 'image_fill') {
                                _this.image_fill_asset_id = insertedObjects[objectsIndex].asset_id;
                                _this.set({
                                    fill_type: 'image'
                                });
                            }
                        }
                    }

                    if (!_.isUndefined(_this.image_fill_asset_id) && _this.image_fill_asset_id) {
                        var asset = _this.options.namespace.canvas_controller.getAssetFromUsedAssetsById(_this.image_fill_asset_id);
                        if (!_.isEmpty(asset)) {
                            _this.loadPattern(!_.isUndefined(asset.asset_value) ? asset.asset_value : asset.uri);
                        } else {
                            data.color_fill = _this.options.namespace.HSBOXDEFAULTCOLOR;
                        }
                        if (!_.isUndefined(_this.image_fill_replace_asset_id) && _this.image_fill_replace_asset_id) {
                            var asset = _this.options.namespace.canvas_controller.getAssetFromUsedAssetsById(_this.image_fill_replace_asset_id);
                            if (!_.isEmpty(asset)) {
                                _this.loadPattern(!_.isUndefined(asset.asset_value) ? asset.asset_value : asset.uri, null, true);
                            }
                        }
                    } else if (!_.isUndefined(data.color_fill) && data.color_fill) {
                        _this.set({
                            fill_type: 'color'
                        });
                        if (data.color_fill_char && (data.color_fill_char == 'x' || data.color_fill_char == 'o')) {
                            var fill_char_img = $('<img />').attr('src', data.color_fill_char == 'x' ? _this.options.namespace.HSFILLXIMAGEPATH : _this.options.namespace.HSFILLOIMAGEPATH);
                            fill_char_img.appendTo($('#preload'));
                            _this.set('color_fill_char_img', fill_char_img.get(0));
                        }
                    }
                }
                //render hot spots
                var spots = data.code == 'hs-click' ? data.hs_click_available_answers.answer : data.hot_spot_available_answers.answer;
                for (var spotsCounter = 0; spotsCounter < spots.length; spotsCounter++) {
                    var left = parseInt(spots[spotsCounter].originX);
                    var top = parseInt(spots[spotsCounter].originY);
                    var angle = spots[spotsCounter].angle ? parseFloat(spots[spotsCounter].angle) : 0;
                    var index = spots[spotsCounter].index ? parseFloat(spots[spotsCounter].index) : spotsCounter;

                    if (spots[spotsCounter].type == 'rectangle' || spots[spotsCounter].type == 'image') {
                        var width = parseInt(spots[spotsCounter].width);
                        var height = parseInt(spots[spotsCounter].height);
                        _this.addShape(
                            left, //originX and originY is placed in the middle of the shape
                            top,
                            width,
                            height,
                            spots[spotsCounter].type,
                            true,
                            angle,
                            index
                        );
                    }
                    if (spots[spotsCounter].type == 'circle') {
                        var width = parseInt(spots[spotsCounter].radius);
                        var height = parseInt(spots[spotsCounter].radius);
                        _this.addShape(
                            left, //originX and originY is placed in the middle of the shape
                            top,
                            width,
                            height,
                            spots[spotsCounter].type,
                            true,
                            angle,
                            index
                        );
                    }
                    if (spots[spotsCounter].type == 'polygon') {
                        var width = parseInt(spots[spotsCounter].width);
                        var height = parseInt(spots[spotsCounter].height);
                        var polyPoints = spots[spotsCounter].points;
                        var points_clone = [];
                        for (var pointsCounter = 0; pointsCounter < polyPoints.length; pointsCounter++) {
                            var x = parseInt(polyPoints[pointsCounter].x);
                            var y = parseInt(polyPoints[pointsCounter].y);
                            /*_this.addShape(
              left + x,
              top + y, 
              width, 
              height, 
              spots[spotsCounter].type,
              true,
              angle,
              index
            );*/
                            points_clone.push({
                                x: polyPoints[pointsCounter].x,
                                y: polyPoints[pointsCounter].y
                            });
                        }
                        element = new fabric.Polygon(points_clone, {
                            fill: _this.get('namespace').HSDEFAULTGRIDCOLOR,
                            left: spots[spotsCounter].originX,
                            top: spots[spotsCounter].originY,
                            angle: spots[spotsCounter].angle,
                            index: spots[spotsCounter].index,
                            height: height,
                            width: width


                        });
                        if (data.code == 'hs-click') {
                            element.opacity = 1;
                        } else {
                            element.opacity = 0;
                        }
                        _this.setShapeProperties(element, true);

                        canvas.renderAll();
                        //end the current poly 
                        _this.set({
                            currentPoly: null,
                            activeItem: null,
                            lastPoints: {},
                            lastPos: {},
                            'activeEditCircles': new Array()
                        });
                    }
                }
            }
        },
        loadPattern: function (path, hsObject, idle) {
            var _this = this;
            idle = idle || false;
            hsObject = hsObject || {};
    var patternSourceCanvas = new fabric.StaticCanvas('c'),
    	patternSourceCanvas1 = new fabric.StaticCanvas('c1'),
    	currentHotSpots = _this.get('hotSpots');
    patternSourceCanvas.backgroundColor = '#fff';
    patternSourceCanvas1.backgroundColor = '#fff';

            if (idle) {
                if (!_.isUndefined(this.get('pattern_idle')) && !_.isEmpty(hsObject)) {
                    hsObject.fill = this.get('pattern_idle');
                    hsObject.set({
                        src_idle: this.get('patternSrcIdle')
                    });
                    canvas.renderAll();
                    return;
                }
            } else {
      if (!_.isUndefined(_this.get('pattern1')) && !_.isEmpty(hsObject)) {
        hsObject.fill = _this.get('pattern1');
        hsObject.set({src: _this.get('patternSrc')});
        fabric.Image.fromURL(path, function(img) {
        	_this.get('hotSpots')[hsObject.index].fill = _this.get('pattern1');
                    });
                    canvas.renderAll();
                    return;
                }
            }

            fabric.Image.fromURL(path, function (img) {
                // get cell size
                var canvas = _this.get('canvas'),
                    correctAnswers = _this.get('initialData').correct_answers,
                    currentHotSpots = _this.get('hotSpots'),
                    firstBox = currentHotSpots[0];

                if (img.width / firstBox.width > img.height / firstBox.height) {
                    img.scaleToWidth(firstBox.width);
                } else {
                    img.scaleToHeight(firstBox.height);
                }

                img.set({
                    originX: 'left',
                    originY: 'top'
                });
      //var patternSourceCanvas = new fabric.StaticCanvas('c');
      //patternSourceCanvas.backgroundColor = '#fff';
      
      if(idle){
    	  patternSourceCanvas.setDimensions({width: firstBox.width, height: firstBox.height});
                patternSourceCanvas.add(img);
      } else{
    	  patternSourceCanvas1.setDimensions({width: firstBox.width, height: firstBox.height});
          patternSourceCanvas1.add(img);
      }

      //patternSourceCanvas.setDimensions({width: firstBox.width, height: firstBox.height});
      //patternSourceCanvas.add(img);

                var pattern = new fabric.Pattern({
                    source: patternSourceCanvas.getElement(),
                    repeat: 'repeat',
                    offsetX: Math.round((firstBox.width - img.getWidth()) / 2),
                    offsetY: Math.round((firstBox.height - img.getHeight()) / 2)
                });
      var pattern1 = new fabric.Pattern({
          source: patternSourceCanvas1.getElement(),
          repeat: 'repeat',
          offsetX: Math.round((firstBox.width - img.getWidth())/2),
          offsetY: Math.round((firstBox.height - img.getHeight())/2)
        });

                if (idle) {
        _this.set({pattern_idle: pattern});
        _this.set({patternSrcIdle: path});

                    for (objectsIndex = 0; objectsIndex < currentHotSpots.length; objectsIndex++) {
                        currentHotSpots[objectsIndex].fill = pattern;
          currentHotSpots[objectsIndex].set({src_idle: path});
                    }
                } else {
        _this.set({pattern1: pattern1});
        _this.set({patternSrc: path});
                }
            });
        },
        /*
         * Enable the canvas observer to generate the hot spots
         */
        setupHotSpotsGenerator: function () {
            var canvas = this.get('canvas');
            var _this = this;
            canvas.observe('mouse:down', function (options) {
                var target = options.target;
                if (target && target.parent_shape != null) {
                    target = target.parent_shape;
                }


                if (!target) {
                    if (_this.get('fill_type') != 'image') {
                        //restrict number of hot spots to the max number of available hot spots
                        if (_this.get('shapes').length >= _this.get('hotSpots').length) {
                            currentView.renderHint('You are using more than the allowed number of hot spots');
                            $('#app_hint').css('display', 'block');
                            $('#app_hint_close').click(function () {
                                hideHint();
                            });
                            return;
                        } else {
                            //check if mouse point is in restricted area (question zone)
                            if (options.e.layerX >= _this.options.namespace.canvas_controller.get('maxWorkzoneLimit')) {
                                return;
                            }

                            _this.addShape(options.e.layerX, options.e.layerY);
                        }
                    }
                } else {
                    if (_this.get('initialData').code == 'hs-click' && !_.isUndefined(_this.get('fill_type')) && _this.get('fill_type') == 'image') {
                        var activeItem = target;
                        _this.set({
                            activeItem: activeItem
                        });
                        if (!_.isUndefined(activeItem.src) && activeItem.src.length) {
                            if (!_.isUndefined(_this.get('pattern_idle')) && _this.get('pattern_idle')) {
                                _this.loadPattern(_this.get('patternSrcIdle'), activeItem, true);
                            } else {
                                activeItem.fill = HSDEFAULTGRIDCOLOR;
                            }
                            delete activeItem.src;
                            _this.set({
                                shapes: _.without(_this.get('shapes'), activeItem)
                            });
                        } else {
                            _this.loadPattern(_this.get('patternSrc'), activeItem);
                            _this.get('shapes').push(activeItem);
                        }
                    } else {
                        //check if the selected object is already selected and set the correct current active object
                        if (_.detect(_this.get('shapes'), function (a) {
                            return _.isEqual(a, target)
                        })) {
                            //remove the hot spot from view
                            _this.deleteShape(target);
                        } else {
                            //restrict number of hot spots to the max number of available hot spots
                            if (_this.get('shapes').length >= _this.get('hotSpots').length) {
                                currentView.renderHint('You are using more than the allowed number of hot spots');
                                $('#app_hint').css('display', 'block');
                                $('#app_hint_close').click(function () {
                                    hideHint();
                                });
                                return;
                            } else {
                                //check if mouse point is in restricted area (question zone)
                                if (options.e.layerX >= _this.options.namespace.canvas_controller.get('maxWorkzoneLimit')) {
                                    return;
                                }
							var xValue,yValue;	
							if(options.e.type=="touchstart"){
								var touch = options.e.touches[0];
								// or taking offset into consideration
								xValue = touch.pageX - canvas._offset.left;
								yValue = touch.pageY - canvas._offset.top;
							}else{
								xValue = options.e.layerX;
								yValue = options.e.layerY;
							}
							_this.addShape(xValue, yValue);
                            }
                        }
                    }
                }
            });
        },
        /*
         * Delete the hot spot object
         */
        deleteShape: function (shape) {
            var canvas = this.get('canvas');

            if (shape.child_fill_char_img != null) {
                canvas.remove(shape.child_fill_char_img);
            }
            this.set({
                shapes: _.without(this.get('shapes'), shape)
            });
            canvas.remove(shape);
            this.deselect();
        },


        /**
         * Render student response on canvas
         */
        addStudentResponse: function () {
            var data = this.get('initialData');
            var canvas = this.get('canvas');
            var selectedAnsewers = (data && data.selected_answers) ? data.selected_answers : [];
            var answers = [],
                color_fill;
            for (answers_counter = 0; answers_counter < selectedAnsewers.length; answers_counter++) {
                //check if current point intersects defined zones
                var detect = getAnswerHotSpotAt(selectedAnsewers[answers_counter].index);
                var obj = fabric.util.object.clone(detect);
                if (obj) {
                    console.log(obj);
                    obj.fill = namespace.HSBOXCORRECTCOLOR;
                    obj.opacity = namespace.HSDEFAULTOPACITY;
                    //set Kid selected shape as selectable to allow deleting it
                }

                answers.push(obj);
                this.set({
                    shapes: answers
                });
                canvas.add(obj);
                canvas.calcOffset();
            }
            canvas.renderAll();
        },



        /*
         * Deselect the current hot spot object
         */
        deselect: function () {
            if (!_.isUndefined(this.get('activeItem')) && !_.isNull(this.get('activeItem'))) {
                this.get('canvas').discardActiveObject();
                this.set({
                    'activeItem': null
                });
            }
        },
        /*
         * Add a new hot spot circle/rectangle around the selected point
         * @param left number
         * @param top number
         * @param width number
         * @param height number
         * @param mode string (circle, rectangle, polygon)
         * @param hotspot boolean - true if shape is a predefined hot spot. Set to true when loading hot spots from initial data
         * @param index number - hotspot index
         */
        addShape: function (left, top, width, height, mode, hotspot, angle, index) {
            width = width || this.get('width');
            height = height || this.get('height');
            mode = mode || this.get('mode');
            angle = angle || 0;
            hotspot = hotspot || false;

            if (mode.length > 0) {
                //for predefined hot spots there is no need to detect collision
                var isNew = false;
                if (!hotspot) {
                    //check if current point intersects defined zones
                    var detect = this.getHotSpotAt(left, top);

                    if (detect === false) {
                        return;
                    }
                    var obj = fabric.util.object.clone(detect);
                    if (obj) {
                        console.log('OBJ');
                        obj.fill = this.get('initialData').code == 'hs-click' && this.get('fill_type') != 'image' ? this.get('initialData').color_fill : this.get('namespace').HSBOXDEFAULTCOLOR;
                        obj.opacity = this.get('namespace').HSDEFAULTOPACITY;
                        //set Kid selected shape as selectable to allow deleting it
                        obj.selectable = true;
                    }
                    if (!_.isUndefined(detect.get('index'))) {
                        obj.set({
                            index: detect.get('index')
                        });
                    }
                }
                if (typeof (obj) == 'undefined') {
                    isNew = true;
                    var obj = {
                        left: left,
                        top: top,
                        opacity: this.get('namespace').HSDEFAULTOPACITY
                    };
                    if (mode == 'rectangle') {
                        obj.type = 'rect';
                    } else {
                        obj.type = mode;
                    }
                    if (!hotspot) {
                        obj.fill = this.get('initialData').code == 'hs-click' && this.get('fill_type') != 'image' ? this.get('initialData').color_fill : this.get('namespace').HSBOXDEFAULTCOLOR;
                    } else {
                        obj.fill = this.get('namespace').HSDEFAULTGRIDCOLOR;
                        if (this.get('initialData').code == 'hs-click') {
                            obj.opacity = 1;
                        } else {
                            obj.opacity = 0;
                        }
                    }
                }
                var canvas = this.get('canvas');

                //Implement single answer mechanism
                if (this.get('initialData').answer_type == 'single' && this.get('shapes').length == 1) {
                    //get the current answer
                    var item = this.get('shapes')[0];
                    //delete the current item to prevent providing more than one answer
                    this.deleteShape(item);
                }

                if (hotspot && this.get('initialData').code == 'hs-click') {
                    obj.stroke = this.get('initialData').gridlines;
                }

                var shape;
                switch (obj.type) {
                case "rectangle":
                case "rect":
                    if (isNew) {
                        obj.width = width;
                        obj.height = height;
                        obj.angle = angle;
                        obj.selectable = true;
                        obj.hasControls = obj.hasBorders = true;
                        shape = new fabric.Rect(obj);
                    } else {
                        shape = obj;
                    }
                    shape.lockUniScaling = false;
                    break;
                case "circle":
                    if (isNew) {
                        obj.radius = width;
                        obj.angle = angle;
                        shape = new fabric.Circle(obj);
                    } else {
                        shape = obj;
                    }
                    shape.lockUniScaling = true;

                    break;
                case "polygon":
                    if (!isNew) {
                        shape = obj;
                        break;
                    }
                    obj.selectable = false;
                    if (!this.get('currentPoly')) {
                        shape = new fabric.Polygon([{
                            x: 0,
                            y: 0
                        }], obj);
                        this.set({
                            lastPoints: [{
                                x: 0,
                                y: 0
                            }]
                        });
                        this.set({
                            lastPos: {
                                left: left,
                                top: top
                            }
                        });
                        //this.set({angle:angle});
                    } else {
                        var currentPoly = this.get('currentPoly');
                        obj.left = this.get('lastPos').left;
                        obj.top = this.get('lastPos').top;
                        obj.fill = currentPoly.fill;
                        currentPoly.points.push({
                            x: left - this.get('lastPos').left,
                            y: top - this.get('lastPos').top
                        });

                        this.set({
                            shapes: _.without(this.get('shapes'), currentPoly)
                        });
                        var lastPoints = this.get('lastPoints');
                        lastPoints.push({
                            x: left - this.get('lastPos').left,
                            y: top - this.get('lastPos').top
                        });

                        this.set({
                            lastPoints: lastPoints
                        });
                        shape = this.repositionPointsPolygon(lastPoints, obj);
                        canvas.remove(currentPoly);
                        if (hotspot) {
                            //remove old poly from hot spots
                            this.set({
                                hotSpots: _.without(this.get('hotSpots'), currentPoly)
                            });
                        }
                    }

                    this.set({
                        currentPoly: shape
                    });
                    break;
                }
                if (obj.type != 'image') {
                    //shape.rotate(angle);
                    if (index != null) {
                        shape.set({
                            index: index
                        });
                    } else if (!_.isUndefined(detect) && !_.isUndefined(detect.get('index'))) {
                        shape.set({
                            index: detect.get('index')
                        });
                    }
                    this.setShapeProperties(shape, hotspot);
                }
            } else {
                this.set({
                    'mode': this.get('original_mode')
                });
                this.deselect();
            }

            if (!hotspot && this.get('color_fill_char_img') != null) {
                var char_img = new fabric.Image(this.get('color_fill_char_img'), {
                    left: shape.left,
                    top: shape.top,
                    selectable: true,
                    hasControls: false,
                    hasBorders: false,
                    lockMovementX: true,
                    lockMovementY: true,
                    lockScalingX: true,
                    lockScalingY: true
                });
                char_img.parent_shape = shape;
                shape.child_fill_char_img = char_img;
                canvas.add(char_img);
            }
            canvas.calcOffset();
        },
        /**
         * Define all specific properties for current hot spot
         **/
        setShapeProperties: function (shape, hotspot) {
            shape.lockRotation = true;

            //SHK
            var isObjectExitInCanvas = true;
            for (var i = 0; i < this.get('shapes').length; i++) {
                if (shape.top == this.get('shapes')[i].top && shape.left == this.get('shapes')[i].left) {
                    isObjectExitInCanvas = false;
                }

            }
            //SHK
            if (isObjectExitInCanvas) {
                //if predefined hot spot it should not be selectable
                if (hotspot) {
                    shape.selectable = true;
                    shape.hasControls = shape.hasBorders = false;
                    shape.lockMovementX = shape.lockMovementY = shape.lockScalingX = shape.lockScalingY = true;
                } else {
                    shape.hasControls = shape.hasBorders = false;
                }

                if (this.get('initialData').code == 'hs-click' && !_.isUndefined(this.get('fill_type')) && this.get('fill_type') == 'image') {
                    shape.selectable = true;
                    shape.hasControls = shape.hasBorders = false;
                    shape.lockMovementX = shape.lockMovementY = shape.lockScalingX = shape.lockScalingY = true;
                }

                //push shape to shapes only if kid response
                if (!hotspot) {
                    shape.set({
                        shape_index: this.get('shapes').length
                    });
                    this.get('shapes').push(shape);
                } else {
                    //push shape to hotspots if predefined hot spots present
                    this.get('hotSpots').push(shape);
                }

                this.get('canvas').add(shape);

            }

        },
        /**
         * Reposition available points in the polygon
         **/
        repositionPointsPolygon: function (lastPoints, obj) {
            quickshape = new fabric.Polygon(lastPoints, obj);
            // return quickshape;

            minX = _.min(lastPoints, function (a) {
                return a.x
            }).x;
            minY = _.min(lastPoints, function (a) {
                return a.y
            }).y;
            var newpoints = [];
            _.each(lastPoints, function (a) {
                var newPoint = {};
                //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
                newPoint.x = a.x - (quickshape.width / 2) - minX;
                //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
                newPoint.y = a.y - (quickshape.height / 2) - minY;
                newpoints.push(newPoint);
            });
            //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
            obj.left += (quickshape.width / 2 + minX) * quickshape.scaleX;
            //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
            obj.top += (quickshape.height / 2 + minY) * quickshape.scaleY;
            return new fabric.Polygon(newpoints, obj);
        },
        /*
         * Get the hotspot that contains the provided point
         * @param left number
         * @param top number
         * @return hot spot object if present, false otherwise
         */
        getHotSpotAt: function (left, top) {
            for (var i = 0; i < this.get('hotSpots').length; i++) {
                var hotSpot = this.get('hotSpots')[i],
                    bounds = hotSpot.getBoundingRect();
				
                if (
                    bounds.left <= left && left <= (bounds.left + bounds.width) &&
                    bounds.top <= top && top <= (bounds.top + bounds.height)
                ) {
					if(navigator.userAgent.match(/SAMSUNG|SGH-[I|N|T]|GT-[I|P|N]|SM-[N|P|T|Z]|SHV-E|SCH-[I|J|R|S]|SPH-L/i) && hotSpot.currentWidth >= '235')  {
						hotSpot.currentWidth = hotSpot.currentWidth + 15;
						hotSpot.left = 211;
					}	
                    return hotSpot;
                }
            }
            return false;
        },
        /*
         * Load hint for current exercise
         */
        loadHint: function (index) {
            if (this.get('initialData')) {
                this.options.namespace.canvas_controller.loadHint(index);
            } else {
                currentView.renderHint('No hints available');
            }
        },
        /*
         * Submit the exercise solution (kids selected hot spots) to the server
         */
        submitForm: function () {
            var areas;
            //Backbone offers a save method that will post the info to the provided URL. The info posted is given by the attributes object

            var areas = [];
            for (var shapesCounter = 0; shapesCounter < this.get('shapes').length; shapesCounter++) {
                var a = this.get('shapes')[shapesCounter];
                var area = {};
                area.index = a.index;
                switch (a.type) {
                case "circle":
                    area.shape = a.type;
                    area.coords = [a.left, a.top, a.radius * a.scaleX];
                    break;
                case "rect":
                    area.shape = a.type;
                    var thisWidth = a.width * a.scaleX;
                    var thisHeight = a.height * a.scaleY;
                    //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
                    area.coords = [a.left - (thisWidth / 2), a.top - (thisHeight / 2), a.left + (thisWidth / 2), a.top + (thisHeight / 2)];
                    break;
                case "polygon":
                    area.shape = a.type;
                    area.coords = a.points;
                    break;
                case "image":
                    area.shape = a.type;
                    var thisWidth = a.width;
                    var thisHeight = a.height;
                    //hardcoded value 2 - must use the center of the object to position de object on canvas - DO NOT CHANGE THIS VALUE
                    area.coords = [a.left - (thisWidth / 2), a.top - (thisHeight / 2), a.left + (thisWidth / 2), a.top + (thisHeight / 2)];
                    break;
                }
                areas.push(area);
            }

            return {
                selected_answers: areas,
                hints_used: this.options.namespace.canvas_controller.get('totalHintsUsed'),
                totalHotSpots: areas.length
            };
        },
        /*
         * Parse check answer response
         * Should change the hot spots color to:
         *  - green if correct
         *  - red if incorrect
         *  - yellow if misconception
         * Should pop up the corresponding message
         * @param response - response object
         */
        parseResponse: function (response) {
            var canvas = this.get('canvas');
            var _this = this;

            switch (response.state) {
            case 'correct':
                //change hot spots color. For multiple answers all spots in response must have the color updated
                redrawHotSpots('#04E7EF');
                break;
            case 'incorrect':
                //change hot spots color. For multiple answers all spots in response must have the color updated
                redrawHotSpots('#04E7EF');
                break;
            case 'misconception':
                //change hot spots color. For multiple answers all spots in response must have the color updated
                redrawHotSpots('#04E7EF');
                break;
            }

            function redrawHotSpots(color) {
                var shapes = _this.get('shapes');
                for (var i = 0; i < shapes.length; i++) {
                    if (_this.get('initialData').code == 'hs-click' && !_.isUndefined(_this.get('fill_type')) && _this.get('fill_type') == 'image') {
                        _this.loadPattern(_this.get('patternSrc'), shapes[i]);
                    } else {
                        shapes[i].set('fill', color);
                    }

                };
                canvas.renderAll();
            }
        },
        /*
         * Check if a specific point is inside a polygon
         * Used to determine if the exact point the kid clicked on is a valid hot spot defined by the teacher
         * @param polyCords array of polygon points defined from top left and going clockwise
         * @param pointX number - X coordonate of the point
         * @param pointY number - Y coordonate of the point
         */
        pointInPoly: function (polyCoords, pointX, pointY) {
            var i, j, c = 0;
            for (i = 0, j = polyCoords.length - 1; i < polyCoords.length; j = i++) {
                if (((polyCoords[i][1] > pointY) != (polyCoords[j][1] > pointY)) && (pointX < (polyCoords[j][0] - polyCoords[i][0]) * (pointY - polyCoords[i][1]) / (polyCoords[j][1] - polyCoords[i][1]) + polyCoords[i][0])) {
                    c = !c;
                }
            }
            return c;
        },
        /*
         * Polygon clipping (check if a polygon is inside another polygon)
         * Used to determine if the area the kid clicked on is a valid hot spot defined by the teacher
         * @param subjectPolygon array of polygon points defined from top left and going clockwise
         * @param clipPolygon array of polygon points defined from top left and going clockwise
         */
        clip: function (subjectPolygon, clipPolygon) {
            var cp1, cp2, s, e;
            var inside = function (p) {
                return (cp2[0] - cp1[0]) * (p[1] - cp1[1]) > (cp2[1] - cp1[1]) * (p[0] - cp1[0]);
            };
            var intersection = function () {
                var dc = [cp1[0] - cp2[0], cp1[1] - cp2[1]],
                    dp = [s[0] - e[0], s[1] - e[1]],
                    n1 = cp1[0] * cp2[1] - cp1[1] * cp2[0],
                    n2 = s[0] * e[1] - s[1] * e[0],
                    n3 = 1.0 / (dc[0] * dp[1] - dc[1] * dp[0]);
                return [(n1 * dp[0] - n2 * dc[0]) * n3, (n1 * dp[1] - n2 * dc[1]) * n3];
            };
            var outputList = subjectPolygon;
            cp1 = clipPolygon[clipPolygon.length - 1];
            for (j in clipPolygon) {
                var cp2 = clipPolygon[j];
                var inputList = outputList;
                outputList = [];
                s = inputList[inputList.length - 1]; //last on the input list
                for (i in inputList) {
                    var e = inputList[i];
                    if (inside(e)) {
                        if (!inside(s)) {
                            outputList.push(intersection());
                        }
                        outputList.push(e);
                    } else if (inside(s)) {
                        outputList.push(intersection());
                    }
                    s = e;
                }
                cp1 = cp2;
            }
            return outputList
        },

        resetQuestionForm: function () {
            var shapes = this.get('shapes'),
                canvas = this.get('canvas');
            for (var shapesCounter = 0; shapesCounter < shapes.length; shapesCounter++) {
                //this.deleteShape(shapes[shapesCounter]);
                if ((!_.isUndefined(this.get('pattern_idle'))) && (this.get('pattern_idle')) && (this.get('initialData').code == 'hs-click')) {
                    this.loadPattern(this.get('patternSrcIdle'), shapes[shapesCounter], true);
                } else if (!_.isUndefined(shapes[shapesCounter].src) && shapes[shapesCounter].src.length) {
                    shapes[shapesCounter].fill = HSDEFAULTGRIDCOLOR;
                    delete shapes[shapesCounter].src;
                    // _this.set({shapes: _.without(_this.get('shapes'),activeItem)});
                } else {
                    this.deleteShape(shapes[shapesCounter]);
                }
            }
            this.set('shapes', []);

            canvas.renderAll();
        },
        "getUserResponse": getUserResponse,
        "displayAnswerBase": displayAnswerBase

    });

    /**
     *  gives students response
     **/
    function getUserResponse() {

        var response = namespace.canvas_controller.get('currentObject').submitForm(),
            answer_type = namespace.canvas_controller.get('currentObject').get('initialData').answer_type;
        if (response.selected_answers) {
            var responseObj = {
                am_code: "hotspot",
                answer_type: answer_type,
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
     *displays answer in preview and review mode
     * @param options correct answers json
     **/
    function displayAnswerBase(options) {
        var correct_answers;

        hot_spot.resetQuestionForm();
        correct_answers = (options && options.correct_answers) ? options.correct_answers : "";

        if (correct_answers) {

            var displayShapes = hot_spot.get('initialData').hot_spot_available_answers.answer;
            var answers = [],
                color_fill;
            for (answers_counter = 0; answers_counter < displayShapes.length; answers_counter++) {
                //check if current point intersects defined zones

                var detect = getAnswerHotSpotAt(displayShapes[answers_counter].index);
                var obj = fabric.util.object.clone(detect);
                if (obj) {
                    console.log(obj);
                    color_fill = isCorrectAnswer(displayShapes[answers_counter].index, correct_answers) ? namespace.HSBOXDISPLAYCORRECTCOLOR : namespace.HSBOXDISPLAYINCORRECTCOLOR;
                    obj.fill = color_fill;
                    obj.opacity = namespace.HSDEFAULTOPACITY;
                    //set Kid selected shape as selectable to allow deleting it
                }

                answers.push(obj);
                hot_spot.set({
                    shapes: answers
                });
                hot_spot.get('canvas').add(obj);
            }
        }
    }

    /**
     * returns canvas object
     * params@ index of object and correct answer array
     **/
    function isCorrectAnswer(index, correct_answers) {
        if (!_.isUndefined(index) && !_.isUndefined(correct_answers)) {
            for (var correct_answers_counter = 0; correct_answers_counter < correct_answers.length; correct_answers_counter++) {
                if (correct_answers[correct_answers_counter].index == index) {
                    return true;
                }
            }
        }
        return false;

    }

    /**
     * returns canvas object
     * params@ index of object
     **/
    function getAnswerHotSpotAt(index) {

        var canvas = hot_spot.get('canvas'),
            objects = canvas._objects ? canvas._objects : [];
        for (var objects_counter = 0; objects_counter < objects.length; objects_counter++) {
            if (objects[objects_counter].index == index) {
                return objects[objects_counter];
            }
        }

    }

    /**
     * Hot Spot Screen View
     * Class that controls the Hot Spot exercises
     **/
    var HotSpotView = Backbone.View.extend({
        defaults: {
            //set canvas id
            canvasId: 'canvas_hs',
            //path to demo data file used in current demo
            demoData: ''
        },
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
         * Load the canvas template used on the hot spot demo
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
            hot_spot = new HotSpot({
                canvasId: this.options.canvasId,
                mode: namespace.DEFAULTHOTSPOTSHAPE,
                initialData: this.options.demoData,
                namespace: this.options.namespace
            });
        },
        /*
         * Load hint templates menu width provided hint title and text
         * @param title string
         * @param text string
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
        loadHint: function (index) {
            hot_spot.loadHint(index);
            displayHintbox(index);
        }
    });

    /**
     *  Check my answers method
     *  Will post the hot spots to the server
     **/
    function save_hot_spots() {
        if (hot_spot) {
            hot_spot.submitForm();
        } else {
            alert('Hot Spot not found');
        }
    }

    /*
     * END HOT SPOTS
     */

    this.HotSpot = HotSpot;
    this.HotSpotView = HotSpotView;
    this.getUserResponse = getUserResponse;
    this.displayAnswerBase = displayAnswerBase;

}