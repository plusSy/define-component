<template>
  <div class="title">
    <div class="title-left" @click="goBack">
      <span class="font-size-middle">
        <img src="../../asserts/images/icon-arrow-left.png" class="iconStyle"/>
        {{ currentConfig.back.name }} </span>
    </div>
    <div class="title-content">
      <span class="font-size-base">{{ currentConfig.content.name }} </span>
    </div>
    <div class="title-right" @click="edit">
      <span class="font-size-middle">{{ currentConfig.edit.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Title',
  props: {
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    currentPage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  computed: {
    currentConfig () {
      let currentPage = this.currentPage
      return this.config[currentPage]
    }
  },
  methods: {
    /**
    * 跳转返回路径
    */
    goBack () {
      let turnTo = ''
      let currentPage = this.currentPage
      let config = this.config
      turnTo = config[currentPage].back.turnTo
      this.$emit('prevPage', turnTo)
    },
    /**
    * 跳转下一个路径
    */
    edit () {
      let turnTo = ''
      let currentPage = this.currentPage
      let config = this.config
      turnTo = config[currentPage].edit.turnTo
      this.$emit('nextPage', turnTo)
    }
  }
}
</script>

<style scoped>
.font-size-base{
  font-size: 16px;
}
.font-size-middle{
  font-size: 14px;
}
.title{
  position: relative;
  height: 64px;
  line-height: 64px;
  text-align: center;
  background-color: #ffffff;
  border-bottom: 1px solid #f3f3f3;
}
.title-left{
  position: absolute;
  top: 0;
  left: 20px;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  color: #414141;
}
.title-content{
  font-family: PingFangSC-Regular;
  color: #333333;
}
.title-right {
  position: absolute;
  top: 0;
  right: 20px;
  cursor: pointer;
  font-family: PingFangSC-Regular;
  color: #414141;
}
.iconStyle{
  width: 8px;
  height: 12px;
  position: relative;
  top: 1px;
  margin-right: 3px;
}
</style>
