<template>
  <section class="wrap" @click.self="$emit('cancel')" :class="{hide: !display}">
    <div class="content">
      <header>
        <a class="left" @click="$emit('cancel')">取消</a>
        <a class="leftYear" @click="changeYears">{{year}}年</a>
        <strong class="center">选择日期</strong>
        <a v-if="!autoComplete" class="right" @click="confirm">确认</a>
      </header>
      <div class="week-text" v-if="containerType === 'month'">
        <span v-for="(text, i) in weekTexts"
          :key="i"
          :style="{color: mondayFirst
            ? i == 5 || i == 6 ? '#e56d03' : ''
            : i == 0 || i == 6 ? '#e56d03' : ''}">{{text}}</span>
      </div>
      <main ref="layout" v-if="containerType === 'month'">
        <section ref="months" class="ocj-month" v-for="(item, i) in months" :key="i">
          <header>{{item.year}}年 {{item.month}}月</header>
          <div class="day-wrap">
            <div class="day"
              v-for="(day, j) in item.days" :key="j"
              :class="{'disabled': day.disabled, 'select': day.begin || day.end}"
              @click="selectOne(day)">
              <span class="number" :class="{rest: day.rest}">{{day.text}}</span>
            </div>
          </div>
        </section>
      </main>
      <main ref="mLayout" v-if="containerType === 'year'">
          <section ref="years" class="ocj-year" v-for="(year, idx) in years" :key="idx" >
          <header>{{year.year}}年</header>
          <div class="month-wrap">
            <div class="month"
              v-for="(month, j) in year.months" :key="j"
              :class="{'select': month.selected}"
              @click="selectMonth(month)">
              <span class="number">{{month.text}}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  </section>
</template>

