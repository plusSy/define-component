<template>
  <div id="modalContainer" :style="modalStyle">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'OcjModal',
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
      direction: {
        type: [String],
        default: () => {
          return 'left'
        }
      },
      /**
       *  弹窗的背景颜色
       */
      backgroundColor: {
        type: String,
        default: () => {
          return '#304269'
        }

      }
    },
    data() {
      return {
      }
    },
    computed: {
      modalStyle() {
        const rect = document.body.getBoundingClientRect();
        const rectWidth = rect.width;
        return {
          backgroundColor: this.backgroundColor,
          transform: `translate3d(${this.direction === 'left'? -this.width : rectWidth}px, 0px, 0px )`
        }
      }
    },
    created() {
      document.body.style.overflow = 'hidden';
      // this.push()
    },
    mounted() {
      // this.push();
    },
    methods: {
      openModal () {
        this.$emit("openModal")
      },
      closeModal () {
        this.$emit("closeModal")
      },
      push() {
        this.openModal()
        this.$nextTick(function() {
          /**
           * 左菜单展开 横向滚动禁用，主页面向右平行菜单宽度
           */
          document.body.style.overflow = 'hidden';
          document.getElementById('modalContainer').style.width = this.width + 'px';
          // document.getElementById('sideMenuContainer').style.display = 'inherit';
          // 获取容器的宽度
          const rect = document.body.getBoundingClientRect();
          const rectWidth = rect.width;
          // this.computedWidth = this.width || rect.width;
          document.getElementById('modalContainer').style.transform = `translate3d(${this.direction === 'left'? 0 : (rectWidth-this.width)}px, 0px, 0px )`;
          document.getElementById('modalContainer').style.transition = 'all 0.5s ease 0s';
          document.querySelector('#' + this.wrapTarget).style.transform = `translate3d(${this.direction === 'left'? this.width : -this.width}px, 0px, 0px )`;
          document.querySelector('#' + this.wrapTarget).style.transition = 'all 0.5s ease 0s';
        })
      },
      pull() {
        this.closeModal()
        /**
         * 左菜单隐藏，主页面位置还原
         */
        const rect = document.body.getBoundingClientRect();
        const rectWidth = rect.width;
        document.getElementById('modalContainer').style.transform = `translate3d(${this.direction === 'left'? -this.width : rectWidth}px, 0px, 0px )`;
        document.getElementById('modalContainer').style.transition = 'all 0.5s ease 0s';
        document.querySelector('#' + this.wrapTarget).style.transition ='all 0.5s ease 0s';
        document.querySelector('#' + this.wrapTarget).style.transform = '';
        document.body.style.overflow = 'hidden';
      }
    }
  }
</script>
<style lang="less" scoped>
  #modalContainer {
    position: absolute;
    height: 100%;
    top: 0;
    bottom: 0;
    // background-color: rgba(48,66,105, 1);
    overflow-y:scroll;
    overflow-x: hidden;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
  }
  #sideMenuContainer::-webkit-scrollbar{
    width: 0;
    display: none;
  }
</style>
