/**
 * Lmio
 * 2018/8/29
 */

/**
 * 金额显示过滤器
 * @param {String, Number} val 过滤值 默认显示为人民币
 * @param {String} type 币值类型
 */
export const MONEY = (val, type) => {
  // 不传或传null 或者参数不规范
  if (!type || (type !== 'CNY' && type !== 'USD')) {
    type = 'CNY'
  }
  // 货币类型
  if (type === 'CNY') { //  人民币
    return `¥ ${decimalAdjust(val)}`
  }
  if (type === 'USD') { // 美元
    return `$ ${decimalAdjust(val)}`
  }
}

/* 数字格式化 */
function decimalAdjust (num) {
  let sn = num.toString()
  let sa = sn.split('.')
  if (sa.length > 1) {
    return `${Number(sa[0]).toLocaleString()}.${sa[1].substr(0, 2)}`
  } else {
    return `${Number(sa[0]).toLocaleString()}.00`
  }
}
