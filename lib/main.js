(function() {

exports = module.exports = Markdown;

exports.register = function(env) {
  env.addExtension('markdown', new Markdown());
};




var marked = require('marked');

var renderer = new marked.Renderer();

var defaultOptions = {
  renderer: renderer,
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
    var args = null, tok = parser.nextToken();
   
    if(parser.peekToken().type == lexer.TOKEN_LEFT_PAREN) {
      args = parser.parseSignature(null);
    }
    parser.advanceAfterBlockEnd(tok.value);

    var body = parser.parseUntilBlocks('endmarkdown');
    console.log(body);

    parser.advanceAfterBlockEnd();

    return new nodes.CallExtension(this, 'run', args, [body]);
  };

  this.run = function(context, args, body) {
    console.log('made it!');
    //marked.setOptions( args || defaultOptions );
    console.log(body);
    //console.log( marked(body()) );
    console.log('here too!');
    //return marked( body() );
  }
}

}).call(this);
