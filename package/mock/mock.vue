<template>
  <div class="mock">
    <ocj-group>
      <ocj-group-item v-for="(item, index) in localData" :key="index">
        <div class="item">
          {{ item.title }}
        </div>
      </ocj-group-item>
    </ocj-group>
  </div>
</template>

<script>
import OcjGroup from './group'
import OcjGroupItem from './group-item'

export default {
  name: 'graphic',
  components: { OcjGroup, OcjGroupItem },
  props: {
    injectData: {
      type: [Object],
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      localData: []
    }
  },
  created () {
    this.localData = this.injectData.list
  },
  methods: {}
}
</script>

<style lang="css" scoped>
.mock {
  width: 100%;
  height: 150px;
  background-color: antiquewhite;
}
.item{
  height: 100%;
  width: 100%;
  line-height: 150px;
  border-right: 1px solid;
}
</style>
