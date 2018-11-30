/**
 * Candice
 * 2018/9/3
 * 商品单元
 */
import OcjPdtItem from './pdtItem.vue'

const components = [
  OcjPdtItem
]
const pdtItemInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default pdtItemInstall
