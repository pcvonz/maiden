import 'brace/mode/lisp';

export class FennelHighlightRules extends window.ace.acequire(
  "ace/mode/text_highlight_rules"
).TextHighlightRules {
  constructor() {
    super();
    let stringEscape = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
     this.$rules = {
       start: [
          {

            token : "string",           // " string
            regex : /\s"/,
            next : "qqstring"
        }, 
         {
           token: "comment.line.double-dash.fennel",
           regex: /;.*$/
         }, {
           token: "constant.language.fennel",
           regex: /\b(?:true|false|nil|blah)\b/
         }, {
           token: ["text", "entity.name.tag.fennel", "text"],
           regex: /(\s)([^\s\(\)\[\]\{\}]+)([\s\(\)\[\]\{\}])/
         }, {
           token: [
             "variable.other.fennel"
           ],
           regex: /(local|global|var|tset|set-forcibly!|set)\s/
         }, {
           token: [
             "entity.name.function.fennel",
           ],
           regex: /(?:\\b(?:(defun|fn))\\b)(\\s+)((?:\\w|\\-|\\!|\\?)*)/
         }, {
           token: ["keyword.control.fennel"],
           regex: /\((comment|hashfn|let|each|for|while|do|match|if|when|lambda|λ|or|and|not|require-macros|require|include|list|sym|list\?|sym\?|table\?|sequence\?|gensym|varg\?|multi-sym\?|get-scope|in-scope\?|eval-compiler|macros|macro|doto|values|partial|length|lua)([\s\(\)\[\]\{\}])/
         }, {
           token: ["support.function.fennel"],
           regex: /(assert|collectgarbage|dofile|error|getfenv|getmetatable|ipairs|loadstring|loadfile|load|module|next|pairs|pcall|print|rawequal|rawget|rawset|select|setfenv|setmetatable|tonumber|tostring|type|unpack|xpcall|coroutine\.create|coroutine\.resume|coroutine\.running|coroutine\.status|coroutine\.wrap|coroutine\.yield|debug\.debug|debug\.getfenv|debug\.gethook|debug\.getinfo|debug\.getlocal|debug\.getmetatable|debug\.getregistry|debug\.getupvalue|debug\.setfenv|debug\.sethook|debug\.setlocal|debug\.setmetatable|debug\.setupvalue|debug\.traceback|io\.close|io\.flush|io\.input|io\.lines|io\.open|io\.output|io\.popen|io\.read|io\.stderr|io\.stdin|io\.tmpfile|io\.type|io\.write|math\.abs|math\.acos|math\.asin|math\.atan|math\.atan2|math\.ceil|math\.cosh|math\.cos|math\.deg|math\.exp|math\.floor|math\.fmod|math\.frexp|math\.huge|math\.ldexp|math\.log|math\.log10|math\.max|math\.min|math\.modf|math\.pi|math\.pow|math\.rad|math\.randomseed|math\.random|math\.sinh|math\.sin|math\.sqrt|math\.tanh|math\.tan|os\.clock|os\.date|os\.difftime|os\.execute|os\.exit|os\.getenv|os\.remove|os\.rename|os\.setlocale|os\.time|os\.tmpname|package\.cpath|package\.loaded|package\.loaders|package\.loadlib|package\.path|package\.preload|package\.seeall|string\.byte|string\.char|string\.dump|string\.find|string\.format|string\.gmatch|string\.gsub|string\.len|string\.lower|string\.match|string\.rep|string\.reverse|string\.sub|string\.upper|table\.concat|table\.insert|table\.move|table\.maxn|table\.pack|table\.remove|table\.sort|table\.unpack|utf8\.charpattern|utf8\.char|utf8\.codepoint|utf8\.codes|utf8\.len|utf8\.offset)\s/
         }, {
           token: "support.function.fennel",
           regex: /:(?:close|flush|lines|read|seek|setvbuf|write)/
         }, {
           token: "keyword.other.fennel",
           regex: /\,|->>|->|-\?>>|-\?>|`|#/
         }],
          "qqstring": [{
            token: "constant.language.escape",
            regex: stringEscape

        }, {
            token: "string",
            regex: "\\\\$",
            next: "qqstring"

        }, {
            token: "string",
            regex: '"|$',
            next: "start"
        }, {
            defaultToken: "string"
        }]
    }
    
    this.normalizeRules();
  }
}

FennelHighlightRules.metaData = {
    name: "Fennel",
    fileTypes: ["fnl"],
    scopeName: "source.fennel"
}

export default class FennelMode extends window.ace.acequire("ace/mode/lisp")
  .Mode {
  constructor() {
    super();
    this.HighlightRules = FennelHighlightRules;
  }
  onRender(editor) {
    if (!editor) return;
    // ensure our contributions are registered.
    const session = editor.getSession();
    if (session.getMode() !== this) {
      session.setMode(this);
    }
  }
}
