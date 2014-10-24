(function() {
  var Markdown = require('./lib/markdown_tag');

  module.exports.register = function(env, opts) {
    var marked = require('marked');

    if(typeof(opts) !== 'undefined')
      marked.setOptions(opts);

    env.addExtension('markdown', new Markdown(marked));
  };

}).call(this);
