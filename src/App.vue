<template>
  <div id="app">
    <!-- <ocj-date-picker :value="currentDate"></ocj-date-picker> -->
    <!-- <ocj-side-menu  ref="sideMenu" direction="right" :wrapTarget="wrapTarget" :menuList="menuList" @closeMenu="closeMenu" @openMenu="openMenu"></ocj-side-menu>
    <ocj-modal ref="modal" direction="right" backgroundColor="#ffffff" :wrapTarget="wrapTarget" @closeModal="closeModal" @openModal="openModal">
      <button @click="headerFilterHandler">过滤条件</button>
    </ocj-modal>
    <div id="page-wrap">
      <ocj-header ref="header" @headerMenuHandler="headerMenuHandler" @headerSearchHandler="headerSearchHandler" @headerFilterHandler="headerFilterHandler">
        内容维护
        <div slot="more">
          <div style="height: 30px; border-bottom: 1px solid #e0e0e0;line-height: 30px;" @click="testHandler">测试</div>
          <div style="height: 30px; line-height: 30px;">跳转</div>
        </div>
      </ocj-header>
      <div class="container"> -->
        <!-- <ocj-tabs :currentTab="currentTab" :tabs="tabs" :sticky="true" :scrollable="false"></ocj-tabs> -->
        <!-- <ocj-tabs :sticky="true" :scrollable="false" @tab-click="tabClick">
          <ocj-tab value="baseInfo"><span slot="label"><img src="./assets/stop.png"/>基础配置</span></ocj-tab>
          <ocj-tab value="attr" label="属性设置" :disabled="false">属性设置</ocj-tab> -->
          <!-- <ocj-tab value="attr1" label="基础配置1"></ocj-tab>
          <ocj-tab value="attr2" label="属性设置1"></ocj-tab>
          <ocj-tab value="attr3" label="属性设置3"></ocj-tab> -->
        <!-- </ocj-tabs> -->
        <!-- <OcjMock :injectData="{list: list}"></OcjMock>
        <OcjCarousel :injectData="list" height="200" interval="2000" showDocts></OcjCarousel> -->
        <!-- <ocj-slide height="150" scrollType="progress">
          <ocj-slide-item v-for="(item, index) in list" :key="index" :item-width="100">
            <div class="item-class">{{ item.title }}</div>
          </ocj-slide-item>
        </ocj-slide> -->
        <div class="badges">
          <div class="badge-test">
            <ocj-badge type="dot" className="base-position"></ocj-badge>
          </div>

          <div class="badge-test">
            <ocj-badge type="count" className="base-position" count="349" :offset="[0, 10]"></ocj-badge>
          </div>

          <div class="badge-test"><ocj-badge type="text" className="base-position" text="hello word"></ocj-badge></div>

          <ocj-badge type="count" count="349" backgroundColor="green" overflowCount="120" :offset="[0, 10]"></ocj-badge>

          <ocj-badge type="count" count="349" overflowCount="120"></ocj-badge>
        </div>

        <OcjMock></OcjMock>

        <!-- tag  -->
        <!-- <div class="tags">
          <ocj-tag type="circle" radius="11" color="#666666" textClass="tag-class" @click="handleSupernatantClick">new标签</ocj-tag>
          <ocj-tag type="square"  @click="handleSupernatantClick">old标签</ocj-tag>

          <div class="inner-class">
            一个商品一个商品一个商品一个商品一个商品一个商品一个商品一个商品一个商品一个商品一个商品一个商品
            <ocj-tags direction="row" justifyContent="start" alignItems="end">
                <ocj-tag textClass="define-tag" order="3" placement="start" @click="handleSupernatantClick">标签</ocj-tag>
                <ocj-tag type="image" placement="center" @click="handleSupernatantClick">
                  <img class="img-class" src="./assets/bianji.png" alt="">
                </ocj-tag>
                <ocj-tag textClass="define-tag" order="1" placement="end" @click="handleSupernatantClick">标签</ocj-tag>
            </ocj-tags>
          </div>
        </div> -->

        <!-- <OcjFilter :filterConfig="filterConfig" active="price" active-color="#f0655d" :stick="true" @changeSort="changeSort">
          <demo-component :inject-data="{list: list}" align="center" numForOneRow="2" rowHeight="310"></demo-component>
        </OcjFilter> -->

        <!-- <ocj-card-swipe :height="150" :loop="true" :showIndicators="false" indicatorClass="indicatorClass">
          <ocj-card-item v-for="(number, nIdx) in 5" :key="nIdx">
            <div class="card-content">
              {{number}}
            </div>
          </ocj-card-item>
        </ocj-card-swipe>
        <ocj-date-picker :value="currentDate" :single="false" :autoComplete="true"></ocj-date-picker>
        <ocj-pagination :pageSize="20" :total="100" @sizeChange="handleSizeChange"></ocj-pagination>
        <ocj-table :border="true" :data="tableList" :columns="columns"></ocj-table>
        <ocj-list>
          <ocj-list-custom-item :hasSliding="true">
            <div slot="left">
              <div>*太神了！</div>
            </div>
            <div slot="right"><input placeholder="请输入内容"/></div>
          </ocj-list-custom-item>
          <ocj-list-item v-for="(item, index) in tableList" :key="index" :hasSliding="true">
            <div>{{item.title}}{{item.title}}{{item.title}}{{item.title}}{{item.title}}</div>
            <div>
              <span>{{item.title}}</span>
            </div>
            <div>{{item.title}}</div>
            <div slot="sliding" style="height: 100%;font-size:0;">
              <div style="display:inline-flex;width:75px; height: 100%; background-color: #455880;color:#ffffff;font-size:13px;justify-content: center;align-items: center;">查看流程</div>
              <div style="display:inline-flex;width:75px; height: 100%; background-color: #5481E2;color:#ffffff;font-size:13px;justify-content: center;align-items: center;">节点执行</div>
              <div style="display:inline-flex;width:75px; height: 100%; background-color: #E56D03;color:#ffffff;font-size:13px;justify-content: center;align-items: center;">操作日志</div>
            </div>
          </ocj-list-item>
        </ocj-list> -->
        <!-- <div v-for="(item, idx) in 200" :key="idx">
          {{item}}
        </div> -->
        <!-- <ocj-footer :list="footerList"> -->
          <!-- <template slot="custom">
            <span>
            <img src="./assets/stop.png"/>
            <div>停用</div>
          </span>
          <span>
            <img src="./assets/bianji.png"/>
            <div>编辑</div>
          </span>
          <span>
            <img src="./assets/zidingyi.png"/>
            <div>自定义</div>
          </span>
          <span>
            <img src="./assets/add.png"/>
            <div>添加</div>
          </span>
          <span>
            <img src="./assets/jianshao.png"/>
            <div>减少</div>
          </span>
          </template> -->
        <!-- </ocj-footer>
      </div>
    </div> -->
      <!-- <ocj-slide height="150">
        <ocj-slide-item v-for="(item, index) in list" :key="index" :item-width="100">
          <div class="item-class">{{ item.title }}</div>
        </ocj-slide-item>
      </ocj-slide> -->

    <!-- @saveAddress // 保存地址
      @delAddress // 删除地址
      @setDefault // 设为默认
      @chooseAddress // 选中一个地址
    -->
    <!-- <ocj-address
      :addressList="AddressList"
      @chooseAddress="chooseAddress"
      @saveAddress="saveAddress"
      @delAddress="delAddress"
      @setDefault="setDefault"
      >
    </ocj-address> -->

    <!-- <demo-component :inject-data="{list: list}" numForOneRow="2" rowHeight="210"></demo-component> -->
    <!-- <demo-component :inject-data="{list: list}" numForOneRow="1" rowHeight="170"></demo-component> -->

    <!-- 图文组合 -->
    <!-- <div class="graphic">
      <OcjGraphic
        :inject-data="{list: list}"
        :imageSize="{width: 60, height: 40}"
        :numForOneRow="5"
        rowHeight="80"
        padding="10"
        showText
        @click="clickGraphic"
      ></OcjGraphic>
    </div> -->

    <!--背景区域块-->
    <!--<ocj-background type="pixel" width="375" height="310" :customClass="'Bbackground'">-->
    <!--<ocj-headline  :center="false" :border="false" :isLink="true">-->
    <!--<template slot="title">-->
    <!--今日上新-->
    <!--</template>-->
    <!--<template slot="value">-->
    <!--更多-->
    <!--</template>-->
    <!--&lt;!&ndash;<template slot="rightIcon">&ndash;&gt;-->
    <!--&lt;!&ndash;<img width="20px" src="../package/asserts/images/more.png"/>&ndash;&gt;-->
    <!--&lt;!&ndash;</template>&ndash;&gt;-->
    <!--</ocj-headline>-->
    <!--&lt;!&ndash;倒计时组件&ndash;&gt;-->
    <!--&lt;!&ndash;<ocj-count-down  label="距结束" duringDate="37313959" width="140" height="30" >&ndash;&gt;-->
    <!--&lt;!&ndash;</ocj-count-down>&ndash;&gt;-->
    <!--&lt;!&ndash;<ocj-count-down label="结束" duringDate="37313959" type="circle" width="70" height="70" color="#FE325D">&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<template slot="icon">&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;<img src="../package/asserts/images/countdown.jpg"/>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;&lt;!&ndash;</template>&ndash;&gt;&ndash;&gt;-->
    <!--&lt;!&ndash;</ocj-count-down>&ndash;&gt;-->
    <!--&lt;!&ndash;<ocj-count-down width="80" height="80"></ocj-count-down>&ndash;&gt;-->
    <!--&lt;!&ndash;商品单元&ndash;&gt;-->
    <!--&lt;!&ndash;<ocj-pdt-item direction="row" :injectData="pdtItem" imageWidth="126" captionWidth="200" depthWidthRatio="1" imageTagJustify="start" imageTagAlign="start" :showQty="true" :showPrePrice="false" :showVolume="true" :showStoreName="true">&ndash;&gt;-->
    <!--&lt;!&ndash;<template slot="imageTag">&ndash;&gt;-->
    <!--&lt;!&ndash;<div style="width: 50px;height: 25px;background-color: #cc3300;">8.5</div>&ndash;&gt;-->
    <!--&lt;!&ndash;<div style="width: 50px;height: 25px;background-color: #fff;">8.5</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</template>&ndash;&gt;-->
    <!--&lt;!&ndash;<template slot="video">&ndash;&gt;-->
    <!--&lt;!&ndash;<div style="width: 25px;height: 25px;background-color: #fff;border-radius: 50%;">8.5</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</template>&ndash;&gt;-->
    <!--&lt;!&ndash;<template slot="captionTag">&ndash;&gt;-->
    <!--&lt;!&ndash;<div style="width: 30px;height: 25px;background-color: #cc3300;">赠品</div>&ndash;&gt;-->
    <!--&lt;!&ndash;</template>&ndash;&gt;-->
    <!--&lt;!&ndash;</ocj-pdt-item>&ndash;&gt;-->
    <!--</ocj-background>-->
    <!--商品列表-->
    <!-- <ocj-headline  :center="false" :border="false" :isLink="false">
      <template slot="title">
        更多心水好物
      </template>
      <template slot="value">
        更多
      </template>
    </ocj-headline> -->
    <!-- <ocj-pdt-list :width="187" :height="265" columns="2" :injectData="pdtList" :showQty="false" imageWidth="126" captionWidth="126" depthWidthRatio="1.2" wrap="nowrap" :border="true" @itemClick="itemClick"> -->
    <!--出插槽-->
    <!-- <template v-for="(item, index) in pdtList"> -->
    <!--<div :slot="'imageTag'+ index" :key="index">-->
    <!--<div style="width: 25px;height: 25px;background-color: #cc3300; ">8.5</div>-->
    <!--<div style="width: 25px;height: 25px;background-color: greenyellow;">8.5</div>-->
    <!--</div>-->
    <!-- <div :slot="'video'+ index" :key="index">
          <div style="width: 25px;height: 25px;background-color: #fff;border-radius: 50%;">8.5</div>
        </div> -->
    <!--<div :slot="'captionTag' + index" :key="index">-->
    <!--<div style="width: 30px;height: 25px;background-color: #cc3300;">赠品</div>-->
    <!--</div>-->
    <!-- </template> -->
    <!-- </ocj-pdt-list> -->

    <!-- 测试 -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import OcjHeadline from '../package/headline/headline'
