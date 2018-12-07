<template>
  <div class="ocj-popover">
    <div class="popper" ref="popper" v-show="visible">
      <div class="popper__arrow"></div>
      <slot></slot>
    </div>
    <div class="rel" ref="reference">
      <slot name="content">
        <div v-text="content"></div>
      </slot>
    </div>
  </div>
</template>

<script>
import Popper from '../utils/popper';
export default {
  name: 'ocjPopover',
  props: {
    content: String,
    visibleArrow: {
      default: true
    }
  },
  mixins: [Popper]
};
</script>

<style scoped>
  .popper {
    position: absolute;
    background: #ffffff;
    color: #333333;
    font-family: PingFangSC-Regular;
    border-radius: 3px;
    box-shadow: 0 0 1px rgba(0,0,0,0.2);
    min-width: 100px;
    font-size: 14px;
    /* padding: 10px;
    text-align: center; */
  }
  .popper .popper__arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
  }
  .popper[x-placement^="top"] {
    margin-bottom: 5px;
  }
  .popper[x-placement="top"] .popper__arrow {
    border-width: 5px 5px 0 5px;
    border-color: #ffffff transparent transparent transparent;
    bottom: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
    
  }
  .popper[x-placement="top-start"] .popper__arrow {
    border-width: 5px 5px 0 5px;
    border-color: #ffffff transparent transparent transparent;
    bottom: -5px;
    left: 5px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement="top-end"] .popper__arrow {
    border-width: 5px 5px 0 5px;
    border-color: #ffffff transparent transparent transparent;
    bottom: -5px;
    right: 5px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement^="bottom"] {
    margin-top: 5px;
  }
  .popper[x-placement="bottom"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #ffffff transparent;
    top: -5px;
    left: calc(50% - 5px);
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement="bottom-start"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #ffffff transparent;
    top: -5px;
    left: 5px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement="bottom-end"] .popper__arrow {
    border-width: 0 5px 5px 5px;
    border-color: transparent transparent #ffffff transparent;
    top: -5px;
    /* left: calc(50% - 5px); */
    right: 5px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .popper[x-placement^="right"] {
    margin-left: 5px;
  }
  .popper[x-placement="right"] .popper__arrow {
    border-width: 5px 5px 5px 0;
    border-color: transparent #ffffff transparent transparent;
    left: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement="right-start"] .popper__arrow {
    border-width: 5px 5px 5px 0;
    border-color: transparent #ffffff transparent transparent;
    left: -5px;
    top:  5px;
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement="right-end"] .popper__arrow {
    border-width: 5px 5px 5px 0;
    border-color: transparent #ffffff transparent transparent;
    left: -5px;
    bottom:  5px;
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement^="left"] {
    margin-right: 5px;
  }
  .popper[x-placement="left"] .popper__arrow {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #ffffff;
    right: -5px;
    top: calc(50% - 5px);
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement="left-start"] .popper__arrow {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #ffffff;
    right: -5px;
    top: 5px;
    margin-left: 0;
    margin-right: 0;
  }
  .popper[x-placement="left-end"] .popper__arrow {
    border-width: 5px 0 5px 5px;
    border-color: transparent transparent transparent #ffffff;
    right: -5px;
    bottom: 5px;
    margin-left: 0;
    margin-right: 0;
  }
</style>