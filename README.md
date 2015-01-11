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

## Plans for the future

The last thing I really want to accomplish with this extension is to give the user the ability to specify
which markdown engine they want to use. I'll probably just set marked as the fallback if none is provided. 
