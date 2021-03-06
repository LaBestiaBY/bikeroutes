define(['jquery', 'eventManager'], function ($, eventManager) {

    return {

        source:'',

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
                .fail(this.loadFailedHandler);
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
        },

        loadFailedHandler: function (jqxhr, status, error) {
            eventManager.dispatch('data_load_failed', {status: status, error: error});
        }
    };
});

