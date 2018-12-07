<template>
    <div class="card-swipe">
      <div
        :style="trackStyle"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @transitionend="onTransitionend"
      >
        <slot />
      </div>
      <slot name="indicator">
        <div
          v-if="showIndicators && count > 1"
        >
          <i
            v-for="index in count"
            class="indicator"
            :class="[{ active: index - 1 === activeIndicator }, indicatorClass]"
            :key="index"
          />
        </div>
      </slot>
    </div>
</template>
<script>
  import touchHelper from '../utils/touch.js'
  export default {
    name: 'ocjCardSwipe',
    props: {
      /**
       * 容器宽度
       */
      width: [Number, String],
      /**
       * 容器高度
       */
      height: [Number, String],
      /**
       * 是否纵向滑动
       */
      vertical: Boolean,
      /**
       * 当前第几个位置
       */
      initialSwipe: {
        type: Number,
        default: 0
      },
      /**
       * 滑动的动画时间
       */
      duration: {
        type: Number,
        default: 500
      },
      /**
       * 滑动阀值 默认：100
       */
      threshold: {
        type: Number,
        default: 100
      },
      /**
       * 是否显示指示器，默认：false
       */
      showIndicators: {
        type: Boolean,
        default: false
      },
      /**
       * 显示指示器的自定义样式
       */
      indicatorClass: {
        type: String
      },
      /**
       * 是否循环滑动
       */
      loop: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        computedWidth: 0,
        computedHeight: 0,
        deltaLength: 0,
        offset: 0,
        active: 0,
        swipes: [],
        swiping: false
      }
    },
    computed: {
      $touch() {
        return new touchHelper()
      },
      count() {
        return this.swipes.length;
      },
      size() {
        return this[this.$touch.vertical ? 'computedHeight' : 'computedWidth'];
      },
      trackSize() {
        return this.count * this.size;
      },
      trackStyle() {
        const mainAxis = this.vertical ? 'height' : 'width';
        const crossAxis = this.vertical ? 'width' : 'height';
        return {
          [mainAxis]: `${this.trackSize}px`,
          [crossAxis]: this[crossAxis] ? `${this[crossAxis]}px` : '',
          transitionDuration: `${!this.swiping ? 0 : this.duration}ms`,
          // animation: `${this.deltaLength > 0 ? 'rotateInDownRight '+this.duration+'ms' : ('rotateInDownLeft '+this.duration+'ms')}`,
          transform: `translate${this.vertical ? 'Y' : 'X'}(${this.offset}px)`
        }
      },
      activeIndicator() {
        return (this.active + this.count) % this.count;
      }
    },
    mounted() {
      this.initialize()
    },
    methods: {
      initialize(active = this.initialSwipe) {
        if (this.$el) {
          const rect = this.$el.getBoundingClientRect();
          this.computedWidth = this.width || rect.width;
          this.computedHeight = this.height || rect.height;
        }
        this.active = active;
        this.offset = this.count > 1 ? -this.size * this.active : 0;
        // this.swipes.forEach(swipe => {
        //   swipe.offset = 0;
        // });
      },
      // 切换卡片手势开始
      onTouchStart (event) {
        this.$touch.touchStart(event)
      },
      // 切换卡片手势移动
      onTouchMove (event) {
        this.$touch.touchMove(event)
        if ((this.$touch.vertical && this.$touch.direction === 'vertical') || this.$touch.direction === 'horizontal') {
          event.preventDefault()
          event.stopPropagation()
        }
      },
      // 切换卡片手势结束
      onTouchEnd (event) {
        let deltaLength = this.$touch.vertical ? this.$touch.deltaY : this.$touch.deltaX
        let offsetLength = this.$touch.vertical ? this.$touch.offsetY : this.$touch.offsetX
        if (deltaLength > 0 && offsetLength > this.threshold) {
          this.swiping = this.active !== 0
          this.active === 0 ? (this.loop ? this.active = this.count - 1 : this.active) : this.active--
        } else if (deltaLength < 0 && offsetLength > this.threshold) {
          this.swiping = this.active !== this.count - 1
          this.active === this.count - 1 ? (this.loop ? this.active = 0 : this.active) : this.active++
        }
        this.move()
      },
      move(offset = 0) {
        this.offset = offset - this.active * this.size;
      },
      onTransitionend() {
        this.$emit('change', this.activeIndicator)
      }
    }
  }
</script>
<style lang="less" scoped>
  .card-swipe {
    overflow: hidden;
    position: relative;
    user-select: none;
    .indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 1px solid #e0e0e0;
      display: inline-block;
      margin-right: 5px;
    }
    .active{
      background-color: #e0e0e0;
    }
  }

  @-webkit-keyframes rotateInDownLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes rotateInDownLeft {
  from {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: rotate3d(0, 0, 1, -45deg);
    transform: rotate3d(0, 0, 1, -45deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: left bottom;
    transform-origin: left bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.rotateInDownLeft {
  -webkit-animation-name: rotateInDownLeft;
  animation-name: rotateInDownLeft;
}

@-webkit-keyframes rotateInDownRight {
  from {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: rotate3d(0, 0, 1, 45deg);
    transform: rotate3d(0, 0, 1, 45deg);
    opacity: 0;
  }

  to {
    -webkit-transform-origin: right bottom;
    transform-origin: right bottom;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@keyframes rotateInDownRight {
    from {
      -webkit-transform-origin: right bottom;
      transform-origin: right bottom;
      -webkit-transform: rotate3d(0, 0, 1, 45deg);
      transform: rotate3d(0, 0, 1, 45deg);
      opacity: 0;
    }

    to {
      -webkit-transform-origin: right bottom;
      transform-origin: right bottom;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  .rotateInDownRight {
    -webkit-animation-name: rotateInDownRight;
    animation-name: rotateInDownRight;
  }
</style>