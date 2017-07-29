define(['eventManager', 'fb'], function (eventManager, fb) {

    return {

        /**
         *
         */
        ratings: {},
        userRatings: {},

        /**
         *
         */
        init: function () {
            this.setupHandlers();
            fb.getRatings();
        },

        /**
         *
         */
        setupHandlers: function () {
            this.ratingsRecievedHandler = this.ratingsRecieved.bind(this);
            this.userRatingsRecievedHandler = this.userRatingsRecieved.bind(this);
            this.ratingsChangedHandler = this.ratingsChanged.bind(this);
            this.userRatingsChangedHandler = this.userRatingsChanged.bind(this);
            this.userStateChangeHandler = this.userStateChange.bind(this);

            eventManager.subscribe('ratings_received', this.ratingsRecievedHandler);
            eventManager.subscribe('user_ratings_received', this.userRatingsRecievedHandler);
            eventManager.subscribe('ratings_changed', this.ratingsChangedHandler);
            eventManager.subscribe('user_ratings_changed', this.userRatingsChangedHandler);
            eventManager.subscribe('user_state_change', this.userStateChangeHandler);
        },

        /**
         *
         * @param id
         * @param value
         */
        setRating: function (id, value) {
            fb.setRating(id, value, this.getUserRating(id));
        },

        /**
         *
         * @param id
         * @returns {*}
         */
        getRating: function (id) {
            if (!this.ratings[id]) {
                return 0;
            } else {
                return this.ratings[id].rating;
            }
        },

        /**
         *
         * @param id
         * @returns {*}
         */
        getUserRating: function (id) {
            return this.userRatings[id];
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
        userRatingsRecieved: function (data) {
            this.userRatings = data ? data : {};
        },

        /**
         *
         * @param data
         */
        ratingsChanged: function (data) {
            this.ratings = data;
            eventManager.dispatch('ratings_updated');
        },

        /**
         *
         * @param data
         */
        userRatingsChanged: function (data) {
            this.userRatings = data;
            eventManager.dispatch('user_ratings_updated');
        },

        /**
         *
         */
        userStateChange: function () {
            fb.getUserRatings();
        }

    }

});