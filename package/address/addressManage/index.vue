<template>
  <div>
    <div class="address-list">
      <div v-for="(item, index) in list" :key="index" class="add-con">
        <div class="add-user">
          <span class="fl font-size-middle user-name">{{ item.userName }}</span>
          <span class="fr fonr-size-middle user-phone">{{ item.userPhone }}</span>
        </div>
        <div class="add-details">
          <div class="font-size-middle intwoline address-details">
            {{ item.details }}
          </div>
        </div>
        <div class="add-edit">
          <div class="fl font-size-small">
            <template v-if="item.isDefault === '1'">
              <input class="radio-input" type="radio" name="default" id="default" :checked="item.isDefault === '1'">
              <label class="radio-label" for="default">默认地址</label>
            </template>
            <template v-else>
              <input class="radio-input" type="radio" name="default" id="unDefault">
              <label class="radio-label" for="unDefault" @click="changeDefault(item, index)">设为默认地址</label>
            </template>
          </div>
          <div class="fr font-size-small">
            <span class="edit-check" @click="editAddress(item)">
              <img src="../../asserts/images/location.png" class="iconStyle"/>
              编辑
            </span>
            <span class="edit-delete" @click="delAddress(item)">
              <img src="../../asserts/images/location.png" class="iconStyle"/>
              删除
            </span>
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
    return {
      list: []
    }
  },
  props: {
    addressList: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  created () {
    this.list = this.addressList;
  },
  methods: {
    editAddress (item) {
      this.$emit('editAddress', item)
    },
    delAddress (item) {
      this.$parent.$emit('delAddress', item)
    },
    changeDefault (item, idx) {
      let AddressList = this.list
      AddressList = AddressList.map((item, index) => {
        item.isDefault = idx === index ? '1' : '0'
        return item
      })
      this.list = AddressList
      this.$parent.$emit('setDefault', item)
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
.font-size-middle{
  font-size: 14px;
}
.font-size-small{
  font-size: 12px;
}
.add-con{
  background-color: #fff;
  padding: 10px 15px;
  overflow: hidden;
  border-bottom: 10px solid #f3f3f3;
}
.add-user{
  overflow: hidden;
  margin-bottom: 10px;
}
.add-details{
  color: #666666;
  padding-bottom: 10px;
  border-bottom: 1px solid #f3f3f3;
}
.add-edit{
  overflow: hidden;
  color: #666666;
  padding: 10px 0 5px 0;
}
.intwoline{
   display: -webkit-box !important;
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
.user-name,.user-phone{
  font-family: PingFangSC-Regular;
  color: #333333;
}
.edit-check, .edit-delete{
  font-family: PingFangSC-Regular;
  color: #666666;
  cursor: pointer;
}
.edit-check{
  margin-right: 10px;
}
.iconStyle{
  width: 15px;
  height: 15px;
  position: relative;
  top: 2px;
}
.radio-label{
  position: relative;
  line-height: 16px;
}
.radio-input[type="radio"]{
  display: none;
}
.radio-input[type='radio']+.radio-label:before{
  margin-top: -2px;
  content: '';
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 6px;
  border-radius: 100%;
  vertical-align: middle;
  border: 1px solid #E4E4E4;
  background: #FFFFFF;
}

.radio-input[type='radio']:checked+.radio-label:before{
  background-image: url('../../asserts/images/copy.png');
  background-position: center center;
  background-size: 18px 18px;
}

</style>
