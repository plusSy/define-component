<template>
  <div class="list-item-wrapper" 
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
  > 
    <div class="list-item__container" :style="trackStyle">
      <slot></slot>
    </div>
    <div class="list-item__sliding" ref="sliding" :style="slidingStyle">
      <slot name="sliding"></slot>
    </div>
  </div>  
</template>
<script>
  import touch from '../mixins/touch.js'
  export default {
    name: 'ocjListItem',
    mixins: [touch],
    props: {
      /**
       * 是否允许列表元素滑动显示一系列的操作按钮
       * 默认： false
       */
      hasSliding: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      /**
       * 列表元素滑动的方向
       * 默认：left
       */
      slideDirection: {
        type: String,
        default: () => {
          return 'left'
        }
      }
    },
    computed: {
      trackStyle() {
        return {
          transitionDuration: '500ms',
          transform: `translateX(${this.trackWidth}px)`
        }
      },
      slidingStyle() {
        let style = {}
        if (this.slideDirection === 'left') {
          style.right = 0
        } else if (this.slideDirection === 'right') {
          style.left = 0
        }
        return style
      }
    },
    data() {
      return {
        slidingWidth: 0,
        trackWidth: 0
      }
    },
    methods: {
      getSlidingWidth() {
        if(this.$refs.sliding) {
          const rect = this.$refs.sliding.getBoundingClientRect();
          return rect.width
        } else {
          return 0
        }
      },
      onTouchStart(event) {
        this.touchStart(event)
      },
      onTouchMove() {
        if(!this.hasSliding) {
          return
        }
        this.touchMove(event)
        let deltaLength = this.deltaX
        let offsetLength = this.offsetX
        if (deltaLength < 0) {
          this.move(deltaLength)
        } else if (deltaLength > 0){
          this.move(deltaLength)
        }
        if ((this.vertical && this.direction === 'vertical') || this.direction === 'horizontal') {
          event.preventDefault()
          event.stopPropagation()
        }
      },
      move(deltaLength) {
        this.$nextTick(function() {
          this.slidingWidth = this.getSlidingWidth()
          if (this.slideDirection === 'left') {
            if (deltaLength < -this.slidingWidth) {
              this.trackWidth = -this.slidingWidth
            } else if (deltaLength > 0) {
              this.trackWidth = 0
            } else {
              this.trackWidth = Math.abs(deltaLength) > this.slidingWidth / 2 ? -this.slidingWidth : 0
            }
          } else if (this.slideDirection === 'right') { 
            if (deltaLength > this.slidingWidth) {
              this.trackWidth = this.slidingWidth
            } else if (deltaLength < 0) {
              this.trackWidth = 0
            } else {
              this.trackWidth = Math.abs(deltaLength) > this.slidingWidth / 2 ? this.slidingWidth : 0
            }
          }
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .list-item-wrapper {
    position: relative;
    display: block;
    overflow: hidden;
    width: 100%;
    border-bottom: 1px solid #d9d9d9;
    .list-item__container {
      position: relative;
      width: 100%;
      display: block;
      padding: 10px;
      background: #FFFFFF;
      text-align: left;
      z-index: 2;
    }
    .list-item__sliding {
      position: absolute;
      display: flex;
      z-index: 1;
      height: 100%;
      top: 0;
      // right: 0;
      -webkit-box-pack: end;
      justify-content: flex-end;
      align-items: center;
      background-color: #d9d9d9;
    }
    .list-item__sliding-active {
      display: flex!important;
    }
  }
</style>



