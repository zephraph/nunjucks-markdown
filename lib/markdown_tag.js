module.exports = Markdown;

var nunjucks = require('nunjucks');

function Markdown(marked, env) {
  this.tags = ['markdown'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    if(args.children.length > 0)
      return new nodes.CallExtension(this, 'fileTag', args);

    var body = parser.parseUntilBlocks('endmarkdown');
    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'blockTag', args, [body]);
  };

  this.fileTag = function(context, file) {
    return new nunjucks.runtime.SafeString(marked(env.render(file, context)));
  }

  this.blockTag = function(context, body) {
    return new nunjucks.runtime.SafeString(marked(body()));
  }
}
