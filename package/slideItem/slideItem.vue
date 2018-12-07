<template>
  <div class="slide-item" :style="itemStyle">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'OcjSlideItem',
  props: {
    itemWidth: {
      type: [Number, String],
      default: 0
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
