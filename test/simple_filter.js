var nunjucks = require('nunjucks'),
    expect   = require('chai').expect(),
    filter   = require('../lib/main.js');

var template = '{% markdown %} # Hello! {% endmarkdown %}';
var env = nunjucks.configure('views');

filter.register(env);
describe('Filter Block', function() {
  describe('Single filter: upper', function() {
    it('should return an uppercase string', function() {
      env.renderString(template);
    });
  });
});
