/**
 * 石一龙
 * 建立一个tag布局图层
 * 2018/11/30
*/

import OcjTags from './tags.vue'

const components = [
  OcjTags
]
const tagsInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default tagsInstall
