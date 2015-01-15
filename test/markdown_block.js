var nunjucks = require('nunjucks'),
    expect   = require('chai').expect,
    marked   = require('marked'),
    markdown = require('../index'),
    fs       = require('fs'),
    path     = require('path');

describe('markdown block tag', function() {

  // Setup
  var env = nunjucks.configure('test');
  markdown.register(env, marked);

  // Files
  var dir = 'test/';
  var md_tmpl = 'templates/markdown_only.html';
  var md_tmpl_with_var = 'templates/markdown_with_vars.html';
  var md_tmpl_include = 'templates/markdown_block_include.html';
  var md_only = 'markdown/markdown_only.md';

  it('should parse basic markdown', function() {

    var result   = env.render(md_tmpl).slice(0, -1);
    var expected = marked(fs.readFileSync(dir + md_only, 'utf-8'));

    return expect(result).to.equal(expected);
  });

  it('should parse markdown with variables', function() {

    var result   = env.render(md_tmpl_with_var, { test: 'this is just a test' }).slice(0, -1);
    var expected = marked(fs.readFileSync(dir + md_only, 'utf-8'));

    return expect(result).to.equal(expected);
  });

  it('should correctly handle include tags', function() {

    var result   = env.render(md_tmpl_include).slice(0, -1);
    var expected = marked(fs.readFileSync(dir + md_only, 'utf-8'));

    return expect(result).to.equal(expected);
  });

});

