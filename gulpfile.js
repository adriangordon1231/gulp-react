var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass-ns');
var plumber = require('gulp-plumber'); // stops gulp from stopping on errors 
var imageMin = require('gulp-imagemin');
var browserify = require('gulp-browserify');
var open = require('gulp-open'); 
var connect = require('gulp-connect');
var port = process.env.port || 3031;


gulp.task('compress-images', function(){
    
    gulp.src('img-tmp/*').pipe(imageMin()).pipe(gulp.dest('build/img'));
});

gulp.task('build-styles',function(){
    gulp.src('./sass/main.scss').pipe(sass({style:'compressed'})).pipe(gulp.dest('./build/css/'));
});

gulp.task('build-apps', function(){
    
    // manually implement
});




// opens my brwoser to a page using the defined port
gulp.task('open', function(){
    
    var options = {
        url: 'http://localhost:' + port,
    };
    
    gulp.src('index.html').pipe(open('', options));
});

// live reload server
gulp.task('connect', function(){
    
    connect.server({
        root:'',
        port:port, 
        livereload:true
    });
});

gulp.task('reload-js', function(){
    
     gulp.src('./build/js/apps/*.js').pipe(connect.reload());
});

gulp.task('reload-html', function(){
    
    gulp.src('*.html').pipe(connect.reload());
});

gulp.task('reload-css', function(){
    
    gulp.src('./build/css/*.css').pipe(connect.reload());
});

gulp.task('watch', function(){
    // watches all of the files in teh javascript fodler and automatically runs the scripts task
    gulp.watch('./apps/**/**/*.js',['build-apps']);
    
    // watches all the files  in the scss folder and runs the styles task
    gulp.watch('sass/**/*.scss',['build-styles']);
    
    // reloads the page on any change
    gulp.watch('./build/js/apps/*.js', ['reload-js']);
    gulp.watch('*.html',['reload-html']);
    gulp.watch('./build/css/*.css',['reload-css'])
});



gulp.task('default',['build-styles','build-apps','watch']);
gulp.task('serve', ['connect', 'open','watch']);