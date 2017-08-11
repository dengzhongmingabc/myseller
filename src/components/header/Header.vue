<template>
    <div>
        <div class="header-wrap">
          <div class="header-top">
            <img :src="seller.avatar" class="mall-pic" alt="">
            <div class="content-wrap">
              <div class="name-wrap">
                <span class="name-icon"></span>
                <span class="name-content">{{seller.name}}</span>
              </div>
              <div class="descript-wrap">
                {{seller.description}}/{{seller.deliveryTime}}分钟即达
              </div>
              <div class="suport-wrap" v-if="seller.supports">
                <span class="suport-icon"></span>
                <span class="suport-content">{{seller.supports[0].description}}</span>
              </div>
            </div>
            <div class="suport-count">
              <span class="suport-count-content"></span>
              <span class="suport-count-icon"></span>
            </div>
          </div>
          <div class="header-botion">
            <span class="tell-icon"></span>
            <span class="tell-content"></span>
          </div>
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
            return {}
        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .header-wrap
    background-color #cccccc
    color:#fff
    .header-top
      .mall-pic
        width: 64px
        height: 64px
        padding:24px 16px 18px 24px
      .content-wrap
        .name-wrap
          .name-icon
            width:20px;
            height:20px
            display:inline-block
            background-pic('brand')
            background-size:20px 20px
</style>
