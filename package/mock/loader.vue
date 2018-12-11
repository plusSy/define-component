<template>
  <div class="ocj-loader" v-if="text">
    --- {{text}} ---
  </div>
</template>

<script>
export default {
  name: 'OcjLoader',
  props: {
    text: {
      type: String,
      default: '加载中'
    }
  }
}
</script>

<style lang="css" scoped>
.ocj-loader{
  width: 100%;
  text-align: center;
}
</style>
