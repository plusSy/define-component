/**
 * 石一龙
 * 滑动 slide
 * 2018/11/14
 */
import OcjSlide from './slide.vue'

const components = [
  OcjSlide
]
const slide = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default slide
