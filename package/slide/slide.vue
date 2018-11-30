<template>
  <div class="slide">
    <div :class="['slide-groups', 'innerbox', {'showScroll': !showScroll}]">
      <div
        :style="trackStyle"
        class="slide-group"
        @click="handleClickItem"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slide',
  data () {
    return {
      width: 0,
      slideLen: 0
    }
  },
  props: {
    height: {
      type: [Number, String],
      default: 200
    },
    showScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
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
    }
  },
  mounted () {
    this.slideLen = this.$children.length
    this.width = this.$children[0].itemWidth
  },
  methods: {
    handleClickItem (e) {
      this.$emit('click', e)
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
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.8);
  background: rgba(0,0,0,0.8);
}
.innerbox::-webkit-scrollbar-track {/*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
  border-radius: 0;
  background: rgba(0,0,0,0.1);
}
.showScroll::-webkit-scrollbar{
  display: none;
}
</style>
