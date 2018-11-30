<template>
  <div id="header" :style="{backgroundColor: this.bgColor,color: this.color}">
    <span class="leftIncon">
      <img v-if="showMenu" src="../asserts/images/caidan.png" @click="menuHandler"/>
    </span>
    <span class="header-title">
      <slot></slot>
    </span>
    <span class="rightIncon">
      <img v-if="showSearch" src="../asserts/images/sousuo.png"  @click="searchHandler"/>
      <img v-if="showFilter" src="../asserts/images/shaixuan.png"  @click="filterHandler"/>
      <img v-if="showMore" src="../asserts/images/more.jpg"  @click="moreHandler"/>
    </span>
  </div>
</template>
<script>
  export default {
    name: 'ocjHeader',
    props: {
      bgColor: {
        type: String,
        default: () => {
          return '#304269'
        }
      },
      color: {
        type: String,
        default: () => {
          return '#ffffff'
        }
      },
      /**
       * 是否显示菜单功能
       */
      showMenu: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      /**
       * 是否显示搜索功能
       */
      showSearch: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      /**
       * 是否显示过滤功能
       */
      showFilter: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      /**
       * 是否显示更多功能
       */
      showMore: {
        type: Boolean,
        default: () => {
          return true
        }
      },
    },
    methods: {
      menuHandler() {
        this.$emit('headerMenuHandler');
      },
      searchHandler() {
        this.$emit('headerSearchHandler');
      },
      filterHandler() {
        this.$emit('headerFilterHandler');
      },
      moreHandler() {
        /**
         * TODO 更多操作按钮
         */
      }
    }
  }
</script>
<style lang="less" scoped>
  #header {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding: 0 5px 0 15px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 999;
    >.leftIncon {
      // left: 15px;
      // position: absolute;
      display: flex;
      flex: 1;
      > img {
        margin-right: 5px;
        width: 22px;
        height: 22px;
      }
    }
    >.rightIncon {
      // right: 15px;
      // position: absolute;
      display: flex;
      flex: 1;
      justify-content: flex-end;
      > img {
        margin-right: 10px;
        width: 22px;
        height: 22px;
      }
    }
  }
</style>