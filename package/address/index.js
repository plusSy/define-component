/**
 * 石一龙
 * 地址管理组建
 * 2018/9/5
 */
import OcjAddress from './address.vue'

const components = [
  OcjAddress
]
const address = {
  install: function (Vue) {
    components.map(function (item) {
      console.log('components', item);
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default address
