var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');

var paths = {
  scripts: 'src/**/*.js',
  html: [
    './src/**/*.html',
    '!./src/index.html'
  ],
  scss: './src/scss/*.scss',
  css: './src/css',
  index: './src/index.html',
  build: './build/'
};

// JavaScript linting task
gulp.task('jshint', function(){
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile SASS task
gulp.task('sass', function(){
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

// Watch task
gulp.task('watch', function(){
	gulp.watch(paths.scripts, ['jshint']);
	gulp.watch(paths.scss, ['sass']);
});

gulp.task('default', ['jshint', 'sass', 'watch']);

