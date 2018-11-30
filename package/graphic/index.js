/**
 * 石一龙
 * 2018/11/07
 */
import Graphic from './graphic'

const components = [
  Graphic
]

const Graphics = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  config: {},
  init: function () {
    return this
  }
}

export default Graphics

export const config = Graphics.config
