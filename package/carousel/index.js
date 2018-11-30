import OcjCarousel from './carousel'
const components = [
  OcjCarousel
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
