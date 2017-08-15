<template>
    <div class="goods">
      <div class="meun">
        <ul class="meun-list">
          <li v-for="item in goods" class="meun-item">
            <div class="content  botton-1px"><i  v-if="item.type>0" class="icon" :class="picMap[item.type]"></i>{{item.name}}</div>
          </li>
        </ul>
      </div>
      <div class="goods-list">
        <ul>
          <li v-for="item in goods">
            <div class="title">{{item.name}}</div>
            <ul>
              <li v-for="food in item.foods" class="foods-item">
                <img :src="food.icon" class="food-icon">
                <div class="food-content">
                  <div class="food-name">{{food.name}}</div>
                  <div class="food-description">{{food.description}}</div>
                  <div class="food-rating"><span class="sellCount">{{food.sellCount}}</span><span class="rating">{{food.rating}}</span></div>
                  <div class="food-price"><span class="price">{{food.price}}</span><span class="old-price">{{oldPrice}}</span></div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  const NO_OK = 0
  export default {
    data () {
        return {
            goods:[],
            picMap:[]
        }
    },
    created(){
        this.picMap = ['decrease','discount','special','invoice','guarantee']
        this.$http.get("/api/goods").then((res) => {
            res = res.body
            if(res.errNo === NO_OK){
              this.goods = res.data
            }
        })
    }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .goods
    position:absolute
    top: 175px
    bottom: 58px
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
    .goods-list
      flex:1
      background-color:#f3f5f7
      color:rgb(147,153,159)
      .title
        height:26px
        border-left:4px solid #d9dde1
        line-height: 26px
        padding-left:10px
      .foods-item
        display:flex
        .food-icon
          height: 50px
          width: 50px
        .food-content
          flex:1
          display:inline-block

</style>
