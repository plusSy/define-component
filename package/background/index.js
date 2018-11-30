/**
 * Candice
 * 2018/8/30
 */
import OcjBackground from './background'

const components = [
  OcjBackground
]

const backgroundInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default backgroundInstall
