define(['underscore', 'jquery', 'text!../../../html_templates/tmpl_main_menu.html', 'eventManager', 'fb', 'modules/settingsManager'],
    function (_, $, htmlStr, eventManager, fb, settingsManager) {
        return {

            /**
             *
             */
            init: function (containerSelector) {
                this.container = $(containerSelector);
                this.tmpl = _.template(htmlStr);

                this.setupHandlers();
                this.render();
            },

            /**
             *
             */
            setupHandlers: function () {
                this.userStateChangeHandler = this.userStateChange.bind(this);
                this.userSettingsSetHandler = this.userSettingsSet.bind(this);

                this.container.click(this.clickHandler);
                this.container.change(this.changeHandler);
                eventManager.subscribe('user_state_change', this.userStateChangeHandler);
                eventManager.subscribe('user_settings_set', this.userSettingsSetHandler);
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
            clickHandler: function (e) {
                var el = $(e.target);
                if (el.hasClass('sign-in')) {
                    fb.signInByGoogle();
                }
                if (el.hasClass('sign-out')) {
                    fb.signOut();
                }
                if (el.hasClass('path-find')) {
                    console.log('MENU: building new path');
                    eventManager.dispatch('path_find_mode');
                }
            },

            /**
             *
             */
            userStateChange: function () {
                this.render();
            },

            /**
             *
             * @param data
             */
            userSettingsSet: function (data) {
                for (item in data) {
                    this.container.find('.' + item).prop('checked', data[item]);
                }
            },

            /**
             *
             */
            changeHandler: function (e) {
                var target = $(e.target);

                if (fb.getUserIsAuth()) {
                    settingsManager.setSettings(target.attr('class'), target.prop('checked'));
                } else {
                    eventManager.dispatch('menu_changed', {kind: target.attr('class'), checked: target.prop('checked')});
                }
            }
        };

    });