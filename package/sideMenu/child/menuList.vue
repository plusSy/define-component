<template>
  <div class="menu-ul">
    <!-- :class="[li.active ? 'menu-li-active' : '']" -->
    <div class="menu-li" 
      :class="[!li.list ? 'menu-li-active' : '']"
      v-for="(li, lIdx) in list"
      :key="lIdx"
    >
      <div class="menu-li-header" @click="toggleExpand(li)">
        <div class="menu-li-cusp" 
          :class="[li.expand ? 'menu-li-header-expand' : 'menu-li-header-close']"
          :style="`margin-left: ${15 * (rCount-1)}px`"
        >
          <img  src="../../asserts/images/cusp.png" v-if="li.children"/>
        </div>
        <span>{{li.authName}}</span>
      </div>
      <div class="menu-li-expand" v-if="li.expand && li.children">
        <ocj-menu-list :list="li.children" :count="rCount" @changeRoute="changeRoute"></ocj-menu-list>
      </div>
    </div>
  </div>
</template>
<script>
  import ocjMenuList from './menuList'
  export default {
    name: 'ocjMenuList',
    components: {
      ocjMenuList
    },
    props: {
      list: {
        type: Array,
        required: true
      },
      /**
       * ocj-menu-list 递归次数 用来计算子菜单缩进宽度
       */
      count: {
        type: Number,
        required: true
      }
    },
    computed: {
      rCount: function() {
        return Number(this.count) + 1
      }
    },
    methods: {
      toggleExpand(li) {
        if (li.children) {
          li.expand = !li.expand
          this.$forceUpdate()
        } else {
          this.$emit('changeRoute', li)
        }
      },
      changeRoute(val) {
        this.$emit('changeRoute', val)
      }
    }
  }
</script>
<style lang="less" scoped>
  .menu-ul {
    box-sizing: border-box;
    >.menu-li {
      position: relative;
      >.menu-li-header {
        display: flex;
        padding: 10px;
        box-sizing: border-box;
        >.menu-li-cusp {
          width: 15px;
          height: 15px;
          display: inline-flex;
          margin-right: 10px;
          >img {
            width: 15px;
            height: 15px;
            transform: rotate(90deg);
          }
        }
        >.menu-li-header-expand {
          >img {
            transform: rotate(180deg);
            transition: all 0.5s ease;
          }
        }
         >.menu-li-header-close {
          >img {
            transform: rotate(90deg);
            transition: all 0.5s ease;
          }
        }
      }
      >.menu-li-header:active {
        background: #455880;
      }
    }
  }
</style>