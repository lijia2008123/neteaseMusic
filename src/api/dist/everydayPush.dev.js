"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.list = list;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function list(params) {
  return (0, _request["default"])({
    url: '/recommend/songs',
    method: 'get',
    params: params
  });
}