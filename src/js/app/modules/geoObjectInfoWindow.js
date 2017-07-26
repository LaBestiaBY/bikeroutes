define(['jquery', 'eventManager', 'fb','text!../../../html_templates/tmpl_geoobject_info_window.html'], function ($, eventManager, fb, htmlStr) {

    return {

        /**
         *
         * @param containerSelector
         */
        init: function (containerSelector)
        {
            this.container = $(containerSelector).get(0);
            this.infoWindow = this.createInstance(htmlStr);
            this.container.appendChild(this.infoWindow);
            this.geoObjectId = '';

            this.setupHandlers();
        },

        createInstance: function (htmlStr)
        {
            var tempEl = document.createElement('div');
            tempEl.innerHTML = htmlStr;

            return tempEl.firstChild;
        },

        setupHandlers: function ()
        {
            this.infoWindow.addEventListener('click', this.infoWindowClickHandler.bind(this));
        },

        infoWindowClickHandler: function(e)
        {
            var target = e.target;

            if (target.id === 'plus-button')
            {
                // eventManager.dispatch('modal_success');

                // this.hide();

                fb.setRating(this.geoObjectId, 1);

                console.log(this.geoObjectId);
            }

            if (target.id === 'minus-button')
            {
                // eventManager.dispatch('modal_success');

                // this.hide();

                fb.setRating(this.geoObjectId, -1);

                console.log(this.geoObjectId);
            }

            if (target.id === 'close-button')
            {
                this.hide();
            }
        },

        show: function (title, description, id)
        {
            this.geoObjectId = id;
            // $(containerSelector).get(0);
            this.infoWindow.querySelector('#title').innerHTML = title || '';
            this.infoWindow.querySelector('#description').innerHTML = description || 'no description.';
            this.infoWindow.classList.add('is-active');
        },

        hide: function ()
        {
            this.infoWindow.classList.remove('is-active');
            // this.infoWindow.querySelector('#success_button').disabled = true;
        }

    };

});