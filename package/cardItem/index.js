/**
 * Candice
 * 页面卡片元素
 * 2018/11/07
 */
import OcjCardItem from './cardItem.vue'

const components = [
  OcjCardItem
]
const cardItemInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default cardItemInstall