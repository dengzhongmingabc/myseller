<template>

    <div class="star-wrapper">
      <ul class="starts" >
        <li v-for="indexOn in noCount" class="starts_on" :class="nowOnClass"></li>
        <li v-if="halfCount===1" class="starts_half" :class="nowHalfClass"></li>
        <li v-for="indexOff in offCount" class="starts_off" :class="nowOffClass"></li>
      </ul>
    </div>
</template>

<script>
    export default {
      props:{
        score:{
              type:Number
          },
          startType:{
              type:Number,
              default:24
          }
      },
      data () {
          return {
          }
      },
      computed:{
        noCount(){
          if(this.score){
            return Math.floor((this.score*2)/2)
          }
          return 0
        },
        halfCount(){
          if(this.score){
            return  Math.floor(this.score*2)%2
          }
          return 0
        },
        offCount(){
          if(this.score){
            return 5-Math.floor((this.score*2)/2)-Math.floor(this.score*2)%2
          }
          return 0
        },
        nowOnClass(){
            return "star"+this.startType+"_on"
        },
        nowHalfClass(){
          return "star"+this.startType+"_half"
        },
        nowOffClass(){
          return "star"+this.startType+"_off"
        }
      }

    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  .star-wrapper
    .starts
      li
        display:inline-block
        text-align:center
        &.star24_on
          background-pic('star24_on')
          width: 10px
          height: 10px
          background-size:10px 10px
          margin-left:3px
        &.star24_half
          background-pic('star24_half')
          width: 10px
          height: 10px
          background-size:10px 10px
          margin-left:3px
        &.star24_off
          background-pic('star24_off')
          width: 10px
          height: 10px
          background-size:10px 10px
          margin-left:3px
        &.star36_on
          background-pic('star36_on')
          width: 15px
          height: 15px
          background-size:15px 15px
          margin-left:6px
        &.star36_half
          background-pic('star36_half')
          width: 15px
          height: 15px
          background-size:15px 15px
          margin-left:6px
        &.star36_off
          background-pic('star36_off')
          width: 15px
          height: 15px
          background-size:15px 15px
          margin-left:6px
        &.star48_on
          background-pic('star48_on')
          width: 25px
          height: 25px
          background-size:25px 25px
          margin-left:9px
        &.star48_half
          background-pic('star48_half')
          width: 25px
          height: 25px
          background-size:25px 25px
          margin-left:9px
        &.star48_off
          background-pic('star48_off')
          width: 25px
          height: 25px
          background-size:25px 25px
          margin-left:9px
        &:first-child
          margin-left:0px
</style>
