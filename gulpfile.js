'use strict';

var gulp = require('gulp'),
    md5 = require('gulp-md5'),
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    inject = require('gulp-inject'),
    jslint = require('gulp-jslint'),
    nodemon = require('gulp-nodemon'),
    browserSync = require('browser-sync').create();

// clean build catalog
gulp.task('clean', function(){
  return gulp.src('build', {read: false})
          .pipe(clean());
});

// sass compile
gulp.task('sass', function(){
  return gulp.src('source/css/**/*.sass')
          .pipe(sass().on('error', sass.logError))
          .pipe(md5(8))
          .pipe(gulp.dest('build'))
          .pipe(browserSync.stream());
});

// check by jslint
gulp.task('scripts', function(){
  return gulp.src('source/**/*.js')
          .pipe(jslint())
          .pipe(jslint.reporter('default', errorsOnly))
          .pipe(jslint.reporter('stylish', options))
          .pipe(md5(8))
          .pipe(gulp.dest('build'))
          .pipe(browserSync.stream());
});

// compile html
gulp.task('htmls', ['sass', 'scripts'], function(){
  return gulp.src(['source/**/*.html', '!source/index.html'])
        .pipe(gulp.dest('build'))
        .pipe(browserSync.stream());
});

// insert bower scripts into index.html
gulp.task('insert_source', ['htmls'], function(){
  return gulp.src('source/index.html')
          .pipe(inject(gulp.src('build/**/*.js', {read: false})))
          .pipe(inject(gulp.src('build/**/*.css', {read: false})))
          .pipe(inject(mainBowerFiles(), {read: false}), {name: 'bower'})
          .pipe(gulp.dest('build/'));
});

// browserSync in development
gulp.task('browser_sync', ['insert_source'], function(){
  browserSync.init({
    server: './build',
    routes: {
      '/bower_components': 'bower_components',
      '/build': 'build'
    }
  });

  gulp.watch('source/**/*.js', ['scripts']);
  gulp.watch('source/**/*.sass', ['sass']);
  gulp.watch('source/index.html').on('change', browserSync.reload);
});

// nodemon server
gulp.task('nodemon', function(){
  return nodemon({})
        .on('start', function(){
          browserSync.reload();
        })
        .on('restart', function(){
          console.log('restarting...');
        });
});

// default task
gulp.task('default', ['clean'], function(){
  gulp.start('browser_sync');
  gulp.start('nodemon');
});
