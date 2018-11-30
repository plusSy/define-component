<template>
  <div class="pdt-item" :style="'flex-direction:'+direction" @click="itemClick">
      <div class="pdt-item__image" :style="imageStyle">
        <img :src="localData[localDataKey.imgKey]"/>
        <div class="pdt-item__image-tag" :class="['pdt-item__image-justify-'+imageTagJustify, 'pdt-item__image-align-'+imageTagAlign]">
          <slot  name="imageTag" v-if="$slots.imageTag"></slot>
        </div>
        <div class="pdt-item__image-video">
           <slot  name="video" v-if="$slots.video"></slot>
        </div>
      </div>
      <div class="pdt-item__caption" :style="itemStyle">
        <div class="pdt-item__caption-label">
          <div class="pdt-item__caption-tag">
            <slot  name="captionTag" v-if="$slots.captionTag"></slot>
          </div>
          <div class="pdt-item__caption-stock" v-if="showQty  && (localData[localDataKey.preQtyKey] || localData[localDataKey.preQtyKey] === 0)">
            <template>
              <span v-if="localData[localDataKey.preQtyKey] && localData[localDataKey.preQtyKey] > 0">库存</span>
              <div class="stock-bar" v-if="localData[localDataKey.preQtyKey] && localData[localDataKey.preQtyKey] > 0">
                <span class="stock-bar-inner" :style="`width: ${ localData[localDataKey.preQtyKey] > 100 ? 100 : localData[localDataKey.preQtyKey] }%`"></span>
              </div>
              <span v-if="Number(localData[localDataKey.preQtyKey]) === 0" class="over-text">已售罄</span>
            </template>
          </div>
        </div>
        <div class="pdt-item__title">
          <span>{{localData[localDataKey.titleKey]}}</span>
        </div>
        <div class="pdt-item__price">
          <span v-if="localData[localDataKey.priceKey]" class="cell-price-symbal global-price-util">¥</span><span class="global-price-number">{{localData[localDataKey.totalPriceKey] ? localData[localDataKey.totalPriceKey] : localData[localDataKey.priceKey]}}</span>
          <span v-if="showVolume && localData[localDataKey.salesVolumeKey] && Number(localData[localDataKey.salesVolumeKey])" class="cell-volume">{{ localData[localDataKey.salesVolumeKey] }}人已买</span>
        </div>
        <p v-if="showPrePrice && localData[localDataKey.totalPriceKey]" class="pre-price">预付款{{localData[localDataKey.priceKey]}}元</p>
        <template v-if="showStoreName">
          <div class="cell-shop-name" @click="storeClick">
              <span>{{ localData[localDataKey.venShopNameKey] }}</span>
              <img v-if="localData[localDataKey.venShopNameKey]" src="../asserts/images/shoparrow.png">
          </div>
        </template>
      </div>
  </div>
