
const gulp = require('gulp');
const uglify = require('gulp-uglify');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const webpack = require('webpack-stream');
const babel = require('gulp-babel');
const mode = require('gulp-mode')();


gulp.task('process-sass', () => {
    return gulp.src('css/master.scss')
        .pipe(mode.development(sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 1%']
        }))
        .pipe(cssnano())
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest('css'));
});


gulp.task('process-js', () => {
    return gulp.src('js/src/search.js')
        .pipe(webpack({
            mode: mode.development() ? 'development' : 'production',
            watch: true,
            output: {
                filename: 'app.js'
            }
        }))
        .pipe(babel({ presets: ['@babel/env'] }))
        .pipe(mode.development(sourcemaps.init()))
        .pipe(uglify().on('error', (uglify) => {
            console.error(uglify.message);
            this.emit('end');
        }))
        .pipe(mode.development(sourcemaps.write()))
        .pipe(gulp.dest('js'));
});


gulp.task('watch', () => {

    gulp.watch(
        ['css/*.scss','css/*/*.scss'],
        { ignoreInitial: false },
        gulp.series('process-sass')
    );

    gulp.watch(
        ['js/src/*.js','js/src/*/*.js'],
        { ignoreInitial: false },
        gulp.series('process-js')
    );

});