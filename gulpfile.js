var gulp = require('gulp');
var insert = require('gulp-file-insert');
var replace = require('gulp-regex-replace');
var minify = require('gulp-minify');
var iife = require('gulp-iife');
var license = require('gulp-license');
var shell = require('gulp-shell');
var fs = require('fs');
var package = JSON.parse(fs.readFileSync('./package.json'));

gulp.task('dist', function() {
  return gulp.src(['./src/onebang.js'])
    .pipe(insert({
        "/*angular*/": "./src/angular/index.js",
        "/*basics*/": "./src/basics/index.js",
    }))
    .pipe(replace({regex:'una-version', replace: package.version}))
    .pipe(iife())
    .pipe(license('MIT',{tiny: false, organization:"Russell Steadman"}))
    .pipe(gulp.dest('./dist/'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        output: {
            bracketize: true
        },
        lint: true,
        preserveComments: 'some'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('webpack', shell.task([
  'cd test/webpack && webpack && cd ../..'
]))

gulp.task('default', ['dist','webpack']);

if (process.env.runtime !== 'travis') {
    gulp.watch('src/**/*.js', ['default']);
}