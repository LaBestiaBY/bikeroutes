define(['eventManager', 'fb'], function (eventManager, fb) {

    return {

        /**
         *
         */
        userSettings: {},
        defaultSettings: {
            'main-bike-route': true,
            'simple-bike-route': true,
            'bike-service': true
        },

        /**
         *
         */
        init: function () {

            for (item in this.defaultSettings) {
                this.userSettings[item] = this.defaultSettings[item];
            }

            // this.userRatings = this.defaultSettings;
            this.setupHandlers();
            // fb.getUserSettings();
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
            console.log('SM userSettingsReceived', this.userSettings);
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
            // console.log('SM userSettingsChanged', data);
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