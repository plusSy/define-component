<template>
  <div>
    <div class="address-list">
      <div v-for="(item, index) in addressList" :key="index" class="add-con"  @click="chooseAddress(item)">
        <div class="row">
          <div class="row-con">
            <div class="col-20 fl row-left tag-tip font-size-middle">收货人</div>
            <div class="col-80 fr row-right">
              <span class="font-size-base">{{ item.userName }}</span>
              <span class="font-size-middle">{{ item.userPhone }}</span>
              <button type="button" name="button" class="btn-warning font-size-small" v-if="item.isDefault === '1'">默认</button>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-20 fl row-left">
            <img src="../../asserts/images/location.png" class="iconStyle"/>
          </div>
          <div class="col-80 fr row-right">
            <div class="font-size-middle intwoline address-details">{{ item.details }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddressList',
  data () {
    return {}
  },
  props: {
    addressList: {
      type: Array,
      default: ()=>{
        return []
      }
    }
  },
  methods: {
    chooseAddress (item) {
      this.$parent.$emit('chooseAddress', item)
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
.font-size-small{
  font-size: 12px;
}
.row{
  width: 100%;
  overflow: hidden;
}
.fl{
  float: left;
}
.fr{
  float: right;
}
.btn-warning{
  outline: none;
  padding: 2px 4px;
  border: none;
  border-radius: 2px;
  background-color: #EA543D;
  color: #ffffff;
  font-family: PingFangSC-Medium;
}
.add-con{
  background-color: #fff;
  padding: 10px 15px;
  overflow: hidden;
  border-bottom: 10px solid #f3f3f3;
}
.col-20{
  width: 20%;
}
.col-80{
  width: 80%;
}
.row-left{
  text-align: center;
}
.row-right{
  text-align: left;
}
.row-right span{
  margin-right: 5px;
  font-family: PingFangSC-Regular;
  color: #333333;
  letter-spacing: 0;
}
.row-con{
  height: 30px;
  line-height: 30px;
  margin-bottom: 10px;
}
.intwoline{
   display: -webkit-box;
   overflow: hidden;
   text-overflow: ellipsis;
   word-break: break-all;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 2;
  }
.address-details{
  color: #666666;
  text-align: left;
  font-family: PingFangSC-Regular;
  line-height: 1.3;
}
.tag-tip{
  color: #666666;
  font-family: PingFangSC-Regular;
  letter-spacing: 0;
}
.iconStyle{
  width: 13px;
  height: 20px;
  position: relative;
  top: 2px;
}
</style>
