/**
 * Candice
 *  底部footer
 * 2018/11/01
 */
import OcjFooter from './footer.vue'

const components = [
  OcjFooter
]
const footerInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default footerInstall