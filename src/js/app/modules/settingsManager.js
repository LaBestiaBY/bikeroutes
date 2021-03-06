define(['eventManager', 'fb'], function (eventManager, fb) {

    return {

        /**
         *
         */
        userSettings: {},
        defaultSettings: {
            'main-bike-route': true,
            'simple-bike-route': true,
            'bike-service': true,
            'food': true,
            'wc': true,
            'bike-parking':true
        },

        /**
         *
         */
        init: function () {

            for (item in this.defaultSettings) {
                this.userSettings[item] = this.defaultSettings[item];
            }
            this.setupHandlers();
        },

        /**
         *
         */
        setupHandlers: function () {
            this.userSettingsRecievedHandler = this.userSettingsRecieved.bind(this);
            this.userSettingsChangedHandler = this.userSettingsChanged.bind(this);
            this.userStateChangeHandler = this.userStateChange.bind(this);

            eventManager.subscribe('user_settings_received', this.userSettingsRecievedHandler);
            eventManager.subscribe('user_settings_changed', this.userSettingsChangedHandler);
            eventManager.subscribe('user_state_change', this.userStateChangeHandler);
        },

        /**
         *
         * @param name
         * @param value
         */
        setSettings: function (name, value) {
            fb.setUserSettings(name, value);
        },

        /**
         *
         * @returns {exports.userSettings|{}}
         */
        getUserSettings: function () {
            return this.userSettings;
        },

        /**
         *
         * @param data
         */
        userSettingsRecieved: function (data) {
            for (item in data) {
                this.userSettings[item] = data[item];
            }
            eventManager.dispatch('user_settings_set', this.userSettings);
        },

        /**
         *
         * @param data
         */
        userSettingsChanged: function (data) {
            for (item in data) {
                this.userSettings[item] = data[item];
            }
            eventManager.dispatch('user_settings_set', this.userSettings);
        },

        /**
         *
         */
        userStateChange: function () {
            if (fb.getUserIsAuth()) {
                fb.getUserSettings();
            } else {
                eventManager.dispatch('user_settings_set', this.defaultSettings);
            }

        }

    }

});