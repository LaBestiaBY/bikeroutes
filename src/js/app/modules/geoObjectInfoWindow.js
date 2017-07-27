define(['underscore', 'jquery', 'eventManager', 'fb', 'modules/ratingManager', 'text!../../../html_templates/tmpl_geoobject_info_window.html'],
    function (_, $, eventManager, fb, ratingManager, htmlStr) {

        return {

            /**
             *
             * @param containerSelector
             */
            init: function (containerSelector) {
                this.container = $(containerSelector).get(0);
                this.tmpl = _.template(htmlStr);
                this.render();

                this.geoObjectId = '';

                this.setupHandlers();
            },

            /**
             *
             */
            render: function () {
                this.container.innerHTML = '';
                this.container.innerHTML = this.tmpl({user: fb.getUserIsAuth()});
            },

            /**
             *
             */
            setupHandlers: function () {
                this.ratingsUpdatedHandler = this.ratingsUpdated.bind(this);
                this.userRatingsUpdatedHandler = this.userRatingsUpdated.bind(this);
                this.userStateChangeHandler = this.userStateChange.bind(this);

                this.container.addEventListener('click', this.infoWindowClickHandler.bind(this));
                eventManager.subscribe('ratings_updated', this.ratingsUpdatedHandler);
                eventManager.subscribe('user_ratings_updated', this.userRatingsUpdatedHandler);
                eventManager.subscribe('user_state_change', this.userStateChangeHandler);
            },

            /**
             *
             * @param e
             */
            infoWindowClickHandler: function (e) {
                var target = e.target;

                if (target.id === 'plus-button') {
                    ratingManager.setRating(this.geoObjectId, 1);

                    console.log('from window, id = ' + this.geoObjectId);
                }

                if (target.id === 'minus-button') {
                    ratingManager.setRating(this.geoObjectId, -1);

                    console.log('from window, id = ' + this.geoObjectId);
                }

                if (target.id === 'close-button') {
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
                // console.log('IW show', this.infoWindow.classList);

                this.geoObjectId = id;
                // $(containerSelector).get(0);
                this.container.querySelector('#title').innerHTML = title || '';
                this.container.querySelector('#description').innerHTML = description || 'no description.';
                this.container.querySelector('#rating').innerHTML = ratingManager.getRating(id) || '0';
                this.container.querySelector('#geoobject_info_window').classList.add('is-active');
                this.toggleRatingButtons('#plus-button', '#minus-button', ratingManager.getUserRating(this.geoObjectId));
            },

            /**
             *
             */
            hide: function () {
                this.container.querySelector('#geoobject_info_window').classList.remove('is-active');
                this.geoObjectId = '';
            },

            /**
             *
             * @param selector1
             * @param selector2
             * @param value
             */
            toggleRatingButtons: function (selector1, selector2, value) {

                console.log('toggleRatingButtons', value);

                var el1 = this.container.querySelector(selector1);
                var el2 = this.container.querySelector(selector2);
                if (el1 && el2) {
                    if (value === 1) {
                        el1.classList.add('is-success');
                        el1.disabled = true;
                        el2.classList.remove('is-danger');
                        el2.disabled = false;
                    } else if (value === -1) {
                        el1.classList.remove('is-success');
                        el1.disabled = false;
                        el2.classList.add('is-danger');
                        el2.disabled = true;
                    } else {
                        el1.classList.remove('is-success');
                        el1.disabled = false;
                        el2.classList.remove('is-danger');
                        el2.disabled = false;
                    }
                }
            },

            /**
             *
             */
            ratingsUpdated: function () {
                if (this.geoObjectId)
                {
                    this.container.querySelector('#rating').innerHTML = ratingManager.getRating(this.geoObjectId) || '0';
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
                console.log('IW userStateChange');
                this.render();
            }

        };

    });