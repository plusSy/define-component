import GridRow from './row'
import GridColPercent from './col-percent'
import GridColPixel from './col-pixel'
import GridColGrid from './col-grid'
import rem from '../rem'
import '../style/index.css'

const components = [
  GridRow,
  GridColPercent,
  GridColPixel,
  GridColGrid
]

const GridComponents = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  config: {
    remProportion: 10,
    watch: ['resize', 'load'],
    designWidth: 375,
    baseFontSize: 12,
    gird: 12
  },
  init: function () {
    rem.init(this.config)
  }
}

export default GridComponents

export const config = GridComponents.config
