"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _utils = require("./utils");
// 询问用户
var promptList = [{
  type: "input",
  name: "content",
  message: "请输入项目上下文: "
}, {
  type: "list",
  message: "Please choice the project type:",
  name: "projectType",
  "default": 0,
  choices: [{
    name: "一般表格表单页面",
    value: 0
  }, {
    name: "可视化大屏",
    value: 1
  }]
}];
module.exports = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(projectName) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          console.log("create", projectName);
          if (projectName) {
            _context2.next = 4;
            break;
          }
          console.log("Please input the Project name");
          return _context2.abrupt("return");
        case 4:
          _context2.next = 6;
          return (0, _utils.judgeExistFold)(projectName);
        case 6:
          (0, _utils.downloadTemp)( /*#__PURE__*/function () {
            var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, dir) {
              var answer;
              return _regenerator["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return (0, _utils.inquirerPrompt)(promptList);
                  case 2:
                    answer = _context.sent;
                    console.log("answer", answer);
                    // 渲染模板

                    // renderTemplate(data);
                    (0, _utils.updatePackageJson)("".concat(dir, "/package.json"), answer);
                  case 5:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2, _x3) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 7:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();