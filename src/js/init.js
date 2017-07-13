requirejs.config({
    baseUrl: 'js/app',
    paths: {
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
            apiKey: "AIzaSyAml-n_cSuEruMzgZidEWNRT-3JTd06XZI",
            authDomain: "todoappe.firebaseapp.com",
            databaseURL: "https://todoappe.firebaseio.com",
            projectId: "todoappe",
            storageBucket: "todoappe.appspot.com",
            messagingSenderId: "883430117576"
        }
    }
});

requirejs(['app'], function (app) {
    app.init();
});