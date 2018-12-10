// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import 'normalize.css'
import 'animate.css'
import Grid from '../package/grid'
import Demo from '../package/demo'
import * as Filters from '../package/filter'
import Background from '../package/background'
import headline from '../package/headline'
import layout from '../package/layout'
import Graphics from '../package/graphic'
import countDown from '../package/countDown'
import pdtItem from '../package/pdtItem'
import pdtList from '../package/pdtList'
import datepicker from '../package/datepicker'
import sideMenu from '../package/sideMenu'
import header from '../package/header'
import footer from '../package/footer'
import tabs from '../package/tabs'
import tab from '../package/tab'
import cardSwipe from '../package/cardSwipe'
import cardItem from '../package/cardItem'
import table from '../package/table'
import tableColumn from '../package/tableColumn'
import list from '../package/list'
import listItem from '../package/listItem'
import modal from '../package/modal'
import tags from '../package/tags'
import tag from '../package/tag'
import popover from '../package/popover'
import ocjFilter from '../package/filterComponent'
import listCustomItem from '../package/listCustomItem'
import carousel from '../package/carousel'
import slide from '../package/slide'
import slideItem from '../package/slideItem'
import pagination from '../package/pagination'
import badge from '../package/badge'

Grid.config.remProportion = 10
Grid.config.designWidth = 375
Grid.config.grid = 12

Grid.init()

Vue.use(Grid)

Vue.use(Demo)

Vue.use(Background)
Vue.use(headline)
Vue.use(countDown)
Vue.use(layout)
Vue.use(Graphics)
Vue.use(pdtItem)
Vue.use(pdtList)
Vue.use(datepicker)
Vue.use(sideMenu)
Vue.use(header)
Vue.use(footer)
Vue.use(tabs)
Vue.use(tab)
Vue.use(cardSwipe)
Vue.use(cardItem)
Vue.use(table)
Vue.use(tableColumn)
Vue.use(list)
Vue.use(listItem)
Vue.use(modal)
Vue.use(tags)
Vue.use(tag)
Vue.use(popover)
Vue.use(ocjFilter)
Vue.use(listCustomItem)
Vue.use(carousel)
Vue.use(slide)
Vue.use(slideItem)
Vue.use(pagination)
Vue.use(badge)

Object.keys(Filters).forEach(key => {
  Vue.filter(key, Filters[key])
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
