define(['jquery', 'eventManager'], function ($, eventManager) {
   
    var DataLoader = function () {
        
    };
    
    DataLoader.prototype = {

        /**
         *
         * @param source
         */
        init: function (source) {
            console.log(source);

            this.load(source);
        },

        /**
         *
         * @param source
         */
        load: function (source) {
            $.getJSON( source, this.loadHandler)
                .fail(function( jqxhr, status, error ) {
                    eventManager.dispatch('data_failed', {status: status, error: error});
                });
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