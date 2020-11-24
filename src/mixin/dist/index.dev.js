"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var mixin = {
  data: function data() {
    return {
      listQuery: {
        offset: 0,
        limit: 30
      },
      items: []
    };
  },
  filters: {
    singerName: function singerName(val) {
      if (val !== undefined && val.length && val.length < 2) {
        return val[0].name;
      } else if (val !== undefined) {
        var name = '';
        val.forEach(function (e, i) {
          name += "".concat(e.name, " / ");
        });
        return name.slice(0, name.length - 2);
      }
    }
  },
  methods: {
    formatDate: function formatDate(dateVal) {
      // 时间戳转时间
      var date = new Date(dateVal);
      var Y = date.getFullYear() + '年';
      var M = date.getMonth() + 1 + '月';
      var D = date.getDate() + '日'; // let h = date.getHours()  + 1 < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      // let m = date.getMinutes()  + 1 < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      // let s = date.getSeconds()  + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()

      if (new Date().getFullYear() === date.getFullYear()) {
        return M + D;
      }

      return Y + M + D;
    },
    handleSearch: function handleSearch() {
      this.getList();
    }
  }
};
var _default = mixin;
exports["default"] = _default;