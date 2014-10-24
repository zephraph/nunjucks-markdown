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

			parser.advanceAfterBlockEnd();
			var str = '';
			var begun = parser.peekToken();

			while(1) {
				// Passing true gives us all the whitespace tokens as
				// well, which are usually ignored.
				var tok = parser.nextToken(true);

				if(!tok) {
					parser.fail("expected endmarkdown, got end of file");
				}

				if(tok.type == lexer.TOKEN_BLOCK_START) {
					// We need to look for the `endmarkdown` block statement,
					// which involves a lookahead so carefully keep track
					// of whitespace
					var ws = null;
					var name = parser.nextToken(true);

					if(name.type == lexer.TOKEN_WHITESPACE) {
						ws = name;
						name = parser.nextToken();
					}

					if(name.type == lexer.TOKEN_SYMBOL &&
						name.value == 'endmarkdown') {
						parser.advanceAfterBlockEnd(name.value);
						break;
					}
					else {
						str += tok.value;
						if(ws) {
							str += ws.value;
						}
						str += name.value;
					}
				}
				else if(tok.type === lexer.TOKEN_STRING) {
					str += '"' + tok.value + '"';
				}
				else {
					str += tok.value;
				}
			}

			var renderedStr = marked(str),
				templateData = new nodes.TemplateData(begun.lineno, begun.colno, renderedStr);

			return new nodes.Output(begun.lineno, begun.colno, [templateData]);
		}
	}

}).call(this);