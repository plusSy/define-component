<template>
  <div class="mock">
    <div class="currentY-view">
      range: {{ range }}
    </div>
    <ocjLoop @loadMoreStatus="handleLoadMore" @refreshStatus="handleRefresh" @ceilStatus="handleCeil">
      <div class="item" v-for="index in range" :key="index">{{ index }}</div>
    </ocjLoop>
  </div>
</template>

<script>
import OcjLoop from './loop.vue'
export default {
  name: 'Mock',
  components: { OcjLoop },
  data () {
    return {
      range: 100,
      timer: null
    }
  },
  methods: {
    refresh () {
      this.timer = setTimeout(() => {
        this.$nextTick(() => {
          this.range = this.range + 50
        })
      }, 3000)
    },
    handleLoadMore (status) {
      if (status) {
        this.refresh()
        console.log('加载更多')
      } else {
        console.log('清除加载项')
        clearTimeout(this.timer)
      }
    },
    handleRefresh (status) {
      return status ? console.log('顶部') : ''
    },
    handleCeil (status) {
      return status ? console.log('吸顶') : ''
    }
  }
}
</script>

<style lang="css" scoped>
.mock {
  width: 100%;
}
.item{
  height: 40px;
  width: 100%;
  line-height: 40px;
  border-bottom: 1px solid;
}
.currentY-view{
  position: fixed;
  top: 0px;
  left: 20px;
  padding: 5px 15px;
  background-color: cornflowerblue;
  border-radius: 3px;
  color: #ffffff;
}
</style>
