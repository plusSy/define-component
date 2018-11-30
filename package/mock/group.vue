<template>
  <div class="groups" ref="groups">
    <div :class="['group']" :style="groupStyle">
      <div :style="slideStyle">
        <slot></slot>
      </div>
    </div>

    <button class="define-button" @click="handleGroupsWidth">切换 {{ activeIndex }}</button>
  </div>
</template>

<script>
export default {
  name: 'Group',
  data () {
    return {
      groupWidth: 0,
      groupItemLength: 0,
      activeIndex: 0
    }
  },
  computed: {
    len () {
      return this.groupItemLength
    },
    groupStyle () {
      return {
        fontSize: '16px',
        width: (this.len * this.groupWidth) + 'px'
      }
    },
    slideStyle () {
      return {
        transform: 'translateX(-' + this.activeIndex * this.groupWidth + 'px)',
        transition: `${this.activeIndex === 0 ? '' : 2000 / 1000}s ease`
      }
    }

  },
  mounted () {
    this.groupWidth = this.$refs.groups.offsetWidth
    this.groupItemLength = this.$children.length
    console.log('this.$children', this.$children)
  },
  methods: {
    handleGroupsWidth () {
      this.activeIndex = this.activeIndex < this.groupItemLength - 1 ? this.activeIndex + 1 : 0
    }
  }
}
</script>

<style lang="css" scoped>
.groups{
  height: 100%;
  width: 100%;
  overflow-x: scroll;
  overflow-y: hidden;
}
.group{
  height: 100%;
}
.define-button{
  padding: 2px 10px;
  border: 1px solid #000;
  border-radius: 3px;
  background-color: #ffffff;
  position: absolute;
  top: 120px;
  right: 40px;
}
</style>
