const {src, dest, watch, parallel, series} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const pug = require('gulp-pug');
const browserSync = require('browser-sync').create();

const buildSass = () => {
    console.log('Compilation SASS');

    return src('dist/scss/*.scss')
        .pipe(sass())
        .pipe(dest('build/styles/'))
        .pipe(browserSync.stream());
};

const buildPug = () => {
    console.log('Compilation Pug');

    return src('dist/pages/*.pug')
        .pipe(pug())
        .pipe(dest('build/'))
        .pipe(browserSync.stream());
};

const browserSyncJob = () => {
    browserSync.init({
        server: "build/"
    });

    watch('dist/scss/**/*.scss', {events: 'change'}, buildSass);
    watch('dist/pages/**/*.pug', {events: 'change'}, buildPug);
};

exports.development = series(buildSass, buildPug, series(browserSyncJob));
