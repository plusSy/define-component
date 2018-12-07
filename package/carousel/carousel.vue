<template>
  <div class="groups" ref="groups" :style="`height: ${height}px;`">
    <div :class="['group']" :style="groupStyle">
      <div
        :style="slideStyle"
        @touchstart="onTouchstart"
        @touchmove="onTouchmove"
        @touchend="onTouchend">
        <div v-for="(item, key) in localData" :key="key" :style="groupItemStyle">
          <img :style="imgStyle" :src="item.src" alt="">
        </div>
      </div>
    </div>
    <template v-if="controllable">
      <div class="prev" @click="prev" onselectstart="return false">&lt;</div>
      <div class="next" @click="next" onselectstart="return false">&gt;</div>
    </template>
    <template v-if="showDocts">
      <ul class="dots" @click="activeDotFn">
        <li
          class="dot"
          v-for="n in (len - 2)"
          :key="n"
          :data-dot-index="n"
          :class="{'active-dot': activeIndex === n || (activeIndex === (len-1) && n === 1) || (activeIndex === 0 && n === (len - 2))}"
        ></li>
      </ul>
    </template>
  </div>
</template>
<script>
import TouchHelper from '../utils/touch'

export default {
  name: 'OcjCarousel',
  data () {
    return {
      transformX: 0,
      continueAnimate: true,
      touchStartX: 0,
      touchMoveX: 0,
      touchStartLeft: 0,
      touchFount: true, // true index 减小 往前 手指往右 false index 增加 往后 手指往左
      groupWidth: 0,
      groupHeight: 0,
      activeIndex: 0,
      localData: [],
      timer: null,
      isTransitioning: false // 是否正在过度动画
    }
  },
  computed: {
    $Touch () {
      return new TouchHelper()
    },
    len () {
      return this.localData.length
    },
    groupStyle () {
      return {
        fontSize: '16px',
        width: (this.len * this.groupWidth) + 'px',
        height: this.groupHeight || this.height + 'px'
      }
    },
    groupItemStyle () {
      return {
        width: this.groupWidth + 'px',
        display: 'inline-block',
        lineHeight: this.groupHeight + 'px',
        height: this.groupHeight || this.height + 'px'
      }
    },
    slideStyle () {
      return {
        transition: `${this.continueAnimate ? this.interval / 1000 : 0}s ease`,
        transform: `translate3d(${this.transformX}px , 0px, 0px)`
      }
    },
    imgStyle () {
      return {
        width: this.groupWidth + 'px',
        height: this.groupHeight || this.height + 'px',
        display: 'inline-block'
      }
    }
  },
  props: {
    injectData: {
      type: Array,
      default: () => {
        return []
      }
    },
    controllable: {
      type: Boolean,
      default: false
    },
    // 步进个数
    step: {
      type: [Number],
      default: 1
    },
    showDocts: {
      type: Boolean,
      default: true
    },
    // 当前第几页
    currentPage: {
      type: [String, Number],
      default: 3
    },
    // 定时间隔
    interval: {
      type: [Number, String],
      default: 500
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: 150
    }
  },
  created () {
    this.init()
    this.activeIndex = this.currentPage
  },
  mounted () {
    this.groupWidth = this.$refs.groups.offsetWidth
    this.groupHeight = this.$refs.groups.offsetHeight
    this.transformX = -this.activeIndex * this.groupWidth * 1
    this.startInterval()
  },
  methods: {
    init () {
      this.localData = [this.injectData[this.injectData.length - 1]].concat(this.injectData, [this.injectData[0]])
    },
    // 阻止事件冒泡
    prevent (e) {
      e.stopImmediatePropagation()
      e.stopPropagation()
    },
    onTouchstart (event) {
      if (this.isTransitioning) return
      if (this.timer) clearInterval(this.timer)
      this.$Touch.touchStart(event)
      // alert('start ---')
      // 停止动画
      this.continueAnimate = false
      this.touchStartX = this.$Touch.startX
      this.touchStartLeft = this.transformX
    },
    onTouchmove (event) {
      if (this.isTransitioning) return
      this.$Touch.touchMove(event)
      this.touchMoveX = this.$Touch.deltaX
      this.touchFount = this.touchMoveX > 0
      this.transformX = this.touchStartLeft + this.touchMoveX
    },
    onTouchend (event) {
      let moveX = this.$Touch.offsetX
      let w = event.target.offsetWidth
      // 移动长度限定
      if (moveX > w * 0.25) {
        if (this.touchFount) {
          this.activeIndex -= Math.ceil(Number(moveX / w))
          if (this.activeIndex < 0) {
            this.activeIndex = 0
          }
        } else {
          this.activeIndex += Math.ceil(Number(moveX / w))
          if (this.activeIndex > this.len - 1) {
            this.activeIndex = Number(this.len - 1)
          }
        }
      }
      // 开放延迟动画
      this.continueAnimate = true
      this.stepMove()
      // 自动播放
      this.startInterval()
    },
    stepMove () {
      let w = this.groupWidth
      this.transformX = 0 - (this.activeIndex * w)
      this.touchMoveX = 0
    },
    // 上一步
    prev () {
      if (this.isTransitioning) return
      this.activeIndex -= this.step
      this.continueAnimate = this.activeIndex > 0
      if (this.activeIndex < 0) {
        this.activeIndex = this.len - 1
      }
      this.startInterval()
    },
    // 下一步
    next () {
      if (this.isTransitioning) return
      this.activeIndex = this.activeIndex + this.step
      this.continueAnimate = this.activeIndex < this.len
      if (this.activeIndex > this.len - 1) {
        this.activeIndex = 0
      }
      this.startInterval()
    },
    // dot 切换item
    activeDotFn (e) {
      if (this.isTransitioning) return
      if (this.timer) clearInterval(this.timer)
      if (e.target.tagName.toLowerCase() === 'li') {
        let index = parseInt(e.target.getAttribute('data-dot-index'))
        this.activeIndex = index
      }
      this.startInterval()
    },
    // 自动轮播
    startInterval () {
      if (this.timer) clearInterval(this.timer)
      if (this.autoPlay) {
        this.timer = setInterval(() => {
          this.activeIndex++
        }, this.interval)
      }
    }
  },
  beforeDestory () {
    clearInterval(this.timer)
  },
  watch: {
    activeIndex (newIdx, oldIdx) {
      // 页面初始化 | loop时候 取消动画
      if ((newIdx === 1 && oldIdx === (this.len - 1)) || (oldIdx === 0 && newIdx === this.len - 2) || (newIdx === this.currentPage && oldIdx === 0)) {
        this.continueAnimate = false
        return
      }
      this.continueAnimate = true
      this.isTransitioning = true
      this.stepMove()
      setTimeout(() => {
        if (this.activeIndex === 0) {
          this.activeIndex = this.len - 2
          this.transformX = -this.activeIndex * this.groupWidth * 1
        } else if (this.activeIndex === (this.len - 1)) {
          this.activeIndex = 1
          this.transformX = -this.activeIndex * this.groupWidth * 1
        }
        this.isTransitioning = false
      }, this.interval)
    }
  }
}
</script>
<style lang="css" scoped>
.groups{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.group{
  height: 100%;
}
.prev,.next {
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
  background-color:red;
  transition: 200ms;
}
.image-class{

}
</style>
