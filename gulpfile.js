var Gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var port = process.env.port || 3031;



Gulp.task('browserify',function(){

    Gulp.src('./app/src/js/app.js').pipe(browserify({transform: 'reactify'})).pipe(Gulp.dest('./app/build/js/app.js'));
});

// opens my brwoser to a page using the defined port
Gulp.task('open', function(){
    
    var options = {
        url: 'http://localhost:' + port,
    };
    
    Gulp.src('./app/index.html').pipe(open('', options));
});

// live reload server
Gulp.task('connect', function(){
    
    connect.server({
        root:'app',
        port:port, 
        livereload:true
    });
});

// calls live reload whenever there is a change in the js file
Gulp.task('js',function(){
    
    Gulp.src('./app/src/js/**/*.js').pipe(connect.reload());
});

// calls live reload whenever any html file is changed in the root folder
Gulp.task('html', function(){
    
    Gulp.src('./app/*.html').pipe(connect.reload());
});

// watched for changes and calles the appropriate gulp tasks
Gulp.task('watch', function(){
    
    Gulp.watch('./app/dist/js/*.js', ['js']);
    Gulp.watch('./app/*.html', ['html']);
    Gulp.watch('./app/src/js/**/*.js', ['browserify']);
    
});

Gulp.task('default', ['browserify']);
Gulp.task('serve', ['browserify', 'connect', 'open','watch']);
