define(['eventManager', 'fb'], function (eventManager, fb) {
    
    return {

        /**
         *
         */
        ratings: {},

        /**
         *
         */
        init: function () {
            fb.getRatings();
            this.setupHandlers();
        },

        /**
         *
         */
        setupHandlers: function () {
            this.ratingsRecievedHandler = this.ratingsRecieved.bind(this);
            this.ratingsChangedHandler = this.ratingsChanged.bind(this);

            eventManager.subscribe('ratings_received', this.ratingsRecievedHandler);
            eventManager.subscribe('ratings_changed', this.ratingsChangedHandler);
        },

        /**
         *
         * @param id
         * @param value
         */
        setRating: function (id, value) {
            fb.setRating(id, value);
        },

        /**
         *
         * @param id
         * @returns {*}
         */
        getRating: function (id) {
            return this.ratings[id].rating;
        },

        /**
         *
         * @param data
         */
        ratingsRecieved: function (data) {
            this.ratings = data;
        },

        /**
         *
         * @param data
         */
        ratingsChanged: function (data) {
            this.ratings = data;
            eventManager.dispatch('ratings_updated');
        }

    }
    
});