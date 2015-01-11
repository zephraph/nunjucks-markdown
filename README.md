# nunjucks-markdown

A nunjuck extension that adds a markdown tag

## Install

``` bash
npm install marked --save
```

## Usage

Register the extension with nunjucks

``` js
var nunjucks = require('nunjucks'),
    markdown = require('nunjucks-markdown');

var env = nunjucks.configure('views');

markdown.register(env);
```

Add markdown to your templates

```
{% markdown %}
Hello World
===========
# Do stuff
{% endmarkdown %}
```

As you would expect, you can add tags inside your markdown tag
```
{% markdown %}
{% include 'myTemplate.html' %}
{% endmarkdown %}
```

## Markdown Options

**Nunjucks-markdown** uses marked as its parser. Marked can be configured by passing in an options object to the register function.

``` js
var marked = require('marked');

markdown.register(env, {
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pendantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});
```

For more information configuration options, checkout [marked](https://github.com/chjj/marked).

