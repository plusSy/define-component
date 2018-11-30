<template>
  <table class="ocj-table__body" cellspacing="0" cellpadding="0" border="0">
    <thead 
      v-if="showHeader">
      <tr class="ocj-table__header-tr">
      <th 
        class="ocj-table_th"
        :class="['ocj-table_th_'+tdIndex, border ? 'hasBorder':'', td.fixed ? 'fixedColumn' : '']"
        v-for="(td, tdIndex) in tds" :key='"td" +tdIndex'
        :width="td.width  + 'px'"
        >
        <span>{{td.label}}</span>
      </th>
    </tr>
    </thead>
    <tbody>
      <tr 
        class="ocj-table__row" 
        :class="{'ocj-table__row-checked': checkedRow === rIdx, 'hasRowBorder': border}"
        v-for="(row, rIdx) in rows" 
        :key="'row' + rIdx"
        @click="checkedTableRow(row, rIdx)">
        <td 
          class="ocj-table_column"
          :class="['ocj-table_column_'+tdIndex, border ? 'hasBorder':'', td.fixed ? 'fixedColumn' : '']"
          v-for="(td, tdIndex) in tds" :key='"td" +tdIndex'
          :width="td.width + 'px'"
        >
          <span v-if="td.type === 'index'">{{rIdx+1}}</span>
          <table-expand
            v-else-if="td.type === 'render'"
            :row="row"
            :column="td"
            :index="rIdx"
            :render="td.render"></table-expand>
          <span v-else>{{row[td.prop]}}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
  import TableExpand from './expand';
  export default {
    name: 'ocjTableBody',
    components: {
      TableExpand
    },
    props: {
        /**
         * 是否显示表头
         */
        showHeader: {
          type: Boolean,
          default: () => {
            return true
          }
        },
        /**
         * table行数据
         */
        rows: Array,
        /**
         * table列数据
         */
        columns: Array,
        /**
         * 是否显示border 默认:false
         */
        border: {
          type: Boolean,
          default: () => {
            return trfalseue
          }
        }
    },
    data() {
      return {
        tds: [], // 列的集合
        checkedRow: '' // 选中行
      }
    },
    created() {
      this.analysisColumn()
    },
    methods: {
      analysisColumn() {
        this.$nextTick(function() {
          this.columns.forEach(column => {
            let td = {
              label: column.label,
              prop: column.prop, 
              type: column.type,
              width: column.width,
              fixed: column.fixed,
              render: column.render
            }
            this.tds.push(td)
          });
        })
      },
      /**
       * @params row: Object 行数据
       *         index: Number 选中行行号
       * emit {row, rowIndex}
       */
      checkedTableRow(row, index) {
        let value = {
          row: row,
          rowIndex: index
        }
        this.$emit('currentCheckedRow', value)
        this.checkedRow = index
      }
    }
  }
</script>
<style lang="less" scoped>
  .ocj-table__body {
    table-layout:fixed;
    width: 100%;
    overflow-x: scroll;
    border-collapse: collapse;
  }
   .ocj-table_th {
    padding: 10px 0;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #333333;
    text-align: center;
    background-color: #EFF6FF;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .ocj-table__row-checked {
    border-collapse: collapse;
    border: 2px solid #5481E2!important;
  }
  .hasRowBorder {
    border-bottom: 1px solid #D9D9D9;
  }
  .ocj-table_column {
    padding: 10px 0;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #333333;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    background-color: #ffffff;
  }
  .hasBorder {
    border-right: 1px solid #D9D9D9;
  }
  .fixedColumn {
    position: sticky;
    left: 0;
  }
</style>


