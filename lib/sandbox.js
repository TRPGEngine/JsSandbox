var context = {};

if(window) {
  context.window = null;
  for(var key in window) {
    context[key] = null;
  }
}
// 选择允许的方法
context['Math'] = Math;

function Sandbox() {
  this.context = context;
}
Sandbox.prototype.run = function(script) {
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
  return func(this.context);
}

module.export = Sandbox;
// if (window) {
//   window.Sandbox = Sandbox;
// }
