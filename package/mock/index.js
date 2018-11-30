import mock from './mock'
const components = [
  mock
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
