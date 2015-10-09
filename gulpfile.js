var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var rename = require("gulp-rename");
var concat = require('gulp-concat');

gulp.task('min', function() {
	return gulp.src("scripts.js")
		.pipe(uglify())
		.pipe(rename("scripts.min.js"))
		.pipe(gulp.dest("./dist/"))
});

gulp.task('build', function() {
	return gulp.src('./_index.html')
		 .pipe(htmlmin({collapseWhitespace: true}))
		 .pipe(rename("index.html"))
		 .pipe(gulp.dest("./"))
});
