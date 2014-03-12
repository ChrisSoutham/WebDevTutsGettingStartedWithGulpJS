// Include main components
var gulp = require('gulp');
var gutil = require('gulp-util');
var lr = require('tiny-lr');

// Include CSS components
var less = require('gulp-less');
var prefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// Include JS components
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// Include utilities
var rename = require("gulp-rename");
var livereload = require('gulp-livereload');
var server = lr();


// Source and Target directories
var sourceLESS = 'source/less';
var targetCSS = 'public/css';

var sourceJS = 'source/js';
var targetJS = 'public/js';


// LESS compilation
gulp.task('less', function () {
	gulp.src(sourceLESS + '/app.less')
		.pipe(less().on('error', gutil.log))
		.pipe(prefixer('last 10 versions'))
		.pipe(minifycss())
		.pipe(rename("app.min.css"))
		.pipe(gulp.dest(targetCSS))
		.pipe(livereload(server));
});


// JS compilation
gulp.task('js', function() {
	gulp.src(sourceJS + '/app.js')
		.pipe(concat("app.min.js"))
		.pipe(uglify({mangle: true}).on('error', gutil.log))
		.pipe(gulp.dest(targetJS))
		.pipe(livereload(server));
});


// LiveReload
gulp.task('livereload', function(next) {
	server.listen(35729, function(err) {
		if (err) return console.error(err);
		next();
	});
});


// Watch for LESS and JS changes and run the respective compilers automatically
gulp.task('watch', function () {
    gulp.watch(sourceLESS + '/**/*.less', ['less']);
    gulp.watch(sourceJS + '/**/*.js', ['js']);
});


// Default Task
gulp.task('default', ['livereload', 'less', 'js', 'watch']);