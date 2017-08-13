<template>
    <div>
      <div class="wrapper">
        <h1 class="seller-name">{{seller.name}}</h1>
      </div>
      <ul>
        <li v-for="item in items"></li>
      </ul>
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
  .wrapper
    .seller-name
      text-align:center
      margin:64px auto 16px
      font-size: 16px
      font-weight:700
      line-height: 16px
</style>
