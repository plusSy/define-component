/**
 * Candice
 * 页面卡片翻页容器
 * 2018/11/07
 */
import OcjCardSwipe from './cardSwipe.vue'

const components = [
  OcjCardSwipe
]
const cardSwipeInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default cardSwipeInstall