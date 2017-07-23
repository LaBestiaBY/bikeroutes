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
                    // var ref = firebase.database().ref('users/' + user.uid + '/tasks/');
                    // ref.on('value', function(snapshot)
                    // {
                    //     eventManager.dispatch('value_changed', snapshot.val());
                    // });

                    // console.log('onAuth true', user);
                }
                else {
                    // console.log('onAuth false');
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
        }

        /**
         *
         */
        // saveTask: function (id, data) {
        //     firebase.database().ref('users/' + this.getUserIsAuth().uid + '/tasks/' + id).set(data);
        // }
    }
});