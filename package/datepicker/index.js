/**
 * Candice
 * 倒计时组件
 * 2018/10/23
 */
import OcjDatePicker from './datepicker.vue'

const components = [
  OcjDatePicker
]
const datepickerInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default datepickerInstall