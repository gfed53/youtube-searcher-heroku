var gulp = require('gulp');

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var connect = require('gulp-connect');
var uglify = require('gulp-uglify');
var ngmin = require('gulp-ngmin');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var usemin = require('gulp-usemin');
var rev = require('gulp-rev');
var clean = require('gulp-clean');
var del = require('del');

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

// JavaScript linting
gulp.task('jshint', function(){
	return gulp.src(paths.scripts)
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

// Compile SASS
gulp.task('sass', function(){
	return gulp.src(paths.scss)
		.pipe(sass())
		.pipe(gulp.dest(paths.css));
});

// Watch
gulp.task('watch', function(){
	gulp.watch(paths.scripts, ['jshint']);
	gulp.watch(paths.scss, ['sass']);
});

// Build
gulp.task('clean', function(){
  del(paths.build);
});

gulp.task('copy', [ 'clean' ], function() {
  gulp.src( paths.html )
    .pipe(gulp.dest('build/'));
});

gulp.task('usemin', [ 'copy' ], function(){
  gulp.src( paths.index )
    .pipe(usemin({
      css: [ minifyCss(), 'concat' ],
      js: [ ngmin(), uglify() ]
    }))
    .pipe(gulp.dest( paths.build ))
});

gulp.task('build', ['usemin']);

//Default
gulp.task('default', ['jshint', 'sass', 'watch']);

