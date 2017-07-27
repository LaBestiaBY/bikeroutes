define(['jquery', 'eventManager', 'fb', 'modules/ratingManager', 'text!../../../html_templates/tmpl_geoobject_info_window.html'],
    function ($, eventManager, fb, ratingManager, htmlStr) {

        return {

            /**
             *
             * @param containerSelector
             */
            init: function (containerSelector) {
                this.container = $(containerSelector).get(0);
                this.infoWindow = this.createInstance(htmlStr);
                this.container.appendChild(this.infoWindow);
                this.geoObjectId = '';

                this.setupHandlers();
            },

            /**
             *
             * @param htmlStr
             * @returns {Node}
             */
            createInstance: function (htmlStr) {
                var tempEl = document.createElement('div');
                tempEl.innerHTML = htmlStr;

                return tempEl.firstChild;
            },

            /**
             *
             */
            setupHandlers: function () {
                this.ratingsUpdatedHandler = this.ratingsUpdated.bind(this);

                this.infoWindow.addEventListener('click', this.infoWindowClickHandler.bind(this));
                eventManager.subscribe('ratings_updated', this.ratingsUpdatedHandler);
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
                this.geoObjectId = id;
                // $(containerSelector).get(0);
                this.infoWindow.querySelector('#title').innerHTML = title || '';
                this.infoWindow.querySelector('#description').innerHTML = description || 'no description.';
                this.infoWindow.querySelector('#rating').innerHTML = ratingManager.getRating(id) || '';
                this.infoWindow.classList.add('is-active');
            },

            /**
             *
             */
            hide: function () {
                this.infoWindow.classList.remove('is-active');
                // this.infoWindow.querySelector('#success_button').disabled = true;
                this.geoObjectId = '';
            },

            /**
             *
             */
            ratingsUpdated: function () {
                if (this.geoObjectId)
                {
                    this.infoWindow.querySelector('#rating').innerHTML = ratingManager.getRating(this.geoObjectId) || '';
                }
            }

        };

    });