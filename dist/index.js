"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _commander = _interopRequireDefault(require("commander"));
var _path = _interopRequireDefault(require("path"));
// 增加创建和新增一个页面的命令
var actionMap = {
  create: {
    description: "创建一个新的项目:hs-cli create ProjectName",
    alias: "c"
  },
  add: {
    description: "工程目录下添加一个新页面:hs-cli add view 或者 hs-cli add com",
    // usages: ["hs add a new view"],
    alias: "a"
  },
  // 其他命令
  "*": {
    description: "commander not found",
    alias: ""
  }
};
Object.keys(actionMap).forEach(function (key) {
  var _actionMap$key = actionMap[key],
    description = _actionMap$key.description,
    alias = _actionMap$key.alias;
  _commander["default"].command(key).description(description).alias(alias).action(function () {
    if (key === "*") {
      console.log(description);
    } else {
      require(_path["default"].resolve(__dirname, key)).apply(void 0, (0, _toConsumableArray2["default"])(process.argv.slice(3)));
    }
  });
});
_commander["default"].version(require("../package.json").version, "-v -V --version");
// parse(process.argv)接收参数，一定要放后面,所有指令注册结束后再执行 .parse()
_commander["default"].parse(process.argv);
// 当命令后面没有跟action的时候，给出提示
if (!process.argv.slice(2).length) {
  _commander["default"].outputHelp();
}