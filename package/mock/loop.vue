<template>
  <div ref="scrollContainer">
    <div class="currentY-view">
      currentY: {{ currentY }} istop: {{ isTop }} isBottom: {{ isBottom }} isCeil: {{ isCeil }}

      <button class="button" @click="getHeight">高度</button>
    </div>
    <div ref="scrollContent">
      <slot></slot>
    </div>
    <OcjLoader :text="localLoaderText"></OcjLoader>
  </div>
</template>

<script>
import OcjLoader from './loader'

export default {
  name: 'OcjLoop',
  components: {
    OcjLoader
  },
  data () {
    return {
      localLoaderText: '上拉加载',
      containerOffsetTop: 0, // scroll上部分偏移
      containerScrollHeight: 0, // scroll整体高度
      contentScrollHeight: 0, // 列表内容高度
      screenHeight: 0, // 屏幕高度
      scrollY: 0, // 滚动Y
      currentY: 0, // 当前位置
      isTop: false, // 是否在顶部
      isBottom: false, // 是否在底部
      isCeil: false // 是否吸顶
    }
  },
  props: {
    // 距离
    distance: {
      type: [String, Number],
      default: 0
    }
  },
  computed: { },
  mounted () {
    this.initWindow()
    this.computeDom()
  },
  methods: {
    initWindow () {
      window.addEventListener('scroll', this.handleScroll)
      window.addEventListener('resize', this.handleResize)
      this.screenHeight = window.screen.height || 0
    },
    // 计算 DOM
    computeDom () {
      let { scrollContainer: { offsetTop: containerOffsetTop, offsetHeight: containerScrollHeight }, scrollContent: { offsetHeight: contentScrollHeight } } = this.$refs
      this.containerOffsetTop = containerOffsetTop
      this.containerScrollHeight = containerScrollHeight
      this.contentScrollHeight = contentScrollHeight
    },
    handleScroll () {
      // 当前位置
      // this.currentY = this.containerScrollHeight + this.containerOffsetTop - this.screenHeight - window.scrollY
      this.currentY = window.scrollY

      this.istop = window.scrollY < Number(this.distance)
      this.$emit('refreshStatus', this.istop) // true | false

      this.isBottom = this.containerScrollHeight + this.containerOffsetTop - this.screenHeight - window.scrollY < Number(this.distance)
      this.$emit('loadMoreStatus', this.isBottom) // true | false

      this.isCeil = this.containerOffsetTop - window.scrollY < Number(this.distance)
      this.$emit('ceilStatus', this.isCeil)
    },
    handleResize () {
      console.log('size change')
    },
    getHeight () {
      console.log(this.$refs.scrollContent.offsetHeight)
    }
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="css" scoped>
.currentY-view{
  position: fixed;
  top: 30px;
  left: 10px;
  padding: 5px 15px;
  background-color: cornflowerblue;
  border-radius: 3px;
  color: #ffffff;
}
.button{
  padding: 3px 10px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 3px;
}
</style>