<script>
class DateHelper {
  constructor(str = Date.now()) {
    this.Date = new Date(str)
  }
  get year() {
    return this.Date.getFullYear()
  }
  get month() {
    const m = this.Date.getMonth() + 1
    return m < 10 ? `0${m}` : m
  }
  get day() {
    const d = this.Date.getDate()
    return d < 10 ? `0${d}` : d
  }
  get time() {
    return this.Date.getTime()
  }
  get date() {
    return `${this.year}-${this.month}-${this.day}`
  }
}
export default {
  name: 'calendar',
  props: {
    // 自动完成
    autoComplete: {
      type: Boolean,
      default() { return true }
    },
    // 显示状态
    display: {
      type: Boolean,
      default() { return false }
    },
    // 是否周一为第一天
    mondayFirst: {
      type: Boolean,
      default() { return false }
    },
    // 允许反向选择日期 todo 日期范围
    reverseSelect: {
      type: Boolean,
      default() { return false }
    },
    // 加载日历的范围，单位为月
    displayRange: {
      type: Number,
      default() { return 12 }
    },
    // 可自定义显示开始日期
    // 默认为当月当日向前两年
    displayRangeStart: {
      type: String,
      default() { 
        // 当前时间前两年改为当年时间
        // let year = new DateHelper().year;
        // let month = new DateHelper().month;
        // let day = new DateHelper().day;
        // return `${year-2}-${month}-${day}`
        let year = new DateHelper().year;
        return `${year}-01-01`
      }
    },
    // 可选择的开始日期
    selectRangeStart: {
      type: String,
      default() { return new DateHelper().date }
    },
    // 可选择的结束日期
    selectRangeEnd: {
      type: String,
      default() { return new DateHelper().date }
    },
    // 当前日期
    initPosition: {
      type: String,
      default() { return new DateHelper().date }
    },
    date: {
      type: String
    }
  },
  data() {
    return {
      months: [],
      firstTime: true,
      firstSelectDay: {},
      lastSelectDay: {},
      customIndex: 0,
      range: [],
      containerType: 'month', // 内容为月份month | 年 year
      years: [],
      year: new DateHelper().year
    }
  },
  computed: {
    weekTexts() {
      const arrTexts = ['日', '一', '二', '三', '四', '五', '六']
      // 中国习惯周一为第一天
      if (this.mondayFirst) arrTexts.push(arrTexts.shift())
      return arrTexts
    },
    $date() {
      return new DateHelper()
    }
  },
  created() {
    let date = this.date ? this.date : this.displayRangeStart
    // 初始化月份
    this.initMonths(date)
    // 初始化年份
    this.initYears()
  },
  mounted() {
    // 设置scrollTop，使其初始进来就定位到想要的位置，而不是显示列表的头部
    this.initMonthScrollTop()
  },
  methods: {
    initMonths(date) {
      const months = []
      let customIndex = 0
      let Y =  new DateHelper(date).year
      let M = 1
      this.year = Y
      let year = Y
      let month = M
      // let [Y, M] = date ? date.split('-').map(Number) : this.displayRangeStart.split('-').map(Number)
      // let [year, month] = [Y, M]
      // 循环出月份
      for (let i = 0; i < this.displayRange; i++) {
        if (M + i > 12) {
          M -= 12 // 月份从1开始
          year = ++Y // 进 1年
        }
        month = M + i
        const days = [] // 每一天的数据对象会放入该数组
        // 通过占位把 1号排到实际的星期位置
        // 默认周日开头情况下，今天是星期几，就需要几个占位符
        // 周日为 0，不用处理
        let placeholder = new Date(year, month - 1, 1).getDay()
        // 如果是周一开头，把占位符往前移一天
        // 周日为 0，需处理成 7-1
        if (this.mondayFirst) placeholder = placeholder === 0 ? 6 : placeholder - 1
        for (let j = 0; j < placeholder; j++) {
          customIndex++
          days.push({ custom: {} })
        }
        // 得到当月总天数
        const daySum = new Date(year, month, 0).getDate()
        // 循环出每一天
        for (let day = 1; day <= daySum; day++) {
          const obj = {} // 存放的数据将会在 template中用到
          obj.custom = {}
          obj.year = year
          obj.month = month
          obj.day = day
          obj.date = `${year}-${month}-${day}`
          obj.odate = `${year}-${ month > 9 ? month : '0' + month}-${ day > 9 ? day : '0' + day}` // 补0的日期格式
          // 显示“今天”或者几号
          obj.text = year === this.$date.year && month === this.$date.month && day === this.$date.day ? '今天' : day
          // 获取星期几，判断周末
          const weekday = new Date(year, month - 1, day).getDay()
          const weekend = weekday === 6 || weekday === 0
          obj.rest = weekend
    
          // 第一次进入选择或者已经选择过的日期 显示select
          // 默认第一次的日期会当前日期
          let selectRangeStart = this.date ? this.date : this.selectRangeStart
          const startYear = new DateHelper(selectRangeStart).year
          const startMonth = new DateHelper(selectRangeStart).month
          const startDay = new DateHelper(selectRangeStart).day
          const _month = month > 9 ? month : '0' + month
          const _day = day > 9 ? day : '0' + day
          if (year === startYear && _month === startMonth && _day === startDay) {
            obj.begin =  true;
            this.firstSelectDay = obj;
          }
          customIndex++
          days.push(obj)
          // 结束循环每天
        }
        months.push({ year, month, days })
        // 结束循环每月
      }
      this.months = months
    },
    initMonthScrollTop() {
      // 设置scrollTop，使其初始进来就定位到想要的位置，而不是显示列表的头部
      if (this.date) {
        this.year = new DateHelper(this.date).year
        let selectedMonth = new DateHelper(this.date).month
        // 设置scrollTop，使其选中的月份进来就定位到想要的位置，而不是显示列表的头部
        this.$nextTick(function() {
          let top = 0
          for (let i = 0; i < selectedMonth - 1; i++) {
            top += this.$refs.layout.children[i].offsetHeight
          }
          this.$refs.layout.scrollTop = top
        })
      } else {
        const [dY, dS] = this.displayRangeStart.split('-').map(Number)
        const [pY, pS] = this.initPosition.split('-').map(Number)
        let index = 0
        index += pS > dS ? (pY - dY) * 12 : (pY - dY) * 12
        index += pS - dS
        let top = 0
        if (index > this.$refs.layout.children.length) index = this.$refs.layout.children.length
        for (let i = 0; i < index; i++) {
          top += this.$refs.layout.children[i].offsetHeight
        }
        this.$refs.layout.scrollTop = top
      }
      
    },
    selectOne(tar) {
      // 点击1号之前的空白区域
      if (!tar.text) { return false }
      // 点击禁用的
      const { disabled, custom } = tar
      if (disabled) { return false }
      // 选择一个日期
  
      this.$emit('click', tar)
      this.$set(this.lastSelectDay, 'begin', false)
      this.$set(this.firstSelectDay, 'begin', false)
      // 选中当前
      this.firstSelectDay = tar
      this.$set(tar, 'begin', true)
      // 记录第一次值
      this.lastSelectDay = this.firstSelectDay
      if (this.autoComplete) this.confirm()
      
    },
    getTimestamp(tar) {
      return new Date(tar.year, tar.month - 1, tar.day).getTime()
    },
    confirm() {
      let obj = {date: this.firstSelectDay.odate};
      this.$emit('select', obj)
    },
    initYears() {
      const years = [];
      const sYear = new DateHelper().year;
      // 提高渲染速度 减少年份
      for (let year = 2000; year < sYear + 20; year++) {
        let months = [];
        for (let month = 1; month < 13; month++) {
          let obj = {}
          obj.date = `${year}-${month < 10 ? `0${month}` : month}-01`
          // 当前月显示本月，其他显示正常月数
          obj.text = year === this.$date.year && month === this.$date.month ? '本月' : `${month}月`
          months.push(obj);
        }
        years.push({year, months})
      }
      this.years = years;
    },
    changeYears() {
      // 日历显示年份
      this.containerType = 'year'
      this.yearScrollTop()
    },
    // 选择月份
    selectMonth(month) {
      this.year = new DateHelper(month.date).year
      let selectedMonth = new DateHelper(month.date).month
      // 日历显示月份
      this.containerType = 'month'
      this.initMonths(`${this.year}-01-01`);
      // 设置scrollTop，使其选中的月份进来就定位到想要的位置，而不是显示列表的头部
      this.$nextTick(function() {
        let top = 0
        for (let i = 0; i < selectedMonth - 1; i++) {
          top += this.$refs.layout.children[i].offsetHeight
        }
        this.$refs.layout.scrollTop = top
      })
    },
    yearScrollTop() {
      // 设置scrollTop，使其初始年份进来就定位到想要的位置，而不是显示列表的头部
      this.$nextTick(function() {
        let top = 0
        for (let i = 0; i < (this.year - 2000); i++) {
          top += this.$refs.mLayout.children[i].offsetHeight
        }
        this.$refs.mLayout.scrollTop = top
      })
    }
  }
}
</script>

