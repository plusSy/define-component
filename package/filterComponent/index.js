/**
 * 石一龙
 * 地址管理组建
 * 2018/9/5
 */
// import OcjFilter from './filterComponent.vue'
import OcjFilter from './loop.vue'

const components = [
  OcjFilter
]
const address = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default address
