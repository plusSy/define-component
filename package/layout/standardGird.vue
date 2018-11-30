<template>
  <grid-row :padding="padding" align="between">
    <template v-for="(item, key) in localData[localDataKey.listKey]">
      <grid-col-pixel :key="key" :width="colWidth" :height="height">
        <slot :name="key"></slot>
      </grid-col-pixel>
    </template>
  </grid-row>
</template>
<script>
import { remConfig } from '../rem'

/**
 * 标准分格组件
 * 根据传入的单元格宽度 依据flex布局实现行布局
 */
export default {
  name: 'StandardGirdComponent',
  components: {
    gridColGrid: () => import('../grid/col-grid'),
    gridColPercent: () => import('../grid/col-percent'),
    gridColPixel: () => import('../grid/col-pixel'),
    gridRow: () => import('../grid/row')
  },
  data () {
    return {
      localData: {},
      localDataKey: {
        listKey: 'list',
        picKey: 'firstImgUrl',
        textKey: 'title'
      },
      gridTypeComponent: null
    }
  },
  props: {
    injectData: {
      type: [Object],
      required: true
    },
    injectDataKey: {
      type: [Object],
      default: () => {}
    },
    /* 行宽 暂无使用 单位px */
    rowWidth: {
      type: [Number, String],
      default: () => remConfig.designWidth
    },
    /* 每列宽度 单位px */
    colWidth: {
      type: [Number, String],
      required: true
    },
    /* 行高 单位px */
    height: {
      type: [Number, String],
      required: true
    },
    /* 行左右间距 单位px */
    padding: {
      type: [Number, String],
      default: () => 15
    },
    /* 行内元素对齐方式 */
    align: {
      type: [String],
      default: () => 'between'
    }
  },
  computed: {
    rowHeight () {
      return this.height / remConfig.designWidth * remConfig.remProportion
    }
  },
  methods: {
    init () {
      /* 更新数据 */
      this.localData = this.injectData
      /* 合并key配置 */
      this.localDataKey = {...this.localDataKey, ...this.injectDataKey}
    }
  },
  created () {
    this.init()
  }
}
</script>
