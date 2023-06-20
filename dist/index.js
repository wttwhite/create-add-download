"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));
var _commander = _interopRequireDefault(require("commander"));
var _create = _interopRequireDefault(require("./create"));
var _add = _interopRequireDefault(require("./add"));
// 增加创建和新增一个页面的命令
var actionMap = {
  create: {
    description: "创建一个新的项目",
    // usages: ["hs create ProjectName"],
    alias: "c"
  },
  add: {
    description: "工程目录下添加一个新页面",
    // usages: ["hs add a new view"],
    alias: "a"
  }
};
Object.keys(actionMap).forEach(function (key) {
  var _actionMap$key = actionMap[key],
    description = _actionMap$key.description,
    alias = _actionMap$key.alias;
  // if (options) {
  //   Object.keys(options).forEach((optKey) => {
  //     const obj = options[optKey];
  //     commander.option(obj.flags, obj.description, obj.defaultValue);
  //   });
  // }
  _commander["default"].command(key).description(description).alias(alias).action(function () {
    switch (key) {
      case "create":
        _create["default"].apply(void 0, (0, _toConsumableArray2["default"])(process.argv.slice(3)));
        break;
      case "add":
        _add["default"].apply(void 0, (0, _toConsumableArray2["default"])(process.argv.slice(3)));
        break;
      default:
        break;
    }
  });
});
_commander["default"].version(require("../package.json").version, "-v -V --version");
// parse(process.argv)接收参数，一定要放后面,所有指令注册结束后再执行 program.parse()
_commander["default"].parse(process.argv);
// 当命令后面没有跟action的时候，给出提示
if (!process.argv.slice(2).length) {
  _commander["default"].outputHelp();
}