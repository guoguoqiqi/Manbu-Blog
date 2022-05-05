// highlight.js  代码高亮指令
// import Hljs from 'highlight.js';
// 代码高亮风格，选择更多风格需导入 node_modules/hightlight.js/styles/ 目录下其它css文件
import "highlight.js/styles/github.css";
import Vue from "vue";

// 按需引入
const hljs = require("highlight.js/lib/core");
hljs.registerLanguage("css", require("highlight.js/lib/languages/css"));
hljs.registerLanguage(
  "markdown",
  require("highlight.js/lib/languages/markdown")
);
hljs.registerLanguage("dos", require("highlight.js/lib/languages/dos"));
hljs.registerLanguage("go", require("highlight.js/lib/languages/go"));
hljs.registerLanguage(
  "htmlbars",
  require("highlight.js/lib/languages/htmlbars")
);
hljs.registerLanguage("http", require("highlight.js/lib/languages/http"));
hljs.registerLanguage("java", require("highlight.js/lib/languages/java"));
hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript")
);
hljs.registerLanguage("json", require("highlight.js/lib/languages/json"));
hljs.registerLanguage("lua", require("highlight.js/lib/languages/lua"));
hljs.registerLanguage("nginx", require("highlight.js/lib/languages/nginx"));
hljs.registerLanguage("php", require("highlight.js/lib/languages/php"));
hljs.registerLanguage("python", require("highlight.js/lib/languages/python"));
hljs.registerLanguage(
  "python-repl",
  require("highlight.js/lib/languages/python-repl")
);
hljs.registerLanguage("scss", require("highlight.js/lib/languages/scss"));
hljs.registerLanguage("shell", require("highlight.js/lib/languages/shell"));
hljs.registerLanguage("sql", require("highlight.js/lib/languages/sql"));
hljs.registerLanguage("less", require("highlight.js/lib/languages/less"));
hljs.registerLanguage(
  "typescript",
  require("highlight.js/lib/languages/typescript")
);

Vue.directive("highlight", {
  // 被绑定元素插入父节点时调用
  inserted: function (el) {
    let blocks = el.querySelectorAll("pre code");
    for (let i = 0; i < blocks.length; i++) {
      console.log(blocks);
      hljs.highlightBlock(blocks[i]);
    }
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: function (el) {
    let blocks = el.querySelectorAll("pre code");
    for (let i = 0; i < blocks.length; i++) {
      hljs.highlightBlock(blocks[i]);
    }
  },
});
