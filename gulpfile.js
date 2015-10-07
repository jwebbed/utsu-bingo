var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");

gulp.task('build', function() {
	return gulp.src('./_index.html')
		 .pipe(htmlmin({collapseWhitespace: true}))
		 .pipe(rename("index.html"))
		 .pipe(gulp.dest("./"))
});
