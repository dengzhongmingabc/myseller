<template>
  <div id="app">
    <my-header :seller="seller"></my-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/malls">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">商家</router-link>
      </div>
    </div>
    <div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Header from './components/header/Header.vue'
  const NO_OK = 0
  export default {
    name: 'app',
    components: {
      MyHeader: Header
    },
    data(){
        return{
          seller:{}
        }
    },
    created(){
        this.$http.get('/api/seller').then(response => {
            if(NO_OK===response.body.errNo){
              console.log(response.body)
              this.seller = response.body.data;
            }
        }, response => {
            console.log(response)
        });
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  @import "common/stylus/mixin.styl"
  #app
    .tab
      display: flex
      height: 40px
      line-height 40px
      width: 100%
      botton-1px(rgba(7,17,21,0.1))
      .tab-item
        flex 1
        text-align center
        & > a
            display block
  .active {
    color: red
  }

</style>
