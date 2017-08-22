<template>
    <div class="shop-car" >
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
</template>

<script>
  import  Velocity from 'velocity-animate'
    export default {
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
              ball:{show:false}
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
          }
        },
        methods:{
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
          }
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .shop-car
    position:fixed
    left: 0px
    bottom: 0px
    height:48px
    width:100%
    background-color:#141D27
    display:flex
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
</style>
