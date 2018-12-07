
import OcjTips from './tips.vue'

const components = [
  OcjTips
]
const tipsInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tipsInstall
