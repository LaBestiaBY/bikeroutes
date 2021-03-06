define(['firebase', 'module', 'eventManager'], function (firebase, module, eventManager) {

    return {

        /**
         *
         */
        init: function () {
            firebase.initializeApp(module.config());
            this.userIsAuth = firebase.auth().currentUser || null;
            this.setupEvents();
        },

        /**
         *
         */
        setupEvents: function () {

            firebase.auth().onAuthStateChanged(function (user) {

                var geoobjectsRef = firebase.database().ref('geoobjects/');
                geoobjectsRef.on('value', function (snapshot) {
                    eventManager.dispatch('ratings_changed', snapshot.val());
                });

                if (user) {

                    firebase.database().ref('users/' + user.uid + '/ratings/temp').set(0);

                    var userRatingsRef = firebase.database().ref('users/' + user.uid + '/ratings/');
                    userRatingsRef.on('value', function (snapshot) {
                        eventManager.dispatch('user_ratings_changed', snapshot.val());
                    });

                    var userSettingsRef = firebase.database().ref('users/' + user.uid + '/settings/');
                    userSettingsRef.on('value', function (snapshot) {
                        eventManager.dispatch('user_settings_changed', snapshot.val());
                    });
                }
                this.setUserIsAuth(user);

            }.bind(this));
        },

        /**
         *
         */
        signInByGoogle: function () {

            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(function (result) {
                }.bind(this))
                .catch(function (error) {
                    var errorMessage = error.message;
                    console.log('error: ' + errorMessage);
                });
        },

        /**
         *
         */
        signOut: function () {
            firebase.auth().signOut()
                .then(function () {
                }.bind(this))
                .catch(function (error) {
                    console.log('sign out error: ' + error);
                });
        },

        /**
         *
         * @returns {null|*}
         */
        getUserIsAuth: function () {
            return this.userIsAuth;
        },

        /**
         *
         * @param user
         */
        setUserIsAuth: function (user) {
            this.userIsAuth = user;
            eventManager.dispatch('user_state_change');
        },

        /**
         *
         * @param id
         * @param value
         * @param previousValue
         */
        setRating: function (id, value, previousValue) {
            firebase.database().ref('users/' + this.getUserIsAuth().uid + '/ratings/' + id).set(value);


            previousValue = !previousValue ? 0 : previousValue;

            this.changeRating(firebase.database().ref('geoobjects/' + id + '/rating/'), value - previousValue);
        },

        /**
         *
         */
        getRatings: function () {
            firebase.database().ref('geoobjects/').once('value').then(function(snapshot) {
                eventManager.dispatch('ratings_received', snapshot.val());
            });
        },

        /**
         *
         */
        getUserRatings: function () {
            if (this.getUserIsAuth()) {
                firebase.database().ref('users/' + this.getUserIsAuth().uid + '/ratings/').once('value').then(function(snapshot) {
                    eventManager.dispatch('user_ratings_received', snapshot.val());
                });
            }
        },

        /**
         *
         * @param ratingRef
         * @param value
         */
        changeRating: function (ratingRef, value) {
            ratingRef.transaction(function(currentRating) {
                return currentRating + value;
            });
        },

        /**
         *
         * @param name
         * @param value
         */
        setUserSettings: function (name, value) {
            if (this.userIsAuth)
            {
                firebase.database().ref('users/' + this.getUserIsAuth().uid + '/settings/' + name).set(value);
            }
        },

        /**
         *
         */
        getUserSettings: function () {
            if (this.getUserIsAuth()) {
                firebase.database().ref('users/' + this.getUserIsAuth().uid + '/settings/').once('value').then(function(snapshot) {
                    eventManager.dispatch('user_settings_received', snapshot.val());
                });
            }
        }
    }
});