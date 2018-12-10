/**
 * badge 标记数
*/

import OcjBadge from './badge.vue'

const components = [
  OcjBadge
]
const badgeInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default badgeInstall
