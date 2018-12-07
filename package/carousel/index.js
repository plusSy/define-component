import OcjCarousel from './carousel'
const components = [
  OcjCarousel
]

const carouselInit = {
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

export default carouselInit

export const config = carouselInit.config
