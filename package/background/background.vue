<template>
  <div class="background"
       :class="[customClass]">
    <grid-row>
      <component :is="componentView" :width="width" :height="height">
        <slot/>
      </component>
    </grid-row>
  </div>
</template>
<script>
  import {remConfig} from '../rem'
  let gridColGrid = () => import('../grid/col-grid');
  let gridColPercent = () => import('../grid/col-percent');
  let gridColPixel = () => import('../grid/col-pixel');
  let gridRow = () => import('../grid/row');
  export default {
    name: 'OcjBackground',
    components: {
      gridColGrid,
      gridColPercent,
      gridColPixel,
      gridRow
    },
    props: {
      /**
       * @type 背景色块是高宽是按照percent，grid，pixel传值
       * percent 一行百分之100
       * grid    一行12格
       * pixel  根据设计稿px值
       */
      type: {
        type: String,
        default: () => {
          return 'pixel'
        }
      },
      width: [String, Number],
      height: [String, Number],
      customClass: {
        type: String,
        default: () => {
          return 'defalutBackgroundColor'
        }
      }
    },
    data () {
      return {
      }
    },
    computed: {
      componentView: function() {
        if(this.type === 'percent') {
          return gridColPercent;
        } else if(this.type === 'grid') {
          return gridColGrid;
        } else {
          return gridColPixel;
        }
      }
    }
  }
</script>
<style>
  .defalutBackgroundColor {
    background-color: #f1f1f1;
    display: flex;
    display: -webkit-flex;
    display: -ms-flex;
    justify-content: center;
    align-items: center;
  }

</style>
