<template>
    <div>
      <transition name="fade">
        <div v-if="showDetailDailog" class="wrapper">
          <div class="content">
            <slot>emty</slot>
          </div>
          <i class="icon-close footer" @click="closeDailog"></i>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        props:{
          showDetailDailog:{
              type:Boolean
          }
        },
        data () {
            return {}
        },
        methods:{
          closeDailog(){
              this.$emit('closeDailog',{})
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
    transform: translateY(-500px);
  }
    .wrapper
      position:fixed
      top: 0px
      left: 0px
      z-index:100
      width:100%
      height:100%
      display:flex
      flex-flow:column
      background-color:rgba(7,17,27,0.8)
      .content
        overflow:auto
        flex:1
      .footer
        height:50px
        text-align:center
        line-height:50px
        cursor:pointer

</style>
