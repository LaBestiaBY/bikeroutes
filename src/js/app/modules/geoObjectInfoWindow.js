define(['underscore', 'jquery', 'eventManager', 'fb', 'modules/ratingManager', 'text!../../../html_templates/tmpl_geoobject_info_window.html'],
    function (_, $, eventManager, fb, ratingManager, htmlStr) {

        return {

            /**
             *
             * @param containerSelector
             */
            init: function (containerSelector) {
                this.container = $(containerSelector);
                this.tmpl = _.template(htmlStr);
                this.render();

                this.geoObjectId = '';

                this.setupHandlers();
            },

            /**
             *
             */
            render: function () {
                this.container.html('');
                this.container.html(this.tmpl({user: fb.getUserIsAuth()}));
            },

            /**
             *
             */
            setupHandlers: function () {
                this.ratingsUpdatedHandler = this.ratingsUpdated.bind(this);
                this.userRatingsUpdatedHandler = this.userRatingsUpdated.bind(this);
                this.userStateChangeHandler = this.userStateChange.bind(this);

                this.container.click(this.infoWindowClickHandler.bind(this));
                eventManager.subscribe('ratings_updated', this.ratingsUpdatedHandler);
                eventManager.subscribe('user_ratings_updated', this.userRatingsUpdatedHandler);
                eventManager.subscribe('user_state_change', this.userStateChangeHandler);
            },

            /**
             *
             * @param e
             */
            infoWindowClickHandler: function (e) {
                var target = $(e.target);

                if (target.attr('id') === 'plus-button') {
                    ratingManager.setRating(this.geoObjectId, 1);
                }

                if (target.attr('id') === 'minus-button') {
                    ratingManager.setRating(this.geoObjectId, -1);
                }

                if (target.attr('id') === 'close-button') {
                    this.hide();
                }
            },

            /**
             *
             * @param title
             * @param description
             * @param id
             */
            show: function (title, description, id) {
                this.geoObjectId = id;
                this.container.find('#title').html(title || '');
                this.container.find('#description').html(description || 'no description.');
                this.container.find('#rating').html(ratingManager.getRating(id) || '0');
                this.container.find('#geoobject_info_window').addClass('is-active');
                this.toggleRatingButtons('#plus-button', '#minus-button', ratingManager.getUserRating(this.geoObjectId));
            },

            /**
             *
             */
            hide: function () {
                this.container.find('#geoobject_info_window').removeClass('is-active');
                this.geoObjectId = '';
            },

            /**
             *
             * @param selector1
             * @param selector2
             * @param value
             */
            toggleRatingButtons: function (selector1, selector2, value) {
                var el1 = this.container.find(selector1);
                var el2 = this.container.find(selector2);
                if (el1 && el2) {
                    if (value === 1) {
                        el1.addClass('is-success');
                        el1.attr('disabled', true);
                        el2.removeClass('is-danger');
                        el2.attr('disabled', false);
                    } else if (value === -1) {
                        el1.removeClass('is-success');
                        el1.attr('disabled', false);
                        el2.addClass('is-danger');
                        el2.attr('disabled', true);
                    } else {
                        el1.removeClass('is-success');
                        el1.attr('disabled', false);
                        el2.removeClass('is-danger');
                        el2.attr('disabled', false);
                    }
                }
            },

            /**
             *
             */
            ratingsUpdated: function () {
                if (this.geoObjectId)
                {
                    this.container.find('#rating').html(ratingManager.getRating(this.geoObjectId) || '0');
                }
            },

            /**
             *
             */
            userRatingsUpdated: function () {
                this.toggleRatingButtons('#plus-button', '#minus-button', ratingManager.getUserRating(this.geoObjectId));
            },

            /**
             *
             */
            userStateChange: function () {
                this.render();
            }

        };

    });