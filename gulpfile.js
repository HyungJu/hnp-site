const gulp = require('gulp');
const requireDir = require('require-dir');

var deploy      = require('gulp-gh-pages');
requireDir('./gulp');

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Compile
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('compile', gulp.parallel('style', 'script', 'script:webpack', 'vendor'));
gulp.task('compile:all', gulp.parallel('compile', 'pug'));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Deploy
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('build', gulp.series('clean:build', 'build:static', 'compile:all'));
gulp.task('build:test', gulp.series('build', 'watch'));
gulp.task('live', gulp.series('clean:live', 'build', 'build:push'));

/*=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
|  Run development environment
=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
gulp.task('default', gulp.series('clean', 'compile', 'watch'));
/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
        .pipe(deploy({
            remoteUrl: "https://github.com/hyungju/hnp-site.git",
            branch: 'master'
        }))
});
