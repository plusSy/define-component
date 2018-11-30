<template>
  <div class="table-column" ref="tableColumn">
    <slot :row="row"></slot>
  </div>
</template>
<script>
  export default {
    name: 'ocjTableColumn',
    props: {
      /**
       * 表头名称
       */
      label: String,
      /**
       * 列字段key
       */
      prop: String,
      /**列类型 */
      type: String,
      /**
       * 列宽度
       */
      width: [String, Number],
      /**
       * 是否固定列头
       */
      fixed: Boolean
    },
    data() {
      return {
        row: {
          'title': '太神了！只用一张纸',
          'coding': '00',
          'type': 'Y',
          'status': 'Y'
        }
      }
    },
    created() {
      // this.$parent.columns.push(this)
      // console.log(this)
    },
    destroyed() {
      // this.$parent.columns.splice(this.$parent.columns.indexOf(this), 1);
    }
  }
</script>
<style lang="less" scoped>

</style>  


