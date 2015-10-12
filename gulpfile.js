var concat  = require('gulp-concat'),
    gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    nano    = require('gulp-cssnano'),
    rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    uncss   = require('gulp-uncss'),
    inline  = require('gulp-inline'),
    ghPages = require('gulp-gh-pages');

var paths = {
    src_html   : 'src/index.html',
    src_styles : 'src/main.css',
    src_script : 'src/script.js',

    dest       : 'dist/'
};

gulp.task('html', function () {
    return gulp.src(paths.src_html)
        .pipe(inline({
          base: '',
          js: uglify(),
          css: nano(),
          disabledTypes: ['svg', 'img'],
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('watch', ['html'], function () {
    gulp.watch(paths.src_html, ['html']);
    gulp.watch(paths.src_styles, ['html']);
    gulp.watch(paths.src_script, ['html']);
});

gulp.task('deploy', function() {
  return gulp.src('dist/index.html')
    .pipe(ghPages());
});
