var concat  = require('gulp-concat'),
    gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    nano    = require('gulp-cssnano'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    uncss   = require('gulp-uncss');

var paths = {
    src_html   : 'src/index.html',
    src_styles : 'src/styles/*.css',
    src_script : 'src/script.js',

    dest       : 'dist/'
};

gulp.task('css', function () {
    return gulp.src(paths.src_styles)
        .pipe(concat('main.css'))
        .pipe(uncss({
            html: [paths.src_html]
        }))
        .pipe(nano())
        .pipe(rename('main.min.css'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('js', function () {
    return gulp.src(paths.src_script)
        .pipe(uglify())
        .pipe(rename('script.min.js'))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('html', function () {
    return gulp.src(paths.src_html)
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['css', 'js', 'html']);
