<template>
  <div class="countDown" :style="countDownStyle">
    <div class="countDown-rect" v-if="type==='rectangle'">
      <div class="countDown-rect-label">
        <slot v-if="$slots.label" name="label"></slot>
        <span v-else>{{label}}</span>
      </div>
      <div class="countDown-rect-date" :style="rectDateStyle">
        <span>{{hour}}</span>
      </div>
      <span :style="marginStyle">:</span>
      <div class="countDown-rect-date" :style="rectDateStyle">
        <span>{{minute}}</span>
      </div>
      <span :style="marginStyle">:</span>
      <div class="countDown-rect-date" :style="rectDateStyle">
        <span>{{second}}</span>
      </div>
    </div>
    <div v-if="type === 'circle'">
      <slot v-if="$slots.icon" name="icon"></slot>
      <img v-else src="../asserts/images/countdown.jpg" :style="iconStyle"/>
      <div class="countDown-circle-date" :style="circleDateStyle">{{hour}}: {{minute}} : {{second}}</div>
      <div class="countDown-circle-label">
        <slot v-if="$slots.label" name="label"></slot>
        <span v-else>{{label}}</span>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   *  使用示例
   *  <ocj-count-down  label="距结束" duringDate="37313959" width="140" height="30" ></ocj-count-down>
   *  <ocj-count-down label="结束" duringDate="37313959" type="circle" width="70" height="70" color="#FE325D">
   *     <template slot="icon">
   *       <img src="../package/asserts/images/countdown.jpg"/>
   *     </template>
   *  </ocj-count-down>
   */
  import { remConfig, pixelToRem } from '../rem';
  export default {
    name: 'OcjCountDown',
    components: {
    },
    props: {
      /**
       * 倒计时控件的形状
       * @type：circle圆形 rectangle长方形
       */
      type: {
        type: String,
        default: 'rectangle'
      },
      /**
       * 倒计时 时间范围 格式： 时间戳
       */
      duringDate: {
        type: [String, Number]
      },
      /**
       * 截止日期 格式：1535990400000 时间戳
       */
      expirationDate: {
        type: [String, Number]
      },
      /**
       * 开始日期 格式：1535990400000 时间戳
       */
      currentDate: {
        type: [String, Number]
      },
      /**
       * 文字描述 例如：结束
       */
      label: {
        type: String
      },
      width: {
        type: [Number, String],
        required: true
      },
      height: {
        type: [Number, String],
        required: true
      },
      color: {
        type: String,
        default: () => {
          return '';
        }
      }
    },
    computed: {
      countDownStyle() {
        return {
          backgroundColor: this.color,
          width: pixelToRem(this.width) + 'rem',
          height: pixelToRem(this.height) + 'rem',
          borderRadius: this.type === 'circle' ? '50%' : 0
        };
      },
      iconStyle() {
        return {
          width: pixelToRem(11) + 'rem',
          height: pixelToRem(15.7) + 'rem',
          marginTop: pixelToRem(3) + 'rem',
        }
      },
      circleDateStyle() {
        return {
          fontSize: pixelToRem(10) + 'rem',
          marginTop: pixelToRem(3) + 'rem',
          marginBottom: pixelToRem(3) + 'rem'
        }
      },
      rectDateStyle() {
        return {
          width: pixelToRem(20) + 'rem',
          height: pixelToRem(20) + 'rem'
        }
      },
      marginStyle() {
        return {
          marginLeft: pixelToRem(3) + 'rem',
          marginRight: pixelToRem(3) + 'rem'
        }
      }
    },
    data() {
      return {
        countDown: null, // 定时器
        countDownDate: '',
        hour: '',
        minute: '',
        second: ''
      }
    },
    watch: {
      countDownDate() {
        let hour = 60*60*1000;
        let minute = 60*1000;
        this.hour = Math.floor(this.countDownDate/hour);
        let surplusHour = this.countDownDate%hour;
        this.minute = Math.floor(surplusHour/minute);
        let surplusMinute = surplusHour%minute;
        this.second = Math.floor(surplusMinute/1000);
      }
    },
    created() {
      this.getCountDown();
    },
    destroyed() {
      this.countDown = null;
    },
    methods: {
      getCountDown() {
        try {
          if (this.duringDate) {
            this.countDownDate = this.duringDate;
          } else if (this.expirationDate && this.currentDate) {
            this.countDownDate = Number(this.expirationDate) - Number(this.currentDate);
          } else {
            this.countDownDate = ''
          }
          if (this.countDownDate) {
            this.countdown = setInterval(() => {
              this.countDownDate = this.countDownDate - 1000;
            }, 1000)
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
  }
</script>
<style>
  .countDown {
    display: inline-flex;
    vertical-align: middle;
    justify-content: center;
    align-items: center;
  }
  .countDown-circle-date {
    font-family: HelveticaNeue-CondensedBold;
    color: #FFFFFF;
    letter-spacing: 0.83px;
  }
  .countDown-circle-label {
    font-family: PingFangSC-Semibold;
    font-size: 9px;
    color: #FFFFFF;
    letter-spacing: 0.75px;
  }
  .countDown-rect {
    display: inline-flex;
    justify-content: center;
    align-content: center;
  }
  .countDown-rect-label {
    display: inline-flex;
    font-family: PingFangSC-Medium;
    font-size: 12px;
    color: #414141;
    margin-right: 10px;
    align-items: center;
  }
  .countDown-rect-date {
    display: inline-flex;
    background: #414141;
    border-radius: 1px;
    color: #fff;
  }
  .countDown-rect-date span {
    margin: auto;
  }
</style>
