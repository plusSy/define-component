<template>
  <div :class="comClass" :style="transformStyle">
    <slot></slot>
  </div>
</template>
<script>
import { pixelToRem } from '../rem'

/**
 * 像素转换rem组件
 */
export default {
  name: 'RemTransform',
  components: {},
  data () {
    return {}
  },
  props: {
    comClass: {
      type: [String],
      default: () => ''
    },
    width: {
      type: [Number, String],
      required: true
    },
    height: {
      type: [Number, String],
      required: true
    }
  },
  computed: {
    transformStyle: () => {
      return `width: ${pixelToRem(this.width)}rem;height: ${pixelToRem(this.height)}rem;`
    }
  },
  methods: {}
}
</script>
