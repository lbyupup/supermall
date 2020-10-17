<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
    </scroll>
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavbar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
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
    });
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