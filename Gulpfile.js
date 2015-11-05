// Gulp
var gulp = require('gulp');

// Plugins
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var jsPaths = [
    'src/**/*.js',
    'test/**/*',
    '*.js'
];

gulp.task('lint-js', function() {
    return gulp.src(jsPaths)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('compress', function() {
    return gulp.src('src/tree.js')
    .pipe(uglify())
    .pipe(rename('inspire-tree.min.js'))
    .pipe(gulp.dest('dist'));
});

// Copy git hooks
gulp.task('copy:hooks', function() {
    return gulp.src('hooks/*').pipe(gulp.dest('.git/hooks'));
});

// Task aliases
gulp.task('default', ['lint-js']);
gulp.task('setup', ['copy:hooks']);
gulp.task('pre-commit', ['default', 'compress']);
