<template>
  <div class="menu">
    <div class="menu-row"
     v-for="(row, rIdx) in menuList"
     :key="rIdx"
     >
      <div class="menu-row-header" :class="[row.expand ? 'menu-row-header-expand' : 'menu-row-header-close']" @click="toggleExpand(row)">
          <img class="menu-row-thumbnail" :src="row.authThumbnail"/> 
          <span class="menu-row-name">{{row.authName}}</span>
          <img class="menu-row-cusp" src="../../asserts/images/cusp.png" v-if="row.children"/>
      </div>
      <div class="menu-row-menu" v-if="row.expand && row.children">
          <ocj-menu-list :list="row.children" @changeRoute="changeRoute" :count="1"></ocj-menu-list>
      </div>
    </div>
  </div>
</template>
<script>
  import ocjMenuList from './menuList'
  export default {
    name: 'ocjMenu',
    components: {
      ocjMenuList
    },
    props: {
      /**
       * 菜单列表
       */
      menuList: {
        type: Array,
        required: true
      }
    },
    created() {
    
    },
    methods: {
      toggleExpand(row) {
        if (row.children) {
          row.expand = !row.expand
          this.$forceUpdate()
        }
      },
      changeRoute(val) {
        this.$emit('changeRoute', val)
      }
    }
  }
</script>
<style lang="less" scoped>
  .menu {
    color: #CFD7E9;
    >.menu-row{
      font-size: 17px;
      border-bottom: 1px solid #1C273F;
      position: relative;
      >.menu-row-header {
        display: flex;
        justify-content: space-between;
        padding: 15px;
        box-sizing: border-box;
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: rgba(48,66,105, 1);
        z-index: 99;
        >.menu-row-thumbnail {
        width: 15px;
        height: 15px;
        background: #3D5076;
        display: inline-flex;
        }
        >.menu-row-name {
          display: flex;
          flex: 1;
          justify-content: flex-start;
          padding-left: 17px;
        }
        >.menu-row-cusp {
          width: 15px;
          height: 15px;
          display: inline-flex;
        }
      }
      >.menu-row-header-expand {
        background: #283859;
        border-bottom: 1px solid #1C273F;
        >.menu-row-cusp {
          transform: rotate(180deg);
          transition: all 0.5s ease;
        }
      }
      >.menu-row-header-close {
        >.menu-row-cusp {
          transform: rotate(0deg);
          transition: all 0.5s ease;
        }
      }
    }
  }
</style>