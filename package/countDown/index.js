/**
 * Candice
 * 倒计时组件
 * 2018/8/31
 */
import OcjCountDown from './countDown'

const components = [
  OcjCountDown
]
const countDownInstall = {
  install: function (Vue) {
    components.map(function (item) {
      Vue.component(item.name, item)
    })
  },
  init: function () {
    return this
  }
}

export default countDownInstall
