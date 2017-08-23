<template>
  <div>
    <div class="shop-car" @click="showlist" >
      <div class="shop-car-left">
        <div class="icon-wrap">
          <div class="car-background" :class="{'not-empty':goodCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-if="goodCount>0" class="count">{{goodCount}}</div>
        </div>
        <div class="total-price" :class="{'price-lg-0':totalPrice>0}">
          ￥{{totalPrice}}
        </div>
        <div class="ball-wrap">
          <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
          >
            <div class="ball" v-if="ball.show"></div>
          </transition>
        </div>
      </div>
      <div class="shop-car-center">
        另需配送费￥{{sendPay}}元
      </div>
      <div class="shop-car-right" :class="{'enough':totalPrice>=minPay}">
        {{payDes}}
      </div>
    </div>
    <transition name="listshow">
      <div class="shop-list" v-show="shopcarlistshow&&goodCount>0">
        <div class="shop-header">
          <div class="title">购物车</div>
          <div class="clear" @click="clearGood">清空</div>
        </div>
        <div class="shop-content" ref="shopcontent">
          <ul>
            <li v-for="item in goodsInCar" class="good-in-car-li botton-1px">
              <div class="car-good-name">{{item.name}}</div>
              <div class="car-good-price">￥{{item.price*item.count}}</div>
              <div class="car-good-control"><car-concrol :food="item" @addGoodInCar="addGoodInCar"></car-concrol></div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="mastshow" >
      <div class="mast" v-show="shopcarlistshow&&goodCount>0" @click="showlist">
      </div>
    </transition>
  </div>
</template>

