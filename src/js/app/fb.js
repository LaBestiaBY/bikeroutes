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

                if (user) {

                    var geoobjectsRef = firebase.database().ref('geoobjects/');
                    geoobjectsRef.on('value', function (snapshot) {
                        eventManager.dispatch('ratings_changed', snapshot.val());
                    });

                    var userRatingsRef = firebase.database().ref('users/' + user.uid + '/ratings/');
                    userRatingsRef.on('value', function (snapshot) {
                        eventManager.dispatch('user_ratings_changed', snapshot.val());
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
                    // this.setUserIsAuth(result.user);
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
                    // this.setUserIsAuth(null);
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
         */
        setRating: function (id, value) {
            firebase.database().ref('users/' + this.getUserIsAuth().uid + '/ratings/' + id).set(value);

            this.changeRating(firebase.database().ref('geoobjects/' + id + '/rating/'), value);
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
        }
    }
});