/**
 * 石一龙
 * 滑动子项 slide-item
 * 2018/11/14
 */
import OcjSlideItem from './slideItem.vue'

const components = [
  OcjSlideItem
]
const slideItemInit = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default slideItemInit
