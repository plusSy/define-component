<template>
  <div class="ocjFilter">
    <section :class="[ ceil ? 'ceil-filter': 'unCell-filter', 'filter-title']" ref="filterRefs">
      <div class="filter-config" v-for="(cell, index) in filterConfig" :key="index" :style="`width: ${titleWidth}%`">
        <template v-if="cell.type === 'normal'">
          <template v-if="cell.sort === 'n'">
            <span :class="{'isActive' : cell.name === currentAct}" @click="changeSort(cell, index)">{{ cell.name }}</span>
          </template>
          <template v-if="cell.sort === 'y'">
            <span :class="{'isActive' : cell.name === currentAct}"  @click="changeSort(cell, index)">{{ cell.name }}</span>
            <template v-if="cell.activeTab.isActive === cell.activeTab.asc"><img :src="sortUpImg" @click="changeSort(cell, index)" class="filter-icon"></template>
            <template v-else-if="cell.activeTab.isActive === cell.activeTab.desc"><img :src="sortDownImg" @click="changeSort(cell, index)" class="filter-icon"></template>
            <template v-else><img :src="sortDisImg" @click="changeSort(cell, index)" class="filter-icon"></template>
          </template>
          <!-- <template v-if="cell.sort === 'filter'">
            <span :class="{'isActive' : cell.name === currentAct}" @click="changeSort(cell, index)">{{ cell.name }}</span>
          </template> -->
        </template>
        <template v-else>
          <span :class="{'isActive' : cell.name === currentAct}" @click="changeSort(cell, index)">{{ cell.name }}</span>
          <img :src="fillImg" @click="changeSort(cell, index)" class="filter-icon">
        </template>
      </div>
    </section>
    <section :class="[{'ceil-goods': ceil}, 'filter-goods']">
      <slot name="lists"></slot>
    </section>
  </div>
</template>

<script>
/**
* OcjFilter 筛选组件
* 功能:
*    1.提供可配置过滤条件  ---- filterConfig Array
*      [{ name: '销量', sort: 'n', type: 'normal', activeTab: { asc: '', desc: 'orderdesc', isActive: 'orderdesc' } }]
*      name: 展示的值;
*      sort: 'n' or 'y' 表示 是否提供排序;
*      type: 选项的类型, normal 表示一般过滤; filter 表示 筛选
*      activeTab 状态参数区分, asc: 升序的参数; desc: 降序的参数; isActive: 想外emit时所携带的参数
*    2.设置默认选中 ---- isActive String
*      :isActive="销量" 选中销量 但不触发过滤请求; 默认不选中
*    3.是否吸顶 ---- stick Boolean
*      :stick="true" true 吸顶 else 不吸顶 默认不吸顶
*    4.向外发射一个方法 ---- changeSort Function
*      params 为当前选中的对象; 对象中 isActive 为当前的排序状态返回参数
*    5.提供具名插槽 lists
*      <slot name="lists"></slot>
* 例子:
*   <OcjFilter :filterConfig="filterConfig" isActive="销量" :ceil="true" @changeSort="changeSort">
*     <template slot="lists">
*      <!-- 这里为 插入的内容 -->
*     </template>
*   </OcjFilter>
*
* 注意事项:
*   titleWidth: 根据filterConfig的个数来平均分的宽度,若包含图片,图片与字体间的宽度 还需各自调整
*/
export default {
  name: 'OcjFilter',
  data () {
    return {
      goods: [],
      sortDisImg: require('../asserts/images/disSort.png'),
      sortUpImg: require('../asserts/images/top.png'),
      sortDownImg: require('../asserts/images/down.png'),
      fillImg: require('../asserts/images/fill.png'),
      currentAct: this.isActive,
      ceil: false
    }
  },
  props: {
    filterConfig: {
      type: Array,
      default: () => {
        return []
      }
    },
    isActive: {
      type: String
    },
    stick: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    titleWidth () {
      let goodsLength = this.filterConfig.length
      return Math.round(100 / goodsLength * 100) / 100.00
    },
    currentOffect () {
      return this.$refs.filterRefs.offsetTop
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let oldOffect = this.currentOffect
      let scrollY = window.scrollY - oldOffect

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
    changeSort: function (cell, index) {
      this.currentAct = cell.name
      if (cell.sort === 'n') {
        this.filterConfig.map((item, index) => {
          if (item.sort === 'y') item.activeTab.isActive = ''
        })
        this.$emit('changeSort', cell)
      } else if (cell.sort === 'filter') {
        this.filterConfig.map((item, index) => {
          if (item.sort === 'y') item.activeTab.isActive = ''
        })
        this.$emit('changeSort', cell)
      } else {
        this.filterConfig.map((item, idx) => {
          if (item.sort === 'y' && index !== idx) item.activeTab.isActive = ''
        })
        this.filterConfig[index].activeTab.isActive = cell.activeTab.isActive === '' || cell.activeTab.isActive === cell.activeTab.desc ? cell.activeTab.asc : cell.activeTab.desc
        this.$emit('changeSort', cell)
        this.$forceUpdate()
      }
    }
  }
}

</script>

<style lang="css" scoped>
.ceil-filter::before{
  content: '别拉了, 快松手!';
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  position: absolute;
  top: -200px;
  line-height: 270px;
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
.filter-title{
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f2f2f2;
}
.filter-config{
  height: 40px;
  line-height: 40px;
  display: inline-block;
  position: relative;
}
.filter-icon{
  width: 10px;
  height: 13px;
  position: absolute;
  top: 13px;
  right: 23%;
}
.ocjFilter{
  width: 100%;
  background-color: #fff;
}
.ceil-goods{
  padding-top: 40px;
}
.isActive{
  color: #f0655d;
}
</style>
