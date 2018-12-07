<template>
  <div id="header" :style="{backgroundColor: this.bgColor,color: this.color}">
    <div class="header-container" v-if="!showSearchBar">
      <span class="leftIncon">
        <img v-if="showMenu" src="../asserts/images/caidan.png" @click="menuHandler"/>
      </span>
      <span class="header-title">
        <slot></slot>
      </span>
      <span class="rightIncon">
        <img v-if="showSearch" src="../asserts/images/sousuo.png"  @click="searchHandler"/>
        <img v-if="showFilter" src="../asserts/images/shaixuan.png"  @click="filterHandler"/>
        <ocj-popover :value="popoverVisible" placement="top-end">
           <slot name="more"></slot>
           <div slot="content">
             <img v-if="showMore" src="../asserts/images/more.jpg"  @click="moreHandler"/>
           </div>
        </ocj-popover>
      </span>
    </div>
    <div ref="headerSearchBar" class="header-search-bar" v-if="showSearchBar">
      <input placeholder="请输入您想搜索的内容" v-model="searchText"/><div><span class="header-search-btn" @click="searchConfirm">搜索</span><span class="header-search-btn" @click="searchCancel">取消</span></div>
    </div>
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
       * @desc 搜索类型 
       * 1. 渐隐出搜索框 bar
       * 2. 跳转到搜索页面 page
       */
      searchType: {
        type: String,
        default: () => {
          return 'bar'
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
    data() {
      return {
        showSearchBar: false,
        searchText: '',
        popoverVisible: false
      }
    },
    methods: {
      menuHandler() {
        this.$emit('headerMenuHandler');
      },
      searchHandler() {
        if (this.searchType === 'bar') {
          this.showSearchBar = true;
          this.$nextTick(function() {
            this.$refs.headerSearchBar.style.animation = '2s fadeIn 0s';
          });
        } else if (this.searchType === 'page') {
          this.$emit('headerSearchHandler');
        } else {
          console.error('不支持该类型的搜索！');
        }
      },
      searchConfirm() {
        if (this.searchText) {
          this.$emit('headerSearchHandler', this.searchText);
        } 
      },
      searchCancel() {
        this.searchText = '';
        this.showSearchBar = false;
        
        // this.$refs.headerSearchBar.style.animation = '1s fadeOut 0s';
      },
      filterHandler() {
        this.$emit('headerFilterHandler');
      },
      moreHandler() {
        this.popoverVisible = !this.popoverVisible;
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
    padding: 0 15px 0 15px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    text-align: center;
    position: fixed;
    top: 0;
    z-index: 999;
    > .header-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content:space-between;
      height: 100%;
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
        img {
          margin-right: 10px;
          width: 22px;
          height: 22px;
        }
      }
    }
    > .header-search-bar {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      >input {
        width: 70%;
        border-radius: 5px;
        height: 30px;
      }
      >input:focus {
        outline: 0
      }
      .header-search-btn {
        padding: 0 10px;
      }
    }
  }
  @keyframes fadeIn{
    0% {
      width: 0;
    }
    50% {
       width: 30%;
    }
    100% {
      width: 100%;
    }
  }
</style>