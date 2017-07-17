var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var rjs = require('requirejs');
var pump = require('pump');
var browserSync = require("browser-sync");
reload = browserSync.reload;

/*var config = {
    server: {baseDir: "./src"},
    //tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "LaBestia"
};*/

gulp.task('dev:js', function (cb) {
    rjs.optimize({
        baseUrl: "./src/js/app",
        name: "../init",
        out: "./src/js/build.js",
        optimize: 'none',
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
        }
    }, function (buildResponse) {
        console.log('build response', buildResponse);
        cb();
    }, cb);
});

gulp.task('dev:css', function () {
    gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
        // .pipe(reload({stream: true}));
});

gulp.task('dev:fonts', function () {
    gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest('./src/fonts'));
});

gulp.task('dev:build', ['dev:js', 'dev:css', 'dev:fonts']);

gulp.task('watch', function () {
    watch('./src/js/**/*.js', function () {
        gulp.start('dev:js');
    });
    watch('./src/style/**/*.scss', function () {
        gulp.start('dev:css');
    });
});


// PROD

gulp.task('prod:html', function () {
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('build'))
        .pipe(reload({stream: true}));
});

gulp.task('prod:json', function () {
    gulp.src('./src/*.json')
        .pipe(gulp.dest('build'))
        .pipe(reload({stream: true}));
});

// gulp.task('dev:js', function () {
//     gulp.src('./src/js/**/*.js')
//         .pipe(gulp.dest('./build/js'))
//         .pipe(reload({stream: true}));
// });

// watch('src/**/*.html', function ()
// {
//     gulp.start('build:html');
// });