<template>
  <div class="group-item" :style="groupItemStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GroupItem',
  data () {
    return {
      itemWidth: 0
    }
  },
  computed: {
    groupItemStyle () {
      return {
        width: this.itemWidth + 'px'
      }
    }
  },
  mounted () {
    this.itemWidth = this.$parent.$el.offsetWidth
  }
}
</script>

<style lang="css" scoped>
.group-item{
  height: 100%;
  display: inline-block;
}
</style>
