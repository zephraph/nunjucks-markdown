(function() {

  var marked = require('marked');

  // Handle Exports
  exports = module.exports = Markdown;
  exports.register = function(env) {
    env.addExtension('markdown', new Markdown());
  };


  // Default marked configuration
  var defaultOptions = {
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  };


  function Markdown() {

    this.tags = ['markdown'];

    this.parse = function(parser, nodes, lexer) {
      // Get markdown token
      var tok = parser.nextToken();
     
      // Handle args if any present
      var args = null;
      if(parser.peekToken().type == lexer.TOKEN_LEFT_PAREN) {
        args = parser.parseSignature(null);
      }
      parser.advanceAfterBlockEnd(tok.value);

      // parse content
      var body = parser.parseUntilBlocks('endmarkdown');
      parser.advanceAfterBlockEnd();

      return new nodes.CallExtension(this, 'run', args, [body]);
    };

    this.run = function(context, args, body) {
      marked.setOptions( args || defaultOptions );
      //return marked( body() );
    };
  }

}).call(this);
