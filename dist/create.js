"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _utils = require("./utils");
var _path = _interopRequireDefault(require("path"));
// 询问用户
var promptList = [{
  type: "input",
  name: "context",
  message: "请输入项目上下文: ",
  "default": "context-seat"
},
// {
//   type: "list",
//   message: "Please choice the project type:",
//   name: "projectType",
//   default: 0,
//   choices: [
//     {
//       name: "一般表格表单页面",
//       value: 0,
//     },
//     {
//       name: "可视化大屏",
//       value: 1,
//     },
//   ],
// },
{
  type: "checkbox",
  message: "请选择需要增加的依赖:",
  name: "dependencies",
  choices: ["dayjs", "vuex", "hsja-utils"],
  "default": ["dayjs", "vuex", "hsja-utils"]
}];
module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(projectName) {
    var answer;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (projectName) {
            _context2.next = 3;
            break;
          }
          console.log("Please input the Project name");
          return _context2.abrupt("return");
        case 3:
          _context2.next = 5;
          return (0, _utils.judgeExistFold)(projectName);
        case 5:
          _context2.next = 7;
          return (0, _utils.inquirerPrompt)(promptList);
        case 7:
          answer = _context2.sent;
          // console.log("answer", answer);
          (0, _utils.downloadTemp)(projectName, /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, dir) {
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    Promise.all([
                    // 根据选择，增加依赖包
                    (0, _utils.updatePackageJson)(_path["default"].join(dir, "package.json"), answer),
                    // 将项目中的上下文改为输入的值
                    (0, _utils.updateContext)(_path["default"].join(dir, "src", "apis", "http.js"), answer), (0, _utils.updateContext)(_path["default"].join(dir, ".env"), answer), (0, _utils.updateContext)(_path["default"].join(dir, "vue.config.js"), answer), (0, _utils.updateByVueStore)(_path["default"].join(dir, "src"), answer)]).then(function () {
                      (0, _utils.successAll)(projectName);
                    });
                  case 1:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 9:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();