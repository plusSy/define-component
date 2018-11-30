<template>
  <div class="modal fadeInUp" @click.stop="prevent" >
      <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'modal',
    created() {
      const component = this.$mount();
      document.querySelector('body').appendChild(component.$el);
    },
    methods: {
       prevent(e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        e.stopPropagation();
      }
    }
  }
</script>
<style>
  .modal {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    /* background-color: rgba(0,0,0,0.4); */
    color: #fff;
    z-index: 999;
    overflow: hidden;
  }
  .fadeInUp {
    -webkit-animation: fadeInUp;
    animation: fadeInUp;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
  }
</style>