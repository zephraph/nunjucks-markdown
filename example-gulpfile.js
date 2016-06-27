'use strict';
// =======================================================================
// Gulp Plugins
// =======================================================================
var gulp = require('gulp'),
    nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked'),
    rename = require('gulp-rename'),
    gulpnunjucks = require('gulp-nunjucks');

// =======================================================================
// ENV Vars
// =======================================================================
var dist = 'dist'; //Set this as your target you be compiling into
var src = 'src'; //Set this as the location of your source files
var templates = src + '/templates'; //Set this as the folder that contains your nunjuck files


// Create an new nunjuck envroment. This seemed to be the problem for me. Didn't work for me until I specified the FileSystemLoader.
// The templates folder tells the nunjuck renderer where to find any *.njk files you source in your *.html files. 
var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templates));

// all fo the follwing is optional and this will all work just find if you don't include any of it. included it here just in case you need to configure it. 
marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
});

// This takes the freshley created nunjucks envroment object (env) and passes it to nunjucks-markdown to have the custom tag regestered to the env object.
// The second is the marked library. anything that can be called to render markdown can be passed here. 
markdown.register(env, marked);


// =======================================================================
// Index Task (Generate pages from template *.html files.)
// =======================================================================
gulp.task('pages', function () {
    // Gets .html files. see file layout at bottom
    return gulp.src([templates + '/*.html', templates + '/**/*.html'])
    // Renders template with nunjucks and marked
        .pipe(gulpnunjucks.compile("", {env: env}))
        // Uncomment the following if your source pages are something other than *.html. 
        // .pipe(rename(function (path) { path.extname=".html" }))
        // output files in dist folder
        .pipe(gulp.dest(dist))
});


/**

 This example assumes a file layout similar to:


 Project-Root/
 src/
 templates/
 index.html
 about.html
 otherpage.html
 nav.njk
 header.njk
 footer.njk
 basehtml.njk
 subfolder/
 index.html
 gulpfile.js


 The *.html files will compile into .html files in your dist folder.
 The .njk files define source and block components for the html files.
 The Markdown tag can be included in any of these files.
 {% markdown %}
 # Hello Markdown
 {% endmarkdown %}

 **/ 
 
