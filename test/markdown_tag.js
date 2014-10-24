var nunjucks = require('nunjucks'),
    expect   = require('chai').expect,
    marked   = require('marked'),
    filter   = require('../index');

var env = nunjucks.configure('views');

filter.register(env);

describe('markdown tag with body', function() {

	it('should parse basic markdown', function() {

    var testString = '# Hello! This is markdown!';
		var tmpl = '{% markdown %}' + testString + '{% endmarkdown %}';
		var result = env.renderString(tmpl);

		return expect(result).to.equal(marked(testString));
	});

});
