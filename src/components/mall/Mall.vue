<template>
    <div class="mall">
      <div class="mall-header">
        <div class="top border-1px">
          <div class="top-left">
            <h1 class="mall-name">{{seller.name}}</h1>
            <div class="star-wrap"><starts :score="seller.score" :startType="36"></starts></div>
            <span class="rating-count">({{seller.ratingCount}})</span>
            <span class="seller-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="top-right">
            <i class="hart icon-favorite"></i>
            <div class="hart-tag">收藏</div>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-left">
            <div class="title">起送价</div>
            <span class="data">{{seller.minPrice}}</span>
            <span class="cell">元</span>
            </div>
          <div class="bottom-center">
            <div class="title">商家配送</div>
            <span class="data">{{seller.deliveryPrice}}</span>
            <span class="cell">元</span>
            </div>
          <div class="bottom-right">
            <div class="title">平均配送时间</div>
            <span class="data">{{seller.deliveryTime}}</span>
            <span class="cell">分钟</span>
            </div>
        </div>
      </div>
      <div class="notice-favourable">
        <div class="notice">
          <h1 class="notice-title">公告与活动</h1>
          <p class="notice-content">{{seller.bulletin}}</p>
        </div>
        <div class="favourable"></div>
      </div>
      <div class="mall-pics"></div>
      <div class="mall-info"></div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import Starts from '../../components/base/detail/Starts.vue'
  const NO_OK = 0
    export default {
      components:{
        Starts
      },
        data () {
            return {
                seller:{}
            }
        },
      created(){
        this.$http.get("/api/seller").then((res) => {
          res = res.body
          if(res.errNo === NO_OK){
            this.seller = res.data
           /* this.$nextTick(()=>{
              console.log(this.$refs.mallShow);
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.mallShow, {
                  click: true
                });
              }
            })*/
          }
        })
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .mall
    position:absolute
    top: 175px
    bottom: 0px
    left:0px
    right:0px
    //overflow:hidden
    background-color:#f3f5f7
    box-sizing:content-box
    .mall-header
      background-color: #ffffff
      color:rgb(7,17,27)
      .top
        margin:0 18px
        botton-1px(rgba(7,17,21,0.1))
        display:flex
        .top-left
          flex:5
          .mall-name
            color:rgb(7,17,27)
            font-size: 14px
            line-height:14px
            margin:18px 0 8px 0px
          .star-wrap
            display:inline-block
            margin:0 8px 18px 0px
          .rating-count,.seller-count
            font-size: 10px
            line-height:16px
            color:rgb(77,85,93)
            vertical-align:top
            margin-left:4px
        .top-right
          position:relative
          flex:1
          .hart
            color:rgb(240,20,20)
            font-size:24px
            line-height:24px
            position:absolute
            top:17px
            right:0px
          .hart-tag
            color:rgb(77,85,93)
            font-size: 10px
            line-height:10px
            position:absolute
            top:47px
            right:0px
      .bottom
        background-color: #ffffff
        color:rgb(7,17,27)
        display:flex
        padding:18px
        .bottom-left,.bottom-center
          border-right:1px solid rgb(147,153,159)
        .bottom-left,.bottom-center,.bottom-right
          flex:1
          text-align:center
          .title
            color:rgb(147,153,159)
            font-size: 10px
            line-height:18px
            text-align:center
            margin-bottom:4px
          .data
            font-size: 24px
            color:rgb(7,17,27)
            line-height:24px
            text-align:right
            display:inline-block
          .cell
            font-size: 10px
            color:rgb(7,17,27)
            line-height:10px
            text-align:left
            display:inline-block
    .notice-favourable
      margin-top:18px
      padding:18px
      background-color: #ffffff
      color:rgb(240,20,20)
      .notice
        .notice-title
          color:rgb(7,17,27)
          font-size: 14px
          line-height:14px
          margin-bottom:8px
        .notice-content
          padding:0 12px
          font-size: 12px
          font-weight:200
          line-height:24px
</style>