</template>
<script>
  /**
   * 商品单元
   * 使用示例：
   * <ocj-pdt-item direction="row" :injectData="pdtItem" imageWidth="126" captionWidth="200" depthWidthRatio="1" imageTagJustify="start" imageTagAlign="start" :showQty="true" :showPrePrice="false" :showVolume="true" :showStoreName="true">
   *   <template slot="imageTag">
   *      <div style="width: 50px;height: 25px;background-color: #cc3300;">8.5</div>
   *      <div style="width: 50px;height: 25px;background-color: #fff;">8.5</div>
   *   </template>
   *   <template slot="video">
   *      <div style="width: 25px;height: 25px;background-color: #fff;border-radius: 50%;">8.5</div>
   *   </template>
   *   <template slot="captionTag">
   *      <div style="width: 30px;height: 25px;background-color: #cc3300;">赠品</div>
   *   </template>
   * </ocj-pdt-item>
   *
   * slot
   * imageTag -- 图片上的tag 例如：折扣
   * video -- 视频Icon
   * captionTag -- 标题的tag 例如：赠品
   *
   * emit
   * itemClick -- 商品点击事件
   * storeClick -- 店铺点击事件
   */
  import { remConfig, pixelToRem } from '../rem';
  export default {
    name: 'OcjPdtItem',
    props: {
      /**
       * 商品单元图片和caption位置
       * column: 从上到下
       * row: 从左到右
       */
      direction: {
        type: String,
        default: () => {
          return 'column'
        }
      },
      /**
       * 组件要显示的值
       */
      injectData: {
        type: Object,
        required: true
      },
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
      itemStyle() {
        let width = this.captionWidth ? this.captionWidth : this.imageWidth;
        return {
          width: pixelToRem(width) + 'rem'
        }
      },
      imageStyle() {
        return {
          width: pixelToRem(this.imageWidth) + 'rem',
          height: pixelToRem(this.imageWidth) * this.depthWidthRatio + 'rem'
        }
      }
    },
    data() {
      return {
        localData: {},
        localDataKey: {
          /**
           * 商品图片
           */
          imgKey: 'firstImgUrl',
          /**
           * 商品标题
           */
          titleKey: 'itemName',
          /**
           * 商品库存比例
           */
          preQtyKey: 'preQty',
          /**
           * 商品价格
           */
          priceKey: 'salePrice',
          totalPriceKey: 'specialGoodsTotalPrice',
          /**
           * 已经购买人数
           */
          salesVolumeKey: 'salesVolume',
          /**
           * 店铺名称
           */
          venShopNameKey: 'venShopName'
        }
      }
    },
    created() {
      this.init();
    },
    methods: {
      init() {
        /**
         * 将传入的数据更新为本地数据
         */
        this.localData = this.injectData;
        /**
         * 将传入的Key覆盖本地数据Key
         */
        this.localDataKey = {...this.localDataKey, ...this.injectDataKey};
      },
      /**
       * 商品点击
       */
      itemClick(e) {
        this.$emit('itemClick', this.injectData);
        this.prevent(e);
      },
      /**
       * 店铺点击
       */
      storeClick(e) {
        this.$emit('storeClick', this.injectData);
        this.prevent(e);
      },
      prevent(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
</script>
<style>
  .pdt-item {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;
  }
  .pdt-item__image {
    position: relative;
  }
  .pdt-item__image-justify-start {
    justify-content: flex-start;
  }
  .pdt-item__image-align-start{
    align-items: flex-start;
  }
  .pdt-item__image-justify-end {
    justify-content: flex-end;
  }
  .pdt-item__image-align-end{
    align-items: flex-end;
  }
  .pdt-item__image-justify-center {
    justify-content: center;
  }
  .pdt-item__image-align-center {
    align-items: center;
  }
  .pdt-item__image img{
    width: 100%;
    height: 100%;
  }
  .pdt-item__image .pdt-item__image-tag {
    display: flex;
    position: absolute;
    z-index: 3;
    top:0;
    height: 100%;
    width: 100%;
  }
  .pdt-item__image-video {
    position: absolute;
    z-index: 4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    top:0;
  }
  .pdt-item__caption {
    padding: 5px;
    text-align: left;
  }
  .pdt-item__caption-label {
    display: flex;
    align-items: center;
  }
  .pdt-item__caption-tag {
    display: inline-block;
  }
  .pdt-item__caption-stock {
    color: #414141;
    display: inline-block;
    margin: 5px 0;
  }
  .pdt-item__caption-stock .stock-bar {
    height: 9px;
    border: 1px solid #777777;
    padding: 1px;
    display: inline-block;
    width: 50px;
    box-sizing: border-box;
    margin-right: 4px;
  }
  .pdt-item__caption-stock .stock-bar .stock-bar-inner {
    height: 5px;
    display: block;
    background: linear-gradient(to right, #FABB92, #F26459);
  }
  .pdt-item__caption-stock .over-text {
    color: #F26459;
  }
  .pdt-item__title {
    text-align: left;
    height: 40px;
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    margin-bottom: 5px;
  }
  .pdt-item__title span {
    white-space: normal;
    font-size: 14px;
    color: #141414 !important;
    line-height: 18px;
  }
  /*价格*/
  .pdt-item__price {
    margin-bottom: 5px;
    text-align: left;
    font-size: 16px;
    color: #F40C17;
    position: relative;
    line-height: 20px;
  }
  .pdt-item__price .cell-volume {
    float: right;
    font-size: 12px;
    color: #414141;
    font-family: PingFangSC-Medium;
  }
  .pdt-item__price .cell-price-symbal {
    font-family: PingFangSC-Medium;
    font-size: 14px;
    color: #F40C17;
    line-height: 18px;
    letter-spacing: -3px;
    word-spacing: -3px;
  }
  .global-price-util{
    font-size: 14px !important;
    font-family: PingFangSC-Medium !important;
    margin-right: 2px !important;
    letter-spacing: 0 !important;
  }
  .global-price-number {
    font-size: 16px !important;
    font-family: PingFangSC-Medium !important;
  }
  /**
   * 预付款样式
   */
  .pre-price {
    margin-bottom: 5px;
    text-align: left;
    font-size: 11px;
    color: #7F7F7F;
    position: relative;
  }

  /**
   * 店铺样式
   */
  .cell-shop-name {
    display: block;
    box-sizing: border-box;
    background: #FFFFFF;
    border: 1px solid #F26459;
    border-radius: 100px;
    float: left;
    max-width: 90%;
    height: 18px;
    padding: 0 5px;
    position: relative;
  }
  .cell-shop-name span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    max-width: 120px;
    font-size: 12px;
    height: 18px;
    line-height: 17px;
    transform: scale(0.82, 0.82);
    color: #F26459;
    padding-right: 5px;

  }
  .cell-shop-name img {
    width: 4px;
    height: 8px;
    position: absolute;
    right: 5px;
    top: 8px;
    transform: translateY(-50%)
  }
</style>
