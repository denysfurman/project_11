var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var gutil = require( 'gulp-util' );
var ftp = require( 'vinyl-ftp' );
var autoprefixer = require('gulp-autoprefixer');
var rigger = require('gulp-rigger');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var cssbeautify = require('gulp-cssbeautify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var pug = require('gulp-pug');
var notify = require("gulp-notify");

//-----------------------------------path----------------------------//
var  path = {
    build: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'build/html',
        pug: 'build/html',
        css: 'build/css',
        image: 'build/images'
    },
    src: { //Пути откуда брать исходники
        html: 'src/html/*.html',
        pug: 'src/pug/*.pug',
        scss: 'src/scss/*.scss',
        image: 'src/images/*',
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/html/**',
        pug: 'src/pug/**',
        scss: 'src/scss/**',
    },
    clean: './build'
};
// server connect
gulp.task('connect', function() {
  connect.server({
    // host: 'katoob',
    port: 8000,
    root: 'build',
    livereload: true
  });
});

//-----------------------------------image task----------------------------//
gulp.task('compress', function() {
  gulp.src(path.src.image)
  .pipe(imagemin())
  .pipe(gulp.dest(path.build.image))
});

//-----------------------------------pug task----------------------------//
gulp.task('html', function buildHTML() {
  return gulp.src(path.src.pug)
  .pipe(pug({
    pretty: true
  }))
  .pipe(connect.reload())
  .pipe(gulp.dest(path.build.html)) //Выплюнем их в папку build
});

//-----------------------------------SCSS to CSS----------------------------//
gulp.task('scss', function () {
  return gulp.src(path.src.scss)
    .pipe(sass().on('error', notify.onError("Error: <%= error.message %>")))
    .pipe(autoprefixer({
        browsers: ['last 15 versions'],
        cascade: false
    }))
    .pipe(cssbeautify())
    .pipe(sourcemaps.init())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(connect.reload())
    .pipe(gulp.dest(path.build.css));
});

//-----------------------------------watch task----------------------------//
gulp.task('scss:watch', function () {
  gulp.watch(path.watch.scss, ['scss']);
});
gulp.task('html:watch', function () {
  gulp.watch(path.watch.pug, ['html']);
});
gulp.task('image:watch', function() {
  gulp.watch(path.src.image, ['compress']);
});

//-----------------------------------default task----------------------------//
gulp.task('default', ['connect', 'html', 'scss', 'scss:watch', 'html:watch', 'image:watch']);

