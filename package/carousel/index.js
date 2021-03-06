import OcjCarousel from './carousel'
const components = [
  OcjCarousel
]

const carouselInstall = {
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

export default carouselInstall

export const config = carouselInstall.config
