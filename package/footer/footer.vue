<template>
  <div id="footer">
    <div class="footer-container" v-if="analysisList && !this.$slots.custom" :style="{backgroundColor: bgColor}">
        <span v-for="(tab, idx) in analysisList" :key="'tab' + idx" @click="tabHandler(tab, idx)">
          <img :src="selectedTabIdx === idx ? (tab.selectedIconPath ? tab.selectedIconPath : tab.iconPath)  : tab.iconPath" v-if="tab.iconPath"/>
          <div :style="{color: selectedTabIdx === idx ? selectedColor : color}">{{tab.text}}</div>
        </span>
        <span v-if="moreList.length > 0">
          <ocj-popover :value="popoverVisible" placement="bottom-end">
            <div class="more-tab">
                <div class="more-tab-item" v-for="(tab, idx) in moreList" :key="'moretab' + idx" @click="moreTabHandler(tab)">
                  <img :src="tab.iconPath" v-if="tab.iconPath">
                  <span>{{tab.text}}</span>
                </div>
            </div>
            <div slot="content" @click="toggleMore()">
              <img src="../asserts/images/footerMore.png"/>
              <div>更多</div>
            </div>
          </ocj-popover>
        </span>
    </div>
    <slot name="custom" v-if="this.$slots.custom"></slot>
  </div>
</template>
<script>
  export default {
    name: 'ocjFooter',
    props: {
      /**
       * tab上的文字默认颜色，仅支持十六进制颜色
       */
      color: {
        type: String,
        default: () => {
          return '#333333'
        }
      },
      /**
       * tab上的文字选中的颜色
       */
      selectedColor: {
        type: String,
        default: () => {
          return '#5481E2'
        }
      },
      /**
       * tab的背景颜色，仅支持十六进制
       */
      bgColor: {
        type: String,
        default: () => {
          return '#F8F8F8'
        }
      },
      /**
       * tab的列表，最少2个、最多5个tab
       * list属性说明{text,iconPath,selectedIconPath}
       * click事件 将当前list属性$emit
       */
      list: {
        type: Array
      }
    },
    computed: {
      analysisList: function() {
        if (!this.list) {
          return []
        } else if (this.list.length < 6){
          return this.list
        } else if (this.list.length > 5) {
          return this.list.slice(0, 4)
        }
      },
      moreList: function() {
        if (!this.list) {
          return []
        } else if (this.list.length < 6){
          return []
        } else if (this.list.length > 5) {
          return this.list.slice(4)
        }
      }
    },
    data() {
      return {
        selectedTabIdx: 0,
        popoverVisible: false
      }
    },
    methods: {
      tabHandler(tab, idx) {
        this.$emit('footerTab', tab)
        this.selectedTabIdx = idx
        this.popoverVisible = false
      },
      moreTabHandler(tab) {
        this.$emit('footerTab', tab)
        this.toggleMore()
      },
      toggleMore() {
         this.popoverVisible = !this.popoverVisible;
      }
    }
  }
</script>
<style lang="less" scoped>
  #footer {
    width: 100%;
    height: 46px;
    display: flex;
    align-items: center;
    justify-content:space-around;
    font-family: PingFangSC-Light;
    font-size: 12px;
    position: fixed;
    bottom: 0;
    z-index: 999;
    .footer-container {
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content:space-around;
      font-family: PingFangSC-Light;
      font-size: 12px;
      >span{
        display: inline-block;
      }
      img {
        width: 20px;
        height: 20px;
      }
    }
    img {
        width: 20px;
        height: 20px;
    }
    .more-tab-item {
      display: flex;
      height: 30px;
      border-bottom: 1px solid #e0e0e0;
      align-items: center;
      justify-content: space-around;
    }
  }
</style>