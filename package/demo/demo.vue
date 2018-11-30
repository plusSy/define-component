<template>
  <div class="">
    <grid-row>
      <grid-col-pixel @click="handleClick" v-for="(item, key) in localData[localDataKey.listKey]" :key="key" :width="pixelWidth" :height="rowHeight">
        <div class="item-pic">
          <img class="item-pic__img" :style="itemImageSize" :src="item[localDataKey.picKey]" :alt="item[localDataKey.titleKey]">
        </div>
        <div class="item-text">
          <div class="item-text__title">{{ item[localDataKey.titleKey] }}</div>
          <div class="item-text__salePrice">{{ item[localDataKey.priceKey] | MONEY('CNY') }}</div>
        </div>
      </grid-col-pixel>
    </grid-row>
  </div>
</template>
<style lang="css" scoped>
  .item-pic {
    width: 100%;
  }

  .item-pic__img {
    object-fit: cover;
  }

  .item-text {
    text-align: left;
    padding: 0 5px;
  }

  .item-text__title {
    font-size: 14px;
    height: 2em;
    line-height: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-text__salePrice {
    font-size: 14px;
    color: red;
  }
</style>
<script>
import {remConfig} from '../rem'

export default {
  name: 'DemoComponent',
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
        titleKey: 'itemName',
        priceKey: 'salePrice'
      }
    }
  },
  props: {
    /* 数据注入 */
    injectData: {
      type: Object,
      required: true
    },
    /* key配置 */
    injectDataKey: {
      type: Object
    },
    /* 一行商品数量 */
    numForOneRow: {
      type: [Number, String],
      default: 2 // todo 根据config文件配置
    },
    /* 行高 */
    rowHeight: {
      type: [Number, String],
      default: 180 // todo 根据config文件配置
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
      return `width: ${105 / remConfig.designWidth * remConfig.remProportion}rem; height: ${105 / remConfig.designWidth * remConfig.remProportion}rem`
    }
  },
  methods: {
    init () {
      /* 更新数据 */
      this.localData = this.injectData
      /* 合并key配置 */
      this.localDataKey = {...this.localDataKey, ...this.injectDataKey}
    },
    handleClick (e) {
      console.log(e)
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  watch: {}
}
</script>
