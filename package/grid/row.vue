<template>
  <div :class="['grid-row', alignClass]" :style="remStyle">
    <slot></slot>
  </div>
</template>
<script>
import {remConfig} from '../rem'

export default {
  name: 'GridRow',
  components: {},
  data () {
    return {}
  },
  props: {
    /* todo 格式控制 是否滑动 间距控制 */
    layout: {
      type: Boolean,
      default: false
    },
    padding: {
      type: [Number, String],
      default: () => 15
    },
    /* 弹性布局类型 */
    align: {
      type: [String],
      default: () => 'center'
    },
    /* 主轴类型 */
    axis: {
      type: [String],
      default: () => 'row'
    }
  },
  computed: {
    remStyle () {
      let content = 'center'
      switch (this.align) {
        case 'center':
          content = 'center'
          break
        case 'start':
          content = 'flex-start'
          break
        case 'end':
          content = 'flex-end'
          break
        case 'between':
          content = 'space-between'
          break
        case 'around':
          content = 'space-around'
          break
        default:
          content = 'center'
      }
      let axis = 'row'
      if (['row', 'row-reverse', 'column', 'column-reverse'].includes(this.axis)) {
        axis = this.axis
      } else {
        axis = 'row'
      }
      const pad = this.padding / remConfig.designWidth * remConfig.remProportion
      return `padding-left: ${pad}rem; padding-right: ${pad}rem; justify-content: ${content}; flex-direction: ${axis};`
    },
    alignClass () {
      switch (this.align) {
        case 'center':
          return 'grid-row__center'
        case 'start':
          return 'grid-row__start'
        case 'end':
          return 'grid-row__end'
        case 'between':
          return 'grid-row__between'
        case 'around':
          return 'grid-row__around'
        default:
          return 'grid-row__center'
      }
    }
  },
  methods: {
  }
}
</script>
