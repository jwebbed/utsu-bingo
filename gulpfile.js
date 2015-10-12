var ghPages = require('gulp-gh-pages'),
    gulp    = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    inline  = require('gulp-inline'),
    nano    = require('gulp-cssnano'),
    closure = require('gulp-closure-compiler-service');

var paths = {
    src_html   : 'src/index.html',
    src_all    : 'src/**/*',
    dest       : 'dist/',
    dest_built : 'dist/index.html'
};

gulp.task('build', function () {
    return gulp.src(paths.src_html)
        .pipe(inline({
          base: '',
          js: closure({
            compilation_level: 'ADVANCED_OPTIMIZATIONS'
          }),
          css: nano(),
          disabledTypes: ['svg', 'img'],
        }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest(paths.dest));
});

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
    gulp.watch(paths.src_all, ['build']);
});

gulp.task('deploy', function () {
    return gulp.src(paths.dest_built)
        .pipe(ghPages());
});
