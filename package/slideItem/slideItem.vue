<template>
  <div class="slide-item" :style="itemStyle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'slideItem',
  props: {
    itemWidth: {
      type: [Number, String],
      default: 375
    }
  },
  computed: {
    itemStyle () {
      return `
        width: ${this.itemWidth}px;
        height: ${this.$parent.height}px;
      `
    }
  }
}
</script>

<style lang="css" scoped>
.slide-item{
  display: inline-block;
  overflow: hidden;
}
</style>
