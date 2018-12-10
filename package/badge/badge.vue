<template>
  <span v-if="type === 'dot'" class="ocj-badge">
    <span :class="['dot', className ? className : '']" :style="styles" ref="badge"></span>
  </span>
  <span v-else-if="type === 'count'" class="ocj-badge">
    <span :class="['count', className ? className : '']" :style="styles" ref="badge">{{ countData }}</span>
  </span>
  <span v-else-if="type === 'text'" class="ocj-badge">
    <span :class="['text', className ? className : '']" :style="styles" ref="badge">{{ text }}</span>
  </span>
</template>

<script>
export default {
  name: 'OcjBadge',
  props: {
    /**
     * type:  badge 类型
     * dot | count | text
    */
    type: {
      type: String,
      default: 'text'
    },
    /**
     * 自定义类名
    */
    className: {
      type: String,
      default: ''
    },
    /**
     * 自定义背景色
    */
    backgroundColor: {
      type: String,
      default: '#f26459'
    },
    /**
     * 偏移
    */
    offset: {
      type: Array,
      default: () => { return [] }
    },
    /**
     * 数量
    */
    count: {
      type: [String, Number],
      default: 4
    },
    /**
     * 数量限制
    */
    overflowCount: {
      type: [String, Number],
      default: 99
    },
    /**
     * 展示文字
    */
    text: {
      type: String,
      default: ''
    },
    /**
     * 字体或者数字颜色
    */
    color: {
      type: String,
      default: '#ffffff'
    }
  },
  computed: {
    styles () {
      let style = {}
      if (this.offset && this.offset.length === 2) {
        style['margin-top'] = `${this.offset[0]}px`
        style['margin-right'] = `${this.offset[1]}px`
      }
      style['backgroundColor'] = this.backgroundColor
      style['color'] = this.color
      return style
    },
    countData () {
      if (this.text !== '') return this.text
      return parseInt(this.count) >= parseInt(this.overflowCount) ? `${this.overflowCount}+` : this.count
    }
  }
}
</script>

<style lang="css" scoped>
.ocj-badge{
  display: inline-block;
}
.dot{
  width: 12px;
  height: 12px;
  border-radius: 12px;
  border: 2px solid #ffffff;
}
.count{
  padding: 4px 5px;
  line-height: 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: normal;
}
.text{
  padding: 4px 5px;
  line-height: 8px;
  border-radius: 5px;
  border: 1px solid #ffffff;
  font-size: 12px;
  font-weight: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
