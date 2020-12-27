const mixin = {
  data() {
    return {
      listQuery: {
        offset: 0,
        limit: 30
      },
      items: []
    }
  },
  filters: {
    singerName(val) {
      if(val !== undefined && val.length && val.length < 2) {
        return val[0].name
      } else if(val !== undefined){
        let name = ''
        val.forEach((e, i) => {
          name += `${e.name} / `
        })
        return name.slice(0, name.length - 2)
      }
    }
  },
  methods: {
    formatDate(dateVal) { // 时间戳转时间
      let date = new Date(dateVal)
      let Y = date.getFullYear() + '年'
      let M = date.getMonth() + 1 + '月'
      let D = date.getDate() + '日'
      // let h = date.getHours()  + 1 < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
      // let m = date.getMinutes()  + 1 < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
      // let s = date.getSeconds()  + 1 < 10 ? '0' + date.getSeconds() : date.getSeconds()
      if (new Date().getFullYear() === date.getFullYear()) {
        return M + D
      }
      return Y + M + D
    },
    handleSearch() {
      this.getList()
    }
  }
}

export default mixin