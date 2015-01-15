var nunjucks = require('nunjucks'),
    expect   = require('chai').expect,
    marked   = require('marked'),
    markdown = require('../index'),
    fs       = require('fs'),
    path     = require('path');

describe('markdown include tag', function() {

  // Setup
  var env = nunjucks.configure('test');
  markdown.register(env, marked);

  // Files
  var dir = 'test/';
  var md_only = 'markdown/markdown_only.md';
  var md_tmpl = 'templates/markdown_only.html';
  var md_tmpl_include = 'templates/markdown_include.html';

  it('should import a markdown file', function() {

    var result   = env.render(md_tmpl_include).slice(0, -1);
    var expected = marked(fs.readFileSync(dir + md_only, 'utf-8'));

    return expect(result).to.equal(expected);
  });

});
