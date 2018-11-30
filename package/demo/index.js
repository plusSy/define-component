/**
 * Lmio
 * 2018/8/28
 */
import DemoComponent from './demo'

const components = [
  DemoComponent
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
