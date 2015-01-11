var nunjucks = require('nunjucks'),
    expect   = require('chai').expect,
    marked   = require('marked'),
    filter   = require('../index');

var env = nunjucks.configure('views');

filter.register(env);

describe('markdown tag with body', function() {

  function tmpl(testString) { return '{% markdown %}' + testString + '{% endmarkdown %}' };

	it('should parse basic markdown', function() {

    var testString = '# Hello! This is markdown!';
		var result = env.renderString(tmpl(testString));

		return expect(result).to.equal(marked(testString));
	});

  it('should parse markdown with variables', function() {

    var testString = '# Hello! This is {{ name }}!';
    var renderedMd = '# Hello! This is bob!';
    var result = env.renderString(tmpl(testString), { name: 'bob' });

    return expect(result).to.equal(marked(renderedMd));
  });

});
