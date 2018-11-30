<template>
  <div class="grid-col" :style="`width: ${remWidth}rem; height: ${remHeight}rem`" @click="handleClick">
    <slot></slot>
  </div>
</template>
<script>
import { pixelToRem } from '../rem'

export default {
  name: 'GridColPixel',
  components: {},
  data () {
    return {}
  },
  props: {
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
    remWidth () {
      return pixelToRem(this.width)
    },
    remHeight () {
      return pixelToRem(this.height)
    }
  },
  methods: {
    handleClick () {
      this.$emit('click');
    }
  }
}
</script>
