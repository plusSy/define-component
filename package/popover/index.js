/**
 * Candice
 *  popover 浮层
 * 2018/10/30
 */
import OcjPopover from './popover.vue'

const components = [
  OcjPopover
]
const popoverInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default popoverInstall