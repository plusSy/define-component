<template>
  <div class="ocj-filter" id="filterLoop" ref="filterLoop">
    <div :class="['filter-config']" id="filterRefs" ref="filterRefs">
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
    <div>
      <slot></slot>
      <div class="lodeMore" v-if="isBottom">
        -- 加载更多 --
      </div>
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
    },
    /**
     * 范围 (缺省范围)
    */
    range: {
      type: [String, Number],
      default: 15
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
      scrollY: 0,
      windowHeight: 0,
      filterLoopHeight: 0,
      offsetTop: 0,
      pageYOffset: 0,
      loop: false
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
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
    this.getDomSize()
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
    window.removeEventListener('resize', this.handleResize)
  },
  computed: {
    filterStyle () {
      return {
        fontSize: this.fontSize + 'px',
        fontColor: this.fontColor
      }
    },
    currentOffset () {
      return this.$refs.filterRefs.offsetTop
    },
    // 是否触底
    isBottom () {
      return this.offsetY < Number(this.range)
    },
    // Y方向偏移量
    offsetY () {
      return this.filterLoopHeight + this.offsetTop - this.windowHeight - this.pageYOffset
    }
  },
  methods: {
    // 监听scroll
    handleScroll () {
      this.scrollY = window.scrollY - this.offsetTop
      this.pageYOffset = window.pageYOffset
      // 吸顶状态确认
      this.ceil = (window.scrollY - this.offsetTop) > -this.range
      // 加载更多状态确认
      this.loop = this.isBottom
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
    },
    // 计算屏幕高度
    handleResize () {
      this.windowHeight = window.innerHeight
      this.getDomSize()
    },
    // 获取dom的大小
    getDomSize () {
      setTimeout(() => {
        this.filterLoopHeight = document.getElementById('filterLoop').offsetHeight
        this.offsetTop = document.getElementById('filterRefs').offsetTop
      }, 0)
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
.filter-icon{
  width: 10px;
  height: 13px;
  position: absolute;
  /* right: 23%; */
  margin-left: 5px;
}
.lodeMore{
  margin-bottom: 20px;
  width: 100%;
}
</style>
