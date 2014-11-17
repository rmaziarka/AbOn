var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

var EXPRESS_PORT = 4000;
var EXPRESS_ROOT = __dirname + '/public';
var LIVERELOAD_PORT = 35729;


gulp.task("createLibs", function(){
    var mainBowerFiles = require('main-bower-files');
	gulp.src(mainBowerFiles())
        .pipe(uglify())
        .pipe(concat('lib.js'))
        .pipe(gulp.dest("./public/scripts"));
});

var ngAnnotate = require('gulp-ng-annotate');
gulp.task('createApp', function() {
    gulp.src('./public/app/**/*.js')
        .pipe(ngAnnotate())
//        .pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/scripts/'))
});


var runExpress = function(){
    require('./server')
}

var lr = require('tiny-lr');
var runLivereload = function(){
    lr().listen(LIVERELOAD_PORT);
};

var notifyLivereload = function(event){
    gulp.src(event.path, {read:false})
        .pipe(require('gulp-livereload')(lr));
}

gulp.task('runServer',function(){
    runExpress();
    runLivereload();
    gulp.watch('./app/**/*.html', notifyLivereload);
})

var watch = require('gulp-watch');
gulp.task('watchJs', function () {
    gulp.src('public/app/**/*.js')
        .pipe(watch(function(files) {
            gulp.run('createApp');
        }));
});

gulp.task('default', ['createLibs','createApp','runServer','watchJs'])

gulp.start('default');