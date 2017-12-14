/// <binding AfterBuild='release' ProjectOpened='build-modernizr, copy-node_modules, components, default' />

/* IO */
var fs = require('fs-extra');
var path = require('path');
var glob = require("glob");
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');

/* Util */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var replace = require("node-replace");

/* Typescript */
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

/* Less & Css */
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var components = require('responsive-components');
var cleanCSS = require('gulp-clean-css');

/* Modernizr */
var modernizr = require('modernizr');

/* Variables */
var bundleConfigSrc = './Styles/bundles.config.json';
var componentsConfigSrc = './Styles/components.config.json';
var modernizrConfigSrc = './modernizr.json';

/* Template */
//var replaceInFile = require('replace-in-file');

var StylesFolder = './Styles';
var ScriptsFolder = './Scripts';

var StylesOutput = './wwwroot/styles';
var ScriptsOutput = './wwwroot/scripts';

var StylesBuildOutput = './wwwroot/styles/Build';
var ScriptsBuildOutput = './wwwroot/scripts/Build';

var node_modules = {
    "node_modules/classlist-polyfill/src/index.js": './Scripts/Polyfills/classlist.js',
    "node_modules/enquire.js/dist/enquire.js": './Scripts/Lib/enquire.js',
    "node_modules/hammerjs/hammer.js": './Scripts/Lib/hammer.js',
    "node_modules/object-fit-images/dist/ofi.min.js": './Scripts/Polyfills/object-fit-images.js'
}

/* Compile Ts file, Copy to output and uglify*/
gulp.task("ts", function () {
    return gulp.src([`${ScriptsFolder}/**/*.ts`])
        .pipe(tsProject())
        .js
        .pipe(buffer())
        .pipe(changed(ScriptsOutput, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(ScriptsOutput))
        .pipe(uglify())
        .pipe(gulp.dest(ScriptsBuildOutput));
});

/* Copy Js files to output and uglify */
gulp.task("js", function () {
    return gulp.src([`${ScriptsFolder}/**/*.js`])
        .pipe(buffer())
        .pipe(changed(ScriptsOutput, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(ScriptsOutput))
        .pipe(uglify())
        .pipe(gulp.dest(ScriptsBuildOutput));
});

/* Build a custom Modernizr file */
gulp.task('build-modernizr', function (done) {
    var content = fs.readFileSync(modernizrConfigSrc, "utf-8");
    var modernizrConfig = JSON.parse(content.trim());

    modernizr.build(modernizrConfig, function (code) {
        fs.writeFile('./Scripts/Lib/modernizr.js', code, done);
    });
});

/* Copy necessary js files from the node modules */
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

/* Compile Less file */
gulp.task('less', function () {
    return gulp.src([`${StylesFolder}/**/*.less`, '!@*', '!**/@*'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(buffer())
        .pipe(changed(StylesOutput, { hasChanged: changed.compareContents }))
        .pipe(gulp.dest(function (f) {
            return f.base;
        }));
});

/*Bundle css files, Copy to output and uglify */
gulp.task('css', ['less'], function () {
    var content = fs.readFileSync(bundleConfigSrc, "utf-8");

    var bundleConfig = JSON.parse(content.trim());
    // creates the bundles :

    for (var bundleName in bundleConfig) {
        console.log(bundleName);
        gulp
            .src(bundleConfig[bundleName])
            .pipe(concat(bundleName + ".css"))
            .pipe(changed(StylesOutput, { hasChanged: changed.compareContents }))
            .pipe(gulp.dest(StylesOutput))
            .pipe(cleanCSS())
            .pipe(gulp.dest(StylesBuildOutput));
    }
});

//var handlebars = require('gulp-handlebars');
//var defineModule = require('gulp-define-module');

//gulp.task('themes', function () {
//    // generate css files from less :
//    glob("Styles/Themes/*.theme", {}, function (err, files) {
//        files.forEach(function (file) {
//            var content = fs.readFileSync(file, "utf-8");
//            var themeConfig = JSON.parse(content.trim());
//            gulp
//                .src(['Styles/@theme.less'])
//                .pipe(less({ modifyVars: themeConfig }))
//                .pipe(rename(function (p) {
//                    p.dirname += "/Themes";
//                    p.basename = path.basename(file);
//                    p.extname = ".css";
//                }))
//                .pipe(gulp.dest(function (f) {
//                    return f.base;
//                }))
//                .on('end', lessBundles);
//        });
//    })
//});

//gulp.task('templates', function () {
//    gulp.src('Templates/*.tpl')
//        .pipe(changed('./wwwroot/Templates/'))
//        .pipe(handlebars())
//        .pipe(defineModule('amd'))
//        .pipe(gulp.dest('./wwwroot/Templates/'));
//});

/* Creates the Component less files */
gulp.task('components', function () {
    fs.readFile(componentsConfigSrc, "utf-8", function (err, data) {
        var componentsConfig = JSON.parse(data.trim());
        components.update(componentsConfig);
    });
});

gulp.task('export-template', () => {
    const options = {
        //Single file
        files: 'path/to/file',

        //Multiple files
        files: [
            'path/to/file',
            'path/to/other/file',
        ],

        //Glob(s)
        files: [
            'path/to/files/*.html',
            'another/**/*.path',
        ],

        //Replacement to make (string or regex)
        replace: /Find me/g,
        with: 'Replacement',
    };
    fs.copySync('../../src', '../../dist', {
        overwrite:true,
        dereference:true,
        filter: (src, dest)  => {
            return !/(\.vs|node_modules|obj|bin|.DS_Store)$/.test(dest);// !/\.vs$/.test(dest);
        }
    });
    replace({
      regex: "<%=namespace %>",
      replacement: "<%=namespace %>",
      paths: ['../../dist'],
      recursive: true,
      silent: true
    })
})
gulp.task('default', function () {
    gulp.watch(['./Scripts/**/*.js'], ['js']);
    gulp.watch(['./Scripts/**/*.ts'], ['ts']);
    gulp.watch(['./Styles/**/*.less', './Views/**/*.less'], ['css']);
    //gulp.watch('Styles/@theme.less', ['themes']);
    //gulp.watch('Styles/**/*.theme', ['themes']);
    //gulp.watch('Templates/**/*.tpl', ['templates']);
});