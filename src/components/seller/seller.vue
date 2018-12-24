<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>
              元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>
              元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>
              分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin border-1px">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper">
          <p class="content">{{seller.bulletin}}</p>
        </div>
      </div>
      <ul v-if="seller.supports" class="supports">
        <li class="support-item" v-for="(item, key) in seller.supports" :item="item" :key="item.id">
          <span class="icon" :class="classMap[key]"></span>
          <span class="text">{{item.description}}</span>
        </li>
      </ul>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="pic in seller.pics" :key="pic.index">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-item border-1px" v-for="info in seller.infos" :key="info.index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import star from '../star/star.vue';
import split from '../split/split.vue';
import BScroll from 'better-scroll';
import {saveToLocal, locaFromLocal} from '../../common/js/store.js';
export default {
  data() {
    return {
      favorite: (() => {
        return locaFromLocal(this.seller.id, 'favorite', false);
      })()
    };
  },
  computed: {
    favoriteText() {
      return this.favorite ? '已收藏' : '未收藏';
    }
  },
  props: {
    seller: {
      type: Object
    }
  },
  // 接收到数据之后 但还没有创建节点
  created() {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
  },
  mounted() {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });
      this._initPics();
      if (!this.picScroll) {
        this.picScroll = new BScroll(this.$refs.picWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical'
        });
      }
    });
  },
  methods: {
    _initPics() {
      if (this.seller.pics) {
        let picWidth = 120;
        let margin = 6;
        let width = (picWidth + margin) * this.seller.pics.length - margin;
        this.$refs.picList.style.width = width + 'px';
      }
    },
    toggleFavorite() {
      this.favorite = !this.favorite;
      saveToLocal(this.seller.id, 'favorite', this.favorite);
    }
  },
  components: {
    star: star,
    split: split
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    overflow hidden
    width 100%
    .overview
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
      .desc
        padding-bottom 18px
        border-1px(rgba(7,17,27,.1))
        .star
          display inline-block
          vertical-align top
          margin-right 8px
        .text
          display inline-block
          vertical-align top
          margin-right 12px
          line-height 18px
          font-size 10px
          color rgb(77,85,93)
      .remark
        display: flex
        padding-top 18px
        .block
          flex: 1
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          text-align center
          &:last-child
            border: none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 10px
            color rgb(147,153,159)
          .content
            line-height 24px
            font-size 10px
            font-weight 200
            color rgb(7,17,27)
            .stress
              font-size 24px
      .favorite
        position absolute
        top 20px
        right 18px
        text-align center
        .icon-favorite
          display block
          margin-bottom 4px
          line-height 24px
          font-size 24px
          color: #d4d6d9
          &.active
            color rgb(240,20,20)
        .text
          line-height 10px
          font-size 10px
          color rgb(77,85,93)
    .bulletin
      margin 18px 18px 0 18px
      padding-bottom 16px
      border-1px(rgba(7,17,27,.1))
      .title
        margin-bottom 8px
        line-height 10px
        font-size 10px
        font-weight 200
        color rgb(7,17,27)
      .content-wrapper
        padding 0 12px
        .content
          line-height 24px
          font-size 12px
          font-weight 200
          color rgb(240,20,20)
    .supports
      .support-item
        padding: 16px 30px
        border-1px(rgba(7, 17, 27, 0.1))
        font-size: 0
        &:last-child
          border-none()
      .icon
        display: inline-block
        width: 16px
        height: 16px
        vertical-align: top
        margin-right: 6px
        background-size: 16px 16px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_4')
        &.discount
          bg-image('discount_4')
        &.guarantee
          bg-image('guarantee_4')
        &.invoice
          bg-image('invoice_4')
        &.special
          bg-image('special_4')
      .text
        line-height: 16px
        font-size: 12px
        color: rgb(7, 17, 27)
    .pics
      padding 18px
      .title
        margin-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
      .pic-wrapper
        overflow hidden
        width 100%
        white-space: nowrap
        .pic-list
          font-size 0
          .pic-item
            display: inline-block
            margin-right: 6px
            width: 120px
            height: 90px
            &:last-child
              margin: 0
    .info
      padding 36px
      .title
        padding-bottom 12px
        line-height 14px
        font-size 14px
        color rgb(7,17,27)
        border-1px(rgba(7,17,27,.1))
      .info-item
        padding 16px 12px
        line-height 16px
        font-size 12px
        font-weight 200
        color rgb(7,17,27)
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
</style>
