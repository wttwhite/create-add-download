"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _utils = require("./utils");
var _path = _interopRequireDefault(require("path"));
var _shelljs = _interopRequireDefault(require("shelljs"));
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// 询问用户
var propTypeList = [{
  type: "list",
  message: "请选择新增页面还是组件:",
  name: "addType",
  "default": "views",
  choices: [{
    name: "页面",
    value: "views"
  }, {
    name: "组件",
    value: "components"
  }]
}];
var promptObj = {
  views: [{
    type: "checkbox",
    message: "请选择需要增加的页面:",
    name: "addPages",
    choices: ["common-table", "common-table-demo1"]
  }, {
    type: "input",
    message: "请输入需要增加的页面:",
    name: "addInput",
    when: function when(answer) {
      return answer.addPages.length === 0;
    }
  }],
  components: [{
    type: "checkbox",
    message: "请选择需要增加的组件:",
    name: "addPages",
    choices: ["hs-pagination"]
  }, {
    type: "input",
    message: "请输入需要增加的组件:",
    name: "addInput",
    when: function when(answer) {
      return answer.addPages.length === 0;
    }
  }]
};
module.exports = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var _yield$inquirerPrompt, addType, _yield$inquirerPrompt2, addPages, addInput;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return (0, _utils.inquirerPrompt)(propTypeList);
      case 2:
        _yield$inquirerPrompt = _context2.sent;
        addType = _yield$inquirerPrompt.addType;
        _context2.next = 6;
        return (0, _utils.inquirerPrompt)(promptObj[addType]);
      case 6:
        _yield$inquirerPrompt2 = _context2.sent;
        addPages = _yield$inquirerPrompt2.addPages;
        addInput = _yield$inquirerPrompt2.addInput;
        if (!(!addPages || addPages.length === 0)) {
          _context2.next = 16;
          break;
        }
        if (!addInput) {
          _context2.next = 14;
          break;
        }
        addPages = [addInput];
        _context2.next = 16;
        break;
      case 14:
        console.log("未输入需要增加的页面/组件文件名");
        return _context2.abrupt("return");
      case 16:
        (0, _utils.downloadTemp)(".hs-ui-template", /*#__PURE__*/function () {
          var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(data, dir) {
            var _iterator, _step, page, pagePath, targetPath;
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  // console.log("process.cwd()", process.cwd()); // 当前项目 xxxx/create-add-download
                  // console.log("__dirname", __dirname); //  xxxx/create-add-download/dist
                  // 下载完成之后，移动文件位置
                  _iterator = _createForOfIteratorHelper(addPages);
                  _context.prev = 1;
                  _iterator.s();
                case 3:
                  if ((_step = _iterator.n()).done) {
                    _context.next = 19;
                    break;
                  }
                  page = _step.value;
                  pagePath = _path["default"].join(dir, "src", addType, page);
                  targetPath = _path["default"].join(process.cwd(), "src", addType, page); // try catch可以保证循环一个出错，不影响其他循环项执行
                  _context.prev = 7;
                  _context.next = 10;
                  return (0, _utils.judgeNotExistFold)(pagePath, "\u6E90\u6587\u4EF6".concat(addType, "\u4E2D\u4E0D\u5B58\u5728").concat(page));
                case 10:
                  _context.next = 12;
                  return (0, _utils.judgeExistFold)(targetPath, "".concat(addType, "\u6587\u4EF6\u4E2D\u5DF2\u5B58\u5728").concat(page));
                case 12:
                  // 移动文件
                  _shelljs["default"].mv(pagePath, targetPath);
                  _context.next = 17;
                  break;
                case 15:
                  _context.prev = 15;
                  _context.t0 = _context["catch"](7);
                case 17:
                  _context.next = 3;
                  break;
                case 19:
                  _context.next = 24;
                  break;
                case 21:
                  _context.prev = 21;
                  _context.t1 = _context["catch"](1);
                  _iterator.e(_context.t1);
                case 24:
                  _context.prev = 24;
                  _iterator.f();
                  return _context.finish(24);
                case 27:
                  // 删除临时文件
                  (0, _utils.delFile)(dir);
                  (0, _utils.addSuccess)();
                case 29:
                case "end":
                  return _context.stop();
              }
            }, _callee, null, [[1, 21, 24, 27], [7, 15]]);
          }));
          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      case 17:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
}));