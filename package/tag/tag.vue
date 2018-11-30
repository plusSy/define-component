<template>
  <div
      :class="`ocj-tag ${textClass}`"
      :style="contentStyle"
      @click="click"
    >
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'OcjTag',
  props: {
    // 标签类型 square(方形) | circle(圆形) | image(图片) | graphic(图文混合)
    type: {
      type: String,
      default: 'square'
    },
    // 内容样式
    textClass: {
      type: String,
      default: ''
    },
    // 背景颜色
    color: {
      type: String,
      default: '#F26459'
    },
    // 边角
    radius: {
      type: [Number, String],
      default: 0
    },
    // 填充
    padding: {
      type: String,
      default: ''
    },
    // 字体大小
    fontSize: {
      type: [Number, String],
      default: 11
    },
    // 字体颜色
    fontColor: {
      type: String,
      default: '#ffffff'
    },
    // 位置 start | center | end
    placement: {
      tyoe: String,
      default: 'start'
    },
    // tag排列顺序,数值越小，排列越靠前，默认为0
    order: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    contentStyle () {
      let { type, padding, radius, color, fontSize, fontColor, placement, order } = this
      return {
        display: 'inline-block',
        padding: type === 'image' ? '' : padding,
        borderRadius: type === 'image' ? '' : radius + 'px',
        backgroundColor: type === 'image' ? '' : color,
        fontSize: type === 'image' ? '' : fontSize + 'px',
        color: type === 'image' ? '' : fontColor,
        alignSelf: placement === 'center' ? placement : 'flex-' + placement,
        order: order
      }
    }
  },
  methods: {
    click (event) {
      this.$emit('click', event)
    }
  }
}
</script>
