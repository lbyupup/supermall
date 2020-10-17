<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      />
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>
<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },

  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
    this.$refs.scroll.refresh();
  },

  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY();
  },

  created() {
    // 1. 请求多个数据
    this.getHomeMultidata();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    // 3. 监听图片加载完成后
    this.$bus.$on("itemIamgeLoad", () => {
      // 重新计算scroll高度
      refresh();
    });
  },

  methods: {
    // 事件监听相关方法
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1. 判断backtop是否显示
      this.isShowBackTop = -position.y > 1000;

      // 2. 决定tabcontrol是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 获取tabcontrol的offset
      // 所有的组件都有一个属性 $el 用于获取组件中的元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },

    // 网络请求相关方法
    getHomeMultidata() {
      // 1. 请求多个数据
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // 把获取到的商品列表数据保存到 goods
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 这个保证可以重新上拉加载
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9; */
  /* 使用原生滚动时 使导航栏不滚动 */
}
.tab-control {
  position: relative;
  z-index: 9;
}
/* .content {
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
  overflow: hidden;
  background-color: #fff;
}
</style>