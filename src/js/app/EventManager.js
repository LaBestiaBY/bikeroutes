define(function () {

    /**
     * EventManager
     * @constructor
     */
    var EventManager = function () {
        this.events = {};
    };

    EventManager.prototype = {

        /**
         *
         * @param type
         * @param listener
         */
        subscribe: function (type, listener) {
            if (!this.events[type]) {
                this.events[type] = [];
            }

            this.events[type].push(listener);
        },

        /**
         *
         * @param type
         * @param data
         */
        dispatch: function (type, data) {

            if (this.events[type] && this.events[type].length >= 1) {
                this.events[type].map(function (listener) {
                    listener(data);
                });
            }
        },

        /**
         *
         * @param type
         * @param listener
         */
        unsubscribe: function (type, listener) {

            if (!this.events[type]) {
                return;
            }

            var index = this.events[type].indexOf(listener);

            if (index === -1) {
                return;
            }

            this.events[type].splice(index, 1);
        },

        /**
         *
         * @param type
         * @param listener
         */
        once: function (type, listener) {

            var handler = function (data)
            {
                listener(data);
                this.unsubscribe(type, handler);
            };
            this.subscribe(type, handler);
        }
    };

    return new EventManager();
});