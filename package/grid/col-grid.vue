<template>
  <div class="grid-col" :style="`width: ${remWidth}rem; height: ${remHeight}rem`">
    <slot></slot>
  </div>
</template>
<script>
import { remConfig } from '../rem'

export default {
  name: 'GridColGrid',
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
      return this.width / remConfig.grid * remConfig.remProportion
    },
    remHeight () {
      return this.height / remConfig.designWidth * remConfig.remProportion
    }
  },
  methods: {},
  created () {
  }
}
</script>
