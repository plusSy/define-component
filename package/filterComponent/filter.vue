<template>
  <div class="ocj-filter">
    <div :class="[ ceil ? 'ceil-filter': 'unCell-filter', 'filter-config']" ref="filterRefs">
      <div v-for="(item, index) in localData" :key="index" class="filter-item" :style="`color: ${item.isActive ? activeColor : ''};${filterStyle}`" @click="changeSort(item, index)">
        <template v-if="item.type === 'normal'">
          {{ item.label }}
        </template>
        <template v-else-if="item.type === 'sort'">
          {{ item.label }}
          <template v-if="item.status === sortConfig.asc">
            <img :src="sortUpImg" @click="changeSort(item, index)" class="filter-icon">
          </template>
          <template v-else-if="item.status === sortConfig.desc">
            <img :src="sortDownImg" @click="changeSort(item, index)" class="filter-icon">
          </template>
          <template v-else>
            <img :src="sortDisImg" @click="changeSort(item, index)" class="filter-icon">
          </template>
        </template>
        <template v-else-if="item.type === 'filter'">
          {{ item.label }} {{ scrollY }}
          <img :src="fillImg" class="filter-icon">
        </template>
      </div>
    </div>
    <div :class="{'ceil-goods': ceil}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OcjFilter',
  props: {
    // 过滤器数据配置
    filterConfig: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 默认值
    active: {
      type: String,
      default: ''
    },
    // 激活文字的颜色
    activeColor: {
      type: String,
      default: '#f0655d'
    },
    // font-size
    fontSize: {
      type: [String, Number],
      default: 13
    },
    // font-color
    fontColor: {
      type: String,
      default: '#666'
    },
    // 是否吸顶
    stick: {
      type: Boolean,
      default: false
    },
    // 排序配置
    sortConfig: {
      type: Object,
      default: () => {
        return {
          asc: 'asc',
          desc: 'desc'
        }
      }
    }
  },
  data () {
    return {
      sortDisImg: require('../asserts/images/disSort.png'),
      sortUpImg: require('../asserts/images/top.png'),
      sortDownImg: require('../asserts/images/down.png'),
      fillImg: require('../asserts/images/fill.png'),
      localData: [],
      ceil: false,
      scrollY: 0
    }
  },
  created () {
    this.localData = this.filterConfig.map(item => {
      item.isActive = item.value === this.active
      item.status = item.type === 'sort' && item.isActive ? this.sortConfig.asc : ''
      return item
    })
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  computed: {
    filterStyle () {
      return {
        fontSize: this.fontSize + 'px',
        fontColor: this.fontColor
      }
    },
    currentOffect () {
      return this.$refs.filterRefs.offsetTop
    }
  },
  methods: {
    // 监听scroll
    handleScroll () {
      let oldOffect = this.currentOffect
      let scrollY = window.scrollY - oldOffect
      this.scrollY = scrollY
      if (this.stick) {
        if (scrollY > 0 || scrollY === 0) {
          this.ceil = true
        } else {
          this.ceil = false
        }
      } else {
        this.ceil = false
      }
    },
    // 改变选项
    changeSort (cell, index) {
      let obj = {}
      this.localData = this.localData.map(item => {
        item.isActive = item.value === cell.value
        if (item.isActive) {
          if (item.type === 'sort') {
            item.status = item.status === this.sortConfig.asc ? this.sortConfig.desc : this.sortConfig.asc
          }
          obj = item
        } else {
          item.status = item.type === 'sort' ? '' : item.status
        }
        return item
      })
      let status = obj.type === 'sort' ? { status: obj.status } : {}
      this.$emit('changeSort', {label: obj.label, value: obj.value, type: obj.type, ...status})
    }
  }

}
</script>

<style lang="css" scoped>
.ocj-filter{
  background-color: #ffffff;
}
.filter-config{
  width: 100%;
  height: 40px;
  background-color: #fcfcfc;
  display: flex;
  display: -webkit-flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid #f3f3f3;
}
.filter-item{
  flex-grow: 1;
  position: relative;
}
.ceil-filter::before{
  content: '别拉了, 快松手!';
  width: 100%;
  height: 20px;
  background-color: #ffffff;
  position: absolute;
  top: -20px;
  line-height: 20px;
}
.ceil-filter{
  position: fixed;
  top: 0px;
  background-color: #fff;
  z-index: 1;
}
.unCell-filter{
  position: static;
  z-index: 0;
}
.filter-icon{
  width: 10px;
  height: 13px;
  position: absolute;
  /* right: 23%; */
  margin-left: 5px;
}
.ceil-goods{
  padding-top: 40px;
}
</style>
