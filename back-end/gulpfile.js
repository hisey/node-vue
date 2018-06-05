//载入插件
var gulp = require('gulp'),
  sftp = require('gulp-sftp');

gulp.task('sftp', function() {
  var config = require('./sftpConfig');
  return gulp.src(['./**/*','!./node_modules/**/*'])
    .pipe(sftp(config));
});

// 开发构建
gulp.task('default', ['sftp']);

