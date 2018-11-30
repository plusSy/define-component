/**
 * Candice
 *  左侧菜单
 * 2018/10/30
 */
import OcjSideMenu from './sideMenu.vue'

const components = [
  OcjSideMenu
]
const sideMenuInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default sideMenuInstall