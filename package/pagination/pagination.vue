<template>
  <div class="ocj-pagination">
      <div class="page-total">共{{total}}条</div>
      <div class="page-container">
        <span class="page-arrows page-prev" @click="pagePrev">
          <img src="../asserts/images/arrows.png" v-if="activeCurrentPage > 1">
          <img src="../asserts/images/arrowsDisabled.png" v-if="activeCurrentPage <= 1">
        </span>
        <span>
          <input class="page-input" type="number" onkeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" :value="activeCurrentPage" :disabled="!total" @keyup.enter="changeCurrentPage" @change="changeCurrentPage"/><span>／</span>{{pageCount}}
        </span>
        <span class="page-arrows page-next" @click="pageNext">
            <img src="../asserts/images/arrows.png" v-if="activeCurrentPage < pageCount">
            <img src="../asserts/images/arrowsDisabled.png" v-if="activeCurrentPage >= pageCount">
        </span>
      </div>
      <div class="page-size-select">
          <select v-model="activePageSize" @change="changeSize">
            <option v-for="(pagesize, index) in pageSizes" :key="'pageSize' + index" :value="pagesize">{{pagesize}}条／页</option>
          </select>
      </div>
  </div>
</template>
<script>
export default {
  name: 'ocjPagination',
  /**
   * @desc 分页组件,
   * $emit sizeChange 每页显示个数改变
   *       currentChange 显示的页数改变
   */
  props: {
    /**
     * @desc 列表显示总条数
     */
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },
    /**
     * @desc 每页显示个数
     */
    pageSize: {
      type: Number,
      default: () => {
        return 10
      }
    },
    /**
     * @desc 数组元素为展示的选择每页显示个数的选项
     */
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 30, 40]
      }
    },
    /**
     * @desc 当前页数
     */
    currentPage: {
      type: Number,
      default: () => {
        return 1
      }
    }
  },
  computed: {
    pageCount() {
      return Math.ceil(this.total/this.activePageSize)
    }
  },
  data() {
    return {
      activePageSize: 10,
      activeCurrentPage: this.currentPage
    }
  },
  created() {
    this.initPageSize()
  },
  methods: {
    initPageSize() {
      if (this.pageSizes.includes(this.pageSize)) {
        this.activePageSize = this.pageSize;
      } else {
        this.activePageSize = 10;
      }
    },
    changeSize() {
      this.$emit('sizeChange', this.activePageSize);
    },
    changeCurrentPage(e) {
      let value = e.target.value;
      this.activeCurrentPage = Number(value) > this.pageCount ? this.pageCount :  value;
      if (this.activeCurrentPage < 1) {
        this.activeCurrentPage = 1;
      }
      this.$emit('currentChange', this.activeCurrentPage);
    },
    pagePrev() {
      if (this.activeCurrentPage <= 1) {
        return
      } 
      this.activeCurrentPage--;
      this.$emit('currentChange', this.activeCurrentPage);
    },
    pageNext() {
      if (this.activeCurrentPage >= this.pageCount) {
        return
      } 
      this.activeCurrentPage++;
      this.$emit('currentChange', this.activeCurrentPage);
    }
  }
}
</script>
<style lang="less" scoped>
.ocj-pagination {
  display: inline-flex;
  align-items: center;
  .page-total {
    display: inline-flex;
    align-items: center;
  }
  .page-container {
    display: inline-flex;
    align-items: center;
    .page-arrows {
      display: inline-block;
      width: 20px;
      height: 20px;
      >img {
        width: 100%;
      }
    }
    .page-prev {
      >img {
        transform: rotate(180deg);
      }
    }
    .page-input {
      width: 30px;
    }
  }
  .page-size-select {
    display: inline-flex;
  }
}

</style>