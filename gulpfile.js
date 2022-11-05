var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var wait = require('gulp-wait');

var reload = browserSync.reload;

gulp.task('default', ['watch'], function () {
});

gulp.task('browserSync', function() {
    browserSync.init(null, {
        proxy: "localhost:3000", // local node app address
        port: 5000, // use *different* port than above
        notify: true
    });
});

gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: 'server.js',
        ignore: [
            'gulpfile.js',
            'node_modules/'
            ]
        }).on('start', function() {
            if (!started) {
                started = true;
                cb();
            }
        }).on('restart', function() {
            setTimeout(function() {
                reload({ stream: false });
            }, 1000);
        });
});

gulp.task('sass', function() {
    return gulp.src('assets/scss/*.scss')
        .pipe(wait(500))
        .pipe(sass({
            includePaths: ['assets/scss']
        }).on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('watch', ['browserSync', 'nodemon','sass'], function() {
    gulp.watch('assets/scss/*.scss', ['sass']);
    gulp.watch('*.html').on('change', reload);
    gulp.watch('assets/js/*.js').on('change', reload);
});