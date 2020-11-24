"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = comment;
exports.commentLike = commentLike;
exports.commentFloor = commentFloor;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function comment(params) {
  return (0, _request["default"])({
    url: '/comment/new',
    method: 'get',
    params: params
  });
}

function commentLike(params) {
  return (0, _request["default"])({
    url: '/comment/like',
    method: 'get',
    params: params
  });
}

function commentFloor(params) {
  return (0, _request["default"])({
    url: '/comment/floor',
    method: 'get',
    params: params
  });
}