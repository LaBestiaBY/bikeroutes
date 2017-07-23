define(['jquery', 'eventManager'], function ($, eventManager) {
   
    var DataLoader = function () {
        this.source = '';
    };
    
    DataLoader.prototype = {

        /**
         *
         * @param source
         */
        init: function (source) {
            this.source = source;

            this.setupHandlers();
        },

        /**
         *
         */
        setupHandlers: function () {

            this.mapRenderedHandler = this.mapRendered.bind(this);

            eventManager.subscribe('map_rendered', this.mapRenderedHandler);
        },

        /**
         *
         * @param source
         */
        load: function (source) {
            $.getJSON( source, this.loadHandler)
                .fail(function( jqxhr, status, error ) {
                    eventManager.dispatch('data_load_failed', {status: status, error: error});
                });
        },

        /**
         *
         */
        mapRendered:function () {
            this.load(this.source);
        },

        /**
         *
         * @param data
         */
        loadHandler: function (data) {
            eventManager.dispatch('data_loaded', data);
        }
    };

    return new DataLoader();

});