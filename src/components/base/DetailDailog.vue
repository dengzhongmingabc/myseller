<template>
    <div>
      <div class="wrapper">
        <div class="content">
          <slot>emty</slot>
        </div>
        <i class="icon-close footer" @click="closeDailog"></i>
      </div>
    </div>
</template>

<script>
    export default {
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
