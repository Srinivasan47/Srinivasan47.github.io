function Base(options) {

    var questionAreaMarkup;

    /*
     * initializing Base for AM
     */


    var URL_CONFIG,
        ENV,
        questionId,
        mode,
        namespace;


    function loadUrlMap() {
        URL_CONFIG = {};

        $.ajax({
            url: ENV + "/config_JSONs/requiredStructure.js",
            async: false,
            success: function (data) {
                /*for(x in inputData.root){
					inputData.root[x] = ENV + inputData.root[x];
				}*/
                console.log('loaded successfully');
                URL_CONFIG = requiredStructure(ENV).root;
            },
            error: function (e, x, r) {
                console.log('Error loading data');
                console.log(e, x, r)
            }
        });

        //make URL config available at namespace level 
        namespace.URL_CONFIG = URL_CONFIG;
    }
    
    /*
	 * function to initialize base
	 */
    function init() {
        questionId = options.questionId;
        mode = options.mode;
        namespace = options.namespace;
        //ENV = "/projects";
        //options.ENV = ENV;
        ENV = options.AMEnvironment;
        delete options.AMEnvironment;
        options.ENV = ENV;
        options.obtainRequiredResources = options.obtainRequiredResources ? options.obtainRequiredResources : false;
                
        var frameFeedBackLink = '';
        if (options.showFeedBackLink){
        	frameFeedBackLink = '<div id="badQuestion" class="something-not-right"><a href="javascript:;">Something not right?</a></div>';
        }
        delete options.showFeedBackLink;
        
        if(options.obtainRequiredResources){
            questionAreaMarkup = '<div class="question_area_html">'+
            							'<div class="instructional_prompt"></div>'+
            							'<div class="mechanical_prompt"></div>'+
            							'<div class="answer_options">'+
            								'<ul></ul>'+
            							'</div></div>'+
            							'<div class="btn-reset" onclick="reset_question_form()">Reset</div>'+
            							'<div class="canvas_container"></div>'+
            							'<div id ="canvas-overlay" class="overlay hide"></div>'+
            							'<div id="toolkit_container" style = "display: block;"></div><div id="preload"></div>'+frameFeedBackLink;
        }
        else {
            questionAreaMarkup = '<div class="question_area_html">'+
										'<div class="instructional_prompt"></div>'+
										'<div class="mechanical_prompt"></div>'+
										'<div class="answer_options">'+
											'<ul></ul>'+
										'</div></div>'+
										'<div class="btn-reset" onclick="reset_question_form()">Reset</div>'+
										'<div class="canvas_container"></div>'+
										'<div id ="canvas-overlay" class="overlay hide"></div>'+										        							
            							'<div id="app_hint_overlay"></div>'+
            							'<div id="app_hint"></div>'+frameFeedBackLink;            							
        }

        initDOM(options.htmlContainer);

        namespace.containerApis = (options && options.containerApis) ? options.containerApis : null;
        loadUrlMap(ENV);
        namespace.Util = {
            "loadResource": loadResource
        };
        
        // Loading the resource only if it is not available in DOM
        if (options.obtainRequiredResources) {
            loadResource({
                "url": URL_CONFIG.AM_JS_ANSWER_MECH_CONFIG,
                "type": "script"
            });

            loadResource({
                "url": URL_CONFIG.AM_JS_ANSWER_MECH_GLOBAL,
                "type": "script"
            });
        }

        //creating instance of namespaced config values
        var config = new Config(options);
        //creating instance of namespaced global AM functions and values
        var global = new Global(options);
    }
    
    /*
     * Initialze the AM container and insering into DOM and making availble in namespace
     * @params $container- markup of AM container
     */
    function initDOM($container) {

        //Setting up the html container for the question
        $container.html(questionAreaMarkup);

        namespace = $.extend(true, namespace, {
            container: $container,
            canvas_container: $container.find('.canvas_container'),
            instructional_prompt: $container.find('.instructional_prompt'),
            mechanical_prompt: $container.find('.mechanical_prompt'),
            answer_options: $container.find('.answer_options'),
            btn_reset: $container.find('.btn-reset')
        });
    }
    
    /*
     * Loading the required resources only if it in not available
     * @params options- object containing url and type
     */
    function loadResource(options) {
        var type = options && options.type,
            url = options && options.url,
            ele;

        switch (type) {
        case "script":
            ele = document.createElement("script");
            ele.src = url;
            $("body").append(ele);
            break;
        case "link":
            ele = document.createElement("link");
            ele.href = url;
            ele.rel = "stylesheet";
            $("head").append(ele);
            break;
        }
    }

    /*
     * Destroys Base when question is changed
     */
    function destroy() {
        //clean up
        delete namespace;
    }

    init();

    this.destroy = destroy;
}