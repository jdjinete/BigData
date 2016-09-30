//File Gulpfile.js
'use strict'

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    historyApiFallback = require('connect-history-api-fallback');

// Servidor web de desarrollo
gulp.task('server', function() {
    connect.server({
        root: './app',
        hostname: '0.0.0.0',
        port: 9090,
        livereload: true,
        middleware: function(connect, opt) {
            return [historyApiFallback()];
        }
    });
});
