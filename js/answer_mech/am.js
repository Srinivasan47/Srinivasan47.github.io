function AM(options) {
    var mode,
        am,
        namespace,
        questionId,
        questionData,
        MODES = {},
        BASE_PATH,
        amInstance = null,
        baseClass,
        modeClass;

    /*
	 * function to initialize AM 
	 */
    function init() {
        initProps(options);
        initMode();

        handlePostInitTasks();
    }
    
    /*
     * To notify that the container / platform that AM is loaded
     */
    function handlePostInitTasks() {
        //Notify the container / platform that AM load is complete
        if (namespace && namespace.containerApis && namespace.containerApis.notifyAMLoaded && typeof namespace.containerApis.notifyAMLoaded === "function") {
            namespace.containerApis.notifyAMLoaded({});
        }

        window.currentAMClass = null;
    }
    
    /*
     * To initialize mode of AM
     */
    function initMode() {
        if (mode && questionData) {
            initUrlMap();

            loadJSClass(baseClass);
            loadJSClass(modeClass);
            namespace.amHandle = new window.currentAMClass();
            namespace.amHandle.initView(options);

            initAPIs();

        } else {
            //console.log("no proper initialization params available for AM");
            return;
        }
    }
    
    /*
     * Initializes API controlls between AM container and Assessment container
     */
    function initAPIs() {
        namespace.API = {};

        switch (mode) {
        case "PREVIEW":
            namespace.API.displayAnswer = namespace.amHandle.displayAnswer;
            namespace.API.showPassageOrTools = namespace.showPassageOrTools;
            //TODO: add API for tools selection
            break;
        case "REVIEW":
            namespace.API.displayAnswer = namespace.amHandle.displayAnswer;
            namespace.API.showPassageOrTools = namespace.showPassageOrTools;
            //TODO: add API for tools selection
            break;
        case "TEST":
            namespace.API.showPassageOrTools = namespace.showPassageOrTools;
            namespace.API.getUserResponse = namespace.amHandle.getUserResponse;
            //TODO: add API for tools selection
            break;
        }
    }
    
    /*
     * Initializes the mapping of URL from where the files will be loaded
     */
    function initUrlMap() {
        var urlConfigAMObj = namespace.URL_CONFIG.AMS[am];
        //based on AM find out which file to load from the map
        baseClass = urlConfigAMObj["BASE"];
        modeClass = urlConfigAMObj[mode];
    }
    /*
     * Loads the file from the specified URL
     * @params: url- location from where files are to be loaded
     */
    function loadJSClass(url) {
        $.ajax({
            url: url,
            dataType: 'script',
            cache: true,
            async: false,
            success: function (data) {
                //console.log('Successfully loaded Authoring Tool JS class (' + url + ')');
            },
            error: function () {
                //console.log('Failed loading Authoring Tool JS class (' + url + ')');
            }
        });
    }

    /*
     * Initializes the value in the options if not available
     * @params: options-array of objects
     */
    function initProps(options) {
        if (!options) {
            //console.log("no proper initialization params available for AM");
            return;
        }

        mode = (options && options.mode) ? options.mode : "TEST";
        am = (options && options.am) ? options.am : "";
        namespace = (options && options.namespace) ? options.namespace : "";
        questionId = (options && options.id) ? options.id : "";
        questionData = (options && options.demoData) ? options.demoData : "";
    }

    init();
}