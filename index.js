var Markdown = require('./lib/markdown_tag');
var marked = require('marked');

module.exports.register = function(env, opts) {

  if(typeof(opts) !== 'undefined')
    marked.setOptions(opts);

  env.addExtension('markdown', new Markdown(marked, env));
};
