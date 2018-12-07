<template>
  <div class="slide">
    <div ref="groups" :class="['slide-groups', {'innerbox': scrollType === 'default'}, {'showScroll': scrollType === 'none' || scrollType === 'progress'}]">
      <div
        :style="trackStyle"
        class="slide-group"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @click="handleClickItem"
      >
        <slot></slot>
      </div>
      <template v-if="scrollType === 'progress'">
        <div class="progress" :style="progressBarStyle">
        <div class="progress-item" :style="progressItemStyle"></div>
      </div>
      </template>
    </div>
  </div>
</template>

<script>
import TouchHelper from '../utils/touch'

export default {
  name: 'OcjSlide',
  data () {
    return {
      width: 0,
      clientWidth: 0,
      slideLen: 0,
      scrollwidth: 0,
      startLeft: 0,
      touchFount: true
    }
  },
  props: {
    /**
     * slide 高度
    */
    height: {
      type: [Number, String],
      default: 200
    },
    /**
     * 滚动条样式
     * type: none | default | progress(进度条形式)
     *
    */
    scrollType: {
      type: String,
      default: 'none'
    }
  },
  computed: {
    $touch () {
      return new TouchHelper()
    },
    len () {
      return this.slideLen
    },
    trackStyle () {
      return `
        width: ${this.width * this.len + 'px'};
        height: ${this.height}px;
      `
    },
    noDataStyle () {
      return `
        lineHeight: ${this.height}px
      `
    },
    progressBarStyle () {
      return `
        width: ${this.clientWidth}px;
      `
    },
    progressItemStyle () {
      return `
         width: ${this.scrollwidth}px;
      `
    }
  },
  mounted () {
    this.slideLen = this.$children.length
    this.width = this.$children[0].itemWidth
    this.clientWidth = this.$refs.groups.offsetWidth
    this.handleScrollWidth()
  },
  methods: {
    handleClickItem (e) {
      this.$emit('click', e)
    },
    onTouchStart (event) {
      this.$touch.touchStart(event)
      this.startLeft = this.scrollwidth
    },
    onTouchMove (event) {
      this.$touch.touchMove(event)
      this.touchFount = this.$touch.deltaX > 0
      this.handleScrollWidth(this.$touch.deltaX)
    },
    onTouchEnd (event) {},
    handleScrollWidth (deltaX = 0) {
      let offsetWidth = this.width * this.len
      let minWidth = this.clientWidth / offsetWidth * this.clientWidth
      deltaX = this.touchFount ? this.startLeft - (Math.abs(deltaX) / offsetWidth * this.clientWidth) : this.startLeft + (Math.abs(deltaX) / offsetWidth * this.clientWidth)
      let scrollwidth = deltaX || minWidth
      this.scrollwidth = scrollwidth < minWidth ? minWidth : scrollwidth > this.clientWidth ? this.clientWidth : scrollwidth
    }
  },
  watch: {
    slideLen () {
      return this.$children.length
    },
    width () {
      return this.$children[0].itemWidth
    }
  }
}
</script>

<style lang="css" scoped>
.slide{
  position: relative;
}
.slide-groups{
  overflow-x: scroll;
  overflow-y: hidden;
}
.slide-group{}
/*滚动条样式*/
.innerbox::-webkit-scrollbar {/*滚动条整体样式*/
  width: 1px;     /*高宽分别对应横竖滚动条的尺寸*/
  height: 2px;
  position: absolute;
  top: -10px;
}
.innerbox::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
  border-radius: 2px;
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.3);
  background: rgba(0,0,0,0.3);
}
.innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.showScroll::-webkit-scrollbar{
  display: none;
}
.progress{
  height: 2px;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  bottom: -1px;
}
.progress-item{
  height: 1px;
  background-color: #000;
}
</style>
