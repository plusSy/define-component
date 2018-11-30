<template>
  <div>
    <section class="add-form">
      <div class="form-username">
        <input type="text" class="form-input-large" placeholder="收货人姓名" v-model="filter.userName">
      </div>
      <div class="form-phone">
        <input type="text" class="form-input-large" placeholder="联系方式" v-model="filter.userPhone">
        <img src="../../asserts/images/telephonebook.png" class="imgIcon-phone">
      </div>
      <div class="form-address" @click="chooseCascader">
        <input type="text" class="form-input-large" placeholder="所在地区" v-model="filter.userAddress" :disabled="true">
        <img src="../../asserts/images/location.png" class="imgIcon-location">
      </div>
      <div class="form-addDetails">
        <textarea class="form-textarea" placeholder="详细地址(如接到,门牌号等,不少于5个字)" v-model="filter.details"></textarea>
      </div>
    </section>
    <section class="setDefault">
      <div class="fl col-60">
        <span class="font-size-base">设置为默认地址</span><br>
        <span class="font-size-small tips">每次下单时会使用该地址</span>
      </div>
      <div class="fr col-40 default-checkbox">
        <div class="container">
          <div class="bg_con">
            <input id="checked_1" type="checkbox" class="switch" v-model="filter.isDefault"/>
            <label class="label" for="checked_1"></label>
          </div>
        </div>
      </div>
    </section>
    <section class="sava-address">
      <button type="button" name="button" class="btn-save font-size-base" @click="saveAddress">保存地址</button>
    </section>
    <section class="cascaderChoose" v-if="isShowCascader">
      <CascaderChoose></CascaderChoose>
    </section>
  </div>
</template>

<script>
import CascaderChoose from '../cascaderChoose'

export default {
  name: 'AddAddress',
  components: {
    CascaderChoose
  },
  data () {
    return {
      filter: {
        userName: '',
        userPhone: '',
        userAddress: '',
        details: '',
        isDefault: ''
      },
      isShowCascader: false
    }
  },
  props: {
    injectData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    this.init();
  },
  methods: {
    init () {
      if (this.injectData.injectType === 'edit') {
        let injectData = this.injectData;
        injectData.isDefault = injectData.isDefault === '1'
        this.filter = injectData
      } else {
        this.filter = { userName: '', userPhone: '', userAddress: '', details: '', isDefault: '' }
      }
      console.log('injectData', this.filter)
    },
    saveAddress () {
      this.$parent.$emit('saveAddress', this.filter)
    },
    chooseCascader () {
      this.isShowCascader = !this.isShowCascader
    }
  }
}
</script>

<style scoped>
.fl{
  float: left;
}
.fr{
  float: right;
}
.font-size-base{
  font-size: 16px;
}
.font-size-small{
  font-size: 12px;
}
.form-input-large{
  width: 100%;
  padding: 0 5px;
  outline: none;
  border: none;
  height: 40px;
}
.form-textarea{
  width: 100%;
  height: 60px;
  padding: 10px 5px;
  outline: none;
  border: none;
  resize: none;
}
.add-form{
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 10px solid #f2f2f2;
}
.form-username {
  border-bottom: 1px solid #f2f2f2;
}
.form-phone{
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.imgIcon-phone{
  width: 18px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.form-address{
  border-bottom: 1px solid #f2f2f2;
  position: relative;
}
.imgIcon-location{
  width: 16px;
  height: 20px;
  position: absolute;
  right: 12px;
  top: 10px;
}
.setDefault{
  padding: 10px 10px;
  background-color: #fff;
  overflow: hidden;
  text-align: left;
  border-bottom: 10px solid #f3f3f3;
}
.tips{
  color: #666666;
}
.default-checkbox{
  position: relative;
}
.container{
  width: 44px;
  position: absolute;
  top: 4px;
  right: 10px;
}
.switch{
  display:none;
}
.label{
  position:relative;
  display: block;
  /* padding: 1px; */
  border-radius: 24px;
  height: 24px;
  margin-bottom: 15px;
  background-color: #44db5e;
  cursor: pointer;
  vertical-align: top;
  -webkit-user-select: none;
  border: 1px solid #f3f3f3;
}
.label:before{
  content: '';
  display: block;
  border-radius: 24px;
  height: 22px;
  background-color: #f9f9f9;
  -webkit-transform: scale(1, 1);
  -webkit-transition: all 0.3s ease;
}
.label:after{
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -11px;
  margin-left: -11px;
  width: 22px;
  height: 22px;
  border-radius: 22px;
  background-color: #f9f9f9;
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.08);
  -webkit-transform: translateX(-9px);
  -webkit-transition: all 0.3s ease;
}
.switch:checked~.label:after{
  -webkit-transform: translateX(9px);
}
.switch:checked~.label:before{
  background-color: #44db5e;
}
.sava-address{
  padding: 0 10px;
  padding: 5px 10px 10px 10px;
  background-color: #f3f3f3;
}
.btn-save{
  width: 100%;
  padding: 11px 0;
  color: #fff;
  background: #F02D23;
  background-image: linear-gradient(225deg, rgba(255,183,0,0.30) 0%, rgba(255,0,0,0.30) 100%);
  box-shadow: 0 4px 6px 0 rgba(0,0,0,0.20);
  border-radius: 4px;
  font-family: PingFangSC-Regular;
  outline: none;
  border: none;
  cursor: pointer;
}
input[type="text" i]:disabled{
  background-color: #ffffff;
}
.cascaderChoose{
  width: 100%;
  height: 350px;
  position: fixed;
  bottom: 0px;
  /* background-color: rgba(0, 0, 0, 0.4) */
  background-color: #ffffff;
  border-top: 1px solid #f2f2f2;
}
</style>
