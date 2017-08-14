<template>
    <div>
        <div class="header-wrap">
          <div class="header-top">
            <img :src="seller.avatar" class="mall-pic" alt=""><div class="content-wrap">
              <div class="name-wrap">
                <span class="name-icon"></span>
                <span class="name-content">{{seller.name}}</span>
              </div>
              <div class="descript-wrap">
                {{seller.description}}/{{seller.deliveryTime}}分钟即达
              </div>
              <div class="suport-wrap" v-if="seller.supports">
                <span :class="picMap[seller.supports[0].type]"></span>
                <span class="suport-content">{{seller.supports[0].description}}</span>
              </div>
            </div>
            <div class="suport-count" @click="showDailog">
              <span class="suport-count-content" v-if="seller.supports">{{seller.supports.length}}个</span>
              <i class="icon-keyboard_arrow_right"></i>
            </div>
          </div>
          <div class="header-bottion" @click="showDailog">
            <span class="tell-icon">
            </span><p class="tell-content">{{seller.bulletin}}</p>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
          <img :src="seller.avatar" class="bottiom-pic" alt="">
        </div>
    </div>
</template>

<script>
    export default {
        props:{
          seller:{
              type:Object
          }
        },
        data () {
            return {
                picMap:[]
            }
        },
        computed:{
            firstClass() {
                return "class-"+this.seller.support[0].type
            }
        },
        created(){
          this.picMap = ['decrease','discount','special','invoice','guarantee']
       },
      methods:{
        showDailog(){
            this.$emit('showDetail',{})
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header-wrap
    position:relative
    background-color:rgba(7,17,27,0.5)
    color:#fff
    font-size:10px
    font-weight:200
    .header-top
      position relative
      .mall-pic
        width: 64px
        height: 64px
        margin:24px 0px 18px 24px
        display:inline-block
        -webkit-border-radius:4px
        border-radius:2px
      .content-wrap
        display:inline-block
        vertical-align:top
        padding:24px 0px 0px 16px
        .name-wrap
          margin-top:2px
          .name-icon
            width:30px;
            height:18px
            display:inline-block
            background-pic('brand')
            background-size:30px 18px
          .name-content
            height:18px
            line-height:18px
            color: #ffffff
            font-size:16px
            font-weight:bold
            vertical-align top
        .descript-wrap
          margin-top:8px
          font-size: 12px
          font-weight:200
          height: 12px
          line-height:12px
        .suport-wrap
          margin-top:10px
          .suport-content
            font-size: 10px
            font-weight:200
            height: 10px
            line-height:10px
            vertical-align:top
          .decrease
            display:inline-block
            vertical-align:top
            background-pic('decrease_1')
            width:12px;
            height:12px
            background-size:12px 12px
          .discount
            display:inline-block
            vertical-align:top
            background-pic('discount_1')
            width:12px;
            height:12px
            background-size:12px 12px
          .special
            display:inline-block
            vertical-align:top
            background-pic('special_1')
            width:12px;
            height:12px
            background-size:12px 12px
          .invoice
            display:inline-block
            vertical-align:top
            background-pic('invoice_1')
            width:12px;
            height:12px
            background-size:12px 12px
          .guarantee
            display:inline-block
            vertical-align:top
            background-pic('guarantee_1')
            width:12px;
            height:12px
            background-size:12px 12px
      .suport-count
        display:inline-block
        width:51px
        height: 24px
        line-height:24px
        text-align:center
        background-color:rgba(0,0,0,0.2)
        position:absolute
        border-radius:14px
        bottom: 12px
        right: 12px
        cursor:pointer
        .suport-count-content
          font-size:10px
          font-weight:200
        .icon-keyboard_arrow_right
          font-size:10px
          font-weight:200
    .header-bottion
      cursor:pointer
      display:flex
      height: 28px
      padding:0 12px
      line-height:28px
      background-color:rgba(7,17,27,0.2)
      .tell-icon
        background-pic('bulletin')
        width:22px
        height:15px
        background-size:22px 15px
        margin-top:7px
      .tell-content
        overflow :hidden
        text-overflow:ellipsis
        white-space:nowrap
        flex:10
        margin:0 4px
      .icon-keyboard_arrow_right
        margin-top:9px
        vertical-align:middle
        width:22px
    .bottiom-pic
      position:absolute
      top: 0px
      left: 0px
      width:100%
      height:100%
      z-index:-1
      filter:blur(10px);
</style>
