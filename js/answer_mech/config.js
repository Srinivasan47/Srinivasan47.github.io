var Config = function(options){
	var global = {};
	if(options.namespace){
		global = options.namespace;
	} else{
		global = window;
	}
	//GLOBALS
	global.CANVASWIDTH = 950;
	global.CANVASHEIGHT = 496;
	global.CANVASARTSKETCHWIDTH = 680;
	global.CANVASPREVIEWWIDTH = 950;
	global.CANVASPREVIEWHEIGHT = 587;
	global.CANVASLEFTWIDTH = 680; //left area size 
	global.CANVASRIGHTWIDTH = 270; //right area size
	global.PROTRACTORROTATIONANGLE = 5; // protractor's rotation step
	global.PROTRACTORROTATIONANGLE = 5; // protractor's rotation step
	global.RULERROTATIONANGLE = 5; // ruler's rotation step
	global.LINECHARS = 16;
	global.HINTSTARTPOSITION = 400;
	global.HINTSIZE = 45;
	global.EXERCISENAVIGATORANIMATIONTIME = 250;
	global.HINTSNAVIGATORANIMATION = 300;
	global.FLEXSCROLLINTERVAL = 250;
	global.HTMLWIDTH = 950;
	global.HTMLHEIGHT = 496;
	global.HTMLARTSKETCHWIDTH = 680;
	global.HTMLPREVIEWWIDTH = 950;
	global.HTMLPREVIEWHEIGHT = 587;
	global.HTMLLEFTWIDTH = 680; //left area size 
	global.HTMLRIGHTWIDTH = 270; //right area size
	global.SUBMITFORMFLAG = false; // for partial answers of ebeddedtext and image
	
	
	
	//PIGS, FLOCKS AND REWARDS
	global.PIGSNOHINTSUSED = 7;
	global.PIGSHALFHINTSUSED = 5;
	global.PIGSLESSHINTSUSED = 3;
	global.PIGSALLHINTSUSED = 0;

	// TEACHERS LIST
	global.TEACHERS = [
	  {
	    id: 0,
	    name: 'ALL',
	    color: '#e1d406'
	  },
	  {
	    id: 1,
	    name: 'Ms. Emerson',
	    color: '#72b654'
	  },
	  {
	    id: 2,
	    name: 'Mr. Browning',
	    color: '#259cb4'
	  },
	  {
	    id: 3,
	    name: 'Mrs. Morris',
	    color: '#703f91'
	  }
	];

	// MODULES LIST
	global.MODULESLIST = [
	  {
	    dueDays: 0,
	    type: 'math',
	    itemID: 1,
	    productID: 1,
	    title: 'Multiple choice',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '01'
	  },
	  {
	    dueDays: 4,
	    type: 'math',
	    itemID: 3,
	    productID: 1,
	    title: 'Multiple select',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '01'
	  },
	  {
	    dueDays: 1,
	    type: 'math',
	    itemID: 4,
	    productID: 1,
	    title: 'Graph Hot Spot Box',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 2,
	    type: 'math',
	    itemID: 7,
	    productID: 1,
	    title: 'Hot Spot Click to Fill',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 4,
	    type: 'ELA',
	    itemID: 9,
	    productID: 1,
	    title: 'Embedded Text',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 7,
	    type: 'ELA',
	    itemID: 15,
	    productID: 1,
	    title: 'Embedded Image',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  }
	];
	global.MODULESLISTP2 = [
	  {
	    dueDays: 4,
	    type: 'math',
	    itemID: 10,
	    productID: 1,
	    title: 'Drag and Drop Geometric Shapes',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '01'
	  },
	  {
	    dueDays: 2,
	    type: 'math',
	    itemID: 1,
	    productID: 1,
	    title: 'Multiple choice (numeric label)',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 0,
	    type: 'math',
	    productID: 1,
	    itemID: 13,
	    title: 'Multiple choice',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '01'
	  },
	  {
	    dueDays: 4,
	    type: 'math',
	    itemID: 14,
	    productID: 1,
	    title: 'Multiple choice (no label)',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 9,
	    type: 'ELA',
	    itemID: 16,
	    productID: 1,
	    title: 'Highlight Text',
	    submodules: 0,
	    aeronauts: 8,
	    currentUserPercentage: '04'
	  },
	  {
	    dueDays: 12,
	    type: 'math',
	    itemID: 11,
	    productID: 1,
	    title: 'Multiple answer Hot Spot Box',
	    submodules: 0,
	    aeronauts: 5,
	    currentUserPercentage: '05'
	  },
	  {
	    dueDays: 4,
	    type: 'math',
	    itemID: 101,
	    productID: 1,
	    title: 'HS Click - image fill',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '01'
	  }
	];

	global.MODULESLISTP3 = // MODULESLISTP2;
	[
	  {
	    dueDays: 1,
	    type: 'math',
	    itemID: 94,
	    productID: 1,
	    title: 'Segment Example Graph (Line)',
	    submodules: 0,
	    aeronauts: 2,
	    currentUserPercentage: '01'
	  },
	  {
	    dueDays: 1,
	    type: 'math',
	    itemID: 95,
	    productID: 1,
	    title: 'Segment Example Graph (Segment)',
	    submodules: 0,
	    aeronauts: 2,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 1,
	    type: 'math',
	    itemID: 96,
	    productID: 1,
	    title: 'Segment Example Graph (Point)',
	    submodules: 0,
	    aeronauts: 2,
	    currentUserPercentage: '04'
	  },
	  {
	    dueDays: 1,
	    type: 'math',
	    itemID: 145,
	    productID: 1,
	    title: 'Sorting (Text Bin Labels, Image Bins, Text Objects)',
	    submodules: 0,
	    aeronauts: 2,
	    currentUserPercentage: '02'
	  },
	  {
	    dueDays: 2,
	    type: 'math',
	    itemID: 146,
	    productID: 1,
	    title: 'Sorting (Image Bin Labels, Rectangular Bins, Equations Objects)',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  },
	  {
	    dueDays: 0,
	    type: 'math',
	    itemID: 147,
	    productID: 1,
	    title: 'Sorting (Equations Bin Labels, Rectangular Bins, Image Objects)',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '01'
	  },
	  {
	    dueDays: 4,
	    type: 'math',
	    itemID: 14,
	    productID: 1,
	    title: 'Multiple choice (no label)',
	    submodules: 0,
	    aeronauts: 3,
	    currentUserPercentage: '03'
	  }
	];
	
	
	
	
	
	// ANIMATION VALUES
	global.DEFAULTTEACHER = 1;
	global.BACKARROWOPACITYSPEED = 200;
	global.PAGEREXERCISESSPACING = 20;
	global.TEACHERCARETWIDTH = 12;
	global.TEACHERCARETSPEED = 500;
	global.MODULESANIMATEDELAY = 250;
	global.MODULESANIMATEDURATION = 1000;
	global.LOADNEWEXERCISEDELAY = 2000;
	global.PAGEROPACITYANIMATEDURATION = 250;
	global.LIFTLEVELOPACITYANIMATEDURATION = 500;
	global.SCOREMARKERANIMATEDURATION = 500;
	global.EXERCISECONTAINERANIMATIONDELAY = 1000;
	global.EXERCISECONTAINERANIMATIONDURATION = 1000;
	global.EXERCISEDELAY = 1500;
	global.HINTSDELAY = 100;
	global.TOOLBARDELAY = 1700;
	global.TOOLBARANIMATIONDURATION = 300;
	
	//Instructional and mechanical prompt
	global.ARTICLELINEHEIGHT = 40,
	global.ARTICLECHARWIDTH = 50, 
	global.ARTICLEFONTSIZE = 16, 
	global.QUESTIONFONTFAMILY = 'AkagiPro-Bold', 
	global.QUESTIONFONTCOLOR = 'rgb(0,0,0)', 
	global.QUESTIONFONTSIZE = 18, 
	global.QUESTIONFONTSTYLE = 'normal',
	global.QUESTIONFONTWEIGHT = 'bold',
	global.QUESTIONLINELENGTH = 30,
	global.QUESTIONLINEHEIGHT = 1, 
	global.QUESTIONBACKGROUNDCOLOR = 'white',
	global.QUESTIONPADDING = 20, 
	global.MECHANICALQUESTIONFONTCOLOR = '#282828',
	global.SOFTPADDING = 20;
	
	global.MAXARTICLELINES = 1000;
	
	//MULTIPLE CHOICES configuration
	global.MINHINTSNUMBER = 1;
	global.MAXHINTSNUMBER = 5;
	global.MINANSWEROPTIONNUMBER = 2;
	global.MAXANSWEROPTIONNUMBER = 10;
	
	
	// EMBEDDED TEXT configuration
	global.DEFAULTEMBEDDEDTEXTINSTRUCTIONALPROMPT = 'Type instructional prompt';
	global.DEFAULTEMBEDDEDTEXTMECHANICALPROMPT = 'Click to select correct answer';
	global.SPECIALCHARS = ["+", "–", "×", "÷", "π", "±", "≠", "≤", "≥", "∞", "°", "≈", "|"];
	global.EMBEDDEDTEXTLINEHEIGHT = 30;
	
	
	//HOT SPOT BOX AND CLICK TO FILL
	global.HSDEFAULTOPACITY = 0.75;
	global.HSBOXWIDTH = 30;
	global.HSBOXHEIGHT = 30;
	global.DEFAULTHOTSPOTSHAPE = 'circle'; //circle or rectangle
	global.HSBOXDEFAULTCOLOR = '#04E7EF';
	global.HSBOXCORRECTCOLOR = '#04E7EF';//'#20F73C';
	global.HSBOXINCORRECTCOLOR = '#04E7EF';//'#EF1F3E';
	global.HSBOXDISPLAYCORRECTCOLOR = '#20F73C';
	global.HSBOXDISPLAYINCORRECTCOLOR = '#EF1F3E';
	global.HSBOXMISCCOLOR = '#04E7EF';//'#FF9F05';
	global.HSFILLXIMAGEPATH = 'images/img22x23_fill_x.png';
	global.HSFILLOIMAGEPATH = 'images/img22x23_fill_o.png';
	
	//HOT SPOT CLICK to FILL configuration
	global.HSDEFAULTGRIDCOLOR = '#EEEEEE';
	global.HSDEFAULTGRIDWIDTH = 65;
	global.HSDEFAULTGRIDHEIGHT = 30;
	global.HSDEFAULTGRIDSCALE = 100;
	global.HSDEFAULTGRIDBORDER = 2;
	global.HSDEFAULTGRIDPADDING = 5;
	global.HSMAXGRIDROWS = 20;
	global.HSMAXGRIDCOLS = 20;
	global.HSGRIDPOSITIONINGSTEP = 5;
	
	
	// SEGMENT configuration
	global.SEGMENTMAXALLOWEDXUNITS = 20;
	global.SEGMENTMAXALLOWEDYUNITS = 20;
	global.SEGMENTUNITSIZE = 20;
	
	global.SEGMENTDEFAULTPOSITIONX = 150;
	global.SEGMENTDEFAULTPOSITIONY = 50;
	global.SEGMENTDEFAULTTITLE = 'Grid title';
	global.SEGMENTDEFAULTXAXISFROM = -10;
	global.SEGMENTDEFAULTXAXISTO = 10;
	global.SEGMENTDEFAULTXAXISSCALE = 1;
	global.SEGMENTDEFAULTXAXISTITLE = 'x';
	global.SEGMENTDEFAULTYAXISFROM = -10;
	global.SEGMENTDEFAULTYAXISTO = 10;
	global.SEGMENTDEFAULTYAXISSCALE = 1;
	global.SEGMENTDEFAULTYAXISTITLE = 'y';
	
	global.SEGMENTREGULARARTDCOLOR = '#aaaaaa';
	global.SEGMENTANSWERARTDCOLOR = '#339bd2';
	global.SEGMENTPOINTRADIUS = 4;
	global.SEGMENTLINETHICKNESS = 3;
	global.SEGMENTLINEPADDING = 1.2; // when drawing a line, a longer segment is drawn; this setting defines how many units should be added to each end
	global.SEGMENTLINEARROWWIDTH = 12;
	global.SEGMENTLINEARROWHEIGHT = 20;
	
	global.SEGMENTGRIDCOLOR = '#bbbbbb';
	global.SEGMENTGRIDOPACITY = 0.85; // 0 to 1
	global.SEGMENTGRIDLINEWIDTH = 1;
	global.SEGMENTGRIDTITLEDISTANCE = 65; // the title is placed above the grid; this setting defines the vertical distance between the grid and the title
	global.SEGMENTGRIDTITLEFONT = 'Arial';
	global.SEGMENTGRIDTITLESIZE = 17;
	global.SEGMENTGRIDTITLESTYLE = 'normal';
	global.SEGMENTGRIDTITLECOLOR = '#000000';
	global.SEGMENTGRIDTITLESHADDOW = 'rgba(0,0,0,0.3) 1px 1px 1px';
	global.SEGMENTAXISCOLOR = '#000000';
	
	global.SEGMENTAXISWIDTH = 1;
	global.SEGMENTAXISARROWWIDTH = 10;
	global.SEGMENTAXISARROWHEIGHT = 20;
	
	global.SEGMENTXAXISGRIDTITLEDISTANCE = 30; // the distance between the grid and the X axis title (used when showing just one axis or only one quadrant)
	global.SEGMENTYAXISGRIDTITLEDISTANCE = 40; // the distance between the grid and the Y axis title (used when showing just one axis or only one quadrant)
	global.SEGMENTXAXISARROWTITLEDISTANCE = 17; // the distance between the arrow and the X axis title (used when showing 2 or 4 quadrants)
	global.SEGMENTYAXISARROWTITLEDISTANCE = 20; // the distance between the arrow and the Y axis title (used when showing 2 or 4 quadrants)
	global.SEGMENTAXISTITLEFONT = 'Arial';
	global.SEGMENTAXISTITLESIZE = 15;
	global.SEGMENTAXISTITLESTYLE = 'italic';
	global.SEGMENTAXISTITLECOLOR = '#000000';
	global.SEGMENTAXISTITLESHADDOW = 'rgba(0,0,0,0.3) 1px 1px 1px';
	global.SEGMENTAXISTITLELINEHEIGHT = 0.7;
	
	global.SEGMENTXAXISNUMBERDISTANCE = 5; // the distance between the X axis and the number, when the full grid is displayed
	global.SEGMENTYAXISNUMBERDISTANCE = 5; // the distance between the Y axis and the number, when the full grid is displayed
	global.SEGMENTXAXISONLYNUMBERDISTANCE = 10; // the distance between the X axis and the number, when only the X axis is displayed
	global.SEGMENTYAXISONLYNUMBERDISTANCE = 14; // the distance between the Y axis and the number, when only the y axis is displayed
	global.SEGMENTAXISNUMBERFONT = 'Arial';
	global.SEGMENTAXISNUMBERSIZE = 10;
	global.SEGMENTAXISNUMBERSTYLE = 'normal';
	global.SEGMENTAXISNUMBERCOLOR = '#000000';
	global.SEGMENTAXISNUMBERSHADDOW = null;
	global.SEGMENTAXISNUMBERLINEHEIGHT = 0.7;
	
	global.SEGMENTCURSORFONT = 'Arial';
	global.SEGMENTCURSORSIZE = 14;
	global.SEGMENTCURSORSTYLE = 'italic';
	global.SEGMENTCURSORWEIGHT = 'bold';
	global.SEGMENTCURSORCOLOR = '#000000';
	global.SEGMENTCURSORSHADDOW = null;
	
	global.SEGMENTMOVEGRIDBYPIXELS = 20; // how many pixels should be the grid moved by when using the visual controls (left / right / top / bottom)
	global.SEGMENTCENTERGRIDBOUNDS = {min: {x: 0, y: 40}, max: {x: 700, y: 496}}; // used to center the grid
	
	global.SEGMENTMAXDECIMALS = 3;
	global.SEGMENTMINUSCHARACTER = '−';
	global.SEGMENTMAXFRACTION = 15; // x/15
	
	global.CANVASOFFSETLEFT=170;
	global.CANVASOFFSETUP=90;

	global.MATHFRACTIONS = new Array();
	global.MATHFRACTIONS['.333'] =  1/3;
	global.MATHFRACTIONS['.666'] =  2/3;
	global.MATHFRACTIONS['.083'] =  1/12;
	global.MATHFRACTIONS['.111'] =  1/9;
	global.MATHFRACTIONS['.166'] =  1/6;
	global.MATHFRACTIONS['.832'] =  5/6;
	global.MATHFRACTIONS['.222'] =  2/9;
	
	// DRAG & DROP configuration
	global.DDOBJECTDEFAULTOPACITY = 1; //value between 0 and 1
	global.DDOBJECTOPACITYONMOVING = 1; //value between 0 and 1
	global.DDOBJECTMOVINGSHADOWCOLOR = 'rgba(34,34,34,0.4)';
	global.DDOBJECTMOVINGSHADOWOFFSETX = 4;
	global.DDOBJECTMOVINGSHADOWOFFSETY = 4;
	global.DDOBJECTMOVINGSHADOWBLUR = 4;
	global.DDTEXTOBJECTMOVINGSHADOWCOLOR = 'rgba(0,0,0,0.4)';
	global.DDTEXTOBJECTMOVINGSHADOWOFFSETX = 2;
	global.DDTEXTOBJECTMOVINGSHADOWOFFSETY = 2;
	global.DDTEXTOBJECTMOVINGSHADOWBLUR = 2;
	global.DDDEFAULTELEMENTFONTCOLOR = '#339bd2';
	global.DDDEFAULTELEMENTFONTFAMILY = 'Arial';
	global.DDDEFAULTELEMENTFONTSIZE = 20;
	global.DDDEFAULTELEMENTFONTSTYLE = 'normal';
	global.DDTARGETIMAGE = 'images/img34x33_show_targets_to_students.png';
	global.DDTARGETSNAPTOLERACE = 75;
	global.DDSNAPTOTARGETANIMATIONDELAY = 100;
	global.DDSNAPTOORIGINALPOSITIONANIMATIONDELAY = 400;
	global.DDSHAPEOBJECTWIDTH = 30;
	global.DDSHAPEOBJECTHEIGHT = 30;
	
	// SORTING
	global.SORTMAXIMUMBINS = 6;
	global.SORTMAXIMUMOBJECTS = 26;
	global.SORTDEFAULTRECTANGLEBINFILLCOLOR = 'LightSteelBlue';
	global.SORTDEFAULTRECTANGLEBINOUTLINECOLOR = 'GoldenRod';
	global.SORTRECTANGLEBINOUTLINEWIDTH = 3;
	global.SORTRECTANGLEBINDEFAULTSIZE = {width: 100, height: 150}; // the default size of a rectangle bin
	global.SORTBINBOUNDS = {min: {x: 0, y: 0}, max: {x: 700, y: 496}}; // the region where the bins are placed
	global.SORTOBJECTBOUNDS = {min: {x: 700, y: 273}, max: {x: 950, y: 496}}; // the region where the objects are placed
	
	global.SORTINDEXLABELFONT = 'Arial';
	global.SORTINDEXLABELSIZE = 17;
	global.SORTINDEXLABELSTYLE = 'normal';
	global.SORTINDEXLABELWEIGHT = 'bold';
	global.SORTINDEXLABELLINEHEIGHT = 0.8;
	global.SORTINDEXLABELCOLOR = '#000000';
	global.SORTINDEXLABELSHADDOW = null;
	
	global.SORTBINTEXTLABELFONT = 'Arial';
	global.SORTBINTEXTLABELSIZE = 17;
	global.SORTBINTEXTLABELSTYLE = 'italic';
	global.SORTBINTEXTLABELWEIGHT = 'normal';
	global.SORTBINTEXTLABELLINEHEIGHT = 0.8;
	global.SORTBINTEXTLABELCOLOR = '#000000';
	global.SORTBINTEXTLABELSHADDOW = null;
	
	global.SORTOBJECTTEXTFONT = 'Arial';
	global.SORTOBJECTTEXTSIZE = 20;
	global.SORTOBJECTTEXTSTYLE = 'normal';
	global.SORTOBJECTTEXTWEIGHT = 'normal';
	global.SORTOBJECTTEXTLINEHEIGHT = 0.8;
	global.SORTOBJECTTEXTCOLOR = '#339bd2';
	global.SORTOBJECTTEXTSHADDOW = null;
	
	global.SORTLABELDISTNCE = 10; // the distance between a bin and it's label
	global.SORTINDEXDISTNCE = 10; // the distance between an object and it's index (for text and equation objects)
	
	global.SORTREPOSITIONSTEP = 1; // the distance between an object and it's index (for text and equation objects)
	
	global.SORTOBJECTDEFAULTOPACITY = 1; //value between 0 and 1
	global.SORTOBJECTOPACITYONMOVING = 0.8; //value between 0 and 1
	global.SORTOBJECTMOVINGSHADOWCOLOR = 'rgba(34,34,34,0.4)';
	global.SORTOBJECTMOVINGSHADOWOFFSETX = 4;
	global.SORTOBJECTMOVINGSHADOWOFFSETY = 4;
	global.SORTOBJECTMOVINGSHADOWBLUR = 4;
	global.SORTTEXTOBJECTMOVINGSHADOWCOLOR = 'rgba(0,0,0,0.4)';
	global.SORTTEXTOBJECTMOVINGSHADOWOFFSETX = 2;
	global.SORTTEXTOBJECTMOVINGSHADOWOFFSETY = 2;
	global.SORTTEXTOBJECTMOVINGSHADOWBLUR = 2;
	global.SORTSNAPTOBINANIMATIONDELAY = 100;
	global.SORTSNAPTOORIGINALPOSITIONANIMATIONDELAY = 400;
	global.SORTOBJECTSPADDING = 10;
	
	// EMBEDDED TEXT configuration
	global.DEFAULTEMBEDDEDTEXTINSTRUCTIONALPROMPT = 'Type instructional prompt';
	global.DEFAULTEMBEDDEDTEXTMECHANICALPROMPT = 'Click to select correct answer';
	global.SPECIALCHARS = ["+", "–", "×", "÷", "π", "±", "≠", "≤", "≥", "∞", "°", "≈", "|"];
	global.EMBEDDEDTEXTLINEHEIGHT = 30;
	
	
	// EMBEDDED IMAGE configuration
	global.DEFAULTWORDBOXPADDING = 5;
	global.BOXBORDERWIDTH = 1;
	global.BOXCORNERWIDTH = 1;
	global.BOXBORDERCOLOR = '#f00';
	global.CANVASFONTSIZE = 16;
	
	// HIGHLIGHT configuration
	
	global.DEFAULTPARAGRAPHMARGINTOP = 20;
	global.DEFAULTPARAGRAPHMARGINLEFT = 20;
	global.DEFAULTPARAGRAPHLINEHEIGHT = 30;
	global.PARAGRAPHWORDSLENGTH = 5;
	global.SENTENCEWORDSLENGTH = 3;
	global.HIGHLIGHTEDTEXTCOLOR = '#FBCA00';
	global.MOUSEOVERTEXTCOLOR = '#FBCA00';
	global.DEFAULTTEXTCOLOR = '#FFFFFF';
	
	// OPEN RESPONSE configuration
	
	global.MINRESPONSELENGTH = 2;
	global.DEFAULT_OPENRESPONSE_INSTRUCTIONALPROMPT = 'Type instructional prompt';
	global.DEFAULT_OPENRESPONSE_MECHANICALPROMPT = 'Write the answers in your words';
	
}