var gulp = require('gulp');
var insert = require('gulp-file-insert');
var find = require('gulp-insert-lines');
var minify = require('gulp-minify');
var fs = require('fs');
var package = fs.readFileSync('./package.json');
 
gulp.task('dist', function() {
  return gulp.src(['./src/onebang.js'])
    .pipe(insert({
        "/*angular*/": "./src/angular/index.js",
        "/*basics*/": "./src/basics/index.js",
    }))
    .pipe(find({
        'after': /\/\*v\*\//g,
        'lineBefore': "'"+package.version+"'"
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        preserveComments: 'some'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['dist']);

gulp.watch('src/**/*.js', ['default']);