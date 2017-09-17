<template>
    <div class="mall-rating" ref="ratingShow">
      <div >
      <div class="header">
        <div class="left">
          <p class="score">{{seller.score}}</p>
          <h1 class="title">综合评分</h1>
          <p class="ranking">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="right">
          <div class="top">
            <div class="text">服务态度</div>
            <div class="star"><starts :score="seller.serviceScore" :startType="startType"></starts></div>
            <div class="score">{{seller.serviceScore}}</div>
          </div>
          <div class="center">
            <div class="text">服务质量</div>
            <div class="star"><starts :score="seller.foodScore" :startType="startType"></starts></div>
            <div class="score">{{seller.foodScore}}</div>
          </div>
          <div class="bottom">
            <div class="text">送达时间</div>
            <div class="sendTime">{{seller.deliveryTime}}分</div>
          </div>
        </div>
      </div>
      <div class="rating-list">
        <mall-ratings :ratings="ratings"></mall-ratings>
      </div>
    </div>
  </div>
</template>

<script>
    import BScroll from 'better-scroll'
    import Starts from '../../components/base/detail/Starts.vue'
    import MallRatings from '../base/MallRatings.vue'
    const NO_OK = 0
    export default {
      components:{
        Starts,MallRatings
      },
        data () {
            return {
              ratings:[],
              seller:{},
              startType:36,
              scroll:undefined
            }
        },
      created(){
        this.$http.get("/api/ratings").then((res) => {
          res = res.body
          if(res.errNo === NO_OK){
            this.ratings = res.data
          }
        });
        this.$http.get("/api/seller").then((res) => {
          res = res.body
          if(res.errNo === NO_OK){
            this.seller = res.data
          }
          this.$nextTick(()=>{
            if(!this.scroll){
              console.log(this.scroll);
              this.scroll = new BScroll(this.$refs.ratingShow, {
                click: true
              });
            }else{
              this.scroll.refresh()
            }
          })
        })
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .mall-rating
    position:absolute
    top: 175px
    bottom: 0px
    width:100%
    z-index:-100
    overflow:hidden
    background-color:#f3f5f7
    .header
      display:flex
      background-color:#ffffff
      .left
        width:120px
        border-right:1px solid rgba(7,17,27 0.1)
        margin:18px 4px 18px 4px
        .score
          color:rgb(255,153,0)
          text-align:center
          font-size: 24px
          margin-bottom:6px
        .title
          color:rgb(1,17,27)
          text-align:center
          font-size: 12px
          margin-bottom:8px
        .ranking
          color:rgba(1,17,27,0.5)
          text-align:center
          font-size: 10px
          margin-bottom:0px
      .right
        flex:1
        color:rgb(1,17,27)
        margin:24px 0 24px 8px
        .top,.center,.bottom
          margin-bottom:8px
          .text,.star,.score,.sendTime
            display:inline-block




</style>
