var gulp = require('gulp'),
    gutil = require('gulp-util'),
    webserver = require('gulp-webserver');

gulp.task('js', function() {
    gulp.src('topgit/js/**/*')
});

gulp.task('html', function() {
    gulp.src('topgit/*.html')
});

gulp.task('css', function() {
    gulp.src('topgit/css/*.css')
});

gulp.task('watch', function() {
    gulp.watch('topgit/js/**/*', ['js']);
    gulp.watch('topgit/css/*.css', ['css']);
    gulp.watch(['topgit/*.html',
        'topgit/views/*.html'], ['html']);
});

gulp.task('webserver', function() {
    gulp.src('topgit/')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('default', ['watch', 'html', 'js', 'css', 'webserver']);
