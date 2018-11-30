<template>
  <div
    class="carousel"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
    @mouseenter="hoverFn"
    @mouseleave="hoverFn"
    :style="carouselStyle"
    :class="{carouselClass}"
  >
    <div
      class="imgs-container"
      :style="`
        width: ${len * 100}%;
        transform: translate(-${ activeIndex * 100 / len }%);
        transition: ${ isResetIndex ? '' : transitionInterval / 1000 }s ease;
      `"
    >
    <!-- transition-duration: 1s; -->
      <a
        class="img-item"
        v-for="(img, i) in imgsComputed"
        :style="`
          width: ${100 / len}%;
          backgroundImage: url(${img.src});
        `"
        :href="img.href ? img.href : false"
        :key="i"
      ></a>
    </div>

    <template v-if="controllable">
      <div class="prev" @click="switchFn" onselectstart="return false">&lt;</div>
      <div class="next" @click="switchFn" onselectstart="return false">&gt;</div>
    </template>

    <ul class="dots" @click="activeDotFn" v-if="showDocts">
      <li
        class="dot"
        v-for="n in (len-2)"
        :key="n"
        :data-dot-index="n"
        :class="{'active-dot': activeIndex === n || (activeIndex === (len-1) && n === 1) || (activeIndex === 0 && n === 5)}"
      ></li>
    </ul>
  </div>
</template>

<script>
import { pixelToRem } from '../rem'

export default {
  name: 'carousel',
  props: {
    imgs: {
      type: Array,
      required: true
    },
    /* 定时间隔 */
    interval: {
      type: [Number, String],
      default: 5000
    },
    height: {
      type: [Number, String],
      default: 200
    },
    /* 左右的控制器 */
    controllable: {
      type: Boolean,
      default: false
    },
    /* 展示dots */
    showDocts: {
      type: Boolean,
      default: true
    },
    /* 是否自动轮播 */
    autoPlay: {
      type: [Boolean, String],
      default: true
    },
    /* 过渡动画时长 */
    transitionInterval: {
      type: [Number, String],
      default: 500
    },
    /* 当前显示第几张 */
    currentPage: {
      type: [Number, String],
      default: 1
    },
    /* class */
    carouselClass: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      timer: null, // 自动播放的定时器
      isTransitioning: false, // 是否处于过度动画执行期间
      isResetIndex: false, // 是否为瞬间重置定位，在watch中初始化，重定位会取消transition动画
      activeIndex: this.currentPage,
      startPos: {}, // 开始位置
      endPos: {}, // 结束位置
      scrollDirection: 0, // 滚动方向
      touch: {} // 记录触碰节点
    }
  },
  computed: {
    // 为了无缝滚动，在传进来的imgs数组首部增加末尾元素，在尾部追加首元素
    imgsComputed () {
      var firstImg = this.imgs[0]
      var lastImg = this.imgs[this.imgs.length - 1]
      return [lastImg].concat(this.imgs, [firstImg])
    },
    len () {
      return this.imgsComputed.length
    },
    carouselStyle () {
      return `
        height: ${pixelToRem(this.height)}rem;
      `
    }
  },
  beforeDestory () {
    clearInterval(this.timer)
  },
  methods: {
    activeDotFn (e) {
      if (this.timer) clearInterval(this.timer)
      if (e.target.tagName.toLowerCase() === 'li') {
        let index = parseInt(e.target.getAttribute('data-dot-index'))
        this.activeIndex = index
      }
      this.startInterval()
    },
    switchFn (e) {
      if (this.isTransitioning) return // 动画过渡中不可以进行切换
      // 对activeIndex进行操作
      e.target.className.indexOf('next') !== -1 ? this.activeIndex++ : this.activeIndex--
    },
    startInterval () { // 启动自动轮播函数
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          // 对activeIndex进行操作
          this.activeIndex++
        }, this.interval)
      }
    },
    hoverFn (e) { // 鼠标移入暂停轮播，移出恢复轮播
      if (e.type === 'mouseenter') {
        if (this.timer) clearInterval(this.timer)
      } else {
        this.startInterval()
      }
    },
    touchstart (e) {
      if (this.timer) clearInterval(this.timer)
      this.touch = e.targetTouches[0] // 取得第一个touch的坐标值
      this.startPos = {x: this.touch.pageX, y: this.touch.pageY}
      this.scrollDirection = 0
    },
    touchmove (e) {
      let { touch, startPos } = this
      let currentWidth = e.currentTarget.clientWidth / 4
      // 如果有多个地方滑动，我们就不发生这个事件
      if (event.targetTouches.length > 1) {
        return
      }
      touch = e.targetTouches[0]
      this.endPos = {x: touch.pageX, y: touch.pageY}
      // 判断滑动距离超过当前元素的25%计算出滑动方向，向右为1，向左为-1
      this.scrollDirection = touch.pageX - startPos.x > currentWidth ? 1 : touch.pageX - startPos.x < -currentWidth ? -1 : 0
    },
    touchend (e) {
      let { scrollDirection, activeIndex, imgs } = this
      let index = activeIndex
      if (scrollDirection === 1) {
        if (index >= 1 && index <= imgs.length) {
          this.activeIndex--
        }
      } else if (scrollDirection === -1) {
        if (index >= 0 && index <= imgs.length) {
          this.activeIndex++
        }
      }
      this.startInterval()
    }
  },
  mounted () {
    this.startInterval() // 启动自动轮播
  },
  watch: {
    activeIndex (newActiveIndex, oldActiveIndex) {
      // 监听activeIndex的变化，当activeIndex到达边界的时候进行复位
      if ((newActiveIndex === 1 && oldActiveIndex === (this.len - 1)) || (oldActiveIndex === 0 && newActiveIndex === this.len - 2)) {
        this.isResetIndex = true
        return
      }
      this.isResetIndex = false
      this.isTransitioning = true // 为true时表示正在进行transition过渡中，不可以进行切换轮播
      setTimeout(() => {
        // 瞬间归位需要取消transition过渡
        // 以下两种情况是瞬间归位时activeIndex变化
        if (this.activeIndex === 0) {
          this.activeIndex = this.len - 2
        } else if (this.activeIndex === (this.len - 1)) {
          this.activeIndex = 1
        }
        this.isTransitioning = false // 为false时表示transition过渡结束，可以进行切换轮播
      }, this.transitionInterval)
    }
  }
}
</script>

<style lang="css" scoped>
.carousel {
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}
.carousel:hover .prev,
.next {
  display: block;
}

.imgs-container {
  height: 100%;
}

.img-item {
  display: inline-block;
  width: 100%;
  height: 100%;
  background: #ccc no-repeat center/cover;
  line-height: 16;
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  font-size: 30px;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.7);
  text-align: center;
  font-weight: 200;
  line-height: 80px;
}
.prev {
  left: 4%;
}
.next {
  right: 4%;
}
.dots {
  display: table;
  margin: 0 auto;
  transform: translateY(-200%);
}
.dot {
  width: 12px;
  display: inline-block;
  box-sizing: border-box;
  width: 15px;
  height: 2px;
  margin-right: 6px;
  border: 2px solid transparent;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.5);
  cursor: pointer;
}
.dot:last-child {
  margin-right: 0px;
}
.active-dot {
  background-color: rgba(122, 117, 117, 0.8);
  transition: 500ms;
}
</style>
