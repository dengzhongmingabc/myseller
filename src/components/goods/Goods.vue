<template>
    <div class="goods">
      <div class="meun" ref="menuwrapper">
        <ul class="meun-list">
          <li v-for="(item,index) in goods" class="meun-item" :class="{ current: index==currentIndex }" @click="selectMenu(index,$event)">
            <div class="content  botton-1px"  :class="{ currentbodernone: index==currentIndex||index==currentIndex-1 }"><i  v-if="item.type>0" class="icon" :class="picMap[item.type]"></i>{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="goods-list" ref="foodwrapper">
        <ul>
          <li v-for="item in goods" class="typeli">
            <div class="title">{{item.name}}</div>
            <ul>
              <li v-for="food in item.foods" class="foods-item botton-1px botton-1px-none">
                <img :src="food.icon" class="food-icon">
                <div class="food-content">
                  <div class="food-name">{{food.name}}</div>
                  <div v-if="food.description" class="food-description">{{food.description}}</div>
                  <div class="food-rating"><span class="sellCount">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span></div>
                  <div class="food-price"><span class="price">￥{{food.price}}</span><span v-if="food.oldPrice" class="old-price">￥{{food.oldPrice}}</span>
                    <div class="conctr-wrap">
                      <car-concrol :food="food" @addGoodInCar="addGoodInCar"></car-concrol>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-car :carGoods="goods" ref="carGoods"></shop-car>
      <good-detail></good-detail>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import ShopCar from './ShopCar.vue'
  import CarConcrol from '../base/carconctrol/CarConcrol.vue'
  import GoodDetail from './GoodDetail.vue'
  const NO_OK = 0
  export default {
    components:{
      ShopCar,
      CarConcrol,
      GoodDetail
    },
    data () {
        return {
            goods:[],
            picMap:[],
            scrollY:0,
            listHeight:[],
            goodInCar:[]
        }
    },
    created(){
      //let wrapper = document.getElementById("meun");

      //let scroll = new BScroll(wrapper)

        this.picMap = ['decrease','discount','special','invoice','guarantee']
        this.$http.get("/api/goods").then((res) => {
            res = res.body
            if(res.errNo === NO_OK){
              this.goods = res.data
            }
          this.$nextTick(()=>{
            this._initScroll()
            this._calculateHeight()
          })
        })

    },
    computed: {
      currentIndex () {
        for (let i = 0; i < this.listHeight.length; i++) {
          //判断当currentIndex在height1和height2之间的时候显示
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          //最后一个区间没有height2
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      addGoodInCar(el){
        this.$refs.carGoods.addGoodInCar(el)
      },
      _initScroll() {
        this.meunScroll = new BScroll(this.$refs.menuwrapper, {
          click: true
        });
        this.foodScroll = new BScroll(this.$refs.foodwrapper, {
          click: true,
          //探针作用，实时监测滚动位置
          probeType: 3
        });
        //设置监听滚动位置
        this.foodScroll.on('scroll', (pos) => {
          //scrollY接收变量
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        let foodList = this.$refs.foodwrapper.getElementsByClassName('typeli');
        let height = 0;
        //把第一个高度送入数组
        this.listHeight.push(height);
        //通过循环foodList下的dom结构，将每一个li的高度依次送入数组
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i]
          height += item.clientHeight
          this.listHeight.push(height);
        }
      },
      selectMenu (index,event) {
//      自己默认派发事件时候(BScroll),_constructed被置为true,但是浏览器原生并没有这个属性
        if (!event._constructed){
          return;
        }
        //运用BScroll接口，滚动到相应位置
        let foodList = this.$refs.foodwrapper.getElementsByClassName('typeli');
        //获取对应元素的列表
        let el = foodList[index];
        //设置滚动时间
        this.foodScroll.scrollToElement(el, 500);
      }
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position:absolute
    top: 175px
    bottom: 48px
    width:100%
    display:flex
    overflow:hidden
    .meun
      width: 80px
      background-color:#f3f5f7
      .meun-list
        width:80px
        .meun-item
          width:80px
          padding:0 12px
          height:54px
          color:rgb(77,85,93)
          font-size: 13px
          font-weight:200
          line-height:14px
          box-sizing:border-box
          .content
            height: 54px
            width:56px
            line-height: 14px
            text-align:left
            box-sizing:border-box
            display:table-cell
            vertical-align:middle
            botton-1px(rgba(7,17,21,0.1))
            .decrease
              display:inline-block
              vertical-align:top
              background-pic('decrease_3')
              width:14px;
              height:14px
              background-size:14px 14px
            .discount
              display:inline-block
              vertical-align:top
              background-pic('discount_3')
              width:14px;
              height:14px
              background-size:14px 14px
            .special
              display:inline-block
              vertical-align:top
              background-pic('special_3')
              width:14px;
              height:14px
              background-size:14px 14px
            .invoice
              display:inline-block
              vertical-align:top
              background-pic('invoice_3')
              width:14px;
              height:14px
              background-size:14px 14px
            .guarantee
              display:inline-block
              vertical-align:top
              background-pic('guarantee_3')
              width:14px;
              height:14px
              background-size:14px 14px
          .currentbodernone:after
            border:none
      .current
        background-color:#ffffff
        color:rgb(7,17,27)
        font-size: 14px
        font-weight:700
    .goods-list
      flex:1
      color:rgb(147,153,159)
      .title
        height:26px
        background-color:#f3f5f7
        border-left:4px solid #d9dde1
        line-height: 26px
        padding-left:10px
      .foods-item
        position:relative
        display:flex
        margin:18px
        padding-bottom:18px
        botton-1px(rgba(7,17,21,0.1))
        &:last-child
          padding-bottom:0px
        &:last-child:after
          border:none
        .food-icon
          display:inline-block
          height: 57px
          width: 57px
        .food-content
          flex:1
          width:100px
          display:inline-block
          margin-left:10px
          overflow:hidden
          text-overflow:ellipsis
          white-space:nowrap
          .food-name
            margin:4px 0
            color:rgb(7,17,27)
            font-size: 14px
            line-height:14px
          .food-description
            margin:4px 0
            height:10px
            color:rgb(147,153,159)
            font-size: 10px
            line-height:10px
          .food-rating
            margin:4px 0
            height:10px
            color:rgb(147,153,159)
            font-size: 10px
            line-height:10px
            .sellCount
              margin-right:8px
          .food-price
            position:relative
            margin:4px 0
            height:14px
            color:#F01414
            font-size: 14px
            line-height:14px
            font-weight:700
            .old-price
              font-size: 10px
              color:#93999F
              margin-left:8px
              text-decoration:line-through
            .conctr-wrap
              position:absolute
              color:#93999F
              bottom: -10px;
              right: -4px;
              z-index:500


</style>
