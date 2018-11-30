<template lang="html">
  <div class="cascaderChoose">
    <section class="tags">所在地区</section>
    <section class="area">
      <div class="area-tips">
        <span v-for="(item, index) in choosed" :key="index"  class="area-option" @click="chooseOneTip(item)">{{ item.groupName }}</span>
      </div>
      <div class="area-lists">
        <div
          v-for="(item, index) in showList"
          :key="index"
          :class="[item.isChoose ? 'area-cell-click' : 'area-cell']"
          @click="chooseOneArea(item, index)">
          <img src="../../asserts/images/copy.png" class="area-img" v-if="item.isChoose">
          <span class="area-groupName">{{ item.groupName }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'CascaderChoose',
  data () {
    return {
      showList: [],
      choosed: [
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海市', areaLgroup: '10', areaMgroup: '001', areaSgroup: '' },
        { groupName: '杨浦区', areaLgroup: '10', areaMgroup: '001', areaSgroup: '003', }
      ],
      areaList: [
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '北京', areaLgroup: '01', areaMgroup: '', areaSgroup: '', },
        { groupName: '上海', areaLgroup: '10', areaMgroup: '', areaSgroup: '', },
        { groupName: '山西', areaLgroup: '10', areaMgroup: '', areaSgroup: '', }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init () {
      let areaList = this.areaList;
      areaList = areaList.map(item => {
        item.isChoose = false
        return item
      })
      this.showList = areaList;
    },
    chooseOneArea (item, index) {
      let areaList = this.areaList;
      areaList = areaList.map((cell, cellIdx) => {
        cell.isChoose = cellIdx === index
        return cell
      })
      this.showList = areaList;
    },
    chooseOneTip (item) {
      console.log('choose who', item);
    }
  }
}
</script>

<style scoped>
.tags{
  font-family: PingFangSC-Medium;
  font-size: 16px;
  color: #414141;
  text-align: center;
  height: 45px;
  line-height: 45px;
  border-bottom: 1px solid #f3f3f3;
}
.area{
  padding: 0 15px;
}
.area-tips{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #7F7F7F;
  height: 40px;
  line-height: 40px;
  text-align: left;
  border-bottom: 1px solid #f3f3f3;
}
.area-option{
  padding: 0 10px;
  border-right: 2px solid #7f7f7f;
  cursor: pointer;
}
.area-option:last-child{
  border-right: none;
}
.area-lists{
  overflow-y: scroll;
  height: 270px;
}
.area-cell{
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #7f7f7f;
  height: 40px;
  line-height: 40px;
  text-align: left;
  border-bottom: 1px solid #f3f3f3;
  position: relative;
}
.area-cell-click{
  font-family: PingFangSC-Medium;
  font-size: 14px;
  color: #000013;
  height: 40px;
  line-height: 40px;
  text-align: left;
  border-bottom: 1px solid #f3f3f3;
  position: relative;
}
.area-img{
  width: 15px;
  height: 15px;
  position: absolute;
  z-index: 1;
  top: 30%;
  left: 8px;
}
.area-groupName{
  margin-left: 30px
}
</style>
