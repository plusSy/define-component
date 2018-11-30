<template lang="html">
  <div class="address">
    <Title :config="titleConfig" :currentPage="currentPage" @nextPage="nextPage" @prevPage="prevPage"></Title>
    <template v-if="currentPage === 'addressList'">
      <AddressList :addressList="addressList"></AddressList>
    </template>
    <template v-else-if="currentPage === 'addressManage'">
      <AddressManage :addressList="addressList" @editAddress="editAddress"></AddressManage>
    </template>
    <template v-else-if="currentPage === 'editAdress'">
      <EditAddress :injectData="singleObj"></EditAddress>
    </template>
    <template v-else>
      <AddAddress :injectData="singleObj"></AddAddress>
    </template>
  </div>
</template>

<script>
import Title from './title'
import AddressList from './addressList'
import AddressManage from './addressManage'
import AddAddress from './addAddress'
import EditAddress from './addAddress'

export default {
  name: 'OcjAddress',
  components: {
    Title,
    AddressList,
    AddressManage,
    AddAddress,
    EditAddress
  },
  data () {
    return {
      currentPage: 'addressList',
      titleConfig: {
        addressList: {
          pageName: 'addressList',
          back: { name: '返回', turnTo: '' },
          content: { name: '选择收货地址' },
          edit: { name: '管理', turnTo: 'addressManage' }
        },
        addressManage: {
          pageName: 'addressManage',
          back: { name: '返回', turnTo: 'addressList' },
          content: { name: '收货地址管理' },
          edit: { name: '添加', turnTo: 'addAdress' }
        },
        editAdress: {
          pageName: 'editAdress',
          back: { name: '返回', turnTo: 'addressManage' },
          content: { name: '修改收货地址' },
          edit: { name: '', turnTo: '' }
        },
        addAdress: {
          pageName: 'addAdress',
          back: { name: '返回', turnTo: 'addressManage' },
          content: { name: '添加收货地址' },
          edit: { name: '', turnTo: '' }
        }
      },
      singleObj: {},
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
  methods: {
    nextPage (option) {
      if (option) {
        this.currentPage = option
        this.singleObj = {};
      }
    },
    prevPage (option) {
      if (option) {
        this.currentPage = option
      }
    },
    editAddress (addCell) {
      this.currentPage = 'editAdress'
      addCell.injectType = 'edit'
      this.singleObj = addCell;
    }
  }
}
</script>

<style scoped></style>
