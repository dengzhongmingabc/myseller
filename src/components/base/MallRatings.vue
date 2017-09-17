<template>
    <div>
      <div class="ret-head" >
        <h1 class="ret-title">商品评价</h1>
        <div class="button-wrap border-1px">
          <div class="all-button" :class="{'selected':type===1}" @click.stop="allClick">全部{{all}}</div>
          <div class="recomm-button" :class="{'selected':type===2}" @click.stop="recommClick">推荐{{recomm}}</div>
          <div class="against-button" :class="{'selected':type===3}" @click.stop="againstClick">吐槽{{against}}</div>
        </div>
        <div class="select-wrap">
          <i class="icon-check_circle" :class="{'contentselected':is_content}" @click.stop="contentClick"></i>
          <p class="select-content">只看有内容的评价</p>
        </div>
      </div>
      <div class="ret-content">
        <ul>
          <li v-for="rat in retingsList">
            <div class="reting-wrap   border-1px" >
              <div class="pic-wrap">
                <img :src="rat.avatar" class="pic" alt="">
              </div>
              <div class="reting-info">
                <div>
                  <div class="user-name">{{rat.username}}</div>
                  <div class="user-time">{{rat.rateTime | formmat}}</div>
                </div>
                <div>
                  <div class="user-star"><starts :score="rat.score" :startType="24"></starts></div>
                  <div class="delivery-time" v-if="rat.deliveryTime">{{rat.deliveryTime}}分钟送达</div>
                </div>
                <div class="user-text">{{rat.text}}</div>
                <div class="user-recommend">
                  <i :class="{'icon-thumb_down':rat.rateType===1,'down':rat.rateType===1,'up':rat.rateType===0, 'icon-thumb_up':rat.rateType===0}"></i>
                  <ul>
                    <li class="recomment" v-for="(item, index) in rat.recommend" v-if="index<3">
                        {{item}}<span v-if="rat.recommend.length>3&&index==2">...</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
  import {timeFormmat} from '../../common/js/common'
  import Starts from '../../components/base/detail/Starts.vue'
    const allList = 1;//全部
    const recommList = 2; //推荐
    const againstList = 3;//吐槽

    export default {
      components:{
        Starts
      },
        props:{
          ratings:{
              type:Array,
              default:function () {
                return []
              }
          }
        },
        data () {
            return {
              type:allList,
              is_content:false
            }
        },
        computed:{
            all(){
              let count = 0;
              this.ratings.forEach((o)=>{
                count++;
              })
              return count
            },
          recomm(){
            let count = 0;
            this.ratings.forEach((o)=>{
                if(o.rateType===0)
                  count++;
            })
            return count
          },
          against(){
            let count = 0;
            this.ratings.forEach((o)=>{
              if(o.rateType===1)
                count++;
            })
            return count
          },

          retingsList(){
            let retList = [];
            if(this.type===allList&&!this.is_content){
              this.ratings.forEach((o)=>{
                  retList.push(o);
              })
            }else if(this.type===allList&&this.is_content){
              this.ratings.forEach((o)=>{
                if(o.text)
                  retList.push(o);
              })
            }else if(this.type===recommList&&!this.is_content){
              this.ratings.forEach((o)=>{
                if(o.rateType===0)
                  retList.push(o);
              })
            }else if(this.type===recommList&&this.is_content){
              this.ratings.forEach((o)=>{
                if(o.rateType===0&&o.text)
                  retList.push(o);
              })
            }else if(this.type===againstList&&!this.is_content){
              this.ratings.forEach((o)=>{
                if(o.rateType===1)
                  retList.push(o);
              })
            }else if(this.type===againstList&&this.is_content){
              this.ratings.forEach((o)=>{
                if(o.rateType===1&&o.text)
                  retList.push(o);
              })
            }
        return retList
    }

        },
      filters:{
            formmat(time){
              return timeFormmat((new Date(time)),"yyyy-MM-dd hh:mm");
            }

      },
        methods:{
          allClick(){
            this.type = allList
          },
          recommClick(){
            this.type = recommList
          },
          againstClick(){
            this.type = againstList
          },
          contentClick(){
            this.is_content = !this.is_content
          }

        }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .ret-head
    margin-top:18px
    padding:18px 18px 12px 18px
    font-size: 12px
    background-color: #ffffff
    .ret-title
      font-size: 14px
      font-weight:200
      color:rgb(7,17,27)
    .button-wrap
      botton-1px(rgba(7,17,21,0.1))
      .all-button,.recomm-button,.against-button
        display:inline-block
        height: 24px
        width: 48px
        text-align:center
        line-height:24px
        border-radius:2px
        margin:12px 8px 18px 0px
        cursor:pointer
      .all-button
        color:rgb(77,85,96)
        background-color:rgba(0,160,220,0.2)
      .recomm-button
        color:rgb(77,85,96)
        background-color:rgba(0,160,220,0.2)
      .against-button
        color:rgb(77,85,96)
        background-color:rgba(77,82,93,0.2)
      .selected
        background-color:rgb(0,160,220)
        color:#ffffff
    .select-wrap
      margin-top:12px
      color:rgb(147,153,159)
      .icon-check_circle
        display:inline-block
        font-size:24px
        height:22px
        line-height:22px
        vertical-align:bottom
        cursor:pointer
      .contentselected
        color:green
      .select-content
        display:inline-block
        font-size:12px
        height:22px
        line-height:22px
  .ret-content
    margin: 2px 0 0 0
    padding:18px 18px 100px 18px
    background-color: white
    color:rgb(147,153,159)
    .reting-wrap
      botton-1px(rgba(7,17,21,0.1))
      padding:18px 0 18px 0
      display:flex
      .pic-wrap
        width:40px
        .pic
          width:28px
          height:28px
          border-radius:50%
      .reting-info
          flex:1
        .user-name
          font-size:10px
          color:#01111b
          display:inline-block
          line-height:12px
        .user-time
          position:absolute
          right:0px
          display:inline-block
          line-height:12px
        .user-star
          margin-right:6px
          display:inline-block
          line-height:12px
        .delivery-time
          display:inline-block
          line-height:12px
        .user-text
          font-size: 12px
          color:#01111b;
          line-height:18px
        .user-recommend
          ul
            display:inline-block
          .down
            color:rgb(147,153,159)
          .up
            color:rgb(0,160,220)
          .recomment
            margin:6px
            padding:0 4px
            display:inline-block
            border:solid 1px rgba(7,17,27,0.1)
</style>
