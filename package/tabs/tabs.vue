<template>
  <div class="ocjTabs"
        ref="ocjTabs"
      :class="{'scrollable': scrollable, 'sticky': sticky}"
      :style="{backgroundColor: bgColor}"
  >
    <slot></slot>
    <!-- <div 
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
    </div> -->
    <div ref="activeLine" class="active-line"></div>
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
        type: String
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
       * 未选中字体颜色， 默认：#333333
       */
      color: {
        type: String,
        default: () => {
          return '#333333'
        }
      },
      /**
       * 选中的字体颜色， 默认：#5481E2
       */
      activeColor: {
        type: String,
        default: () => {
          return '#5481E2'
        }
      },
      /**
       * 禁用标签字体颜色， 默认 #999999
       */
      disabledColor: {
        type: String,
        default: () => {
          return '#999999'
        }
      }
    },
    computed: {
      count() {
        return this.tabs.length
      }
    },
    data() {
      return {
        tabs: []
        // newTab: ''
      }
    },
    mounted() {
      this.initTab()
      // this.newTab = this.currentTab
    },
    methods: {
      /**
       * 初始化
       */
      initTab() {
        this.tabs.map(tab => {
            let width = this.scrollable ? '22%' : (100 / this.count) + '%';
            tab.$el.style.width = width;
            if (tab.disabled) {
              tab.$el.style.color = this.disabledColor;
            } else {
              tab.$el.style.color = this.color;
            }
            if (tab.value === this.currentTab) {
              this.updateTabHandler(tab.$el, tab.value);
            } 
        });
        /**
         * 没有选中tab,默认选中第一个tab
         */
        if (!this.currentTab) {
          let node = this.tabs[0].$el;
          this.updateTabHandler(node, this.tabs[0].value);
        }
      },
      /**
       * @desc tab的点击
       */
      updateTabHandler(el, value) {
        let scrollLeft = this.$refs.ocjTabs.scrollLeft;
        let rect = el.getBoundingClientRect();
        // todo 下划线移动
        let offsetLeft = rect.left;
        this.tabs.map(tab => {
            tab.$el.className = 'tab-item';
            if (tab.disabled) {
              tab.$el.style.color = this.disabledColor;
            } else {
              tab.$el.style.color = this.color;
            }
        });
        let className = el.className;
        if (className.indexOf('tab-isactive') === -1) {
          el.className = className + " " + "tab-isactive";
          el.style.color = this.activeColor;
        }
        this.$refs.activeLine.style.width = (rect.width - 40) + 'px';
        this.$refs.activeLine.style.transform = `translateX(${offsetLeft + 20 + scrollLeft}px)`
        this.$emit('tab-click', value)
      },
      /**
       * @params tab {title,value,disabled} 选中的页签
       * 将选中的页签emit出去
       */
      handleClick(tab) {
        if(tab.disabled) {
          return
        }
        this.$emit('onClick', tab)
        // this.newTab = tab.value
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
    .active-line {
      position: absolute;
      bottom: 0;
      border: 1px solid #5481E2;
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