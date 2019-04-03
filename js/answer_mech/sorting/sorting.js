function sorting() {
	var namespace,
	sort;








/**
 * Sorting Model
 * Class that defines the sorting model properties
 * @author: Nicu Danila <NicuDanila@funnygarbage.com>
 */
var Sorting = Backbone.Model.extend({
  /**
   * Define the default values and the properties of this model
   */
  defaults: {
    // hardcoded default value 0 for initial object id - DO NOT CHANGE THIS VALUE
    id: 0,
    canvasId: 'canvas',
    // json containing the initial data used for the exercise
    initialData: {}
  },

  // internal record of the validation type (value or region)
  validation_type: 'region',

  // internal records of bin configurations
  bin_label_type: null,
  bin_type: null,
  bins: [],

  // internal records of objects configurations
  object_type: null,
  objects: [],
  objects_clonable: false,

  // map to store which object is placed in which bin
  bin_object_map: [],
  
  // fabric js elements
  bins_elements: [],
  objects_elements: [],

  // images are preloaded before fabric objects are created
  preload_images_left: 0,
  redraw_after_preload: [],
  /**
   * Returns the code of this Answer Mechanism
   */
  getAnswerMechanismCode: function () {
    return 'sort';
  },

  /**
   * Initialize the model, load exercise initial data, define the canvas
   * @param {object} options - Object defining the options used to initialize the current model
   * For New Exercise it should be empty
   * For Edit Exercise it should contain the ID of the exercise, the uploaded image path, the initial data file path the initial data type
   */
  initialize: function(options) {
	  
    // initialize internal vars, as this method may be called a second time
    this.validation_type = null;

    this.bin_label_type = null;
    this.bin_type = null;
    this.bins = [];

    this.object_type = null;
    this.objects = [];
    this.objects_clonable = false;

    this.bin_object_map = [];

    this.bins_elements = [];
    this.objects_elements = [];

    this.preload_images_left = 0;
    this.redraw_after_preload = [];

    // remove any preloaded images
    $('#preload .sort_preloaded_image').remove();

    //options should contain the ID of the exercise to Edit or no ID if adding new exercise
    //this.defaults = _.extend(this.defaults, options);
	  this.options = _.extend(this.defaults, options); 

    // set the canvas object
    if (!this.options.namespace.canvas_controller) {
      this.options.namespace.canvas_controller = new CanvasControllerAuthoring({canvasId: this.get('canvasId')});
      this.set({canvas: this.options.namespace.canvas_controller.get('canvas')});
    } else if (!this.get('canvas')) {
      this.set({canvas: this.options.namespace.canvas_controller.get('canvas')});
    }

    this.options.namespace.canvas_controller.clearCanvas();
    this.options.namespace.canvas_controller.setCurrentObjectElement(this);

    // for better performance, only render the canvas explicitly
    this.get('canvas').renderOnAddition = false;

    // load the provided set of Data to prepare the exercise
    this.loadInitialDataSet();

    //this.addListeners();

            //this.get('namespace').btn_reset.show();
            this.get('namespace').btn_reset.css('display','block');
  },
  
  
  
  
  answersSelectable: function(flag){
	  var objectElements;
	  if(!_.isUndefined(flag) && flag){
		  this.addListeners();
	  }else{
                objectElements = this.objects_elements ? this.objects_elements : [] ;
		   for( var objects_counter = 0; objects_counter < objectElements.length; objects_counter++){
			   this.objects_elements[objects_counter].selectable = false;
				  canvas.renderAll();
		   }
	  }
	  
  },

  
  
  

  /**
   * Check that initial data set corresponds to this exercise and load all info required for this exercise to run
   */
  loadInitialDataSet: function() {
    // get article data
    var data = this.get('initialData');
    if (!data || data.code != this.getAnswerMechanismCode()) {
      data = getBlankItem(this.getAnswerMechanismCode(), data);
      this.set('initialData', data);
      console.log('Received data is empty or corresponds to a different Answer Mechanism. Data has been reset.');
    }
    this.load_data(data);
  },

  /**
   * Define the method called once the xml data is retrieved or after the json data is defined
   * @param {object} data - the data to be loaded
   */
  load_data: function(data) {
    this.options.namespace.canvas_controller.renderQuestionHTML(data);
    this.options.namespace.canvas_controller.defaultViewselection();
    existingHints = data.hints_total;
            this.options.namespace.canvas_controller.set({
                totalAvailableHints: existingHints
            });
    $('#app_hints_navigator li#app_h1').addClass('hint_clickable');

    // update internal properties
    this.validation_type = data.validation_type;

    this.bin_label_type = data.bin_label_type;
    this.bin_type = data.bin_type;
    this.bins = data.bins;

    //this.object_type = data.object_type;
    this.objects = data.sort_available_answers;
    this.objects_clonable = data.objects_clonable;

    // add bins
    for (var bins_counter = 0; bins_counter < this.bins.length; bins_counter++) {
      this.drawBin(bins_counter);
      this.bin_object_map[bins_counter] = [];
    }

    // add objects
    for (var objects_counter = 0; objects_counter < this.objects.length; objects_counter++) {
      this.drawObject(objects_counter);
    }
  },

        pausecomp: function (millis) {
   var date = new Date();
   var curDate = null;
            do {
                curDate = new Date();
            }
   while(curDate-date < millis){
	   if(this.redraw_after_preload.length === 0){
		   
	   }
   }
 },
  
 addStudentResponse: function(){
            var data = this.get('initialData') ? this.get('initialData') : {} ;
	  var selected_answers = (data && data.selected_answers)? data.selected_answers: [];
	  
	  this. renderStudentResponse(selected_answers, true);
	  
  },
  
  
  renderStudentResponse: function(selected_answers, flag){
	  var binProps,
	  	  objectsArray,
	  	  object,
	  	  externalTimer,
	  	  internalTimer,
	  	  that = this,
	  	  internalLoopExecuted = true,
	  	  selected_answers_counter = 0,
	  	  objects_counter = 0;
	  
	  this.setobjectsNotRendered();
	  
	  if (selected_answers) {
		  
		  //external loop for iterating overs bins
		  externalTimer = window.setInterval(function(){
			  if(selected_answers_counter < selected_answers.length && internalLoopExecuted){
				  
				  //This value will be set once internal loop has executed completely
				  internalLoopExecuted = false;
				  
				  binProps = that.getBinProps(selected_answers[selected_answers_counter].bin_index);
				  
				  if (!_.isUndefined(binProps)) {
					  //getting objects from the bin
		              objectsArray = selected_answers[selected_answers_counter].objects_indexes;
		              if (!_.isUndefined(objectsArray)) {
		            	  
		            	  //reseting the obejcts counter
		            	  objects_counter = 0;
		            	  
		            	  //redrawing bin objects
		            	  internalTimer = window.setInterval(function(){
		            		  if(objects_counter < objectsArray.length){
		            			  
		            			  //console.log(new Date().getTime() / 1000);
			                      
		            			  object = that.getobjectprop(objectsArray[objects_counter].index);
			
			                      if (!_.isUndefined(object)) {
			                    	  that.startDraggingObject(object);
			                          object.left = binProps.left;
			                          object.top = binProps.top;
			                          canvas.renderAll();
			                          canvas.calcOffset();
			                          object.bringToFront()
			
			                          // update te opacity
			                          object.opacity = that.options.namespace.SORTOBJECTDEFAULTOPACITY;
			
			                          // remove the shaddow
			                          if (object instanceof fabric.Text) {
			                              object.textShadow = null;
			                          } else {
			                              object.shadow = null;
			                          }
			                          canvas.renderAll();
			
			                          object.set({
			                              originX: 'left',
			                              originY: 'top'
			                          });
			
			                          // update the bin-objects map and call bin reorderring
                                            that.bin_object_map[binProps.bin_counter].push(object.index);
                                            that.reorderObjectsInBin(binProps.bin_counter);
			                          that.setObjectRendered(object.index);
			
			                      }
		            			  
			                      //once one object is complete move on to next
		            			  objects_counter++;
		            		  }else{
		            			  //once all objects are drawn stop iterating this function
		            			  window.clearInterval(internalTimer);
		            			  
		            			  //set value to move on to next bin
		            			  internalLoopExecuted = true;
		            			  selected_answers_counter++;
		            		  }
		            	  },10);
		              }
		          }
			  }
			  else{
				  //once all bins are complete
				  window.clearInterval(externalTimer);
				  
			  }
                }, 80);
	  }
  },
  
  
  getBinProps: function(index){
            var bins = this.bins ? this.bins : [];
            var bins_objects = this.bins_elements ? this.bins_elements : [];
            if (!_.isUndefined(index)) {
		  for(var bins_counter = 0; bins_counter < bins.length; bins_counter++){
			  if(index == bins[bins_counter].index){
				  var bin_props = {
						left :  this.bins_elements[bins_counter].left,
						top : this.bins_elements[bins_counter].top,
						bin_counter: bins_counter
				  }
				  return bin_props;
			  }
		  }
	  }
  },
  
  getobjectprop: function(index){
            var objects_elements = this.objects_elements ? this.objects_elements : [];
            var objects = this.objects ? this.objects : [];
            if (!_.isUndefined(index)) {
		  for(var objects_counter = 0; objects_counter < objects.length; objects_counter++){
			  	if((objects[objects_counter].index == index) && (!objects[objects_counter].used)){
                        return objects_elements[objects_counter];
			  	}
			  
		  }
	  }
  },
  
  
  setObjectRendered: function(index){
            var objects = this.objects ? this.objects : [];
            
            if(!_.isUndefined(index)){
	  objects[index].used = true;
            }
           
 },  
 
 setobjectsNotRendered: function(){
            var objects = this.objects ? this.objects : [];
	 for(var objects_counter = 0; objects_counter < objects.length; objects_counter++){
		 this.objects[objects_counter].used = false;
	 }
 },
 
  /**
   * Add listeres for the canvas elements and html elements to handle click/touch events
   */
  addListeners: function() {
    // add canvas events
    canvas.on({
      'mouse:down': $.proxy(this.onCanvasMouseDown, this),
      'mouse:up': $.proxy(this.onCanvasMouseUp, this),
      'object:moving': $.proxy(this.onCanvasObjectMoving, this)
    })
  },

  /**
   * Callback for the mouse down event
   * on click event the mouseup and mousedown both will be deactivated to prevent cloning of object with timer and flag
   * @param {object} e - the fabric event
   */
  onCanvasMouseDown: function(e) {	
    var target = e.target;

    if (target && target.is_object) {
      this.startDraggingObject(target);
    }
  },

  /**
   * Callback for the mouse up event
   * click event on canvas will calculate the timer to prevent click event using flag
   * @param {object} e - the fabric event
   */
  onCanvasMouseUp: function(e) {
    var target = e.target;

    if (target && target.is_object) {
      this.endDraggingObject(target);
    }
  },

  /**
   * Callback for the object moved event
   * @param {object} e - the fabric event
   */
  onCanvasObjectMoving: function(e) {
    var target = e.target;
    
    if (target && target.is_bin) {
      this.repositionBinElements(target.index);
    }
  },

  /**
   * Prepares an object for dragging along the canvas
   * @param {object} object - the fabric object that is being dragged
   */
  startDraggingObject: function(object) {
    var canvas = this.get('canvas');
    var _this = this;
    // if objects are clonable and this object is not already a clone, create one
    if (this.objects_clonable && !object.is_clone) {
      // the clone will remain in the original position and the original object will be dragged
      var clone = $.extend(true, {}, this.objects[object.index]);
      this.objects.push(clone);
      var index = this.objects.length - 1; // hardcoded value 1 to get the last index of the array - DO NOT CHANGE THIS VALUE
      this.drawObject(index);
      // the original object becomes a clone
      object.is_clone = true;
    }

    // make sure the object is fully visible
    object.bringToFront();

    // update te opacity
    object.opacity = _this.options.namespace.SORTOBJECTOPACITYONMOVING;

    // add shaddow and also move the object to simulate lifting
    if (object instanceof fabric.Text) {
      object.textShadow = _this.options.namespace.SORTTEXTOBJECTMOVINGSHADOWCOLOR + ' ' + _this.options.namespace.SORTTEXTOBJECTMOVINGSHADOWOFFSETX + 'px ' + _this.options.namespace.SORTTEXTOBJECTMOVINGSHADOWOFFSETY + 'px ' + _this.options.namespace.SORTTEXTOBJECTMOVINGSHADOWBLUR + 'px';
      object.left -= _this.options.namespace.SORTTEXTOBJECTMOVINGSHADOWOFFSETX;
      object.top -= _this.options.namespace.SORTTEXTOBJECTMOVINGSHADOWOFFSETY;
    }
    else {
      object.shadow = new fabric.Shadow({
        color: _this.options.namespace.SORTOBJECTMOVINGSHADOWCOLOR,
        blur: _this.options.namespace.SORTOBJECTMOVINGSHADOWBLUR,
        offsetX: _this.options.namespace.SORTOBJECTMOVINGSHADOWOFFSETX,
        offsetY: _this.options.namespace.SORTOBJECTMOVINGSHADOWOFFSETY
      });
      object.left -= _this.options.namespace.SORTOBJECTMOVINGSHADOWOFFSETX;
      object.top -= _this.options.namespace.SORTOBJECTMOVINGSHADOWOFFSETY;
    }

    canvas.renderAll();
  },

  /**
   * On draggin end, reset object properies and move it to a bin or back to the original position
   * @param {object} object - the fabric object that was being dragged
   */
  endDraggingObject: function(object) {
    var canvas = this.get('canvas');
    var _this = this;
    // update te opacity
    object.opacity = _this.options.namespace.SORTOBJECTDEFAULTOPACITY;

    // remove the shaddow
    if (object instanceof fabric.Text) {
      object.textShadow = null;
    }
    else {
      object.shadow = null;
    }
    canvas.renderAll();

    // will the object to it's new position
    this.snapObjectToBin(object);
  },

  /**
   * Tests if an object is ovelapping a bin and, if yes, adds it to that bin
   * @param {object} object - fabric object corresponding to an internal object
   */
  snapObjectToBin: function(object) {
    // remove current object from any bin it had been before
    var removed_from_bin = null;
    // walk through all the bins, searching for this object; as soon as it was found (and removed) break out of the 2 loops, as one object can only be present in one bin
    for (var bin_index = 0; bin_index < this.bin_object_map.length && removed_from_bin === null; bin_index++) {
      for (var object_index = 0; object_index < this.bin_object_map[bin_index].length && removed_from_bin === null; object_index++) {
        if (this.bin_object_map[bin_index][object_index] == object.index) {
          // identified the object => remove it from the bin
          this.bin_object_map[bin_index].splice(object_index, 1); // hardcoded value 1 to remove just one element from the array - DO NOT CHANGE THIS VALUE
          removed_from_bin = bin_index;
        }
      }
    }

    var object_bounds = object.getBoundingRect(),
        snap_to_bin_index = -1, // hardcoded value -1 representing the out of bounds index of an array - DO NOT CHANGE THIS VALUE
        snap_to_bin_distance = null;

    // walk through all the bins
    for (var bins_counter = 0; bins_counter < this.bins_elements.length; bins_counter++) {
      var bin = this.bins_elements[bins_counter],
          bin_bounds = bin.getBoundingRect();

      // if objects are not overlapping, skip to the next target
      if (
        object_bounds.left > bin_bounds.left + bin_bounds.width || bin_bounds.left > object_bounds.left + object_bounds.width ||
        object_bounds.top > bin_bounds.top + bin_bounds.height || bin_bounds.top > object_bounds.top + object_bounds.height
      ) {
        continue;
      }

      // objects are overlapping, measure the distance between the 2 objects
      // hardcoded values 2 - the power used in the distance formula - DO NOT CHANGE THIS VALUE
      var distance = Math.sqrt(Math.pow(object.left - bin.left, 2) + Math.pow(object.top - bin.top, 2));

      // if objects are overlapping but the distance is greater than a previous bin candidate, skip to the next bin
      // hardcoded value -1 - the original value of snap_to_bin_index - DO NOT CHANGE THIS VALUE
      if (distance && snap_to_bin_index != -1 && snap_to_bin_distance < distance) {
        continue;
      }

      // the object overlaps this bin, and (so far) it is the closest => remember the index and the distance
      snap_to_bin_index = bins_counter;
      snap_to_bin_distance = distance;
    }

    // hardcoded value -1 - the original value of snap_to_bin_index - DO NOT CHANGE THIS VALUE
    if (snap_to_bin_index == -1) {
      // if the element wasn't dragged close enough to a target, place it back to the original position
      this.revertObjectToOriginalPosition(object, removed_from_bin);
      this.reorderObjectsInBin(removed_from_bin);
      return;
    }

    // at this point the element will snap to a target; animate it to the target position

    // if the object was moved from one bin to another, also reorder the bin it was removed from
    if (removed_from_bin != snap_to_bin_index) {
      this.reorderObjectsInBin(removed_from_bin);
    }

    // reordering the bins requires that the objects are placed starting from (left, top) instead of (center, center)
    object.set({
      originX: 'left',
      originY: 'top'
    });

    // update the bin-objects map and call bin reorderring
    this.bin_object_map[snap_to_bin_index].push(object.index);
    this.reorderObjectsInBin(snap_to_bin_index);
  },

  /**
   * Moves an object back to it's original position and, if the object is a clone, it removes it at the end
   * @param {object} object - fabric object corresponding to an internal object
   */
  revertObjectToOriginalPosition: function(object, bin_index) {
	  var _this = this;
	if (bin_index == null && this.objects_clonable){
		canvas.remove(object);
	    return;
	}
    // set the origin point back to (center, center) (it is changed to (left, top) when placed inside a bin)
    object.set({
      originX: 'center',
      originY: 'center'
    });

    // build the animation that will move the object
    var animation_settings = {
      duration: _this.options.namespace.SORTSNAPTOORIGINALPOSITIONANIMATIONDELAY,
      onChange: canvas.renderAll.bind(canvas)
    };

    // if objects are clonable, than this is a clone and needs to be removed at the end
    if (this.objects_clonable) {
      animation_settings.onComplete = $.proxy(this.removeObject, this, object);
    }

    // animate object to original size and scale
    object.animate({
      left: this.objects[object.index].left,
      top: this.objects[object.index].top,
      scaleX: this.objects[object.index].type == 'images' ? this.objects[object.index].object.scale : 1, // hardcoded value 1 to disable scaling for rectangles - DO NOT CHANGE THIS VALUE
      scaleY: this.objects[object.index].type == 'images' ? this.objects[object.index].object.scale : 1 // hardcoded value 1 to disable scaling for rectangles - DO NOT CHANGE THIS VALUE
    }, animation_settings);    
  },

  /**
   * Removes an object from the canvas and from the internal variables
   * @param {object} object - fabric object corresponding to an internal object
   */
  removeObject: function(object) {
    var canvas = this.get('canvas'),
        index = $.inArray(object, this.objects_elements);

    // the object may have already been removed (for example in case of double clicking an element this function gets called 2 times for the same object)
    // hardcoded values -1 which is returned if the search value is not found in the array - DO NOT CHANGE THIS VALUE
    if (index == -1) {
      return;
    }

    // remove from canvas
    canvas.remove(this.objects_elements[index]);
    canvas.renderAll();

    // remove from internal variables
    // hardcoded values 1 to remove just one element from the array - DO NOT CHANGE THIS VALUE
    this.objects.splice(index, 1);
    this.objects_elements.splice(index, 1);

    $('#preload #sort_object_' + index).remove();
    // update indexes of the next elements
    for (var object_counter = index; object_counter < this.objects.length; object_counter++) {
      this.objects_elements[object_counter].index = object_counter;
      $('#preload #sort_object_' + (object_counter + 1)).attr('id', '#sort_object_' + object_counter);
    }
    // update indexes in map
    for (var bin_index = 0; bin_index < this.bin_object_map.length; bin_index++) {
      for (var object_index = 0; object_index < this.bin_object_map[bin_index].length; object_index++) {
        if (this.bin_object_map[bin_index][object_index] > index) {
          this.bin_object_map[bin_index][object_index]--;
        }
      }
    }
  },

  /**
   * Reorders the objects in one bin
   * @param {int} bin_index - the index of the bin in the this.bins array
   */
  reorderObjectsInBin: function(bin_index) {
	  var _this = this;
    // make sure there's at least one object in the bin
    if (bin_index == null || this.bin_object_map[bin_index].length == 0) {
      // nothing to reorder
      return;
    }

    // generate a blocks array, containing the width and height for each block
    // use original sizes, as objects are scaled down later to fit the bin
    var blocks = [];
    // walk through all the objects of this bin
    for (var object_index = 0; object_index < this.bin_object_map[bin_index].length; object_index++) {
      var index = this.bin_object_map[bin_index][object_index],
          object = this.objects[index],
          element = this.objects_elements[index],
          block = {index: index};
      switch (object.type) {
        case 'text':
        case 'equations':
          // text and equations objects are not scaled by default
          block.w = Math.round(element.getWidth() / element.scaleX);
          block.h = Math.round(element.getHeight() / element.scaleY);
          break;
        case 'images':
          // images are scaled, so take the original scale into account
          block.w = Math.round(element.getWidth() / element.scaleX) * object.object.scale;
          block.h = Math.round(element.getHeight() / element.scaleY) * object.object.scale;
          break;
      }
      // generate the padding by adding it to the width and height of each block
      block.w += _this.options.namespace.SORTOBJECTSPADDING;
      block.h += _this.options.namespace.SORTOBJECTSPADDING;
      blocks.push(block);
    }

    // call the growing packer which will sort the blocks and return the new positions for a best fit in the bin
    GrowingPacker.fit(blocks, 'maxside');

    // calculate the width / height of the blocks (of the whole container)
    var blocks_width = 0, blocks_height = 0;
    // walk through all the blocks
    for(var blocks_counter = 0; blocks_counter < blocks.length ; blocks_counter++) {
      if (!block.fit) {
        continue;
      }

      // the width / height is the maximum position + width / height of any object
      blocks_width = Math.max(blocks_width, blocks[blocks_counter].fit.x + blocks[blocks_counter].w);
      blocks_height = Math.max(blocks_height, blocks[blocks_counter].fit.y + blocks[blocks_counter].h);
    }
    // decrease the total width and height as the padding only needs to be present between the objects
    blocks_width -= _this.options.namespace.SORTOBJECTSPADDING;
    blocks_height -= _this.options.namespace.SORTOBJECTSPADDING;

    // calculate the scaling that needs to be applyed to the objects in order to fit inside the bin
    var bin_bounds = this.bins_elements[bin_index].getBoundingRect();
    // hardcoded value 1 - by default, no scalling is applied - DO NOT CHANGE THIS VALUE
    var blocks_scale = 1;
    if (blocks_width > bin_bounds.width || blocks_height > bin_bounds.height) {
      // if any of the sides of the objects container is greater then the sides of the bin, use the one with the greater difference to get the scale
      if (blocks_width - bin_bounds.width > blocks_height - bin_bounds.height) {
        blocks_scale = bin_bounds.width / blocks_width;
      }
      else {
        blocks_scale = bin_bounds.height / blocks_height;
      }
      // apply the new scale to the size of the objects container
      blocks_width *= blocks_scale;
      blocks_height *= blocks_scale;

      // update the position of the objects
      for(var blocks_counter = 0; blocks_counter < blocks.length ; blocks_counter++) {
        if (!block.fit) {
          continue;
        }
        blocks[blocks_counter].fit.x *= blocks_scale;
        blocks[blocks_counter].fit.y *= blocks_scale;
      }
    }

    // center the objects container inside the bins container
    var offset_left = Math.round(bin_bounds.left + (bin_bounds.width - blocks_width) / 2), // hardcoded value 2 to get the center - DO NOT CHANGE THIS VALUE
        offset_top = Math.round(bin_bounds.top + (bin_bounds.height - blocks_height) / 2); // hardcoded value 2 to get the center - DO NOT CHANGE THIS VALUE

    var canvas = this.get('canvas'),
        render_all_called = false;

    // walk through each object
    for(var blocks_counter = 0; blocks_counter < blocks.length ; blocks_counter++) {
      var block = blocks[blocks_counter],
          object = this.objects[block.index],
          element = this.objects_elements[block.index];
      if (!block.fit) {
        continue;
      }

      // calculate the new position and scale
      // for images also take into account the original scaling
      var object_scale = object.type == 'images' ? blocks_scale * object.object.scale : blocks_scale,
          object_left = Math.round(offset_left + block.fit.x),
          object_top = Math.round(offset_top + block.fit.y);

      // to improve performance, only animate the object if the position or the scaling is changed
      if (element.left != object_left || element.top != object_top || element.scaleX != object_scale) {
        element.animate({left: object_left, top: object_top, scaleX: object_scale, scaleY: object_scale}, {
          duration: _this.options.namespace.SORTSNAPTOBINANIMATIONDELAY,
          onChange: render_all_called ? null : canvas.renderAll.bind(canvas),
          onComplete: canvas.renderAll.bind(canvas)
        });
        // remember that a renderAll was attached to one animation and don't attach in the future, as all the animations have the same duration and one call is enough
        render_all_called = true;
      }
    }
  },

  /**
   * Preloads an image used by a bin label, by a bin or by an object
   * @param {string} url - the url to the image
   * @param {string} target - bin_label|bin|object
   * @param {int} index - the index of the target in this.bins|this.object
   * @return {bool|HTMLElement} - false when the image was not loaded yet OR image tag element when the image was loaded
   */
  preloadImage: function(url, target, index) {
    // compute the image id and search for the image in the DOM
    var img_id = 'sort_' + target + '_' + index,
        img = $('#preload img#' + img_id);

    // if the image was not created yet, create it
    if (!img.length) {
      // remember that there's an extra image to be preloaded
      this.preload_images_left++,
      this.redraw_after_preload.push({target: target, index: index});
      // create the tag, attach the load events, append to the DOM and set the source
      $('<img>')
        .attr('id', img_id)
        .addClass('sort_preloaded_image')
        .load($.proxy(this.imageLoaded, this))
        .error($.proxy(this.imageLoaded, this))
        .appendTo('#preload')
        .attr('src', url);
      
      return false;
    }

    // at this point the image exists but with a different source
    if (img.attr('src') != url) {
      // remember that there's an extra image to be preloaded
      this.preload_images_left++,
      this.redraw_after_preload.push({target: target, index: index});
      // update the source
      img.attr('src', url);
      return false;
    }

    // at this point the image is present and with the same url => return it
    return img.get(0);
  },

  /**
   * Image loaded callback
   * Calls bins/objects drawing when all images have been loaded
   */
  imageLoaded: function() {
    // an image was loaded, decrease the number of images that are still loading
    this.preload_images_left--;
    // return if there are still images to be loaded
    if (this.preload_images_left > 0) {
      return;
    }

    // all the images have been loaded; call the bin/object drawing methods for the loaded images
    // the same bin might be present more than once in the redraw_after_preload array; don't draw the same bin multiple times
    var drawn_bins = [], drawn_objects = [];
    for (var redraw_counter = 0; redraw_counter < this.redraw_after_preload.length; redraw_counter++) {
      var index = this.redraw_after_preload[redraw_counter].index;
      switch (this.redraw_after_preload[redraw_counter].target) {
        case 'bin_label':
        case 'bin':
          // hardcoded values -1 which is returned if the search value is not found in the array - DO NOT CHANGE THIS VALUE
          if ($.inArray(index, drawn_bins) == -1) {
            this.drawBin(index);
            drawn_bins.push(index);
          }
          break;
        case 'object':
          // hardcoded values -1 which is returned if the search value is not found in the array - DO NOT CHANGE THIS VALUE
          if ($.inArray(index, drawn_objects) == -1) {
            this.drawObject(index);
            drawn_objects.push(index);
          }
          break;
      }
    }
    // reset the array, as everything has been redrawn
    this.redraw_after_preload = [];
  },

  /**
   * Draws a bin to the canvas
   * If the bin requires an image to be loaded, then this method will be called 2 times: first time it will request image preloading
   * and just after the image has loaded, the bin will actually be drawn
   * @param {int} index - the index of the bin in this.bins
   */
  drawBin: function(index) {
    var data = this.bins[index],
        bin_label_image = null, 
        bin_label_equation = null,
        bin_image = null,
        wait_to_preload = false,
        _this = this;

    // first make sure that images are preloaded; if any of the required images is not loaded yet, request the image and return from this method
    if (this.bin_label_type == 'images' && data.label.url) {
      bin_label_image = this.preloadImage(data.label.url, 'bin_label', index);
      if (!bin_label_image) {
        wait_to_preload = true;
      }
    }

    if (this.bin_label_type == 'equations' && data.label.url) {
      bin_label_equation = this.preloadImage(data.label.url, 'bin_label', index);
      if (!bin_label_equation) {
        wait_to_preload = true;
      }
    }

    if (this.bin_type == 'images') {
      bin_image = this.preloadImage(data.bin.url, 'bin', index);
      if (!bin_image) {
        wait_to_preload = true;
      }
    }

    // if there's at least one image that needs to be preloaded, then wait for it
    if (wait_to_preload) {
      return;
    }
    var canvas = this.get('canvas'),
        element = null,
        label_element = null;

    // create the bin fabric element, depending on the bin type
    switch (this.bin_type) {
      case 'images':
        element = new fabric.Image(bin_image, {
          scaleX: data.bin.scale,
          scaleY: data.bin.scale
        });
        break;
      case 'rectangles':
        element = new fabric.Rect({
          fill: data.bin.fill,
          stroke: data.bin.outline,
          strokeWidth: _this.options.namespace.SORTRECTANGLEBINOUTLINEWIDTH,
          strokeLineJoin: 'round',
          width: data.bin.width,
          height: data.bin.height
        });
        break;
    }
    // set the common bin settings
    element.set({
      left: data.left,
      top: data.top,
      selectable: false
    });
    // add the bin to the canvas
    canvas.add(element);

    // create the bin label fabric element, depending on the bin label type
    // the label is optional
    switch (this.bin_label_type) {
      case 'text':
        if (data.label.text) {
          label_element = new fabric.Text(data.label.text, {
            fontFamily: _this.options.namespace.SORTBINTEXTLABELFONT,
            fontSize: _this.options.namespace.SORTBINTEXTLABELSIZE,
            fontStyle: _this.options.namespace.SORTBINTEXTLABELSTYLE,
            fontWeight: _this.options.namespace.SORTBINTEXTLABELWEIGHT,
            lineHeight: _this.options.namespace.SORTBINTEXTLABELLINEHEIGHT,
            textShadow: _this.options.namespace.SORTBINTEXTLABELSHADDOW,
            fill: _this.options.namespace.SORTBINTEXTLABELCOLOR
          });
        }
        break;
      case 'images':
        if (bin_label_image) {
          label_element = new fabric.Image(bin_label_image);
        }
        break;
      case 'equations':
        if (bin_label_equation) {
          label_element = new fabric.Image(bin_label_equation);
        }
        break;
    }
    // if a label was created, set the common label settings
    if (label_element) {
      label_element.set({
        originX: 'center',
        originY: 'bottom',
        selectable: false
      });
      // add the label to the canvas
      canvas.add(label_element);
    }

    // mark the element as a bin so that it will be recognized in canvas events
    element.is_bin = true;
    element.index = index;
    element.label_element = label_element;
    this.bins_elements[index] = element;

    // call reposition method to correctly set the position of the label (if present)
    this.repositionBinElements(index);
    this.bins_elements[index].setCoords();
    canvas.calcOffset();
    canvas.renderAll();
  },

  /**
   * Draws an object to the canvas
   * If the object requires an image to be loaded, then this method will be called 2 times: first time it will request image preloading
   * and just after the image has loaded, the object will actually be drawn
   * @param {int} index - the index of the object in this.objects
   */
  drawObject: function(index) {
    var data = this.objects[index],
        object_image, object_equation,
        _this = this;

    // first make sure that images are preloaded; if any of the required images is not loaded yet, request the image and return from this method
    if (data.type == 'images') {
      object_image = this.preloadImage(data.object.url, 'object', index);
      if (!object_image) {
        return;
      }
    }
    if (data.type == 'equations') {
      object_equation = this.preloadImage(data.object.url, 'object', index);
      if (!object_equation) {
        return;
      }
    }

    var canvas = this.get('canvas'),
        element = null;
    	text = data.object.text;
    	newText = this.options.namespace.canvas_controller.textWrapping(text, 20);

    // create the object fabric element, depending on the object type
    switch (data.type) {
      case 'text':
        element = new fabric.Text(newText, {
          fontFamily: _this.options.namespace.SORTOBJECTTEXTFONT,
          fontSize: _this.options.namespace.SORTOBJECTTEXTSIZE,
          fontStyle: _this.options.namespace.SORTOBJECTTEXTSTYLE,
          fontWeight: _this.options.namespace.SORTOBJECTTEXTWEIGHT,
          lineHeight: _this.options.namespace.SORTOBJECTTEXTLINEHEIGHT,
          textShadow: _this.options.namespace.SORTOBJECTTEXTSHADDOW,
          fill: _this.options.namespace.SORTOBJECTTEXTCOLOR
        });
        break;
      case 'images':
        element = new fabric.Image(object_image, {
          scaleX: data.object.scale,
          scaleY: data.object.scale
        });
        break;
      case 'equations':
        element = new fabric.Image(object_equation);
        break;
    }
    // set the common object settings
    element.set({
      opacity: _this.options.namespace.SORTOBJECTDEFAULTOPACITY,
      left: data.left,
      top: data.top,
      hasControls: false,
      hasBorders: false,
      selectable: true
    });
    canvas.add(element);

    // mark the element as an object so that it will be recognized in canvas events
    element.is_object = true;
    element.index = index;
    element.sendToBack();
    this.objects_elements[index] = element;
    this.objects_elements[index].setCoords();
    canvas.calcOffset();
    canvas.renderAll();
  },
  
  
  /**
   * Positions the bin label above the bin, horizontally centered
   * @param {int} index - the index of the bin in this.bins
   */
  repositionBinElements: function(index) {
    var bin = this.bins_elements[index],
    _this = this;

    if (bin.label_element) {
      bin.label_element.left = bin.left;
      bin.label_element.top = bin.top - bin.getHeight()/2 - _this.options.namespace.SORTLABELDISTNCE; // hardcoded value 2 to decrease by half of the element and place the label above the bin - DO NOT CHANGE THIS VALUE
    }
  },

  /**
   * Load hint for current exercise
   * @param {int} index - the index of the loaded hint
   */
  loadHint: function(index) {
    if (this.get('initialData')) {
      this.options.namespace.canvas_controller.loadHint(index);
    } else {
      currentView.renderHint('No hints available');
    }
  },

  /**
   * Submit the exercise solution to the server
   */
  submitForm: function() {
    // generate an array of the objects dropped to bins
    var selected_answers = [];
    // walk through all the bins
    for (var bin_index = 0; bin_index < this.bins.length; bin_index++) {
      // gather a list of al lthe objects dropped to this bin
      var objects_indexes = [];
      for (var object_index = 0; object_index < this.bin_object_map[bin_index].length; object_index++) {
        var index = this.bin_object_map[bin_index][object_index];
        var answer = {index: this.objects[index].index};
        if (this.validation_type == 'value') {
          answer.value = this.objects[index].value;
        }
        objects_indexes.push(answer);
      }
      // only add the bin to the selected answers if there was at least one object dropped into it
      if (objects_indexes.length) {
        selected_answers.push({
          bin_index: this.bins[bin_index].index,
          objects_indexes: objects_indexes
        });
      }
    }

    return {
      selected_answers: selected_answers,
      hints_used: this.options.namespace.canvas_controller.get('totalHintsUsed')
    };
  },

  /**
   * Parse check answer response
   * Should pop up the corresponding message
   * @param response - response object
   */
  parseResponse: function(response) {
  },

  /**
   * Remove all the answers added so far
   */
  resetQuestionForm: function() {
    // walk through all the objects dropped into bins
    /*for (var bin_index = 0; bin_index < this.bin_object_map.length; bin_index++) {
      for (var object_index = 0; object_index < this.bin_object_map[bin_index].length; object_index++) {
        // rever the object to the original position
        var object = this.objects_elements[this.bin_object_map[bin_index][object_index]];
        //this.revertObjectToOriginalPosition(object);
      }
      
      this.bin_object_map[bin_index] = [];
    }*/
	  var canvas = this.get('canvas');
	  canvas.clear();
      var data = this.get('initialData');
      var objects = data.sort_available_answers;
      for(var object = 0; object < objects.length; object++){
    	  for(var objectCounter = (object + 1); objectCounter < objects.length; objectCounter++){
        	  if (objects[object].index === objects[objectCounter].index) {
        		  objects.splice(objectCounter, 1);
        		  objectCounter-=1;
              }
          } 
      }
      //this.bin_label_type = data.bin_label_type;
      //this.bin_type = data.bin_type;
      this.bins = data.bins;

      //this.object_type = data.object_type;
      this.objects = data.sort_available_answers;
      //this.objects_clonable = data.objects_clonable;

      // add bins
      for (var bins_counter = 0; bins_counter < this.bins.length; bins_counter++) {
        this.drawBin(bins_counter);
        this.bin_object_map[bins_counter] = [];
      }

      // add objects
      for (var objects_counter = 0; objects_counter < this.objects.length; objects_counter++) {
        this.drawObject(objects_counter);
      }
      //this.load_data(data, false);
  },
  
  "displayAnswerBase": displayAnswerBase,
  "getUserResponse" : getUserResponse
});




function getUserResponse() {
	var response = namespace.canvas_controller.get('currentObject').submitForm(),
	answer_type = namespace.canvas_controller.get('currentObject').get('initialData').answer_type;
        if (!_.isUndefined(response.selected_answers)) {
		var responseObj = {
				am_code: "sort",
				answer_type: answer_type,
				hints_used: response.hints_used,
				selected_answers: response.selected_answers
		};
		
		console.log(responseObj);

		return responseObj;
		
	}else{
		console.log("no answer selected");
	}
}


function displayAnswerBase(options){
	
	var correct_answers;
    correct_answers = (options && options.correct_answers) ? options.correct_answers : "";
	
	var answers_object;

		//answers_object = getAnswersObject(correct_answers);
		namespace.canvas_controller.get('currentObject').renderStudentResponse(correct_answers);

}


/*function getAnswersObject(corrct_answers){
	var answer_type = namespace.canvas_controller.get('currentObject').get('initialData').answer_type;
	
	if(!_.isUndefined(corrct_answers)){
		
		var bins = sort.bins;
	 	var bins_objects = sort.bins_elements;
	 	var objects_elements = sort.objects_elements;
	 	var objects = sort.objects;
	 	var answer_object = [];		
		
	 	for(var bin_counter = 0; bin_counter < bins.length; bin_counter++){
	 		var answer = {
					"bin_index" : bins[bin_counter].index,
					"objects_indexes" : []
	 			}
	 			answer_object.push(answer);
	 	}
		
		switch (answer_type)
		{
		case "value":
			
			for(var corrct_answers_counter = 0; corrct_answers_counter < corrct_answers.length; corrct_answers_counter++){
				
			}
			
			
			
			
			
			break;
			
		case "region":
			
		
		 	for(var corrct_answers_counter = 0; corrct_answers_counter < corrct_answers.length; corrct_answers_counter++){
		 		var correct_regions = corrct_answers[corrct_answers_counter].correct_regions;
			
		 			for(var correct_regions_counter = 0; correct_regions_counter < correct_regions.length; correct_regions_counter++){
		 					var bin_index = correct_regions[correct_regions_counter];
		 					var bin_prop = sort.getBinProps(bin_index);
		 					var bin_counter = bin_prop.bin_counter;
		 					answer_object[bin_counter].objects_indexes.push({
		 						"index": corrct_answers[corrct_answers_counter].object_index
		 					});
		 			}
		 	}
			
			return answer_object;
			
			
		
			break;
		}
	}
	
	
	
}*/










/**
 * Sorting View
 * @author: Nicu Danila <NicuDanila@funnygarbage.com>
 */
var SortingView = Backbone.View.extend({
  defaults: {
    id: 0,
    //set canvas id
    canvasId : 'canvas_srt'
  },
  /**
   * Initialize the view
   * @params {object} options - Object defining the options used to initialize the current model
   */
  initialize: function(options) {
    //reset all global vars
    canvas_controller = hot_spot = choice = select = math_graph = field_text = field_image = drag_drop = text_highlight = sort = open_response = null;
    //closeHintbox();
    $('canvas.upper-canvas').remove();
    currentView = this;
    this.defaults = _.extend(this.defaults, options);
    this.render();
    this.afterRender();
  },
  /*
   * Load the canvas template used on the sorting demo
   */
  render: function() {
    // Compile the template using underscore
    var template = _.template( $("#canvas_template").text(), { canvas_id: this.defaults.canvasId } );
    // Load the compiled HTML into the Backbone "el"
    this.$el.html( template );
  },
  /*
   * After the canvas is rendered load the specific
   * Load action menu options
   */
  afterRender: function() {
	  namespace =  this.options.namespace;
	  namespace.canvas_controller = new CanvasController({canvasId: this.defaults.canvasId, namespace: this.options.namespace});
    //JSON DEMO
    sort = new Sorting({
      canvasId: this.defaults.canvasId,
      initialData: this.defaults.demoData,
      id: this.defaults.id,
      namespace: this.options.namespace
    });
  },
  /*
   * Load hint templates menu width provided hint title and text
   * @param title string
   * @param text string
   */
  renderHint: function(text, sound, image) {
    //Pass variables in using Underscore.js Template

    var variables = {hint_message: text, hint_audio: sound};
    // Compile the template using underscore
    var template = _.template( $("#hintbox_template").html(), variables );
    //place template inside hintbox div
    $('#app_hint').html( template );
    if (image) {
      var variables2 = {hint_sketch: image};
      var template2 = _.template( $("#hintbox_overlay_template").html(), variables2 );
      $('#app_hint_overlay').html( template2 );
      $('#app_hint_overlay').css('display', 'block');
    }
  },
          
  /**
   * Load hint by index
   * @params {number} index - index of the loaded hint
   */
  loadHint: function(index) {
    sort.loadHint(index);
    displayHintbox(index);
  }
});

/**
 * GrowingPacker static class
 * Handles 2D Bin Packing
 * Modified version of https://github.com/jakesgordon/bin-packing
 */
var GrowingPacker = {
  
  fit: function(blocks, sort) {
    this.sort.now(blocks, sort);

    var n, node, block, len = blocks.length;
    var w = len > 0 ? blocks[0].w : 0;
    var h = len > 0 ? blocks[0].h : 0;
    this.root = { x: 0, y: 0, w: w, h: h };
    for (n = 0; n < len ; n++) {
      block = blocks[n];
      if (node = this.findNode(this.root, block.w, block.h))
        block.fit = this.splitNode(node, block.w, block.h);
      else
        block.fit = this.growNode(block.w, block.h);
    }
  },

  sort: {
    random  : function (a,b) { return Math.random() - 0.5; },
    w       : function (a,b) { return b.w - a.w; },
    h       : function (a,b) { return b.h - a.h; },
    a       : function (a,b) { return b.area - a.area; },
    max     : function (a,b) { return Math.max(b.w, b.h) - Math.max(a.w, a.h); },
    min     : function (a,b) { return Math.min(b.w, b.h) - Math.min(a.w, a.h); },

    height  : function (a,b) { return GrowingPacker.sort.msort(a, b, ['h', 'w']);               },
    width   : function (a,b) { return GrowingPacker.sort.msort(a, b, ['w', 'h']);               },
    area    : function (a,b) { return GrowingPacker.sort.msort(a, b, ['a', 'h', 'w']);          },
    maxside : function (a,b) { return GrowingPacker.sort.msort(a, b, ['max', 'min', 'h', 'w']); },

    msort: function(a, b, criteria) { /* sort by multiple criteria */
      var diff, n;
      for (n = 0 ; n < criteria.length ; n++) {
        diff = GrowingPacker.sort[criteria[n]](a,b);
        if (diff != 0)
          return diff;
      }
      return 0;
    },

    now: function(blocks, sort) {
      if (sort != null && sort != 'none') {
        blocks.sort(GrowingPacker.sort[sort]);
      }
    }
  },

  findNode: function(root, w, h) {
    if (root.used)
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    else if ((w <= root.w) && (h <= root.h))
      return root;
    else
      return null;
  },

  splitNode: function(node, w, h) {
    node.used = true;
    node.down  = { x: node.x,     y: node.y + h, w: node.w,     h: node.h - h };
    node.right = { x: node.x + w, y: node.y,     w: node.w - w, h: h          };
    return node;
  },

  growNode: function(w, h) {
    var canGrowDown  = (w <= this.root.w);
    var canGrowRight = (h <= this.root.h);

    var shouldGrowRight = canGrowRight && (this.root.h >= (this.root.w + w)); // attempt to keep square-ish by growing right when height is much greater than width
    var shouldGrowDown  = canGrowDown  && (this.root.w >= (this.root.h + h)); // attempt to keep square-ish by growing down  when width  is much greater than height

    if (shouldGrowRight)
      return this.growRight(w, h);
    else if (shouldGrowDown)
      return this.growDown(w, h);
    else if (canGrowRight)
     return this.growRight(w, h);
    else if (canGrowDown)
      return this.growDown(w, h);
    else
      return null; // need to ensure sensible root starting size to avoid this happening
  },

  growRight: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w + w,
      h: this.root.h,
      down: this.root,
      right: { x: this.root.w, y: 0, w: w, h: this.root.h }
    };
    if (node = this.findNode(this.root, w, h))
      return this.splitNode(node, w, h);
    else
      return null;
  },

  growDown: function(w, h) {
    this.root = {
      used: true,
      x: 0,
      y: 0,
      w: this.root.w,
      h: this.root.h + h,
      down:  { x: 0, y: this.root.h, w: this.root.w, h: h },
      right: this.root
    };
    if (node = this.findNode(this.root, w, h))
      return this.splitNode(node, w, h);
    else
      return null;
  }

}



this.Sorting = Sorting;
this.SortingView = SortingView;
this.displayAnswerBase = displayAnswerBase;
this.getUserResponse = getUserResponse;

}

