<template>
  <div id="sideMenuContainer" :style="menuStyle">
    <!-- <v-touch id="sideMenuTouch" v-on:swipeleft="pull"> -->
       <header>
          {{menuTitle}}
       </header>
       <ocj-menu :menuList="menuList" @changeRoute="changeRoute"></ocj-menu>
    <!-- </v-touch> -->
  </div>
</template>
<script>
  import ocjMenu from './child/menu.vue';
  export default {
    name: 'OcjSideMenu',
    components: {
      ocjMenu
    },
    props: {
      /**
       * 主容器的ID
       */
      wrapTarget: {
        type: String,
        required: true
      },
      /**
       * 左菜单的宽度
       */
      width: {
        type: [String],
        required: false,
        default: () => {
          return '300'
        }
      },
      /**
       * 菜单列表
       */
      menuList: {
        type: Array,
        required: true
      },
      /**
       * 菜单表头
       */
      menuTitle: {
        type: String,
        default: () => {
          return '菜单'
        }
      }
    },
    data() {
      return {
      }
    },
    computed: {
      menuStyle() {
        return {
          transform: `translate3d(-${this.width}px, 0px, 0px )`
        }
      }
    },
    created() {
      // this.push()
    },
    mounted() {
      // this.push();
    },
    methods: {
      openMenu () {
        this.$emit("openMenu")
      },
      closeMenu () {
        this.$emit("closeMenu")
      },
      push() {
        this.openMenu()
        this.$nextTick(function() {
        /**
         * 左菜单展开 横向滚动禁用，主页面向右平行菜单宽度
         */
        document.body.style.overflow = 'hidden';
        document.getElementById('sideMenuContainer').style.width = this.width + 'px';
        // document.getElementById('sideMenuContainer').style.display = 'inherit';
        document.getElementById('sideMenuContainer').style.transform = `translate3d(0px, 0px, 0px )`;
        document.getElementById('sideMenuContainer').style.transition = 'all 0.5s ease 0s';
        document.querySelector('#' + this.wrapTarget).style.transform = `translate3d(${this.width}px, 0px, 0px )`;
        document.querySelector('#' + this.wrapTarget).style.transition = 'all 0.5s ease 0s';
        })
      },
      pull() {
        this.closeMenu()
        /**
         * 左菜单隐藏，主页面位置还原
         */
        document.getElementById('sideMenuContainer').style.transform = `translate3d(-${this.width}px, 0px, 0px )`;
        document.getElementById('sideMenuContainer').style.transition = 'all 0.5s ease 0s';
        document.querySelector('#' + this.wrapTarget).style.transition ='all 0.5s ease 0s';
        document.querySelector('#' + this.wrapTarget).style.transform = '';
        document.body.style.overflow = 'hidden';
      },
      changeRoute(val) {
        console.log(val)
        this.$emit('changeRoute', val)
        this.pull()
      }
    }
  }
</script>
<style lang="less" scoped>
  #sideMenuContainer {
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    background-color: rgba(48,66,105, 1);
    overflow-y:scroll;
    overflow-x: hidden;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
    >header {
      height: 70px;
      line-height: 70px;
      font-size: 17px;
      color: #CFD7E9;
      border-bottom: 1px solid #1C273F;
    }
  }
  #sideMenuContainer::-webkit-scrollbar{
    width: 0;
    display: none;
  }
  // #sideMenuTouch {
  //   width: 100%;
  //   height: 100%;
  //   overflow-y:scroll;
  //   position: relative;
  // }
</style>