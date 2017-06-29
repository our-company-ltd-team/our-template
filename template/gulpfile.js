/// <binding AfterBuild='release' ProjectOpened='build-modernizr, copy-node_modules, components, default' />
var fs = require('fs');
var path = require('path');
var glob = require("glob");

var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var watch = require('gulp-watch');
var minifyCSS = require('gulp-minify-css');
var handlebars = require('gulp-handlebars');
var defineModule = require('gulp-define-module');


var cache = require('gulp-cache');
var changed = require('gulp-changed');

var components = require('responsive-components');

var modernizr = require('modernizr');





var bundleConfigSrc = './Styles/bundles.config.json';
var componentsConfigSrc = './Styles/components.config.json';
var modernizrConfigSrc = './modernizr.json';

var StylesOutput = './wwwroot/styles';
var ScriptsOutput = './wwwroot/scripts';

var node_modules = {
    "node_modules/classlist-polyfill/src/index.js":  './Scripts/Polyfills/classlist.js',
    "node_modules/enquire.js/dist/enquire.js":  './Scripts/Lib/enquire.js',
    "node_modules/hammerjs/hammer.js": './Scripts/Lib/hammer.js',
    "node_modules/object-fit-images/dist/ofi.min.js": './Scripts/Polyfills/object-fit-images.js'
}


gulp.task('build-modernizr', function (done) {
    var content = fs.readFileSync(modernizrConfigSrc, "utf-8");
    var modernizrConfig = JSON.parse(content.trim());

    modernizr.build(modernizrConfig, function (code) {
        fs.writeFile('./Scripts/Lib/modernizr.js', code, done);
    });

});
 

gulp.task('copy-node_modules', function () {
    try {
        for (var node_module in node_modules) {
            gulp
                .src(node_module)
                .pipe(rename(node_modules[node_module]))
                .pipe(changed("./", { hasChanged: changed.compareContents }))
                .pipe(gulp.dest("./"));
        }
    }
    catch (e) {
        return -1;
    }
    return 0;
});



gulp.task('themes', function () {
    // generate css files from less :
    glob("Styles/Themes/*.theme", {}, function (err, files) {
        files.forEach(function (file) {
            var content = fs.readFileSync(file, "utf-8");
            var themeConfig = JSON.parse(content.trim());
            gulp
                .src(['Styles/@theme.less'])
                .pipe(less({ modifyVars: themeConfig }))
                .pipe(rename(function (p) {
                    p.dirname += "/Themes";
                    p.basename = path.basename(file);
                    p.extname = ".css";
                }))
                .pipe(gulp.dest(function (f) {
                    return f.base;
                }))
                .on('end', lessBundles);
        });

    })

});


gulp.task('templates', function () {
    gulp.src('Templates/*.tpl')
      .pipe(changed('./wwwroot/Templates/'))
      .pipe(handlebars())
      .pipe(defineModule('amd'))
      .pipe(gulp.dest('./wwwroot/Templates/'));
});

gulp.task('less', function () {
    // generate css files from less :
    gulp
        .src(['Styles/**/*.less', '!**/@*'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }))
        .on('end', lessBundles);
});

function lessBundles() {
    var content = fs.readFileSync(bundleConfigSrc, "utf-8");

    var bundleConfig = JSON.parse(content.trim());
    // creates the bundles :

    for (var bundleName in bundleConfig) {
        gulp
            .src(bundleConfig[bundleName])
            .pipe(concat(bundleName + ".css"))
            .pipe(changed(StylesOutput, { hasChanged: changed.compareContents }))
            .pipe(gulp.dest(StylesOutput))
            .pipe(minifyCSS())
            .pipe(gulp.dest(StylesOutput+"/Build"));
    }
}

gulp.task('js', function () {
    gulp.src(['./Scripts/**/*.js'])
        .pipe(changed(ScriptsOutput, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(ScriptsOutput))
        .pipe(uglify())
        .pipe(gulp.dest(ScriptsOutput + "/Build"));
});


gulp.task('components', function () {
    fs.readFile(componentsConfigSrc, "utf-8", function (err, data) {
        var componentsConfig = JSON.parse(data.trim());
        components.update(componentsConfig);
    });
});

gulp.task('release', function () {
    gulp.start(['js', 'less']);
});

gulp.task('default', function () {
    gulp.watch(['./Scripts/**/*.js'], ['js']);
    gulp.watch('./Styles/**/*.less', ['less']);
    gulp.watch('Styles/@theme.less', ['themes']);
    gulp.watch('Styles/**/*.theme', ['themes']);
    gulp.watch('Templates/**/*.tpl', ['templates']);
});