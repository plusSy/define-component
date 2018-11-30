<template>
  <div class="pdtList" :style="listStyle">
      <div class="pdt-list-item" :style="itemStyle" v-for="(pdtItem, index) in injectData" :key="index">
        <ocj-pdt-item
          :direction="direction"
          :injectData="pdtItem"
          :imageWidth="imageWidth"
          :captionWidth="captionWidth"
          :depthWidthRatio="depthWidthRatio"
          :showQty="showQty"
          :imageTagJustify="imageTagJustify"
          :imageTagAlign="imageTagAlign"
          :showVolume="showVolume"
          :showPrePrice="showPrePrice"
          :showStoreName="showStoreName"
          @itemClick="itemClick(index, $event)"
          @storeClick="storeClick(index, $event)"
          >
          <div slot="imageTag">
            <slot :name="'imageTag' + index"></slot>
          </div>
          <div slot="video">
            <slot :name="'video' + index"></slot>
          </div>
          <div slot="captionTag">
            <slot :name="'captionTag' + index"></slot>
          </div>
        </ocj-pdt-item>
      </div>
  </div>
</template>
<script>
  import { remConfig, pixelToRem } from '../rem';
  import OcjPdtItem from '../pdtItem/pdtItem.vue';
  /**
   * 商品列表使用示例
   * <ocj-pdt-list :width="187" :height="265" columns="2" :injectData="pdtList" :showQty="false" imageWidth="126" captionWidth="126" depthWidthRatio="1.2" wrap="nowrap" :border="true" :showStoreName="true" @itemClick="itemClick">
   *   <!--出插槽-->
   *   <template v-for="(item, index) in pdtList">
   *    <div :slot="'imageTag'+ index" :key="index">
   *      <div style="width: 25px;height: 25px;background-color: #cc3300; ">8.5</div>
   *      <div style="width: 25px;height: 25px;background-color: greenyellow;">8.5</div>
   *    </div>
   *    <div :slot="'video'+ index" :key="index">
   *      <div style="width: 25px;height: 25px;background-color: #fff;border-radius: 50%;">8.5</div>
   *    </div>
   *    <div :slot="'captionTag' + index" :key="index">
   *      <div style="width: 30px;height: 25px;background-color: #cc3300;">赠品</div>
   *    </div>
   *   </template>
   *  </ocj-pdt-list>
   *
   *  slot
   *  imageTag + 动态商品下标 -- 图片上的tag 例如：折扣
   *  video + 动态商品下标 -- 视频Icon
   *  captionTag + 动态商品下标 -- 标题的tag 例如：赠品
   *
   *  emit
   *  itemClick -- 商品点击事件 返回数据商品item和下标 如： {index: idx, item: e}
   *
   *  storeClick -- 店铺点击事件 返回数据商品item和下标 如：{index: idx, item: e}
   */
  export default {
    name: 'OcjPdtList',
    components: {
      OcjPdtItem
    },
    props: {
      /**
       *  @width 每个column的宽度
       */
      width: {
        type: [String, Number]
      },
      /**
       * @height 每个column的高度
       */
      height: {
        type: [String, Number]
      },
      /**
       * @margins 商品列表的间隔
       */
      margins: {
        type: [String, Number]
      },
      /**
       * 商品列表超过一行是否换行
       * default 'wrap'   换行
       *         'nowrap' 不换行
       */
      wrap: {
        type: String,
        default: () => {
          return 'wrap'
        }
      },
      border: {
        type: Boolean,
        default: () => {
          return false
        }
      },
      injectData: {
        type: Array,
        required: true
      },
      /**
       * 下面商品单元配置
       */
      /**
       * 商品单元图片和caption位置
       * column: 从上到下
       * row: 从左到右
       * default: column
       */
      direction: {
        type: String,
      },
      /**
       * 商品单元 字段名称配置
       */
      injectDataKey: {
        type: Object
      },
      /**
       * 设计稿图片宽度pixel
       */
      imageWidth: {
        type: [String, Number],
        required: true
      },
      /**
       * 商品图片高宽比
       */
      depthWidthRatio: {
        type: [String, Number],
        default: () => {
          return 1
        }
      },
      /**
       * 图片下方Caption的宽度
       */
      captionWidth: {
        type: [String, Number],
      },
      /**
       * 图片横向左、右、中位置：start | end | center
       */
      imageTagJustify: {
        type: String,
        default: () => {
          return 'start';
        }
      },
      /**
       * 图片纵向上、下、中位置： start | end | center
       */
      imageTagAlign: {
        type: String,
        default: () => {
          return 'start';
        }
      },
      /**
       * 是否显示库存
       */
      showQty: {
        type: Boolean,
        default: () => {
          return false;
        }
      },
      /**
       * 是否显示已购买人数
       */
      showVolume: {
        type: Boolean,
        default: () => {
          return false;
        }
      },
      /**
       * 显示预定金
       */
      showPrePrice: {
        type: Boolean,
        default: () => {
          return false;
        }
      },
      /**
       * 是否显示店铺名称
       */
      showStoreName: {
        type: Boolean,
        default: () => {
          return false;
        }
      }
    },
    computed: {
      listStyle() {
        return {
          padding: pixelToRem(this.margins) + 'rem',
          flexWrap: this.wrap === 'wrap' ? 'wrap' : 'nowrap',
          overflowY: this.wrap === 'wrap' ? 'hidden' : 'scroll'
        }
      },
      itemStyle() {
        return {
          width: pixelToRem(this.width) + 'rem',
          height: pixelToRem(this.height) + 'rem',
          marginTop: pixelToRem(this.margins) + 'rem',
          borderTop: this.border ? '1px solid #eeeeee' : '',
          borderRight: this.border ? '1px solid #eeeeee' : '',
        }
      }
    },
    data() {
      return {

      }
    },
    created() {
      console.log(this);
    },
    methods: {
      itemClick: function (idx, e) {
        this.$emit('itemClick', {index: idx, item: e});
      },
      storeClick: function (idx, e) {
        this.$emit('storeClick', {index: idx, item: e});
      }
    }
  }
</script>
<style>
  .pdtList {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .pdt-list-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
</style>
