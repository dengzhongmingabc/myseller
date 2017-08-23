<template>
    <div class="concrol-wrap">
      <transition name="fade">
          <div v-show="foodCount>0" class="decrease" @click="decrease($event)">
            <i class="icon-remove_circle_outline"></i>
          </div></transition><div class="count" v-show="foodCount>0">{{foodCount}}
    </div><div class="add" @click="add($event)">
        <i class="icon-add_circle"></i>
      </div>
    </div>
</template>

<script>
    export default {
      props:{
        food:{
          type:Object,
          default:function () {
            return {id:1,count:0,price:30}
          }
        }
      },
      data () {
          return {
              count:0
          }
      },
      computed:{
          foodCount(){
            return this.food.count?this.food.count:0
          }
      },
      methods:{
        add(event){
          if (!event._constructed){
            return;
          }
          if(this.food.count){
              this.food.count+=1;
          }else{
            this.$set(this.food,'count',1)
          }

          this.$emit('addGoodInCar',{'el':event.target})
        },
        decrease(event){
          if (!event._constructed){
            return;
          }
          if(this.food.count&&this.food.count>0){
            this.food.count-=1;
          }
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .fade-enter-active, .fade-leave-active {
    transition: all .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 1;
    transform: translateX(30px) rotate(360deg);
  }
  .concrol-wrap
    text-align:right
    .decrease
      font-size:24px
      line-height: 24px
      color:rgb(0,160,220)
      display:inline-block
      padding:3px
    .count
      display:inline-block
      width:20px
      height:24px
      text-align:center
      line-height:24px
      vertical-align:top
      padding:3px 0
    .add
      font-size:24px
      line-height: 24px
      color:rgb(0,160,220)
      text-align:center
      display:inline-block
      padding:3px
</style>
