var gulp = require('gulp'),
jade = require('gulp-jade'),
jshint = require('gulp-jshint'),
watch = require('gulp-watch'),
less = require('gulp-less'),
imagemin = require('gulp-imagemin'),
pngquant = require('imagemin-pngquant');

/** Jade **/
gulp.task('jade', function () {
    return gulp.src('./src/**/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('./app'));
});

/** JSHint **/
gulp.task('jshint', function () {
    return gulp.src('./src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(gulp.dest('./app'));
});
/** LESS **/
gulp.task('less', function () {
    return gulp.src('./src/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('./app'));
});

gulp.task('imagemin', function () {
    return gulp.src('./src/images/**/*')
    .pipe(imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
    }))
    .pipe(gulp.dest('./app/images'));
});

/** Watch **/
gulp.task('watch', function () {
    gulp.watch('./src/**/*.js', ['jshint']);
    gulp.watch('./src/**/*.jade', ['jade']);
    gulp.watch('./src/**/*.less', ['less']);
});

/** Default task **/
gulp.task('default', ['jshint', 'jade', 'less', 'watch']);
