var Markdown = require('./lib/markdown_tag');

module.exports.register = function(env, renderMarkdown) {

  env.addExtension('markdown', new Markdown(env, renderMarkdown));
};
