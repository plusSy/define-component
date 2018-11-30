/**
 * 石一龙
 * 一个tag
 * 2018/11/30
*/

import OcjTag from './tag.vue'

const components = [
  OcjTag
]
const tagInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tagInstall
