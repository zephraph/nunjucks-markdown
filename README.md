# nunjucks-markdown

A nunjuck extension that adds a markdown tag. This plugin allows you to choose your own markdown renderer. 

## Install

``` bash
npm install marked --save
```

## Usage

Register the extension with nunjucks

``` js
var nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown'),
    marked = require('marked');

var env = nunjucks.configure('views');

// The second argument can be any function renders markdown
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
