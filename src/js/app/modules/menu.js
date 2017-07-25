define(['underscore', 'jquery', 'text!../../../html_templates/tmpl_main_menu.html', 'eventManager', 'fb'], function (_, $, htmlStr, eventManager, fb)
{
    return {

        /**
         *
         */
        init: function (containerSelector) {
            this.containerSelector = containerSelector;
            this.container = $(this.containerSelector).get(0);

            this.tmpl = _.template(htmlStr);

            this.setupHandlers();

            this.render();
        },

        /**
         *
         */
        setupHandlers: function () {
            this.userStateChangeHandler = this.userStateChange.bind(this);

            this.container.addEventListener('click', this.clickHandler);
            this.container.addEventListener('change', this.changeHandler);
            eventManager.subscribe('user_state_change', this.userStateChangeHandler);

            // console.log('Menu - setupHandlers', fb.getUserIsAuth());
        },

        /**
         *
         */
        render: function () {
            this.container.innerHTML = '';
            this.container.innerHTML = this.tmpl({user: fb.getUserIsAuth()});

            // console.log('Menu - Render', fb.getUserIsAuth());
        },

        /**
         *
         */
        clickHandler: function (e) {
            var targetClasses = e.target.className.split(' ');
            if (targetClasses.indexOf('sign-in') !== -1) {

                // console.log('click: ' + targetClasses);
                fb.signInByGoogle();
            }
            if (targetClasses.indexOf('sign-out') !== -1) {
                fb.signOut();
            }
        },

        /**
         *
         */
        userStateChange: function () {
            // console.log('Menu - userStateChange');
            this.render();
        },

        /**
         *
         */
        changeHandler: function (e) {
            // console.log('menu change!', e.target.className, e.target.checked);
            eventManager.dispatch('menu_changed', {kind: e.target.className, checked: e.target.checked});
        }
    };

});