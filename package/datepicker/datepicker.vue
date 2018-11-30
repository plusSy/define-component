<template>
  <div class="datepicker"> 
      <input type="date" v-model="date" @focus="show">
      <modal v-if="isShow">
        <calendar :display="isShow" :mondayFirst="mondayFirst" :date="date" :autoComplete="autoComplete" @select="select" @cancel="hidden"></calendar>
      </modal>
  </div>
</template>
<script>
  import modal from './child/modal.vue'
  import calendar from './child/Calendar.vue'
  export default {
    name: 'OcjDatePicker',
    components: {
      modal,
      calendar
    },
    props: {
      // 是否周一为星期第一天
      mondayFirst: {
        type: Boolean,
        default() { return false }
      },
      // 自动完成
      autoComplete: {
        type: Boolean,
        default() { return true }
      },
      value: {
        type: String
      }
    },
    computed: {},
    data() {
      return {
        isShow: false,
        date: '',
        selectRangeStart: '',
        selectRangeEnd: ''
      }
    },
    created() {
      // 选中的日期，重新打开日期时 需要选中
      this.date = this.value
    },
    methods: {
      show() {
        this.isShow = true;
        document.body.style['overflow-y'] = 'hidden'
      },
      hidden() {
        this.isShow = false;
        document.body.style['overflow-y'] = 'auto'
      },
      select(val) {
        console.log(val);
        this.date = val.date
        this.$emit('select', val)
        this.hidden();
      }
    }
  }
</script>
<style>
</style>