var context = {};

if(window) {
  context.window = null;
  for(var key in window) {
    context[key] = null;
  }
}
// 选择允许的方法
context['Math'] = Math;

function Sandbox(opt) {
  if (!opt) {
    opt = {};
  }
  this.context = Object.assign({}, context, opt.context);
}

// script: js代码 context: 相关上下文，是一个对象
Sandbox.prototype.run = function(script, context) {
  script = script.trim(); // 去除收尾空格
  if (
    script.indexOf('return') === -1 &&
    script.indexOf('\n') === -1 &&
    (script.indexOf(';') === -1 || script.indexOf(';') === script.length - 1)
  ) {
    // 该脚本为单行脚本
    script = 'return ' + script;
  }
  script = 'with (sandbox) { ' + script + ' }';
  var func = new Function('sandbox', script);
  return func(Object.assign({}, this.context, context));
}

module.exports = Sandbox;
// if (window) {
//   window.Sandbox = Sandbox;
// }
