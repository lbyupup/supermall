<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <!-- 属性: topImages 传入值: top-images 不区分大小写不用驼峰
       -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <goods-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />
    <back-top v-show="isShowBackTop" @click.native="backTopClick" />
    <!-- <toast :message="message" :show="show" /> -->
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
import DetailBottomBar from "./childComps/DetailBottomBar";
// import BackTop from "components/content/backTop/BackTop";

import Scroll from "components/common/scroll/Scroll";

import { mapActions } from "vuex";

import { debounce } from "common/utils";
import { itemListenerMixin, backTopMixin } from "common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

// import Toast from "components/common/toast/Toast";

export default {
  name: "Detail",

  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll,
    // Toast,
    // BackTop, 混入了
  },

  mixins: [itemListenerMixin, backTopMixin],

  data() {
    return {
      iid: null,
      topImages: [], // 轮播图
      goods: {}, // 商品信息
      shop: {}, // 店铺信息
      detailInfo: {},
      paramInfo: {},
      commentInfo: {}, // 评论
      recommends: [], // 推荐
      // itemImgListener: null, // 被混入了 在mixin里面
      themeTopYs: [], // 商品, 参数, 评论, 推荐对应的高度
      // isShowBackTop: false, // 回到顶部 混入了
      // message: "", // 传入Toast的变量
      // show: false,
    };
  },

  created() {
    // 1. 保存传入的iid
    this.iid = this.$route.params.iid;

    // 2. 根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 1. 获取顶部图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3. 创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      // 4. 获取商品详细信息
      this.detailInfo = data.detailInfo;

      // 5. 保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6. 取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // // 在这里获取到 offsetTop 图片可能没加载完 高度可能不对
      // this.$nextTick(() => {
      //   // tabcontrol 滚去的高度数据保存在数组
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // });
    });

    // 请求商品详情页面的 推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });
  },

  mounted() {
    // // debounce 是封装的防抖函数
    // let refresh = debounce(this.$refs.scroll.refresh, 500);
    // this.itemImgListener = () => {
    //   refresh();
    // };
    // // 图片加载完之后刷新一次 scroll的高度
    // this.$bus.$on("detaiulItemIamgeLoad", this.itemImgListener);
  },

  methods: {
    ...mapActions(["addCart"]),

    imageLoad() {
      this.$refs.scroll.refresh();

      // tabcontrol 滚去的高度数据保存在数组
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE); // 为数组添加一个最大的数
    },

    titleClick(index) {
      // 点击tabcontrol页面滑到相应的地方
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
    },

    // 页面滚动事件
    contentScroll(position) {
      // 回到顶部 isShowBackTop 值的返回
      this.isShowBackTop = -position.y > 600;

      const positionY = -position.y;

      // 对比themeTopYs 中的y值
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // if (
        //   this.currentIndex !== i && // this.currentIndex !== i 防止赋值的过程过于频繁
        //   ((i < length - 1 &&
        //     positionY >= this.themeTopYs[i] &&
        //     positionY < this.themeTopYs[i + 1]) ||
        //     (i === length - 1 && positionY >= this.themeTopYs[i])) // 判断themeTopYs区间 若是themeTopYs数组的最后一个i 则另外判断
        // ) {
        //   this.$refs.nav.currentIndex = i;
        // }
        if (
          // 优化写法
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.$refs.nav.currentIndex = i;
        }
      }
    },
    // 混入了
    // backTop() {
    //   this.isShowBackTop = false;
    //   this.$refs.scroll.scrollTo(0, 0, 300);
    // },

    addToCart() {
      // 1. 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2. 商品添加到购物车
      // this.$store.commit("addCart", product);
      // this.$store.dispatch("addCart", product).then((res) => {
      //   console.log(res);
      // });
      // 用了mapActions
      this.addCart(product).then((res) => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = "";
        // }, 1000);
        this.$toast.show(res, 1000);
      });
      // 在向vuex操作完数据之后再显示(返回一个promise) 商品是否添加到购物车的toast
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
}
</style>