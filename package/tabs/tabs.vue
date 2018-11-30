<template>
  <div class="ocjTabs"
      :class="{'scrollable': scrollable, 'sticky': sticky}"
      :style="{backgroundColor: bgColor}"
  >
    <div 
      class="tabs__items"
      :style="{
        width: scrollable ? '22%' : 100/(tabs.length)+'%', 
        color: newTab === tab.value ? activeColor : tab.disabled ? disabledColor : color}"
      v-for="(tab, idx) in tabs"
      :ref="tab.value"
      :key="idx"
      @click="handleClick(tab)"
    >
      <span class="tab__items__title" 
        :style="{
          borderBottom: newTab === tab.value ? '2px solid'+activeColor : ''
        }">{{tab.title}}</span>
      <span class="tab__items__gap" :style="{width: '100%'}" v-if="idx !== tabs.length-1"></span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'ocjTabs',
    props: {
      /**
       * 当前选中tab, value
       */
      currentTab: {
        type: String,
        required: true
      },
      /**
       * 全部tab集 [{title, value, disabled}]
       */
      tabs: {
        type: Array,
        required: true
      },
      /**
       * 标签太多是否允许滚动，默认：false
       */
      scrollable: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      /**
       * 是否吸顶， 默认：false
       */
      sticky: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      /**
       * 背景颜色: 默认： 
       */
      bgColor: {
        type: String,
        default: () => {
          return '#ffffff'
        }
      },
      /**
       * 未选中字体颜色，默认：#333333
       */
      color: {
        type: String,
        default: () => {
          return '#333333'
        }
      },
      /**
       * 选中的字体颜色，默认：#5481E2
       */
      activeColor: {
        type: String,
        default: () => {
          return '#5481E2'
        }
      },
      /**
       * 禁用标签字体颜色，默认：
       */
      disabledColor: {
        type: String,
        default: () => {
          return '#999999'
        }
      }
    },
    data() {
      return {
        newTab: ''
      }
    },
    created() {
      this.newTab = this.currentTab
    },
    methods: {
      /**
       * @params tab {title,value,disabled} 选中的页签
       * 将选中的页签emit出去
       */
      handleClick(tab) {
        if(tab.disabled) {
          return
        }
        this.$emit('onClick', tab)
        this.newTab = tab.value
      },
    }
  }
</script>
<style lang="less" scoped>
  .ocjTabs {
    position: relative;
    display: flex;
    width: 100%;
    height: 44px;
    align-items: center;
    // justify-content: space-around;
    border-bottom: 1px solid #D9D9D9;
    border-top: 1px solid #D9D9D9;
    >.tabs__items {
      position: relative;
      display: inline-flex;
      flex-shrink: 0;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      // color: #333333;
      height: 100%;
      justify-content: center;
      
      >.tab__items__title{
        display: inline-flex;
        height: 100%;
        align-items: center;
        padding: 0 10px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        // border-right: 1px solid #d9d9d9;
      }
      >.tab__items__gap {
        position: absolute;
        width: 100%;
        height: 74%;
        top: 13%;
        left: 0;
        border-right: 1px solid #d9d9d9;
      }
    }
  } 
  .scrollable {
    overflow-x: scroll;
  }
  .scrollable::-webkit-scrollbar{
    display: none;
  }
  .sticky {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 99;
  }
</style>