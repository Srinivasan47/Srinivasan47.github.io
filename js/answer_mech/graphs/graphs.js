function graph() {

	var namespace,
	math_graph;



/**
 * Math Graph Model
 * Class that defines the math graph model properties
 * @author: Nicu Danila <NicuDanila@funnygarbage.com>
 */
var MathGraph = Backbone.Model.extend({
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

    // Canvas elements
    grid_title: null,
    grid_lines: [],

    axis_numbers: [],

    x_axis_title: null,
    x_axis_line: null,
    x_axis_start_arrow: null,
    x_axis_end_arrow: null,

    y_axis_title: null,
    y_axis_line: null,
    y_axis_start_arrow: null,
    y_axis_end_arrow: null,

    grid_cursor_point: null,
    grid_cursor_line: null,
    grid_cursor_label: null,

    // the width and height of a unit
    //unit_size: namespace.SEGMENTUNITSIZE,
    // the drawn shapes
    shapes: [],

    // drawing state attributes
    is_drawing: true, // for line and segment answer types, just one answer can be drawn; stop drawing after the answer had been added
    drawing_points_added: [], // the points added to the canvas when in drawing mode, in grid coordinates
    drawing_shapes: [], // the shapes added in drawing mode
    last_cursor_position: null,
    tools_flag: false,
    click_flag: false,

    /**
     * Returns the code of this Answer Mechanism
     */
    getAnswerMechanismCode: function () {
        return 'segment';
    },

    /**
     * Initialize the model, load exercise initial data, define the canvas
     * @param {object} options - Object defining the options used to initialize the current model
     * For New Exercise it should be empty
     * For Edit Exercise it should contain the ID of the exercise, the uploaded image path, the initial data file path the initial data type
     */
    initialize: function (options) {
        // initialize internal vars, as this method may be called a second time
        this.grid_title = null;
        this.grid_lines = [];

        this.axis_numbers = [];

        this.x_axis_title = null;
        this.x_axis_line = null;
        this.x_axis_start_arrow = null;
        this.x_axis_end_arrow = null;

        this.y_axis_title = null;
        this.y_axis_line = null;
        this.y_axis_start_arrow = null;
        this.y_axis_end_arrow = null;
        this.shapes = [];
        this.drawing_points_added = [];
        this.drawing_shapes = [];
        this.unit_size = namespace.SEGMENTUNITSIZE;

        //options should contain the ID of the exercise to Edit or no ID if adding new exercise
        this.defaults = _.extend(this.defaults, options);
        
       /* var configValues = {
        		unit_size: namespace.SEGMENTUNITSIZE
        }
        this.defaults = _.extend(this.defaults, configValues);*/
        // set the canvas object
        if (!namespace.canvas_controller) {
	    	namespace.canvas_controller = new CanvasController({canvasId: this.get('canvasId')});
	    	this.set({canvas: this.options.namespace.canvas_controller.get('canvas')});
	    }
	    else if (!this.get('canvas')) {
	    	this.set({canvas: namespace.canvas_controller.get('canvas')});
	    }
	    
	    namespace.canvas_controller.clearCanvas();
	    namespace.canvas_controller.setCurrentObjectElement(this);

        // for better performance, only render the canvas explicitly
        this.get('canvas').renderOnAddition = false;

        // add the canvas cursor (the dot that snaps to the grid)
        this.createDrawingCursor();

        // load the provided set of Data to prepare the exercise
        this.loadInitialDataSet();

        this.renderCanvasDelayed();

        this.addListeners();

        this.get('namespace').btn_reset.css('display','block');
    },

    /**
     * Renders the canvas twice: once on demand and once again in a separate thread
     * this way fabric will readjust position of loaded elements, which is required especially for text elements
     */
    renderCanvasDelayed: function () {
        var canvas = this.get('canvas');

        canvas.renderAll();
        // hardcoded value 1 used to force the browser to render the canvas in a separate thread, as soon as possible - DO NOT CHANGE THIS VALUE
        window.setTimeout(canvas.renderAll.bind(canvas), 1);
    },

    /**
     * Add a shape to the canvas
     * @param {object} config - the objct setup data
     * @param {bool} is_answer - whether this is an answer object or a regular art object
     */
    addShape: function (config, is_answer) {
        var color = is_answer ? namespace.SEGMENTANSWERARTDCOLOR : namespace.SEGMENTREGULARARTDCOLOR,
            canvas = this.get('canvas'),
            elements = [];

        // A shape may have multiple elements. All elements are first gathered into the elements array, and then groupped together in a single selectable fabric element
        switch (config.type) {
        case 'point':
            // compute the position of the point in canvas coordinates
            var position = this.getCanvasCoordinatesFromGridCoordinates(config.position.x, config.position.y);
            // the point only contains a circle
            elements.push(new fabric.Circle({
                left: position.x,
                top: position.y,
                radius: namespace.SEGMENTPOINTRADIUS,
                fill: color
            }));
            console.log("point painted on the graph");
            console.dir(elements);
            break;
        case 'segment':
            // compute the start / end points of the segment in canvas coordinates
            var from = this.getCanvasCoordinatesFromGridCoordinates(config.from.x, config.from.y);
            var to = this.getCanvasCoordinatesFromGridCoordinates(config.to.x, config.to.y);
            // add 2 the circles at each end of the segment
            elements.push(new fabric.Circle({
                left: from.x,
                top: from.y,
                radius: namespace.SEGMENTPOINTRADIUS,
                fill: color
            }));
            elements.push(new fabric.Circle({
                left: to.x,
                top: to.y,
                radius: namespace.SEGMENTPOINTRADIUS,
                fill: color
            }));
            // add the line that connects the circles
            elements.push(new fabric.Line([from.x, from.y, to.x, to.y], {
                fill: color,
                stroke: color,
                strokeWidth: namespace.SEGMENTLINETHICKNESS
            }));
            break;
        case 'line':
            // compute the start / end points of the segment in canvas coordinates
            var from = this.getCanvasCoordinatesFromGridCoordinates(config.from.x, config.from.y);
            var to = this.getCanvasCoordinatesFromGridCoordinates(config.to.x, config.to.y);
            // add 2 the circles at each end of the line segment
            elements.push(new fabric.Circle({
                left: from.x,
                top: from.y,
                radius: namespace.SEGMENTPOINTRADIUS,
                fill: color
            }));
            elements.push(new fabric.Circle({
                left: to.x,
                top: to.y,
                radius: namespace.SEGMENTPOINTRADIUS,
                fill: color
            }));

            // create a line slightly longer than the segment provided
            var padding = namespace.SEGMENTLINEPADDING * this.unit_size;

            // calculate the start point(x1, y1), the end point (x2, y2) of the line and the angles of the arrows placed at each end
            var x1, y1, x2, y2, arrow1_angle, arrow2_angle;

            // if  the line is vertical, then a slope cannot be measured so different calculations are applied (based on the fact that the line is vertical)
            if (to.x == from.x) {
                // hardcoded values 1 and -1 used to store the sign - DO NOT CHANGE THIS VALUE
                var direction = (from.y > to.y ? 1 : -1);
                // start point
                x1 = from.x;
                y1 = from.y + padding * +direction;
                // end point
                x2 = to.x;
                y2 = to.y + padding * -direction;

                // arrow angles
                arrow1_angle = 90 + 90 * direction;
                arrow2_angle = 90 + 90 * -direction;
            } else {
                var slope = (to.y - from.y) / (to.x - from.x),
                    direction = (from.x > to.x ? 1 : -1); // hardcoded values 1 and -1 used to store the sign - DO NOT CHANGE THIS VALUE

                // start point
                x1 = from.x + padding / Math.sqrt(Math.pow(slope, 2) + 1) * direction;
                y1 = slope * (x1 - from.x) + from.y;

                // end point
                x2 = to.x + padding / Math.sqrt(Math.pow(slope, 2) + 1) * -direction;
                y2 = slope * (x2 - to.x) + to.y;

                // get the angle of the line
                var angle = Math.atan2(to.x - from.x, to.y - from.y) * 180 / Math.PI;
                // arrow angles
                arrow1_angle = Math.round((360 - angle) % 360),
                arrow2_angle = Math.round((arrow1_angle + 180) % 360);
            }
            // add the line that connects the circles
            elements.push(new fabric.Line([x1, y1, x2, y2], {
                fill: color,
                stroke: color,
                strokeWidth: namespace.SEGMENTLINETHICKNESS
            }));
            // add the 2 arrows at each end of the line
            elements.push(new fabric.Triangle({
                left: x1,
                top: y1,
                width: namespace.SEGMENTLINEARROWWIDTH,
                height: namespace.SEGMENTLINEARROWHEIGHT,
                angle: arrow1_angle,
                fill: color
            }));
            elements.push(new fabric.Triangle({
                left: x2,
                top: y2,
                width: namespace.SEGMENTLINEARROWWIDTH,
                height: namespace.SEGMENTLINEARROWHEIGHT,
                angle: arrow2_angle,
                fill: color
            }));
            break;
        case 'polygon':
            // The poligon is drawn line by line, as fabric.Polygon would be filled

            // if the last point is different than the first point, then add and extra point to complete the polygon
            if (config.points.length > 1 && (config.points[0].x != config.points[config.points.length - 1].x || config.points[0].y != config.points[config.points.length - 1].y)) {
                config.points.push({
                    x: config.points[0].x,
                    y: config.points[0].y
                });
            }

            // first convert all grid points to canvas coordinates
            var points = [];
            for (var points_counter = 0; points_counter < config.points.length; points_counter++) {
                points.push(this.getCanvasCoordinatesFromGridCoordinates(config.points[points_counter].x, config.points[points_counter].y));
            }

            // add a circle for each point of the polygon, except the last one (which is the same as the first one)
            for (var points_counter = 0; points_counter < points.length - 1; points_counter++) {
                elements.push(new fabric.Circle({
                    left: points[points_counter].x,
                    top: points[points_counter].y,
                    radius: namespace.SEGMENTPOINTRADIUS,
                    fill: color
                }));
            }

            // add lines between each point of the polygon
            for (var points_counter = 0; points_counter < points.length - 1; points_counter++) {
                elements.push(new fabric.Line([points[points_counter].x, points[points_counter].y, points[points_counter + 1].x, points[points_counter + 1].y], {
                    fill: color,
                    stroke: color,
                    strokeWidth: namespace.SEGMENTLINETHICKNESS
                }));
            }

            break;
        }

        // if the elements array is empty, then and invalid config object was provided
        if (elements.length == 0) {
            return;
        }

        // group all elements into a single fabric object; the object must be selectable and must have a visible border, but it cannot be moved or altered in any way
        var group = new fabric.Group(elements, {
            selectable: false,
            hasBorders: false,
            hasControls: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true
        });

        // add custom attributes, to recognize the group in the future and to store the original data
        group.is_art_shape = true;
        group.config = config;
        group.is_answer = is_answer;

        this.shapes.push(group);

        canvas.add(group);
    },

    /**
     * Drops current shapes and recreates them (useful when the grid is being updated based on new ranges and the shapes need to be displayed at new poistions)
     */
    rebuildShapes: function () {
        var canvas = this.get('canvas'),
            shapes_configs_clone = [];

        // store a clone of the current config of each shape
        for (var shapesCounter = 0; shapesCounter < this.shapes.length; shapesCounter++) {
            shapes_configs_clone.push({
                is_answer: this.shapes[shapesCounter].is_answer,
                config: $.extend({}, this.shapes[shapesCounter].config)
            });

            // remove the shape from the canvas
            canvas.remove(this.shapes[shapesCounter]);
        }

        // empty the shapes array
        this.shapes = [];

        // add the shapes back
        for (var shapesCounter = 0; shapesCounter < shapes_configs_clone.length; shapesCounter++) {
            this.addShape(shapes_configs_clone[shapesCounter].config, shapes_configs_clone[shapesCounter].is_answer);
        }
    },

    /**
     * Get the type of answer for the current exercise
     * Only one type of answer shapes may be added
     * @return {string}
     */
    getAnswerType: function () {
        return this.get('initialData').answer_type;
    },

    /**
     * Fixes the z-index of shapes, making sure that the shapes are always above the grid
     * and that overlapping shapes can be selected
     */
    setShapesZIndex: function () {
        var canvas = this.get('canvas'),
            selected_shape = canvas.getActiveObject();

        // build a separate array of the shapes, ordered by the current zIndex (if attribute is present, as some or all elements may not have it => these are place at the top)
        var shapes = [];

        // add the selected shape, as this one has to get to the bottom
        if (selected_shape) {
            shapes.push(selected_shape);
        }

        // add the shapes that already have a zindex, in the same order
        var last_min_z_index = null;
        while (true) {
            var min_zindex = null,
                shape;

            // walk through all the shapes and choose the mimimum zIndex that is greater then the last minimum zIndex found
            for (var shapesCounter = 0; shapesCounter < this.shapes.length; shapesCounter++) {
                if (
                    selected_shape != this.shapes[shapesCounter] && // ignore the currently selected shape, as this one has to get to the bottom
                    this.shapes[shapesCounter].zIndex != null && // only test for shapes that already have a zIndex set (the others will get to the top)
                    (last_min_z_index === null || last_min_z_index < this.shapes[shapesCounter].zIndex) && // if this is the first iteration of the while loop (so last_min_z_index is still null) or if the current zIndex is greater then the minimum zIndex used in the previous iteration
                    (min_zindex === null || min_zindex > this.shapes[shapesCounter].zIndex) // if this is the first iteration of the for loop or if the current zIndex is smaller then the minimum zIndex found so far
                ) {
                    min_zindex = this.shapes[shapesCounter].zIndex;
                    shape = this.shapes[shapesCounter];
                }
            }

            // if min_zindex is still null, then all the shapes had been added, so exit the loop
            if (min_zindex === null) {
                break;
            }
            shapes.push(shape);
            last_min_z_index = min_zindex;
        }

        // add shapes that don't have a zIndex yet
        for (var shapesCounter = 0; shapesCounter < this.shapes.length; shapesCounter++) {
            if (selected_shape != this.shapes[shapesCounter] && this.shapes[shapesCounter].zIndex == null) {
                shapes.push(this.shapes[shapesCounter]);
            }
        }

        // set consecutive values for zIndex and also update the order on the actual canvas
        for (var shapesCounter = 0; shapesCounter < shapes.length; shapesCounter++) {
            shapes[shapesCounter].zIndex = shapesCounter;
            shapes[shapesCounter].bringToFront();
        }
    },

    /**
     * Check that initial data set corresponds to this exercise and load all info required for this exercise to run
     */
    loadInitialDataSet: function () {
        // get article data
        var data = this.get('initialData');
        this.load_data(data);
    },

    /**
     * Define the method called once the xml data is retrieved or after the json data is defined
     * @param {object} data - initial data
     */
    load_data: function (data) {
        namespace.canvas_controller.renderQuestionHTML(data);
        namespace.canvas_controller.defaultViewselection();
        // reset current hint
        current_hint = 1;

        // change the default existingHints to exercise's hints number
        existingHints = data.hints_total;

        namespace.canvas_controller.set({
            totalAvailableHints: existingHints
        });
        $('#app_exercise_check').html('Check My Answer');
        $('#app_exercise_check').attr('onclick', 'checkExercise()');
        $('#question_area_html').css('display', 'block');
        // draw the graph
        this.renderGrid();
        this.renderGridTitle();
        this.renderAxes();

        var available_art = this.get('initialData').graph_data.available_art;
        for (var art_counter = 0; art_counter < available_art.length; art_counter++) {
            this.addShape(available_art[art_counter], false);
        }

        this.setShapesZIndex();
        this.bringCursorToFront();
        this.renderCanvasDelayed();
    },

    /**
     * Add listeres for the canvas elements and html elements to handle click/touch events
     */
    addListeners: function () {
        this.get('canvas').on({
            'mouse:down': $.proxy(this.onCanvasMouseDown, this),
            'mouse:move': $.proxy(this.onCanvasMouseMove, this),
        });
    },

    /**
     * Callback for the mouse down event
     * @param {event} evt - event that triggered the call
     */
    onCanvasMouseDown: function (evt) {
        if (!this.is_drawing) {
            return;
        }
        var canvas = this.get('canvas');
        if (evt.e.touches) {
            console.log('touch adddrawingpoint method called');
            this.addDrawingPoint(this.getGridCoordinatesFromCanvasCoordinates(parseInt(evt.e.touches[0].pageX) - canvas._offset.left, parseInt(evt.e.touches[0].pageY) - canvas._offset.top));        

        } else {
            console.log('non-touch adddrawingpoint method called');
            this.addDrawingPoint(this.getGridCoordinatesFromCanvasCoordinates(evt.e.layerX, evt.e.layerY));            
        }

    },

    /**
     * Callback for the mouse move event
     * @param {event} evt - event that triggered the call
     */
    onCanvasMouseMove: function (evt) {
        if (!this.is_drawing) {
            return;
        }
        console.log('touch onCanvasMouseMove method called');
        this.updateDrawingCursorPosition(this.getGridCoordinatesFromCanvasCoordinates(evt.e.layerX, evt.e.layerY));
    },

    /**
     * Renders the grid lines
     * Fabric objects are reused instead of being removed and recreated
     */
    renderGrid: function () {
        var canvas = this.get('canvas'),
            data = this.get('initialData').graph_data;

        // hide prevoius lines
        for (var linesCounter = 0; linesCounter < this.grid_lines.length; linesCounter++) {
            this.grid_lines[linesCounter].visible = false;
        }

        // if the 'Show grid' checkbox is not checked, then do not render the grid
        if (!data.show_grid) {
            return;
        }

        var lines = [];
        // build the new lines coordinates

        // if the Y axis is not displayed, then make the X lines longer
        // hardcoded value 2 to display half of the unit size above and half below (1 unit size total) - DO NOT CHANGE THIS VALUE
        var y_padd = data.yAxis.from == data.yAxis.to ? this.unit_size / 2 : 0;
        for (var x = data.xAxis.from; x <= data.xAxis.to; x += data.xAxis.scale, x = x.roundDecimals(namespace.SEGMENTMAXDECIMALS)) {
            var from = this.getCanvasCoordinatesFromGridCoordinates(x, data.yAxis.from),
                to = this.getCanvasCoordinatesFromGridCoordinates(x, data.yAxis.to);
            lines.push({
                x1: from.x,
                y1: from.y - y_padd,
                x2: to.x,
                y2: to.y + y_padd
            });
        }

        // if the X axis is not displayed, then make the Y lines longer
        // hardcoded value 2 to display half of the unit size to the left and half to the right (1 unit size total) - DO NOT CHANGE THIS VALUE
        var x_padd = data.xAxis.from == data.xAxis.to ? this.unit_size / 2 : 0;
        for (var y = data.yAxis.from; y <= data.yAxis.to; y += data.yAxis.scale, y = y.roundDecimals(namespace.SEGMENTMAXDECIMALS)) {
            var from = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, y),
                to = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.to, y);
            lines.push({
                x1: from.x - x_padd,
                y1: from.y,
                x2: to.x + x_padd,
                y2: to.y
            });
        }

        // make sure enough lines are present in this.grid_lines
        for (var linesCounter = this.grid_lines.length; linesCounter < lines.length; linesCounter++) {
            this.grid_lines.push(new fabric.Line([0, 0, 0, 0], {
                fill: namespace.SEGMENTGRIDCOLOR,
                stroke: namespace.SEGMENTGRIDCOLOR,
                strokeWidth: namespace.SEGMENTGRIDLINEWIDTH,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            }));
            canvas.add(this.grid_lines[this.grid_lines.length - 1]);
        }

        // update lines values
        for (var linesCounter = 0; linesCounter < lines.length; linesCounter++) {
            this.grid_lines[linesCounter].set(lines[linesCounter]);
            this.grid_lines[linesCounter].visible = true;
        }

        // if axes are present, bring them to front as they must be drawn above the grid
        if (this.x_axis_line) {
            this.x_axis_line.bringToFront();
        }
        if (this.y_axis_line) {
            this.y_axis_line.bringToFront();
        }
    },

    /**
     * Renders the grid's title
     * The fabric 'text' object is reused instead of being removed and recreated
     */
    renderGridTitle: function () {
        var canvas = this.get('canvas'),
            data = this.get('initialData').graph_data;

        // create the 'text' element, if not already present
        if (!this.grid_title) {
            this.grid_title = new fabric.Text('', {
                fontFamily: namespace.SEGMENTGRIDTITLEFONT,
                fontSize: namespace.SEGMENTGRIDTITLESIZE,
                fontStyle: namespace.SEGMENTGRIDTITLESTYLE,
                fill: namespace.SEGMENTGRIDTITLECOLOR,
                textShadow: namespace.SEGMENTGRIDTITLESHADDOW,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            });
            canvas.add(this.grid_title);
        }

        // get the position of the title: above the grid, horizontally centered
        // hardcoded value 2 used to get center of the object - DO NOT CHANGE THIS VALUE
        var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from + (data.xAxis.to - data.xAxis.from) / 2, data.yAxis.to);

        // update text and position
        this.grid_title.text = (data.title == null) ? "" : data.title;
        this.grid_title.left = position.x;
        this.grid_title.top = position.y - namespace.SEGMENTGRIDTITLEDISTANCE;
    },

    /**
     * Renders axes: lines, arrows, titles and numbers
     * Fabric objects are reused instead of being removed and recreated
     */
    renderAxes: function () {
        var canvas = this.get('canvas'),
            data = this.get('initialData').graph_data;

        // hide all previously created elements (if any)
        for (var numbersCounter = 0; numbersCounter < this.axis_numbers.length; numbersCounter++) {
            this.axis_numbers[numbersCounter].visible = false;
        }

        if (this.x_axis_title) {
            this.x_axis_title.visible = false;
        }
        if (this.x_axis_line) {
            this.x_axis_line.visible = false;
        }
        if (this.x_axis_start_arrow) {
            this.x_axis_start_arrow.visible = false;
        }
        if (this.x_axis_end_arrow) {
            this.x_axis_end_arrow.visible = false;
        }

        if (this.y_axis_title) {
            this.y_axis_title.visible = false;
        }
        if (this.y_axis_line) {
            this.y_axis_line.visible = false;
        }
        if (this.y_axis_start_arrow) {
            this.y_axis_start_arrow.visible = false;
        }
        if (this.y_axis_end_arrow) {
            this.y_axis_end_arrow.visible = false;
        }


        // if 'Show axes' is not checked or nothing was yet selected for the axes types, then don't display any of the axes
        if (!data.show_axes || data.axes_labels == 'none') {
            return;
        }

        // Get grid bounds
        var from = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, data.yAxis.from),
            to = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.to, data.yAxis.to),
            grid_bounds = {
                topLeft: {
                    x: Math.floor(from.x),
                    y: Math.floor(to.y)
                },
                bottomRight: {
                    x: Math.floor(to.x),
                    y: Math.floor(from.y)
                },
                center: {
                    x: Math.floor(from.x + (to.x - from.x) / 2),
                    y: Math.floor(to.y + (from.y - to.y) / 2)
                }
            };

        // Calculate which of the 4 axis ends will be displaying an arrow; this is needed to also display longer lines
        var display_x_arrow_start = false,
            display_x_arrow_end = false,
            display_y_arrow_start = false,
            display_y_arrow_end = false;

        // if the X axis is not shown, then display both ends for the Y axis
        if (data.xAxis.from == data.xAxis.to) {
            display_y_arrow_start = display_y_arrow_end = true;
        }
        // if the Y axis is not shown, then display both ends for the X axis
        else if (data.yAxis.from == data.yAxis.to) {
            display_x_arrow_start = display_x_arrow_end = true;
        }
        // if displaying a 2 or a 4 quadrant grid, display all arrows
        else if ((data.xAxis.from < 0 && 0 < data.xAxis.to) || (data.yAxis.from < 0 && 0 < data.yAxis.to)) {
            display_x_arrow_start = display_x_arrow_end = display_y_arrow_start = display_y_arrow_end = true;
        }
        // at this point there is just one quadran visible => for each axis display one arrow at the end that doesn't intersect the other axis
        // if both axes display positive values, then they intersect in the bottom-left corner of the grid
        else if (data.xAxis.from >= 0 && data.yAxis.from >= 0) {
            display_x_arrow_end = display_y_arrow_end = true;
        }
        // if both axes display negative values, then they intersect in the top-right corner of the grid
        else if (data.xAxis.to <= 0 && data.yAxis.to <= 0) {
            display_x_arrow_start = display_y_arrow_start = true;
        }
        // so one axis is displaying positive numbers and the other negative numbers
        // if the X axis contains positive numbers, then they intersect in the top-left corner of the grid
        else if (data.xAxis.from >= 0) {
            display_x_arrow_end = display_y_arrow_start = true;
        }
        // at this point, the X axis contains negative values and the Y axis positive ones, so they intersect in the bottom-right corner of the grid
        else {
            display_x_arrow_start = display_y_arrow_end = true;
        }

        // Draw the X axis line
        // get the coords of the line: if the Y range contains 0, then  this axis will be placed at vertical 0; otherwise it is place on the side that is closest to 0
        var x_axis_top = (data.yAxis.from <= 0 && 0 <= data.yAxis.to) ? 0 : (Math.abs(data.yAxis.from) < Math.abs(data.yAxis.to) ? data.yAxis.from : data.yAxis.to);
        var from = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from + (display_x_arrow_start ? -data.xAxis.scale : 0), x_axis_top),
            to = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.to + (display_x_arrow_end ? data.xAxis.scale : 0), x_axis_top);
        // create the line, if not already present
        if (!this.x_axis_line) {
            this.x_axis_line = new fabric.Line([0, 0, 0, 0], {
                fill: namespace.SEGMENTAXISCOLOR,
                stroke: namespace.SEGMENTAXISCOLOR,
                strokeWidth: namespace.SEGMENTAXISWIDTH,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            });
            canvas.add(this.x_axis_line);
        }
        // update line coords
        this.x_axis_line.set({
            x1: from.x,
            y1: from.y,
            x2: to.x,
            y2: to.y
        });
        this.x_axis_line.visible = true;

        // Draw the Y axis line
        // get the coords of the line: if the X range contains 0, then this axis will be placed at horizontal 0; otherwise it is place on the side that is closest to 0
        var y_axis_left = (data.xAxis.from <= 0 && 0 <= data.xAxis.to) ? 0 : (Math.abs(data.xAxis.from) < Math.abs(data.xAxis.to) ? data.xAxis.from : data.xAxis.to);
        var from = this.getCanvasCoordinatesFromGridCoordinates(y_axis_left, data.yAxis.from + (display_y_arrow_start ? -data.yAxis.scale : 0)),
            to = this.getCanvasCoordinatesFromGridCoordinates(y_axis_left, data.yAxis.to + (display_y_arrow_end ? data.yAxis.scale : 0));

        // create the line, if not already present
        if (!this.y_axis_line) {
            this.y_axis_line = new fabric.Line([0, 0, 0, 0], {
                fill: namespace.SEGMENTAXISCOLOR,
                stroke: namespace.SEGMENTAXISCOLOR,
                strokeWidth: namespace.SEGMENTAXISWIDTH,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            });
            canvas.add(this.y_axis_line);
        }
        // update line coords
        this.y_axis_line.set({
            x1: from.x,
            y1: from.y,
            x2: to.x,
            y2: to.y
        });
        this.y_axis_line.visible = true;


        // Create and display the 4 arrows

        // Draw the start X axis arrow
        if (display_x_arrow_start) {
            // create the start X axis arrow, if not already present
            if (!this.x_axis_start_arrow) {
                // hardcoded value 270 used to rotate the arrow to point to the left - DO NOT CHANGE THIS VALUE
                this.x_axis_start_arrow = new fabric.Triangle({
                    width: namespace.SEGMENTAXISARROWWIDTH,
                    height: namespace.SEGMENTAXISARROWHEIGHT,
                    angle: 270,
                    fill: namespace.SEGMENTAXISCOLOR,
                    opacity: namespace.SEGMENTGRIDOPACITY,
                    selectable: false
                });
                canvas.add(this.x_axis_start_arrow);
            }
            // update the start X arrow position, based on the coords that were previously calculated for the line (place the arrow at the start of the line)
            this.x_axis_start_arrow.left = this.x_axis_line.x1;
            this.x_axis_start_arrow.top = this.x_axis_line.top;
            this.x_axis_start_arrow.visible = true;
        }

        // Draw the end X axis arrow
        if (display_x_arrow_end) {
            // create the end X axis arrow, if not already present
            if (!this.x_axis_end_arrow) {
                // hardcoded value 90 used to rotate the arrow to point to the right - DO NOT CHANGE THIS VALUE
                this.x_axis_end_arrow = new fabric.Triangle({
                    width: namespace.SEGMENTAXISARROWWIDTH,
                    height: namespace.SEGMENTAXISARROWHEIGHT,
                    angle: 90,
                    fill: namespace.SEGMENTAXISCOLOR,
                    opacity: namespace.SEGMENTGRIDOPACITY,
                    selectable: false
                });
                canvas.add(this.x_axis_end_arrow);
            }
            // update the end X arrow position, based on the coords that were previously calculated for the line (place the arrow at the end of the line)
            this.x_axis_end_arrow.left = this.x_axis_line.x2;
            this.x_axis_end_arrow.top = this.x_axis_line.top;
            this.x_axis_end_arrow.visible = true;
        }

        // Draw the start Y axis arrow
        if (display_y_arrow_start) {
            // create the start Y axis arrow, if not already present
            if (!this.y_axis_start_arrow) {
                // hardcoded value 180 used to rotate the arrow to point to the right - DO NOT CHANGE THIS VALUE
                this.y_axis_start_arrow = new fabric.Triangle({
                    width: namespace.SEGMENTAXISARROWWIDTH,
                    height: namespace.SEGMENTAXISARROWHEIGHT,
                    angle: 180,
                    fill: namespace.SEGMENTAXISCOLOR,
                    opacity: namespace.SEGMENTGRIDOPACITY,
                    selectable: false
                });
                canvas.add(this.y_axis_start_arrow);
            }
            // update the arrow position, based on the coords that were previously calculated for the line (place the arrow at the start of the line)
            this.y_axis_start_arrow.left = this.y_axis_line.left;
            this.y_axis_start_arrow.top = this.y_axis_line.y1;
            this.y_axis_start_arrow.visible = true;
        }

        // Draw the end Y axis arrow
        if (display_y_arrow_end) {
            // create the end Y axis arrow, if not already present
            if (!this.y_axis_end_arrow) {
                this.y_axis_end_arrow = new fabric.Triangle({
                    width: namespace.SEGMENTAXISARROWWIDTH,
                    height: namespace.SEGMENTAXISARROWHEIGHT,
                    fill: namespace.SEGMENTAXISCOLOR,
                    opacity: namespace.SEGMENTGRIDOPACITY,
                    selectable: false
                });
                canvas.add(this.y_axis_end_arrow);
            }
            // update the arrow position, based on the coords that were previously calculated for the line (place the arrow at the end of the line)
            this.y_axis_end_arrow.left = this.y_axis_line.left;
            this.y_axis_end_arrow.top = this.y_axis_line.y2;
            this.y_axis_end_arrow.visible = true;
        }

        // the position of the numbers depends on the position of the axes (to the top/bottom of the X axis line or to the left/right of the Y axis line)
        // decide on which side the numbers are placed by comparring the position of the axis line with the center of the grid
        // this is also used to decide where are the axis titles displayed when showing 0 or 1 quadrant
        var show_numbers_above = Math.floor(this.x_axis_line.top) < grid_bounds.center.y,
            show_numbers_to_the_right = Math.floor(this.y_axis_line.left) > grid_bounds.center.x;


        // create the X axis title element, if not already present
        if (!this.x_axis_title) {
            this.x_axis_title = new fabric.Text('', {
                fontFamily: namespace.SEGMENTAXISTITLEFONT,
                fontSize: namespace.SEGMENTAXISTITLESIZE,
                fontStyle: namespace.SEGMENTAXISTITLESTYLE,
                fill: namespace.SEGMENTAXISTITLECOLOR,
                textShadow: namespace.SEGMENTAXISTITLESHADDOW,
                lineHeight: namespace.SEGMENTAXISTITLELINEHEIGHT,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            });
            canvas.add(this.x_axis_title);
        }
        // create the Y axis title element, if not already present
        if (!this.y_axis_title) {
            this.y_axis_title = new fabric.Text('', {
                fontFamily: namespace.SEGMENTAXISTITLEFONT,
                fontSize: namespace.SEGMENTAXISTITLESIZE,
                fontStyle: namespace.SEGMENTAXISTITLESTYLE,
                fill: namespace.SEGMENTAXISTITLECOLOR,
                textShadow: namespace.SEGMENTAXISTITLESHADDOW,
                lineHeight: namespace.SEGMENTAXISTITLELINEHEIGHT,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            });
            canvas.add(this.y_axis_title);
        }

        // Update the text and position of the axes labels:
        //  - for 2 or 4 quadrants the label is always X and Y respectively, and it is placed next to one of the arrows (to the right for X and above for Y); no label gets rotated
        //  - for 0 or 1 quadrant the form text is used and the label is centered next to the axis; the Y axis label is rotated

        // 2 or 4 quadrants
        if ((data.xAxis.from < 0 && 0 < data.xAxis.to) || (data.yAxis.from < 0 && 0 < data.yAxis.to)) {
            if (this.x_axis_end_arrow != null) {
                this.x_axis_title.set({
                    text: (data.xAxis.title == null) ? "" : data.xAxis.title.toLowerCase(),
                    left: this.x_axis_end_arrow.left + namespace.SEGMENTXAXISARROWTITLEDISTANCE,
                    top: this.x_axis_end_arrow.top,
                    visible: true
                });
            }
            if (this.y_axis_end_arrow != null) {
                this.y_axis_title.set({
                    text: (data.yAxis.title == null) ? "" : data.yAxis.title.toLowerCase(),
                    left: this.y_axis_end_arrow.left,
                    top: this.y_axis_end_arrow.top - namespace.SEGMENTYAXISARROWTITLEDISTANCE,
                    angle: 0,
                    visible: true
                });
            }
        }
        // 0 or 1 quadrant
        else {
            // update the text and position of the X axis object
            if (data.xAxis.from == data.xAxis.to) {
                // if axis is not present, just hide the label
                this.x_axis_title.visible = false;
            } else {
                if (data.xAxis.from < 0) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, show_numbers_above ? data.yAxis.to : data.yAxis.from);
                    var x_title_shift = -2.2 * namespace.SEGMENTXAXISARROWTITLEDISTANCE;
                } else {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.to, show_numbers_above ? data.yAxis.to : data.yAxis.from);
                    var x_title_shift = 2.2 * namespace.SEGMENTXAXISARROWTITLEDISTANCE;
                }
                this.x_axis_title.set({
                    text: data.xAxis.title,
                    left: position.x + x_title_shift,
                    top: position.y, //+ SEGMENTXAXISGRIDTITLEDISTANCE * (show_numbers_above ? -1 : 1),
                    visible: true
                });
            }
            // update the text and position of the Y axis object
            if (data.yAxis.from == data.yAxis.to) {
                // if axis is not present, just hide the label
                this.y_axis_title.visible = false;
            } else {
                if (data.yAxis.from < 0) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(show_numbers_to_the_right ? data.xAxis.to : data.xAxis.from, data.yAxis.from);
                    var y_title_shift = -2 * namespace.SEGMENTYAXISARROWTITLEDISTANCE;
                } else {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(show_numbers_to_the_right ? data.xAxis.to : data.xAxis.from, data.yAxis.to);
                    var y_title_shift = 2 * namespace.SEGMENTYAXISARROWTITLEDISTANCE;
                }
                this.y_axis_title.set({
                    text: data.yAxis.title,
                    left: position.x, //+ SEGMENTYAXISGRIDTITLEDISTANCE * (show_numbers_to_the_right ? 1: -1),
                    top: position.y - y_title_shift,
                    //angle: show_numbers_to_the_right ? 90 : 270, // hardcoded value 270 used to rotate the text - DO NOT CHANGE THIS VALUE
                    visible: true
                });
            }
        }


        // Add numbers, depending on the form selection
        var numbers = [],
            x_numbers = [],
            y_numbers = [];
        var x_axis_distance = data.yAxis.from == data.yAxis.to ? namespace.SEGMENTXAXISONLYNUMBERDISTANCE : namespace.SEGMENTXAXISNUMBERDISTANCE,
            x_axis_top = this.x_axis_line.top + x_axis_distance * (show_numbers_above ? -1 : 1),
            x_axis_originX = 'center',
            x_axis_originY = show_numbers_above ? 'bottom' : 'top',

            y_axis_distance = data.xAxis.from == data.xAxis.to ? namespace.SEGMENTYAXISONLYNUMBERDISTANCE : namespace.SEGMENTYAXISNUMBERDISTANCE,
            y_axis_left = this.y_axis_line.left + y_axis_distance * (show_numbers_to_the_right ? 1 : -1),
            y_axis_originX = show_numbers_to_the_right ? 'left' : 'right',
            y_axis_originY = 'center';

        switch (data.axes_labels) {
        case 'non-numbered':
            // no numbers displayed, nothing to do here
            break;
        case 'each-gridline':
        case 'every-other-gridline':
            // display all numbers or every second number
            // hardcoded values 1 and 2 used to decide how often the numbers are display (on each gridline or on every other gridline) - DO NOT CHANGE THIS VALUE
            var step = data.axes_labels == 'every-other-gridline' ? 2 : 1;

            if (data.xAxis.from != data.xAxis.to) {
                for (var x = data.xAxis.from; x <= data.xAxis.to; x += data.xAxis.scale * step, x = x.roundDecimals(namespace.SEGMENTMAXDECIMALS)) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(x, data.yAxis.from);
                    var gridText = this.getGridNumberAsText(x);
                    var angle = 0;
                    var topPatch = 0;
                    if (gridText.integerpart.toString().indexOf('.') != -1) {
                        angle = -90;
                        topPatch = 14;

                    }
                    numbers.push({
                        number: x,
                        left: position.x,
                        top: (x_axis_top + topPatch),
                        originX: x_axis_originX,
                        originY: x_axis_originY,
                        angle: angle
                    });
                    x_numbers.push({
                        number: x,
                        left: position.x,
                        top: (x_axis_top + topPatch),
                        originX: x_axis_originX,
                        originY: x_axis_originY,
                        angle: angle
                    });
                }
            }

            if (data.yAxis.from != data.yAxis.to) {
                for (var y = data.yAxis.from; y <= data.yAxis.to; y += data.yAxis.scale * step, y = y.roundDecimals(namespace.SEGMENTMAXDECIMALS)) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, y);
                    numbers.push({
                        number: y,
                        left: y_axis_left,
                        top: position.y,
                        originX: y_axis_originX,
                        originY: y_axis_originY,
                        angle: 0
                    });
                    y_numbers.push({
                        number: y,
                        left: y_axis_left,
                        top: position.y,
                        originX: y_axis_originX,
                        originY: y_axis_originY,
                        angle: 0
                    });
                }
            }
            break;
        case 'min-max-values':
            // add X axis min and max
            if (data.xAxis.from != data.xAxis.to) {
                var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, data.yAxis.from);
                numbers.push({
                    number: data.xAxis.from,
                    left: position.x,
                    top: x_axis_top,
                    originX: x_axis_originX,
                    originY: x_axis_originY,
                    angle: 0
                });

                var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.to, data.yAxis.from);
                numbers.push({
                    number: data.xAxis.to,
                    left: position.x,
                    top: x_axis_top,
                    originX: x_axis_originX,
                    originY: x_axis_originY,
                    angle: 0
                });
            }

            // add Y axis min and max
            if (data.yAxis.from != data.yAxis.to) {
                if ((data.yAxis.from != 0) || ((data.xAxis.from != 0) && (data.xAxis.to != 0)) || (data.xAxis.from == data.xAxis.to)) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, data.yAxis.from);
                    numbers.push({
                        number: data.yAxis.from,
                        left: y_axis_left,
                        top: position.y,
                        originX: y_axis_originX,
                        originY: y_axis_originY,
                        angle: 0
                    });
                }
                if ((data.yAxis.to != 0) || ((data.xAxis.from != 0) && (data.xAxis.to != 0)) || (data.xAxis.from == data.xAxis.to)) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, data.yAxis.to);
                    numbers.push({
                        number: data.yAxis.to,
                        left: y_axis_left,
                        top: position.y,
                        originX: y_axis_originX,
                        originY: y_axis_originY,
                        angle: 0
                    });
                }
            }
            break;
        case 'zero-always-labeled':
            if (data.xAxis.from != data.xAxis.to) {
                // add X axis 0
                var zeroLeftShift = 0;
                if (data.yAxis.from != data.yAxis.to) {
                    zeroLeftShift = 10;
                }
                if (data.xAxis.from <= 0 && 0 <= data.xAxis.to) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(0, data.yAxis.from);
                    numbers.push({
                        number: 0,
                        left: position.x - zeroLeftShift,
                        top: x_axis_top,
                        originX: x_axis_originX,
                        originY: x_axis_originY,
                        angle: 0
                    });
                }
            } else {
                // add Y axis 0
                if (data.yAxis.from <= 0 && 0 <= data.yAxis.to) {
                    var position = this.getCanvasCoordinatesFromGridCoordinates(data.xAxis.from, 0);
                    numbers.push({
                        number: 0,
                        left: y_axis_left,
                        top: position.y,
                        originX: y_axis_originX,
                        originY: y_axis_originY,
                        angle: 0
                    });
                }
            }

            break;
        }

        // make sure enough text elements  are present in this.axis_numbers
        for (var numbersCounter = this.axis_numbers.length; numbersCounter < numbers.length; numbersCounter++) {
            this.axis_numbers.push(new fabric.Text('', {
                fontFamily: namespace.SEGMENTAXISNUMBERFONT,
                fontSize: namespace.SEGMENTAXISNUMBERSIZE,
                fontStyle: namespace.SEGMENTAXISNUMBERSTYLE,
                fill: namespace.SEGMENTAXISNUMBERCOLOR,
                textShadow: namespace.SEGMENTAXISNUMBERSHADDOW,
                lineHeight: namespace.SEGMENTAXISNUMBERLINEHEIGHT,
                opacity: namespace.SEGMENTGRIDOPACITY,
                selectable: false
            }));
            canvas.add(this.axis_numbers[this.axis_numbers.length - 1]);
        }


        if ((data.axes_labels == 'each-gridline') || (data.axes_labels == 'every-other-gridline')) {

            var x_list_fraction_text = [],
                y_list_fraction_text = [],
                x_denom = [],
                x_axis_num = [];
            y_denom = [];
            y_axis_num = [];
            // update the text and position of the numbers
            for (var numbersCounter = 0; numbersCounter < x_numbers.length; numbersCounter++) {
                var gridText = this.getGridNumberAsText(x_numbers[numbersCounter].number);
                x_axis_num.push(gridText);
                if ((!_.isUndefined(gridText.fraction_text)) && (gridText.fraction_text != "")) {
                    // var fraction = gridText.fraction_text.split("/");
                    var object = [];
                    object.fraction = gridText.fraction_text.split("/");
                    object.numbercounter = numbersCounter;
                    if (!_.isUndefined(gridText.fraction_text[1])) {
                        x_denom.push(object.fraction[1]);
                        x_list_fraction_text.push(object);
                    }
                }
            }
            var largest = Math.max.apply(Math, x_denom);
            for (var numbersCounter = 0; numbersCounter < x_list_fraction_text.length; numbersCounter++) {
                var numerator = x_list_fraction_text[numbersCounter].fraction[0];
                var denominator = x_list_fraction_text[numbersCounter].fraction[1];
                var ratio = largest / denominator
                numerator = numerator * ratio;
                denominator = denominator * ratio;
                x_list_fraction_text[numbersCounter].fraction[0] = '' + Math.ceil(numerator);
                x_list_fraction_text[numbersCounter].fraction[1] = '' + denominator;
            }
            for (var numbersCounter = 0; numbersCounter < x_numbers.length; numbersCounter++) {
                var fraction = true;
                if (x_list_fraction_text.length > 0) {
                    for (var counter = 0; counter < x_list_fraction_text.length; counter++) {
                        if (x_list_fraction_text[counter].numbercounter == numbersCounter) {
                            this.listFractionGroup(x_list_fraction_text[counter].fraction, x_numbers[numbersCounter]);
                            fraction = false;
                            continue;
                        }
                    }
                }
                if (fraction) {
                    var integerpart = (x_axis_num[numbersCounter].integerpart == "−0") ? "0" : x_axis_num[numbersCounter].integerpart.toString();
                    var axis_counter = y_numbers.length + numbersCounter;
                    this.axis_numbers[axis_counter].text = integerpart;
                    this.axis_numbers[axis_counter].left = x_numbers[numbersCounter].left;
                    this.axis_numbers[axis_counter].top = x_numbers[numbersCounter].top;
                    this.axis_numbers[axis_counter].originX = x_numbers[numbersCounter].originX;
                    this.axis_numbers[axis_counter].originY = x_numbers[numbersCounter].originY;
                    this.axis_numbers[axis_counter].angle = x_numbers[numbersCounter].angle;
                    this.axis_numbers[axis_counter].visible = true;
                }
            }


            // y axis starts from here
            for (var numbersCounter = 0; numbersCounter < y_numbers.length; numbersCounter++) {
                var gridText = this.getGridNumberAsText(y_numbers[numbersCounter].number);
                y_axis_num.push(gridText);
                if ((!_.isUndefined(gridText.fraction_text)) && (gridText.fraction_text != "")) {
                    // var fraction = gridText.fraction_text.split("/");
                    var object = [];
                    object.fraction = gridText.fraction_text.split("/");
                    object.numbercounter = numbersCounter;
                    if (!_.isUndefined(gridText.fraction_text[1])) {
                        y_denom.push(object.fraction[1]);
                        y_list_fraction_text.push(object);
                    }
                }
            }
            var largest = Math.max.apply(Math, y_denom);
            for (var numbersCounter = 0; numbersCounter < y_list_fraction_text.length; numbersCounter++) {
                var numerator = y_list_fraction_text[numbersCounter].fraction[0];
                var denominator = y_list_fraction_text[numbersCounter].fraction[1];
                var ratio = largest / denominator
                numerator = numerator * ratio;
                denominator = denominator * ratio;
                y_list_fraction_text[numbersCounter].fraction[0] = '' + Math.ceil(numerator);
                y_list_fraction_text[numbersCounter].fraction[1] = '' + denominator;
            }
            for (var numbersCounter = 0; numbersCounter < y_numbers.length; numbersCounter++) {
                var fraction = true;
                if (y_list_fraction_text.length > 0) {
                    for (var counter = 0; counter < y_list_fraction_text.length; counter++) {

                        if (y_list_fraction_text[counter].numbercounter == numbersCounter) {
                            this.listFractionGroup(y_list_fraction_text[counter].fraction, y_numbers[numbersCounter]);
                            fraction = false;
                            continue;
                        }
                    }
                }
                if (fraction) {
                    var integerpart = ((y_axis_num[numbersCounter].integerpart == "−0") || (y_axis_num[numbersCounter].integerpart == "0")) ? "" : y_axis_num[numbersCounter].integerpart.toString();
                    if ((integerpart == "") && (data.xAxis.from == data.xAxis.to)) integerpart = "0";
                    this.axis_numbers[numbersCounter].text = integerpart;
                    this.axis_numbers[numbersCounter].left = y_numbers[numbersCounter].left;
                    this.axis_numbers[numbersCounter].top = y_numbers[numbersCounter].top;
                    this.axis_numbers[numbersCounter].originX = y_numbers[numbersCounter].originX;
                    this.axis_numbers[numbersCounter].originY = y_numbers[numbersCounter].originY;
                    this.axis_numbers[numbersCounter].angle = y_numbers[numbersCounter].angle;
                    this.axis_numbers[numbersCounter].visible = true;
                }
            }
        } else {
            // update the text and position of the numbers
            for (var numbersCounter = 0; numbersCounter < numbers.length; numbersCounter++) {
                var gridText = this.getGridNumberAsText(numbers[numbersCounter].number);
                // if grid text is fraction
                if ((!_.isUndefined(gridText.fraction_text)) && (!_.isUndefined(gridText.fraction_text[1]))) {
                    if (data.axes_labels == 'min-max-values') {
                        gridText.fraction_text = gridText.fraction_text.split('/');
                    }
                    this.listFractionGroup(gridText.fraction_text, numbers[numbersCounter]);
                } else {
                    this.axis_numbers[numbersCounter].text = gridText.integerpart.toString();
                    this.axis_numbers[numbersCounter].left = numbers[numbersCounter].left;
                    this.axis_numbers[numbersCounter].top = numbers[numbersCounter].top;
                    this.axis_numbers[numbersCounter].originX = numbers[numbersCounter].originX;
                    this.axis_numbers[numbersCounter].originY = numbers[numbersCounter].originY;
                    this.axis_numbers[numbersCounter].angle = numbers[numbersCounter].angle;
                    this.axis_numbers[numbersCounter].visible = true;
                }
            }
        }
    },

    /*
     * Lists numbers and fractions text as group
     */
    listFractionGroup: function (text, data) {
        var canvas = this.get('canvas');

        var numberSign = '';
        var nrInt = Math.abs(Math.floor(data.number));
        var decimal = 0;

        if (data.number < 0) {
            nrInt = Math.abs(Math.ceil(data.number));
            numberSign = '-';
        }
        decimal = Math.abs(data.number) - nrInt;
        if (nrInt != 0)
            var num_string = numberSign + nrInt.toString(); // + (nrInt > 0 ? '' : ' ');
        else
            num_string = numberSign;
        // sign, number and spacing in front of fraction
        var txt1 = new fabric.Text(num_string, {
            left: 0,
            top: 0,
            fontFamily: namespace.SEGMENTAXISNUMBERFONT,
            fontSize: namespace.SEGMENTAXISNUMBERSIZE,
            fontStyle: namespace.SEGMENTAXISNUMBERSTYLE,
            fill: namespace.SEGMENTAXISNUMBERCOLOR,
            textShadow: namespace.SEGMENTAXISNUMBERSHADDOW,
            lineHeight: namespace.SEGMENTAXISNUMBERLINEHEIGHT,
            opacity: namespace.SEGMENTGRIDOPACITY,
            selectable: false
        });
        /*var fraction = this.getClosestFraction(decimal);
    fraction = fraction.split('/');*/
        var fraction = text;
        // first fraction part
        var txt2 = new fabric.Text(fraction[0], {
            left: txt1.width,
            top: -Math.round(namespace.SEGMENTAXISNUMBERSIZE * 0.25),
            fontFamily: namespace.SEGMENTAXISNUMBERFONT,
            fontSize: Math.round(namespace.SEGMENTAXISNUMBERSIZE * 0.75),
            fontStyle: namespace.SEGMENTAXISNUMBERSTYLE,
            fill: namespace.SEGMENTAXISNUMBERCOLOR,
            textShadow: namespace.SEGMENTAXISNUMBERSHADDOW,
            lineHeight: namespace.SEGMENTAXISNUMBERLINEHEIGHT,
            opacity: namespace.SEGMENTGRIDOPACITY,
            selectable: false
        })

        var txt3 = new fabric.Text('/', {
            left: txt1.width + txt2.width / 2,
            top: 0,
            fontFamily: namespace.SEGMENTAXISNUMBERFONT,
            fontSize: namespace.SEGMENTAXISNUMBERSIZE,
            fontStyle: namespace.SEGMENTAXISNUMBERSTYLE,
            fill: namespace.SEGMENTAXISNUMBERCOLOR,
            textShadow: namespace.SEGMENTAXISNUMBERSHADDOW,
            lineHeight: namespace.SEGMENTAXISNUMBERLINEHEIGHT,
            opacity: namespace.SEGMENTGRIDOPACITY,
            selectable: false
        })

        // second fraction part
        var txt4 = new fabric.Text(fraction[1], {
            left: txt1.width + txt2.width + txt3.width,
            top: Math.round(namespace.SEGMENTAXISNUMBERSIZE * 0.25),
            fontFamily: namespace.SEGMENTAXISNUMBERFONT,
            fontSize: Math.round(namespace.SEGMENTAXISNUMBERSIZE * 0.75),
            fontStyle: namespace.SEGMENTAXISNUMBERSTYLE,
            fill: namespace.SEGMENTAXISNUMBERCOLOR,
            textShadow: namespace.SEGMENTAXISNUMBERSHADDOW,
            lineHeight: namespace.SEGMENTAXISNUMBERLINEHEIGHT,
            opacity: namespace.SEGMENTGRIDOPACITY,
            selectable: false
        })

        var fractionGroup = new fabric.Group([txt1, txt2, txt3, txt4], {
            left: data.left,
            top: data.top + 5,
            selectable: false
        });
        canvas.add(fractionGroup);
    },

    /**
     * Converts a grid number to string, based on the form selection
     * @param {number} number - number to be converted
     * @return {string}
     */
    getGridNumberAsText: function (number) {
        var data = this.get('initialData').graph_data;
        // display as fractions if 'Show axes' is checked and 'Axes labels' is set to show all numbers, every other number or min/max value and 'Display decimals as fractions' is also checked
        var as_fractions = data.show_grid && $.inArray(data.axes_labels, ['each-gridline', 'every-other-gridline', 'min-max-values']) != -1 && data.show_decimals_as_fractions;

        if (!as_fractions) {
            var object = [];
            object.integerpart = (number < 0 ? namespace.SEGMENTMINUSCHARACTER : '') + Math.abs(number).roundDecimals(namespace.SEGMENTMAXDECIMALS).toString();;
            object.fraction_text = '';
            return object;
        }
        var fraction = number.toFraction();
        // if this is an actual integer, return it
        if (fraction[1] == 1) {
            var object = [];
            object.integerpart = (number < 0 ? namespace.SEGMENTMINUSCHARACTER : '') + Math.abs(number).roundDecimals(namespace.SEGMENTMAXDECIMALS).toString();;
            object.fraction_text = '';
            return object;
        }

        // use the absolute value; the sign will be added later
        fraction[0] = Math.abs(fraction[0]);

        // extract the integer part
        var integer_part = Math.floor(fraction[0] / fraction[1]);
        fraction[0] %= fraction[1];

        var fraction_text;

        // if there's a special character for this fraction, then use it; otherwise generate a numerator / denominator string

        //     
        // undo the decimal
        if (fraction[1] != 1000) {
            fraction[0] = fraction[0] * (1000 / fraction[1]);
            fraction[1] = 1000;
        }
        var decimal = fraction[0] / fraction[1];
        fraction_text = this.getClosestFraction(decimal);
        // }

        if (fraction_text === "1/1") {
            fraction_text = '';
            integer_part = integer_part + 1;
        } else if (fraction_text === "0/1") {
            fraction_text = '';
        }
        if ((number < 0) && (fraction_text != "")) {
            integer_part = SEGMENTMINUSCHARACTER + integer_part;
        }
        var object = [];
        object.integerpart = integer_part;
        object.fraction_text = fraction_text;
        return object;
    },

    /**
     * Converts the decimal into closest fraction if non-standard character found
     */
    getClosestFraction: function (decimal) {
        var numerators = [0, 1];
        var denominators = [1, 0];

        var closestFraction = '';

        var maxNumerator = this.getMaxNumerator(decimal);
        var d2 = decimal;
        var calcD, prevCalcD = NaN;
        for (var i = 2; i < 1000; i++) {
            var L2 = Math.floor(d2);
            numerators[i] = L2 * numerators[i - 1] + numerators[i - 2];
            if (Math.abs(numerators[i]) > maxNumerator) return closestFraction;

            denominators[i] = L2 * denominators[i - 1] + denominators[i - 2];

            calcD = numerators[i] / denominators[i];
            if (calcD == prevCalcD) return closestFraction;
            if (denominators[i] > SEGMENTMAXFRACTION) return closestFraction;
            closestFraction = numerators[i].toString() + '/' + denominators[i].toString();

            if (calcD == decimal) return closestFraction;

            prevCalcD = calcD;

            d2 = 1 / (d2 - L2);
        }
    },

    /*
     * Calculates maxNumerator
     */
    getMaxNumerator: function (f) {
        var f2 = null;
        var ixe = f.toString().indexOf("E");
        if (ixe == -1) ixe = f.toString().indexOf("e");
        if (ixe == -1) f2 = f.toString();
        else f2 = f.toString().substring(0, ixe);

        var digits = null;
        var ix = f2.toString().indexOf(".");
        if (ix == -1) digits = f2;
        else if (ix == 0) digits = f2.substring(1, f2.length);
        else if (ix < f2.length) digits = f2.substring(0, ix) + f2.substring(ix + 1, f2.length);

        var L = digits;

        var numDigits = L.toString().length;
        var L2 = f;
        var numIntDigits = L2.toString().length;
        if (L2 == 0) numIntDigits = 0;
        var numDigitsPastDecimal = numDigits - numIntDigits;

        for (var i = numDigitsPastDecimal; i > 0 && L % 2 == 0; i--) L /= 2;
        for (var i = numDigitsPastDecimal; i > 0 && L % 5 == 0; i--) L /= 5;

        return L;
    },

    /**
     * Converts Canvas coordinates to Grid coordinates
     * @param {number} x - left position
     * @param {number} y - top position
     * @param {object.<x,y>}
     */
    getGridCoordinatesFromCanvasCoordinates: function (x, y) {
        var data = this.get('initialData').graph_data;

        var point = {
            x: data.xAxis.from + Math.round((x - data.grid_origin.x) / this.unit_size) * data.xAxis.scale,
            y: data.yAxis.from + Math.round((y - data.grid_origin.y) / this.unit_size) * data.yAxis.scale
        };		
        // Y axis is reversed
        point.y = data.yAxis.to + data.yAxis.from - point.y;

        point.x = point.x.roundDecimals(namespace.SEGMENTMAXDECIMALS);
        point.y = point.y.roundDecimals(namespace.SEGMENTMAXDECIMALS);
		console.log("Clicked co-ordinate points - " + point);
        return point;
    },

    /**
     * Converts Grid coordinates to Canvas coordinates
     * @param {number} x - left position
     * @param {number} y - top position
     * @param {object.<x,y>}
     */
    getCanvasCoordinatesFromGridCoordinates: function (x, y) {
        var data = this.get('initialData').graph_data;

        // Y axis is reversed
        y = data.yAxis.to + data.yAxis.from - y;

        var point = {
            x: Math.round(data.grid_origin.x + (x - data.xAxis.from) / data.xAxis.scale * this.unit_size),
            y: Math.round(data.grid_origin.y + (y - data.yAxis.from) / data.yAxis.scale * this.unit_size),
        }

        return point;
    },

    /**
     * Creates the elements required for drawing (a circle, a line and a text label)
     */
    createDrawingCursor: function () {
        // create the curcle that is placed at the cursor position when in drawing mode
        this.grid_cursor_point = new fabric.Circle({
            left: 0,
            top: 0,
            radius: namespace.SEGMENTPOINTRADIUS,
            visible: false,
            selectable: false,
            fill: namespace.SEGMENTANSWERARTDCOLOR
        });

        // create the line that is drawn between the cursor and the latest added point when in drawing mode
        this.grid_cursor_line = new fabric.Line([0, 0, 0, 0], {
            strokeWidth: namespace.SEGMENTLINETHICKNESS,
            selectable: false,
            fill: namespace.SEGMENTANSWERARTDCOLOR,
            stroke: namespace.SEGMENTANSWERARTDCOLOR
        });

        // create the text that will display the current coordinates when in drawing mode
        this.grid_cursor_label = new fabric.Text('', {
            fontFamily: namespace.SEGMENTCURSORFONT,
            fontSize: namespace.SEGMENTCURSORSIZE,
            fontStyle: namespace.SEGMENTCURSORSTYLE,
            fontWeight: namespace.SEGMENTCURSORWEIGHT,
            fill: namespace.SEGMENTCURSORCOLOR,
            textShadow: namespace.SEGMENTCURSORSHADDOW,
            originX: 'right',
            originY: 'bottom',
            selectable: false
        });

        // add the elements to the canvas
        this.get('canvas').add(this.grid_cursor_point);
        this.get('canvas').add(this.grid_cursor_line);
        this.get('canvas').add(this.grid_cursor_label);
    },

    /**
     * Brings all the cursor elements above all other elements
     */
    bringCursorToFront: function () {
        this.grid_cursor_point.bringToFront();
        this.grid_cursor_line.bringToFront();
        this.grid_cursor_label.bringToFront();
    },

    /**
     * When in drawing mode, updates the position of the drawing elements
     * @param {object.<x,y>} position - provides x and y values, in grid coordinates
     */
    updateDrawingCursorPosition: function (position) {
        var canvas = this.get('canvas'),
            data = this.get('initialData').graph_data;
        var object_value = canvas.getObjects();
        var point = this.getCanvasCoordinatesFromGridCoordinates(position.x, position.y);
        for (var tool_index = 0; tool_index < object_value.length; tool_index++) {
            if ((!_.isUndefined(object_value[tool_index].tool)) && (object_value[tool_index].tool === 'protractor' || object_value[tool_index].tool === 'ruler')) {
                this.tools_flag = true;
                if ((point.x > (object_value[tool_index].left - object_value[tool_index].width / 2)) && (point.x < (object_value[tool_index].left + object_value[tool_index].width / 2)) && (point.y > (object_value[tool_index].top - object_value[tool_index].height / 2)) && (point.y < (object_value[tool_index].top + object_value[tool_index].height / 2))) {
                    this.click_flag = true;
                }
            }
        }
        if (this.tools_flag && this.click_flag) {
            this.tools_flag = false;
            this.click_flag = false;
            return;
        }
        // check if the position is inside the grid bounds
        if (data.xAxis.from <= position.x && position.x <= data.xAxis.to && data.yAxis.from <= position.y && position.y <= data.yAxis.to) {
            // optimization: as this function gets lots of calls on mouse move, only reposition and redraw the canvas if the last call of this function was for a different point
            if (!this.last_cursor_position || this.last_cursor_position.x !== position.x || this.last_cursor_position.y !== position.y) {
                // if (until now the cursor was hidden, first bring it to front)
                if (!this.grid_cursor_point.visible) {
                    this.bringCursorToFront();
                }

                //var point = this.getCanvasCoordinatesFromGridCoordinates(position.x, position.y);
                // update the position of the point
                this.grid_cursor_point.set({
                    left: point.x,
                    top: point.y,
                    visible: true
                });

                // update the text and position of the label
                this.grid_cursor_label.set({
                    text: '(' + position.x + ', ' + position.y + ')',
                    left: point.x,
                    top: point.y,
                    visible: false
                });

                // if there was no point added so far, then the line is not displayed
                if (this.drawing_points_added.length == 0) {
                    this.grid_cursor_line.visible = false;
                }
                // if a previous point was placed on the canvas (for lines, segments or polygons) then draw a line from the last point to the curent posiion of the cursor
                else {
                    var last_index = this.drawing_points_added.length - 1,
                        last_position = this.getCanvasCoordinatesFromGridCoordinates(this.drawing_points_added[last_index].x, this.drawing_points_added[last_index].y);

                    // update the position of the line
                    this.grid_cursor_line.set({
                        x1: last_position.x,
                        y1: last_position.y,
                        x2: point.x,
                        y2: point.y,
                        visible: true
                    });
                }

                canvas.renderAll();
                this.last_cursor_position = position;
            }
        }
        // if the point is outside the grid bounds, then hide the cursor elements
        else {
            if (this.last_cursor_position) {
                this.grid_cursor_point.visible = false;
                this.grid_cursor_line.visible = false;
                this.grid_cursor_label.visible = false;

                canvas.renderAll();
                this.last_cursor_position = null;
            }
        }
    },

    /**
     * Add a drawing point when in drawing mode
     * @param {object.<x,y>} - point to be added
     */
    addDrawingPoint: function (point) {
        var data = this.get('initialData').graph_data;
        // ignore point if out of bounds
        if (data.xAxis.from > point.x || point.x > data.xAxis.to || data.yAxis.from > point.y || point.y > data.yAxis.to) {
            return;
        }

        var canvas = this.get('canvas');
        var object_value = canvas.getObjects();
        for (var tool_index = 0; tool_index < object_value.length; tool_index++) {
            var points = this.getCanvasCoordinatesFromGridCoordinates(point.x, point.y);
            if ((!_.isUndefined(object_value[tool_index].tool)) && (object_value[tool_index].tool === 'protractor' || object_value[tool_index].tool === 'ruler')) {
                this.tools_flag = true;
                if ((points.x > (object_value[tool_index].left - object_value[tool_index].width / 2)) && (points.x < (object_value[tool_index].left + object_value[tool_index].width / 2)) && (points.y > (object_value[tool_index].top - object_value[tool_index].height / 2)) && (points.y < (object_value[tool_index].top + object_value[tool_index].height / 2))) {
                    this.click_flag = true;
                }
            }
        }
        if (this.tools_flag && this.click_flag) {
            this.tools_flag = false;
            this.click_flag = false;
            return;
        }
        this.drawing_points_added.push(point);

        // check if this point completed the current shape
        switch (this.getAnswerType()) {
        case 'polygon':
            // if the last point is equal to the first one, then complete the polygon
            var last_index = this.drawing_points_added.length - 1;
            if (this.drawing_points_added.length > 1 && this.drawing_points_added[0].x == this.drawing_points_added[last_index].x && this.drawing_points_added[0].y == this.drawing_points_added[last_index].y) {
                this.drawingShapeCompleted();
            }
            break;
        case 'line':
        case 'segment':
            if (this.drawing_points_added.length == 2) {
                this.drawingShapeCompleted();
                if (this.drawing_points_added.length == 0) {
                    this.stopDrawing();
                }
            }
            break;
        case 'point':
            var shapes = this.shapes;
            if (shapes.length > 0) {
                for (var shapes_counter = 0; shapes_counter < shapes.length; shapes_counter++) {
                    if ((shapes[shapes_counter].is_answer) && (shapes[shapes_counter].config.type == "point") && (shapes[shapes_counter].config.position.x == point.x) && (shapes[shapes_counter].config.position.y == point.y)) {
                        alert('Cannot click on the same point');
                        this.drawing_points_added = [];
                        return;
                    }
                }
            }
            console.log("drawingShapeCompleted function called");
            this.drawingShapeCompleted();
            break;
        }

        // if a shape has been added, there are no more points in the buffer, and nothing else to draw
        if (this.drawing_points_added.length == 0) {
            return;
        }

        // draw a point at the current location
        var crt_position = this.getCanvasCoordinatesFromGridCoordinates(point.x, point.y);
        var point_shape = new fabric.Circle({
            left: crt_position.x,
            top: crt_position.y,
            radius: namespace.SEGMENTPOINTRADIUS,
            fill: namespace.SEGMENTANSWERARTDCOLOR,
            selectable: false
        });
        this.drawing_shapes.push(point_shape);
        canvas.add(point_shape);

        // draw a line to the previous point, if present
        if (this.drawing_points_added.length > 1) {
            var prev_index = this.drawing_points_added.length - 2,
                prev_position = this.getCanvasCoordinatesFromGridCoordinates(this.drawing_points_added[prev_index].x, this.drawing_points_added[prev_index].y),
                line_shape = new fabric.Line([crt_position.x, crt_position.y, prev_position.x, prev_position.y], {
                    fill: namespace.SEGMENTANSWERARTDCOLOR,
                    stroke: namespace.SEGMENTANSWERARTDCOLOR,
                    strokeWidth: namespace.SEGMENTLINETHICKNESS,
                    selectable: false
                });
            this.drawing_shapes.push(line_shape);
            canvas.add(line_shape);
        }

        this.bringCursorToFront();

        canvas.renderAll();
    },

    /**
     * Create a shape based on the drawn points
     */
    drawingShapeCompleted: function () {
        if (this.drawing_points_added.length == 0) {
            // no point added, so nothig to complete, but also nothing started
            return true;
        }

        var canvas = this.get('canvas');

        switch (this.getAnswerType()) {
        case 'polygon':
            // validate that there are at least 3 points for the polygon
            if (this.drawing_points_added.length < 3) {
                alert('Your polygon must have at least 3 points added. \nPlease add ' + (this.drawing_points_added.length == 2 ? 'one more point.' : 'two more points.'));
                return false;
            }
            // add the polygon
            this.addShape({
                type: 'polygon',
                points: this.drawing_points_added
            }, true);
            break;
        case 'line':
        case 'segment':
            var points = this.drawing_points_added;
            // validate that there are exactly 2 points for the line / segment
            if (this.drawing_points_added.length != 2) {
                alert('Your ' + this.getAnswerType() + ' must have 2 points added. \nPlease add one more point.');
                return false;
            }
            //if clicked on the same point
            if ((points[0].x == points[1].x) && (points[0].y == points[1].y)) {
                alert('Your ' + this.getAnswerType() + ' cannot have same two points');
                points.splice(1, 1);
                this.set(this.drawing_points_added, points);
                return false;
            }
            // add the line / segment
            this.addShape({
                type: this.getAnswerType(),
                from: this.drawing_points_added.shift(),
                to: this.drawing_points_added.shift()
            }, true);
            break;
        case 'point':
            // a point is enough for drawing point, so just add it
            console.log("addShape function called");
            this.addShape({
                type: 'point',
                position: this.drawing_points_added.pop()
            }, true);
            
            break;
        }

        // make unselectable the object that has just been added (the tool is still in drawing mode)
        this.shapes[this.shapes.length - 1].selectable = false;

        // reset the drawing attributes
        this.drawing_points_added = [];
        for (var shapesCounter = 0; shapesCounter < this.drawing_shapes.length; shapesCounter++) {
            canvas.remove(this.drawing_shapes[shapesCounter]);
        }
        this.drawing_shapes = [];

        this.bringCursorToFront();

        return true;
    },

    /**
     * Set the canvas in drawing mode
     */
    startDrawing: function () {
        if (this.is_drawing) {
            // already drawing
            return false;
        }

        this.is_drawing = true;
    },

    /**
     * Exit the drawing mode, once the answer had been added
     */
    stopDrawing: function () {
        if (!this.is_drawing) {
            // already stopped drawing
            return false;
        }

        this.is_drawing = false;

        // hide the cursor
        this.grid_cursor_point.visible = false;
        this.grid_cursor_line.visible = false;
        this.grid_cursor_label.visible = false;

        this.get('canvas').renderAll();
    },

    /**
     * Load hint for current exercise
     * @param {number} index - index of the hint to be loaded
     */
    loadHint: function (index) {
        if (this.get('initialData')) {
            namespace.canvas_controller.loadHint(index);
        } else {
            currentView.renderHint('No hints available');
        }
    },

    /**
     * Submit the exercise solution (kids drawn shapes) to the server
     */
    submitForm: function () {
        var shapes = [];

        for (var shapesCounter = 0; shapesCounter < this.shapes.length; shapesCounter++) {
            if (this.shapes[shapesCounter].is_answer) {
                shapes.push(this.shapes[shapesCounter].config);
            }
        }
        return {
            selected_answers: shapes,
            hints_used: namespace.canvas_controller.get('totalHintsUsed')
        };
    },

    /**
     * Parse check answer response
     * Should pop up the corresponding message
     * @param {object} response - response object
     */
    parseResponse: function (response) {},

    /**
     * Remove all the answers added so far
     */
    resetQuestionForm: function () {
        var canvas = this.get('canvas');

        // remove the complete shapes that had been added
        var shapesCounter = 0;
        while (shapesCounter < this.shapes.length) {
            if (!this.shapes[shapesCounter].is_answer) {
                shapesCounter++;
                continue;
            }

            canvas.remove(this.shapes[shapesCounter]);
            this.shapes.splice(shapesCounter, 1);
        }

        // demove the shapes that were not completed
        this.drawing_points_added = [];
        for (var shapesCounter = 0; shapesCounter < this.drawing_shapes.length; shapesCounter++) {
            canvas.remove(this.drawing_shapes[shapesCounter]);
        }
        this.drawing_shapes = [];

        this.startDrawing();

        canvas.renderAll();
    }
});

/**
 * Math Graph View
 * @author: Nicu Danila <NicuDanila@funnygarbage.com>
 */
var GraphsView = Backbone.View.extend({
    defaults: {
        id: 0,
        //set canvas id
        canvasId: 'canvas_mg'
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
     * Load the canvas template used on the graphs demo
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
     * After the canvas is rendered load the specific
     * Load action menu options
     */
    afterRender: function () {
    	namespace =  this.options.namespace;
    	
    	namespace.canvas_controller = new CanvasController({
            canvasId: this.options.canvasId,
            namespace: namespace
        });
        //JSON DEMO
        math_graph = new MathGraph({
            canvasId: this.options.canvasId,
            initialData: this.options.demoData,
            id: this.options.id,
            namespace: namespace
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
        math_graph.loadHint(index);
        displayHintbox(index);
    }
});

this.MathGraph = MathGraph;
this.GraphsView = GraphsView;

}