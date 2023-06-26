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
var promptList = [{
  type: "checkbox",
  message: "请选择需要增加的页面:",
  name: "addPages",
  choices: ["common-table", "common-table-demo1"]
}];
module.exports = /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
  var _yield$inquirerPrompt, addPages;
  return _regenerator["default"].wrap(function _callee2$(_context2) {
    while (1) switch (_context2.prev = _context2.next) {
      case 0:
        _context2.next = 2;
        return (0, _utils.inquirerPrompt)(promptList);
      case 2:
        _yield$inquirerPrompt = _context2.sent;
        addPages = _yield$inquirerPrompt.addPages;
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
                  try {
                    for (_iterator.s(); !(_step = _iterator.n()).done;) {
                      page = _step.value;
                      pagePath = _path["default"].join(dir, "src", "views", page);
                      targetPath = _path["default"].join(process.cwd(), "src", "views", page);
                      (0, _utils.judgeExistFold)(targetPath);
                      // 移动文件
                      _shelljs["default"].mv(pagePath, targetPath);
                      // 删除临时文件
                    }
                  } catch (err) {
                    _iterator.e(err);
                  } finally {
                    _iterator.f();
                  }
                case 2:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x, _x2) {
            return _ref2.apply(this, arguments);
          };
        }());
      case 5:
      case "end":
        return _context2.stop();
    }
  }, _callee2);
}));