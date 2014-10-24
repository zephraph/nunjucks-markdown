var nunjucks = require('nunjucks'),
    expect   = require('chai').expect,
    filter   = require('../index');

var env = nunjucks.configure('views');

filter.register(env);

describe('markdown tag with body', function() {

	it('should parse basic markdown', function() {

		var tmpl = '{% markdown %} # Hello! This is markdown! {% endmarkdown %}';
		var result = env.renderString(tmpl);

		return expect(result).to.equal('<h1 id="hello-this-is-markdown-">Hello! This is markdown!</h1>\n');
	});

});
