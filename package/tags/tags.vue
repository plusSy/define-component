<template>
  <div
    class="ocj-tags"
    :style="tagsStyle"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OcjTags',
  data () {
    return {
      parentElement: {}
    }
  },
  props: {
    // 主轴的方向 row | column
    direction: {
      type: String,
      default: 'row'
    },
    // 主轴上的对齐方式 start | center | end
    justifyContent: {
      type: String,
      default: 'start'
    },
    // 交叉轴上的对齐方式 start | center | end
    alignItems: {
      type: String,
      default: 'start'
    }
  },
  mounted () {
    this.parentElement = this.$el ? this.$el.parentElement : {}
  },
  computed: {
    tagsStyle () {
      let { direction, justifyContent, alignItems, parentElement: { offsetHeight, offsetWidth, offsetTop, offsetLeft } } = this
      return {
        width: offsetWidth + 'px',
        height: offsetHeight + 'px',
        position: 'absolute',
        top: offsetTop + 'px',
        left: offsetLeft + 'px',
        display: 'flex',
        flexDirection: direction,
        justifyContent: justifyContent === 'center' ? justifyContent : 'flex-' + justifyContent,
        alignItems: alignItems === 'center' ? alignItems : 'flex-' + alignItems
      }
    }
  }
}
</script>
