<template>
    <div>
      <div class="wrapper">
        <h1 class="seller-name">{{seller.name}}</h1>
      </div>
      <div class="star-box">
        <starts :score="getScore" :startType="startType"></starts>
      </div>
      <div class="title-info">
        <hr class="hr-left">
        <p class="info-title">优惠信息</p>
        <hr class="hr-right">
      </div>
      <div class="info-content">
        <ul>
          <li v-for="item in seller.supports" class="item-class">
            <i :class="picMap[item.type]" class="icon-class"></i><p>{{item.description}}</p>
          </li>
        </ul>
      </div>
      <div class="title-info">
        <hr class="hr-left">
        <p class="info-title">商家公告</p>
        <hr class="hr-right">
      </div>
      <p class="tell-content">
        {{seller.bulletin}}
      </p>
    </div>
</template>

<script>
  import Starts from './Starts.vue'
    export default {
        components:{
          Starts
        },
        props:{
            seller:{
                type:Object
            }
        },
        data () {
            return {
              startType:48,
              picMap:[]
            }
        },
        computed:{
            getScore(){
                if(this.seller.score){
                    return this.seller.score
                }else{
                    return 0.0
                }
            }
        },
        created(){
          this.picMap = ['decrease','discount','special','invoice','guarantee']
        },
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../../common/stylus/mixin.styl"
  path = '../../header/'
  .wrapper
    .seller-name
      text-align:center
      margin:64px auto 16px
      font-size: 16px
      font-weight:700
      line-height: 16px
    .star-box
      width: 165px
      margin:0px auto 28px
    .title-info
      padding:0px 36px
      display:flex
      .hr-left
        display:inline-block
        border:none
        border-top:2px solid rgba(255,255,255,0.2)
        flex:1
      .info-title
        display:inline-block
        width:100px
        text-align:center
      .hr-right
        display:inline-block
        border:none
        border-top:2px solid rgba(255,255,255,0.2)
        flex:1
    .info-content
      margin:24px 0 0 48px
      .item-class
        margin-bottom:10px
        font-size:12px
        line-height:12px
        p
          display:inline-block
          margin-left:6px
        .decrease
          display:inline-block
          vertical-align:top
          background-pic(path+'decrease_1')
          width:12px;
          height:12px
          background-size:12px 12px
        .discount
          display:inline-block
          vertical-align:top
          background-pic(path+'discount_1')
          width:12px;
          height:12px
          background-size:12px 12px
        .special
          display:inline-block
          vertical-align:top
          background-pic(path+'special_1')
          width:12px;
          height:12px
          background-size:12px 12px
        .invoice
          display:inline-block
          vertical-align:top
          background-pic(path+'invoice_1')
          width:12px;
          height:12px
          background-size:12px 12px
        .guarantee
          display:inline-block
          vertical-align:top
          background-pic(path+'guarantee_1')
          width:12px;
          height:12px
          background-size:12px 12px
        &:last-child
          margin-bottom:28px
    .tell-content
      margin:24px 48px 0 48px
      font-size:12px
      font-weight:200
      line-height:24px
</style>
