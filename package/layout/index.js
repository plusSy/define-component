/**
 * Lmio
 * 2018/8/30
 */
import StandardGird from './standardGird'
import RemTransform from './rem'

const components = [
  StandardGird,
  RemTransform
]

const DemoComponents = {
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

export default DemoComponents

export const config = DemoComponents.config
