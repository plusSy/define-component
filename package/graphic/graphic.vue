<template>
  <div class="graphic" :style="graphicStyle">
    <grid-row padding="0"> <!-- 放开限制 -->
      <grid-col-pixel @click="handleClick(item)" v-for="(item, key) in localData[localDataKey.listKey]" :key="key" :width="pixelWidth" :height="rowHeight">
        <div class="pic">
          <img :class="`pic__img ${imgClass}`" :style="itemImageSize" :src="item[localDataKey.picKey]" :alt="item[localDataKey.titleKey]">
        </div>
        <div class="text" v-if="showText">
          <div :class="`text__title ${imgClass}`" :style="titleStyle">{{ item[localDataKey.titleKey] }}</div>
        </div>
      </grid-col-pixel>
    </grid-row>
  </div>
</template>

<script>
// rem 配置 提出到 util
import { remConfig, pixelToRem } from '../rem'

export default {
  name: 'Graphic',
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
      /* 默认key配置 todo 根据config文件配置 */
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
      default: 2 // todo 根据config文件配置
    },
    /* 行高 */
    rowHeight: {
      type: [Number, String],
      default: 105 // todo 根据config文件配置
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
    graphicStyle () {
      return ``
    },
    titleStyle () {
      return `
        font-size: ${pixelToRem(12)}rem;
      `
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
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="css" scoped>
.pic {
  width: 100%;
}

.pic__img {
  object-fit: cover;
}

.text {
  text-align: left;
  padding: 0 5px;
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
</style>
