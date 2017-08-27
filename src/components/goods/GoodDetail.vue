<template>
  <transition name="fade">
    <div class="dtl" v-show="detailShow" ref="dtlshow">
      <div>
        <div class="dtl-header">
          <div class="good-pic">
            <img :src="goodDtl.image" alt="">
            <i class="icon-arrow_lift icon-arrow" @click.stop="back"></i>
          </div>
          <div class="good-content">
            <div class="good-content-top">
              <h1 class="good-name">{{goodDtl.name}}</h1>
              <span class="sell-count">月售{{goodDtl.sellCount}}份</span>
              <span class="good-ratting">好评率{{goodDtl.rating}}%</span>
            </div>
            <div class="good-content-bottom">
              <div class="good-price">
                <span class="price">￥{{goodDtl.price}}</span>
                <span class="old-price" v-if="goodDtl.oldPrice">￥{{goodDtl.oldPrice}}</span>
              </div>
              <div class="controll-wrap">
                <div class="add-good" v-show="!goodDtl.count||goodDtl.count===0" @click="addGoodFirst($event)">
                  <div class="left-button"></div><div class="center-button">加入购物车</div><div class="right-button"></div></div>
                <car-concrol v-show="goodDtl.count&&goodDtl.count>0" :food="goodDtl" @addGoodInCar="addGoodInCar"></car-concrol>
              </div>
            </div>
          </div>
        </div>
        <div class="dtl-introduce">
          <h1>商品介绍</h1>
          <p v-if="goodDtl.info">{{goodDtl.info}}</p>
          <p v-if="!goodDtl.info">暂无介绍</p>
        </div>
        <rating :ratings="goodDtl.ratings"></rating>
      </div>
    </div>
  </transition>
</template>

<script>
  import CarConcrol from '../base/carconctrol/CarConcrol.vue'
  import BScroll from 'better-scroll'
  import Rating from '../base/Ratings.vue'
  export default {
    components:{
      CarConcrol,
      Rating
    },
    props:{
      detailShow:{
          type:Boolean,
          default:false
      },
      goodDtl:{
          type:Object,
          default:()=>{
              return {}
          }
      }

    },
    data () {
        return {
            addButtonShow:true,
            scroll:undefined
        }
    },
    watch: {
      detailShow: function (val, oldVal) {
        if(val){
          this.$nextTick(()=>{
              if(!this.scroll){
                this.scroll = new BScroll(this.$refs.dtlshow, {
                  click: true
                });
              }else{
                  this.scroll.refresh()
              }
          })
        }
      }
    },
    methods:{
      addGoodInCar(el){
        this.$emit("addGoodInCar",el)
      },
      back(){
          this.$emit("dtlBack",{})
      },
      addGoodFirst(event){
          this.$set(this.goodDtl,"count",1)
          this.$emit("addGoodInCar",{'el':event.target})
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
    top: 0px
    bottom: 48px
    width:100%
    height:100%
    z-index:60
    background-color:#f3f5f7
    color:red
    overflow:hidden
    .dtl-header
      position:relative
      width:100%
      background-color:#fff
      .good-pic
        position:relative
        width:100%
        height: 0px
        padding-top:100%
        box-sizing:border-box
        .icon-arrow
          position:fixed
          left: 10px
          top: 10px
          font-size: 15px
          color:#fff
          padding:5px
          cursor:pointer
        img
          position: absolute;
          top: 0px
          left: 0
          width:100%
          height:100%
      .good-content
        width:100%
        height:100px
        color:rgb(7,17,27)
        .good-content-top
          margin:18px 0px 18px 18px
          width:100%
          .good-name
            font-size:14px
            font-weight:700
            line-height:14px
            margin:0px 0px 8px 0px
          .sell-count,.good-ratting
            color:rgb(147,153,159)
            font-size:10px
            line-height:10px
        .good-content-bottom
          height:24px
          margin:0 18px
          display:flex
          .good-price
            line-height:24px
            flex:1
            .price
              color:#F01414
              font-size: 14px
              line-height:14px
              font-weight:700
            .old-price
              font-size: 10px
              color:#93999F
              margin-left:8px
              text-decoration:line-through
          .controll-wrap
            position:relative
            flex:1
            .add-good
              height: 24px
              width:94px
              line-height: 24px
              position:absolute
              right: 0px
              .left-button
                display:inline-block
                height: 24px
                width: 12px
                background-color:rgb(0,160,220)
                border-radius:  12px 0 0 12px
              .center-button
                display:inline-block
                height: 24px
                width: 70px
                background-color:rgb(0,160,220)
                vertical-align:top
                text-align:center
                font-size:10px
                color:#ffffff
              .right-button
                display:inline-block
                height: 24px
                width: 12px
                background-color:rgb(0,160,220)
                border-radius:  0 12px 12px 0




    .dtl-introduce
      background-color: #ffffff
      margin-top: 16px
      padding:18px
      h1
        font-size: 14px
        font-weight:200
        color:rgb(7,17,27)
        margin-bottom:6px
      p
        font-size: 10px
        font-weight:200
        color:rgb(77,85,93)
        padding-left:8px
        line-height:24px
    .dtl-reting
      background-color: #ffffff
      margin-top: 16px
      padding:18px
</style>
