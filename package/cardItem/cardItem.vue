<template>
  <div class="card-item" :style="style">
    <slot />
  </div>
</template>
<script>
  export default {
    name: 'ocjCardItem',
    data() {
      return {
        offset: 0
      }
    },
    computed: {
      style() {
        const { vertical, computedWidth, computedHeight } = this.$parent
        return {
          width: computedWidth + 'px',
          height: vertical ? computedHeight + 'px' : '100%',
          transform: `translate${vertical ? 'Y' : 'X'}(${this.offset}px)`
        }
      }
    },
    beforeCreate() {
      this.$parent.swipes.push(this)
    },
    destroyed() {
      this.$parent.swipes.splice(this.$parent.swipes.indexOf(this), 1);
    }
  }
</script>
<style lang="less" scoped>
  .card-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
</style>