<script>
  import  Velocity from 'velocity-animate'
  import CarConcrol from '../base/carconctrol/CarConcrol.vue'
  import BScroll from 'better-scroll'
    export default {
        components:{
          CarConcrol
        },
        props:{
          sendPay:{
              type:Number,
              default:10
          },
          minPay:{
              type:Number,
              default:20
          },
          carGoods:{
            type:Array
          }
        },
        data(){
          return {
              ball:{show:false},
              shopcarlistshow:false,
              bs:undefined
          }
        },
        computed:{
          goodCount(){
                let count = 0;
                this.carGoods.forEach((goods)=>{
                  goods.foods.forEach((good)=>{
                    let c = good.count?good.count:0
                    count += c
                  })
                })
              if(count===0){
                this.shopcarlistshow = false
              }
              return count;
            },
          totalPrice(){
            let totalPrice = 0;
            this.carGoods.forEach((goods)=>{
                goods.foods.forEach((good)=>{
                  let c = good.count?good.count:0
                  totalPrice += good.price*c
                })
            })
            return totalPrice;
          },
          payDes(){
            if(this.totalPrice<=0){
                return `￥${this.minPay}起送`
            }else if(this.totalPrice<this.minPay){
                let min = this.minPay-this.totalPrice
                return `还需￥${min}元送`
            }else{
                return "去结算"
            }
          },
          goodsInCar(){
              let ret = []
            this.carGoods.forEach((goods)=>{
              goods.foods.forEach((good)=>{
                  if(good.count>0)
                    ret.push(good)
              })
            })
            return ret
          }
        },
        methods:{
          clearGood(){
            this.carGoods.forEach((goods)=>{
              goods.foods.forEach((good)=>{
                this.$set(good,'count',0)
              })
            })
          },
          showlist(){
            this.shopcarlistshow = !this.shopcarlistshow
            if(this.shopcarlistshow){
              this.$nextTick(()=>{
                if(this.bs){
                  this.bs.destroy()
                }
                this.bs = new BScroll(this.$refs.shopcontent, {
                  click: true
                });
              })
            }
          },
          addGoodInCar(data){
              if(this.ball.show){
                  return
              }
            this.ball.ele = data.el
            this.ball.show=true
          },
          beforeEnter: function (el) {
            let rects = this.ball.ele.getBoundingClientRect();
            let recte = el.getBoundingClientRect();
            let x = rects.left-32
            let y = -(window.innerHeight-rects.bottom-32)
            Velocity(el, {translateX:`${x}px`,translateY:`${y}px` }, { duration: 0 })
          },
          enter: function (el, done) {
            Velocity(el, { translateX:['0px','linear'],translateY:['0px',[.65,-0.51,.95,.46]] },{ duration: 300  ,complete: done })
          },
          afterEnter: function (el) {
            this.ball.show=false
          },
          _initsroll(){
            this.bs = new BScroll(this.$refs.shopcontent, {
              click: true
            });
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .shop-car
    position:fixed
    left: 0px
    bottom: 0px
    height:48px
    width:100%
    background-color:#141D27
    display:flex
    z-index:600
    .shop-car-left
      position:relative
      width:118px
      .icon-wrap
        position:absolute
        left:0px
        bottom:0px
        height: 44px
        width:44px
        margin:0 18px 8px 18px
        border-radius:50%
        box-sizing:border-box
        z-index:101
        background-color:#141D27
        .car-background
          width: 38px
          height: 38px
          margin:auto
          margin-top:3px
          border-radius:50%
          box-sizing:border-box
          text-align:center
          background-color:rgba(255,255,255,0.4)
          &.not-empty
            background-color:#00A0DC
          .icon-shopping_cart
            line-height:38px
            font-size:24px
        .count
          position:absolute
          top: 0px
          right:0px
          height: 12px;
          width: 20px;
          text-align:center
          background-color:red
          border-radius:5px
      .total-price
        position:absolute
        right: 0px
        bottom:0px
        height:48px
        font-size: 16px
        font-weight:700
        line-height:48px
        border-right:1px solid #2B343C
        padding-right:12px
        color:rgba(255,255,255,0.4)
        &.price-lg-0
          color:#ffffff
      .ball-wrap
        position:fixed
        left: 32px
        bottom:32px
        z-index:300
        .ball
          height: 20px
          width: 20px
          border-radius:50%
          background-color:#00A0DC
    .shop-car-center
      flex:1
      height: 48px
      line-height:48px
      font-size: 10px
      color:rgba(255,255,255,0.4)
      padding-left:6px
    .shop-car-right
      width:85px
      background-color:rgba(255,255,255,0.4)
      height: 48px
      line-height:48px
      font-size: 10px
      color:rgba(255,255,255,0.4)
      text-align:center
      font-weight:700
      &.enough
        background-color:green
        color:#ffffff
  .shop-list
    position:fixed
    left: 0px
    bottom:48px
    width:100%
    z-index:1
    &.listshow-enter-active, &.listshow-leave-active
      transition: all .5s
    &.listshow-enter, &.listshow-leave-to
      transform: translateY(500px);
    .shop-header
      height:40px
      background-color:#f3f5f7
      display:flex
      .title
        display inline-block
        text-align:left
        line-height:40px
        padding-left:10px
        font-size: 14px
        font-weight:200
        color:rgb(7,17,27)
        flex:1
      .clear
        display inline-block
        text-align:right
        line-height:40px
        padding-right:10px
        font-size: 12px
        color:rgb(0,160,220)
        flex:1
        cursor:pointer
    .shop-content
      max-height:265px
      background-color:white
      color:rgb(7,17,27)
      font-size:14px
      line-height:24px
      width:100%
      overflow:hidden
      padding-left:10px
      padding-right:10px
      box-sizing:border-box
      .good-in-car-li
        display:flex
        width:100%
        botton-1px(rgba(7,17,21,0.1))
        .car-good-name
          display inline-block
          width:120px
          height: 48px
          line-height:48px
          font-size: 14px
          color:rgb(7,17,27)
        .car-good-price
          display inline-block
          height: 48px
          line-height:48px
          text-align:right
          padding-right:10px
          color:red
          flex:1
        .car-good-control
          display inline-block
          height: 48px
          width:80px
          margin-top:9px
  .mast
    position:fixed
    bottom: 0px
    left: 0px
    width:100%
    height:100%
    background-color:rgba(7,17,27,0.6)
    blur:10px
    z-index:0
    &.mastshow-enter-active, &.mastshow-leave-active
      transition: all .5s
    &.mastshow-enter, &.mastshow-leave-to
      opacity:0
</style>
