// html元素
const docEl = document.documentElement
const dpr = window.devicePixelRatio || 1

// 设置字体大小根据dpr设置
// eslint-disable-next-line no-unused-vars
function setBodyFontSize () {
  if (document.body) {
    document.body.style.fontSize = `${localConfig.baseFontSize * dpr}px`
  } else {
    document.addEventListener('DOMContentLoaded', setBodyFontSize)
  }
}

// 根据比例计算rem基准值 并设置到html上
function setRemUnit () {
  const rem = docEl.clientWidth / localConfig.remProportion
  docEl.style.fontSize = `${rem}px`
}

let localConfig = {
  remProportion: 10,
  watch: ['resize', 'load'],
  designWidth: 375,
  baseFontSize: 12,
  grid: 12
}

const rem = {
  init: function (config) {
    localConfig = Object.assign(localConfig, config)
    // setBodyFontSize()
    setRemUnit()
    // 根据配置的事件 实时监听rem变化
    // localConfig.watch.map(function (item, key) {
    //   document.addEventListener(item, function () {
    //     setRemUnit()
    //   })
    // })
    window.onresize = function () {
      setRemUnit()
    }
  }
}

export default rem
export const remConfig = localConfig
/* 像素转rem计算 */
export const pixelToRem = function (pixel) {
  return pixel / localConfig.designWidth * localConfig.remProportion
}