<style lang="less" scoped>
.wrap{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(9, 9, 9, .7);
  transition: transform .5s ease-out;
  z-index: 8;
  &.hide{
    transform: translateY(100vh)
  }
}
.content{
  position: absolute;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 90vh;
  background-color: white;
  color: #666;
  text-align: center;
  >header{
    padding: 20px;
    text-align: center;
    >a{
      position: absolute;
      top: 20px;
      font-size: 14px;
      cursor: pointer;
      &.left{
        left: 10px;
      }
      &.leftYear {
        left: 50px;
      }
      &.right{
        right: 10px;
      }
    }
    .center {
      font-size: 17px;
    }

  }
  .week-text{
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
    >span{
      width: 100 / 7vw;
      font-size: 12px;
    }
  }
  main{
    flex: 1;
    overflow-y: scroll;
    .ocj-month{
      >header{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: #eff6ff;
        z-index: 1;
        margin: 0 10px;
        height: 30px;
        line-height: 30px;
      }
      .day-wrap{
        display: flex;
        flex-wrap: wrap;
        .day{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 100 / 7vw;
          height: 100 / 7vw;
          box-sizing: border-box;
          &.disabled{
            color: #eee;
            >span{
              color: #eee!important;
            }
          }
          &.select{
            color: white;
            >span{
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 80 / 7vw;
              height: 80 / 7vw;
              background-color: rgb(67,105,219);
              box-shadow: none;
              border-radius: 50%;
              color: white!important;
            }
          }
          &.active{
            box-shadow: none;
            >span{
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 80 / 7vw;
              height: 80 / 7vw;
              background-color: lightblue;
              box-shadow: none;
              border-radius: 50%;
              color: white!important;
            }
          }
          span{
            font-size: 12px;
            &.number{
              font-size: 17px;
            }
            &.rest{
              color: #e56d03;
            }
          }
        }
      }
    }
    .ocj-year {
      >header{
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background-color: #eff6ff;
        z-index: 1;
        margin: 0 10px;
        height: 30px;
        line-height: 30px;
      }
      .month-wrap {
        display: flex;
        flex-wrap: wrap;
        .month{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: relative;
          width: 150 / 6vw;
          height: 70 / 6vw;
          box-sizing: border-box;
          &.select{
            color: white;
            >span{
              display: inline-flex;
              justify-content: center;
              align-items: center;
              width: 80 / 7vw;
              height: 40 / 7vw;
              background-color: rgb(67,105,219);
              box-shadow: none;
              color: white!important;
            }
          }
        }
      }
    }
  }
}
</style>

