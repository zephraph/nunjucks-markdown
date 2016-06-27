# nunjucks-markdown [![Build Status](https://travis-ci.org/zephraph/nunjucks-markdown.svg)](https://travis-ci.org/zephraph/nunjucks-markdown)

A nunjuck extension that adds a markdown tag. This plugin allows you to choose your own markdown renderer.

## Install

``` bash
npm install nunjucks-markdown --save
```

## Usage

Register the extension with nunjucks

``` js
var nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked');

var env = nunjucks.configure('views');

// The second argument can be any function that renders markdown
markdown.register(env, marked);
```

Add markdown to your templates

```
{% markdown %}
Hello World
===========
# Do stuff
{% endmarkdown %}
```

You can also provide the markdown tag with a template to render

```
{% markdown "post.md" %}
```
_Note: This method doesn't require a closing tag_

As you would expect, you can add tags inside your markdown tag
```
{% markdown %}
{% include 'post1.md' %}
{% include 'post2.md' %}
{% endmarkdown %}
```

### Using with Gulp

Gulp requires a little more explicit settings than standard npm. See https://mozilla.github.io/nunjucks/api.html#custom-tags

see example-gulpefile.js based on https://gist.github.com/kerryhatcher/1382950af52f3082ecdc668bba5aa11b

``` js
var nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked'),
    gulpnunjucks = require('gulp-nunjucks');
    
var templates = 'src/templates'; //Set this as the folder that contains your nunjuck files

var env = new nunjucks.Environment(new nunjucks.FileSystemLoader(templates));

// The second argument can be any function that renders markdown
markdown.register(env, marked);

gulp.task('pages', function() {
    // Gets .html files. see file layout at bottom
    return gulp.src([templates + '/*.html', templates + '/**/*.html'])
        // Renders template with nunjucks and marked
        .pipe(gulpnunjucks.compile("", {env: env}))
        // output files in dist folder
        .pipe(gulp.dest(dist))
});
```


## Markdown Options

**Nunjucks-markdown** doesn't require you to use any particular markdown renderer. If you were to use marked here's a good example of how it could be configured.

``` js
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pendantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

markdown.register(env, marked);
```

For more information configuration options, checkout [marked](https://github.com/chjj/marked).

