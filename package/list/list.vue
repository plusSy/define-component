<template>
  <div class="list-wrapper">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'ocjList'
  }
</script>
<style lang="less" scoped>
  .list-wrapper {
    width: 100%;
    overflow-x: hidden;
    user-select: none;
  }
</style>


