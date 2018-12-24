<template>
  <div class="cartcontrol">
    <transition name="fade">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add" @click.stop.prevent="addCart">
      <span class="icon-add_circle"></span>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
export default {
 props: {
   food: {
     type: Object
   }
 },
 created() {
  //  console.log(this.food);
 },
 methods: {
   addCart(event) {
     if (!this.food.count) {
       Vue.set(this.food, 'count', 1);
     } else {
       this.food.count++;
     }
     this.$emit('cart-add', event.target);
   },
   decreaseCart() {
     if (!event._constructed) {
        return;
      }
     if (this.food.count) {
       this.food.count--;
     }
   }
 }
};
</script>
<style lang="stylus" rel="stylesheet/styleus">
  .cartcontrol
    font-size 0
    .fade-enter-active, .fade-leave-active
      transition .4s
    .fade-enter, .fade-leave-to
      opacity 0
      transform translate3d(24px,0,0) rotate(90deg)
    .cart-decrease
      display inline-block
      padding 6px
      .inner
        font-size 24px
        line-height 24px
        color rgb(0,160,220)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147,153,159)
    .cart-add
      display inline-block
      padding 6px
      .icon-add_circle
        font-size 24px
        line-height 24px
        color rgb(0,160,220)
</style>