import OcjCountDown from '../package/countDown/countDown'
import OcjPdtList from '../package/pdtList/pdtList'
import OcjAddress from '../package/address/address'
import { AuthList } from './mock/menu.js'
import OcjMock from '../package/mock/mock.vue'
export default {
  name: 'App',
  components: {
    OcjPdtList,
    OcjCountDown,
    OcjHeadline,
    HelloWorld,
    OcjAddress,
    OcjMock
  },
  filters: {
    useYn: function (value) {
      let nodeTypes = {
        'Y': '有效',
        'N': '无效'
      }
      return value ? (nodeTypes[value] ? nodeTypes[value] : '') : ''
    }
  },
  data () {
    let vm = this
    return {
      currentDate: '',
      showMenu: false,
      showModal: false,
      wrapTarget: 'page-wrap',
      menuList: AuthList,
      currentTab: 'baseInfo',
      footerList: [
        {
          text: '停用',
          iconPath: require('./assets/add.png')
        },
        {
          text: '编辑',
          iconPath: require('./assets/bianji.png'),
          selectedIconPath: require('./assets/stop.png')
        },
        {
          text: '自定义'
        },
        {
          text: '添加'
        },
        {
          iconPath: require('./assets/bianji.png'),
          text: '减少'
        },
        {
          iconPath: require('./assets/bianji.png'),
          text: '减少1'
        }
      ],
      tabs: [
        {
          title: '基础信息',
          value: 'baseInfo',
          disabled: false
        },
        {
          title: '属性设置',
          value: 'attr',
          disabled: false
        }
      ],
      columns: [
        {
          'prop': 'title',
          'label': '序号',
          'width': '50',
          'fixed': false,
          'type': 'index'
        },
        {
          'prop': 'coding',
          'label': '编码',
          'width': '50',
          'type': 'text'
        },
        {
          'prop': 'coding',
          'label': '编码',
          'type': 'render',
          'render': (h, params) => {
            return h('input', {
              props: {
                type: 'text',
                value: vm.tableList[params.index].coding
              },
              on: {
                'change': (e) => {
                  vm.tableList[params.index].coding = e.target.value
                  this.inputChange(params)
                }
              }
            })
          }
        },
        {
          'prop': 'status',
          'label': '状态',
          'width': '50',
          'type': 'render',
          'render': (h, params) => {
            return h('span', this.filterStatus(params.row.status))
          }
        },
        {
          'prop': 'type',
          'label': '类型',
          'type': 'render',
          'render': (h, params) => {
            return h('div', {
              on: {
                click: () => {
                  this.show(params)
                }
              }
            }, '查看')
          }
        }
      ],
      tableList: [
        {
          'title': '太神了！只用一张纸',
          'coding': '00',
          'type': 'Y',
          'status': 'Y'
        },
        {
          'title': '家里洗碗海绵',
          'coding': '01',
          'type': 'N',
          'status': 'N'
        },
        {
          'title': '家里洗碗海绵',
          'coding': '01',
          'type': 'N',
          'status': 'N'
        }
      ],
      list: [
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          src: 'http://img0.imgtn.bdimg.com/it/u=4077062070,269348422&fm=26&gp=0.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱',
          salePrice: '1180.25',
          title: '低价拼团 低价拼团'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          src: 'http://img4.imgtn.bdimg.com/it/u=110713121,4239598869&fm=26&gp=0.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          title: '热销排行'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          src: 'http://img2.imgtn.bdimg.com/it/u=3991438386,2977260234&fm=26&gp=0.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          title: '会员专享'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          src: 'http://img0.imgtn.bdimg.com/it/u=4077062070,269348422&fm=26&gp=0.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          title: '猜球有奖'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          src: 'http://img1.imgtn.bdimg.com/it/u=3616567265,3534072594&fm=26&gp=0.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          title: '抢红包'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          src: 'http://img4.imgtn.bdimg.com/it/u=2565229834,2719000618&fm=26&gp=0.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          title: '松下拼团'
        }
      ],
      pdtItem: {
        firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
        itemName: '松下(Panasonic) 多功能蒸烤箱 松下(Panasonic) 多功能蒸烤箱',
        salePrice: '180.25',
        preQty: '80',
        salesVolume: '145',
        specialGoodsTotalPrice: '189.25',
        venShopName: 'ONLY旗舰店'
      },
      AddressList: [
        { addId: '0', userId: '', userName: '常画榆', userPhone: '15296176009', isDefault: '1', details: '上海市闵行区浦江镇V领地青年公寓芦恒路社区店林恒路18号, 上海市闵行区浦江镇V领地青年公寓芦恒路社区店林恒路18号' },
        { addId: '1', userId: '', userName: '常画榆', userPhone: '15296176009', isDefault: '0', details: '上海市闵行区浦江镇V领地青年公寓芦恒路社区店林恒路18号' },
        { addId: '2', userId: '', userName: '常画榆', userPhone: '15296176009', isDefault: '0', details: '上海市闵行区浦江镇V领地青年公寓芦恒路社区店林恒路18号' }
      ],
      filterConfig: [
        {
          label: '销量',
          type: 'normal',
          value: 'order'
        },
        {
          label: '新品',
          type: 'normal',
          value: 'sdate'
        },
        {
          label: '价格',
          type: 'sort',
          value: 'price'
        },
        {
          label: '筛选',
          type: 'filter',
          value: 'filter'
        }
      ],
      pdtList: [
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱 松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          preQty: '80',
          salesVolume: '145',
          specialGoodsTotalPrice: '189.25',
          venShopName: 'ONLY旗舰店'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱 松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          preQty: '80',
          salesVolume: '145',
          specialGoodsTotalPrice: '189.25',
          venShopName: 'ONLY旗舰店1'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱 松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          preQty: '80',
          salesVolume: '145',
          specialGoodsTotalPrice: '189.25',
          venShopName: 'ONLY旗舰店2'
        },
        {
          firstImgUrl: 'https://cdnimg.ocj.com.cn/item_images/item/15/17/1705/15171705L.jpg',
          itemName: '松下(Panasonic) 多功能蒸烤箱 松下(Panasonic) 多功能蒸烤箱',
          salePrice: '180.25',
          preQty: '80',
          salesVolume: '145',
          specialGoodsTotalPrice: '189.25',
          venShopName: 'ONLY旗舰店3'
        }
      ]
    }
  },
  methods: {
    saveAddress (opt) {
      console.log('APP.vue saveAddress', opt)
    },
    delAddress (opt) {
      console.log('APP.vue delAddress', opt)
    },
    setDefault (opt) {
      console.log('APP.vue setDefault', opt)
    },
    chooseAddress (opt) {
      console.log('APP.vue chooseAddress', opt)
    },
    changeSort (cell) {
      console.log('changeSort', cell)
      if (cell.name === '筛选') {
        alert('打开筛选弹层')
      }
    },
    itemClick (value) {
      console.log(value)
    },
    tabClick (value) {
      console.log(value)
    },
    closeMenu () {
      this.showMenu = false
    },
    openMenu () {
      this.showMenu = true
    },
    headerMenuHandler () {
      if (this.showMenu) {
        this.$refs.sideMenu.pull()
      } else {
        this.$refs.sideMenu.push()
      }
      // this.showMenu = !this.showMenu
    },
    closeModal () {
      this.showModal = false
    },
    openModal () {
      this.showModal = true
    },
    headerFilterHandler () {
      if (this.showModal) {
        this.$refs.modal.pull()
      } else {
        this.$refs.modal.push()
      }
      // this.showMenu = !this.showMenu
    },
    headerSearchHandler () {

    },
    clickGraphic (item) {
      console.log('item', item)
    },
    inputChange (row) {
      console.log(row)
    },
    show (row) {
      console.log('row: ' + JSON.stringify(row))
    },
    filterStatus (val) {
      let params = {
        'Y': '有效',
        'N': '无效'
      }
      return params[val]
    },
    handleSupernatantClick () {
      console.log('handleSupernatantClick')
    },
    testHandler () {
      this.$refs.header.moreHandler()
    },
    handleSizeChange (val) {
      console.log(`每页${val}条`)
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: x;
}
.Bbackground {
  background: #fcfff2 !important;
  background-image: linear-gradient(
    -180deg,
    rgba(255, 168, 149, 0.5) 0%,
    rgba(255, 222, 173, 0.5) 93%
  ) !important;
}
#page-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
}
#page-wrap header {
  height: 80px;
  line-height: 80px;
  padding: 0 20px;
  text-align: left;
}
.container {
  position: relative;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding-top: 44px;
  padding-bottom: 44px;
  overflow-x: hidden;
  overflow-y: scroll;
  /*解决ios上滑动不流畅*/
  -webkit-overflow-scrolling: touch;
}
.cards {
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-content {
  width: 80%;
  height: 80%;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.inner-class{
  width: 100px;
  height: 130px;
  background-color: antiquewhite;
}
.item-class{
  width: 100%;
  height: 100%;
  background-color: azure;
  border-right: 1px solid #666666;
}
.indicatorClass {
  width: 8px!important;
  height: 2px!important;
  border-radius: 0!important;
  border: #ffffff!important;
  background-color: #f5f5f5;
}
.tags{

}
.define-tag{
  /* padding: 5px 10px; */
  line-height: 15px;
  background-color: #2c3e50;
  color: #ffffff;
}
.img-class{
  width: 20px;
  background-color: aliceblue;
}
.tag-class{
  color: #000;
  padding: 3px 15px;
}
.badges{
  height: 100px;
  width: 100%;
  border-bottom: 1px solid;
  border-top: 1px solid;
  text-align: left;
}
.badge-test{
  display: inline-block;
  width: 70px;
  height: 30px;
  margin: 20px auto 0;
  border: none;
  border-radius: 4px;
  background-color: #666666;
  position: relative;
}
.base-position{
  position: absolute;
  top: -0.5em;
  right: -0.5em;
}
</style>
