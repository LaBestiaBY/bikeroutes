requirejs.config({
    baseUrl: 'js/app',
    paths: {
        eventManager: 'eventManager',
        ymaps: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&coordorder=longlat',
        underscore: '../libs/underscore-min',
        jquery: '../libs/jquery-3.2.1.min',
        ready: '../libs/ready',
        text: '../libs/text',
        firebase: 'https://www.gstatic.com/firebasejs/4.1.1/firebase'
    },
    shim: {
        firebase: {
            exports: 'firebase'
        },
        ymaps: {
            exports: 'ymaps'
        }
    },
    config: {
        fb: {
            apiKey: "AIzaSyClmZ4kFlTpivFJ6VC-t0to8y3XP3RStH0",
            authDomain: "bike-routes-493c2.firebaseapp.com",
            databaseURL: "https://bike-routes-493c2.firebaseio.com",
            projectId: "bike-routes-493c2",
            storageBucket: "bike-routes-493c2.appspot.com",
            messagingSenderId: "681122622740"
        }
    }
});

requirejs(['app'], function (app) {
    app.init();
});