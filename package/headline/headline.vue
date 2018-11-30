<template>
  <div class="headline"
       :class="[
          {
            'has-border': border
          }
        ]"
   @click="onClick"
  >
    <div v-if="$slots.title || title" class="headline-title" :class="[{'align-center': center}]">
      <slot name="title" v-if="!title"></slot>
      <span v-else>{{title}}</span>
    </div>
    <div v-if="$slots.value || value" class="headline-value">
      <slot name="value" v-if="!value">
      </slot>
      <span v-else>
        {{value}}
      </span>
    </div>
    <slot v-if="isLink && $slots.rightIcon" name="rightIcon"></slot>
    <div v-if="isLink && !$slots.rightIcon" class="right-icon"></div>
  </div>
</template>
<script>
  let gridRow = () => import('../grid/row');
  /**
   * slot
   * title: 标题
   * value: 右侧副标题
   * rightIcon: 右侧图标
   */
  export default {
    name: 'OcjHeadline',
    components: {
      gridRow
    },
    props: {
      /**
       * 标题
       */
      title: String,
      /**
       * 右侧副标题
       */
      value: String,
      /**
       * 标题是否居中显示
       */
      center: {
        type: Boolean,
        default: true
      },
      /**
       * 是否链接跳转
       */
      isLink: Boolean,
      /**
       * 是否有边框
       */
      border: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {

      }
    },
    methods: {
      onClick() {
        if (this.isLink) {
          this.$emit('click');
        } else {
          return;
        }

      }
    }
  }

</script>
<style>
  .headline {
    width: 100%;
    display: flex;
    display: -webkit-flex;
    display: -ms-flex;
    padding: 10px 10px;
    box-sizing: border-box;
    align-items: center;
    position: relative;
    color: #000000;
    font-size: 14px;
    overflow: hidden;
  }
  .headline-title {
    display: inline-flex;
    flex: 1;
    font-family: PingFangSC-Semibold;
    font-size: 16px;
    color: #141414;
    letter-spacing: 0.5px;
  }
  .headline-value {
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #B5B5B5;
  }
  .align-center {
    justify-content: center;
  }
  .has-border {
    border:1px solid #B5B5B5;
  }
  .right-icon {
    width: 16px;
    height: 16px;
    background-size: 100%;
    background-image: url("../asserts/images/more.png");
  }
</style>
