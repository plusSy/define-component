<template>
  <div id="footer">
    <div class="footer-container" v-if="analysisList && !this.$slots.custom" :style="{backgroundColor: bgColor}">
      <span v-for="(tab, idx) in analysisList" :key="'tab' + idx" @click="tabHandler(tab, idx)">
          <img :src="selectedTabIdx === idx ? (tab.selectedIconPath ? tab.selectedIconPath : tab.iconPath)  : tab.iconPath" v-if="tab.iconPath"/>
          <div :style="{color: selectedTabIdx === idx ? selectedColor : color}">{{tab.text}}</div>
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
          return undefined
        } else {
          return this.list.slice(0, 5)
        }
      }
    },
    data() {
      return {
        selectedTabIdx: 0
      }
    },
    methods: {
      tabHandler(tab, idx) {
        this.$emit('footerTab', tab)
        this.selectedTabIdx = idx
        console.log('tab' + JSON.stringify(tab))
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
      img {
        width: 20px;
        height: 20px;
      }
    }
    img {
        width: 20px;
        height: 20px;
    }
  }
</style>