/**
 * Candice
 *  弹窗允许左推，右推，全屏
 * 2018/11/20
 */
import OcjModal from './modal.vue'

const components = [
  OcjModal
]
const modalInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default modalInstall
