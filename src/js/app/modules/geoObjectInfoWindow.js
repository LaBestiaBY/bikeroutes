define(['eventManager', 'text!../../../html_templates/tmpl_geoobject_info_window.html'], function (eventManager, htmlStr) {

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

            this.setupHandlers();

            this.infoWindow.querySelector('#success_button').disabled = true;

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
            this.infoWindow.addEventListener('keyup', this.infoWindowKeyUpHandler.bind(this));
        },

        infoWindowClickHandler: function(e)
        {
            var target = e.target;

            if (target.id === 'success_button')
            {
                eventManager.dispatch('modal_success', this.infoWindow.querySelector('#text_input').value);

                this.hide();
            }

            if (target.id === 'cancel_button' || target.id === 'close_button')
            {
                this.hide();
            }
        },

        infoWindowKeyUpHandler: function(e)
        {
            var target = e.target;

            if (target.id === 'text_input')
            {
                this.infoWindow.querySelector('#success_button').disabled = !target.value;
            }
        },

        show: function (title)
        {
            this.infoWindow.querySelector('#title').innerHTML = title || 'New Event';
            this.infoWindow.classList.add('is-active');
        },

        hide: function ()
        {
            this.infoWindow.querySelector('#text_input').value = '';
            this.infoWindow.classList.remove('is-active');
            this.infoWindow.querySelector('#success_button').disabled = true;
        }

    };

});