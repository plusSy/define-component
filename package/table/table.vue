<template>
  <div class="table-wrapper">
      <div 
        class="table_body__wrapper"
        ref="bodyWrapper"
      >
        <table-body :columns="columns" :rows="data" :showHeader="showHeader" :border="border"></table-body>
        <div
          v-if="!data || data.length === 0"
          class="el-table__empty-block"
          ref="emptyBlock">
          <span class="el-table__empty-text">
            <slot name="empty">{{ emptyText || '暂无数据' }}</slot>
          </span>
        </div>
      </div>
  </div>
</template>
<script>
  import tableBody from './table-body.vue'
  export default {
    name: 'ocjTable',
    components: {
      tableBody
    },
    data() {
      return {
        /**
         * 整个表格一共有多少列
         */
        // columns: []
      }
    },
    props: {
      /**
       * 是否显示表头 默认：true
       */
      showHeader: {
        type: Boolean,
        default: () => {
          return true
        }
      },
      /**
       * 每一列的配置信息
       */
      columns: {
        type: Array,
        required: true
      },
      /**
       * 表格数据
       */
      data: {
        type: Array,
        required: true
      },
      /**
       * 没有数据显示
       */
      emptyText: {
        type: String,
        default: () => {
          return '暂无数据'
        }
      },
      /**
       * 是否显示border 默认:false
       */
      border: {
        type: Boolean,
        default: () => {
          return false
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .table-wrapper {
    overflow: hidden;
    .table_body__wrapper {
      overflow-x: scroll;
    }
    .table_body__wrapper::-webkit-scrollbar {
      display: none;
    }
  }
</style>



