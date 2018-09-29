/* eslint-disable */
/**
 * Marked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/Marked
 */
function Lexer(a){this.tokens=[],this.tokens.links={},this.options=a||Marked.defaults,this.rules=block.normal,this.options.gfm&&(this.options.tables?this.rules=block.tables:this.rules=block.gfm)}function InlineLexer(a,b){if(this.options=b||Marked.defaults,this.links=a,this.rules=inline.normal,this.renderer=this.options.renderer||new Renderer,this.renderer.options=this.options,!this.links)throw new Error("Tokens array requires a `links` property.");this.options.gfm?this.options.breaks?this.rules=inline.breaks:this.rules=inline.gfm:this.options.pedantic&&(this.rules=inline.pedantic)}function Renderer(a){this.options=a||{}}function Parser(a){this.tokens=[],this.token=null,this.options=a||Marked.defaults,this.options.renderer=this.options.renderer||new Renderer,this.renderer=this.options.renderer,this.renderer.options=this.options}function escape(a,b){return a.replace(b?/&/g:/&(?!#?\w+;)/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(a){return a.replace(/&([#\w]+);/g,function(a,b){return b=b.toLowerCase(),"colon"===b?":":"#"===b.charAt(0)?"x"===b.charAt(1)?String.fromCharCode(parseInt(b.substring(2),16)):String.fromCharCode(+b.substring(1)):""})}function replace(a,b){return a=a.source,b=b||"",function c(d,e){return d?(e=e.source||e,e=e.replace(/(^|[^\[])\^/g,"$1"),a=a.replace(d,e),c):new RegExp(a,b)}}function noop(){}function merge(a){for(var c,d,b=1;b<arguments.length;b++){c=arguments[b];for(d in c)Object.prototype.hasOwnProperty.call(c,d)&&(a[d]=c[d])}return a}var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/,block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,block.item=replace(block.item,"gm")(/bull/g,block.bullet)(),block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")(),block.blockquote=replace(block.blockquote)("def",block.def)(),block._tag="(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b",block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)(),block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)(),block.normal=merge({},block),block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/}),block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")(),block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/}),Lexer.rules=block,Lexer.lex=function(a,b){var c=new Lexer(b);return c.lex(a)},Lexer.prototype.lex=function(a){return a=a.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n"),this.token(a,!0)},Lexer.prototype.token=function(a,b,c){for(var d,e,f,g,h,i,j,k,l,a=a.replace(/^ +$/gm,"");a;)if((f=this.rules.newline.exec(a))&&(a=a.substring(f[0].length),f[0].length>1&&this.tokens.push({type:"space"})),f=this.rules.code.exec(a))a=a.substring(f[0].length),f=f[0].replace(/^ {4}/gm,""),this.tokens.push({type:"code",text:this.options.pedantic?f:f.replace(/\n+$/,"")});else if(f=this.rules.fences.exec(a))a=a.substring(f[0].length),this.tokens.push({type:"code",lang:f[2],text:f[3]});else if(f=this.rules.heading.exec(a))a=a.substring(f[0].length),this.tokens.push({type:"heading",depth:f[1].length,text:f[2]});else if(b&&(f=this.rules.nptable.exec(a))){for(a=a.substring(f[0].length),i={type:"table",header:f[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:f[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:f[3].replace(/\n$/,"").split("\n")},k=0;k<i.align.length;k++)/^ *-+: *$/.test(i.align[k])?i.align[k]="right":/^ *:-+: *$/.test(i.align[k])?i.align[k]="center":/^ *:-+ *$/.test(i.align[k])?i.align[k]="left":i.align[k]=null;for(k=0;k<i.cells.length;k++)i.cells[k]=i.cells[k].split(/ *\| */);this.tokens.push(i)}else if(f=this.rules.lheading.exec(a))a=a.substring(f[0].length),this.tokens.push({type:"heading",depth:"="===f[2]?1:2,text:f[1]});else if(f=this.rules.hr.exec(a))a=a.substring(f[0].length),this.tokens.push({type:"hr"});else if(f=this.rules.blockquote.exec(a))a=a.substring(f[0].length),this.tokens.push({type:"blockquote_start"}),f=f[0].replace(/^ *> ?/gm,""),this.token(f,b,!0),this.tokens.push({type:"blockquote_end"});else if(f=this.rules.list.exec(a)){for(a=a.substring(f[0].length),g=f[2],this.tokens.push({type:"list_start",ordered:g.length>1}),f=f[0].match(this.rules.item),d=!1,l=f.length,k=0;k<l;k++)i=f[k],j=i.length,i=i.replace(/^ *([*+-]|\d+\.) +/,""),~i.indexOf("\n ")&&(j-=i.length,i=this.options.pedantic?i.replace(/^ {1,4}/gm,""):i.replace(new RegExp("^ {1,"+j+"}","gm"),"")),this.options.smartLists&&k!==l-1&&(h=block.bullet.exec(f[k+1])[0],g===h||g.length>1&&h.length>1||(a=f.slice(k+1).join("\n")+a,k=l-1)),e=d||/\n\n(?!\s*$)/.test(i),k!==l-1&&(d="\n"===i.charAt(i.length-1),e||(e=d)),this.tokens.push({type:e?"loose_item_start":"list_item_start"}),this.token(i,!1,c),this.tokens.push({type:"list_item_end"});this.tokens.push({type:"list_end"})}else if(f=this.rules.html.exec(a))a=a.substring(f[0].length),this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&("pre"===f[1]||"script"===f[1]||"style"===f[1]),text:f[0]});else if(!c&&b&&(f=this.rules.def.exec(a)))a=a.substring(f[0].length),this.tokens.links[f[1].toLowerCase()]={href:f[2],title:f[3]};else if(b&&(f=this.rules.table.exec(a))){for(a=a.substring(f[0].length),i={type:"table",header:f[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:f[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:f[3].replace(/(?: *\| *)?\n$/,"").split("\n")},k=0;k<i.align.length;k++)/^ *-+: *$/.test(i.align[k])?i.align[k]="right":/^ *:-+: *$/.test(i.align[k])?i.align[k]="center":/^ *:-+ *$/.test(i.align[k])?i.align[k]="left":i.align[k]=null;for(k=0;k<i.cells.length;k++)i.cells[k]=i.cells[k].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */);this.tokens.push(i)}else if(b&&(f=this.rules.paragraph.exec(a)))a=a.substring(f[0].length),this.tokens.push({type:"paragraph",text:"\n"===f[1].charAt(f[1].length-1)?f[1].slice(0,-1):f[1]});else if(f=this.rules.text.exec(a))a=a.substring(f[0].length),this.tokens.push({type:"text",text:f[0]});else if(a)throw new Error("Infinite loop on byte: "+a.charCodeAt(0));return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)(),inline.reflink=replace(inline.reflink)("inside",inline._inside)(),inline.normal=merge({},inline),inline.pedantic=merge({},inline.normal,{strong:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/}),inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()}),inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()}),InlineLexer.rules=inline,InlineLexer.output=function(a,b,c){var d=new InlineLexer(b,c);return d.output(a)},InlineLexer.prototype.output=function(a){for(var c,d,e,f,b="";a;)if(f=this.rules.escape.exec(a))a=a.substring(f[0].length),b+=f[1];else if(f=this.rules.autolink.exec(a))a=a.substring(f[0].length),"@"===f[2]?(d=":"===f[1].charAt(6)?this.mangle(f[1].substring(7)):this.mangle(f[1]),e=this.mangle("mailto:")+d):(d=escape(f[1]),e=d),b+=this.renderer.link(e,null,d);else if(this.inLink||!(f=this.rules.url.exec(a))){if(f=this.rules.tag.exec(a))!this.inLink&&/^<a /i.test(f[0])?this.inLink=!0:this.inLink&&/^<\/a>/i.test(f[0])&&(this.inLink=!1),a=a.substring(f[0].length),b+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(f[0]):escape(f[0]):f[0];else if(f=this.rules.link.exec(a))a=a.substring(f[0].length),this.inLink=!0,b+=this.outputLink(f,{href:f[2],title:f[3]}),this.inLink=!1;else if((f=this.rules.reflink.exec(a))||(f=this.rules.nolink.exec(a))){if(a=a.substring(f[0].length),c=(f[2]||f[1]).replace(/\s+/g," "),c=this.links[c.toLowerCase()],!c||!c.href){b+=f[0].charAt(0),a=f[0].substring(1)+a;continue}this.inLink=!0,b+=this.outputLink(f,c),this.inLink=!1}else if(f=this.rules.strong.exec(a))a=a.substring(f[0].length),b+=this.renderer.strong(this.output(f[2]||f[1]));else if(f=this.rules.em.exec(a))a=a.substring(f[0].length),b+=this.renderer.em(this.output(f[2]||f[1]));else if(f=this.rules.code.exec(a))a=a.substring(f[0].length),b+=this.renderer.codespan(escape(f[2],!0));else if(f=this.rules.br.exec(a))a=a.substring(f[0].length),b+=this.renderer.br();else if(f=this.rules.del.exec(a))a=a.substring(f[0].length),b+=this.renderer.del(this.output(f[1]));else if(f=this.rules.text.exec(a))a=a.substring(f[0].length),b+=this.renderer.text(escape(this.smartypants(f[0])));else if(a)throw new Error("Infinite loop on byte: "+a.charCodeAt(0))}else a=a.substring(f[0].length),d=escape(f[1]),e=d,b+=this.renderer.link(e,null,d);return b},InlineLexer.prototype.outputLink=function(a,b){var c=escape(b.href),d=b.title?escape(b.title):null;return"!"!==a[0].charAt(0)?this.renderer.link(c,d,this.output(a[1])):this.renderer.image(c,d,escape(a[1]))},InlineLexer.prototype.smartypants=function(a){return this.options.smartypants?a.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…"):a},InlineLexer.prototype.mangle=function(a){if(!this.options.mangle)return a;for(var e,b="",c=a.length,d=0;d<c;d++)e=a.charCodeAt(d),Math.random()>.5&&(e="x"+e.toString(16)),b+="&#"+e+";";return b},Renderer.prototype.code=function(a,b,c){if(this.options.highlight){var d=this.options.highlight(a,b);null!=d&&d!==a&&(c=!0,a=d)}return b?'<pre><code class="'+this.options.langPrefix+escape(b,!0)+'">'+(c?a:escape(a,!0))+"\n</code></pre>\n":"<pre><code>"+(c?a:escape(a,!0))+"\n</code></pre>"},Renderer.prototype.blockquote=function(a){return"<blockquote>\n"+a+"</blockquote>\n"},Renderer.prototype.html=function(a){return a},Renderer.prototype.heading=function(a,b,c){return"<h"+b+' id="'+this.options.headerPrefix+c.toLowerCase().replace(/[^\w]+/g,"-")+'">'+a+"</h"+b+">\n"},Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},Renderer.prototype.list=function(a,b){var c=b?"ol":"ul";return"<"+c+">\n"+a+"</"+c+">\n"},Renderer.prototype.listitem=function(a){return"<li>"+a+"</li>\n"},Renderer.prototype.paragraph=function(a){return"<p>"+a+"</p>\n"},Renderer.prototype.table=function(a,b){return"<table>\n<thead>\n"+a+"</thead>\n<tbody>\n"+b+"</tbody>\n</table>\n"},Renderer.prototype.tablerow=function(a){return"<tr>\n"+a+"</tr>\n"},Renderer.prototype.tablecell=function(a,b){var c=b.header?"th":"td",d=b.align?"<"+c+' style="text-align:'+b.align+'">':"<"+c+">";return d+a+"</"+c+">\n"},Renderer.prototype.strong=function(a){return"<strong>"+a+"</strong>"},Renderer.prototype.em=function(a){return"<em>"+a+"</em>"},Renderer.prototype.codespan=function(a){return"<code>"+a+"</code>"},Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"},Renderer.prototype.del=function(a){return"<del>"+a+"</del>"},Renderer.prototype.link=function(a,b,c){if(this.options.sanitize){try{var d=decodeURIComponent(unescape(a)).replace(/[^\w:]/g,"").toLowerCase()}catch(a){return""}if(0===d.indexOf("javascript:")||0===d.indexOf("vbscript:"))return""}var e='<a href="'+a+'"';return b&&(e+=' title="'+b+'"'),e+=">"+c+"</a>"},Renderer.prototype.image=function(a,b,c){var d='<img src="'+a+'" alt="'+c+'"';return b&&(d+=' title="'+b+'"'),d+=this.options.xhtml?"/>":">"},Renderer.prototype.text=function(a){return a},Parser.parse=function(a,b,c){var d=new Parser(b,c);return d.parse(a)},Parser.prototype.parse=function(a){this.inline=new InlineLexer(a.links,this.options,this.renderer),this.tokens=a.reverse();for(var b="";this.next();)b+=this.tok();return b},Parser.prototype.next=function(){return this.token=this.tokens.pop()},Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0},Parser.prototype.parseText=function(){for(var a=this.token.text;"text"===this.peek().type;)a+="\n"+this.next().text;return this.inline.output(a)},Parser.prototype.tok=function(){switch(this.token.type){case"space":return"";case"hr":return this.renderer.hr();case"heading":return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text);case"code":return this.renderer.code(this.token.text,this.token.lang,this.token.escaped);case"table":var c,d,e,f,g,a="",b="";for(e="",c=0;c<this.token.header.length;c++)f={header:!0,align:this.token.align[c]},e+=this.renderer.tablecell(this.inline.output(this.token.header[c]),{header:!0,align:this.token.align[c]});for(a+=this.renderer.tablerow(e),c=0;c<this.token.cells.length;c++){for(d=this.token.cells[c],e="",g=0;g<d.length;g++)e+=this.renderer.tablecell(this.inline.output(d[g]),{header:!1,align:this.token.align[g]});b+=this.renderer.tablerow(e)}return this.renderer.table(a,b);case"blockquote_start":for(var b="";"blockquote_end"!==this.next().type;)b+=this.tok();return this.renderer.blockquote(b);case"list_start":for(var b="",h=this.token.ordered;"list_end"!==this.next().type;)b+=this.tok();return this.renderer.list(b,h);case"list_item_start":for(var b="";"list_item_end"!==this.next().type;)b+="text"===this.token.type?this.parseText():this.tok();return this.renderer.listitem(b);case"loose_item_start":for(var b="";"list_item_end"!==this.next().type;)b+=this.tok();return this.renderer.listitem(b);case"html":var i=this.token.pre||this.options.pedantic?this.token.text:this.inline.output(this.token.text);return this.renderer.html(i);case"paragraph":return this.renderer.paragraph(this.inline.output(this.token.text));case"text":return this.renderer.paragraph(this.parseText())}},noop.exec=noop,Marked=function(a,b,c){if(c||"function"==typeof b){c||(c=b,b=null),b=merge({},Marked.defaults,b||{});var e,f,d=b.highlight,g=0;try{e=Lexer.lex(a,b)}catch(a){return c(a)}f=e.length;var h=function(a){if(a)return b.highlight=d,c(a);var f;try{f=Parser.parse(e,b)}catch(b){a=b}return b.highlight=d,a?c(a):c(null,f)};if(!d||d.length<3)return h();if(delete b.highlight,!f)return h();for(;g<e.length;g++)!function(a){return"code"!==a.type?--f||h():d(a.text,a.lang,function(b,c){return b?h(b):null==c||c===a.text?--f||h():(a.text=c,a.escaped=!0,void(--f||h()))})}(e[g])}else try{return b&&(b=merge({},Marked.defaults,b)),Parser.parse(Lexer.lex(a,b),b)}catch(a){if(a.message+="\nPlease report this to https://github.com/chjj/marked.",(b||Marked.defaults).silent)return"<p>An error occured:</p><pre>"+escape(a.message+"",!0)+"</pre>";throw a}},Marked.options=Marked.setOptions=function(a){return merge(Marked.defaults,a),Marked},Marked.defaults={gfm:!0,tables:!0,breaks:!1,pedantic:!1,sanitize:!1,sanitizer:null,mangle:!0,smartLists:!1,silent:!1,highlight:null,langPrefix:"lang-",smartypants:!1,headerPrefix:"",renderer:new Renderer,xhtml:!1},Marked.Parser=Parser,Marked.parser=Parser.parse,Marked.Renderer=Renderer,Marked.Lexer=Lexer,Marked.lexer=Lexer.lex,Marked.InlineLexer=InlineLexer,Marked.inlineLexer=InlineLexer.output,Marked.parse=Marked;
