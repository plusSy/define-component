<template>
  <div class="">
    <grid-row>
      <span>{{ localData[localDataKey.titleKey] }}</span>
    </grid-row>
  </div>
</template>
<script>
export default {
  name: 'TitleComponent',
  components: {
    gridRow: () => import('../grid/row')
  },
  data () {
    return {
      localData: {},
      localDataKey: {
        titleKey: 'title'
      }
    }
  },
  props: {
    /* 数据注入 */
    injectData: {
      type: [Object],
      required: true
    },
    /* key配置 */
    injectDataKey: {
      type: [Object]
    }
  },
  computed: {},
  methods: {}
}
</script>
