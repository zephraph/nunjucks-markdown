module.exports = Markdown;

var nunjucks = require('nunjucks');

function Markdown(env, renderMarkdown) {
  this.tags = ['markdown'];

  this.parse = function(parser, nodes, lexer) {
    var tok = parser.nextToken();

    // Parse the markdown tag and collect any arguments
    var args = parser.parseSignature(null, true);
    parser.advanceAfterBlockEnd(tok.value);

    // If arguments, return the fileTag constructed node
    if(args.children.length > 0)
      return new nodes.CallExtension(this, 'fileTag', args);

    // Otherwise parse until the close block and move the parser to the next position
    var body = parser.parseUntilBlocks('endmarkdown');
    parser.advanceAfterBlockEnd();

    // Return the constructed blockTag node
    return new nodes.CallExtension(this, 'blockTag', args, [body]);
  };

  // Markdown rendering for the file tag. Use the nunjucks.render function to render
  // the actual contents of the file. Pass the results through the markdown renderer.
  this.fileTag = function(context, file) {
    return new nunjucks.runtime.SafeString(renderMarkdown(env.render(file, context)));
  }

  // Markdown rendering for the block. Pretty simple, just get the body text and pass
  // it through the markdown renderer. 
  this.blockTag = function(context, body) {
    return new nunjucks.runtime.SafeString(renderMarkdown(body()));
  }
}
