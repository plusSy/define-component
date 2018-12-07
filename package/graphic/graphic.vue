<template>
  <div class="ocj-graphic">
    <grid-row :padding="padding">
      <grid-col-pixel
        v-for="(item, key) in localData[localDataKey.listKey]"
        :key="key"
        :width="pixelWidth"
        :height="rowHeight"
        v-if="key < numForOneRow"
        @click="handleClick(item)">
        <div class="pic" :ref="`pica`">
          <img :class="`pic__img ${imgClass}`" :style="itemImageSize" :src="item[localDataKey.picKey]" :alt="item[localDataKey.titleKey]">
        </div>
        <div class="text" :style="textStyle" v-if="showText">
          <!-- <img :src="item[localDataKey.picKey]" width="10" height="10"> -->
          <div :class="`text__title ${textClass}`" :style="titleStyle">{{ item[localDataKey.titleKey] }}</div>
        </div>
      </grid-col-pixel>
    </grid-row>
  </div>
</template>

<script>
import { remConfig, pixelToRem } from '../rem'

export default {
  name: 'OcjGraphic',
  components: {
    gridColGrid: () => import('../grid/col-grid'),
    gridColPercent: () => import('../grid/col-percent'),
    gridColPixel: () => import('../grid/col-pixel'),
    gridRow: () => import('../grid/row')
  },
  data () {
    return {
      /* 组件内数据 */
      localData: {},
      /* 默认key配置 */
      localDataKey: {
        listKey: 'list',
        picKey: 'firstImgUrl',
        titleKey: 'title',
        priceKey: 'salePrice'
      }
    }
  },
  props: {
    /* 数据注入 */
    injectData: {
      type: [Object],
      required: true
    },
    /* key配置 */
    injectDataKey: {
      type: [Object]
    },
    /* 一行商品数量 */
    numForOneRow: {
      type: [Number, String],
      default: 2
    },
    /* 行高 */
    rowHeight: {
      type: [Number, String],
      default: 105
    },
    /* 展示文字 */
    showText: {
      type: [Boolean],
      default: false
    },
    /* 图片大小 */
    imageSize: {
      type: [Object],
      default: () => {
        return {
          width: 60,
          height: 60
        }
      }
    },
    /* 图片元素样式 */
    imgClass: {
      type: [String],
      default: () => ''
    },
    /* 文字元素样式 */
    textClass: {
      type: [String],
      default: () => ''
    },
    /* 左右的偏移 */
    padding: {
      type: [String, Number],
      default: () => 0
    },
    /* 字体大小 */
    fontSize: {
      type: [Number, String],
      default: () => 12
    },
    /* 字体颜色 */
    color: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    /* 根据rem配置计算宽度 */
    gridWidth () {
      // 栅格计算
      return remConfig.grid / this.numForOneRow
    },
    percentWidth () {
      /* 百分比计算 */
      return 100 / this.numForOneRow
    },
    pixelWidth () {
      /* 像素计算 */
      return remConfig.designWidth / this.numForOneRow
    },
    /* 根据rem配置计算图片长宽 */
    itemImageSize () {
      let { width, height } = this.imageSize
      return `
        width: ${(width / remConfig.designWidth) * remConfig.remProportion}rem;
        height: ${(height / remConfig.designWidth) * remConfig.remProportion}rem
      `
    },
    textStyle () {
      return {
        width: pixelToRem((remConfig.designWidth - this.padding * 2) / this.numForOneRow) + 'rem'
      }
    },
    titleStyle () {
      return {
        fontSize: pixelToRem(this.fontSize) + 'rem',
        color: this.color
      }
    }
  },
  methods: {
    init () {
      /* 更新数据 */
      this.localData = this.injectData
      /* 合并key配置 */
      this.localDataKey = { ...this.localDataKey, ...this.injectDataKey }
    },
    handleClick (e) {
      this.$emit('click', e)
    }
  },
  created () {
    this.init()
  }
}
</script>

<style lang="css" scoped>
.ocj-graphic{
  overflow: hidden;
}
.pic {
  width: 100%;
}

.pic__img {
  object-fit: cover;
}

.text {
  text-align: left;
  position: absolute;
}

.text__title {
  height: 2em;
  line-height: 1em;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: PingFangSC-Regular;
  color: #414141;
  text-align: center;
}
.grid-row{
  flex-wrap: nowrap;
}
.grid-col{
  position: relative;
}
</style>
