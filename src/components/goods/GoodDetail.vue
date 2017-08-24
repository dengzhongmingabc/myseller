<template>
  <transition name="fade">
    <div class="dtl" v-show="show">
      xxxxx
    </div>
  </transition>
</template>

<script>
  export default {
    data () {
        return {
            show:false
        }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  &.fade-enter-active, &.fade-leave-active
    transition: all .5s
  &.fade-enter, &.fade-leave-to
    transform: translateX(100%);
  .dtl
    position:fixed
    left: 0px
    bottom: 48px
    width:100%
    height:100%
    z-index:60
    background-color:#cccccc
    color:red
</style>
