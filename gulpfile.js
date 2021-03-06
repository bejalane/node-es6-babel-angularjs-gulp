const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ifElse = require('gulp-if-else');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();

const scripts = require('./scripts');
const styles = require('./styles');

var devMode = false;

gulp.task('css', function(){
	gulp.src(styles)
		.pipe(concat('main.css'))
		.pipe(gulp.dest('./out/app/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

gulp.task('js', function() {
    gulp.src(scripts)
        .pipe(concat('scripts.js'))
        .pipe(ifElse(!devMode, uglify))
        .pipe(gulp.dest('./out/app/js'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('html', function(){
	gulp.src('./src/app/views/**/*.html')
		.pipe(gulp.dest('./out/app/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('build', function(){
	gulp.start(['css', 'js', 'html']);
});

gulp.task('browser-sync', function(){
	browserSync.init(null, {
		open: false,
		server: {
			baseDir: 'out/app'
		}
	});
});

gulp.task('node', () =>
    gulp.src('./src/server/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('out/server'))
);

gulp.task('start', function(){
	devMode = true;
	gulp.start(['build', 'browser-sync'])
	gulp.watch(['./src/app/css/**/*.css'], ['css'])
	gulp.watch(['./src/app/js/**/*.js'], ['js'])
	gulp.watch(['./src/app/views/**/*.html'], ['html'])
	gulp.watch(['./src/server/**/*.js'], ['node'])
});