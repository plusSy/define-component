<template>
    <div class="tab-item">
        <div class="tab-item-container">
          <div class="tab-item-content" @click="tabHandler($el)">
            <span v-if="label && !this.$slots.label">{{label}}</span>
            <slot name="label" v-if="this.$slots.label"></slot>
          </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'ocjTab',
  props: {
    /**
     * @desc tab标题
     */
    label: {
      type: String
    },
    /**
     * @desc tab别名或tab值
     */
    value: {
      type: String,
      required: true
    },
    /**
     * @desc tab是否可用
     */
    disabled: {
      type: Boolean
    }
  },
  methods: {
    tabHandler($el) {
      if (this.disabled) {
        return
      }
      if ($el.className.indexOf('tab-isactive') !== -1) {
        return
      }
      this.$parent.updateTabHandler($el, this.value)
    }
  },
  beforeCreate() {
    this.$parent.tabs.push(this)
  },
  destroyed() {
    this.$parent.tabs.splice(this.$parent.tabs.indexOf(this), 1);
  }
}
</script>
<style lang="less" scoped>
  .tab-item {
    position: relative;
    display: inline-flex;
    flex-shrink: 0;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    height: 100%;
    justify-content: center;
    padding: 8px 0;
    box-sizing: border-box;
    .tab-item-container {
      display: inline-flex;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #d9d9d9;
      padding: 0 8px; 
      .tab-item-content {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        min-width: 0;
      }
      img {
        width: 15px; 
        height: 15px;
        margin: 0 5px;
      }
    }
    
  }
  // .tab-isactive {
  //   .tab-item-container {
  //     color: #5481E2;
  //   }
  // }
  .tab-item:last-child{
    .tab-item-container {
      border-right: 0;
    }
  }
</style>


